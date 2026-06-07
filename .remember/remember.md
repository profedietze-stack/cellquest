# Handoff

## State
5 procesos en `js/screens/procesos.js` (~2700 líneas): Respiración, Alimentación, Reproducción, Defensa Inmune, Síntesis de Proteínas. Todos con Modo Cine (7 pasos SVG animados + anotaciones emoji) y Modo Jugador (5 rondas drag-and-drop). SW en `cellquest-v25`. SYNTAX OK.

## Next
1. Probar en browser: http://localhost:3001 + Ctrl+Shift+R — verificar 🧬 Síntesis en ambos menús
2. Bug preexistente a corregir: Defensa Inmune jugador usa `mol:{emoji,label}` pero `_placeMol()` espera `molecule:{sym,color,border,r}` — crashes en runtime
3. Próximas features: Célula β Pancreática, logro al completar todos los procesos

## Context
- NUNCA usar PowerShell Set-Content/Out-File en archivos con emojis — siempre Python binary (open rb/wb)
- SW: cellquest-v25 | patch_sintesis.py en raíz del proyecto
- JUEGO_META_MAP + HL_SINT en procesos.js — patrón a seguir para nuevos procesos
