// Un arnés para correr `cellquest-sw.js` fuera del navegador.
//
// El service worker no se puede probar leyéndolo con expresiones regulares: lo que importa es
// qué queda cacheado cuando algunas peticiones no vuelven, y eso sólo se ve ejecutándolo. Acá
// se le da un `self` de mentira, con un `caches` y un `fetch` que fallan cuando se les pide.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('../..', import.meta.url));
export const FUENTE = readFileSync(join(RAIZ, 'cellquest-sw.js'), 'utf8');

/** Las rutas declaradas en ASSETS. */
export const ASSETS = [...FUENTE
  .slice(FUENTE.indexOf('const ASSETS'), FUENTE.indexOf(']', FUENTE.indexOf('const ASSETS')))
  .matchAll(/'([^']+)'/g)].map((m) => m[1]).filter((r) => r.startsWith('./'));

/** Monta el worker y devuelve sus oyentes más lo que fue quedando guardado. */
function montar({ falla = () => false, respuesta, putCuelga = false } = {}) {
  const guardado = new Set();
  const estado = { enVuelo: 0, maxEnVuelo: 0 };
  const oyentes = {};

  const marcar = (n) => {
    estado.enVuelo += n;
    estado.maxEnVuelo = Math.max(estado.maxEnVuelo, estado.enVuelo);
  };

  const cache = {
    add: async (ruta) => {
      marcar(1);
      await new Promise((r) => setTimeout(r, 0));
      estado.enVuelo--;
      if (falla(ruta)) throw new TypeError('Failed to fetch');
      guardado.add(ruta);
    },
    // El de verdad es todo o nada: si una falla, no guarda ninguna.
    addAll: async (rutas) => {
      marcar(rutas.length);
      await new Promise((r) => setTimeout(r, 0));
      estado.enVuelo -= rutas.length;
      if (rutas.some(falla)) throw new TypeError('Failed to fetch');
      rutas.forEach((r) => guardado.add(r));
    },
    put: async (req, res) => {
      void res;
      // `putCuelga`: la escritura no termina nunca, para comprobar que la respuesta
      // no la espera. Es el modo en que un `await` de mas frena la pagina entera.
      if (putCuelga) return new Promise(() => {});
      guardado.add(String(req.url ?? req));
      return undefined;
    },
    match: async () => undefined,
  };

  const self_ = {
    location: { origin: 'http://localhost' },
    addEventListener: (tipo, fn) => { oyentes[tipo] = fn; },
    skipWaiting: () => {},
    clients: { claim: () => {} },
    caches: {
      open: async () => cache,
      keys: async () => [],
      delete: async () => true,
      match: async () => undefined,
    },
    console: { warn: () => {}, log: () => {}, error: () => {} },
    fetch: async () => respuesta ?? { ok: true, status: 200, type: 'basic', clone: () => ({}) },
  };
  self_.self = self_;

  // eslint-disable-next-line no-new-func
  new Function('self', 'caches', 'console', 'fetch', FUENTE)(
    self_, self_.caches, self_.console, self_.fetch);

  return { oyentes, guardado, estado };
}

/** Dispara el evento `install` y espera a que termine. */
export async function correrInstall(opciones = {}) {
  const { oyentes, guardado, estado } = montar(opciones);
  const esperas = [];
  oyentes.install({ waitUntil: (p) => esperas.push(p) });
  await Promise.all(esperas);
  return { guardado, maxEnVuelo: estado.maxEnVuelo };
}

/** Dispara un `fetch` y devuelve si el worker lo atendió y qué guardó. */
export async function correrFetch(url, { metodo = 'GET', tipo = 'basic', putCuelga = false } = {}) {
  const { oyentes, guardado } = montar({
    putCuelga,
    respuesta: { ok: true, status: 200, type: tipo, clone: () => ({ cuerpo: url }) },
  });

  let atendida = null;
  const pendientes = [];
  oyentes.fetch({
    request: { url, method: metodo },
    respondWith: (p) => { atendida = p; },
    waitUntil: (p) => pendientes.push(p),
  });

  const respuesta = atendida ? await atendida : null;
  return { respondio: atendida !== null, respuesta, guardado, pendientes };
}
