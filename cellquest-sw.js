// CellQuest Service Worker — offline cache
const CACHE = 'cellquest-v26';
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

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    // ignoreSearch: true so versioned ?v=XX requests match cached bare URLs
    caches.match(e.request, {ignoreSearch: true}).then(cached => cached || fetch(e.request))
  );
});


