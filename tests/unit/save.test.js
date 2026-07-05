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

  it('saveGame con debounce no escribe sincrónicamente', () => {
    w.GS.xp = 999;
    w.saveGame(); // sin "immediate" -> debounced
    expect(w.localStorage.getItem('cq3')).toBeNull();
  });
});
