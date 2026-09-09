// El install del service worker, contra un servidor que se cae a pedazos.
//
// No se lee el archivo con una expresión regular: se **ejecuta** el worker dentro de un
// `self` de mentira, con un `caches` y un `fetch` que fallan a propósito. Es la única forma
// de comprobar lo que importa —qué queda cacheado cuando algunas peticiones no vuelven—
// porque el modo offline se rompe justo el día que la red anda mal, que es el día que se usa.
import { describe, it, expect } from 'vitest';
import { correrInstall, correrFetch, ASSETS } from './sw-arnes.js';

/**
 * `cache.addAll` es todo o nada.
 *
 * Una sola petición que no vuelva —el wifi del aula, treinta tablets pidiendo lo mismo a la
 * vez, un proxy escolar que corta— y el install entero se rechaza: **no queda nada cacheado**
 * y el juego se queda sin modo offline, que es justo lo único que el worker existe para dar.
 * Y no avisa: en la pantalla no cambia nada mientras haya red.
 *
 * Se vio de verdad al ampliar la lista de 30 a 48 archivos (entraron las tipografías): los
 * e2e, que corren cuatro navegadores contra un servidor de prueba modesto, empezaron a fallar
 * de a ratos con `net::ERR_CONNECTION_REFUSED`. El servidor de prueba se rendía ante la
 * ráfaga; un aula entera contra un access point hace exactamente lo mismo.
 */
describe('el install del service worker', () => {
  it('guarda todo cuando la red responde', async () => {
    const { guardado } = await correrInstall();
    expect([...guardado].sort()).toEqual([...ASSETS].sort());
  });

  it('guarda el resto aunque una petición se caiga', async () => {
    const victima = './js/data/minigames.js';
    const { guardado } = await correrInstall({ falla: (r) => r === victima });

    expect(guardado.has(victima)).toBe(false);
    expect(guardado.size,
      'una sola caída dejaba la caché vacía y el juego sin modo offline').toBe(ASSETS.length - 1);
  });

  it('y sigue guardando el resto aunque se caigan varias', async () => {
    const { guardado } = await correrInstall({ falla: (r) => r.includes('/css/') });
    expect(guardado.has('./index.html')).toBe(true);
    expect(guardado.has('./js/data/minigames.js')).toBe(true);
    expect(guardado.has('./js/dev/error-banner.js')).toBe(true);
  });

  /**
   * Y no las pide todas de una: el pico de peticiones simultáneas es lo que tumba al
   * servidor. De a tandas tarda un instante más y llega entero, que es el canje correcto
   * para algo que corre una sola vez por versión y en segundo plano.
   */
  it('no pide toda la lista de golpe', async () => {
    const { maxEnVuelo } = await correrInstall();
    expect(maxEnVuelo, `pico de ${maxEnVuelo} peticiones simultáneas`).toBeLessThanOrEqual(8);
  });
});

/**
 * Y lo que no entró en el install entra la primera vez que se usa.
 *
 * Sin esto, un archivo que se cayó durante la instalación falta para siempre en esa versión
 * del worker: la caché no se vuelve a armar hasta que cambie `CACHE`. Guardando al pasar, la
 * primera carga con red repone lo que falte — el modo offline se completa solo.
 */
describe('lo que el worker guarda al vuelo', () => {
  it('una respuesta buena del propio sitio queda cacheada', async () => {
    const { guardado, respuesta } = await correrFetch('http://localhost/js/data/organelles.js');
    expect(respuesta.ok).toBe(true);
    expect([...guardado]).toContain('http://localhost/js/data/organelles.js');
  });

  it('lo de otro origen no se guarda', async () => {
    const { guardado } = await correrFetch('https://otro-sitio.example/x.js', { tipo: 'cors' });
    expect([...guardado]).toEqual([]);
  });

  it('y un POST no pasa por la caché', async () => {
    const { respondio } = await correrFetch('http://localhost/api', { metodo: 'POST' });
    expect(respondio, 'un POST no se puede servir desde la caché').toBe(false);
  });

  /**
   * Y guardar no puede frenar a la página.
   *
   * Esto se rompió al escribir el guardado al vuelo: el `put` iba con `await` delante del
   * `return`, así que **cada archivo del juego** esperaba a que terminara una escritura antes
   * de llegar al navegador. Medido en la suite e2e: de 1,4 s a más de 30 s por test, con
   * peticiones encoladas hasta el timeout. El guardado es trabajo de fondo, no del camino
   * por el que viaja la respuesta.
   */
  it('la respuesta llega aunque la escritura en caché no termine nunca', async () => {
    const espera = correrFetch('http://localhost/js/core/state.js', { putCuelga: true });
    const carrera = await Promise.race([
      espera.then(() => 'respondió'),
      new Promise((r) => setTimeout(() => r('se colgó'), 200)),
    ]);
    expect(carrera, 'la respuesta estaba esperando al guardado').toBe('respondió');
  });
});
