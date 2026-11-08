// El sello de la cache del service worker: si cambia algo precacheado hay que subir CACHE.
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { nombreDeCache, archivosPrecacheados, huella, RUTA_SELLO, RAIZ } = require('./sello.js');
const path = require('path');

describe('sello de la cache del service worker', () => {
  it('todo lo que se precachea existe (un 404 en el install deja el juego sin offline)', () => {
    const faltan = archivosPrecacheados().filter((rel) => !existsSync(path.join(RAIZ, rel)));
    expect(faltan, `no existen: ${faltan.join(', ')}`).toEqual([]);
  });

  it('el contenido precacheado no cambio sin subir el nombre de la cache', () => {
    const sello = JSON.parse(readFileSync(RUTA_SELLO, 'utf8'));
    const nombre = nombreDeCache();
    const actual = huella();
    if (nombre === sello.cache) {
      expect(
        actual,
        `Cambio un archivo precacheado y CACHE sigue siendo '${nombre}': los alumnos que ya ` +
          'instalaron el juego se quedarian con la version vieja para siempre. ' +
          "Subi el numero en cellquest-sw.js y corre `npm run sellar`.",
      ).toBe(sello.huella);
    } else {
      // Se subio el nombre: el sello tiene que registrar el nuevo para el proximo cambio.
      expect(
        { cache: nombre, huella: actual },
        'Subiste CACHE pero falta registrar el sello: corre `npm run sellar`.',
      ).toEqual(sello);
    }
  });
});
