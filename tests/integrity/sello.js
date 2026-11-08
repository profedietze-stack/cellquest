// Huella del contenido que el service worker precachea, para el test del sello de caché.
//
// El service worker sirve cache-first: quien ya lo tiene instalado NO ve un archivo nuevo
// hasta que cambie el nombre `CACHE`. Olvidarse de subirlo es silencioso (el juego sigue
// andando, con la version vieja, para siempre) y ya paso. El sello lo vuelve ruidoso:
// `sello-cache.json` guarda el nombre y la huella del contenido; si el contenido cambia y el
// nombre no, el test falla.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RAIZ = path.resolve(__dirname, '..', '..');

function leerSw() {
  return fs.readFileSync(path.join(RAIZ, 'cellquest-sw.js'), 'utf8');
}

function nombreDeCache() {
  const m = leerSw().match(/const CACHE = '([^']+)'/);
  if (!m) throw new Error('no se encontro `const CACHE` en cellquest-sw.js');
  return m[1];
}

// Los mismos archivos que el worker precachea (`./` es el index).
function archivosPrecacheados() {
  const bloque = leerSw().match(/const ASSETS = \[([\s\S]*?)\n\];/);
  if (!bloque) throw new Error('no se encontro `const ASSETS` en cellquest-sw.js');
  const rutas = [...bloque[1].matchAll(/'\.\/([^']*)'/g)].map((m) => m[1] || 'index.html');
  return rutas;
}

// Fin de linea normalizado: la misma huella en Windows (CRLF) y en el servidor (LF).
function huella() {
  const h = crypto.createHash('sha256');
  const archivos = [...archivosPrecacheados(), 'cellquest-sw.js'].sort();
  for (const rel of archivos) {
    const txt = fs.readFileSync(path.join(RAIZ, rel), 'utf8').replace(/\r\n/g, '\n');
    // El nombre de la cache queda fuera de su propia huella: subirlo no debe cambiarla.
    const limpio = rel === 'cellquest-sw.js' ? txt.replace(/const CACHE = '[^']+';/, '') : txt;
    h.update(rel + '\0' + limpio + '\0');
  }
  return h.digest('hex');
}

const RUTA_SELLO = path.join(__dirname, 'sello-cache.json');

module.exports = { nombreDeCache, archivosPrecacheados, huella, RUTA_SELLO, RAIZ };

// `node tests/integrity/sello.js --escribir` regraba el sello despues de subir CACHE.
if (require.main === module && process.argv.includes('--escribir')) {
  const sello = { cache: nombreDeCache(), huella: huella() };
  fs.writeFileSync(RUTA_SELLO, JSON.stringify(sello, null, 2) + '\n', 'utf8');
  console.log('sello escrito:', sello);
}
