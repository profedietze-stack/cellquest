import { describe, it, expect, beforeEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { loadGame } = require('../helpers/load-game');

describe('sistema de XP', () => {
  let w;
  beforeEach(() => {
    w = loadGame();
  });

  it('nivel 1 (Aprendiz) para xp 0', () => {
    expect(w.getPlayerLevel(0)).toMatchObject({ level: 1, title: 'Aprendiz' });
  });

  it('sube de nivel exactamente en el umbral', () => {
    expect(w.getPlayerLevel(149)).toMatchObject({ level: 1 });
    expect(w.getPlayerLevel(150)).toMatchObject({ level: 2, title: 'Estudiante' });
  });

  it('getNextLevel devuelve null en xp máximo', () => {
    const maxXp = w.PLAYER_LEVELS[w.PLAYER_LEVELS.length - 1].xp;
    expect(w.getNextLevel(maxXp)).toBeNull();
    expect(w.getNextLevel(maxXp - 1)).not.toBeNull();
  });

  it('PLAYER_LEVELS está ordenado ascendentemente por xp', () => {
    const xps = w.PLAYER_LEVELS.map((l) => l.xp);
    const sorted = [...xps].sort((a, b) => a - b);
    expect(xps).toEqual(sorted);
  });

  it('addXP acumula sobre GS.xp', () => {
    w.GS.xp = 0;
    w.addXP(20);
    expect(w.GS.xp).toBe(20);
    w.addXP(35);
    expect(w.GS.xp).toBe(55);
  });

  it('addXP con 0 o undefined no rompe ni modifica xp', () => {
    w.GS.xp = 10;
    w.addXP(0);
    expect(w.GS.xp).toBe(10);
    w.addXP(undefined);
    expect(w.GS.xp).toBe(10);
  });

  it('checkXPUnlocks desbloquea célula al alcanzar su umbral', () => {
    w.GS.xp = w.CELL_XP_UNLOCK.plant;
    const unlocked = w.checkXPUnlocks();
    const plant = w.GS.levels.find((l) => l.id === 'plant');
    expect(plant.unlocked).toBe(true);
    expect(unlocked.some((l) => l.id === 'plant')).toBe(true);
  });

  it('checkXPUnlocks no re-desbloquea (no duplica) una célula ya desbloqueada', () => {
    w.GS.xp = w.CELL_XP_UNLOCK.plant;
    w.checkXPUnlocks();
    const secondPass = w.checkXPUnlocks();
    expect(secondPass.some((l) => l.id === 'plant')).toBe(false);
  });

  it('CELL_XP_UNLOCK tiene un umbral para cada nivel definido en LEVELS', () => {
    w.LEVELS.forEach((lv) => {
      expect(w.CELL_XP_UNLOCK[lv.id]).toBeDefined();
    });
  });

  it('animal (nivel inicial) siempre desbloqueado con umbral 0', () => {
    expect(w.CELL_XP_UNLOCK.animal).toBe(0);
  });
});
