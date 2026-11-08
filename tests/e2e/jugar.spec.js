// @ts-check
// Jugar de verdad: desde una partida nueva, resolver minijuegos con el mouse y los botones
// que usa el alumno. Lo que los tests unitarios no ven: que el camino de entrada funcione.
const { test, expect } = require('@playwright/test');
const {
  vigilar,
  sinTutorial,
  entrarPartidaNueva,
  desbloquearCelulas,
  elegirCelula,
  abrirOrganela,
  puzzleActual,
  resolverPuzzle,
} = require('./helpers');

// Resuelve bien todos los puzzles de la organela abierta y espera a la tarjeta final.
async function completarOrganela(page) {
  const tipos = [];
  for (;;) {
    const { idx, total } = await puzzleActual(page);
    tipos.push(await resolverPuzzle(page));
    // El cartel de acierto dura 1,5 s y con la maquina cargada se pierde entre dos lecturas:
    // se espera al estado del juego (avanzo el puzzle), que no desaparece.
    await expect.poll(() => page.evaluate(() => GS.mgIndex)).toBeGreaterThan(idx);
    if (idx + 1 < total) {
      await expect(page.locator('.mg-progress-counter')).toContainText(`Puzzle ${idx + 2} / ${total}`, { timeout: 8000 });
    } else {
      await expect(page.locator('.org-done-card')).toBeVisible({ timeout: 8000 });
      return tipos;
    }
  }
}

test.describe('jugar minijuegos desde cero', () => {
  test.setTimeout(120_000);

  let v;
  test.beforeEach(async ({ page }, testInfo) => {
    await sinTutorial(page);
    v = vigilar(page, testInfo);
  });
  // El diario se escribe aunque el test falle: es donde aparece la causa raiz.
  test.afterEach(async () => {
    if (v) await v.volcar();
  });

  test('normal: una organela con los cuatro tipos (quiz, completar, V/F, ordenar) se completa y da XP', async ({ page }) => {
    await entrarPartidaNueva(page, { dificultad: 'normal' });
    await elegirCelula(page, 'animal');
    await abrirOrganela(page, 'ribosome');

    const xp0 = await page.evaluate(() => GS.xp);
    const tipos = await completarOrganela(page);

    expect(new Set(tipos)).toEqual(new Set(['quiz', 'fill', 'trueFalse', 'sequence']));
    const estado = await page.evaluate(() => ({
      completa: !!(GS.completed.animal || {}).ribosome,
      xp: GS.xp,
      score: GS.score,
      guardado: !!localStorage.getItem('cq3'),
    }));
    expect(estado.completa).toBe(true);
    expect(estado.xp).toBeGreaterThan(xp0);
    expect(estado.score).toBeGreaterThan(0);
    expect(estado.guardado).toBe(true);
    await expect(page.locator('#opPills')).toContainText('Organela completa');

    expect(v.errores).toEqual([]);
  });

  test('quiz: una respuesta mala resta puntos y muestra la correcta; el puzzle se repite', async ({ page }) => {
    await entrarPartidaNueva(page, { dificultad: 'normal' });
    await elegirCelula(page, 'animal');
    await abrirOrganela(page, 'nucleus');
    await page.evaluate(() => { GS.score = 50; document.getElementById('ghScore').textContent = 50; });

    const antes = await puzzleActual(page);
    expect(antes.mg.type).toBe('quiz');
    await resolverPuzzle(page, { bien: false });
    await expect(page.locator('.mg-feedback.error')).toContainText('Incorrecto');
    await expect(page.locator('.mg-opt.correct')).toHaveCount(1);
    expect(await page.evaluate(() => GS.score)).toBe(40);
    expect(await page.evaluate(() => GS.mgIndex)).toBe(antes.idx);
    // Pasados 2,2 s el mismo puzzle vuelve a cargarse, sin avanzar.
    await expect(page.locator('.mg-feedback.error')).toHaveCount(0, { timeout: 5000 });
    await expect(page.locator('.mg-progress-counter')).toContainText(`Puzzle ${antes.idx + 1} /`);

    expect(v.errores).toEqual([]);
  });

  test('dificil: una organela con completar de respuesta libre se puede terminar', async ({ page }) => {
    await entrarPartidaNueva(page, { dificultad: 'hard' });
    await desbloquearCelulas(page);
    await elegirCelula(page, 'prokaryote');
    await abrirOrganela(page, 'nucleoid');

    const tipos = await completarOrganela(page);
    expect(tipos.filter((t) => t === 'fill').length).toBeGreaterThanOrEqual(3);
    expect(await page.evaluate(() => !!(GS.completed.prokaryote || {}).nucleoid)).toBe(true);

    expect(v.errores).toEqual([]);
  });
});
