# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CellQuest — Spanish-language educational biology game (PWA). Vanilla JS + CSS, no build step, no bundler. Deployed on Vercel via `git push origin main`. Auto-deploy on push.

## Running locally

```
python -m http.server 3400
```

Open `http://localhost:3400`. The `.claude/launch.json` config uses port 3400.

## Architecture

Single-page app. One `index.html` with all screens as `<div id="XScreen" class="screen">` divs. Screen switching: `showScreen(id)` in `js/core/router.js` toggles `.active` class.

### JS load order (critical — no modules, all globals)

Scripts load via `<script>` tags in `index.html` in this order:
1. `js/data/` — `levels.js` (LEVELS array), `organelles.js` (ORGANELLES map), `minigames.js`
2. `js/core/state.js` — global `GS` object (game state)
3. `js/core/save.js` — `saveGame()` / `loadSave()` using `localStorage` key `cq3`
4. `js/core/router.js` — screen navigation
5. `js/systems/xp.js` — `addXP()`, `checkXPUnlocks()`, `updateXPDisplay()`
6. `js/components/` — `cell-renderer.js`, `audio.js`, `drawer.js`, `zoom.js`, `microscope.js`
7. `js/screens/` — `splash.js`, `game.js`, `atlas.js`, `procesos.js`, `progress.js`, `tutorial.js`, `minigame-engine.js`
8. `js/lib/tone.min.js` — audio library

Everything is `window`-global. Never use ES modules (`import`/`export`).

### Key globals

- `GS` — mutable game state. Persisted via `saveGame()` → `localStorage['cq3']`
- `LEVELS` — cell level definitions (`js/data/levels.js`)
- `ORGANELLES` — map of `levelId → organelle[]` (`js/data/organelles.js`)
- `PROCESOS_META` — array of process definitions inside `js/screens/procesos.js` IIFE

### Screens

| Screen ID | JS file | Purpose |
|-----------|---------|---------|
| `splashScreen` | `splash.js` | Intro / name entry |
| `menuScreen` | `game.js` | Level selection grid |
| `gameScreen` | `game.js` | Organelle puzzle (main gameplay) |
| `procesosScreen` | `procesos.js` | "Célula en Acción" — Cine + Jugador modes |
| `progressScreen` | `progress.js` | Stats + achievements |
| `atlasScreen` | `atlas.js` | Organelle encyclopedia |

### Procesos screen (`js/screens/procesos.js`)

Wrapped in an IIFE (`(function(){ ... })()`). Two tabs: **Cine** (animated steps) and **Jugador** (drag-and-drop rounds).

Each process has:
- `_stepsX()` — returns array of step objects for Cine mode
- `_juegoRoundsX()` — returns array of round objects for Jugador mode
- `_cellX()` — optional SVG base cell (plant cell uses `_cellPlant()` instead of `_cell()`)

Completion tracked in `localStorage['cq3_proc_seen']`: keys like `'respiracion'` (Cine done) and `'j_respiracion'` (Jugador done).

### XP system

`addXP(amount)` in `xp.js` — increments `GS.xp`, calls `checkXPUnlocks()`, shows `+N XP` float animation, shows level-up toast if rank changes. Cell unlocks are XP-gated via `CELL_XP_UNLOCK` map.

### Achievements

`GS.achievements` array in `state.js`. Unlock via `checkAch()` in `progress.js`. Toast shown via `.ach-toast` / `.toast-inner` DOM structure.

### Cell SVG rendering

`drawCell(levelId, svg)` in `cell-renderer.js` builds SVG from `ORGANELLES[levelId]`. Each organelle `g` element gets `data-org-id`, `role="img"`, `aria-label`. The `drawOrg()` function dispatches to per-organelle draw functions.

### CSS

- `css/variables.css` — design tokens (fonts, colors). Load first.
- `css/animations.css` — organelle animations + XP pop + achievement toasts
- `css/procesos.css` — Célula en Acción screen; includes responsive PC grid (`@media(min-width:640px)`)
- `--proc-rgb` CSS custom property set per card via `_hexToRgb()` for process-colored borders

### Save system

Key `cq3` in localStorage. `saveGame(immediate?)` debounces 800ms by default. iOS private mode silently fails `setItem` — caught and shown as error toast (once per session).

## Debug & testing tools

`js/dev/debug.js` loads on every page. Use URL params to set up test state instantly:

| Param | Effect |
|-------|--------|
| `?debug=1` | Side panel: live GS snapshot + buttons (reset / +XP / unlock all / mark procesos seen) |
| `?xp=5000` | Sets `GS.xp` on load — use to test cell unlocks |
| `?proc=fotosintesis` | Navigates directly to that proceso in Cine mode |
| `?reset=1` | Clears `cq3` + `cq3_proc_seen` from localStorage, reloads clean |
| `?unlock=all` | Unlocks all cell types immediately |

`window.onerror` and `unhandledrejection` always surface as red toasts on screen — no DevTools needed to see JS errors.

## Automated test suite (Node/npm — separate from runtime, no build step for the game itself)

```
npm install
npm test          # unit + data-integrity (Vitest)
npm run test:e2e  # Chromium E2E (Playwright, run `npx playwright install chromium` once)
npm run test:all
```

- `tests/helpers/load-game.js` — loads the window-global scripts into a jsdom instance (single `dom.window.eval()` call, since `const`/`let` bindings don't survive across separate eval calls in jsdom). Add new globals to `EXPOSE_NAMES` if a test needs them.
- `tests/unit/` — pure logic: XP/leveling (`xp.test.js`), save/load (`save.test.js`).
- `tests/integrity/data-integrity.test.js` — cross-checks `levels.js` ↔ `organelles.js` ↔ `minigames.js` (every organelle has a minigame in all 3 difficulties, `quiz.ans` in range, `fill.cor` in `words` or free-text `fill.a` present, etc.). Run this after adding a new cell/organelle/minigame — it catches the "organelle with no Jugador mode" class of bug before it ships.
- `tests/e2e/smoke.spec.js` — Playwright against `py -m http.server 4173` (see `playwright.config.js`). Covers splash→menu→new game (name validation)→gameplay, Atlas→Volver, and verifies the error-banner actually renders on a thrown error.

## Critical encoding rule

**NEVER use PowerShell `Set-Content` or `Out-File` on JS files that contain emojis or non-ASCII characters.** Always use Python binary write:

```python
with open('path/to/file.js', 'rb') as f: data = f.read()
data = data.replace(old_bytes, new_bytes, 1)
with open('path/to/file.js', 'wb') as f: f.write(data)
```

For content with emojis/Unicode in Python scripts, write content to a separate `.js` helper file using the Write tool (UTF-8), then binary-read and splice it in. Python byte literals (`b"""..."""`) cannot contain non-ASCII characters.

Use `py` (not `python3`) on Windows to invoke Python.

## Deployment

```
git add <files>
git commit -m "message"
git push origin main
```

Vercel auto-deploys on push. No build step needed. Cache-bust CSS/JS by incrementing `?v=N` query strings in `index.html` `<link>` and `<script>` tags.
