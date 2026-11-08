// @ts-check
// Recorrer todas las celulas del juego: el dibujo trae todas sus organelas y cada una abre su
// panel (tarjeta de introduccion o primer puzzle) sin un solo error de consola.
const { test, expect } = require('@playwright/test');
const { vigilar, sinTutorial, entrarPartidaNueva, desbloquearCelulas, elegirCelula } = require('./helpers');

// Los ids salen del propio juego, asi una celula nueva entra sola al recorrido.
const CELULAS = require('../helpers/load-game')
  .loadGame()
  .LEVELS.map((l) => ({ id: l.id, nombre: l.name }));

test.describe('recorrer las celulas', () => {
  test.setTimeout(90_000);

  let v;
  test.beforeEach(async ({ page }, testInfo) => {
    await sinTutorial(page);
    v = vigilar(page, testInfo);
  });
  test.afterEach(async () => {
    await v.volcar();
  });

  test('hay mas de una celula que recorrer', () => {
    expect(CELULAS.length).toBeGreaterThanOrEqual(7);
  });

  for (const { id, nombre } of CELULAS) {
    test(`${nombre}: dibuja todas sus organelas y cada una abre su panel`, async ({ page }) => {
      await entrarPartidaNueva(page);
      await desbloquearCelulas(page);
      await elegirCelula(page, id);

      const esperadas = await page.evaluate((i) => ORGANELLES[i].map((o) => ({ id: o.id, name: o.name })), id);
      expect(esperadas.length).toBeGreaterThan(0);

      // Cada organela de los datos tiene su grupo en el dibujo.
      const dibujadas = await page.locator('#cellSvg [data-org-id]').evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute('data-org-id')))]);
      const sinDibujo = esperadas.filter((o) => !dibujadas.includes(o.id)).map((o) => o.id);
      expect(sinDibujo, `organelas sin dibujo en ${id}`).toEqual([]);

      // Un click en cada una, todas en una sola pasada dentro de la pagina: hacerlo de a un
      // pedido por organela era lento con cuatro navegadores en paralelo y se pasaba del
      // tiempo. El panel muestra su nombre y algo que jugar.
      const problemas = await page.evaluate((orgs) => {
        const fallas = [];
        for (const org of orgs) {
          const g = document.querySelector(`#cellSvg [data-org-id="${org.id}"]`);
          g.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          if (document.getElementById('opName').textContent !== org.name) fallas.push(`${org.id}: el panel no muestra su nombre`);
          if (document.getElementById('mgArea').children.length === 0) fallas.push(`${org.id}: el panel de minijuegos quedo vacio`);
          if (GS.currentOrg !== org.id) fallas.push(`${org.id}: no quedo como organela actual`);
        }
        return fallas;
      }, esperadas);
      expect(problemas).toEqual([]);

      expect(v.errores).toEqual([]);
    });
  }

  test('el menu muestra las celulas con su estado y entrar a una desbloqueada la dibuja', async ({ page }) => {
    await entrarPartidaNueva(page);
    await expect(page.locator('#levelGrid .level-card')).toHaveCount(CELULAS.length);
    // Solo la animal arranca desbloqueada.
    await expect(page.locator('#levelGrid .level-card.lc-locked')).toHaveCount(CELULAS.length - 1);
    await page.locator('#levelGrid .level-card:not(.lc-locked)').click();
    await expect(page.locator('#cellSvg [data-org-id]').first()).toBeAttached();
    expect(await page.evaluate(() => GS.currentLevel)).toBe('animal');
    expect(v.errores).toEqual([]);
  });
});
