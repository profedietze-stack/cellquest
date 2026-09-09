// El juego arranca aunque el navegador no deje guardar.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { ROOT } = require('../helpers/load-game');
const { join } = require('node:path');

const leer = (rel) => readFileSync(join(ROOT, rel), 'utf8');

/**
 * Un navegador puede negarse a dar `localStorage`.
 *
 * Pasa en modo privado, con las cookies de sitio bloqueadas y en algunas tablets de escuela con
 * el navegador restringido. Y no devuelve `null`: **tira** al tocar la propiedad. `save.js` ya lo
 * tenía previsto —guardar cae en un aviso de "Progreso no disponible"—, pero la portada no:
 * `initSplash` abría con `localStorage.getItem('cq3')` suelto y `JSON.parse` sin red.
 *
 * El corte era exactamente donde peor se nota: `initSplash` es lo primero que corre al cargar, y
 * al cortarse ahí quedaban sin dibujar el saludo, la frase, los orbes de progreso y las
 * partículas. La pantalla que ve el alumno al abrir el juego, vacía, sin más explicación que un
 * error en la consola que nadie mira en un aula.
 *
 * El mismo `JSON.parse` sin `try` rompía con un guardado corrupto: un `cq3` a medio escribir por
 * una pestaña cerrada durante el guardado deja la portada rota para siempre, hasta que alguien
 * sepa vaciar el almacenamiento del navegador.
 */
describe('la portada sin almacenamiento', () => {
  const arranque = () => {
    const dom = new JSDOM('<!doctype html><html><body>' +
      '<div id="splashWelcome"></div><div id="splashQuote"></div><div id="splashAuthor"></div>' +
      '<div id="splashReviewBanner"></div><div id="splashOrbs"></div><div id="splashParticles"></div>' +
      '</body></html>', { url: 'http://localhost/', runScripts: 'dangerously' });
    dom.window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
    return dom;
  };

  // `const` de nivel superior no se comparte entre evals distintos: levels.js y splash.js
  // tienen que entrar juntos, igual que el navegador los carga en el mismo ambito global.
  const cargarPortada = (dom) => {
    dom.window.eval(['js/data/levels.js', 'js/data/organelles.js', 'js/screens/splash.js']
      .map(leer).join(';\n'));
    // En jsdom el documento sigue en "loading" al terminar el eval, así que splash.js
    // se queda esperando a DOMContentLoaded — el mismo camino que en el navegador.
    dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  };

  const romperStorage = (dom, comoRompe) => {
    Object.defineProperty(dom.window, 'localStorage', {
      configurable: true,
      get() { if (comoRompe === 'tira') throw new Error('SecurityError: acceso denegado'); return undefined; },
    });
  };

  it('dibuja igual cuando localStorage tira al tocarlo', () => {
    const dom = arranque();
    romperStorage(dom, 'tira');
    expect(() => cargarPortada(dom)).not.toThrow();
    expect(dom.window.document.getElementById('splashQuote').textContent,
      'la portada se quedó sin frase: initSplash cortó antes de dibujar').toBeTruthy();
  });

  it('y cuando el guardado quedó corrupto a medio escribir', () => {
    const dom = arranque();
    dom.window.localStorage.setItem('cq3', '{"name":"Ana","xp":1');   // JSON truncado
    expect(() => cargarPortada(dom)).not.toThrow();
    expect(dom.window.document.getElementById('splashQuote').textContent).toBeTruthy();
  });

  it('y con un guardado normal sigue leyéndolo', () => {
    const dom = arranque();
    dom.window.localStorage.setItem('cq3', JSON.stringify({ name: 'Ana', xp: 40, lastSession: Date.now() }));
    cargarPortada(dom);
    expect(dom.window.document.getElementById('splashWelcome').textContent).toMatch(/Ana/);
  });
});

/**
 * Y "Nueva partida" tampoco puede romperse por lo mismo: `confirmNewGame` preguntaba
 * `localStorage.getItem('cq3')` sin red para decidir si avisar antes de borrar el progreso.
 */
describe('empezar de nuevo sin almacenamiento', () => {
  it('atlas.js no toca localStorage sin protección', () => {
    const src = leer('js/screens/atlas.js').replace(/\/\*[\s\S]*?\*\//g, '');
    const sueltos = src.split('\n')
      .map((l, i) => [i + 1, l])
      .filter(([, l]) => /localStorage\./.test(l) && !/^\s*\/\//.test(l) && !/try\s*\{[^}]*localStorage/.test(l));
    expect(sueltos.map(([n, l]) => `${n}: ${l.trim()}`)).toEqual([]);
  });
});
