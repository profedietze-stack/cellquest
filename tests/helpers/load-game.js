// Carga los scripts window-global del juego (sin módulos ES) dentro de un jsdom,
// para poder testear su lógica desde Node sin levantar un navegador real.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..', '..');

// Orden real de carga (ver index.html) — solo lo necesario para lógica pura.
const CORE_SCRIPTS = [
  'js/data/levels.js',
  'js/data/organelles.js',
  'js/data/minigames.js',
  'js/core/state.js',
  'js/core/save.js',
  'js/systems/xp.js',
];

const EXPOSE_NAMES = [
  'LEVELS', 'ORGANELLES', 'MINIGAMES_ALL',
  'GS', 'AV_EMOJI', 'DIFF_LABEL',
  'PLAYER_LEVELS', 'CELL_XP_UNLOCK', 'DIFF_XP', 'REVIEW_XP',
  'getPlayerLevel', 'getNextLevel', 'addXP', 'checkXPUnlocks', 'updateXPDisplay',
  'saveGame', 'loadSave',
];

function loadGame(scripts = CORE_SCRIPTS) {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost/',
    runScripts: 'dangerously',
  });
  // requestAnimationFrame no existe en jsdom por defecto
  dom.window.requestAnimationFrame = dom.window.requestAnimationFrame || ((cb) => setTimeout(cb, 0));

  // Un solo eval: jsdom no comparte bindings `const/let` entre llamadas separadas.
  const combined = scripts
    .map((rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8'))
    .join('\n;\n');
  // `const/let` de nivel superior no quedan como propiedades de `window`
  // (solo `var`/funciones lo hacen) — se exponen a mano para poder testearlas.
  const expose = EXPOSE_NAMES
    .map((n) => `try{window.${n}=${n};}catch(e){}`)
    .join('\n');
  dom.window.eval(combined + '\n' + expose);

  return dom.window;
}

module.exports = { loadGame, CORE_SCRIPTS, ROOT };
