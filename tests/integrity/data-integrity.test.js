// Valida consistencia cruzada entre levels.js, organelles.js y minigames.js.
// Objetivo: atrapar el tipo de bug real que ya pasó (fotosíntesis sin Modo Jugador,
// organelas sin minijuego, referencias rotas) ANTES de que llegue a producción.
import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { loadGame } = require('../helpers/load-game');

const w = loadGame();
const { LEVELS, ORGANELLES, MINIGAMES_ALL } = w;
const DIFFICULTIES = ['easy', 'normal', 'hard'];

describe('integridad de datos — levels.js', () => {
  it('todos los ids de LEVELS son únicos', () => {
    const ids = LEVELS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cada nivel tiene name, emoji y color', () => {
    LEVELS.forEach((l) => {
      expect(l.name, `${l.id}.name`).toBeTruthy();
      expect(l.emoji, `${l.id}.emoji`).toBeTruthy();
      expect(l.color, `${l.id}.color`).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it('solo "animal" viene desbloqueado por defecto', () => {
    const unlocked = LEVELS.filter((l) => l.unlocked).map((l) => l.id);
    expect(unlocked).toEqual(['animal']);
  });
});

describe('integridad de datos — organelles.js', () => {
  it('cada nivel de LEVELS tiene un array de organelas no vacío', () => {
    LEVELS.forEach((l) => {
      expect(Array.isArray(ORGANELLES[l.id]), `ORGANELLES.${l.id}`).toBe(true);
      expect(ORGANELLES[l.id].length, `ORGANELLES.${l.id} vacío`).toBeGreaterThan(0);
    });
  });

  it('los ids de organela son únicos dentro de cada célula', () => {
    Object.entries(ORGANELLES).forEach(([cellId, orgs]) => {
      const ids = orgs.map((o) => o.id);
      expect(new Set(ids).size, `duplicado en ${cellId}`).toBe(ids.length);
    });
  });

  it('cada organela tiene name, emoji y coordenadas numéricas', () => {
    Object.entries(ORGANELLES).forEach(([cellId, orgs]) => {
      orgs.forEach((o) => {
        expect(o.name, `${cellId}.${o.id}.name`).toBeTruthy();
        expect(o.emoji, `${cellId}.${o.id}.emoji`).toBeTruthy();
        ['cx', 'cy', 'rx', 'ry'].forEach((k) => {
          expect(typeof o[k], `${cellId}.${o.id}.${k}`).toBe('number');
          expect(Number.isNaN(o[k]), `${cellId}.${o.id}.${k} es NaN`).toBe(false);
        });
      });
    });
  });
});

describe('integridad de datos — minigames.js', () => {
  it('toda organela definida en ORGANELLES tiene entrada en MINIGAMES_ALL', () => {
    const faltantes = [];
    Object.entries(ORGANELLES).forEach(([cellId, orgs]) => {
      orgs.forEach((o) => {
        if (!MINIGAMES_ALL[o.id]) faltantes.push(`${cellId}.${o.id}`);
      });
    });
    expect(faltantes, 'organelas sin minijuego asociado').toEqual([]);
  });

  it('cada organela con minijuego cubre las 3 dificultades con contenido', () => {
    const incompletas = [];
    Object.entries(MINIGAMES_ALL).forEach(([orgId, byDiff]) => {
      DIFFICULTIES.forEach((diff) => {
        const items = byDiff[diff];
        if (!Array.isArray(items) || items.length === 0) {
          incompletas.push(`${orgId}.${diff}`);
        }
      });
    });
    expect(incompletas, 'dificultades vacías o faltantes').toEqual([]);
  });

  it('preguntas quiz: "ans" es un índice válido dentro de "opts"', () => {
    const errores = [];
    Object.entries(MINIGAMES_ALL).forEach(([orgId, byDiff]) => {
      DIFFICULTIES.forEach((diff) => {
        (byDiff[diff] || []).forEach((item, i) => {
          if (item.type === 'quiz') {
            if (!Array.isArray(item.opts) || item.opts.length < 2) {
              errores.push(`${orgId}.${diff}[${i}] opts inválido`);
            } else if (item.ans < 0 || item.ans >= item.opts.length) {
              errores.push(`${orgId}.${diff}[${i}] ans fuera de rango`);
            }
          }
        });
      });
    });
    expect(errores).toEqual([]);
  });

  it('preguntas fill: con banco de palabras "cor" está en "words"; sin banco, "a" no está vacío', () => {
    const errores = [];
    Object.entries(MINIGAMES_ALL).forEach(([orgId, byDiff]) => {
      DIFFICULTIES.forEach((diff) => {
        (byDiff[diff] || []).forEach((item, i) => {
          if (item.type !== 'fill') return;
          if (Array.isArray(item.words)) {
            if (!item.words.includes(item.cor)) {
              errores.push(`${orgId}.${diff}[${i}] cor no está en words`);
            }
          } else if (typeof item.a !== 'string' || !item.a.trim()) {
            errores.push(`${orgId}.${diff}[${i}] fill de texto libre sin respuesta "a"`);
          }
        });
      });
    });
    expect(errores).toEqual([]);
  });

  it('preguntas trueFalse: cada item tiene texto "t" y booleano "a"', () => {
    const errores = [];
    Object.entries(MINIGAMES_ALL).forEach(([orgId, byDiff]) => {
      DIFFICULTIES.forEach((diff) => {
        (byDiff[diff] || []).forEach((item, i) => {
          if (item.type === 'trueFalse') {
            if (!Array.isArray(item.items) || item.items.length === 0) {
              errores.push(`${orgId}.${diff}[${i}] sin items`);
            } else {
              item.items.forEach((sub, j) => {
                if (typeof sub.t !== 'string' || !sub.t) errores.push(`${orgId}.${diff}[${i}].items[${j}].t`);
                if (typeof sub.a !== 'boolean') errores.push(`${orgId}.${diff}[${i}].items[${j}].a`);
              });
            }
          }
        });
      });
    });
    expect(errores).toEqual([]);
  });

  it('preguntas sequence: al menos 2 pasos', () => {
    const errores = [];
    Object.entries(MINIGAMES_ALL).forEach(([orgId, byDiff]) => {
      DIFFICULTIES.forEach((diff) => {
        (byDiff[diff] || []).forEach((item, i) => {
          if (item.type === 'sequence') {
            if (!Array.isArray(item.items) || item.items.length < 2) {
              errores.push(`${orgId}.${diff}[${i}] sequence con menos de 2 pasos`);
            }
          }
        });
      });
    });
    expect(errores).toEqual([]);
  });

  it('todo item de minijuego otorga puntos positivos ("pts")', () => {
    const errores = [];
    Object.entries(MINIGAMES_ALL).forEach(([orgId, byDiff]) => {
      DIFFICULTIES.forEach((diff) => {
        (byDiff[diff] || []).forEach((item, i) => {
          if (!(typeof item.pts === 'number' && item.pts > 0)) {
            errores.push(`${orgId}.${diff}[${i}] pts inválido (${item.pts})`);
          }
        });
      });
    });
    expect(errores).toEqual([]);
  });
});

describe('integridad de datos — achievements (state.js)', () => {
  it('todos los ids de logros son únicos', () => {
    const ids = w.GS.achievements.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('todos los logros arrancan bloqueados', () => {
    w.GS.achievements.forEach((a) => {
      expect(a.unlocked, a.id).toBe(false);
    });
  });
});
