const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  // Cada test abre un Chromium que dibuja SVG con animaciones: con la maquina cargada (otros
  // navegadores, otros servidores) cuatro a la vez se pasaban del tiempo y los rojos eran de
  // carga, no del juego. Menos workers y mas margen, en vez de convivir con rojos intermitentes.
  workers: process.env.CI ? 2 : 3,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  // Un reintento: en esta maquina el navegador de un worker a veces muere solo ("Target page,
  // context or browser has been closed" en 34 ms, antes de cargar el juego, o "Test ended" al
  // cerrar el contexto), sin relacion con el juego. El reporte marca cada reintento como
  // `flaky`, asi que no se esconde: se ve en la lista.
  retries: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    // Servidor propio: el del modulo estandar rechaza conexiones bajo la concurrencia
    // de esta suite y los ECONNREFUSED se leian como errores del juego. Ver tests/servidor.py.
    command: 'py tests/servidor.py 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 20000,
  },
});
