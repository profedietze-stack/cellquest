const fs = require('fs');
const path = require('path');
const js = require('@eslint/js');
const globals = require('globals');

// El juego carga scripts sueltos (sin modulos): todo lo declarado a nivel superior en un
// archivo es global para los demas. En vez de mantener esa lista a mano (y que un
// archivo nuevo la deje vieja), se arma leyendo los propios archivos: asi `no-undef`
// sigue cazando errores de tipeo y funciones que no existen, sin falsos positivos.
const RAIZ = __dirname;
const CARPETAS = ['js/data', 'js/core', 'js/systems', 'js/components', 'js/screens', 'js/dev'];

function globalesDelJuego() {
  const nombres = {};
  for (const carpeta of CARPETAS) {
    for (const f of fs.readdirSync(path.join(RAIZ, carpeta))) {
      if (!f.endsWith('.js')) continue;
      const src = fs.readFileSync(path.join(RAIZ, carpeta, f), 'utf8');
      const re = /^(?:async\s+)?(?:function\s*\*?\s*(\w+)|(?:const|let|var)\s+(\w+))/gm;
      let m;
      while ((m = re.exec(src))) nombres[m[1] || m[2]] = 'writable';
      // Lo que un IIFE publica a mano: `window.nombre = ...`.
      const reWin = /\bwindow\.(\w+)\s*=[^=]/g;
      while ((m = reWin.exec(src))) nombres[m[1]] = 'writable';
    }
  }
  return nombres;
}

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'test-results/**',
      'playwright-report/**',
      'coverage/**',
      '.superpowers/**',
      '.remember/**',
      'fonts/**',
      'js/lib/**',
      // Herramientas de parcheo locales, ya ignoradas por git.
      'patch_*.js',
      'fix_*.js',
      'add_*.js',
    ],
  },
  js.configs.recommended,
  {
    files: ['js/**/*.js', 'cellquest-sw.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        Tone: 'readonly',
        ...globalesDelJuego(),
      },
    },
    rules: {
      // Con scripts sueltos, lo declarado a nivel superior lo usa otro archivo: 'local'
      // evita marcarlo como sin uso y sigue revisando lo de adentro de cada funcion.
      'no-unused-vars': ['error', { vars: 'local', args: 'none', caughtErrors: 'none' }],
      // Los globales del juego se declaran en su propio archivo; no es una redeclaracion.
      'no-redeclare': ['error', { builtinGlobals: false }],
      // Sonido, localStorage y pantalla completa son de mejor esfuerzo: si el navegador
      // los niega, el juego sigue. Un `catch{}` vacio ahi es intencional; un `if{}` vacio no.
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  {
    // Los e2e corren funciones del juego con page.evaluate (`GS`, `getMG`...): el codigo
    // se serializa y se ejecuta en la pagina, donde esos nombres si existen.
    files: ['tests/e2e/**/*.js'],
    languageOptions: {
      globals: Object.fromEntries(Object.keys(globalesDelJuego()).map((n) => [n, 'readonly'])),
    },
  },
  {
    files: ['tests/**/*.js', 'playwright.config.js', 'vitest.config.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser },
    },
  },
];
