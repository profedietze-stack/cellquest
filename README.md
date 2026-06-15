# 🔬 CellQuest — Descubriendo las Células

> Juego educativo interactivo de biología celular para estudiantes de nivel secundario.  
> Desarrollado por **ProfeD.**

[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![PWA](https://img.shields.io/badge/PWA-ready-blue?logo=googlechrome)](https://web.dev/progressive-web-apps/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/licencia-MIT-green)](LICENSE)

---

## ¿Qué es CellQuest?

CellQuest es una Progressive Web App (PWA) educativa que permite a los estudiantes explorar la biología celular de forma visual e interactiva. Combina puzzles de reconocimiento de organelas, animaciones científicas y un sistema de progresión con XP y logros.

**Sin instalación. Sin registro. Sin publicidad. Funciona en el celular.**

---

## 🎮 Modos de juego

### 🧩 Puzzles de Organelas
El modo principal. Los estudiantes identifican organelas en células reales dibujadas en SVG. Tres niveles de dificultad (Fácil / Normal / Difícil) con preguntas de opción múltiple, verdadero/falso y completar frases.

### ⚡ Célula en Acción
Dos submodos centrados en procesos celulares:

- **🎬 Modo Cine** — Animaciones paso a paso con explicaciones científicas. El estudiante observa cómo ocurre cada proceso dentro de la célula.
- **🎮 Modo Jugador** — Drag-and-drop interactivo donde el estudiante arrastra moléculas y orgánulos hacia los destinos correctos para completar el proceso.

### 🗺️ Atlas Celular
Enciclopedia de organelas. Cada orgánulo incluye función, datos curiosos y animación visual.

---

## 🔬 Tipos de células disponibles

| Célula | Emoji | Desbloqueo |
|--------|-------|-----------|
| Célula Animal | 🦁 | Disponible desde el inicio |
| Célula Vegetal | 🌿 | 80 XP |
| Célula Procariota | 🔬 | 300 XP |
| Célula Fúngica | 🍄 | 800 XP |
| Neurona | 🧠 | 1600 XP |
| Hepatocito | 🟤 | 2000 XP |
| Glóbulo Rojo | 🩸 | 2500 XP |
| Célula del Xilema | 🌳 | 3200 XP |
| Miosito | 💪 | 5200 XP |
| Linfocito T | 🛡️ | 6800 XP |

---

## 🌿 Procesos celulares

| Proceso | Descripción |
|---------|-------------|
| ⚡ Respiración Celular | Glucosa → ATP (Glucólisis, Krebs, ETC) |
| 🍎 Alimentación | Endocitosis y digestión lisosomal |
| 🔁 Reproducción | Mitosis celular (4 fases) |
| 🛡️ Defensa Inmune | Respuesta inmunológica (MHC, anticuerpos) |
| 🧬 Síntesis de Proteínas | Del ADN a la proteína (transcripción + traducción) |
| 🌿 Fotosíntesis | Luz solar → Glucosa + O₂ (fase lumínica + ciclo Calvin) |

Cada proceso incluye célula SVG animada específica (célula animal o vegetal según corresponda), 7 pasos Cine y 5 rondas Jugador con contenido científico detallado.

---

## 🏆 Sistema de progresión

- **XP** — Se gana al completar puzzles por primera vez. Las repeticiones dan XP reducido (por sesión).
- **Nivel de jugador** — 10 rangos desde "Aprendiz" hasta "CellMaster".
- **Desbloqueo de células** — Cada tipo de célula se desbloquea al alcanzar un umbral de XP.
- **Logros** — 11 logros desbloqueables (Primer Paso, Biólogo Completo, Speed Runner, Sin Errores, etc.).

---

## 📱 Características técnicas

- **PWA** — Instalable en Android e iOS desde el navegador.
- **Offline-first** — Service Worker cachea todos los assets.
- **Sin backend** — Todo el estado se guarda en `localStorage`.
- **Sin frameworks** — Vanilla JS + CSS puro, sin npm, sin build step.
- **Responsive** — Mobile-first con layout PC en pantallas ≥640px.

---

## 🚀 Desarrollo local

```bash
# Python 3
python -m http.server 3400
# Abrir http://localhost:3400
```

No hay proceso de build. Los cambios en archivos son inmediatos al recargar.

Para cache-busting, incrementar el número `?v=N` en los `<link>` y `<script>` de `index.html`.

---

## 📁 Estructura del proyecto

```
CellQuest/
├── index.html              # App shell, todos los screens como divs
├── manifest.json           # PWA manifest
├── css/
│   ├── variables.css       # Design tokens (cargar primero)
│   ├── screens.css         # Layout base y componentes
│   ├── animations.css      # Animaciones de organelas y UI
│   ├── procesos.css        # Pantalla Célula en Acción
│   └── ...
├── js/
│   ├── data/
│   │   ├── levels.js       # Definición de tipos de célula
│   │   ├── organelles.js   # Organelas por tipo de célula
│   │   └── minigames.js    # Configuración de minijuegos
│   ├── core/
│   │   ├── state.js        # Global GS (game state)
│   │   ├── save.js         # localStorage save/load
│   │   └── router.js       # Navegación entre screens
│   ├── systems/
│   │   └── xp.js           # XP, niveles, desbloqueos
│   ├── components/
│   │   ├── cell-renderer.js # SVG de células
│   │   ├── drawer.js       # Menú lateral
│   │   └── ...
│   └── screens/
│       ├── procesos.js     # Célula en Acción (IIFE)
│       ├── progress.js     # Estadísticas y logros
│       └── ...
└── CLAUDE.md               # Guía para Claude Code
```

---

## 🛠️ Stack

- **Frontend**: Vanilla JavaScript (ES5/ES6), CSS3 con custom properties
- **Audio**: Tone.js (minificado, incluido en repo)
- **Gráficos**: SVG generado dinámicamente por JS
- **Persistencia**: `localStorage` (clave `cq3`)
- **Deploy**: Vercel (auto-deploy en push a `main`)

---

## 📄 Licencia

MIT — libre para uso educativo.

---

*Hecho con 🔬 para estudiantes curiosos.*
