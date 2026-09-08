
  // ======================================================
  // PLANTA BASE SVG — celula vegetal con cloroplastos
  // viewBox 0 0 320 300
  // ======================================================
  function _cellPlant(id, extras, note, extraStyle){
    const uid=id;
    return `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" class="cine-cell-svg">
  <defs>
    <radialGradient id="cpg${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(34,197,94,0.12)"/>
      <stop offset="100%" stop-color="rgba(34,197,94,0)"/>
    </radialGradient>
    <radialGradient id="npg${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(167,139,250,0.35)"/>
      <stop offset="100%" stop-color="rgba(124,58,237,0.1)"/>
    </radialGradient>
    <radialGradient id="vacg${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(14,165,233,0.22)"/>
      <stop offset="100%" stop-color="rgba(14,165,233,0.06)"/>
    </radialGradient>
    <filter id="gwp${uid}"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="gwp2${uid}"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <marker id="apW${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="rgba(245,158,11,0.9)"/></marker>
    <marker id="apG${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="rgba(34,197,94,0.9)"/></marker>
    <marker id="apB${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="rgba(96,165,250,0.85)"/></marker>
    <marker id="apY${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="rgba(251,191,36,0.9)"/></marker>
    <style>
      @keyframes cellBreathP${uid}{0%{transform:scale(1,1)}30%{transform:scale(1.012,1.008)}60%{transform:scale(1.016,1.012)}100%{transform:scale(1,1)}}
      @keyframes outerGlowP${uid}{0%,100%{opacity:0.5}60%{opacity:0.85}}
      @keyframes nucGlowP${uid}{0%,100%{filter:drop-shadow(0 0 5px rgba(167,139,250,0.4))}50%{filter:drop-shadow(0 0 14px rgba(167,139,250,0.9))}}
      @keyframes chlBlink${uid}{0%,100%{opacity:0.75}50%{opacity:1;filter:drop-shadow(0 0 8px rgba(34,197,94,0.7))}}
      @keyframes vacPulse${uid}{0%,100%{opacity:0.6}50%{opacity:0.85}}
      @keyframes mitoBreathP${uid}{0%,100%{opacity:0.22}50%{opacity:0.42}}
      @keyframes annoIn{0%{opacity:0;transform:scale(0.82)}100%{opacity:1;transform:scale(1)}}
      ${extraStyle||''}
    </style>
  </defs>

  <rect x="8" y="8" width="304" height="284" rx="18" fill="url(#cpg${uid})"
    style="animation:outerGlowP${uid} 4s ease-in-out infinite"/>

  <g style="transform-origin:160px 150px;animation:cellBreathP${uid} 5s ease-in-out infinite">

  <!-- PARED CELULAR -->
  <rect x="14" y="14" width="292" height="272" rx="16"
    fill="none" stroke="rgba(134,239,172,0.55)" stroke-width="7"/>

  <!-- MEMBRANA PLASMATICA -->
  <rect x="22" y="22" width="276" height="256" rx="12"
    fill="rgba(0,40,20,0.55)"
    stroke="rgba(34,197,94,0.65)" stroke-width="1.8" stroke-dasharray="5 3"/>

  <!-- VACUOLA CENTRAL -->
  <ellipse cx="172" cy="148" rx="78" ry="68"
    fill="url(#vacg${uid})" stroke="rgba(14,165,233,0.45)" stroke-width="1.5"
    style="animation:vacPulse${uid} 4s ease-in-out infinite"/>
  <text x="172" y="152" text-anchor="middle" font-size="8.5" fill="rgba(14,165,233,0.55)" font-family="sans-serif" font-style="italic">Vacuola Central</text>

  <!-- MITOCONDRIA -->
  <g transform="rotate(15 62 228)" style="animation:mitoBreathP${uid} 2.5s ease-in-out infinite">
    <ellipse cx="62" cy="228" rx="28" ry="11"
      fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,0.65)" stroke-width="1.6"/>
    <path d="M38 228 Q44 222 50 228 Q56 234 62 228 Q68 222 74 228 Q80 234 86 228"
      fill="none" stroke="rgba(239,68,68,0.4)" stroke-width="1.2"/>
  </g>

  <!-- CLOROPLASTO 1 (superior izquierda) -->
  <g style="animation:chlBlink${uid} 2.8s ease-in-out infinite">
    <ellipse cx="72" cy="88" rx="36" ry="18"
      fill="rgba(22,163,74,0.42)" stroke="rgba(34,197,94,0.95)" stroke-width="2.2"/>
    <line x1="46" y1="88" x2="98" y2="88" stroke="rgba(134,239,172,0.5)" stroke-width="1.2"/>
    <line x1="48" y1="82" x2="96" y2="82" stroke="rgba(134,239,172,0.4)" stroke-width="1"/>
    <line x1="48" y1="94" x2="96" y2="94" stroke="rgba(134,239,172,0.4)" stroke-width="1"/>
    <circle cx="58"  cy="88" r="5.5" fill="rgba(134,239,172,0.35)" stroke="rgba(134,239,172,0.7)" stroke-width="1"/>
    <circle cx="72"  cy="88" r="5.5" fill="rgba(134,239,172,0.35)" stroke="rgba(134,239,172,0.7)" stroke-width="1"/>
    <circle cx="86"  cy="88" r="5.5" fill="rgba(134,239,172,0.35)" stroke="rgba(134,239,172,0.7)" stroke-width="1"/>
  </g>

  <!-- CLOROPLASTO 2 (inferior izquierda) -->
  <g transform="rotate(-10 78 198)" style="animation:chlBlink${uid} 2.8s 0.9s ease-in-out infinite">
    <ellipse cx="78" cy="198" rx="32" ry="15"
      fill="rgba(22,163,74,0.38)" stroke="rgba(34,197,94,0.85)" stroke-width="2"/>
    <line x1="52" y1="198" x2="104" y2="198" stroke="rgba(134,239,172,0.45)" stroke-width="1.1"/>
    <circle cx="62"  cy="198" r="5" fill="rgba(134,239,172,0.32)" stroke="rgba(134,239,172,0.65)" stroke-width="1"/>
    <circle cx="78"  cy="198" r="5" fill="rgba(134,239,172,0.32)" stroke="rgba(134,239,172,0.65)" stroke-width="1"/>
    <circle cx="94"  cy="198" r="5" fill="rgba(134,239,172,0.32)" stroke="rgba(134,239,172,0.65)" stroke-width="1"/>
  </g>

  <!-- CLOROPLASTO 3 (superior derecha, fondo) -->
  <g transform="rotate(8 258 78)" style="animation:chlBlink${uid} 2.8s 1.6s ease-in-out infinite">
    <ellipse cx="258" cy="78" rx="30" ry="13"
      fill="rgba(22,163,74,0.3)" stroke="rgba(34,197,94,0.7)" stroke-width="1.8"/>
    <line x1="234" y1="78" x2="282" y2="78" stroke="rgba(134,239,172,0.38)" stroke-width="1"/>
    <circle cx="246" cy="78" r="4.5" fill="rgba(134,239,172,0.28)" stroke="rgba(134,239,172,0.55)" stroke-width="1"/>
    <circle cx="258" cy="78" r="4.5" fill="rgba(134,239,172,0.28)" stroke="rgba(134,239,172,0.55)" stroke-width="1"/>
    <circle cx="270" cy="78" r="4.5" fill="rgba(134,239,172,0.28)" stroke="rgba(134,239,172,0.55)" stroke-width="1"/>
  </g>

  <!-- NUCLEO -->
  <g filter="url(#gwp${uid})" style="animation:nucGlowP${uid} 3s ease-in-out infinite">
    <ellipse cx="248" cy="205" rx="30" ry="24"
      fill="url(#npg${uid})" stroke="rgba(167,139,250,0.85)" stroke-width="1.8"/>
    <circle cx="236" cy="196" r="2.8" fill="none" stroke="rgba(167,139,250,0.6)" stroke-width="1.1"/>
    <circle cx="250" cy="188" r="2.8" fill="none" stroke="rgba(167,139,250,0.6)" stroke-width="1.1"/>
    <circle cx="265" cy="196" r="2.8" fill="none" stroke="rgba(167,139,250,0.55)" stroke-width="1.1"/>
    <ellipse cx="247" cy="205" rx="12" ry="9"
      fill="rgba(167,139,250,0.55)" stroke="rgba(200,180,255,0.65)" stroke-width="1.2"/>
  </g>

  ${extras}
  <g id="cineAnnoGroup" style="pointer-events:none"></g>
  </g>

  ${note?`<rect x="10" y="285" width="300" height="14" rx="4" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" stroke-width="1"/>
  <text x="160" y="295" text-anchor="middle" font-size="7" fill="rgba(34,197,94,0.75)" font-family="sans-serif">${note}</text>`:''}
</svg>`;
  }

  // ======================================================
  // FOTOSINTESIS — 7 PASOS
  // ======================================================
  function _stepsFotosintesis(){
    return [

      // PASO 0: Vista general
      { title:'🌿 La Célula Vegetal y sus Fábricas de Glucosa',
        narration:'La célula vegetal es una fábrica solar: convierte luz, agua y CO₂ en glucosa y oxígeno. El proceso se llama <strong>Fotosíntesis</strong> y ocurre dentro de unos orgánulos verdes llamados <strong>cloroplastos</strong>.',
        info:'<b>Científico:</b> La fotosíntesis es el proceso biológico por el cual las células con clorofila convierten energía lumínica en energía química almacenada como glucosa. Ecuación global: 6 CO₂ + 6 H₂O + energía lumínica → C₆H₁₂O₆ + 6 O₂. Ocurre en dos fases: reacciones de la luz (tilacoides) y ciclo de Calvin (estroma). La célula vegetal también tiene pared celular de celulosa, vacuola central y plasmodesmos.',
        annotations:[
          {text:['🟩 Cloroplastos','Fábricas de glucosa'],   bx:40,  by:38,  tx:72,  ty:80},
          {text:['🟦 Vacuola Central','Almacena agua'],      bx:240, by:115, tx:172, ty:135},
          {text:['🧬 Núcleo','Dirige la célula'],            bx:278, by:218, tx:248, ty:200},
          {text:['🧱 Pared celular','Protección rígida'],    bx:18,  by:150, tx:22,  ty:148},
        ],
        svg: _cellPlant('fp0',`
          <text x="72"  y="62"  text-anchor="middle" font-size="8"   fill="rgba(34,197,94,0.9)"   font-family="sans-serif" font-weight="bold">Cloroplasto</text>
          <text x="258" y="52"  text-anchor="middle" font-size="7.5" fill="rgba(34,197,94,0.7)"   font-family="sans-serif">Cloroplasto</text>
          <text x="78"  y="175" text-anchor="middle" font-size="7.5" fill="rgba(34,197,94,0.7)"   font-family="sans-serif">Cloroplasto</text>
          <text x="248" y="232" text-anchor="middle" font-size="8"   fill="rgba(167,139,250,0.9)" font-family="sans-serif">Núcleo</text>
          <text x="55"  y="246" text-anchor="middle" font-size="7.5" fill="rgba(239,68,68,0.7)"   font-family="sans-serif">Mitocondria</text>
          <text x="160" y="38"  text-anchor="middle" font-size="9"   fill="rgba(134,239,172,0.5)" font-family="sans-serif" font-style="italic">CITOPLASMA</text>
        `,'Ecuación:  6 CO₂ + 6 H₂O + luz  →  C₆H₁₂O₆ + 6 O₂',
        `@keyframes labelFadeIn{0%{opacity:0}100%{opacity:1}}`) },

      // PASO 1: Absorcion de luz
      { title:'☀️ Absorción de Luz — La Clorofila Captura Fotones',
        narration:'La luz solar llega al cloroplasto y es capturada por la <strong>clorofila</strong>, el pigmento verde. Absorbe principalmente luz <strong>roja y azul</strong>, y refleja el verde (por eso las plantas son verdes). Cada fotón activa un electrón que inicia toda la fotosíntesis.',
        info:'<b>Científico:</b> La clorofila a y b se encuentran en los complejos antena de los fotosistemas I (PS I, λmax=700 nm) y II (PS II, λmax=680 nm). Los pigmentos accesorios (carotenoides, xantofilas) amplían el espectro. Un fotón excita un electrón en el centro de reacción P680. Este electrón excitado es el punto de partida de la cadena de transporte electrónico fotosintético.',
        annotations:[
          {text:['☀️ Luz solar','Fotones de energía'], bx:80,  by:18,  tx:72, ty:55},
          {text:['🟩 Clorofila','Absorbe luz roja+azul'],bx:18,  by:62,  tx:60, ty:80},
        ],
        svg: _cellPlant('fp1',`
          <g style="animation:lightRaysFp1 1.5s ease-in-out infinite alternate">
            <line x1="72" y1="14" x2="72" y2="58" stroke="rgba(251,191,36,0.9)" stroke-width="2.5" stroke-dasharray="4 3"/>
            <line x1="55" y1="14" x2="58" y2="58" stroke="rgba(251,191,36,0.65)" stroke-width="2" stroke-dasharray="3 4"/>
            <line x1="90" y1="14" x2="88" y2="58" stroke="rgba(251,191,36,0.65)" stroke-width="2" stroke-dasharray="3 4"/>
            <circle cx="72" cy="28" r="8" fill="rgba(251,191,36,0.6)" stroke="rgba(251,191,36,0.95)" stroke-width="1.5"
              style="animation:photonMoveFp1 1.5s ease-in-out infinite"/>
            <text x="72" y="32" text-anchor="middle" font-size="8" fill="#fbbf24" font-weight="bold" font-family="sans-serif">hν</text>
          </g>
          <ellipse cx="72" cy="88" rx="40" ry="22" fill="none" stroke="rgba(34,197,94,0)"
            style="animation:chlGlowFp1 1.5s ease-in-out infinite alternate"/>
          <text x="72" y="116" text-anchor="middle" font-size="8.5" fill="rgba(34,197,94,0.9)" font-family="sans-serif" font-weight="bold">Clorofila activa</text>
        `,'Clorofila absorbe fotones → electrones excitados inician la cadena',
        `@keyframes lightRaysFp1{0%{opacity:0.55}100%{opacity:1}}
         @keyframes photonMoveFp1{0%{transform:translateY(0)}100%{transform:translateY(26px)}}
         @keyframes chlGlowFp1{0%{filter:drop-shadow(0 0 4px rgba(34,197,94,0.2))}100%{filter:drop-shadow(0 0 20px rgba(34,197,94,0.85))}}`) },

      // PASO 2: Fotolisis del agua
      { title:'💧 Fotólisis del Agua — El Oxígeno que Respiramos',
        narration:'Para reponer los electrones que perdió la clorofila, el cloroplasto <strong>rompe moléculas de agua</strong>. Este proceso se llama <strong>fotólisis</strong>. El resultado: el oxígeno que las plantas liberan al aire — ¡el mismo que vos y yo respiramos!',
        info:'<b>Científico:</b> En el Fotosistema II, el complejo de oxidación del agua (OEC) cataliza: 2 H₂O → 4 H⁺ + 4 e⁻ + O₂. El O₂ es liberado como subproducto al exterior. Los 4 H⁺ contribuyen al gradiente de protones que impulsa la ATP sintasa. Los electrones reemplazan los perdidos en P680.',
        annotations:[
          {text:['💧 H₂O entra','desde la vacuola'],        bx:130, by:55,  tx:118, ty:108},
          {text:['🟢 O₂ liberado','¡Al exterior!'],          bx:18,  by:38,  tx:50,  ty:62},
        ],
        svg: _cellPlant('fp2',`
          <path d="M148 138 Q112 120 98 102" fill="none" stroke="rgba(14,165,233,0.7)" stroke-width="2" stroke-dasharray="5 3"
            marker-end="url(#apBfp2)" style="animation:waterFlowFp2 1.8s linear infinite"/>
          <text x="120" y="118" text-anchor="middle" font-size="8" fill="rgba(14,165,233,0.85)" font-family="sans-serif" font-weight="bold">H₂O</text>
          <g style="animation:o2RiseFp2a 2s 0s ease-out infinite">
            <circle cx="50" cy="62" r="9" fill="rgba(134,239,172,0.25)" stroke="rgba(134,239,172,0.75)" stroke-width="1.5"/>
            <text x="50" y="66" text-anchor="middle" font-size="8" fill="rgba(134,239,172,0.9)" font-family="sans-serif">O₂</text>
          </g>
          <g style="animation:o2RiseFp2a 2s 0.8s ease-out infinite">
            <circle cx="36" cy="44" r="7.5" fill="rgba(134,239,172,0.2)" stroke="rgba(134,239,172,0.55)" stroke-width="1.2"/>
            <text x="36" y="48" text-anchor="middle" font-size="7.5" fill="rgba(134,239,172,0.8)" font-family="sans-serif">O₂</text>
          </g>
          <circle cx="84" cy="98" r="8" fill="rgba(251,191,36,0.35)" stroke="rgba(251,191,36,0.8)" stroke-width="1.5"
            style="animation:hPlusPopFp2 0.5s 0.8s ease-out both"/>
          <text x="84" y="102" text-anchor="middle" font-size="8" fill="#fbbf24" font-weight="bold" font-family="sans-serif">H⁺</text>
          <text x="72" y="116" text-anchor="middle" font-size="7.5" fill="rgba(34,197,94,0.9)" font-family="sans-serif" font-weight="bold">Fotólisis</text>
          <text x="72" y="126" text-anchor="middle" font-size="7" fill="rgba(134,239,172,0.65)" font-family="sans-serif">2 H₂O → 4 H⁺ + 4 e⁻ + O₂</text>
        `,'Subproducto vital: O₂ liberado al aire · Fuente del oxígeno atmosférico',
        `@keyframes waterFlowFp2{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-20}}
         @keyframes o2RiseFp2a{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-30px);opacity:0}}
         @keyframes hPlusPopFp2{0%{transform:scale(0);opacity:0}80%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}`) },

      // PASO 3: Fase luminica
      { title:'⚡ Fase Lumínica — Fabricando ATP y NADPH',
        narration:'Los electrones excitados viajan por una <strong>cadena de transporte</strong> en los tilacoides. Este viaje bombea protones y genera dos moléculas clave: <strong>ATP</strong> (energía inmediata) y <strong>NADPH</strong> (poder reductor). Ambas serán el combustible del próximo paso.',
        info:'<b>Científico:</b> La cadena de transporte electrónico: PS II → plastoquinona (PQ) → complejo Cyt b6f → plastocianina (PC) → PS I → ferredoxina → NADP⁺ reductasa → NADPH. El complejo Cyt b6f bombea H⁺ al lumen tilacoidal. El gradiente de protones (ΔpH) impulsa la ATP sintasa (CF1-CF0) para sintetizar ATP. Por cada par de electrones: ≈3 ATP + 2 NADPH.',
        annotations:[
          {text:['⚡ Cadena ETC','En los tilacoides'],         bx:18,  by:68,  tx:62, ty:84},
          {text:['🔋 ATP Sintasa','Genera ATP del gradiente'], bx:22,  by:128, tx:65, ty:110},
        ],
        svg: _cellPlant('fp3',`
          <rect x="38" y="83" width="68" height="10" rx="5"
            fill="rgba(134,239,172,0.25)" stroke="rgba(134,239,172,0.7)" stroke-width="1.3"
            style="animation:etcPulseFp3 2s ease-in-out infinite"/>
          <text x="72" y="91" text-anchor="middle" font-size="7" fill="rgba(134,239,172,0.9)" font-family="sans-serif" font-weight="bold">Cadena ETC</text>
          <circle cx="48"  cy="88" r="3.5" fill="rgba(96,165,250,0.9)" style="animation:eDotFp3 1.2s linear infinite"/>
          <circle cx="62"  cy="88" r="3.5" fill="rgba(96,165,250,0.9)" style="animation:eDotFp3 1.2s 0.4s linear infinite"/>
          <circle cx="76"  cy="88" r="3.5" fill="rgba(96,165,250,0.9)" style="animation:eDotFp3 1.2s 0.8s linear infinite"/>
          <circle cx="54" cy="112" r="14" fill="rgba(16,185,129,0.42)" stroke="rgba(16,185,129,0.95)" stroke-width="2"
            filter="url(#gwpfp3)" style="animation:atpPopFp3 0.5s 0.6s ease-out both,atpGlowFp3 2s 1.1s ease-in-out infinite"/>
          <text x="54" y="116" text-anchor="middle" font-size="9" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
          <circle cx="94" cy="112" r="14" fill="rgba(96,165,250,0.35)" stroke="rgba(96,165,250,0.85)" stroke-width="1.8"
            style="animation:atpPopFp3 0.5s 1s ease-out both"/>
          <text x="94" y="116" text-anchor="middle" font-size="7.5" fill="rgba(96,165,250,0.95)" font-weight="bold" font-family="sans-serif">NADPH</text>
          <text x="72" y="134" text-anchor="middle" font-size="7.5" fill="rgba(34,197,94,0.85)" font-family="sans-serif" font-weight="bold">Fase Lumínica ✓</text>
        `,'Luz → cadena ETC → ATP + NADPH · La energía queda lista para el Calvin',
        `@keyframes etcPulseFp3{0%,100%{opacity:0.7}50%{opacity:1;filter:drop-shadow(0 0 4px rgba(134,239,172,0.6))}}
         @keyframes eDotFp3{0%{opacity:0;transform:translateX(0)}40%{opacity:1}100%{opacity:0;transform:translateX(28px)}}
         @keyframes atpPopFp3{0%{transform:scale(0);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
         @keyframes atpGlowFp3{0%,100%{filter:drop-shadow(0 0 4px rgba(16,185,129,0.4))}50%{filter:drop-shadow(0 0 12px rgba(16,185,129,0.9))}}`) },

      // PASO 4: Ciclo de Calvin I - fijacion CO2
      { title:'🔄 Ciclo de Calvin (I) — El CO₂ Entra a la Célula',
        narration:'El dióxido de carbono (CO₂) del aire entra por los <strong>estomas</strong> de la hoja y llega al estroma del cloroplasto. Allí, la enzima <strong>RuBisCO</strong> lo captura y lo une a una molécula de 5 carbonos (RuBP). ¡Esta es la <strong>fijación del carbono</strong>!',
        info:'<b>Científico:</b> La RuBisCO (ribulosa-1,5-bisfosfato carboxilasa/oxigenasa) es la enzima más abundante en la Tierra. Cataliza la fijación de CO₂ a RuBP (5C), produciendo dos moléculas de 3-fosfoglicerato (3-PGA, 3C). RuBisCO es notoriamente lenta (3-10 reacciones/s) pero tan abundante que fija grandes cantidades de CO₂.',
        annotations:[
          {text:['🌬 CO₂ entra','por los estomas'],    bx:265, by:40,  tx:255, ty:78},
          {text:['🧪 RuBisCO','Captura el CO₂'],       bx:18,  by:80,  tx:72,  ty:100},
        ],
        svg: _cellPlant('fp4',`
          <g style="animation:co2EnterFp4 1.8s ease-out forwards">
            <circle cx="268" cy="55" r="11" fill="rgba(148,163,184,0.25)" stroke="rgba(148,163,184,0.7)" stroke-width="1.5"/>
            <text x="268" y="59" text-anchor="middle" font-size="8" fill="rgba(148,163,184,0.9)" font-family="sans-serif">CO₂</text>
          </g>
          <path d="M256 68 Q200 74 110 90" fill="none" stroke="rgba(148,163,184,0.5)" stroke-width="1.8" stroke-dasharray="5 3"
            marker-end="url(#apBfp4)" style="animation:co2DashFp4 1.5s linear infinite"/>
          <ellipse cx="72" cy="100" rx="22" ry="10"
            fill="rgba(34,197,94,0.28)" stroke="rgba(34,197,94,0.75)" stroke-width="1.5"
            style="animation:rubpPulseFp4 2s ease-in-out infinite"/>
          <text x="72" y="104" text-anchor="middle" font-size="8" fill="rgba(134,239,172,0.9)" font-family="sans-serif" font-weight="bold">RuBP (5C)</text>
          <text x="72" y="115" text-anchor="middle" font-size="7.5" fill="rgba(34,197,94,0.7)" font-family="sans-serif">↑ RuBisCO</text>
          <circle cx="50" cy="138" r="12" fill="rgba(245,158,11,0.35)" stroke="rgba(245,158,11,0.85)" stroke-width="1.8"
            style="animation:pgaPopFp4 0.5s 1s ease-out both"/>
          <text x="50" y="142" text-anchor="middle" font-size="7.5" fill="#fbbf24" font-weight="bold" font-family="sans-serif">3-PGA</text>
          <circle cx="94" cy="138" r="12" fill="rgba(245,158,11,0.35)" stroke="rgba(245,158,11,0.85)" stroke-width="1.8"
            style="animation:pgaPopFp4 0.5s 1.2s ease-out both"/>
          <text x="94" y="142" text-anchor="middle" font-size="7.5" fill="#fbbf24" font-weight="bold" font-family="sans-serif">3-PGA</text>
          <text x="72" y="156" text-anchor="middle" font-size="7" fill="rgba(245,158,11,0.7)" font-family="sans-serif">2 × 3C</text>
        `,'Fijación del carbono: CO₂ + RuBP → 2 × 3-PGA (vía RuBisCO)',
        `@keyframes co2EnterFp4{0%{transform:translateX(28px);opacity:0}100%{transform:translateX(0);opacity:1}}
         @keyframes co2DashFp4{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-24}}
         @keyframes rubpPulseFp4{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
         @keyframes pgaPopFp4{0%{transform:scale(0);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}`) },

      // PASO 5: Ciclo de Calvin II - G3P
      { title:'🔄 Ciclo de Calvin (II) — Fabricando G3P con ATP y NADPH',
        narration:'El ATP y el NADPH fabricados en la fase lumínica ahora tienen su trabajo: transformar el 3-PGA en <strong>G3P</strong> (gliceraldehído-3-fosfato). El G3P es el primer azúcar real del proceso — ¡el bloque básico para construir glucosa!',
        info:'<b>Científico:</b> Fase de reducción del Calvin: 3-PGA + ATP → 1,3-bisfosfoglicerato (fosfoglicerato quinasa). 1,3-BPG + NADPH → G3P + NADP⁺ + Pi (G3P deshidrogenasa). Por cada 3 CO₂ fijados: 9 ATP + 6 NADPH consumidos, 6 G3P producidos (5 regeneran RuBP, 1 es ganancia neta). Para 1 glucosa completa: 18 ATP + 12 NADPH.',
        annotations:[
          {text:['⚡ ATP + NADPH','de la fase lumínica'], bx:18, by:128, tx:54, ty:118},
          {text:['🟡 G3P','¡Primer azúcar!'],            bx:28, by:185, tx:72, ty:165},
        ],
        svg: _cellPlant('fp5',`
          <circle cx="34" cy="112" r="13" fill="rgba(16,185,129,0.42)" stroke="rgba(16,185,129,0.95)" stroke-width="2"
            style="animation:atpGlowFp5 2s ease-in-out infinite"/>
          <text x="34" y="116" text-anchor="middle" font-size="8.5" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
          <circle cx="34" cy="140" r="13" fill="rgba(96,165,250,0.35)" stroke="rgba(96,165,250,0.85)" stroke-width="1.8"/>
          <text x="34" y="144" text-anchor="middle" font-size="7.5" fill="rgba(96,165,250,0.95)" font-weight="bold" font-family="sans-serif">NADPH</text>
          <path d="M48 112 L60 142" fill="none" stroke="rgba(245,158,11,0.65)" stroke-width="1.8" marker-end="url(#apWfp5)"/>
          <path d="M48 140 L60 150" fill="none" stroke="rgba(245,158,11,0.65)" stroke-width="1.8" marker-end="url(#apWfp5)"/>
          <circle cx="72" cy="160" r="21" fill="rgba(245,158,11,0.52)" stroke="rgba(245,158,11,1)" stroke-width="2.8"
            filter="url(#gwpfp5)" style="animation:g3pPulseFp5 2s ease-in-out infinite"/>
          <text x="72" y="164" text-anchor="middle" font-size="10" fill="#fbbf24" font-weight="bold" font-family="sans-serif">G3P</text>
          <text x="72" y="184" text-anchor="middle" font-size="7.5" fill="rgba(245,158,11,0.75)" font-family="sans-serif">3C</text>
          <text x="72" y="198" text-anchor="middle" font-size="7.5" fill="rgba(34,197,94,0.85)" font-family="sans-serif" font-weight="bold">Ciclo de Calvin</text>
          <path d="M92 160 Q118 148 100 102 Q90 95 84 96" fill="none" stroke="rgba(34,197,94,0.4)" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#apGfp5)"/>
          <text x="110" y="128" text-anchor="middle" font-size="7" fill="rgba(34,197,94,0.65)" font-family="sans-serif">Recicla RuBP</text>
        `,'Fase oscura: ATP + NADPH + 3-PGA → G3P · 6 vueltas del ciclo = 1 glucosa',
        `@keyframes atpGlowFp5{0%,100%{filter:drop-shadow(0 0 4px rgba(16,185,129,0.4))}50%{filter:drop-shadow(0 0 12px rgba(16,185,129,0.9))}}
         @keyframes g3pPulseFp5{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}`) },

      // PASO 6: Glucosa final
      { title:'🍬 Resultado Final — ¡Glucosa y Oxígeno para la Vida!',
        narration:'Dos moléculas de G3P se unen para formar <strong>glucosa</strong> (6 carbonos). La célula puede usarla como energía, almacenarla como <strong>almidón</strong>, o construir celulosa. ¡El ciclo del carbono de la vida está completo!',
        info:'<b>Científico:</b> Dos G3P son exportados del cloroplasto y condensados para formar glucosa-6-fosfato y luego glucosa libre. La glucosa puede: (1) ingresar a glucólisis/respiración, (2) convertirse en sacarosa para transporte en floema, (3) polimerizar en almidón, (4) usarse para síntesis de celulosa. Balance completo: 6 CO₂ + 6 H₂O + 18 ATP + 12 NADPH → C₆H₁₂O₆ + 6 O₂.',
        annotations:[
          {text:['🍬 Glucosa lista','Energía almacenada'], bx:28,  by:168, tx:72, ty:150},
          {text:['🍃 Almidón','Reserva a largo plazo'],   bx:155, by:48,  tx:128, ty:82},
          {text:['🌬 O₂ al aire','Subproducto vital'],     bx:268, by:36,  tx:250, ty:62},
        ],
        svg: _cellPlant('fp6',`
          <circle cx="72" cy="148" r="26" fill="rgba(245,158,11,0.55)" stroke="rgba(245,158,11,1)" stroke-width="3"
            filter="url(#gwpfp6)" style="animation:glucFinalFp6 2s ease-in-out infinite"/>
          <text x="72" y="146" text-anchor="middle" font-size="10" fill="#fbbf24" font-weight="bold" font-family="sans-serif">Glucosa</text>
          <text x="72" y="160" text-anchor="middle" font-size="8" fill="rgba(245,158,11,0.75)" font-family="sans-serif">C₆H₁₂O₆</text>
          <ellipse cx="130" cy="108" rx="22" ry="14"
            fill="rgba(251,191,36,0.18)" stroke="rgba(251,191,36,0.55)" stroke-width="1.5"
            style="animation:starchFp6 3s ease-in-out infinite"/>
          <text x="130" y="112" text-anchor="middle" font-size="8" fill="rgba(251,191,36,0.8)" font-family="sans-serif" font-weight="bold">Almidón</text>
          <g style="animation:o2FinalFp6a 1.8s 0s ease-out infinite">
            <circle cx="250" cy="58" r="10" fill="rgba(134,239,172,0.25)" stroke="rgba(134,239,172,0.75)" stroke-width="1.5"/>
            <text x="250" y="62" text-anchor="middle" font-size="8" fill="rgba(134,239,172,0.9)" font-family="sans-serif">O₂</text>
          </g>
          <g style="animation:o2FinalFp6a 1.8s 0.9s ease-out infinite">
            <circle cx="264" cy="42" r="8" fill="rgba(134,239,172,0.2)" stroke="rgba(134,239,172,0.55)" stroke-width="1.2"/>
            <text x="264" y="46" text-anchor="middle" font-size="7.5" fill="rgba(134,239,172,0.8)" font-family="sans-serif">O₂</text>
          </g>
          <text x="160" y="238" text-anchor="middle" font-size="8.5" fill="rgba(34,197,94,0.9)" font-family="sans-serif" font-weight="bold">🌿 ¡Fotosíntesis completa!</text>
          <text x="160" y="250" text-anchor="middle" font-size="7.5" fill="rgba(134,239,172,0.65)" font-family="sans-serif">6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂</text>
        `,'Balance: 6 CO₂ + 6 H₂O + luz → Glucosa + 6 O₂ · ¡El oxígeno de la Tierra viene de aquí!',
        `@keyframes glucFinalFp6{0%,100%{filter:drop-shadow(0 0 6px rgba(245,158,11,0.5))}50%{filter:drop-shadow(0 0 18px rgba(245,158,11,0.9))}}
         @keyframes starchFp6{0%,100%{opacity:0.7}50%{opacity:1}}
         @keyframes o2FinalFp6a{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-32px);opacity:0}}`) },

    ];
  }

  // ======================================================
  // JUGADOR — FOTOSINTESIS (5 rondas drag-and-drop)
  // ======================================================
  function _juegoRoundsFotosintesis(){
    return [

      // Ronda 1 — Foton al cloroplasto
      { step:1,
        instruction:'La planta necesita luz para fotosintetizar. <strong>Arrastrá</strong> el fotón de luz al cloroplasto.',
        molecule:{sym:'hν', label:'☀️ Fotón de luz', color:'rgba(251,191,36,0.92)', border:'#fbbf24', r:26},
        molSvgX:268, molSvgY:38,
        target:{x:72, y:88, r:42},
        targetLabel:'🟩 Cloroplasto',
        xp:12, feedback:'☀️ ¡Clorofila activada!',
        explain:{
          title:'¡Luz capturada por la Clorofila!',
          text:'El fotón de luz fue absorbido por la <strong>clorofila</strong> en los tilacoides del cloroplasto. La clorofila a (P680) del Fotosistema II capturó esa energía lumínica y la usó para excitar electrones, iniciando la cadena de transporte electrónico fotosintético.'
        }},

      // Ronda 2 — Agua a la vacuola
      { step:2,
        instruction:'La fotólisis necesita agua. <strong>Arrastrá</strong> el H₂O a la vacuola central para que fluya al cloroplasto.',
        molecule:{sym:'H₂O', label:'💧 Agua', color:'rgba(14,165,233,0.92)', border:'#0ea5e9', r:26},
        molSvgX:28, molSvgY:238,
        target:{x:172, y:148, r:80},
        targetLabel:'🟦 Vacuola Central',
        xp:12, feedback:'💧 ¡Agua disponible!',
        explain:{
          title:'¡Agua lista para la Fotólisis!',
          text:'El agua (H₂O) almacenada en la <strong>vacuola central</strong> fluye hacia los tilacoides del cloroplasto. El <strong>complejo de oxidación del agua (OEC)</strong> del Fotosistema II la divide: 2 H₂O → 4 H⁺ + 4 e⁻ + O₂. El oxígeno escapa como gas al exterior.'
        }},

      // Ronda 3 — CO2 al cloroplasto (estroma)
      { step:3,
        instruction:'La planta necesita CO₂ del aire para el ciclo de Calvin. <strong>Arrastrá</strong> el CO₂ al cloroplasto (estroma).',
        molecule:{sym:'CO₂', label:'🌬 CO₂', color:'rgba(148,163,184,0.92)', border:'#94a3b8', r:26},
        molSvgX:268, molSvgY:55,
        target:{x:72, y:96, r:38},
        targetLabel:'🌿 Estroma (cloroplasto)',
        xp:12, feedback:'🌬 ¡CO₂ fijado!',
        explain:{
          title:'¡Carbono fijado por RuBisCO!',
          text:'El CO₂ atmosférico entró al <strong>estroma</strong> del cloroplasto donde la enzima <strong>RuBisCO</strong> lo captura y lo une a RuBP (ribulosa-1,5-bisfosfato, 5C). Esta reacción produce dos moléculas de 3-PGA. Es la <strong>fijación del carbono</strong> del ciclo de Calvin.'
        }},

      // Ronda 4 — ATP al Calvin
      { step:4,
        instruction:'El ciclo de Calvin necesita energía. <strong>Arrastrá</strong> el ATP (producido en la fase lumínica) al estroma del cloroplasto.',
        molecule:{sym:'ATP', label:'⚡ ATP', color:'rgba(16,185,129,0.92)', border:'#10b981', r:24},
        molSvgX:252, molSvgY:158,
        target:{x:72, y:108, r:36},
        targetLabel:'🌿 Estroma → Ciclo Calvin',
        xp:12, feedback:'⚡ ¡Ciclo de Calvin activo!',
        explain:{
          title:'¡ATP impulsando el Ciclo de Calvin!',
          text:'El ATP producido en la <strong>fase lumínica</strong> (por la ATP sintasa del cloroplasto) es consumido en el estroma para convertir 3-PGA en 1,3-bisfosfoglicerato. Junto con el NADPH, esta energía transforma el 3-PGA en <strong>G3P</strong> (gliceraldehído-3-fosfato), el primer azúcar del ciclo.'
        }},

      // Ronda 5 — Glucosa al citoplasma
      { step:5,
        instruction:'La glucosa está lista. <strong>Arrastrá</strong> la glucosa desde el cloroplasto al citoplasma para que la célula la use.',
        molecule:{sym:'Glc', label:'🍬 Glucosa', color:'rgba(245,158,11,0.92)', border:'#f59e0b', r:26},
        molSvgX:72, molSvgY:148,
        target:{x:248, y:148, r:40},
        targetLabel:'🍃 Citoplasma (uso / almacén)',
        xp:12, feedback:'🍬 ¡Fotosíntesis completa!',
        explain:{
          title:'¡Fotosíntesis completada!',
          text:'La <strong>glucosa</strong> (C₆H₁₂O₆) producida en el ciclo de Calvin fue exportada al citoplasma. Desde allí puede: ingresar a la respiración celular para obtener ATP, polimerizarse en <strong>almidón</strong> como reserva, usarse para construir <strong>celulosa</strong> de la pared, o convertirse en sacarosa para transporte. ¡La energía solar quedó guardada como química!'
        }},

    ];
  }

