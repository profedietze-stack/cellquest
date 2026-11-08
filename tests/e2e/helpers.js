// Utilidades compartidas por los e2e de CellQuest.
const fs = require('fs');

const TUTORIAL_KEY = 'cq3_tutorial';

// Colector de todo lo que el navegador reporta: errores de JS, consola, pedidos caidos
// y respuestas 4xx/5xx. Todo va a un diario (se adjunta al reporte de cada test) y lo que
// es un error real queda en `errores`, para que el test falle si hay alguno.
//
// `ignorar` deja pasar pedidos caidos a proposito (el test offline apaga el servidor).
function vigilar(page, testInfo, { ignorarPedidosCaidos = false } = {}) {
  const diario = [];
  const errores = [];
  const nota = (tipo, texto, esError) => {
    diario.push(`${new Date().toISOString()} [${tipo}] ${texto}`);
    if (esError) errores.push(`[${tipo}] ${texto}`);
  };
  page.on('pageerror', (e) => nota('pageerror', e.stack || e.message, true));
  page.on('console', (m) => nota(`console.${m.type()}`, m.text(), m.type() === 'error'));
  page.on('requestfailed', (r) => {
    const causa = r.failure() ? r.failure().errorText : '?';
    // ERR_ABORTED es el navegador cancelando un pedido al navegar o recargar: no es un fallo.
    nota('requestfailed', `${r.method()} ${r.url()} ${causa}`, !ignorarPedidosCaidos && !/ERR_ABORTED/.test(causa));
  });
  page.on('response', (r) => {
    if (r.status() >= 400) nota('http', `${r.status()} ${r.url()}`, true);
  });
  return {
    errores,
    diario,
    async volcar() {
      const ruta = testInfo.outputPath('diario.log');
      fs.writeFileSync(ruta, diario.join('\n') + '\n', 'utf8');
      await testInfo.attach('diario', { path: ruta, contentType: 'text/plain' });
    },
  };
}

// El tutorial de primer uso tapa la pantalla con un overlay: los tests de juego lo dan por
// visto. (El audio ya sale silenciado: Chromium de Playwright corre con --mute-audio, ver
// playwright.config.js.)
async function sinTutorial(page) {
  await page.addInitScript((k) => {
    try { localStorage.setItem(k, '1'); } catch { /* sin storage */ }
  }, TUTORIAL_KEY);
}

// Portada -> menu -> partida nueva -> avatar/dificultad -> nombre -> juego.
// `dificultad`: 'easy' | 'normal' | 'hard' (data-diff de las tarjetas).
async function entrarPartidaNueva(page, { dificultad = 'normal', nombre = 'Anabella' } = {}) {
  await page.goto('/');
  await page.click('#splashBtn');
  await page.click('text=🎮 Nueva Partida');
  await page.locator(`.diff-card[data-diff="${dificultad}"]`).click();
  await page.fill('#playerNameInput', nombre);
  await page.click('text=Comenzar ✓');
  await page.locator('#gameScreen').waitFor({ state: 'visible' });
}

// Desbloquea todas las celulas desde el propio estado del juego (lo mismo que haria
// ganar XP) para poder recorrerlas sin jugar horas.
async function desbloquearCelulas(page) {
  await page.evaluate(() => {
    GS.levels.forEach((l) => { l.unlocked = true; });
    renderLevelGrid();
  });
}

async function elegirCelula(page, id) {
  await page.evaluate((i) => startLevel(i), id);
  await page.locator('#cellSvg [data-org-id]').first().waitFor({ state: 'attached' });
}

// Click de verdad sobre una organela del dibujo y paso por la tarjeta de introduccion.
async function abrirOrganela(page, orgId) {
  await page.locator(`#cellSvg [data-org-id="${orgId}"]`).first().dispatchEvent('click');
  await page.locator('#tabOrganelle').waitFor({ state: 'visible' });
  const intro = page.locator('.org-intro-btn');
  if (await intro.count()) await intro.click();
  await page.locator('.mg-type-badge').waitFor({ state: 'visible' });
}

// Lo que el test necesita saber del puzzle en pantalla (los datos viven en el estado, no en el DOM).
async function puzzleActual(page) {
  return page.evaluate(() => {
    const mgs = getMG(GS.currentOrg);
    const mg = mgs[GS.mgIndex];
    return {
      idx: GS.mgIndex,
      total: mgs.length,
      mg: JSON.parse(JSON.stringify(mg)),
      quizOrden: GS.quizOrden ? [...GS.quizOrden] : null,
    };
  });
}

// Arrastra con el mouse los items de una secuencia hasta dejarlos en el orden correcto.
async function ordenarSecuencia(page) {
  const n = await page.locator('#seqItems .seq-item').count();
  for (let destino = 0; destino < n; destino++) {
    const items = page.locator('#seqItems .seq-item');
    const orden = await items.evaluateAll((els) => els.map((e) => Number(e.dataset.orig)));
    const desde = orden.indexOf(destino);
    if (desde === destino) continue;
    const a = await items.nth(desde).boundingBox();
    const b = await items.nth(destino).boundingBox();
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await page.mouse.down();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 6 });
    // Mitad superior del objetivo: el juego inserta antes de el.
    await page.mouse.move(b.x + b.width / 2, b.y + 3, { steps: 3 });
    await page.mouse.up();
  }
}

// Resuelve el puzzle en pantalla. `bien=false` responde mal a proposito (solo quiz).
async function resolverPuzzle(page, { bien = true } = {}) {
  const { mg, quizOrden } = await puzzleActual(page);
  if (mg.type === 'quiz') {
    const pos = quizOrden.indexOf(mg.ans);
    const elegir = bien ? pos : (pos + 1) % mg.opts.length;
    await page.locator('.mg-opt').nth(elegir).click();
    await page.click('#mgBtn');
  } else if (mg.type === 'fill') {
    if (mg.s) {
      await page.locator('.fill-word', { hasText: new RegExp(`^${escapar(mg.cor)}$`) }).click();
      await page.click('#mgBtn');
    } else {
      await page.fill('#fillInput', mg.a);
      await page.click('#mgBtn');
    }
  } else if (mg.type === 'trueFalse') {
    for (let i = 0; i < mg.items.length; i++) {
      const fila = page.locator('.tf-item').nth(i);
      await fila.locator(mg.items[i].a ? '.tf-true' : '.tf-false').click();
    }
    await page.click('#tfSubmitBtn');
  } else if (mg.type === 'sequence') {
    await ordenarSecuencia(page);
    await page.click('text=Verificar Orden');
  } else {
    throw new Error('tipo de puzzle desconocido: ' + mg.type);
  }
  return mg.type;
}

function escapar(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  vigilar,
  sinTutorial,
  entrarPartidaNueva,
  desbloquearCelulas,
  elegirCelula,
  abrirOrganela,
  puzzleActual,
  resolverPuzzle,
};
