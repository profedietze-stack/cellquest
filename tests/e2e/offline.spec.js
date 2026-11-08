// @ts-check
// El juego anda sin internet, de verdad: Chromium real, service worker real, servidor apagado.
//
// Receta del checklist (juegos-checklist §2.1):
//  - Hacen falta DOS visitas con red antes de que ande offline: en la primera el worker
//    toma control recien al final, asi que lo que ya se pidio no paso por su `fetch`.
//  - Antes de dar el test por bueno hay que comprobar que el servidor de verdad no
//    contesta: si sigue vivo la pagina carga igual y no se probo nada.
//  - El servidor se mata al terminar, pase lo que pase.
//
// Usa su propio servidor (tests/servidor.py en otro puerto) para poder apagarlo sin tirar
// abajo al de la suite, que comparten los demas tests en paralelo.
const { test, expect } = require('@playwright/test');
const { spawn, spawnSync } = require('child_process');
const net = require('net');
const path = require('path');
const { vigilar, sinTutorial } = require('./helpers');

const PUERTO = 4181;
const BASE = `http://127.0.0.1:${PUERTO}`;
const RAIZ = path.resolve(__dirname, '..', '..');

function puertoOcupado() {
  return new Promise((resolve) => {
    const s = net.connect(PUERTO, '127.0.0.1');
    s.once('connect', () => { s.destroy(); resolve(true); });
    s.once('error', () => resolve(false));
  });
}

async function esperarServidor(tiene) {
  for (let i = 0; i < 40; i++) {
    if ((await puertoOcupado()) === tiene) return;
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`el puerto ${PUERTO} no quedo ${tiene ? 'escuchando' : 'libre'}`);
}

// `py` lanza python como proceso hijo: en Windows hay que matar el arbol entero.
function matar(proc) {
  if (!proc || proc.killed) return;
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(proc.pid), '/T', '/F']);
  else proc.kill('SIGKILL');
}

test.describe('sin internet', () => {
  test.setTimeout(120_000);
  test.describe.configure({ mode: 'serial' });

  test('dos visitas con red, se apaga el servidor y el juego carga y se puede jugar', async ({ page }, testInfo) => {
    // Un servidor de otra sesion en el mismo puerto invalidaria la medicion.
    expect(await puertoOcupado(), `el puerto ${PUERTO} ya estaba ocupado: hay otro servidor vivo`).toBe(false);

    const py = process.platform === 'win32' ? 'py' : 'python3';
    const servidor = spawn(py, ['tests/servidor.py', String(PUERTO)], { cwd: RAIZ, stdio: 'ignore' });
    const v = vigilar(page, testInfo, { ignorarPedidosCaidos: true });
    try {
      await esperarServidor(true);
      await sinTutorial(page);

      // Visita 1: instala el service worker y precachea.
      await page.goto(BASE + '/');
      await expect(page.locator('#splashScreen')).toBeVisible();
      await page.evaluate(() => navigator.serviceWorker.ready);
      // Visita 2: ahora el worker controla la pagina y guarda lo que se pide al pasar
      // (las tipografias no entran en el install a proposito, ver cellquest-sw.js).
      await page.reload();
      await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller), { timeout: 15000 }).toBe(true);
      await expect(page.locator('#splashScreen')).toBeVisible();
      // Se toca el juego para que se pida (y guarde) todo lo que usa un alumno: menu y partida.
      await page.click('#splashBtn');
      await page.click('text=🎮 Nueva Partida');
      await page.fill('#playerNameInput', 'Anabella');
      await page.click('text=Comenzar ✓');
      await expect(page.locator('#gameScreen')).toBeVisible();
      const nombreCache = await page.evaluate(async () => (await caches.keys()).find((k) => k.startsWith('cellquest-')));
      expect(nombreCache, 'el worker no creo su cache').toBeTruthy();
      // El precache entero (tandas de a seis) tiene que haber terminado antes de apagar.
      const esperados = await page.evaluate(() => fetch('./cellquest-sw.js').then((r) => r.text())).then(
        (t) => (t.match(/^\s+'\.\/[^']*',/gm) || []).length,
      );
      await expect.poll(
        () => page.evaluate(async (n) => (await (await caches.open(n)).keys()).length, nombreCache),
        { timeout: 30000, message: 'la cache no llego a tener todo el precache' },
      ).toBeGreaterThanOrEqual(esperados);

      // El worker calienta las tipografias a los pocos segundos de cargar la pagina: todas,
      // incluidas las que solo se pide en pantallas que este recorrido no visito (nunito-600
      // es del panel de preguntas).
      await expect.poll(
        () => page.evaluate(async (n) => {
          const c = await caches.open(n);
          return (await c.keys()).filter((r) => r.url.endsWith('.woff2')).length;
        }, nombreCache),
        { timeout: 30000, message: 'el worker no guardo las 16 tipografias' },
      ).toBe(16);

      // Se apaga el servidor y se comprueba que de verdad no contesta.
      matar(servidor);
      await esperarServidor(false);
      const respuesta = await fetch(BASE + '/').then(() => 'respondio', () => 'no responde');
      expect(respuesta, 'el servidor sigue contestando: la prueba no probaria nada').toBe('no responde');

      // Offline: recarga completa. Carga desde la cache del worker, sin errores del juego.
      v.errores.length = 0;
      await page.reload();
      await expect(page.locator('#splashScreen')).toBeVisible();
      expect(await page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
      expect(await page.title()).toMatch(/CellQuest/i);

      // Y se juega: portada -> menu -> partida -> celula -> organela -> primer puzzle.
      await page.click('#splashBtn');
      await expect(page.locator('#menuScreen')).toBeVisible();
      await page.click('text=🎮 Nueva Partida');
      await page.fill('#playerNameInput', 'Anabella');
      await page.click('text=Comenzar ✓');
      await expect(page.locator('#gameScreen')).toBeVisible();
      await page.locator('#levelGrid .level-card:not(.lc-locked)').click();
      await page.locator('#cellSvg [data-org-id="nucleus"]').first().dispatchEvent('click');
      await page.locator('.org-intro-btn').click();
      await expect(page.locator('.mg-opt').first()).toBeVisible();
      // Ninguna tipografia local quedo en error (se sirvieron desde la cache del worker).
      expect(await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'error').map((f) => f.family))).toEqual([]);
      await expect(page.locator('#__err_banner')).toBeHidden();
      // Ningun pedido del juego se cayo: todo salio del worker.
      const caidos = v.errores.filter((e) => e.startsWith('[requestfailed]') || e.startsWith('[http]'));
      expect(caidos, 'pedidos que fallaron offline').toEqual([]);
    } finally {
      await v.volcar();
      matar(servidor);
    }
  });
});
