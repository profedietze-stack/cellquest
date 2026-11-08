// CellQuest Service Worker — offline cache
const CACHE = 'cellquest-v34';
const ASSETS = [
  './',
  './index.html',
  './css/variables.css',
  './css/screens.css',
  './css/minigames.css',
  './css/atlas.css',
  './css/modals.css',
  './css/animations.css',
  './css/procesos.css',
  // La hoja de tipografias entra aca porque `variables.css` la importa antes de pintar.
  // Los .woff2 NO: son dieciseis pedidos que competirian con la primera carga de la pagina
  // (medido: la suite e2e se iba a 30 s y timeouts). La pagina los pide sola en cuanto lee
  // la hoja, y el `fetch` de mas abajo guarda esa misma respuesta: quedan cacheados igual,
  // sin un solo pedido de mas.
  './css/fuentes.css',
  // El banner de errores es la primera linea del arranque y lo unico que le dice al
  // docente que se rompio; sin el, offline la pantalla se queda muda.
  './js/dev/error-banner.js',
  './js/dev/debug.js',
  './js/lib/tone.min.js',
  './js/data/levels.js',
  './js/data/organelles.js',
  './js/data/minigames.js',
  './js/core/state.js',
  './js/core/save.js',
  './js/core/router.js',
  './js/screens/atlas.js',
  './js/screens/game.js',
  './js/screens/progress.js',
  './js/screens/procesos.js',
  './js/screens/minigame-engine.js',
  './js/screens/splash.js',
  './js/screens/tutorial.js',
  './js/systems/xp.js',
  './js/components/cell-renderer.js',
  './js/components/audio.js',
  './js/components/microscope.js',
  './js/components/zoom.js',
  './js/components/drawer.js',
];

// Las tipografias no entran en el install (compiten con la primera carga) pero tampoco
// pueden quedar libradas a "cuando alguien las use con red": un alumno que visito solo la
// portada y el menu se quedaba, offline, con el tipo de letra de reserva en el panel de
// preguntas (nunito-600 solo se pide ahi). La pagina avisa cuando ya cargo y se pasaron unos
// segundos, y aca se guardan de a una, sin ráfaga.
const FUENTES = [
  'nunito-400-latin', 'nunito-400-latin-ext', 'nunito-600-latin', 'nunito-600-latin-ext',
  'nunito-700-latin', 'nunito-700-latin-ext', 'nunito-800-latin', 'nunito-800-latin-ext',
  'space-grotesk-400-latin', 'space-grotesk-400-latin-ext', 'space-grotesk-500-latin',
  'space-grotesk-500-latin-ext', 'space-grotesk-600-latin', 'space-grotesk-600-latin-ext',
  'space-grotesk-700-latin', 'space-grotesk-700-latin-ext',
].map(n => './fonts/' + n + '.woff2');

async function calentarFuentes() {
  const cache = await caches.open(CACHE);
  for (const url of FUENTES) {
    try {
      if (!(await cache.match(url))) await cache.add(url);
    } catch (err) {
      // Sin red ahora: se reintenta la proxima vez que la pagina avise.
    }
  }
}

self.addEventListener('message', e => {
  if (e.data === 'calentar-fuentes') e.waitUntil(calentarFuentes());
});

// Precarga por tandas, archivo por archivo.
//
// `cache.addAll` es todo o nada: una sola peticion que no vuelva rechaza el install entero y
// no queda NADA cacheado — el juego se queda sin modo offline justo el dia que la red anda
// mal, que es el dia que hace falta. Y pedirlos todos de golpe es lo que hace que alguna no
// vuelva: treinta tablets contra el mismo access point, o el servidor de pruebas con cuatro
// navegadores encima, empiezan a rechazar conexiones.
//
// De a seis, cada una por su cuenta: lo que se cae se pierde solo a si mismo, y el `fetch`
// de mas abajo lo guarda la proxima vez que alguien lo pida con red.
const TANDA = 6;

async function precargar(cache) {
  const fallos = [];
  for (let i = 0; i < ASSETS.length; i += TANDA) {
    const grupo = ASSETS.slice(i, i + TANDA);
    const r = await Promise.allSettled(grupo.map(u => cache.add(u)));
    r.forEach((x, j) => { if (x.status === 'rejected') fallos.push(grupo[j]); });
  }
  if (fallos.length) console.warn('[CellQuest] SW: sin precachear (se reintenta al usarlos):', fallos);
}

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(precargar));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    // ignoreSearch: true so versioned ?v=XX requests match cached bare URLs
    caches.match(e.request, {ignoreSearch: true})
      .then(cached => cached || traerYGuardar(e.request, e))
  );
});

// Lo que no este en la cache se pide a la red y se guarda al pasar: asi lo que se cayo
// durante el install entra la primera vez que alguien lo usa con red, en vez de faltar
// para siempre en la version instalada.
//
// El guardado NO se espera antes de devolver la respuesta. Ponerle `await` delante del
// `return` mete una escritura en IndexedDB en el camino critico de CADA archivo del juego:
// medido, la suite e2e paso de 1,4 s a mas de 30 s por peticion encolada. Se clona ahora
// —despues de leer el cuerpo ya no se puede— y se guarda por detras con `waitUntil`, que
// mantiene vivo al worker hasta que termine sin frenar a la pagina.
function traerYGuardar(req, evento) {
  return fetch(req).then(res => {
    try {
      if (res && res.ok && res.type === 'basic' &&
          new URL(req.url).origin === self.location.origin) {
        const copia = res.clone();
        const guardado = caches.open(CACHE).then(c => c.put(req, copia));
        if (evento && evento.waitUntil) evento.waitUntil(guardado);
        else guardado.catch(() => {});
      }
    } catch (err) {
      console.warn('[CellQuest] SW: no se pudo guardar', req.url, err);
    }
    return res;
  });
}
