// Donde cae la respuesta correcta sobre TODO el banco de quiz, medido de dos maneras:
//
//  1. POSICION en pantalla (con el motor real, barajando como lo hace el juego).
//  2. TAMANO relativo: el rango de la correcta entre las opciones ordenadas por largo.
//     La posicion puede estar perfectamente repartida y aun asi el alumno aprende "la
//     correcta es la mas larga" — es el sesgo que mas se les escapa a los tests de mecanica.
import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { loadGame, CORE_SCRIPTS } = require('../helpers/load-game');

const w = loadGame([...CORE_SCRIPTS, 'js/screens/minigame-engine.js']);
const { MINIGAMES_ALL } = w;

const QUIZ = Object.entries(MINIGAMES_ALL).flatMap(([orgId, porDif]) =>
  ['easy', 'normal', 'hard'].flatMap((dif) =>
    (porDif[dif] || []).filter((mg) => mg.type === 'quiz').map((mg) => ({ orgId, dif, mg })),
  ),
);

describe('sesgo de posicion (lo que ve el alumno)', () => {
  it('hay quizzes que medir', () => {
    expect(QUIZ.length).toBeGreaterThan(300);
  });

  it('al dibujar todo el banco la correcta cae repartida entre A, B, C y D', () => {
    const REPETICIONES = 12;
    const conteo = {};
    let muestras = 0;
    for (const { orgId, dif, mg } of QUIZ) {
      for (let r = 0; r < REPETICIONES; r++) {
        w.document.body.innerHTML = '<div id="mgArea"></div>';
        w.GS.difficulty = dif === 'hard' ? 'hard' : dif;
        w.GS.completed = {};
        w.GS.introduced = { [`animal.${orgId}`]: true };
        w.GS.currentOrg = orgId;
        w.GS.mgIndex = w.getMG(orgId).indexOf(mg);
        w.loadMG(orgId, 'animal');
        const pos = w.GS.quizOrden.indexOf(mg.ans);
        conteo[pos] = (conteo[pos] || 0) + 1;
        muestras++;
      }
    }
    const n = mg0opts();
    for (let p = 0; p < n; p++) {
      const pct = ((conteo[p] || 0) / muestras) * 100;
      expect(pct, `la posicion ${'ABCD'[p]} acierta ${pct.toFixed(1)} % de las veces: ${JSON.stringify(conteo)}`).toBeGreaterThan(21);
      expect(pct, `la posicion ${'ABCD'[p]} acierta ${pct.toFixed(1)} % de las veces: ${JSON.stringify(conteo)}`).toBeLessThan(29);
    }
  });
});

function mg0opts() {
  return QUIZ[0].mg.opts.length;
}

// Rango por largo de texto de la correcta: 0 = la mas corta ... n-1 = la mas larga.
function rangoPorLargo(mg) {
  const largos = mg.opts.map((o) => String(o).length);
  const c = largos[mg.ans];
  return { menores: largos.filter((x) => x < c).length, n: largos.length, esUnicaMasLarga: c === Math.max(...largos) && largos.filter((x) => x === c).length === 1 };
}

describe('sesgo de tamano (lo que no arregla el barajado)', () => {
  const unicaMasLarga = QUIZ.filter(({ mg }) => rangoPorLargo(mg).esUnicaMasLarga).length;
  const pct = (unicaMasLarga / QUIZ.length) * 100;

  // Antes de la reescritura de distractores la correcta era la UNICA mas larga en 84,2 % de los quiz
  // (272 de 323): elegir siempre la opcion mas larga acertaba 4 de cada 5 sin leer. Hoy son 102 de 323
  // (31,6 %; el azar es 25 %). Las que quedan son diferencias chicas (<= 17 caracteres). El tope deja
  // margen para agregar preguntas, pero no para volver a escribirlas con la correcta inflada.
  const TOPE_ACTUAL = 36;

  it('la correcta no es la unica mas larga mas seguido que el tope (elegir siempre la mas larga no gana)', () => {
    expect(
      pct,
      `la correcta es la unica mas larga en ${pct.toFixed(1)} % de ${QUIZ.length} quiz (tope ${TOPE_ACTUAL} %, azar 25 %). ` +
        'Un alumno que elija siempre la mas larga acierta casi todo sin leer: alarga los distractores con detalle plausible.',
    ).toBeLessThanOrEqual(TOPE_ACTUAL);
  });

  it('ninguna correcta le saca mas de 17 caracteres a la segunda mas larga', () => {
    const pasadas = QUIZ.filter(({ mg }) => {
      const largos = mg.opts.map((o) => String(o).length);
      const c = largos[mg.ans];
      const otras = largos.filter((_, i) => i !== mg.ans);
      return c - Math.max(...otras) > 17;
    }).map(({ orgId, dif, mg }) => `${orgId}.${dif}: ${mg.q}`);
    expect(pasadas, `la correcta es notoriamente la mas larga en: ${pasadas.slice(0, 5).join(' | ')}`).toEqual([]);
  });

  it('la correcta casi nunca es la mas corta: tambien es un patron (informativo)', () => {
    const masCorta = QUIZ.filter(({ mg }) => rangoPorLargo(mg).menores === 0).length;
    expect((masCorta / QUIZ.length) * 100).toBeLessThan(25);
  });
});
