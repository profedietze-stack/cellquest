// @ts-check
// El celular de un alumno: 360 x 740, tactil. Sin scroll horizontal en ninguna pantalla y
// los controles que hacen falta para jugar entran en el ancho de la pantalla.
const { test, expect } = require('@playwright/test');
const { vigilar, sinTutorial, entrarPartidaNueva, elegirCelula } = require('./helpers');

const ANCHO = 360;
const ALTO = 740;

test.use({ viewport: { width: ANCHO, height: ALTO }, isMobile: true, hasTouch: true });

// Cuanto sobra de ancho de la pagina respecto de la pantalla (0 = nada se sale).
async function desborde(page) {
  const { ancho, sobra } = await page.evaluate(() => ({
    ancho: window.innerWidth,
    sobra: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
  }));
  // Si la emulacion de celular no se aplico, todo lo demas seria medir una pantalla de PC.
  expect(ancho, 'el navegador no esta en 360 px').toBe(ANCHO);
  return sobra;
}

// Un control entra a lo ancho: ni cortado a la izquierda ni pasado de los 360 px.
async function entraAlAncho(locator, nombre) {
  const caja = await locator.boundingBox();
  expect(caja, `${nombre}: no tiene caja (no se ve)`).not.toBeNull();
  expect(caja.x, `${nombre}: cortado por la izquierda`).toBeGreaterThanOrEqual(-0.5);
  expect(caja.x + caja.width, `${nombre}: se sale por la derecha`).toBeLessThanOrEqual(ANCHO + 0.5);
}

test.describe('celular 360 x 740', () => {
  test.setTimeout(90_000);

  let v;
  test.beforeEach(async ({ page }, testInfo) => {
    await sinTutorial(page);
    v = vigilar(page, testInfo);
  });
  test.afterEach(async () => {
    if (v) await v.volcar();
  });

  test('portada, menu y eleccion de dificultad sin scroll horizontal y con los botones a mano', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#splashBtn')).toBeVisible();
    await entraAlAncho(page.locator('#splashBtn'), 'boton de la portada');
    expect(await desborde(page), 'portada con scroll horizontal').toBe(0);

    await page.click('#splashBtn');
    await expect(page.locator('#menuScreen')).toBeVisible();
    const nueva = page.locator('text=🎮 Nueva Partida');
    await entraAlAncho(nueva, 'Nueva Partida');
    expect(await desborde(page), 'menu con scroll horizontal').toBe(0);

    await nueva.click();
    await expect(page.locator('#avatarScreen')).toBeVisible();
    for (const dif of ['easy', 'normal', 'hard']) {
      await entraAlAncho(page.locator(`.diff-card[data-diff="${dif}"]`), `tarjeta ${dif}`);
    }
    await entraAlAncho(page.locator('#playerNameInput'), 'campo de nombre');
    await entraAlAncho(page.locator('text=Comenzar ✓'), 'Comenzar');
    expect(await desborde(page), 'eleccion de dificultad con scroll horizontal').toBe(0);
    expect(v.errores).toEqual([]);
  });

  test('en el juego: celula visible, panel y minijuego entran en 360 px y se puede responder', async ({ page }) => {
    await entrarPartidaNueva(page);
    expect(await desborde(page), 'pantalla de juego con scroll horizontal').toBe(0);

    // El menu de celulas es un cajon en el celular, que se abre con su boton.
    const fab = page.locator('#drawerFab');
    await expect(fab).toBeVisible();
    await entraAlAncho(fab, 'boton del cajon');
    await elegirCelula(page, 'animal');
    const caja = await page.locator('#cellSvg').boundingBox();
    expect(caja, 'la celula no se dibuja').not.toBeNull();
    expect(caja.width, 'la celula quedo diminuta').toBeGreaterThan(200);
    expect(caja.x + caja.width, 'la celula se sale de la pantalla').toBeLessThanOrEqual(ANCHO + 0.5);

    // Abrir una organela con un toque en su dibujo: el panel de juego se abre en el celular.
    await page.locator('#cellSvg [data-org-id="nucleus"]').first().dispatchEvent('click');
    await expect(page.locator('#mgArea')).toBeVisible();
    const intro = page.locator('.org-intro-btn');
    if (await intro.count()) {
      await entraAlAncho(intro, 'boton de la introduccion');
      await intro.click();
    }
    await expect(page.locator('.mg-opt').first()).toBeVisible();
    const n = await page.locator('.mg-opt').count();
    for (let i = 0; i < n; i++) await entraAlAncho(page.locator('.mg-opt').nth(i), `opcion ${i + 1}`);
    await entraAlAncho(page.locator('#mgBtn'), 'Enviar Respuesta');
    expect(await desborde(page), 'minijuego con scroll horizontal').toBe(0);

    // Y se responde con un toque, como el alumno.
    await page.locator('.mg-opt').first().tap();
    await expect(page.locator('#mgBtn')).toBeEnabled();
    await page.locator('#mgBtn').tap();
    // El cartel de resultado dura 1,5 s y con la maquina cargada se puede perder entre dos
    // lecturas: se mira el estado del juego, que es lo que no se pierde.
    await expect.poll(() => page.evaluate(() => GS.totalDone + GS.mgErrors)).toBeGreaterThan(0);
    expect(v.errores).toEqual([]);
  });

  test('en Dificil la respuesta libre entra en 360 px', async ({ page }) => {
    await entrarPartidaNueva(page, { dificultad: 'hard' });
    await page.evaluate(() => { GS.levels.forEach((l) => { l.unlocked = true; }); });
    await elegirCelula(page, 'prokaryote');
    await page.evaluate(() => { GS.introduced = { 'prokaryote.nucleoid': true }; selectOrg('nucleoid', 'prokaryote'); });
    // Se salta a un puzzle de respuesta libre.
    const i = await page.evaluate(() => getMG('nucleoid').findIndex((m) => m.type === 'fill' && typeof m.s !== 'string'));
    expect(i, 'no hay completar de respuesta libre en nucleoid').toBeGreaterThan(-1);
    await page.evaluate((k) => { GS.mgIndex = k; loadMG('nucleoid', 'prokaryote'); }, i);
    await expect(page.locator('#fillInput')).toBeVisible();
    await entraAlAncho(page.locator('#fillInput'), 'campo de respuesta');
    await entraAlAncho(page.locator('#mgBtn'), 'Enviar Respuesta');
    expect(await desborde(page), 'respuesta libre con scroll horizontal').toBe(0);
    expect(v.errores).toEqual([]);
  });
});
