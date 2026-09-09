// El service worker precachea lo que el juego realmente carga.
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { ROOT } = require('../helpers/load-game');
const { join } = require('node:path');

const leer = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const sw = leer('cellquest-sw.js');
const indexHtml = leer('index.html');

/** Las rutas de `ASSETS`, normalizadas sin el `./` del principio. */
const precache = [...sw.slice(sw.indexOf('const ASSETS'), sw.indexOf(']', sw.indexOf('const ASSETS')))
  .matchAll(/'\.\/([^']*)'/g)].map((m) => m[1]);

/**
 * Un service worker que precachea la lista de antes del cambio.
 *
 * El SW existe para una sola cosa: que el juego abra sin internet, que es la condición normal de
 * media aula. Pero su lista de archivos se escribió una vez y el juego siguió creciendo, así que
 * quedó describiendo un juego que ya no es el que se sirve.
 *
 * Faltaban tres cosas, y ninguna hace ruido con red:
 *
 * - `css/fuentes.css` y las dieciséis tipografías de `fonts/`. Se bajaron del CDN de Google
 *   justamente para que el juego arrancara sin internet; sin precachearlas, offline vuelve a
 *   abrirse con otra letra — el problema que ese cambio venía a resolver.
 * - `js/dev/error-banner.js`, que es la primera línea del arranque y lo único que le dice al
 *   docente qué se rompió. Offline, la pantalla se quedaba muda otra vez.
 *
 * `cache.addAll` no protestó porque todo lo que la lista nombra existe: lo que falta no falla,
 * simplemente no está, y cae al `fetch` que offline no vuelve.
 */
describe('lo que el service worker guarda para el modo offline', () => {
  it('guarda todo script y hoja de estilo que index.html carga', () => {
    const pedidos = [...indexHtml.matchAll(/(?:src|href)="([^"]+?)(?:\?[^"]*)?"/g)]
      .map((m) => m[1])
      .filter((r) => /\.(js|css)$/.test(r) && !/^https?:/.test(r));

    const faltan = pedidos.filter((r) => !precache.includes(r));
    expect(faltan, 'offline estos archivos no están y el juego se abre a medias').toEqual([]);
  });

  it('guarda la hoja de tipografías, que se pide antes de pintar', () => {
    expect(precache, 'variables.css la importa con @import').toContain('css/fuentes.css');
  });

  /**
   * Las tipografías en sí no van en la lista ansiosa.
   *
   * Son dieciséis archivos, y pedirlos durante el install compite con la primera carga de la
   * página: medido, la suite e2e pasaba de 6 s a más de 30 s con timeouts, con la lista de 48.
   * La página los pide sola en cuanto lee `fuentes.css`, y el `fetch` del worker guarda esa
   * misma respuesta — quedan cacheados igual, sin un solo pedido de más.
   */
  it('pero no los .woff2, que los guarda el fetch al pasar', () => {
    const ansiosas = precache.filter((r) => r.startsWith('fonts/'));
    expect(ansiosas, 'competirían con la primera carga de la página').toEqual([]);

    const sw2 = leer('cellquest-sw.js');
    expect(sw2, 'sin guardado al vuelo las tipografías no se cachearían nunca')
      .toMatch(/caches\.open\(CACHE\)\.then\(c => c\.put\(req, copia\)\)/);
  });

  /**
   * Y el nombre de la caché sube cuando cambia lo que se guarda: quien ya tenga el worker
   * instalado se queda con la lista vieja para siempre si no cambia el nombre — que es la
   * forma más segura de que un arreglo del modo offline no llegue a quien lo necesita.
   */
  it('el nombre de la caché acompaña al cambio de la lista', () => {
    // El número va fijo a propósito: obliga a subirlo a conciencia cada vez que cambia ASSETS.
    // v27: entran las tipografías locales, el banner de errores y la consola de depuración.
    expect(sw).toMatch(/const CACHE = 'cellquest-v27'/);
  });
});
