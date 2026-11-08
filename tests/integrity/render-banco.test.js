// Todo el banco de minijuegos tiene que poder dibujarse, en las tres dificultades.
//
// Pasaba que 56 completar de Dificil tenian la forma {q, a} (respuesta libre, sin `s` ni
// `words`) y el motor solo sabia dibujar {s, words, cor}: `mg.s.split` tiraba TypeError y la
// organela quedaba imposible de terminar. Ningun test recorria el banco CON el motor, solo
// los datos por separado. Esto recorre cada minijuego de cada dificultad contra `loadMG`.
import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { loadGame, CORE_SCRIPTS } = require('../helpers/load-game');

const w = loadGame([...CORE_SCRIPTS, 'js/screens/minigame-engine.js']);
const { MINIGAMES_ALL } = w;
const DIFICULTADES = ['easy', 'normal', 'hard'];

// Dibuja el puzzle `indice` de la organela, como lo hace el juego al cargar uno.
function dibujar(orgId, dificultad, indice) {
  w.document.body.innerHTML = '<div id="mgArea"></div>';
  w.GS.difficulty = dificultad;
  w.GS.completed = {};
  // La tarjeta de introduccion sale antes del primer puzzle; aca se quiere ver el puzzle.
  w.GS.introduced = { [`animal.${orgId}`]: true };
  w.GS.mgIndex = indice;
  w.GS.mgErrors = 0;
  w.GS.currentOrg = orgId;
  w.loadMG(orgId, 'animal');
  return w.document.getElementById('mgArea');
}

describe('todo el banco se dibuja con el motor real', () => {
  for (const dif of DIFICULTADES) {
    it(`dificultad ${dif}: ningun minijuego rompe loadMG ni queda sin controles`, () => {
      const fallas = [];
      let dibujados = 0;
      for (const orgId of Object.keys(MINIGAMES_ALL)) {
        w.GS.difficulty = dif;
        const lista = w.getMG(orgId);
        lista.forEach((mg, i) => {
          dibujados++;
          try {
            const area = dibujar(orgId, dif, i);
            const q = (s) => area.querySelectorAll(s).length;
            let ok;
            if (mg.type === 'quiz') ok = q('.mg-opt') === mg.opts.length && q('#mgBtn') === 1;
            else if (mg.type === 'fill') ok = (q('.fill-word') > 0 || q('#fillInput') === 1) && q('#mgBtn') === 1;
            else if (mg.type === 'trueFalse') ok = q('.tf-item') === mg.items.length && q('#tfSubmitBtn') === 1;
            else if (mg.type === 'sequence') ok = q('.seq-item') === mg.items.length;
            else ok = false;
            if (!ok) fallas.push(`${orgId}#${i} (${mg.type}): faltan controles`);
          } catch (e) {
            fallas.push(`${orgId}#${i} (${mg.type}): ${e.message}`);
          }
        });
      }
      expect(dibujados, 'no se recorrio nada').toBeGreaterThan(100);
      expect(fallas, fallas.slice(0, 8).join('\n')).toEqual([]);
    });
  }
});

describe('completar de respuesta libre', () => {
  const libres = Object.entries(MINIGAMES_ALL).flatMap(([orgId, porDif]) =>
    (porDif.hard || []).filter((mg) => mg.type === 'fill' && typeof mg.s !== 'string').map((mg) => ({ orgId, mg })),
  );

  it('hay completar de respuesta libre que revisar', () => {
    expect(libres.length).toBeGreaterThan(40);
  });

  it('cada uno tiene pregunta, respuesta y puntos', () => {
    for (const { orgId, mg } of libres) {
      expect(typeof mg.q, orgId).toBe('string');
      expect(typeof mg.a, orgId).toBe('string');
      expect(mg.a.trim().length, `${orgId}: respuesta vacia`).toBeGreaterThan(0);
      expect(mg.pts, orgId).toBeGreaterThan(0);
    }
  });

  it('la respuesta del banco se acepta tal cual, y tambien sin tildes ni mayusculas', () => {
    for (const { orgId, mg } of libres) {
      expect(w.respuestaLibreCorrecta(mg.a, mg.a), `${orgId}: ${mg.a}`).toBe(true);
      expect(w.respuestaLibreCorrecta(`  ${mg.a.toUpperCase()}  `, mg.a), `${orgId} (mayusculas): ${mg.a}`).toBe(true);
      const sinTildes = mg.a.normalize('NFD').replace(/[̀-ͯ]/g, '');
      expect(w.respuestaLibreCorrecta(sinTildes, mg.a), `${orgId} (sin tildes): ${mg.a}`).toBe(true);
    }
  });

  it('una respuesta vacia o distinta no se acepta', () => {
    for (const { orgId, mg } of libres) {
      expect(w.respuestaLibreCorrecta('', mg.a), orgId).toBe(false);
      expect(w.respuestaLibreCorrecta('   ', mg.a), orgId).toBe(false);
      expect(w.respuestaLibreCorrecta('zzzz respuesta equivocada', mg.a), orgId).toBe(false);
    }
  });

  it('la aclaracion entre parentesis es opcional', () => {
    expect(w.respuestaLibreCorrecta('carga positiva', 'carga positiva (histidinas en la superficie)')).toBe(true);
    expect(w.respuestaLibreCorrecta('histidinas en la superficie', 'carga positiva (histidinas en la superficie)')).toBe(false);
  });

  it('la respuesta correcta no viaja en el HTML', () => {
    const { orgId, mg } = libres[0];
    const idx = w.getMG(orgId).indexOf(mg);
    w.GS.difficulty = 'hard';
    const area = dibujar(orgId, 'hard', idx);
    expect(area.innerHTML.toLowerCase()).not.toContain(`"${mg.a.toLowerCase()}"`);
    expect(area.querySelector('#fillInput').value).toBe('');
  });
});
