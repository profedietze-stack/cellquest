// El quiz de opción múltiple: barajado y consistencia de los datos.
//
// Los 323 quizzes del juego tienen la respuesta correcta en `ans:0`. Eso no es
// un problema en sí —el dato se escribe cómodo—, pero sí lo es si las opciones
// se pintan en el orden del dato: la correcta queda siempre en la A y el alumno
// aprende a contestar A sin leer. Estas pruebas fijan que se barajen y que la
// corrección siga la posición barajada, no la del dato.
import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { loadGame, CORE_SCRIPTS } = require('../helpers/load-game');

// Se carga el motor de minijuegos además de los datos: así el barajado que se
// prueba es el que corre en el juego, no una copia del algoritmo.
const w = loadGame([...CORE_SCRIPTS, 'js/screens/minigame-engine.js']);
const { MINIGAMES_ALL } = w;

// `MINIGAMES_ALL` es organela -> dificultad -> lista de minijuegos.
const TODOS_LOS_QUIZ = Object.entries(MINIGAMES_ALL).flatMap(([orgId, porDif]) =>
  Object.entries(porDif || {}).flatMap(([dif, lista]) =>
    (lista || [])
      .filter((mg) => mg.type === 'quiz')
      .map((mg) => ({ orgId: `${orgId}/${dif}`, mg })),
  ),
);

describe('datos de los quizzes', () => {
  it('hay quizzes que revisar', () => {
    expect(TODOS_LOS_QUIZ.length).toBeGreaterThan(100);
  });

  it('el índice de la respuesta correcta existe entre las opciones', () => {
    for (const { orgId, mg } of TODOS_LOS_QUIZ) {
      expect(Array.isArray(mg.opts), `${orgId}: "${mg.q}" sin opciones`).toBe(true);
      expect(mg.opts.length, `${orgId}: "${mg.q}" con menos de dos opciones`).toBeGreaterThanOrEqual(2);
      expect(mg.ans, `${orgId}: "${mg.q}" apunta a la opción ${mg.ans}`).toBeGreaterThanOrEqual(0);
      expect(mg.ans, `${orgId}: "${mg.q}" apunta fuera de la lista`).toBeLessThan(mg.opts.length);
    }
  });

  it('ningún quiz ofrece dos veces la misma opción', () => {
    for (const { orgId, mg } of TODOS_LOS_QUIZ) {
      const textos = mg.opts.map((o) => String(o).trim());
      expect(
        new Set(textos).size,
        `${orgId}: "${mg.q}" repite una opción`,
      ).toBe(textos.length);
    }
  });

  it('ninguna opción está vacía', () => {
    for (const { orgId, mg } of TODOS_LOS_QUIZ) {
      for (const o of mg.opts) {
        expect(String(o).trim().length, `${orgId}: "${mg.q}" tiene una opción vacía`).toBeGreaterThan(0);
      }
    }
  });

  it('todos los quizzes dan puntos', () => {
    for (const { orgId, mg } of TODOS_LOS_QUIZ) {
      expect(typeof mg.pts, `${orgId}: "${mg.q}" sin puntaje`).toBe('number');
      expect(mg.pts).toBeGreaterThan(0);
    }
  });
});

describe('barajado de las opciones, en el motor real', () => {
  // `loadMG` pinta el minijuego actual dentro de #mgArea. Se le prepara el
  // mínimo que necesita y se lo llama muchas veces mirando dónde cae la
  // correcta.
  function prepararPantalla() {
    w.document.body.innerHTML = '<div id="mgArea"></div>';
    w.GS.difficulty = 'easy';
    w.GS.mgIndex = 0;
    w.GS.completed = {};
    // La tarjeta de presentación de la organela se muestra una vez y tapa el
    // quiz; se marca como vista.
    w.GS.introduced = { 'animal.nucleus': true };
  }

  function posicionDeLaCorrecta() {
    w.loadMG('nucleus', 'animal');
    const mg = w.getMG('nucleus')[0];
    const botones = [...w.document.querySelectorAll('.mg-opt')];
    expect(botones.length, 'el quiz no se pintó').toBe(mg.opts.length);
    // El texto del botón viene como "A. <opción>"; se compara sin la letra.
    const textos = botones.map((b) => b.textContent.replace(/^[A-Z]\.\s*/, ''));
    return { pos: textos.indexOf(mg.opts[mg.ans]), textos, mg };
  }

  it('el quiz se pinta con todas sus opciones y sin perder ninguna', () => {
    prepararPantalla();
    const { textos, mg } = posicionDeLaCorrecta();
    expect([...textos].sort()).toEqual([...mg.opts].sort());
  });

  it('la respuesta correcta no cae siempre en el mismo lugar', () => {
    // Antes del arreglo, los 323 quizzes tenían `ans:0` y las opciones se
    // pintaban en orden: la correcta era la A el 100% de las veces.
    prepararPantalla();
    const veces = {};
    const VUELTAS = 600;
    for (let i = 0; i < VUELTAS; i++) {
      const { pos } = posicionDeLaCorrecta();
      expect(pos, 'la opción correcta no quedó en pantalla').toBeGreaterThanOrEqual(0);
      veces[pos] = (veces[pos] || 0) + 1;
    }
    const posiciones = Object.keys(veces).length;
    expect(posiciones, `la correcta sólo apareció en ${posiciones} posición(es)`).toBeGreaterThan(1);
    for (const [pos, n] of Object.entries(veces)) {
      const proporcion = n / VUELTAS;
      expect(proporcion, `cae en la posición ${pos} el ${(proporcion * 100).toFixed(1)}% de las veces`)
        .toBeGreaterThan(0.15);
      expect(proporcion).toBeLessThan(0.35);
    }
  });

  it('el orden barajado se guarda en el estado, no en el HTML', () => {
    // Si la correspondencia viajara en un atributo del botón, cualquiera la
    // podría leer desde el inspector.
    prepararPantalla();
    posicionDeLaCorrecta();
    expect(w.GS.quizOrden, 'no quedó guardado el orden').toBeDefined();
    expect([...w.GS.quizOrden].sort()).toEqual([0, 1, 2, 3]);
    expect(w.document.body.innerHTML).not.toContain('quizOrden');
  });
});
