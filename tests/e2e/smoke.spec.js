// @ts-check
const { test, expect } = require('@playwright/test');

// Colector de errores de JS/consola en toda la suite — cualquier error real
// de runtime debe hacer fallar el test (no solo confiar en el error-banner visual).
function trackErrors(page) {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

test.describe('humo — flujo principal', () => {
  test('carga el splash sin errores de consola', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');
    await expect(page.locator('#splashScreen')).toBeVisible();
    await expect(page.locator('#splashBtn')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('splash -> menú -> nueva partida -> valida nombre -> entra al juego', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');
    await page.click('#splashBtn');
    await expect(page.locator('#menuScreen')).toBeVisible();

    await page.click('text=🎮 Nueva Partida');
    await expect(page.locator('#avatarScreen')).toBeVisible();

    // Nombre vacío / muy corto no debe dejar avanzar
    await page.fill('#playerNameInput', 'Ana');
    await page.click('text=Comenzar ✓');
    await expect(page.locator('#avatarScreen')).toBeVisible(); // sigue en avatarScreen

    // Nombre válido sí avanza
    await page.fill('#playerNameInput', 'Anabella');
    await page.click('text=Comenzar ✓');
    await expect(page.locator('#gameScreen')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('Atlas Celular: entra desde el menú y "Volver" regresa al menú', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');
    await page.click('#splashBtn');
    await page.click('text=🔬 Atlas Celular');
    await expect(page.locator('#atlasScreen')).toBeVisible();

    await page.click('.atlas-back-btn');
    await expect(page.locator('#menuScreen')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('error-banner: una excepción no capturada muestra el banner rojo', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      setTimeout(() => { throw new Error('error de prueba e2e'); }, 0);
    });
    const banner = page.locator('#__err_banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('error de prueba e2e');
  });
});
