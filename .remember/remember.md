# Handoff

## State
5 procesos en `js/screens/procesos.js` (~2740 líneas): Respiración, Alimentación, Reproducción, Defensa Inmune, Síntesis de Proteínas. SW en `cellquest-v26`. SYNTAX OK. Commit `fb145c7` pusheado → Vercel auto-deploy en curso.

Fixes aplicados en esta sesión: Defensa Jugador (mol→molecule format + molSvgX/Y), Defensa Cine annotations (bx/by agregados), marker #arr→#aWd3, SW ignoreSearch:true (offline fix), zoomReset icon ⊙.

## Next
1. Agregar `manifest.json` + `<link rel="manifest">` en index.html → PWA instalable en Android/iOS
2. Fix animaciones Safari 13: `transform-box:fill-box` no soportado → usar wrapper `<g transform="translate(160,158)">` pattern
3. Importar fuentes Google Fonts (Nunito + Space Grotesk) en variables.css

## Context
- NUNCA usar PowerShell Set-Content/Out-File en archivos con emojis — siempre Python binary (open rb/wb)
- SW: cellquest-v26 | patch scripts en raíz del proyecto (excluidos por .gitignore)
- Defensa Jugador ahora usa molecule:{sym,color,border,r} + molSvgX/Y — consistente con otros 4 procesos
- Live: https://cellquest-delta.vercel.app | Repo: https://github.com/profedietze-stack/cellquest
