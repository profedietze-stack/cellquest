import { describe, it, expect, beforeEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { loadGame } = require('../helpers/load-game');

describe('guardado / carga (localStorage)', () => {
  let w;
  beforeEach(() => {
    w = loadGame();
    w.localStorage.clear();
  });

  it('guarda y recupera el progreso básico', () => {
    w.GS.name = 'Ana';
    w.GS.xp = 250;
    w.GS.score = 40;
    w.saveGame(true); // immediate, sin debounce
    expect(w.localStorage.getItem('cq3')).not.toBeNull();

    // resetear GS y volver a cargar
    w.GS.name = 'Jugador';
    w.GS.xp = 0;
    const ok = w.loadSave();
    expect(ok).toBe(true);
    expect(w.GS.name).toBe('Ana');
    expect(w.GS.xp).toBe(250);
    expect(w.GS.score).toBe(40);
  });

  it('loadSave devuelve false si no hay nada guardado', () => {
    expect(w.loadSave()).toBe(false);
  });

  it('loadSave no rompe con JSON corrupto en localStorage', () => {
    w.localStorage.setItem('cq3', '{esto no es json valido');
    expect(w.loadSave()).toBe(false);
  });

  it('mergea niveles guardados por id, preservando niveles nuevos no guardados', () => {
    // Simula un save viejo que solo conoce "animal" y "plant"
    w.localStorage.setItem('cq3', JSON.stringify({
      name: 'Viejo', xp: 500, score: 10,
      levels: [
        { id: 'animal', unlocked: true },
        { id: 'plant', unlocked: true },
      ],
    }));
    const ok = w.loadSave();
    expect(ok).toBe(true);
    // Todos los niveles de LEVELS deben seguir presentes tras el merge
    expect(w.GS.levels.length).toBe(w.LEVELS.length);
    const prokaryote = w.GS.levels.find((l) => l.id === 'prokaryote');
    expect(prokaryote).toBeDefined();
  });

  it('unlocked persiste true aunque el nivel base sea false (no regresiona)', () => {
    w.localStorage.setItem('cq3', JSON.stringify({
      levels: [{ id: 'plant', unlocked: true }],
    }));
    w.loadSave();
    const plant = w.GS.levels.find((l) => l.id === 'plant');
    expect(plant.unlocked).toBe(true);
  });

  it('mergea logros guardados por id: un logro nuevo agregado después del save sigue presente y bloqueado', () => {
    const totalActual = w.GS.achievements.length;
    // Simula un save viejo (sin "all_procesos", que se agregó después) con un logro desbloqueado
    const logrosViejos = w.GS.achievements
      .filter((a) => a.id !== 'all_procesos')
      .map((a) => ({ id: a.id, unlocked: a.id === 'first_step' }));
    w.localStorage.setItem('cq3', JSON.stringify({
      name: 'Viejo', xp: 500, score: 10,
      achievements: logrosViejos,
    }));
    const ok = w.loadSave();
    expect(ok).toBe(true);
    // Todos los logros actuales (incluido el agregado después del save) deben seguir presentes
    expect(w.GS.achievements.length, 'el logro agregado después del save del alumno desapareció').toBe(totalActual);
    const nuevo = w.GS.achievements.find((a) => a.id === 'all_procesos');
    expect(nuevo).toBeDefined();
    expect(nuevo.unlocked).toBe(false);
    const viejo = w.GS.achievements.find((a) => a.id === 'first_step');
    expect(viejo.unlocked).toBe(true);
  });

  describe('un guardado con campos de otro tipo no rompe ni contamina el estado', () => {
    const cargar = (obj) => {
      w.localStorage.setItem('cq3', JSON.stringify(obj));
      return w.loadSave();
    };

    it('numeros que no son numeros caen al valor por defecto (no "abc10" al sumar)', () => {
      expect(cargar({ score: 'abc', xp: '100', totalTime: -5, speedRuns: null, totalDone: {} })).toBe(true);
      expect(w.GS.score).toBe(0);
      expect(w.GS.xp).toBe(0);
      expect(w.GS.totalTime).toBe(0);
      expect(w.GS.speedRuns).toBe(0);
      expect(w.GS.totalDone).toBe(0);
      w.GS.score += 10;
      expect(w.GS.score).toBe(10);
    });

    it('dificultad y avatar fuera de lo conocido vuelven a los valores por defecto', () => {
      cargar({ difficulty: 'imposible', avatar: 'robot' });
      expect(w.GS.difficulty).toBe('normal');
      expect(w.GS.avatar).toBe('scientist');
    });

    it('levels y achievements que no son listas no tiran TypeError ni pierden el save', () => {
      expect(cargar({ name: 'Ana', xp: 300, levels: 'hola', achievements: { a: 1 } })).toBe(true);
      expect(w.GS.xp).toBe(300);
      expect(w.GS.levels.length).toBe(w.LEVELS.length);
      expect(w.GS.achievements.length).toBeGreaterThan(5);
    });

    it('completed con basura queda con la forma {nivel:{organela:true}}', () => {
      cargar({ completed: { animal: { nucleus: true, golgi: 'si' }, plant: 'x', fungi: [1] }, completedAt: { animal: { nucleus: 'ayer' } } });
      expect(w.GS.completed).toEqual({ animal: { nucleus: true } });
      expect(w.GS.completedAt).toEqual({ animal: {} });
      expect(() => { w.GS.completed.animal.nucleus = true; }).not.toThrow();
    });

    it('un save que es una lista o un numero se descarta sin romper', () => {
      expect(cargar([1, 2, 3])).toBe(false);
      w.localStorage.setItem('cq3', '42');
      expect(w.loadSave()).toBe(false);
      w.localStorage.setItem('cq3', 'null');
      expect(w.loadSave()).toBe(false);
    });

    it('el nombre se recorta y un nombre vacio vuelve a Jugador', () => {
      cargar({ name: 'x'.repeat(500) });
      expect(w.GS.name.length).toBe(40);
      cargar({ name: '   ' });
      expect(w.GS.name).toBe('Jugador');
      cargar({ name: 42 });
      expect(w.GS.name).toBe('Jugador');
    });
  });

  it('saveGame con debounce no escribe sincrónicamente', () => {
    w.GS.xp = 999;
    w.saveGame(); // sin "immediate" -> debounced
    expect(w.localStorage.getItem('cq3')).toBeNull();
  });
});
