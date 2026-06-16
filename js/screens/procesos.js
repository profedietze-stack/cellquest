// CellQuest — Célula en Acción Screen  v2
(function(){
  'use strict';

  // ══════════════════════════════════════════════
  // STATE
  // ══════════════════════════════════════════════
  let _tab = 'cine';
  const _anim = { proceso:null, step:0, playing:false, timer:null, annoTimer:null, stepMs:6000, infoOpen:false };
  const ANNO_MS = 3000;   // ms each annotation stays visible
  const ANNO_GAP_MS = 700; // pause between last annotation and step advance

  // ══════════════════════════════════════════════
  // PUBLIC API
  // ══════════════════════════════════════════════
  window.initProcesos = function(){
    _tab = 'cine'; _anim.proceso=null; _anim.playing=false; _anim.infoOpen=false;
    if(_anim.timer){clearTimeout(_anim.timer);_anim.timer=null;}
    _renderTabs(); _renderBody();
  };
  window.switchProcTab = function(tab){
    _anim.playing=false; _anim.infoOpen=false;
    if(_anim.timer){clearTimeout(_anim.timer);_anim.timer=null;}
    _tab=tab; _renderTabs(); _renderBody();
  };

  // ══════════════════════════════════════════════
  // TABS
  // ══════════════════════════════════════════════
  function _renderTabs(){
    document.querySelectorAll('.proc-tab').forEach(b=>b.classList.remove('active'));
    const el=document.getElementById('ptab-'+_tab);
    if(el) el.classList.add('active');
  }

  // ══════════════════════════════════════════════
  // BODY ROUTER
  // ══════════════════════════════════════════════
  function _renderBody(){
    const body=document.getElementById('procesosBody');
    if(!body) return;
    if(_tab==='cine'){
      _anim.proceso ? _renderCinePlayer() : _renderCineMenu();
    } else {
      _renderJugadorMenu();
    }
  }

  // ══════════════════════════════════════════════
  // PROCESO METADATA
  // ══════════════════════════════════════════════
  const PROCESOS_META=[
    {id:'respiracion',title:'Respiración Celular',emoji:'⚡',sub:'Glucosa → ATP',       color:'#ef4444',xp:15,steps:null},
    {id:'alimentacion',title:'Alimentación',       emoji:'🍎',sub:'Endocitosis y digestión',color:'#10b981',xp:15,steps:null},
    {id:'reproduccion',title:'Reproducción',       emoji:'🔁',sub:'Mitosis celular',        color:'#7c3aed',xp:15,steps:null},
    {id:'defensa',     title:'Defensa Inmune',     emoji:'🛡️',sub:'Respuesta inmunológica',color:'#f59e0b',xp:15,steps:null},
    {id:'sintesis',    title:'Síntesis de Proteínas',emoji:'🧬',sub:'Del ADN a la proteína',  color:'#06b6d4',xp:15,steps:null},
    {id:'fotosintesis', title:'Fotosíntesis',       emoji:'🌿',sub:'Luz solar → Glucosa + O₂',color:'#22c55e',xp:15,steps:null},
  ];

  // ══════════════════════════════════════════════
  // CINE MENU
  // ══════════════════════════════════════════════
  function _hexToRgb(h){const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return r+","+g+","+b;}
  function _renderCineMenu(){
    const body=document.getElementById('procesosBody');
    const seen=_getSeen();
    body.innerHTML=`
      <div class="proc-intro">
        <div class="proc-intro-title">🎬 Modo Cine</div>
        <div class="proc-intro-sub">Observá cómo funcionan las células, paso a paso, con animaciones y explicaciones.</div>
      </div>
      <div class="proc-card-grid" id="procCardGrid"></div>`;
    const grid=document.getElementById('procCardGrid');
    PROCESOS_META.forEach(p=>{
      const done=seen[p.id];
      const card=document.createElement('div');
      card.className='proc-card'+(p.locked?' proc-card-locked':'');card.dataset.procId=p.id;card.style.setProperty('--proc-rgb',_hexToRgb(p.color));
      card.innerHTML=`
        <div class="proc-card-emoji" style="color:${p.color}">${p.emoji}</div>
        <div class="proc-card-info">
          <div class="proc-card-title">${p.title}</div>
          <div class="proc-card-sub">${p.sub}</div>
        </div>
        <div class="proc-card-badge">
          ${p.locked?'<span class="pcb-lock">🔒 Próximamente</span>':done?'<span class="pcb-done">✅ +'+p.xp+' XP</span>':'<span class="pcb-xp">+'+p.xp+' XP</span>'}
        </div>`;
      if(!p.locked) card.onclick=()=>_openProceso(p.id);
      grid.appendChild(card);
    });
  }

  // ══════════════════════════════════════════════
  // OPEN PROCESO
  // ══════════════════════════════════════════════
  function _openProceso(id){
    const meta=PROCESOS_META.find(x=>x.id===id);
    if(!meta||meta.locked) return;
    if(!meta.steps) meta.steps=_buildSteps(id);
    _anim.proceso=meta; _anim.step=0; _anim.playing=false; _anim.infoOpen=false;
    if(_anim.timer){clearTimeout(_anim.timer);_anim.timer=null;}
    _renderCinePlayer();
  }

  // ══════════════════════════════════════════════
  // CINE PLAYER
  // ══════════════════════════════════════════════
  function _renderCinePlayer(){
    const body=document.getElementById('procesosBody');
    const p=_anim.proceso; if(!p) return;
    const steps=p.steps; const total=steps.length; const s=steps[_anim.step];
    const isLast=_anim.step===total-1;
    const seen=_getSeen(); const alreadyDone=seen[p.id];

    // Player mode: CSS class oculta chrome externo para maximizar célula
    document.getElementById('procesosScreen')?.classList.add('player-active');

    body.innerHTML=`
      <div class="cine-player">
        <!-- Header -->
        <div class="cine-header">
          <button class="btn btn-ghost btn-sm cine-back-btn" id="cineBtnBack">← Volver</button>
          <div class="cine-title">${p.emoji} ${p.title}</div>
          <div class="cine-header-right">
            <span class="cine-stepcount">${_anim.step+1}/${total}</span>
          </div>
        </div>

        <!-- SVG Stage — grande -->
        <div class="cine-stage" id="cineStage">
          <div class="cine-svg-wrap" id="cineSvgWrap">${s.svg}</div>
          <div class="cine-step-title">${s.title}</div>
        </div>

        <!-- Narración simple -->
        <div class="cine-narration-wrap">
          <div class="cine-narration" id="cineNarration">${s.narration}</div>
          <button class="cine-info-btn" id="cineBtnInfo">ℹ️ Explicación científica</button>
          <div class="cine-info-panel" id="cineInfoPanel" style="display:none">${s.info}</div>
        </div>

        <!-- Dots + Controls -->
        <div class="cine-footer">
          <div class="cine-dots" id="cineDots">
            ${steps.map((_,i)=>`<button class="cine-dot${i===_anim.step?' active':i<_anim.step?' done':''}" data-i="${i}"></button>`).join('')}
          </div>
          <div class="cine-controls">
            <button class="cine-btn" id="cineBtnPrev" ${_anim.step===0?'disabled':''}>◀ Anterior</button>
            <button class="cine-btn cine-btn-play" id="cineBtnPlay">${_anim.playing?'⏸ Pausa':'▶ Auto'}</button>
            <button class="cine-btn" id="cineBtnNext" ${isLast?'disabled':''}>Siguiente ▶</button>
          </div>
          ${isLast?`<button class="btn btn-cyan cine-complete-btn" id="cineBtnComplete">${alreadyDone?'✅ Ya completado':'🏆 Completar +'+p.xp+' XP'}</button>`:''}
        </div>
      </div>`;

    // Wire buttons — navigation uses _navigateToStep for smooth transitions
    document.getElementById('cineBtnBack').onclick=()=>{
      document.getElementById('procesosScreen')?.classList.remove('player-active');
      _anim.playing=false; if(_anim.timer){clearTimeout(_anim.timer);_anim.timer=null;}
      _anim.proceso=null; _renderBody();
    };
    document.getElementById('cineBtnPrev').onclick=()=>{
      if(_anim.step>0){_anim.playing=false;if(_anim.timer){clearTimeout(_anim.timer);_anim.timer=null;}_navigateToStep(_anim.step-1);}
    };
    document.getElementById('cineBtnNext').onclick=()=>{
      if(_anim.timer){clearTimeout(_anim.timer);_anim.timer=null;}
      if(_anim.step<total-1){_navigateToStep(_anim.step+1);}
    };
    document.getElementById('cineBtnPlay').onclick=()=>{
      _anim.playing=!_anim.playing;
      _patchPlayBtn(); // update text immediately
      if(_anim.playing){
        _autoAdvance();
      } else {
        if(_anim.timer){clearTimeout(_anim.timer);_anim.timer=null;}
        if(_anim.annoTimer){clearTimeout(_anim.annoTimer);_anim.annoTimer=null;}
        _clearAnnotations();
      }
    };
    document.getElementById('cineBtnInfo').onclick=()=>{
      _anim.infoOpen=!_anim.infoOpen;
      const panel=document.getElementById('cineInfoPanel');
      const btn=document.getElementById('cineBtnInfo');
      if(panel) panel.style.display=_anim.infoOpen?'block':'none';
      if(btn) btn.textContent=_anim.infoOpen?'✖ Cerrar explicación':'ℹ️ Explicación científica';
    };
    _wireDots();
    if(isLast){
      document.getElementById('cineBtnComplete').onclick=()=>{
        if(!alreadyDone){
          const s2=_getSeen(); s2[p.id]=Date.now();
          localStorage.setItem('cq3_proc_seen',JSON.stringify(s2));
          if(typeof addXP==='function') addXP(p.xp);
        }
        document.getElementById('procesosScreen')?.classList.remove('player-active');
        _anim.proceso=null; _renderBody();
      };
    }
    if(_anim.playing) _autoAdvance();
  }

  // ── Wire dot buttons (shared between initial render and _patchStep) ──
  function _wireDots(){
    document.querySelectorAll('.cine-dot').forEach(btn=>{
      btn.onclick=()=>{
        _anim.playing=false; if(_anim.timer){clearTimeout(_anim.timer);_anim.timer=null;}
        _navigateToStep(parseInt(btn.dataset.i));
      };
    });
  }

  // ── Smooth step transition ──────────────────────────────────────────
  // 1. Fade-out stage + narration (200ms CSS transition)
  // 2. Swap content in place
  // 3. Fade-in automatically (removing .cine-out restores opacity via transition)
  function _navigateToStep(i, onDone){
    // Always clear annotations and timers before navigating
    if(_anim.annoTimer){clearTimeout(_anim.annoTimer);_anim.annoTimer=null;}
    _clearAnnotations();
    const stage=document.getElementById('cineStage');
    const nwrap=document.querySelector('.cine-narration-wrap');
    if(!stage){ _anim.step=i; _patchStep(); if(onDone) onDone(); return; }

    // Trigger fade-out
    stage.classList.add('cine-out');
    if(nwrap) nwrap.classList.add('cine-out');

    setTimeout(()=>{
      _anim.step=i;
      _patchStep();
      // Next frame: remove class → CSS transition fades back in
      requestAnimationFrame(()=>{
        const s2=document.getElementById('cineStage');
        const n2=document.querySelector('.cine-narration-wrap');
        if(s2) s2.classList.remove('cine-out');
        if(n2) n2.classList.remove('cine-out');
      });
      if(onDone) setTimeout(onDone,50);
    },200);
  }

  // ── Update only the changing DOM nodes (no full re-render) ──────────
  function _patchStep(){
    const p=_anim.proceso; if(!p) return;
    const steps=p.steps; const total=steps.length;
    const s=steps[_anim.step]; const isLast=_anim.step===total-1;
    const seen=_getSeen(); const alreadyDone=seen[p.id];

    // SVG content
    const svgWrap=document.getElementById('cineSvgWrap');
    if(svgWrap) svgWrap.innerHTML=s.svg;

    // Step title
    const stitle=document.querySelector('.cine-step-title');
    if(stitle) stitle.textContent=s.title;

    // Step counter
    const sc=document.querySelector('.cine-stepcount');
    if(sc) sc.textContent=(_anim.step+1)+'/'+total;

    // Narration + info
    const narr=document.getElementById('cineNarration');
    if(narr) narr.innerHTML=s.narration;
    const infoPanel=document.getElementById('cineInfoPanel');
    if(infoPanel){ infoPanel.innerHTML=s.info; infoPanel.style.display=_anim.infoOpen?'block':'none'; }
    const infoBtn=document.getElementById('cineBtnInfo');
    if(infoBtn) infoBtn.textContent=_anim.infoOpen?'✖ Cerrar explicación':'ℹ️ Explicación científica';

    // Dots
    const dots=document.getElementById('cineDots');
    if(dots){
      dots.innerHTML=steps.map((_,i)=>`<button class="cine-dot${i===_anim.step?' active':i<_anim.step?' done':''}" data-i="${i}"></button>`).join('');
      _wireDots();
    }

    // Prev / Next button states
    const prev=document.getElementById('cineBtnPrev');
    const next=document.getElementById('cineBtnNext');
    if(prev) prev.disabled=(_anim.step===0);
    if(next) next.disabled=isLast;

    // Complete button: show on last step, hide otherwise
    const footer=document.querySelector('.cine-footer');
    if(footer){
      let cb=document.getElementById('cineBtnComplete');
      if(isLast){
        if(!cb){
          cb=document.createElement('button');
          cb.id='cineBtnComplete'; cb.className='btn btn-cyan cine-complete-btn';
          footer.appendChild(cb);
        }
        cb.textContent=alreadyDone?'✅ Ya completado':'🏆 Completar +'+p.xp+' XP';
        cb.onclick=()=>{
          if(!alreadyDone){
            const s2=_getSeen(); s2[p.id]=Date.now();
            localStorage.setItem('cq3_proc_seen',JSON.stringify(s2));
            if(typeof addXP==='function') addXP(p.xp);
            if(typeof checkAch==='function') checkAch();
          }
          document.getElementById('procesosScreen')?.classList.remove('player-active');
          _anim.proceso=null; _renderBody();
        };
      } else if(cb){ cb.remove(); }
    }
    _patchPlayBtn();
  }

  function _patchPlayBtn(){
    const btn=document.getElementById('cineBtnPlay');
    if(btn) btn.textContent=_anim.playing?'⏸ Pausa':'▶ Auto';
  }

  // ── Auto-play: show annotations for current step, then advance ──────
  function _autoAdvance(){
    if(_anim.timer){clearTimeout(_anim.timer);_anim.timer=null;}
    if(_anim.annoTimer){clearTimeout(_anim.annoTimer);_anim.annoTimer=null;}
    const p=_anim.proceso; if(!p) return;
    const curr=p.steps[_anim.step];
    const annos=(curr&&curr.annotations)||[];
    const next=_anim.step+1;

    _runAnnotations(annos, ()=>{
      if(!_anim.playing) return;
      if(next>=p.steps.length){ _anim.playing=false; _patchPlayBtn(); return; }
      _navigateToStep(next, ()=>{ if(_anim.playing) _autoAdvance(); });
    });
  }

  // ── Show annotations in sequence, call onDone when finished ─────────
  function _runAnnotations(annos, onDone){
    if(!annos||!annos.length){
      _anim.annoTimer=setTimeout(()=>{ if(onDone) onDone(); }, 800);
      return;
    }
    let idx=0;
    function next(){
      if(!_anim.playing){ _clearAnnotations(); return; }
      if(idx>=annos.length){
        _anim.annoTimer=setTimeout(()=>{ _clearAnnotations(); if(onDone) onDone(); }, ANNO_GAP_MS);
        return;
      }
      _showAnnotation(annos[idx++]);
      _anim.annoTimer=setTimeout(next, ANNO_MS);
    }
    _anim.annoTimer=setTimeout(next, 500); // brief delay before first
  }

  // ── Render one annotation callout in the SVG overlay group ──────────
  function _showAnnotation(anno){
    const g=document.getElementById('cineAnnoGroup');
    if(!g) return;
    g.innerHTML=''; // one at a time
    const NS='http://www.w3.org/2000/svg';
    const lines=Array.isArray(anno.text)?anno.text:[anno.text];
    const bw=Math.max(Math.min(Math.max(...lines.map(l=>l.length))*5.6+20, 148),72);
    const bh=lines.length*13+14;
    const rx=anno.bx-bw/2, ry=anno.by-bh/2;

    const grp=document.createElementNS(NS,'g');
    grp.setAttribute('style','animation:annoIn 0.3s ease-out both');

    // Dashed arrow line from box center to target
    const ln=document.createElementNS(NS,'line');
    ln.setAttribute('x1',anno.bx); ln.setAttribute('y1',anno.by);
    ln.setAttribute('x2',anno.tx); ln.setAttribute('y2',anno.ty);
    ln.setAttribute('stroke','rgba(0,229,255,0.65)');
    ln.setAttribute('stroke-width','1.5');
    ln.setAttribute('stroke-dasharray','5 3');
    grp.appendChild(ln);

    // Target highlight dot
    const dot=document.createElementNS(NS,'circle');
    dot.setAttribute('cx',anno.tx); dot.setAttribute('cy',anno.ty);
    dot.setAttribute('r','4.5');
    dot.setAttribute('fill','rgba(0,229,255,0.0)');
    dot.setAttribute('stroke','rgba(0,229,255,0.95)');
    dot.setAttribute('stroke-width','2');
    dot.setAttribute('style','animation:annoDot 0.8s ease-out both');
    grp.appendChild(dot);

    // Callout box
    const rect=document.createElementNS(NS,'rect');
    rect.setAttribute('x',rx); rect.setAttribute('y',ry);
    rect.setAttribute('width',bw); rect.setAttribute('height',bh);
    rect.setAttribute('rx','7'); rect.setAttribute('ry','7');
    rect.setAttribute('fill','rgba(0,8,24,0.93)');
    rect.setAttribute('stroke','rgba(0,229,255,0.72)');
    rect.setAttribute('stroke-width','1.3');
    grp.appendChild(rect);

    // Text lines
    lines.forEach((l,i)=>{
      const t=document.createElementNS(NS,'text');
      t.setAttribute('x',anno.bx);
      t.setAttribute('y', ry+11+i*13+4);
      t.setAttribute('text-anchor','middle');
      t.setAttribute('font-size','9.5');
      t.setAttribute('fill','rgba(210,238,255,0.97)');
      t.setAttribute('font-family','sans-serif');
      t.setAttribute('font-weight','700');
      t.textContent=l;
      grp.appendChild(t);
    });
    g.appendChild(grp);
  }

  function _clearAnnotations(){
    const g=document.getElementById('cineAnnoGroup');
    if(g) g.innerHTML='';
  }

  // ══════════════════════════════════════════════
  // JUGADOR MENU (Fase 3)
  // ══════════════════════════════════════════════
  // ── JUGADOR MENU ──
  function _renderJugadorMenu(){
    const body=document.getElementById('procesosBody');
    const seen=_getSeen();
    body.innerHTML=`
      <div class="proc-intro">
        <div class="proc-intro-title">🎮 Modo Jugador</div>
        <div class="proc-intro-sub">Jugá los procesos celulares. Arrastrá moléculas al lugar correcto y aprendé haciendo.</div>
      </div>
      <div class="proc-card-grid" id="juegoCardGrid"></div>`;
    const grid=document.getElementById('juegoCardGrid');
    [{id:'respiracion',title:'Respiración Celular',emoji:'⚡',sub:'Arrastrá moléculas al orgánulo correcto',color:'#ef4444',xp:50},
     {id:'alimentacion',title:'Alimentación',emoji:'🍎',sub:'Endocitosis · Lisosoma · Exocitosis',color:'#10b981',xp:50},
     {id:'reproduccion',title:'Reproducción',emoji:'🔁',sub:'Mitosis · Huso mitótico · Citocinesis',color:'#7c3aed',xp:50},
     {id:'defensa',title:'Defensa Inmune',emoji:'🛡️',sub:'Macrófagos · Anticuerpos · Memoria',color:'#f59e0b',xp:50},
     {id:'sintesis',title:'Síntesis de Proteínas',emoji:'🧬',sub:'ADN · ARNm · Ribosoma · Golgi',color:'#06b6d4',xp:50},
    ].forEach(j=>{
      const done=seen['j_'+j.id];
      const card=document.createElement('div');
      card.className='proc-card'+(j.locked?' proc-card-locked':'');
      card.innerHTML=`
        <div class="proc-card-emoji" style="color:${j.color}">${j.emoji}</div>
        <div class="proc-card-info">
          <div class="proc-card-title">${j.title}</div>
          <div class="proc-card-sub">${j.sub}</div>
        </div>
        <div class="proc-card-badge">
          ${j.locked?'<span class="pcb-lock">🔒 Próxim.</span>':done?'<span class="pcb-done">✅ +'+j.xp+' XP</span>':'<span class="pcb-xp">+'+j.xp+' XP</span>'}
        </div>`;
      if(!j.locked) card.onclick=()=>_openJuego(j.id);
      grid.appendChild(card);
    });
  }

  // ══════════════════════════════════════════════
  // STORAGE
  // ══════════════════════════════════════════════
  function _getSeen(){
    try{return JSON.parse(localStorage.getItem('cq3_proc_seen')||'{}');}catch(e){return {};}
  }

  // ══════════════════════════════════════════════
  // STEP BUILDER
  // ══════════════════════════════════════════════
  function _buildSteps(id){
    if(id==='respiracion') return _stepsRespiracion();
    if(id==='alimentacion') return _stepsAlimentacion();
    if(id==='reproduccion') return _stepsReproduccion();
    if(id==='defensa') return _stepsDefensa();
    if(id==='sintesis') return _stepsSintesis();
    if(id==='fotosintesis') return _stepsFotosintesis();
    return [];
  }

  // ══════════════════════════════════════════════
  // SVG BASE CELL — detailed + animated background
  // viewBox 0 0 320 300, center 160,155
  // cell: ellipse cx=160 cy=158 rx=148 ry=128
  // nucleus: cx=122 cy=108 rx=34 ry=28
  // mito1(right): cx=208 cy=168, rx=42 ry=16, rotate(20)
  // mito2(lower-left): cx=90 cy=190, rx=34 ry=13, rotate(-14)
  // ══════════════════════════════════════════════
  function _cell(id, extras, note, extraStyle){
    const uid=id; // step unique id for animation namespacing
    return `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" class="cine-cell-svg">
  <defs>
    <radialGradient id="cg${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(0,150,200,0.1)"/>
      <stop offset="100%" stop-color="rgba(0,150,200,0)"/>
    </radialGradient>
    <radialGradient id="ng${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(167,139,250,0.35)"/>
      <stop offset="100%" stop-color="rgba(124,58,237,0.1)"/>
    </radialGradient>
    <filter id="gw${uid}"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="gw2${uid}"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <marker id="aW${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="rgba(245,158,11,0.9)"/></marker>
    <marker id="aG${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="rgba(16,185,129,0.85)"/></marker>
    <marker id="aB${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="rgba(96,165,250,0.85)"/></marker>
    <style>
      /* ── Base cell animations ── */
      /* Organic whole-cell breathing: asymmetric x/y scale feels alive */
      @keyframes cellBreathe${uid}{
        0%  {transform:scale(1,1)}
        30% {transform:scale(1.018,1.012)}
        60% {transform:scale(1.022,1.016)}
        80% {transform:scale(1.014,1.010)}
        100%{transform:scale(1,1)}
      }
      /* Outer glow pulse synced to breathing */
      @keyframes outerGlowPulse${uid}{0%,100%{opacity:0.55}60%{opacity:0.9}}
      @keyframes cellPulse${uid}{0%,100%{opacity:0.55}50%{opacity:0.75}}
      @keyframes nucGlow${uid}{0%,100%{filter:drop-shadow(0 0 5px rgba(167,139,250,0.4))}50%{filter:drop-shadow(0 0 14px rgba(167,139,250,0.9))}}
      @keyframes mitoBreath${uid}{0%,100%{opacity:0.22}50%{opacity:0.45}}
      @keyframes erFade${uid}{0%,100%{opacity:0.15}50%{opacity:0.35}}
      @keyframes riboBlink${uid}{0%,100%{opacity:0.5}50%{opacity:0.9}}
      @keyframes annoIn{0%{opacity:0;transform:scale(0.82)}100%{opacity:1;transform:scale(1)}}
      @keyframes annoDot{0%{r:0;opacity:0}60%{r:7;opacity:0.8}100%{r:4.5;opacity:1}}
      ${extraStyle||''}
    </style>
  </defs>

  <!-- Outer ambient glow — pulses with breathing -->
  <ellipse cx="160" cy="158" rx="152" ry="132" fill="url(#cg${uid})"
    style="animation:outerGlowPulse${uid} 4s ease-in-out infinite"/>

  <!-- ══ BREATHING WRAPPER — whole cell, gentle organic deformation ══ -->
  <g style="transform-origin:160px 158px;animation:cellBreathe${uid} 4s ease-in-out infinite">

  <!-- ─── CELL MEMBRANE ─── -->
  <ellipse cx="160" cy="158" rx="148" ry="128"
    fill="rgba(0,25,55,0.6)"
    stroke="rgba(0,229,255,0.6)" stroke-width="2.2" stroke-dasharray="6 3"
    style="animation:cellPulse${uid} 3s ease-in-out infinite"/>

  <!-- ─── ER NETWORK (background) ─── -->
  <g style="animation:erFade${uid} 4s ease-in-out infinite">
    <path d="M148 175 Q162 166 178 174 Q194 182 210 174" fill="none" stroke="rgba(0,229,255,0.25)" stroke-width="1.4"/>
    <path d="M140 195 Q155 186 172 194 Q188 202 204 193" fill="none" stroke="rgba(0,229,255,0.2)" stroke-width="1.2"/>
    <path d="M115 162 Q130 154 146 162 Q162 170 178 162" fill="none" stroke="rgba(0,229,255,0.22)" stroke-width="1.3"/>
    <!-- ER ribosomes -->
    <circle cx="152" cy="172" r="2.8" fill="rgba(251,191,36,0.7)" style="animation:riboBlink${uid} 1.8s ease-in-out infinite"/>
    <circle cx="164" cy="169" r="2.8" fill="rgba(251,191,36,0.65)" style="animation:riboBlink${uid} 1.8s 0.3s ease-in-out infinite"/>
    <circle cx="176" cy="172" r="2.8" fill="rgba(251,191,36,0.7)" style="animation:riboBlink${uid} 1.8s 0.6s ease-in-out infinite"/>
    <circle cx="186" cy="168" r="2.5" fill="rgba(251,191,36,0.6)" style="animation:riboBlink${uid} 1.8s 0.9s ease-in-out infinite"/>
  </g>

  <!-- ─── GOLGI (background, faint) ─── -->
  <g opacity=".5">
    <path d="M195 210 Q218 205 232 215" fill="none" stroke="rgba(245,158,11,0.45)" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M192 220 Q217 214 233 225" fill="none" stroke="rgba(245,158,11,0.35)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M194 230 Q216 224 230 233" fill="none" stroke="rgba(245,158,11,0.25)" stroke-width="1.8" stroke-linecap="round"/>
    <!-- Golgi vesicles -->
    <circle cx="244" cy="212" r="5.5" fill="rgba(245,158,11,0.2)" stroke="rgba(245,158,11,0.45)" stroke-width="1"/>
    <circle cx="238" cy="228" r="4.5" fill="rgba(245,158,11,0.18)" stroke="rgba(245,158,11,0.4)" stroke-width="1"/>
  </g>

  <!-- ─── FREE RIBOSOMES ─── -->
  <circle cx="96"  cy="148" r="3" fill="rgba(251,191,36,0.6)" style="animation:riboBlink${uid} 2.2s 0.2s ease-in-out infinite"/>
  <circle cx="104" cy="140" r="3" fill="rgba(251,191,36,0.55)" style="animation:riboBlink${uid} 2.2s 0.7s ease-in-out infinite"/>
  <circle cx="240" cy="145" r="3" fill="rgba(251,191,36,0.55)" style="animation:riboBlink${uid} 2.2s 1.1s ease-in-out infinite"/>
  <circle cx="248" cy="154" r="2.8" fill="rgba(251,191,36,0.5)" style="animation:riboBlink${uid} 2.2s 0.5s ease-in-out infinite"/>

  <!-- ─── LYSOSOME ─── -->
  <circle cx="128" cy="215" r="9.5" fill="rgba(236,72,153,0.18)" stroke="rgba(236,72,153,0.55)" stroke-width="1.5"/>
  <text x="128" y="219" text-anchor="middle" font-size="8" fill="rgba(236,72,153,0.75)" font-family="sans-serif">L</text>

  <!-- ─── MITOCONDRIA 1 (right) ─── -->
  <g transform="rotate(20 208 168)" style="animation:mitoBreath${uid} 2.2s ease-in-out infinite">
    <ellipse cx="208" cy="168" rx="42" ry="16"
      fill="rgba(239,68,68,0.25)" stroke="rgba(239,68,68,0.8)" stroke-width="2"/>
    <path d="M172 168 Q180 160 188 168 Q196 176 204 168 Q212 160 220 168 Q228 176 236 168 Q244 160 244 168"
      fill="none" stroke="rgba(239,68,68,0.5)" stroke-width="1.5"/>
  </g>

  <!-- ─── MITOCONDRIA 2 (lower-left) ─── -->
  <g transform="rotate(-14 90 190)" style="animation:mitoBreath${uid} 2.6s 0.4s ease-in-out infinite">
    <ellipse cx="90" cy="190" rx="34" ry="13"
      fill="rgba(239,68,68,0.22)" stroke="rgba(239,68,68,0.7)" stroke-width="1.8"/>
    <path d="M60 190 Q68 183 76 190 Q84 197 92 190 Q100 183 108 190 Q116 197 120 190"
      fill="none" stroke="rgba(239,68,68,0.45)" stroke-width="1.3"/>
  </g>

  <!-- ─── NUCLEUS ─── -->
  <g filter="url(#gw${uid})" style="animation:nucGlow${uid} 2.8s ease-in-out infinite">
    <ellipse cx="122" cy="108" rx="34" ry="28"
      fill="url(#ng${uid})" stroke="rgba(167,139,250,0.85)" stroke-width="1.8"/>
    <!-- Nuclear pores -->
    <circle cx="104" cy="94"  r="3.2" fill="none" stroke="rgba(167,139,250,0.6)" stroke-width="1.2"/>
    <circle cx="122" cy="82"  r="3.2" fill="none" stroke="rgba(167,139,250,0.6)" stroke-width="1.2"/>
    <circle cx="140" cy="94"  r="3.2" fill="none" stroke="rgba(167,139,250,0.6)" stroke-width="1.2"/>
    <circle cx="142" cy="112" r="3.2" fill="none" stroke="rgba(167,139,250,0.55)" stroke-width="1.2"/>
    <circle cx="104" cy="116" r="3.2" fill="none" stroke="rgba(167,139,250,0.55)" stroke-width="1.2"/>
    <!-- Nucleolus -->
    <ellipse cx="120" cy="108" rx="14" ry="11"
      fill="rgba(167,139,250,0.55)" stroke="rgba(200,180,255,0.65)" stroke-width="1.2"/>
  </g>

  <!-- ─── STEP-SPECIFIC CONTENT ─── -->
  ${extras}

  <!-- ─── ANNOTATION OVERLAY GROUP (filled dynamically by JS) ─── -->
  <g id="cineAnnoGroup" style="pointer-events:none"></g>

  <!-- ══ END BREATHING WRAPPER ══ -->
  </g>

  <!-- ─── NOTE BAR (outside breathing so text stays crisp) ─── -->
  ${note?`<rect x="10" y="285" width="300" height="14" rx="4" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" stroke-width="1"/>
  <text x="160" y="295" text-anchor="middle" font-size="7" fill="rgba(16,185,129,0.75)" font-family="sans-serif">${note}</text>`:''}
</svg>`;
  }

  // ══════════════════════════════════════════════
  // RESPIRACIÓN CELULAR — 7 PASOS
  // ══════════════════════════════════════════════
  function _stepsRespiracion(){
    return [

      // ─── PASO 0: Vista general ───────────────────────────────────────
      { title:'⚡ La Célula y sus fábricas de energía',
        narration:'La célula necesita energía para todo: moverse, crecer, dividirse. Esa energía viene de un proceso llamado <strong>Respiración Celular</strong>, que transforma la glucosa (azúcar) en ATP — la "batería" que usa la célula.',
        info:'<b>Definición científica:</b> La respiración celular aeróbica es el proceso metabólico por el cual las células eucariotas oxidan glucosa (C₆H₁₂O₆) en presencia de O₂, obteniendo ~36-38 moléculas de ATP, CO₂ y H₂O. Involucra tres etapas: glucólisis (citoplasma), ciclo de Krebs (matriz mitocondrial) y fosforilación oxidativa (membrana interna mitocondrial).',
        annotations:[
          {text:['🧱 La membrana controla','qué entra y sale'],     bx:80,  by:38,  tx:160, ty:30},
          {text:['🧬 Núcleo','Guarda el ADN'],                      bx:50,  by:90,  tx:112, ty:93},
          {text:['⚡ Mitocondria','Fábrica de ATP ⚡'],             bx:270, by:140, tx:214, ty:158},
          {text:['🏭 Retículo ER','Fabrica proteínas'],             bx:88,  by:176, tx:158, ty:174},
        ],
        svg: _cell('s0',`
          <!-- Labels flotantes -->
          <text x="122" y="72" text-anchor="middle" font-size="8.5" fill="rgba(167,139,250,0.9)" font-family="sans-serif" font-weight="bold">Núcleo</text>
          <text x="228" y="148" text-anchor="middle" font-size="8" fill="rgba(239,68,68,0.9)" font-family="sans-serif" font-weight="bold" transform="rotate(20 228 148)">Mitocondria</text>
          <text x="80"  y="178" text-anchor="middle" font-size="7.5" fill="rgba(239,68,68,0.85)" font-family="sans-serif">Mitocondria</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(0,229,255,0.5)" font-family="sans-serif" font-style="italic">CITOPLASMA</text>
          <text x="128" y="222" text-anchor="middle" font-size="7.5" fill="rgba(236,72,153,0.7)" font-family="sans-serif">Lisosoma</text>
          <text x="215" y="208" text-anchor="middle" font-size="7.5" fill="rgba(245,158,11,0.65)" font-family="sans-serif">Golgi</text>
          <!-- Centrosome -->
          <circle cx="164" cy="72" r="7" fill="rgba(0,229,255,0.15)" stroke="rgba(0,229,255,0.5)" stroke-width="1.5"/>
          <circle cx="162" cy="70" r="2.5" fill="rgba(0,229,255,0.7)"/>
          <text x="164" y="86" text-anchor="middle" font-size="7" fill="rgba(0,229,255,0.6)" font-family="sans-serif">Centrosoma</text>
        `, 'Ecuación global:  C₆H₁₂O₆ + 6 O₂  →  6 CO₂ + 6 H₂O + ~38 ATP',
        `@keyframes labelPop{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}`) },

      // ─── PASO 1: Glucosa entra ────────────────────────────────────────
      { title:'🍬 Entrada de Glucosa — Transportadores GLUT',
        narration:'La glucosa llega desde la sangre hasta la membrana de la célula. Unas "puertas" especiales llamadas <strong>GLUT</strong> la dejan entrar. Sin glucosa no hay energía posible — es el combustible de la célula.',
        info:'<b>Científico:</b> La glucosa (6C, aldohexosa) entra por difusión facilitada a través de proteínas GLUT (glucose transporter) en la membrana plasmática. En células musculares y adiposas, la insulina regula la inserción de GLUT4 en la membrana. La glucosa es inmediatamente fosforilada a glucosa-6-fosfato por la hexoquinasa, quedando atrapada en el citoplasma.',
        annotations:[
          {text:['🍬 Glucosa llegando','desde la sangre'],          bx:272, by:88,  tx:306, ty:120},
          {text:['🚪 GLUT: puerta','en la membrana'],               bx:238, by:106, tx:274, ty:128},
          {text:['🎉 ¡Glucosa dentro!','El ciclo comienza'],        bx:196, by:106, tx:242, ty:130},
        ],
        svg: _cell('s1',`
          <!-- Glucose outside moving in -->
          <g style="animation:glucoseEnter 1.2s ease-out forwards">
            <circle cx="306" cy="120" r="16" fill="rgba(245,158,11,0.35)" stroke="rgba(245,158,11,1)" stroke-width="2.5"/>
            <text x="306" y="124" text-anchor="middle" font-size="10" fill="#fbbf24" font-weight="bold" font-family="sans-serif">G</text>
          </g>
          <!-- Arrow animated -->
          <path d="M290 122 L260 128" stroke="rgba(245,158,11,0.9)" stroke-width="2.5"
            marker-end="url(#aWs1)" fill="none"
            style="animation:arrowPulse 1.4s ease-in-out infinite"/>
          <!-- GLUT channel highlight on membrane -->
          <rect x="268" y="116" width="12" height="20" rx="6"
            fill="rgba(0,229,255,0.25)" stroke="rgba(0,229,255,0.7)" stroke-width="1.5"
            style="animation:glutBlink 1.4s ease-in-out infinite"/>
          <text x="274" y="110" text-anchor="middle" font-size="8" fill="rgba(0,229,255,0.85)" font-family="sans-serif" font-weight="bold">GLUT</text>
          <!-- Glucose inside (just entered) -->
          <circle cx="242" cy="132" r="18" fill="rgba(245,158,11,0.42)" stroke="rgba(245,158,11,1)" stroke-width="2.8"
            filter="url(#gws1)" style="animation:glucosePulse 2s ease-in-out infinite"/>
          <text x="242" y="136" text-anchor="middle" font-size="11" fill="#fbbf24" font-weight="bold" font-family="sans-serif">G6</text>
          <text x="242" y="154" text-anchor="middle" font-size="8" fill="rgba(245,158,11,0.75)" font-family="sans-serif">C₆H₁₂O₆</text>
        `, 'Glucosa ingresa por difusión facilitada (sin gasto de ATP)',
        `@keyframes glucoseEnter{0%{transform:translateX(30px);opacity:0}100%{transform:translateX(0);opacity:1}}
         @keyframes arrowPulse{0%,100%{opacity:0.5;stroke-dashoffset:0}50%{opacity:1}}
         @keyframes glutBlink{0%,100%{opacity:0.7}50%{opacity:1;filter:drop-shadow(0 0 6px rgba(0,229,255,0.8))}}
         @keyframes glucosePulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}`) },

      // ─── PASO 2: Glucólisis ───────────────────────────────────────────
      { title:'🔥 Glucólisis (Citoplasma) — Primera energía',
        narration:'En el citoplasma, la glucosa (6 carbonos) se "rompe" en dos mitades más pequeñas, los <strong>piruvatos</strong> (3 carbonos). Esta rotura libera las primeras moléculas de energía: ¡2 ATP! Es como sacar las primeras monedas de una alcancía.',
        info:'<b>Científico:</b> La glucólisis consta de 10 reacciones enzimáticas en el citosol. En la fase de inversión se consumen 2 ATP; en la fase de ganancia se producen 4 ATP y 2 NADH. Balance neto: 2 ATP + 2 NADH + 2 piruvato por glucosa. No requiere O₂ (es anaeróbica). El piruvato es luego transportado a la matriz mitocondrial por el transportador MPC.',
        annotations:[
          {text:['🔥 La glucosa (6C)','se rompe en 2'],             bx:172, by:96,  tx:216, ty:118},
          {text:['🔥 2 Piruvatos (3C)','se forman'],                bx:216, by:200, tx:216, ty:175},
          {text:['⚡ +2 ATP','¡Primera energía!'],                  bx:92,  by:148, tx:155, ty:148},
          {text:['🔋 +2 NADH','Portadores de energía'],             bx:254, by:200, tx:274, ty:160},
        ],
        svg: _cell('s2',`
          <!-- G6 fading/splitting -->
          <circle cx="216" cy="120" r="14" fill="rgba(245,158,11,0.2)" stroke="rgba(245,158,11,0.4)" stroke-width="1.5" stroke-dasharray="4 2"/>
          <text x="216" y="124" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.5)" font-family="sans-serif">G6</text>
          <!-- Split arrows -->
          <line x1="210" y1="134" x2="192" y2="162" stroke="rgba(245,158,11,0.7)" stroke-width="2" marker-end="url(#aWs2)"/>
          <line x1="222" y1="134" x2="242" y2="162" stroke="rgba(245,158,11,0.7)" stroke-width="2" marker-end="url(#aWs2)"/>
          <!-- Pyruvate 1 -->
          <circle cx="180" cy="175" r="14" fill="rgba(251,191,36,0.42)" stroke="rgba(251,191,36,0.95)" stroke-width="2.2"
            style="animation:pyrPop 0.6s 0.3s ease-out both"/>
          <text x="180" y="179" text-anchor="middle" font-size="9" fill="#fbbf24" font-weight="bold" font-family="sans-serif">Pir</text>
          <text x="180" y="193" text-anchor="middle" font-size="7.5" fill="rgba(251,191,36,0.65)" font-family="sans-serif">3C</text>
          <!-- Pyruvate 2 -->
          <circle cx="252" cy="175" r="14" fill="rgba(251,191,36,0.42)" stroke="rgba(251,191,36,0.95)" stroke-width="2.2"
            style="animation:pyrPop 0.6s 0.6s ease-out both"/>
          <text x="252" y="179" text-anchor="middle" font-size="9" fill="#fbbf24" font-weight="bold" font-family="sans-serif">Pir</text>
          <text x="252" y="193" text-anchor="middle" font-size="7.5" fill="rgba(251,191,36,0.65)" font-family="sans-serif">3C</text>
          <!-- ATP x2 -->
          <circle cx="155" cy="148" r="13" fill="rgba(16,185,129,0.42)" stroke="rgba(16,185,129,0.95)" stroke-width="2"
            filter="url(#gws2)" style="animation:atpPop 0.5s 0.9s ease-out both,atpGlow 1.8s 1.4s ease-in-out infinite"/>
          <text x="155" y="152" text-anchor="middle" font-size="8.5" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
          <circle cx="155" cy="176" r="13" fill="rgba(16,185,129,0.42)" stroke="rgba(16,185,129,0.95)" stroke-width="2"
            filter="url(#gws2)" style="animation:atpPop 0.5s 1.1s ease-out both,atpGlow 1.8s 1.6s ease-in-out infinite"/>
          <text x="155" y="180" text-anchor="middle" font-size="8.5" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
          <text x="155" y="196" text-anchor="middle" font-size="7.5" fill="rgba(16,185,129,0.75)" font-family="sans-serif">+2 ATP netos</text>
          <!-- NADH x2 -->
          <circle cx="274" cy="142" r="12" fill="rgba(96,165,250,0.35)" stroke="rgba(96,165,250,0.85)" stroke-width="1.8"
            style="animation:atpPop 0.5s 1.3s ease-out both"/>
          <text x="274" y="146" text-anchor="middle" font-size="8" fill="rgba(96,165,250,0.95)" font-weight="bold" font-family="sans-serif">NADH</text>
          <circle cx="274" cy="168" r="12" fill="rgba(96,165,250,0.35)" stroke="rgba(96,165,250,0.85)" stroke-width="1.8"
            style="animation:atpPop 0.5s 1.5s ease-out both"/>
          <text x="274" y="172" text-anchor="middle" font-size="8" fill="rgba(96,165,250,0.95)" font-weight="bold" font-family="sans-serif">NADH</text>
          <text x="274" y="187" text-anchor="middle" font-size="7.5" fill="rgba(96,165,250,0.7)" font-family="sans-serif">+2 NADH</text>
          <!-- Stage label -->
          <text x="160" y="52" text-anchor="middle" font-size="10" fill="rgba(245,158,11,0.9)" font-family="sans-serif" font-weight="bold">GLUCÓLISIS</text>
        `, 'Sin O₂ necesario · Produce: 2 Piruvatos + 2 ATP + 2 NADH',
        `@keyframes pyrPop{0%{transform:scale(0);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
         @keyframes atpPop{0%{transform:scale(0);opacity:0}80%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}
         @keyframes atpGlow{0%,100%{filter:drop-shadow(0 0 4px rgba(16,185,129,0.4))}50%{filter:drop-shadow(0 0 12px rgba(16,185,129,0.9))}}`) },

      // ─── PASO 3: Piruvatos → Mitocondria ─────────────────────────────
      { title:'🚚 Piruvatos → Mitocondria',
        narration:'Los piruvatos viajan desde el citoplasma hasta la <strong>mitocondria</strong>, la central energética de la célula. Al entrar, se transforman en una molécula más pequeña (Acetil-CoA) y liberan dióxido de carbono — ¡el mismo CO₂ que exhalás al respirar!',
        annotations:[
          {text:['🚚 Piruvatos viajan','a la mitocondria'],         bx:130, by:126, tx:186, ty:150},
          {text:['⚗️ Acetil-CoA formado','en la matriz'],           bx:168, by:200, tx:210, ty:170},
          {text:['💨 CO₂ liberado','← el que exhalás'],            bx:266, by:110, tx:238, ty:140},
        ],
        info:'<b>Científico:</b> Los piruvatos son importados a la matriz mitocondrial por el transportador MPC (Mitochondrial Pyruvate Carrier). Allí, el complejo piruvato deshidrogenasa (PDC) cataliza la descarboxilación oxidativa: Piruvato + CoA + NAD⁺ → Acetil-CoA + CO₂ + NADH. Este paso ocurre ×2 (una vez por piruvato) y genera 2 NADH adicionales antes del ciclo de Krebs.',
        svg: _cell('s3',`
          <!-- Pyruvate 1 moving right toward mito1 -->
          <circle cx="186" cy="152" r="13" fill="rgba(251,191,36,0.44)" stroke="rgba(251,191,36,0.95)" stroke-width="2.2"
            style="animation:pir1Move 2s ease-in-out infinite alternate"/>
          <text x="186" y="156" text-anchor="middle" font-size="9" fill="#fbbf24" font-weight="bold" font-family="sans-serif">Pir</text>
          <!-- Pyruvate 2 moving toward mito2 -->
          <circle cx="94" cy="172" r="13" fill="rgba(251,191,36,0.44)" stroke="rgba(251,191,36,0.95)" stroke-width="2.2"
            style="animation:pir2Move 2s 0.5s ease-in-out infinite alternate"/>
          <text x="94" y="176" text-anchor="middle" font-size="9" fill="#fbbf24" font-weight="bold" font-family="sans-serif">Pir</text>
          <!-- Acetil-CoA label inside mito1 -->
          <text x="210" y="170" text-anchor="middle" font-size="8" fill="rgba(245,158,11,0.9)" font-family="sans-serif" font-weight="bold"
            transform="rotate(20 210 170)" style="animation:acCoaAppear 1s 1s ease-out both">Ac-CoA</text>
          <!-- CO2 floating up from mito1 -->
          <g style="animation:co2Float1 2.5s 0.5s ease-out infinite">
            <circle cx="234" cy="142" r="9" fill="rgba(148,163,184,0.18)" stroke="rgba(148,163,184,0.55)" stroke-width="1.2"/>
            <text x="234" y="146" text-anchor="middle" font-size="7.5" fill="rgba(148,163,184,0.85)" font-family="sans-serif">CO₂</text>
          </g>
          <g style="animation:co2Float2 2.5s 1.2s ease-out infinite">
            <circle cx="250" cy="130" r="8" fill="rgba(148,163,184,0.15)" stroke="rgba(148,163,184,0.45)" stroke-width="1"/>
            <text x="250" y="134" text-anchor="middle" font-size="7" fill="rgba(148,163,184,0.75)" font-family="sans-serif">CO₂</text>
          </g>
          <!-- NADH produced -->
          <circle cx="264" cy="155" r="12" fill="rgba(96,165,250,0.35)" stroke="rgba(96,165,250,0.85)" stroke-width="1.8"
            style="animation:atpPopS3 0.5s 1s ease-out both"/>
          <text x="264" y="159" text-anchor="middle" font-size="8" fill="rgba(96,165,250,0.95)" font-weight="bold" font-family="sans-serif">NADH</text>
          <!-- Stage label -->
          <text x="160" y="52" text-anchor="middle" font-size="9.5" fill="rgba(251,191,36,0.9)" font-family="sans-serif" font-weight="bold">DESCARBOXILACIÓN</text>
        `, 'Piruvato + CoA  →  Acetil-CoA + CO₂ + NADH  (×2)',
        `@keyframes pir1Move{0%{transform:translate(0,0)}100%{transform:translate(14px,12px)}}
         @keyframes pir2Move{0%{transform:translate(0,0)}100%{transform:translate(-8px,14px)}}
         @keyframes acCoaAppear{0%{opacity:0}100%{opacity:1}}
         @keyframes co2Float1{0%{transform:translateY(0);opacity:0.8}100%{transform:translateY(-28px);opacity:0}}
         @keyframes co2Float2{0%{transform:translateY(0);opacity:0.7}100%{transform:translateY(-24px);opacity:0}}
         @keyframes atpPopS3{0%{transform:scale(0);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}`) },

      // ─── PASO 4: Ciclo de Krebs ───────────────────────────────────────
      { title:'🔄 Ciclo de Krebs (Matriz Mitocondrial)',
        narration:'Dentro de la mitocondria, el Acetil-CoA entra a una cadena circular de reacciones — el <strong>Ciclo de Krebs</strong>. Como una rueda que gira, extrae la energía del combustible y la guarda en moléculas "cargadas" (NADH y FADH₂), liberando más CO₂.',
        annotations:[
          {text:['🔄 Acetil-CoA entra','al ciclo circular'],        bx:120, by:128, tx:174, ty:146},
          {text:['🔄 La rueda gira 2 veces','(1 por piruvato)'],    bx:266, by:178, tx:212, ty:168},
          {text:['🔋 Produce NADH','y FADH₂ cargados'],            bx:268, by:128, tx:268, ty:152},
          {text:['💨 4 CO₂ liberados','al espacio exterior'],       bx:264, by:106, tx:248, ty:128},
        ],
        info:'<b>Científico:</b> El ciclo de Krebs (ciclo del ácido cítrico) consta de 8 reacciones enzimáticas en la matriz mitocondrial. Por cada Acetil-CoA (2C) que ingresa, se regenera el oxaloacetato (4C) y se liberan: 2 CO₂, 3 NADH, 1 FADH₂, 1 GTP (≡ATP). Como se producen 2 Acetil-CoA por glucosa, el ciclo completo genera: 6 NADH + 2 FADH₂ + 2 ATP + 4 CO₂.',
        svg: _cell('s4',`
          <!-- Krebs wheel inside mito1 — ROTATES -->
          <g transform="rotate(20 208 168)">
            <g style="animation:krebsSpin 5s linear infinite;transform-origin:208px 168px">
              <circle cx="208" cy="155" r="4" fill="rgba(251,191,36,0.85)"/>
              <circle cx="218" cy="158" r="4" fill="rgba(251,191,36,0.8)"/>
              <circle cx="222" cy="168" r="4" fill="rgba(251,191,36,0.75)"/>
              <circle cx="218" cy="178" r="4" fill="rgba(251,191,36,0.8)"/>
              <circle cx="208" cy="181" r="4" fill="rgba(251,191,36,0.85)"/>
              <circle cx="198" cy="178" r="4" fill="rgba(251,191,36,0.8)"/>
              <circle cx="194" cy="168" r="4" fill="rgba(251,191,36,0.75)"/>
              <circle cx="198" cy="158" r="4" fill="rgba(251,191,36,0.8)"/>
              <!-- Connectors -->
              <circle cx="208" cy="168" r="6" fill="rgba(239,68,68,0.25)" stroke="rgba(239,68,68,0.5)" stroke-width="1"/>
            </g>
          </g>
          <!-- NADH x3 appearing -->
          <circle cx="256" cy="132" r="12" fill="rgba(96,165,250,0.38)" stroke="rgba(96,165,250,0.9)" stroke-width="1.8"
            style="animation:nadhPop 0.5s 0.3s ease-out both,nadhFloat 2s 0.8s ease-in-out infinite"/>
          <text x="256" y="136" text-anchor="middle" font-size="8" fill="rgba(96,165,250,0.95)" font-weight="bold" font-family="sans-serif">NADH</text>
          <circle cx="274" cy="152" r="12" fill="rgba(96,165,250,0.38)" stroke="rgba(96,165,250,0.9)" stroke-width="1.8"
            style="animation:nadhPop 0.5s 0.7s ease-out both,nadhFloat 2s 1.2s ease-in-out infinite"/>
          <text x="274" y="156" text-anchor="middle" font-size="8" fill="rgba(96,165,250,0.95)" font-weight="bold" font-family="sans-serif">NADH</text>
          <circle cx="274" cy="176" r="12" fill="rgba(96,165,250,0.38)" stroke="rgba(96,165,250,0.9)" stroke-width="1.8"
            style="animation:nadhPop 0.5s 1.1s ease-out both,nadhFloat 2s 1.6s ease-in-out infinite"/>
          <text x="274" y="180" text-anchor="middle" font-size="8" fill="rgba(96,165,250,0.95)" font-weight="bold" font-family="sans-serif">NADH</text>
          <!-- FADH2 -->
          <circle cx="260" cy="196" r="11" fill="rgba(167,139,250,0.35)" stroke="rgba(167,139,250,0.85)" stroke-width="1.8"
            style="animation:nadhPop 0.5s 1.4s ease-out both"/>
          <text x="260" y="200" text-anchor="middle" font-size="7.5" fill="rgba(167,139,250,0.95)" font-weight="bold" font-family="sans-serif">FADH₂</text>
          <!-- CO2 bubbles floating up -->
          <g style="animation:co2FloatK1 3s ease-out infinite">
            <circle cx="238" cy="130" r="9" fill="rgba(148,163,184,0.18)" stroke="rgba(148,163,184,0.5)" stroke-width="1.2"/>
            <text x="238" y="134" text-anchor="middle" font-size="7.5" fill="rgba(148,163,184,0.8)" font-family="sans-serif">CO₂</text>
          </g>
          <g style="animation:co2FloatK2 3s 1s ease-out infinite">
            <circle cx="254" cy="116" r="8" fill="rgba(148,163,184,0.15)" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
            <text x="254" y="120" text-anchor="middle" font-size="7" fill="rgba(148,163,184,0.72)" font-family="sans-serif">CO₂</text>
          </g>
          <!-- ATP x2 -->
          <circle cx="155" cy="148" r="11" fill="rgba(16,185,129,0.38)" stroke="rgba(16,185,129,0.85)" stroke-width="1.8"
            style="animation:nadhPop 0.5s 1.6s ease-out both"/>
          <text x="155" y="152" text-anchor="middle" font-size="8" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
          <circle cx="155" cy="172" r="11" fill="rgba(16,185,129,0.38)" stroke="rgba(16,185,129,0.85)" stroke-width="1.8"
            style="animation:nadhPop 0.5s 1.8s ease-out both"/>
          <text x="155" y="176" text-anchor="middle" font-size="8" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
          <!-- Label -->
          <text x="160" y="52" text-anchor="middle" font-size="10" fill="rgba(239,68,68,0.9)" font-family="sans-serif" font-weight="bold">CICLO DE KREBS</text>
        `, '×2 vueltas: 6 NADH + 2 FADH₂ + 2 ATP + 4 CO₂',
        `@keyframes krebsSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
         @keyframes nadhPop{0%{transform:scale(0);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
         @keyframes nadhFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
         @keyframes co2FloatK1{0%{transform:translateY(0);opacity:0.8}100%{transform:translateY(-32px);opacity:0}}
         @keyframes co2FloatK2{0%{transform:translateY(0);opacity:0.7}100%{transform:translateY(-28px);opacity:0}}`) },

      // ─── PASO 5: Cadena Respiratoria ─────────────────────────────────
      { title:'⚙️ Cadena Respiratoria (Membrana Interna)',
        narration:'Las moléculas "cargadas" (NADH y FADH₂) van a la membrana interna de la mitocondria, donde pasan por una serie de "escaleras eléctricas" (complejos proteicos). Los iones H⁺ son bombeados hacia afuera creando una presión que genera la mayor cantidad de ATP. El <strong>oxígeno que respirás</strong> es indispensable aquí.',
        annotations:[
          {text:['⚙️ Complejos I-IV','bombean H⁺ hacia afuera'],    bx:162, by:124, tx:192, ty:160},
          {text:['⚡ H⁺ acumulados','espacio intermembrana'],        bx:162, by:116, tx:196, ty:136},
          {text:['🔋 ATP sintasa usa','el flujo de H⁺'],            bx:242, by:140, tx:228, ty:157},
          {text:['💨 O₂: aceptor final','de electrones'],           bx:268, by:140, tx:290, ty:165},
          {text:['⚡ ¡Aquí se fabrica','la mayor parte del ATP!'],  bx:242, by:218, tx:266, ty:196},
        ],
        info:'<b>Científico:</b> La cadena de transporte de electrones (CTE) consta de 4 complejos transmembrana (I-IV) y la ATP sintasa (V). NADH cede e⁻ al complejo I; FADH₂ al complejo II. Los e⁻ fluyen por ubiquinona (CoQ) y citocromo c hasta el complejo IV, donde el O₂ actúa como aceptor final (→H₂O). El flujo de e⁻ bombea H⁺ al espacio intermembrana (gradiente electroquímico). El retorno de H⁺ por la ATP sintasa (quimiosmosis) genera ~28-34 ATP. ΔpH + ΔΨ = fuerza protomotriz.',
        svg: _cell('s5',`
          <!-- Enhanced mito1 with ETC visible -->
          <g transform="rotate(20 208 168)">
            <ellipse cx="208" cy="168" rx="42" ry="16"
              fill="rgba(239,68,68,0.38)" stroke="rgba(239,68,68,0.9)" stroke-width="2.5"/>
            <!-- Inner membrane -->
            <line x1="168" y1="168" x2="248" y2="168" stroke="rgba(239,68,68,0.3)" stroke-width="1" stroke-dasharray="2 2"/>
            <!-- Complexes I II III IV -->
            <rect x="172" y="162" width="8" height="7" fill="rgba(96,165,250,0.8)" rx="2"
              style="animation:compBlink1 1.6s ease-in-out infinite"/>
            <text x="176" y="168" text-anchor="middle" font-size="5" fill="white" font-family="sans-serif">I</text>
            <rect x="184" y="162" width="8" height="7" fill="rgba(96,165,250,0.75)" rx="2"
              style="animation:compBlink1 1.6s 0.4s ease-in-out infinite"/>
            <text x="188" y="168" text-anchor="middle" font-size="5" fill="white" font-family="sans-serif">II</text>
            <rect x="196" y="162" width="8" height="7" fill="rgba(96,165,250,0.8)" rx="2"
              style="animation:compBlink1 1.6s 0.8s ease-in-out infinite"/>
            <text x="200" y="168" text-anchor="middle" font-size="5" fill="white" font-family="sans-serif">III</text>
            <rect x="208" y="162" width="8" height="7" fill="rgba(96,165,250,0.75)" rx="2"
              style="animation:compBlink1 1.6s 1.2s ease-in-out infinite"/>
            <text x="212" y="168" text-anchor="middle" font-size="5" fill="white" font-family="sans-serif">IV</text>
            <!-- ATP Synthase V -->
            <ellipse cx="228" cy="168" rx="6" ry="8" fill="rgba(16,185,129,0.7)" stroke="rgba(16,185,129,1)" stroke-width="1.8"
              style="animation:atpSynth 1.2s linear infinite"/>
            <text x="228" y="171" text-anchor="middle" font-size="5" fill="white" font-family="sans-serif">V</text>
          </g>
          <!-- H+ RISING from complexes I-IV into intermembrane space -->
          <!-- Scientifically: complexes I,III,IV pump H+ from matrix → intermembrane space -->
          <!-- Complex I position (rot20 ≈ x172,y162 in screen) -->
          <g style="animation:hplusRise 2.0s 0.0s ease-in infinite">
            <circle cx="176" cy="162" r="5.5" fill="rgba(251,191,36,0.75)" stroke="rgba(251,191,36,0.9)" stroke-width="1"/>
            <text x="176" y="166" text-anchor="middle" font-size="6.5" fill="#fbbf24" font-family="sans-serif">H⁺</text>
          </g>
          <g style="animation:hplusRise 2.0s 0.5s ease-in infinite">
            <circle cx="192" cy="160" r="5.5" fill="rgba(251,191,36,0.7)" stroke="rgba(251,191,36,0.88)" stroke-width="1"/>
            <text x="192" y="164" text-anchor="middle" font-size="6.5" fill="#fbbf24" font-family="sans-serif">H⁺</text>
          </g>
          <!-- Complex III -->
          <g style="animation:hplusRise 2.0s 1.0s ease-in infinite">
            <circle cx="208" cy="158" r="5.5" fill="rgba(251,191,36,0.75)" stroke="rgba(251,191,36,0.9)" stroke-width="1"/>
            <text x="208" y="162" text-anchor="middle" font-size="6.5" fill="#fbbf24" font-family="sans-serif">H⁺</text>
          </g>
          <!-- Complex IV -->
          <g style="animation:hplusRise 2.0s 1.5s ease-in infinite">
            <circle cx="222" cy="156" r="5.5" fill="rgba(251,191,36,0.7)" stroke="rgba(251,191,36,0.88)" stroke-width="1"/>
            <text x="222" y="160" text-anchor="middle" font-size="6.5" fill="#fbbf24" font-family="sans-serif">H⁺</text>
          </g>
          <!-- Accumulated H+ in intermembrane space (static, show buildup = gradient) -->
          <circle cx="180" cy="138" r="5" fill="rgba(251,191,36,0.45)" stroke="rgba(251,191,36,0.7)" stroke-width="1"/>
          <text x="180" y="142" text-anchor="middle" font-size="6" fill="#fbbf24" font-family="sans-serif">H⁺</text>
          <circle cx="196" cy="134" r="5" fill="rgba(251,191,36,0.45)" stroke="rgba(251,191,36,0.7)" stroke-width="1"/>
          <text x="196" y="138" text-anchor="middle" font-size="6" fill="#fbbf24" font-family="sans-serif">H⁺</text>
          <circle cx="212" cy="132" r="5" fill="rgba(251,191,36,0.45)" stroke="rgba(251,191,36,0.7)" stroke-width="1"/>
          <text x="212" y="136" text-anchor="middle" font-size="6" fill="#fbbf24" font-family="sans-serif">H⁺</text>
          <!-- H+ flowing BACK through ATP synthase (Complex V) → chemiosmosis -->
          <!-- Curved arrow from intermembrane space INTO synthase → ATP below -->
          <path d="M228 140 Q232 148 228 155" fill="none" stroke="rgba(251,191,36,0.7)" stroke-width="1.5"
            stroke-dasharray="3 2" marker-end="url(#aWs5)"
            style="animation:synthFlow 1.8s ease-in-out infinite"/>
          <text x="244" y="148" text-anchor="middle" font-size="6.5" fill="rgba(251,191,36,0.7)" font-family="sans-serif">quimio-</text>
          <text x="244" y="157" text-anchor="middle" font-size="6.5" fill="rgba(251,191,36,0.7)" font-family="sans-serif">ósmosis</text>
          <!-- NADH input -->
          <circle cx="260" cy="128" r="12" fill="rgba(96,165,250,0.35)" stroke="rgba(96,165,250,0.85)" stroke-width="1.8"/>
          <text x="260" y="132" text-anchor="middle" font-size="8" fill="rgba(96,165,250,0.95)" font-weight="bold" font-family="sans-serif">NADH</text>
          <line x1="252" y1="134" x2="236" y2="148" stroke="rgba(96,165,250,0.6)" stroke-width="1.8" marker-end="url(#aBs5)"/>
          <!-- O2 input -->
          <circle cx="290" cy="165" r="12" fill="rgba(16,185,129,0.25)" stroke="rgba(16,185,129,0.7)" stroke-width="2"/>
          <text x="290" y="169" text-anchor="middle" font-size="9.5" fill="rgba(16,185,129,1)" font-weight="bold" font-family="sans-serif">O₂</text>
          <text x="290" y="182" text-anchor="middle" font-size="7" fill="rgba(148,163,184,0.7)" font-family="sans-serif">→ H₂O</text>
          <!-- ATP OUTPUT x3 glowing -->
          <circle cx="266" cy="195" r="13" fill="rgba(16,185,129,0.48)" stroke="rgba(16,185,129,0.95)" stroke-width="2.2"
            filter="url(#gws5)" style="animation:atpGlowS5 1.6s ease-in-out infinite"/>
          <text x="266" y="199" text-anchor="middle" font-size="9" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
          <circle cx="248" cy="212" r="11" fill="rgba(16,185,129,0.42)" stroke="rgba(16,185,129,0.85)" stroke-width="2"
            style="animation:atpGlowS5 1.6s 0.4s ease-in-out infinite"/>
          <text x="248" y="216" text-anchor="middle" font-size="8.5" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
          <circle cx="282" cy="212" r="11" fill="rgba(16,185,129,0.42)" stroke="rgba(16,185,129,0.85)" stroke-width="2"
            style="animation:atpGlowS5 1.6s 0.8s ease-in-out infinite"/>
          <text x="282" y="216" text-anchor="middle" font-size="8.5" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
          <!-- Label -->
          <text x="148" y="52" text-anchor="middle" font-size="9.5" fill="rgba(96,165,250,0.9)" font-family="sans-serif" font-weight="bold">CADENA RESPIRATORIA</text>
        `, 'NADH/FADH₂ + O₂  →  H₂O + 28-34 ATP (fosforilación oxidativa)',
        `@keyframes compBlink1{0%,100%{opacity:0.65}50%{opacity:1;filter:drop-shadow(0 0 3px rgba(96,165,250,0.8))}}
         @keyframes atpSynth{0%{transform:rotate(0deg);transform-origin:228px 168px}100%{transform:rotate(360deg)}}
         @keyframes hplusRise{
           0%  {transform:translateY(0);opacity:0}
           15% {opacity:1}
           100%{transform:translateY(-22px);opacity:0}
         }
         @keyframes synthFlow{0%,100%{stroke-dashoffset:0}50%{stroke-dashoffset:-8}}
         @keyframes atpGlowS5{0%,100%{transform:scale(1)}50%{transform:scale(1.1);filter:drop-shadow(0 0 10px rgba(16,185,129,0.8))}}`) },

      // ─── PASO 6: ATP Final ────────────────────────────────────────────
      { title:'🏆 ¡Energía disponible! ~36-38 ATP',
        narration:'¡Resultado final! De una sola molécula de glucosa, la célula fabricó entre <strong>36 y 38 moléculas de ATP</strong>. Con esa energía puede moverse, fabricar proteínas, transportar sustancias, crecer y dividirse. El proceso está completo — ¡la célula tiene combustible!',
        annotations:[
          {text:['🏆 1 glucosa = 36-38 ATP','¡Increíble eficiencia!'],  bx:76, by:148, tx:130, ty:155},
          {text:['💪 Energía para moverse,','crecer y dividirse'],        bx:76, by:180, tx:115, ty:180},
        ],
        info:'<b>Resumen de rendimiento energético:</b> Glucólisis: 2 ATP + 2 NADH (×2.5 ATP-eq) = ~7 ATP-eq. Descarboxilación oxidativa: 2 NADH = ~5 ATP-eq. Ciclo de Krebs (×2): 6 NADH + 2 FADH₂ + 2 ATP = ~22 ATP-eq. Total teórico: ~36-38 ATP. En condiciones reales in vivo el rendimiento es ~30-32 ATP por factores de eficiencia y costos de transporte mitocondrial. La P/O ratio para NADH es ~2.5 y para FADH₂ es ~1.5.',
        svg: (()=>{
          const pts=[[155,75],[175,85],[196,78],[218,92],[238,108],[252,126],
                     [258,148],[252,170],[236,186],[214,196],[190,202],[165,205],
                     [140,202],[116,196],[94,186],[78,170],[70,148],[74,126],
                     [88,108],[108,92],[130,80],[150,70]];
          const atpCircles=pts.map(([x,y],i)=>`
            <circle cx="${x}" cy="${y}" r="${8+(i%3)}" fill="rgba(16,185,129,${0.3+0.14*(i%3)})" stroke="rgba(16,185,129,0.75)" stroke-width="1.5"
              style="animation:atpRing${i%4} ${1.4+0.3*(i%5)}s ${0.05*i}s ease-in-out infinite"/>
            <text x="${x}" y="${y+3}" text-anchor="middle" font-size="6" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
          `).join('');
          return _cell('s6', atpCircles+`
            <!-- Center glow display -->
            <circle cx="160" cy="155" r="42" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.55)" stroke-width="2.5"
              filter="url(#gw2s6)" style="animation:centerPulse 1.8s ease-in-out infinite"/>
            <text x="160" y="147" text-anchor="middle" font-size="16" fill="#34d399" font-weight="900" font-family="sans-serif"
              style="animation:countAppear 0.8s ease-out both">36-38</text>
            <text x="160" y="163" text-anchor="middle" font-size="13" fill="#34d399" font-weight="bold" font-family="sans-serif">ATP</text>
            <text x="160" y="176" text-anchor="middle" font-size="8" fill="rgba(16,185,129,0.7)" font-family="sans-serif">por glucosa</text>
          `, '⚡ Glucólisis ~2 + Krebs 2 + Cadena Resp. ~32-34  =  ~36-38 ATP total',
          `@keyframes atpRing0{0%,100%{opacity:0.75}50%{opacity:1}}
           @keyframes atpRing1{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
           @keyframes atpRing2{0%,100%{opacity:0.65;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
           @keyframes atpRing3{0%,100%{filter:none}50%{filter:drop-shadow(0 0 6px rgba(16,185,129,0.6))}}
           @keyframes centerPulse{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.06);opacity:1}}
           @keyframes countAppear{0%{transform:scale(0.5);opacity:0}80%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}`);
        })()
      },
    ];
  }


  // ══════════════════════════════════════════════
  // ALIMENTACIÓN CELULAR — 7 PASOS
  // ══════════════════════════════════════════════
  function _stepsAlimentacion(){
    return [

      // ─── PASO 0: Vista general ───────────────────────────────────────
      { title:'🍎 La Célula y sus organelos digestivos',
        narration:'La célula no solo produce energía — también <strong>come</strong>. Todo lo que entra (bacterias, proteínas, partículas) debe ser procesado y digerido. Los protagonistas de esta historia son la <strong>membrana</strong>, el <strong>Golgi</strong> y el <strong>lisosoma</strong>.',
        info:'<b>Definición científica:</b> La endocitosis es un proceso activo (requiere ATP) por el cual la membrana plasmática forma una invaginación que engloba material extracelular → vesícula endocítica → endosoma temprano → endosoma tardío/lisosoma. Los lisosomas contienen ~60 hidrolasas ácidas activas a pH 4.5–5. El Golgi empaqueta y dirige estas enzimas mediante el receptor manosa-6-fosfato.',
        annotations:[
          {text:['🧱 Membrana: primera','línea de defensa'],      bx:80,  by:42,  tx:160, ty:32},
          {text:['🏭 Golgi','empaqueta enzimas'],                  bx:270, by:204, tx:218, ty:218},
          {text:['🧫 Lisosoma','fábrica de digestión'],           bx:68,  by:228, tx:128, ty:218},
          {text:['🧬 Núcleo','dirige todo'],                      bx:50,  by:88,  tx:112, ty:96},
        ],
        svg: _cell('a0',`
          <!-- GOLGI HIGHLIGHT -->
          <g opacity="0.9">
            <path d="M195 210 Q218 205 232 215" fill="none" stroke="rgba(245,158,11,0.75)" stroke-width="3.2" stroke-linecap="round" style="animation:golgiPulseA0 1.8s ease-in-out infinite"/>
            <path d="M192 220 Q217 214 233 225" fill="none" stroke="rgba(245,158,11,0.6)" stroke-width="2.6" stroke-linecap="round" style="animation:golgiPulseA0 1.8s 0.2s ease-in-out infinite"/>
            <path d="M194 230 Q216 224 230 233" fill="none" stroke="rgba(245,158,11,0.45)" stroke-width="2" stroke-linecap="round" style="animation:golgiPulseA0 1.8s 0.4s ease-in-out infinite"/>
          </g>
          <!-- LYSOSOME HIGHLIGHT -->
          <circle cx="128" cy="215" r="13" fill="rgba(236,72,153,0.28)" stroke="rgba(236,72,153,0.85)" stroke-width="2.2" style="animation:lysoGlowA0 2s ease-in-out infinite"/>
          <!-- Labels -->
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(16,185,129,0.5)" font-family="sans-serif" font-style="italic">CITOPLASMA</text>
          <text x="122" y="72" text-anchor="middle" font-size="8.5" fill="rgba(167,139,250,0.9)" font-family="sans-serif" font-weight="bold">Núcleo</text>
          <text x="218" y="205" text-anchor="middle" font-size="8" fill="rgba(245,158,11,0.9)" font-family="sans-serif" font-weight="bold">Golgi</text>
          <text x="128" y="234" text-anchor="middle" font-size="8" fill="rgba(236,72,153,0.9)" font-family="sans-serif" font-weight="bold">Lisosoma</text>
          <text x="228" y="148" text-anchor="middle" font-size="7.5" fill="rgba(239,68,68,0.8)" font-family="sans-serif" transform="rotate(20 228 148)">Mitocondria</text>
        `, 'Endocitosis · Lisosoma · Digestión · Exocitosis',
        `@keyframes golgiPulseA0{0%,100%{opacity:0.6}50%{opacity:1;filter:drop-shadow(0 0 6px rgba(245,158,11,0.6))}}
         @keyframes lysoGlowA0{0%,100%{opacity:0.7}50%{opacity:1;filter:drop-shadow(0 0 8px rgba(236,72,153,0.7))}}`) },

      // ─── PASO 1: Reconocimiento ───────────────────────────────────────
      { title:'🔍 Reconocimiento — Receptores en la membrana',
        narration:'Una partícula (bacteria, proteína grande) se acerca a la célula. La membrana tiene proteínas especializadas llamadas <strong>receptores</strong> que la identifican. Es como un sistema de cerradura y llave: el receptor reconoce solo lo que le corresponde.',
        info:'<b>Científico:</b> La endocitosis mediada por receptor (receptor-mediated endocytosis) es el mecanismo más selectivo. Los receptores transmembrana se unen a ligandos específicos → se acumulan en "pozos recubiertos de clatrina" (clathrin-coated pits). La clatrina es una proteína que curva la membrana. En la endocitosis por fagocitosis (para bacterias), participan receptores Fc, receptores del complemento y lectinas.',
        annotations:[
          {text:['🦠 Partícula exterior','se acerca'],            bx:280, by:88,  tx:310, ty:120},
          {text:['🔍 Receptor','en la membrana'],                 bx:244, by:92,  tx:275, ty:126},
          {text:['🎯 Reconocimiento','específico'],               bx:244, by:108, tx:275, ty:140},
        ],
        svg: _cell('a1',`
          <!-- Bacteria/particle outside (approaching) -->
          <g style="animation:bactApproachA1 2.2s ease-in-out infinite alternate">
            <circle cx="310" cy="122" r="13" fill="rgba(16,185,129,0.3)" stroke="rgba(16,185,129,0.9)" stroke-width="2.2"/>
            <!-- Flagella spikes -->
            <line x1="310" y1="109" x2="310" y2="104" stroke="rgba(16,185,129,0.65)" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="319" y1="114" x2="324" y2="111" stroke="rgba(16,185,129,0.65)" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="323" y1="124" x2="328" y2="124" stroke="rgba(16,185,129,0.65)" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="319" y1="130" x2="324" y2="133" stroke="rgba(16,185,129,0.65)" stroke-width="1.5" stroke-linecap="round"/>
            <text x="310" y="126" text-anchor="middle" font-size="8" fill="rgba(16,185,129,1)" font-family="sans-serif" font-weight="bold">B</text>
          </g>
          <!-- Arrow from particle to membrane -->
          <path d="M298 122 L284 128" stroke="rgba(16,185,129,0.85)" stroke-width="2"
            marker-end="url(#aGa1)" fill="none" style="animation:arrowBlinkA1 1.4s ease-in-out infinite"/>
          <!-- Receptor on membrane (right side ~x274,y128) -->
          <rect x="270" y="117" width="10" height="24" rx="5"
            fill="rgba(0,229,255,0.25)" stroke="rgba(0,229,255,0.9)" stroke-width="1.8"
            style="animation:recBlinkA1 1.5s ease-in-out infinite"/>
          <text x="275" y="112" text-anchor="middle" font-size="7" fill="rgba(0,229,255,0.85)" font-family="sans-serif" font-weight="bold">Rec</text>
          <!-- Clatrina dots on membrane inner side -->
          <circle cx="270" cy="140" r="3" fill="rgba(251,191,36,0.7)" style="animation:clatBlink 1.6s ease-in-out infinite"/>
          <circle cx="280" cy="142" r="3" fill="rgba(251,191,36,0.65)" style="animation:clatBlink 1.6s 0.3s ease-in-out infinite"/>
          <circle cx="264" cy="135" r="2.8" fill="rgba(251,191,36,0.6)" style="animation:clatBlink 1.6s 0.6s ease-in-out infinite"/>
          <text x="278" y="152" text-anchor="middle" font-size="7" fill="rgba(251,191,36,0.75)" font-family="sans-serif">Clatrina</text>
        `, 'Receptor-mediated endocytosis: cerradura + llave',
        `@keyframes bactApproachA1{0%{transform:translateX(8px)}100%{transform:translateX(0)}}
         @keyframes arrowBlinkA1{0%,100%{opacity:0.5}50%{opacity:1}}
         @keyframes recBlinkA1{0%,100%{opacity:0.7;filter:none}50%{opacity:1;filter:drop-shadow(0 0 6px rgba(0,229,255,0.8))}}
         @keyframes clatBlink{0%,100%{opacity:0.5}50%{opacity:1}}`) },

      // ─── PASO 2: Endocitosis ──────────────────────────────────────────
      { title:'🌀 Endocitosis — La membrana engulló al intruso',
        narration:'La membrana celular se dobla hacia adentro formando una bolsa alrededor de la partícula. Este proceso consume <strong>ATP</strong> y es ayudado por proteínas como la <strong>clatrina</strong>. La bolsa se cierra completamente y se convierte en una <strong>vesícula endocítica</strong>.',
        info:'<b>Científico:</b> La invaginación mediada por clatrina forma una vesícula recubierta (~100nm). La dinamina (GTPasa) "corta" el cuello de la vesícula separándola de la membrana. Rápidamente la clatrina se disocia (usando Hsc70 + auxilina). La vesícula desnuda fusiona con el endosoma temprano. Otras rutas: macropinocitosis (células inmunes), fagocitosis (partículas >500nm), caveolae.',
        annotations:[
          {text:['🌀 Membrana se invagina','formando una bolsa'],  bx:278, by:92,  tx:282, ty:136},
          {text:['📦 Partícula atrapada','en la vesícula'],        bx:244, by:96,  tx:270, ty:148},
          {text:['🌀 Clatrina','curva la membrana'],               bx:302, by:145, tx:284, ty:155},
        ],
        svg: _cell('a2',`
          <!-- Invagination cup on right membrane -->
          <path d="M286 120 Q305 138 286 156" fill="none" stroke="rgba(0,229,255,0.7)" stroke-width="2.5"
            style="animation:invagA2 2s ease-in-out infinite alternate"/>
          <!-- Cup fill -->
          <path d="M286 120 Q305 138 286 156 Q275 148 275 138 Q275 128 286 120Z"
            fill="rgba(0,229,255,0.08)" stroke="rgba(0,229,255,0.4)" stroke-width="1.2" stroke-dasharray="4 3"/>
          <!-- Particle inside cup -->
          <circle cx="290" cy="138" r="11" fill="rgba(16,185,129,0.35)" stroke="rgba(16,185,129,0.9)" stroke-width="2"
            style="animation:partTrapA2 1.5s ease-in-out infinite"/>
          <text x="290" y="142" text-anchor="middle" font-size="8" fill="rgba(16,185,129,1)" font-family="sans-serif" font-weight="bold">B</text>
          <!-- Clatrin coat dots around cup -->
          <circle cx="281" cy="122" r="3.5" fill="rgba(251,191,36,0.75)" style="animation:clatA2 1.4s ease-in-out infinite"/>
          <circle cx="285" cy="112" r="3.5" fill="rgba(251,191,36,0.7)" style="animation:clatA2 1.4s 0.2s ease-in-out infinite"/>
          <circle cx="296" cy="118" r="3.5" fill="rgba(251,191,36,0.75)" style="animation:clatA2 1.4s 0.4s ease-in-out infinite"/>
          <circle cx="304" cy="128" r="3.5" fill="rgba(251,191,36,0.7)" style="animation:clatA2 1.4s 0.6s ease-in-out infinite"/>
          <circle cx="304" cy="148" r="3.5" fill="rgba(251,191,36,0.75)" style="animation:clatA2 1.4s 0.8s ease-in-out infinite"/>
          <circle cx="296" cy="158" r="3.5" fill="rgba(251,191,36,0.7)" style="animation:clatA2 1.4s 1.0s ease-in-out infinite"/>
          <circle cx="284" cy="155" r="3.5" fill="rgba(251,191,36,0.75)" style="animation:clatA2 1.4s 1.2s ease-in-out infinite"/>
          <text x="314" y="142" text-anchor="middle" font-size="7" fill="rgba(251,191,36,0.8)" font-family="sans-serif">Clatrina</text>
          <!-- ATP consumed label -->
          <text x="236" y="108" text-anchor="middle" font-size="8" fill="rgba(16,185,129,0.75)" font-family="sans-serif" font-weight="bold">-ATP</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(0,229,255,0.45)" font-family="sans-serif" font-style="italic">ENDOCITOSIS</text>
        `, 'La dinamina "pellizca" el cuello · Proceso activo (ATP)',
        `@keyframes invagA2{0%{d:path("M286 124 Q302 138 286 152")}100%{d:path("M286 120 Q306 138 286 156")}}
         @keyframes partTrapA2{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
         @keyframes clatA2{0%,100%{opacity:0.5}50%{opacity:1}}`) },

      // ─── PASO 3: Endosoma ─────────────────────────────────────────────
      { title:'📦 Endosoma Temprano — La vesícula viaja al interior',
        narration:'La vesícula recién formada se desprende de la membrana y viaja hacia el interior de la célula. Se convierte en un <strong>endosoma temprano</strong>. Las bombas de H⁺ empiezan a acidificar su interior (pH baja de 7.4 a 6.0) — preparándose para la digestión.',
        info:'<b>Científico:</b> El endosoma temprano (EE) tiene pH ~6.0-6.5. Las bombas V-ATPasa en la membrana del endosoma bombean H⁺ activamente. El EE clasifica el contenido: proteínas reciclables regresan a la membrana en vesículas de reciclado; el resto avanza al endosoma tardío (LE, pH~5.5). Los endosomas usan proteínas Rab (GTPasas) para el transporte dirigido por los microtúbulos.',
        annotations:[
          {text:['📦 Vesícula endocítica','dentro del citoplasma'], bx:272, by:116, tx:256, ty:140},
          {text:['⚗️ pH bajando','H⁺ entran'],                     bx:290, by:152, tx:264, ty:152},
          {text:['🚚 Microtúbulos guían','el transporte'],          bx:104, by:104, tx:156, ty:130},
        ],
        svg: _cell('a3',`
          <!-- Endosome vesicle traveling inward -->
          <g style="animation:endoMoveA3 3s ease-in-out infinite alternate">
            <circle cx="258" cy="142" r="18" fill="rgba(16,185,129,0.22)" stroke="rgba(16,185,129,0.85)" stroke-width="2.2"
              filter="url(#gwa3)"/>
            <!-- Content inside -->
            <circle cx="258" cy="142" r="10" fill="rgba(16,185,129,0.45)" stroke="rgba(16,185,129,0.7)" stroke-width="1.5"/>
            <text x="258" y="146" text-anchor="middle" font-size="8" fill="rgba(16,185,129,1)" font-family="sans-serif" font-weight="bold">B</text>
            <!-- H+ ions entering -->
            <circle cx="242" cy="132" r="5" fill="rgba(251,191,36,0.7)" stroke="rgba(251,191,36,0.9)" stroke-width="1"
              style="animation:hplusA3 1.5s 0.0s ease-in infinite"/>
            <text x="242" y="136" text-anchor="middle" font-size="6" fill="#fbbf24" font-family="sans-serif">H⁺</text>
            <circle cx="270" cy="130" r="5" fill="rgba(251,191,36,0.65)" stroke="rgba(251,191,36,0.85)" stroke-width="1"
              style="animation:hplusA3 1.5s 0.5s ease-in infinite"/>
            <text x="270" y="134" text-anchor="middle" font-size="6" fill="#fbbf24" font-family="sans-serif">H⁺</text>
          </g>
          <!-- pH indicator -->
          <text x="268" y="168" text-anchor="middle" font-size="9" fill="rgba(251,191,36,0.85)" font-family="sans-serif" font-weight="bold" style="animation:phA3 1.8s ease-in-out infinite">pH 6.0</text>
          <!-- Microtubule track (faint) -->
          <line x1="290" y1="145" x2="200" y2="145" stroke="rgba(167,139,250,0.3)" stroke-width="1.5" stroke-dasharray="6 4"/>
          <line x1="290" y1="145" x2="292" y2="140" stroke="rgba(167,139,250,0.3)" stroke-width="1.5"/>
          <line x1="290" y1="145" x2="292" y2="150" stroke="rgba(167,139,250,0.3)" stroke-width="1.5"/>
          <text x="240" y="138" text-anchor="middle" font-size="7" fill="rgba(167,139,250,0.5)" font-family="sans-serif">Microtúbulo</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(16,185,129,0.5)" font-family="sans-serif" font-style="italic">ENDOSOMA TEMPRANO</text>
        `, 'V-ATPasa acidifica el endosoma · pH baja de 7.4 → 6.0',
        `@keyframes endoMoveA3{0%{transform:translateX(0)}100%{transform:translateX(-14px)}}
         @keyframes hplusA3{0%{opacity:0;transform:scale(0.5)}40%{opacity:1}100%{opacity:0;transform:translateY(-8px)}}
         @keyframes phA3{0%,100%{opacity:0.6}50%{opacity:1}}`) },

      // ─── PASO 4: Golgi fabrica lisosomas ──────────────────────────────
      { title:'🏭 El Golgi empaqueta las enzimas digestivas',
        narration:'El <strong>aparato de Golgi</strong> fabrica y empaqueta ~60 enzimas hidrolíticas en pequeñas vesículas llamadas <strong>lisosomas</strong>. Es como una fábrica que hace "granadas" llenas de sustancias corrosivas, listas para destruir el invasor.',
        info:'<b>Científico:</b> Las hidrolasas ácidas (proteasas, lipasas, nucleasas, glucosidasas, etc.) son sintetizadas en el RE rugoso, modificadas en el Golgi y marcadas con manosa-6-fosfato (M6P). Los receptores M6P en la red trans-Golgi (TGN) capturan estas enzimas → vesículas recubiertas de clatrina → endosoma tardío → lisosoma. En el lisosoma (pH 4.5–5) las enzimas están activas; en el citoplasma neutro serían inactivas e inofensivas.',
        annotations:[
          {text:['🏭 Trans-Golgi empaqueta','enzimas hidrolíticas'], bx:272, by:210, tx:232, ty:218},
          {text:['📦 Vesícula con enzimas','hacia el lisosoma'],     bx:290, by:238, tx:248, ty:228},
          {text:['🔑 Proteínas marcadas','con M6P'],                 bx:128, by:172, tx:204, ty:215},
        ],
        svg: _cell('a4',`
          <!-- GOLGI SUPER HIGHLIGHTED -->
          <g>
            <path d="M195 210 Q218 205 232 215" fill="none" stroke="rgba(245,158,11,0.95)" stroke-width="4" stroke-linecap="round" filter="url(#gw2a4)" style="animation:golgiFlareA4 1.5s ease-in-out infinite"/>
            <path d="M192 220 Q217 214 233 225" fill="none" stroke="rgba(245,158,11,0.8)" stroke-width="3.2" stroke-linecap="round" style="animation:golgiFlareA4 1.5s 0.2s ease-in-out infinite"/>
            <path d="M194 230 Q216 224 230 233" fill="none" stroke="rgba(245,158,11,0.65)" stroke-width="2.6" stroke-linecap="round" style="animation:golgiFlareA4 1.5s 0.4s ease-in-out infinite"/>
          </g>
          <!-- Budding vesicles from Golgi -->
          <circle cx="248" cy="218" r="8" fill="rgba(236,72,153,0.4)" stroke="rgba(236,72,153,0.85)" stroke-width="1.8"
            style="animation:vesiclePopA4 2s 0.3s ease-out infinite"/>
          <text x="248" y="222" text-anchor="middle" font-size="7" fill="rgba(236,72,153,1)" font-family="sans-serif" font-weight="bold">Enz</text>
          <circle cx="244" cy="232" r="7" fill="rgba(236,72,153,0.35)" stroke="rgba(236,72,153,0.75)" stroke-width="1.5"
            style="animation:vesiclePopA4 2s 0.9s ease-out infinite"/>
          <text x="244" y="236" text-anchor="middle" font-size="6.5" fill="rgba(236,72,153,0.95)" font-family="sans-serif" font-weight="bold">Enz</text>
          <!-- Arrow toward lysosome -->
          <path d="M235 228 Q200 228 160 220" stroke="rgba(245,158,11,0.6)" stroke-width="1.5"
            marker-end="url(#aWa4)" fill="none" stroke-dasharray="5 3" style="animation:arrowFlowA4 1.8s linear infinite"/>
          <text x="218" y="205" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.95)" font-family="sans-serif" font-weight="bold">GOLGI</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(245,158,11,0.5)" font-family="sans-serif" font-style="italic">TRANS-GOLGI NETWORK</text>
        `, '~60 hidrolasas ácidas · Marcadas con manosa-6-fosfato',
        `@keyframes golgiFlareA4{0%,100%{opacity:0.7;filter:none}50%{opacity:1;filter:drop-shadow(0 0 8px rgba(245,158,11,0.7))}}
         @keyframes vesiclePopA4{0%{transform:scale(0);opacity:0}30%{transform:scale(1.15);opacity:1}60%{transform:scale(1)}70%,100%{opacity:0;transform:translateX(-8px) translateY(-6px)}}
         @keyframes arrowFlowA4{0%{stroke-dashoffset:20}100%{stroke-dashoffset:0}}`) },

      // ─── PASO 5: Fusión ───────────────────────────────────────────────
      { title:'💥 Fusión — Nace el Fagolisosoma',
        narration:'El endosoma (con el invasor atrapado) se fusiona con el lisosoma (cargado de enzimas). Nace el <strong>fagolisosoma</strong>. El pH cae hasta 4.5 y las enzimas se activan completamente. ¡El proceso de destrucción comienza!',
        info:'<b>Científico:</b> La fusión endosoma-lisosoma está mediada por las proteínas SNARE (v-SNARE en el endosoma, t-SNARE en el lisosoma) y la GTPasa Rab7. El pH del fagolisosoma es 4.5–5.0. Las enzimas actúan en este ambiente ácido: proteasas tipo catepsinas rompen proteínas, lipasas digieren lípidos, nucleasas degradan ADN/ARN. El lisosoma tiene una membrana con LAMP1/LAMP2 que la protege de las propias enzimas.',
        annotations:[
          {text:['💥 Endosoma + Lisosoma','se fusionan'],           bx:100, by:188, tx:154, ty:200},
          {text:['⚗️ pH 4.5 — enzimas','completamente activas'],   bx:186, by:244, tx:156, ty:216},
          {text:['🔗 SNARE y Rab7','median la fusión'],             bx:80,  by:208, tx:136, ty:208},
        ],
        svg: _cell('a5',`
          <!-- Endosome (larger, coming from right) -->
          <circle cx="190" cy="185" r="22" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.75)" stroke-width="2"
            style="animation:endoFuseA5 2s ease-in-out infinite alternate"/>
          <circle cx="190" cy="185" r="12" fill="rgba(16,185,129,0.4)" stroke="rgba(16,185,129,0.6)" stroke-width="1.5"/>
          <text x="190" y="189" text-anchor="middle" font-size="8" fill="rgba(16,185,129,1)" font-family="sans-serif" font-weight="bold">B</text>
          <!-- Lysosome (left, coming to merge) -->
          <circle cx="142" cy="200" r="16" fill="rgba(236,72,153,0.25)" stroke="rgba(236,72,153,0.85)" stroke-width="2.2"
            style="animation:lysoFuseA5 2s ease-in-out infinite alternate"/>
          <text x="142" y="204" text-anchor="middle" font-size="8" fill="rgba(236,72,153,0.95)" font-family="sans-serif" font-weight="bold">Enz</text>
          <!-- Merging arrow -->
          <path d="M158 198 L174 192" stroke="rgba(251,191,36,0.9)" stroke-width="2.5" marker-end="url(#aWa5)" fill="none"/>
          <!-- Phagolysosome forming (center) -->
          <circle cx="168" cy="220" r="20" fill="rgba(155,20,90,0.22)" stroke="rgba(236,72,153,0.9)" stroke-width="2.5"
            filter="url(#gwa5)" style="animation:phagosomeA5 1.5s ease-in-out infinite"/>
          <text x="168" y="218" text-anchor="middle" font-size="7.5" fill="rgba(236,72,153,1)" font-family="sans-serif" font-weight="bold">Fago-</text>
          <text x="168" y="230" text-anchor="middle" font-size="7.5" fill="rgba(236,72,153,1)" font-family="sans-serif" font-weight="bold">lisosoma</text>
          <!-- pH dropping label -->
          <text x="168" y="248" text-anchor="middle" font-size="9" fill="rgba(251,191,36,0.9)" font-family="sans-serif" font-weight="bold" style="animation:phA5 1.5s ease-in-out infinite">pH 4.5</text>
        `, 'Proteínas SNARE median la fusión · Catepsinas activadas',
        `@keyframes endoFuseA5{0%{transform:translateX(6px)}100%{transform:translateX(0)}}
         @keyframes lysoFuseA5{0%{transform:translateX(-5px)}100%{transform:translateX(0)}}
         @keyframes phagosomeA5{0%,100%{opacity:0.8;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
         @keyframes phA5{0%,100%{opacity:0.6}50%{opacity:1}}`) },

      // ─── PASO 6: Digestión y Exocitosis ──────────────────────────────
      { title:'✅ Digestión y Exocitosis — Misión cumplida',
        narration:'Las enzimas rompen el invasor en sus partes más pequeñas: <strong>aminoácidos</strong>, <strong>ácidos grasos</strong>, <strong>azúcares</strong>. La célula reutiliza estos nutrientes. Los residuos que no sirven son expulsados al exterior a través de la membrana en un proceso llamado <strong>exocitosis</strong>.',
        info:'<b>Científico:</b> Los productos de la digestión lisosomal (aminoácidos, nucleósidos, glucosa, ácidos grasos) salen por transportadores específicos en la membrana lisosomal (ej: LYAAT, SLC38A7 para aminoácidos) y son reutilizados por la célula. Los residuos no digeribles forman el "cuerpo residual" que se expulsa por exocitosis. En células especiales (osteoclastos) la exocitosis lisosomal es esencial para la función celular (resorción ósea).',
        annotations:[
          {text:['✅ Nutrientes','liberados al citoplasma'],       bx:218, by:186, tx:182, ty:210},
          {text:['📤 Residuos expulsados','por exocitosis'],        bx:68,  by:140, tx:32,  ty:158},
          {text:['♻️ Aminoácidos, glucosa','reutilizados'],         bx:224, by:160, tx:196, ty:188},
        ],
        svg: _cell('a6',`
          <!-- Digested products floating from lysosome area -->
          <g style="animation:nutrientFloatA6 2.5s 0.0s ease-out infinite">
            <circle cx="178" cy="202" r="8" fill="rgba(16,185,129,0.4)" stroke="rgba(16,185,129,0.8)" stroke-width="1.5"/>
            <text x="178" y="206" text-anchor="middle" font-size="6.5" fill="#34d399" font-family="sans-serif" font-weight="bold">AA</text>
          </g>
          <g style="animation:nutrientFloatA6 2.5s 0.6s ease-out infinite">
            <circle cx="200" cy="195" r="8" fill="rgba(245,158,11,0.4)" stroke="rgba(245,158,11,0.8)" stroke-width="1.5"/>
            <text x="200" y="199" text-anchor="middle" font-size="6.5" fill="#fbbf24" font-family="sans-serif" font-weight="bold">Glc</text>
          </g>
          <g style="animation:nutrientFloatA6 2.5s 1.2s ease-out infinite">
            <circle cx="160" cy="205" r="8" fill="rgba(96,165,250,0.4)" stroke="rgba(96,165,250,0.8)" stroke-width="1.5"/>
            <text x="160" y="209" text-anchor="middle" font-size="6.5" fill="#60a5fa" font-family="sans-serif" font-weight="bold">AG</text>
          </g>
          <!-- Lysosome residual body (faded) -->
          <circle cx="148" cy="210" r="12" fill="rgba(100,100,100,0.18)" stroke="rgba(150,150,150,0.55)" stroke-width="1.8" stroke-dasharray="4 3"/>
          <text x="148" y="214" text-anchor="middle" font-size="7" fill="rgba(150,150,150,0.8)" font-family="sans-serif">Res.</text>
          <!-- Exocytosis vesicle at left membrane -->
          <g style="animation:exoVesA6 2.5s ease-in-out infinite">
            <circle cx="36" cy="160" r="12" fill="rgba(150,150,150,0.2)" stroke="rgba(150,150,150,0.65)" stroke-width="1.8"/>
            <text x="36" y="164" text-anchor="middle" font-size="7" fill="rgba(180,180,180,0.9)" font-family="sans-serif">Res.</text>
          </g>
          <!-- Exo arrow going out -->
          <path d="M22 160 L10 160" stroke="rgba(150,150,150,0.8)" stroke-width="2"
            marker-end="url(#aGa6)" fill="none" style="animation:exoArrowA6 1.5s ease-in-out infinite"/>
          <text x="22" y="148" text-anchor="middle" font-size="7.5" fill="rgba(150,150,150,0.75)" font-family="sans-serif">Exo-</text>
          <text x="22" y="158" text-anchor="middle" font-size="7.5" fill="rgba(150,150,150,0.75)" font-family="sans-serif">citosis</text>
          <!-- Nutrient labels -->
          <text x="188" y="178" text-anchor="middle" font-size="7" fill="rgba(16,185,129,0.75)" font-family="sans-serif">AA=aminoácidos</text>
          <text x="192" y="188" text-anchor="middle" font-size="7" fill="rgba(245,158,11,0.7)" font-family="sans-serif">Glc=glucosa · AG=ác.grasos</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(16,185,129,0.5)" font-family="sans-serif" font-style="italic">DIGESTIÓN LISOSOMAL</text>
        `, 'Digestión completa · Nutrientes reciclados · Residuos expulsados',
        `@keyframes nutrientFloatA6{0%{transform:translateY(0);opacity:0.9}100%{transform:translateY(-20px);opacity:0}}
         @keyframes exoVesA6{0%,100%{transform:translateX(0)}50%{transform:translateX(-4px)}}
         @keyframes exoArrowA6{0%,100%{opacity:0.5}50%{opacity:1}}`) },

    ];
  }


  // ══════════════════════════════════════════════
  // REPRODUCCIÓN CELULAR (MITOSIS) — 7 PASOS
  // ══════════════════════════════════════════════
  function _stepsReproduccion(){
    return [

      // ─── PASO 0: Vista general ───────────────────────────────────────
      { title:'🔁 La Célula lista para dividirse',
        narration:'La célula más simple tiene un poder extraordinario: puede <strong>copiarse a sí misma</strong> con perfecta fidelidad. La mitosis es el proceso por el cual una célula madre se divide en dos células hijas idénticas. Todo comienza en el núcleo.',
        info:'<b>Definición científica:</b> La mitosis es la división del núcleo celular en células eucariotas, produciendo dos núcleos hijos con el mismo número cromosómico que la célula madre (división equacional). Junto con la citocinesis (división del citoplasma) forma la división celular somática. El ciclo celular tiene 4 fases: G1 (crecimiento), S (síntesis de ADN), G2 (preparación) y M (mitosis). La mitosis propiamente dicha tiene 4 etapas: profase, metafase, anafase y telofase.',
        annotations:[
          {text:['🧬 Núcleo','contiene el ADN'],                   bx:50,  by:88,  tx:112, ty:96},
          {text:['🕸️ Centrosoma','organiza el huso'],               bx:80,  by:54,  tx:154, ty:68},
          {text:['📐 Cromosomas','información genética'],           bx:62,  by:128, tx:118, ty:108},
          {text:['✂️ Membrana celular','se divide al final'],       bx:280, by:52,  tx:224, ty:40},
        ],
        svg: _cell('r0',`
          <!-- Chromatin in nucleus (relaxed, interfase) -->
          <g style="animation:chromatinR0 3s ease-in-out infinite">
            <path d="M104 100 Q112 92 122 100 Q130 108 140 100 Q148 92 154 100"
              fill="none" stroke="rgba(167,139,250,0.65)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M100 112 Q110 104 122 112 Q134 120 144 112"
              fill="none" stroke="rgba(167,139,250,0.55)" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M106 120 Q116 114 128 120 Q138 126 148 120"
              fill="none" stroke="rgba(167,139,250,0.5)" stroke-width="2" stroke-linecap="round"/>
          </g>
          <!-- Centrosome highlight -->
          <circle cx="164" cy="72" r="8" fill="rgba(0,229,255,0.2)" stroke="rgba(0,229,255,0.7)" stroke-width="1.8"
            style="animation:centroGlowR0 2s ease-in-out infinite"/>
          <circle cx="162" cy="70" r="3" fill="rgba(0,229,255,0.8)"/>
          <!-- Labels -->
          <text x="122" y="69" text-anchor="middle" font-size="8" fill="rgba(167,139,250,0.85)" font-family="sans-serif" font-weight="bold">Núcleo</text>
          <text x="182" y="65" text-anchor="middle" font-size="7.5" fill="rgba(0,229,255,0.8)" font-family="sans-serif">Centrosoma</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(124,58,237,0.5)" font-family="sans-serif" font-style="italic">INTERFASE — listo para dividirse</text>
        `, 'Célula diploide (2n): 46 cromosomas en humanos',
        `@keyframes chromatinR0{0%,100%{opacity:0.65}50%{opacity:1}}
         @keyframes centroGlowR0{0%,100%{filter:none}50%{filter:drop-shadow(0 0 7px rgba(0,229,255,0.8))}}`) },

      // ─── PASO 1: Síntesis de ADN ──────────────────────────────────────
      { title:'🧬 Fase S — Replicación del ADN',
        narration:'Antes de dividirse, la célula duplica todo su ADN. Cada cromosoma se copia con una precisión extraordinaria: 1 error por cada 1.000 millones de bases copiadas. Al terminar, la célula tiene el <strong>doble de material genético</strong> — listo para repartirse entre las dos células hijas.',
        info:'<b>Científico:</b> La replicación del ADN ocurre en la fase S del ciclo celular. Es semiconservativa: cada hebra parental sirve de molde para la nueva hebra. La ADN polimerasa copia con una tasa de error de ~10⁻⁹ (y los sistemas de reparación la bajan a ~10⁻¹⁰). En humanos, se activan ~30.000-50.000 orígenes de replicación. Duración: 6-8 horas. Al terminar, cada cromosoma consiste de 2 cromátidas hermanas unidas por el centrómero.',
        annotations:[
          {text:['🧬 Horquilla de','replicación activa'],           bx:64,  by:102, tx:110, ty:108},
          {text:['🧬 Hebra molde','(parental)'],                    bx:180, by:82,  tx:144, ty:102},
          {text:['✨ Nueva hebra','sintetizada'],                   bx:178, by:126, tx:148, ty:118},
          {text:['✅ ADN×2','listo al final'],                     bx:60,  by:130, tx:106, ty:126},
        ],
        svg: _cell('r1',`
          <!-- DNA double helix visualized as two strands in nucleus -->
          <!-- Old strand (template) -->
          <path d="M102 88 Q112 96 108 108 Q104 120 114 128 Q124 136 120 148"
            fill="none" stroke="rgba(167,139,250,0.8)" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M142 88 Q132 96 136 108 Q140 120 130 128 Q120 136 124 148"
            fill="none" stroke="rgba(167,139,250,0.75)" stroke-width="2.8" stroke-linecap="round"/>
          <!-- Rungs of helix -->
          <line x1="102" y1="88" x2="142" y2="88" stroke="rgba(167,139,250,0.35)" stroke-width="1.2"/>
          <line x1="108" y1="100" x2="136" y2="100" stroke="rgba(167,139,250,0.3)" stroke-width="1.2"/>
          <line x1="108" y1="112" x2="136" y2="112" stroke="rgba(167,139,250,0.3)" stroke-width="1.2"/>
          <line x1="114" y1="124" x2="130" y2="124" stroke="rgba(167,139,250,0.3)" stroke-width="1.2"/>
          <line x1="118" y1="136" x2="126" y2="136" stroke="rgba(167,139,250,0.25)" stroke-width="1.2"/>
          <!-- Replication fork — new strands growing -->
          <path d="M122 118 Q130 122 124 132 Q118 142 128 148"
            fill="none" stroke="rgba(0,229,255,0.85)" stroke-width="2.2" stroke-linecap="round"
            style="animation:newStrandGrowR1 2s ease-out both"/>
          <path d="M122 118 Q114 122 120 132 Q126 142 116 148"
            fill="none" stroke="rgba(0,229,255,0.8)" stroke-width="2.2" stroke-linecap="round"
            style="animation:newStrandGrowR1 2s 0.4s ease-out both"/>
          <!-- Polymerase dot at fork -->
          <circle cx="122" cy="118" r="6" fill="rgba(16,185,129,0.7)" stroke="rgba(16,185,129,1)" stroke-width="1.5"
            style="animation:polGlowR1 1.4s ease-in-out infinite"/>
          <text x="122" y="122" text-anchor="middle" font-size="6" fill="white" font-family="sans-serif" font-weight="bold">Pol</text>
          <!-- ADN x2 label -->
          <text x="160" y="52" text-anchor="middle" font-size="9.5" fill="rgba(0,229,255,0.7)" font-family="sans-serif" font-weight="bold">ADN → ADN × 2</text>
        `, '1 cromosoma → 2 cromátidas hermanas unidas en el centrómero',
        `@keyframes newStrandGrowR1{0%{stroke-dasharray:0 60;opacity:0}100%{stroke-dasharray:60 0;opacity:1}}
         @keyframes polGlowR1{0%,100%{filter:none}50%{filter:drop-shadow(0 0 8px rgba(16,185,129,0.9))}}`) },

      // ─── PASO 2: Profase ──────────────────────────────────────────────
      { title:'🌀 Profase — Los cromosomas se condensan',
        narration:'La cromatina se <strong>condensa</strong> transformándose en cromosomas visibles. La envoltura nuclear comienza a desaparecer. Los dos centrosomas migran a polos opuestos y empiezan a formar el <strong>huso mitótico</strong>, la maquinaria que separará los cromosomas.',
        info:'<b>Científico:</b> La condensación cromosómica implica el enrollamiento de la cromatina por las condensinas I y II. Cada cromosoma consiste ahora de 2 cromátidas hermanas unidas por cohesinas en el centrómero. La envoltura nuclear se fragmenta mediada por fosforilación de laminas nucleares (por Cdk1). Los centrosomas nuclean microtúbulos (α+β tubulina) formando astros. Los microtúbulos del huso capturan cinetocoros (proteínas especializadas en el centrómero).',
        annotations:[
          {text:['🌀 Cromosomas','condensados (visibles)'],         bx:54,  by:110, tx:114, ty:108},
          {text:['💥 Envoltura nuclear','fragmentándose'],           bx:54,  by:86,  tx:106, ty:90},
          {text:['🕸️ Centrosoma','en el polo norte'],               bx:66,  by:56,  tx:160, ty:70},
          {text:['🕸️ Huso mitótico','comenzando'],                  bx:268, by:80,  tx:200, ty:104},
        ],
        svg: _cell('r2',`
          <!-- Nuclear envelope fragmenting (dashed, partial) -->
          <ellipse cx="122" cy="108" rx="36" ry="30"
            fill="none" stroke="rgba(167,139,250,0.35)" stroke-width="1.5" stroke-dasharray="5 4"
            style="animation:nucBreakR2 2s ease-in-out infinite"/>
          <!-- Condensed chromosomes (4 pairs, simplified as X shapes) -->
          <!-- Chr 1 -->
          <g transform="translate(108,104)" style="animation:chrCondenseR2 0.8s ease-out both">
            <rect x="-5" y="-10" width="4" height="20" rx="2" fill="rgba(167,139,250,0.9)"/>
            <rect x="1" y="-10" width="4" height="20" rx="2" fill="rgba(167,139,250,0.9)"/>
            <rect x="-6" y="-2" width="12" height="4" rx="2" fill="rgba(200,180,255,0.85)"/>
          </g>
          <!-- Chr 2 -->
          <g transform="translate(124,98)" style="animation:chrCondenseR2 0.8s 0.15s ease-out both">
            <rect x="-5" y="-9" width="4" height="18" rx="2" fill="rgba(139,92,246,0.88)"/>
            <rect x="1" y="-9" width="4" height="18" rx="2" fill="rgba(139,92,246,0.88)"/>
            <rect x="-6" y="-2" width="12" height="4" rx="2" fill="rgba(196,181,253,0.8)"/>
          </g>
          <!-- Chr 3 -->
          <g transform="translate(138,106)" style="animation:chrCondenseR2 0.8s 0.3s ease-out both">
            <rect x="-5" y="-10" width="4" height="20" rx="2" fill="rgba(167,139,250,0.9)"/>
            <rect x="1" y="-10" width="4" height="20" rx="2" fill="rgba(167,139,250,0.9)"/>
            <rect x="-6" y="-2" width="12" height="4" rx="2" fill="rgba(200,180,255,0.85)"/>
          </g>
          <!-- Chr 4 -->
          <g transform="translate(118,118)" style="animation:chrCondenseR2 0.8s 0.45s ease-out both">
            <rect x="-5" y="-9" width="4" height="18" rx="2" fill="rgba(124,58,237,0.88)"/>
            <rect x="1" y="-9" width="4" height="18" rx="2" fill="rgba(124,58,237,0.88)"/>
            <rect x="-6" y="-2" width="12" height="4" rx="2" fill="rgba(167,139,250,0.8)"/>
          </g>
          <!-- Centrosome North -->
          <circle cx="160" cy="70" r="7" fill="rgba(0,229,255,0.3)" stroke="rgba(0,229,255,0.9)" stroke-width="1.8"
            style="animation:centroGlowR2 1.5s ease-in-out infinite"/>
          <circle cx="160" cy="70" r="2.5" fill="rgba(0,229,255,0.9)"/>
          <!-- Centrosome South -->
          <circle cx="160" cy="246" r="7" fill="rgba(0,229,255,0.3)" stroke="rgba(0,229,255,0.9)" stroke-width="1.8"
            style="animation:centroGlowR2 1.5s 0.5s ease-in-out infinite"/>
          <circle cx="160" cy="246" r="2.5" fill="rgba(0,229,255,0.9)"/>
          <!-- Early spindle fibers (few lines) -->
          <line x1="160" y1="77" x2="148" y2="106" stroke="rgba(0,229,255,0.2)" stroke-width="1.2" stroke-dasharray="4 3"/>
          <line x1="160" y1="77" x2="160" y2="100" stroke="rgba(0,229,255,0.22)" stroke-width="1.2" stroke-dasharray="4 3"/>
          <line x1="160" y1="77" x2="172" y2="106" stroke="rgba(0,229,255,0.2)" stroke-width="1.2" stroke-dasharray="4 3"/>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(124,58,237,0.6)" font-family="sans-serif" font-style="italic">PROFASE</text>
        `, 'Condensinas compactan la cromatina · Laminas nucleares fosforiladas',
        `@keyframes nucBreakR2{0%,100%{stroke-dashoffset:0}50%{stroke-dashoffset:10;opacity:0.4}}
         @keyframes chrCondenseR2{0%{transform:scale(0);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
         @keyframes centroGlowR2{0%,100%{filter:none}50%{filter:drop-shadow(0 0 8px rgba(0,229,255,0.8))}}`) },

      // ─── PASO 3: Metafase ─────────────────────────────────────────────
      { title:'📐 Metafase — Los cromosomas se alinean',
        narration:'Los cromosomas migran al centro exacto de la célula y se alinean en la llamada <strong>placa ecuatorial</strong>. El huso mitótico está completamente formado: microtúbulos de ambos polos se unen a los <strong>cinetocoros</strong> de cada cromosoma. Es el punto de mayor control de calidad.',
        info:'<b>Científico:</b> Los cinetocoros son estructuras proteicas en los centrómeros que capturan los microtúbulos del huso. Cada cromosoma debe tener un cinetocoro unido a cada polo (anfiorientation bivalente). El punto de control de montaje del huso (SAC/Spindle Assembly Checkpoint) verifica que todos los cinetocoros estén bajo tensión. Una sola unión incorrecta detiene la célula en metafase. La proteína MAD2 bloquea el complejo promotor de anafase (APC/C) hasta que todo esté correcto.',
        annotations:[
          {text:['📐 Placa ecuatorial','cromosomas alineados'],     bx:160, by:240, tx:160, ty:160},
          {text:['🕸️ Huso mitótico','completo'],                    bx:256, by:106, tx:192, ty:136},
          {text:['🔗 Cinetocoro','unido al microtúbulo'],           bx:54,  by:148, tx:130, ty:155},
          {text:['✅ Control SAC','verifica tensión'],              bx:256, by:56,  tx:208, ty:80},
        ],
        svg: _cell('r3',`
          <!-- Spindle fibers — from north pole to chromosomes -->
          <!-- Left fibers (to chr 1,2) -->
          <line x1="160" y1="72" x2="124" y2="155" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <line x1="160" y1="72" x2="140" y2="155" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <line x1="160" y1="72" x2="156" y2="155" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <line x1="160" y1="72" x2="172" y2="155" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <line x1="160" y1="72" x2="188" y2="155" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <line x1="160" y1="72" x2="204" y2="155" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <!-- Spindle fibers — from south pole to chromosomes -->
          <line x1="160" y1="244" x2="124" y2="163" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <line x1="160" y1="244" x2="140" y2="163" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <line x1="160" y1="244" x2="156" y2="163" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <line x1="160" y1="244" x2="172" y2="163" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <line x1="160" y1="244" x2="188" y2="163" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <line x1="160" y1="244" x2="204" y2="163" stroke="rgba(0,229,255,0.28)" stroke-width="1.3"/>
          <!-- Centrosome North (bright) -->
          <circle cx="160" cy="72" r="8" fill="rgba(0,229,255,0.3)" stroke="rgba(0,229,255,0.95)" stroke-width="2"
            style="animation:centroR3 1.8s ease-in-out infinite"/>
          <circle cx="160" cy="72" r="3" fill="rgba(0,229,255,0.95)"/>
          <!-- Centrosome South (bright) -->
          <circle cx="160" cy="244" r="8" fill="rgba(0,229,255,0.3)" stroke="rgba(0,229,255,0.95)" stroke-width="2"
            style="animation:centroR3 1.8s 0.5s ease-in-out infinite"/>
          <circle cx="160" cy="244" r="3" fill="rgba(0,229,255,0.95)"/>
          <!-- Chromosomes on equatorial plate (3 pairs for clarity) -->
          <!-- Chr A -->
          <g transform="translate(124,158)" style="animation:chrMetaR3 0.5s ease-out both">
            <rect x="-5" y="-11" width="4" height="22" rx="2" fill="rgba(167,139,250,0.95)"/>
            <rect x="1" y="-11" width="4" height="22" rx="2" fill="rgba(167,139,250,0.95)"/>
            <rect x="-6" y="-2.5" width="12" height="5" rx="2.5" fill="rgba(209,196,255,0.9)"/>
          </g>
          <!-- Chr B -->
          <g transform="translate(148,158)" style="animation:chrMetaR3 0.5s 0.1s ease-out both">
            <rect x="-4" y="-10" width="4" height="20" rx="2" fill="rgba(139,92,246,0.95)"/>
            <rect x="0" y="-10" width="4" height="20" rx="2" fill="rgba(139,92,246,0.95)"/>
            <rect x="-5" y="-2" width="10" height="4" rx="2" fill="rgba(196,181,253,0.9)"/>
          </g>
          <!-- Chr C (center) -->
          <g transform="translate(164,158)" style="animation:chrMetaR3 0.5s 0.2s ease-out both">
            <rect x="-5" y="-12" width="4" height="24" rx="2" fill="rgba(124,58,237,0.95)"/>
            <rect x="1" y="-12" width="4" height="24" rx="2" fill="rgba(124,58,237,0.95)"/>
            <rect x="-6" y="-2.5" width="12" height="5" rx="2.5" fill="rgba(167,139,250,0.9)"/>
          </g>
          <!-- Chr D -->
          <g transform="translate(180,158)" style="animation:chrMetaR3 0.5s 0.3s ease-out both">
            <rect x="-4" y="-10" width="4" height="20" rx="2" fill="rgba(167,139,250,0.9)"/>
            <rect x="0" y="-10" width="4" height="20" rx="2" fill="rgba(167,139,250,0.9)"/>
            <rect x="-5" y="-2" width="10" height="4" rx="2" fill="rgba(209,196,255,0.85)"/>
          </g>
          <!-- Chr E -->
          <g transform="translate(196,158)" style="animation:chrMetaR3 0.5s 0.4s ease-out both">
            <rect x="-4" y="-9" width="4" height="18" rx="2" fill="rgba(139,92,246,0.9)"/>
            <rect x="0" y="-9" width="4" height="18" rx="2" fill="rgba(139,92,246,0.9)"/>
            <rect x="-5" y="-2" width="10" height="4" rx="2" fill="rgba(196,181,253,0.85)"/>
          </g>
          <!-- Equatorial plate line -->
          <line x1="64" y1="158" x2="256" y2="158" stroke="rgba(124,58,237,0.25)" stroke-width="1" stroke-dasharray="6 4"/>
          <text x="64" y="152" text-anchor="start" font-size="7" fill="rgba(124,58,237,0.6)" font-family="sans-serif">Placa ecuatorial</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(124,58,237,0.7)" font-family="sans-serif" font-style="italic">METAFASE</text>
        `, 'Checkpoint SAC: todos los cinetocoros deben estar bajo tensión',
        `@keyframes centroR3{0%,100%{filter:none}50%{filter:drop-shadow(0 0 10px rgba(0,229,255,0.85))}}
         @keyframes chrMetaR3{0%{transform:translateY(-8px);opacity:0}100%{transform:translateY(0);opacity:1}}`) },

      // ─── PASO 4: Anafase ──────────────────────────────────────────────
      { title:'↔️ Anafase — ¡Las cromátidas se separan!',
        narration:'Las <strong>cohesinas</strong> que unían las cromátidas hermanas se cortan súbitamente. Cada cromátida se convierte en un cromosoma independiente. El huso se contrae, arrastrando las cromátidas hacia polos opuestos. La célula comienza a <strong>elongarse</strong>.',
        info:'<b>Científico:</b> La separina (proteasa) corta la cohesina en la anafase A, liberando las cromátidas. Esto ocurre cuando la APC/C (complejo promotor de anafase) ubiquitina la securina (inhibidor de separina). Los microtúbulos cinetocóricos se despolimerizan tirando los cromosomas hacia los polos. La anafase B involve el deslizamiento de microtúbulos interpolares (motores kinesina-5/Eg5), elongando el huso. Velocidad: ~1 µm/min.',
        annotations:[
          {text:['↔️ Cromátidas','separadas por separina'],        bx:160, by:72,  tx:164, ty:152},
          {text:['⬆️ Polo Norte','cromosomas llegando'],            bx:52,  by:104, tx:140, ty:102},
          {text:['⬇️ Polo Sur','cromosomas llegando'],              bx:52,  by:214, tx:136, ty:208},
          {text:['↕️ Célula elongándose','↕ huso crece'],           bx:280, by:160, tx:232, ty:158},
        ],
        svg: _cell('r4',`
          <!-- Spindle (elongated) -->
          <!-- North fibers -->
          <line x1="160" y1="66" x2="138" y2="100" stroke="rgba(0,229,255,0.22)" stroke-width="1.2"/>
          <line x1="160" y1="66" x2="152" y2="100" stroke="rgba(0,229,255,0.22)" stroke-width="1.2"/>
          <line x1="160" y1="66" x2="168" y2="100" stroke="rgba(0,229,255,0.22)" stroke-width="1.2"/>
          <line x1="160" y1="66" x2="182" y2="100" stroke="rgba(0,229,255,0.22)" stroke-width="1.2"/>
          <!-- South fibers -->
          <line x1="160" y1="250" x2="138" y2="216" stroke="rgba(0,229,255,0.22)" stroke-width="1.2"/>
          <line x1="160" y1="250" x2="152" y2="216" stroke="rgba(0,229,255,0.22)" stroke-width="1.2"/>
          <line x1="160" y1="250" x2="168" y2="216" stroke="rgba(0,229,255,0.22)" stroke-width="1.2"/>
          <line x1="160" y1="250" x2="182" y2="216" stroke="rgba(0,229,255,0.22)" stroke-width="1.2"/>
          <!-- NORTH CHROMATIDS (moving up, purple) -->
          <g style="animation:chrNorthR4 2.5s ease-in-out infinite alternate">
            <g transform="translate(138,100)"><rect x="-4" y="-9" width="4" height="18" rx="2" fill="rgba(167,139,250,0.95)"/><rect x="-9" y="-2" width="9" height="4" rx="2" fill="rgba(209,196,255,0.9)"/></g>
            <g transform="translate(152,98)"><rect x="-4" y="-8" width="4" height="16" rx="2" fill="rgba(139,92,246,0.95)"/><rect x="-8" y="-2" width="8" height="4" rx="2" fill="rgba(196,181,253,0.9)"/></g>
            <g transform="translate(168,100)"><rect x="-4" y="-9" width="4" height="18" rx="2" fill="rgba(124,58,237,0.9)"/><rect x="-8" y="-2" width="8" height="4" rx="2" fill="rgba(167,139,250,0.85)"/></g>
            <g transform="translate(182,98)"><rect x="-4" y="-8" width="4" height="16" rx="2" fill="rgba(167,139,250,0.9)"/><rect x="-8" y="-2" width="8" height="4" rx="2" fill="rgba(209,196,255,0.85)"/></g>
          </g>
          <!-- SOUTH CHROMATIDS (moving down, violet) -->
          <g style="animation:chrSouthR4 2.5s ease-in-out infinite alternate">
            <g transform="translate(138,216)"><rect x="-4" y="-9" width="4" height="18" rx="2" fill="rgba(167,139,250,0.95)"/><rect x="-9" y="-2" width="9" height="4" rx="2" fill="rgba(209,196,255,0.9)"/></g>
            <g transform="translate(152,218)"><rect x="-4" y="-8" width="4" height="16" rx="2" fill="rgba(139,92,246,0.95)"/><rect x="-8" y="-2" width="8" height="4" rx="2" fill="rgba(196,181,253,0.9)"/></g>
            <g transform="translate(168,216)"><rect x="-4" y="-9" width="4" height="18" rx="2" fill="rgba(124,58,237,0.9)"/><rect x="-8" y="-2" width="8" height="4" rx="2" fill="rgba(167,139,250,0.85)"/></g>
            <g transform="translate(182,218)"><rect x="-4" y="-8" width="4" height="16" rx="2" fill="rgba(167,139,250,0.9)"/><rect x="-8" y="-2" width="8" height="4" rx="2" fill="rgba(209,196,255,0.85)"/></g>
          </g>
          <!-- Centrosomes -->
          <circle cx="160" cy="66" r="6" fill="rgba(0,229,255,0.35)" stroke="rgba(0,229,255,1)" stroke-width="1.8"/>
          <circle cx="160" cy="66" r="2.5" fill="rgba(0,229,255,1)"/>
          <circle cx="160" cy="250" r="6" fill="rgba(0,229,255,0.35)" stroke="rgba(0,229,255,1)" stroke-width="1.8"/>
          <circle cx="160" cy="250" r="2.5" fill="rgba(0,229,255,1)"/>
          <!-- Empty midzone label -->
          <text x="220" y="161" text-anchor="start" font-size="7" fill="rgba(124,58,237,0.5)" font-family="sans-serif">↔ zona media</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(124,58,237,0.7)" font-family="sans-serif" font-style="italic">ANAFASE</text>
        `, 'Separina corta cohesinas · Microtúbulos se despolimerizan → tiran cromátidas',
        `@keyframes chrNorthR4{0%{transform:translateY(0)}100%{transform:translateY(-6px)}}
         @keyframes chrSouthR4{0%{transform:translateY(0)}100%{transform:translateY(6px)}}`) },

      // ─── PASO 5: Telofase ─────────────────────────────────────────────
      { title:'🔮 Telofase — Dos nuevos núcleos',
        narration:'Los cromosomas llegaron a los polos. La envoltura nuclear se <strong>reconstituye</strong> alrededor de cada grupo, formando dos nuevos núcleos. Los cromosomas se <strong>descondensan</strong> volviendo a ser cromatina. En el ecuador, empieza a formarse el <strong>surco de división</strong>.',
        info:'<b>Científico:</b> La telofase es el reverso de la profase: las laminas nucleares A y B se re-ensamblan alrededor de los cromosomas, el RE se extiende para formar la nueva envoltura. Los cromosomas se descondensan por la defosforilación de condensinas. En el plano ecuatorial aparece el cuerpo medio (midzone) con microtúbulos antiparalelos y proteínas como PRC1, que nucleará el anillo contráctil de actomiosina. La citocinesis comienza aún antes de que termine la telofase.',
        annotations:[
          {text:['🔮 Nuevos núcleos','formándose'],                 bx:54,  by:88,  tx:140, ty:100},
          {text:['🧬 Cromosomas','descondensan'],                   bx:54,  by:218, tx:138, ty:214},
          {text:['✂️ Surco de división','comenzando'],              bx:280, by:160, tx:240, ty:162},
        ],
        svg: _cell('r5',`
          <!-- North nuclear envelope reforming -->
          <ellipse cx="160" cy="98" rx="30" ry="25"
            fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.65)" stroke-width="1.8" stroke-dasharray="5 3"
            style="animation:nucReformR5 1.5s ease-out both"/>
          <!-- North decondensing chromatids (lighter) -->
          <g style="animation:chrDecondenseR5 2s ease-in-out infinite">
            <path d="M140 90 Q148 98 138 108 Q132 116 142 122" fill="none" stroke="rgba(167,139,250,0.65)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M170 90 Q178 98 172 108 Q166 116 176 122" fill="none" stroke="rgba(139,92,246,0.6)" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M154 86 Q160 96 156 108 Q152 118 160 124" fill="none" stroke="rgba(124,58,237,0.6)" stroke-width="2" stroke-linecap="round"/>
          </g>
          <!-- South nuclear envelope reforming -->
          <ellipse cx="160" cy="216" rx="30" ry="25"
            fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.65)" stroke-width="1.8" stroke-dasharray="5 3"
            style="animation:nucReformR5 1.5s 0.3s ease-out both"/>
          <!-- South decondensing chromatids -->
          <g style="animation:chrDecondenseR5 2s 0.4s ease-in-out infinite">
            <path d="M140 208 Q148 216 138 224 Q132 232 142 240" fill="none" stroke="rgba(167,139,250,0.65)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M170 208 Q178 216 172 224 Q166 232 176 240" fill="none" stroke="rgba(139,92,246,0.6)" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M154 206 Q160 216 156 226 Q152 236 160 242" fill="none" stroke="rgba(124,58,237,0.6)" stroke-width="2" stroke-linecap="round"/>
          </g>
          <!-- Cleavage furrow beginning (arrows from sides toward center) -->
          <path d="M12 158 Q30 158 40 162" stroke="rgba(124,58,237,0.5)" stroke-width="2"
            marker-end="url(#aBr5)" fill="none" style="animation:furrowInR5 2s ease-in-out infinite"/>
          <path d="M308 158 Q290 158 280 162" stroke="rgba(124,58,237,0.5)" stroke-width="2"
            marker-end="url(#aBr5)" fill="none" style="animation:furrowInR5 2s 0.5s ease-in-out infinite"/>
          <text x="160" y="160" text-anchor="middle" font-size="7" fill="rgba(124,58,237,0.55)" font-family="sans-serif" style="animation:furrowInR5 2s ease-in-out infinite">Surco de división</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(124,58,237,0.7)" font-family="sans-serif" font-style="italic">TELOFASE</text>
        `, 'Laminas nucleares re-ensamblan · Cromatina se descompacta',
        `@keyframes nucReformR5{0%{opacity:0;stroke-dashoffset:30}100%{opacity:1;stroke-dashoffset:0}}
         @keyframes chrDecondenseR5{0%,100%{opacity:0.5}50%{opacity:0.9}}
         @keyframes furrowInR5{0%,100%{opacity:0.4}50%{opacity:1}}`) },

      // ─── PASO 6: Citocinesis ──────────────────────────────────────────
      { title:'✂️ Citocinesis — Dos células hijas',
        narration:'El <strong>anillo contráctil de actomiosina</strong> se estrecha como un cinturón alrededor del ecuador, dividiendo el citoplasma en dos mitades. El resultado: <strong>dos células hijas idénticas</strong>, cada una con su propio núcleo y juego completo de cromosomas.',
        info:'<b>Científico:</b> El anillo contráctil (~0.2µm de grosor) está formado por filamentos de actina F y miosina II no muscular. La contracción de la miosina II (activada por fosforilación de RhoA-ROCK) estrecha el anillo. El surco de división llega hasta el cuerpo medio (midbody), estructura densa donde los microtúbulos antiparalelos persisten. La abscisión final es mediada por ESCRT-III y separa definitivamente las dos células. Dura ~30 min.',
        svg: _cell('r6',`
          <!-- Cleavage furrow — deep indentation from both sides -->
          <!-- Left pinch -->
          <path d="M14 152 Q30 156 44 170 Q50 178 44 186 Q30 200 14 162"
            fill="rgba(0,10,30,0.5)" stroke="rgba(0,229,255,0.4)" stroke-width="1.5"/>
          <!-- Right pinch -->
          <path d="M306 152 Q290 156 276 170 Q270 178 276 186 Q290 200 306 162"
            fill="rgba(0,10,30,0.5)" stroke="rgba(0,229,255,0.4)" stroke-width="1.5"/>
          <!-- Actomyosin ring (bright band at equator) -->
          <line x1="44" y1="168" x2="276" y2="168" stroke="rgba(124,58,237,0.7)" stroke-width="3.5"
            style="animation:ringPulseR6 1.5s ease-in-out infinite"/>
          <line x1="44" y1="178" x2="276" y2="178" stroke="rgba(124,58,237,0.6)" stroke-width="2.5"
            style="animation:ringPulseR6 1.5s 0.15s ease-in-out infinite"/>
          <text x="160" y="163" text-anchor="middle" font-size="7.5" fill="rgba(124,58,237,0.9)" font-family="sans-serif" font-weight="bold">Anillo contráctil</text>
          <!-- North daughter nucleus -->
          <ellipse cx="160" cy="102" rx="28" ry="24"
            fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.72)" stroke-width="1.8"
            style="animation:nucGlowR6 2s ease-in-out infinite"/>
          <ellipse cx="158" cy="100" rx="12" ry="10" fill="rgba(167,139,250,0.5)" stroke="rgba(200,180,255,0.6)" stroke-width="1.2"/>
          <!-- South daughter nucleus -->
          <ellipse cx="160" cy="218" rx="28" ry="24"
            fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.72)" stroke-width="1.8"
            style="animation:nucGlowR6 2s 0.5s ease-in-out infinite"/>
          <ellipse cx="158" cy="216" rx="12" ry="10" fill="rgba(167,139,250,0.5)" stroke="rgba(200,180,255,0.6)" stroke-width="1.2"/>
          <!-- Cell division label -->
          <text x="70" y="96" text-anchor="middle" font-size="8" fill="rgba(167,139,250,0.75)" font-family="sans-serif">Célula hija 1</text>
          <text x="250" y="224" text-anchor="middle" font-size="8" fill="rgba(167,139,250,0.75)" font-family="sans-serif">Célula hija 2</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(124,58,237,0.7)" font-family="sans-serif" font-style="italic">CITOCINESIS</text>
        `, 'Actomiosina se contrae → 2 células hijas genéticamente idénticas',
        `@keyframes ringPulseR6{0%,100%{opacity:0.6;filter:none}50%{opacity:1;filter:drop-shadow(0 0 6px rgba(124,58,237,0.7))}}
         @keyframes nucGlowR6{0%,100%{opacity:0.7}50%{opacity:1;filter:drop-shadow(0 0 8px rgba(167,139,250,0.6))}}`) },

    ];
  }

  // ══════════════════════════════
  // JUEGO ENGINE
  // ══════════════════════════════
  const _game={id:null,rounds:null,round:0,score:0,dragging:false,
               failCount:0,molX:0,molY:0};

  function _openJuego(id){
    _game.id=id; _game.round=0; _game.score=0; _game.failCount=0; _game.totalFails=0; _game.dragging=false;
    if(id==='respiracion') _game.rounds=_juegoRoundsRespiracion();
    if(id==='alimentacion') _game.rounds=_juegoRoundsAlimentacion();
    if(id==='reproduccion') _game.rounds=_juegoRoundsReproduccion();
    if(id==='defensa') _game.rounds=_juegoRoundsDefensa();
    if(id==='sintesis') _game.rounds=_juegoRoundsSintesis();
    if(id==='fotosintesis') _game.rounds=_juegoRoundsFotosintesis();
    document.getElementById('procesosScreen')?.classList.add('player-active');
    _renderJugadorIntro();
  }

  const JUEGO_META_MAP={
    respiracion:{title:'Respiración Celular',emoji:'⚡',color:'#ef4444'},
    alimentacion:{title:'Alimentación Celular',emoji:'🍎',color:'#10b981'},
    reproduccion:{title:'Reproducción Celular',emoji:'🔁',color:'#7c3aed'},
    defensa:{title:'Defensa Inmune',emoji:'🛡️',color:'#f59e0b'},
    sintesis:{title:'Síntesis de Proteínas',emoji:'🧬',color:'#06b6d4'},
  };
  function _renderJugadorIntro(){
    const body=document.getElementById('procesosBody'); if(!body) return;
    const total=_game.rounds.length;
    const totalXp=_game.rounds.reduce((s,r)=>s+r.xp,0);
    const jm=JUEGO_META_MAP[_game.id]||{title:_game.id,emoji:'🧬',color:'#00e5ff'};
    body.innerHTML=`
      <div class="juego-intro">
        <div class="juego-intro-header">
          <button class="btn btn-ghost btn-sm" id="juegoIntroBack">← Volver</button>
          <div class="cine-title">🎮 Cómo jugar</div>
          <div style="width:70px"></div>
        </div>
        <div class="juego-intro-body">
          <div class="juego-intro-icon">${jm.emoji}</div>
          <div class="juego-intro-title">${jm.title}</div>
          <div class="juego-intro-steps">
            <div class="juego-intro-step">
              <span class="jis-num">1</span>
              <span>La célula muestra una <strong>organela brillando</strong> — ese es tu destino.</span>
            </div>
            <div class="juego-intro-step">
              <span class="jis-num">2</span>
              <span><strong>Arrastrá la molécula</strong> hasta esa organela para completar el proceso.</span>
            </div>
            <div class="juego-intro-step">
              <span class="jis-num">3</span>
              <span>Si errás, la molécula vuelve al inicio — <strong>podés seguir intentando</strong>.</span>
            </div>
          </div>
          <div class="juego-intro-meta">
            <span>⚡ ${total} rondas</span>
            <span>🏆 +${totalXp} XP</span>
          </div>
          <button class="btn btn-cyan juego-intro-btn" id="juegoIntroStart">¡Empezar! →</button>
        </div>
      </div>`;
    document.getElementById('juegoIntroBack').onclick=()=>{
      document.getElementById('procesosScreen')?.classList.remove('player-active');
      _renderJugadorMenu();
    };
    document.getElementById('juegoIntroStart').onclick=()=>_renderJugadorPlayer();
  }

  function _renderJugadorPlayer(){
    const body=document.getElementById('procesosBody'); if(!body) return;
    const total=_game.rounds.length;
    body.innerHTML=`
      <div class="juego-player" id="juegoPlayer">
        <div class="cine-header">
          <button class="btn btn-ghost btn-sm cine-back-btn" id="juegoBack">← Volver</button>
          <div class="cine-title">🎮 ${(JUEGO_META_MAP[_game.id]||{title:_game.id}).title}</div>
          <div class="cine-header-right"><span class="cine-stepcount" id="juegoStep">1/${total}</span></div>
        </div>
        <div class="juego-instruction" id="juegoInstr"></div>
        <div class="juego-stage-wrap" id="juegoWrap">
          <div class="cine-svg-wrap" id="juegoSvgWrap"></div>
          <div class="juego-molecule" id="juegoMol" style="display:none"></div>
        </div>
        <div class="juego-footer">
          <div class="juego-progress-dots" id="juegoProgressDots">
            ${_game.rounds.map((_,i)=>`<div class="juego-dot${i===0?' current':''}"></div>`).join('')}
          </div>
          <div class="juego-score-display" id="juegoScore">⚡ 0 XP</div>
        </div>
      </div>`;
    document.getElementById('juegoBack').onclick=()=>{
      _cleanDrag();
      document.getElementById('procesosScreen')?.classList.remove('player-active');
      _renderJugadorMenu();
    };
    _startRound(0);
  }

  function _startRound(idx){
    if(!_game.rounds||idx>=_game.rounds.length){_gameComplete();return;}
    _game.round=idx; _game.failCount=0;
    const round=_game.rounds[idx]; const total=_game.rounds.length;
    const sc=document.getElementById('juegoStep'); if(sc) sc.textContent=(idx+1)+'/'+total;
    const instr=document.getElementById('juegoInstr'); if(instr) instr.innerHTML=round.instruction;
    const dots=document.getElementById('juegoProgressDots');
    if(dots) dots.innerHTML=_game.rounds.map((_,i)=>
      `<div class="juego-dot${i<idx?' done':i===idx?' current':''}"></div>`).join('');
    const sc2=document.getElementById('juegoScore'); if(sc2) sc2.textContent='⚡ '+_game.score+' XP';
    const svgWrap=document.getElementById('juegoSvgWrap');
    if(svgWrap){
      svgWrap.innerHTML=_juegoCell(round);
      svgWrap.classList.remove('juego-svg-entering');
      void svgWrap.offsetWidth;
      svgWrap.classList.add('juego-svg-entering');
    }
    requestAnimationFrame(()=>_placeMol(round));
  }

  function _juegoCell(round){
    // Highlights por proceso — cada uno resalta su organela objetivo
    const HL_RESP={
      1:`<rect x="266" y="113" width="14" height="24" rx="7" fill="rgba(0,229,255,0.22)" stroke="rgba(0,229,255,0.95)" stroke-width="2.2" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
      2:`<ellipse cx="185" cy="130" rx="72" ry="56" fill="none" stroke="rgba(0,229,255,0.45)" stroke-width="2" stroke-dasharray="9 4" style="animation:orgGlow 1.4s 0.5s ease-in-out infinite"/>`,
      3:`<g transform="rotate(20 208 168)"><ellipse cx="208" cy="168" rx="45" ry="18" fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,1)" stroke-width="3" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/></g>`,
      4:`<g transform="rotate(20 208 168)"><path d="M172 168 Q180 160 188 168 Q196 176 204 168 Q212 160 220 168 Q228 176 236 168 Q244 160 244 168" fill="none" stroke="rgba(96,165,250,1)" stroke-width="3.5" stroke-linecap="round" style="animation:orgGlow 1.2s 0.5s ease-in-out infinite"/></g>`,
      5:`<g transform="rotate(20 208 168)"><ellipse cx="208" cy="168" rx="45" ry="18" fill="rgba(16,185,129,0.18)" stroke="rgba(16,185,129,0.95)" stroke-width="3" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/></g>`,
    };
    const HL_ALIM={
      1:`<rect x="272" y="118" width="14" height="44" rx="7" fill="rgba(16,185,129,0.22)" stroke="rgba(16,185,129,0.95)" stroke-width="2.2" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
      2:`<ellipse cx="196" cy="132" rx="68" ry="52" fill="none" stroke="rgba(16,185,129,0.45)" stroke-width="2" stroke-dasharray="9 4" style="animation:orgGlow 1.4s 0.5s ease-in-out infinite"/>`,
      3:`<path d="M195 210 Q218 205 232 215" fill="none" stroke="rgba(245,158,11,1)" stroke-width="3.5" stroke-linecap="round" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/><path d="M192 220 Q217 214 233 225" fill="none" stroke="rgba(245,158,11,0.8)" stroke-width="2.8" stroke-linecap="round" style="animation:orgGlow 1.3s 0.65s ease-in-out infinite"/><path d="M194 230 Q216 224 230 233" fill="none" stroke="rgba(245,158,11,0.6)" stroke-width="2.2" stroke-linecap="round" style="animation:orgGlow 1.3s 0.8s ease-in-out infinite"/>`,
      4:`<circle cx="128" cy="215" r="15" fill="rgba(236,72,153,0.2)" stroke="rgba(236,72,153,0.95)" stroke-width="2.8" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
      5:`<rect x="10" y="130" width="14" height="48" rx="7" fill="rgba(16,185,129,0.22)" stroke="rgba(16,185,129,0.95)" stroke-width="2.2" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
    };
    const HL_REPR={
      1:`<ellipse cx="122" cy="108" rx="38" ry="32" fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.9)" stroke-width="2.5" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
      2:`<circle cx="160" cy="76" r="14" fill="rgba(0,229,255,0.18)" stroke="rgba(0,229,255,0.9)" stroke-width="2.2" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
      3:`<rect x="58" y="149" width="204" height="18" rx="4" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.7)" stroke-width="2" stroke-dasharray="8 4" style="animation:orgGlow 1.4s 0.5s ease-in-out infinite"/>`,
      4:`<circle cx="160" cy="238" r="14" fill="rgba(124,58,237,0.18)" stroke="rgba(124,58,237,0.9)" stroke-width="2.2" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
      5:`<rect x="88" y="151" width="144" height="14" rx="7" fill="rgba(124,58,237,0.12)" stroke="rgba(124,58,237,0.85)" stroke-width="2.2" style="animation:orgGlow 1.4s 0.5s ease-in-out infinite"/>`,
    };
    const HL_DEF={
      1:`<rect x="266" y="108" width="14" height="34" rx="7" fill="rgba(245,158,11,0.22)" stroke="rgba(245,158,11,0.95)" stroke-width="2.2" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
      2:`<ellipse cx="185" cy="130" rx="72" ry="56" fill="none" stroke="rgba(245,158,11,0.45)" stroke-width="2" stroke-dasharray="9 4" style="animation:orgGlow 1.4s 0.5s ease-in-out infinite"/>`,
      3:`<circle cx="128" cy="215" r="16" fill="rgba(236,72,153,0.2)" stroke="rgba(236,72,153,0.95)" stroke-width="2.8" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
      4:`<ellipse cx="122" cy="108" rx="38" ry="32" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.9)" stroke-width="2.5" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
      5:`<rect x="10" y="118" width="14" height="34" rx="7" fill="rgba(245,158,11,0.22)" stroke="rgba(245,158,11,0.95)" stroke-width="2.2" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
    };
    const HL_SINT={
      1:`<circle cx="140" cy="94" r="11" fill="rgba(6,182,212,0.18)" stroke="rgba(6,182,212,0.95)" stroke-width="2.5" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
      2:`<path d="M148 175 Q162 166 178 174 Q194 182 210 174" fill="none" stroke="rgba(251,191,36,1)" stroke-width="3.5" stroke-linecap="round" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/><path d="M140 195 Q155 186 172 194 Q188 202 204 193" fill="none" stroke="rgba(251,191,36,0.75)" stroke-width="2.8" stroke-linecap="round" style="animation:orgGlow 1.3s 0.65s ease-in-out infinite"/>`,
      3:`<ellipse cx="175" cy="170" rx="52" ry="30" fill="none" stroke="rgba(52,211,153,0.55)" stroke-width="2" stroke-dasharray="8 4" style="animation:orgGlow 1.4s 0.5s ease-in-out infinite"/>`,
      4:`<path d="M195 210 Q218 205 232 215" fill="none" stroke="rgba(245,158,11,1)" stroke-width="3.5" stroke-linecap="round" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/><path d="M192 220 Q217 214 233 225" fill="none" stroke="rgba(245,158,11,0.8)" stroke-width="2.8" stroke-linecap="round" style="animation:orgGlow 1.3s 0.65s ease-in-out infinite"/><path d="M194 230 Q216 224 230 233" fill="none" stroke="rgba(245,158,11,0.6)" stroke-width="2.2" stroke-linecap="round" style="animation:orgGlow 1.3s 0.8s ease-in-out infinite"/>`,
      5:`<rect x="266" y="113" width="14" height="24" rx="7" fill="rgba(6,182,212,0.22)" stroke="rgba(6,182,212,0.95)" stroke-width="2.2" style="animation:orgGlow 1.3s 0.5s ease-in-out infinite"/>`,
    };
    const HL=_game.id==='alimentacion'?HL_ALIM:_game.id==='reproduccion'?HL_REPR:_game.id==='defensa'?HL_DEF:_game.id==='sintesis'?HL_SINT:HL_RESP;
    let svg=_cell('jg'+round.step, HL[round.step]||'', null,
      '@keyframes orgGlow{0%,100%{opacity:0.4}50%{opacity:1}}');
    // Envolver organelas internas en grupos con transicion
    // Membrana + mitocondrias quedan FUERA (siempre visibles)
    svg=svg
      .replace('  <!-- ─── ER NETWORK','<g id="cellDetails" style="transition:opacity 0.55s ease">  <!-- ─── ER NETWORK')
      .replace('  <!-- ─── MITOCONDRIA 1','</g>  <!-- ─── MITOCONDRIA 1')
      .replace('  <!-- ─── NUCLEUS','<g id="cellDetails2" style="transition:opacity 0.55s ease">  <!-- ─── NUCLEUS')
      .replace('  <!-- ─── ANNOTATION OVERLAY','</g>  <!-- ─── ANNOTATION OVERLAY');
    return svg;
  }

  // Convert SVG viewBox coords to wrap-element-relative pixels
  function _svgToWrap(svgX, svgY, svgEl, wrapEl){
    const sr=svgEl.getBoundingClientRect(); const wr=wrapEl.getBoundingClientRect();
    const {scale,ox,oy}=_svgScale(sr);
    return {x:(sr.left-wr.left)+ox+svgX*scale, y:(sr.top-wr.top)+oy+svgY*scale};
  }
  function _svgScale(sr){
    const svgW=320,svgH=300,ca=sr.width/sr.height,sa=svgW/svgH;
    let scale,ox=0,oy=0;
    if(ca>sa){scale=sr.height/svgH;ox=(sr.width-svgW*scale)/2;}
    else{scale=sr.width/svgW;oy=(sr.height-svgH*scale)/2;}
    return{scale,ox,oy};
  }

  function _placeMol(round){
    const mol=document.getElementById('juegoMol');
    const wrap=document.getElementById('juegoWrap');
    const svg=document.querySelector('#juegoSvgWrap .cine-cell-svg');
    if(!mol||!wrap||!svg) return;
    const m=round.molecule;
    const d=m.r*2;
    mol.style.cssText=`width:${d}px;height:${d}px;border-radius:50%;`
      +`background:${m.color};border:2.5px solid ${m.border};`
      +`display:flex;flex-direction:column;align-items:center;justify-content:center;`
      +`cursor:grab;user-select:none;touch-action:none;`
      +`box-shadow:0 4px 16px rgba(0,0,0,0.45);z-index:10;position:absolute;`;
    mol.innerHTML=`<span style="font-size:${m.r>22?'.85rem':'.76rem'};font-weight:800;color:#fff;line-height:1">${m.sym}</span>`;
    const pos=_svgToWrap(round.molSvgX, round.molSvgY, svg, wrap);
    _game.molX=pos.x-m.r; _game.molY=pos.y-m.r;
    mol.style.left=_game.molX+'px'; mol.style.top=_game.molY+'px';
    mol.onpointerdown=_startDrag;
  }

  function _startDrag(e){
    e.preventDefault(); e.stopPropagation();
    _game.dragging=true;
    const mol=document.getElementById('juegoMol'); if(!mol) return;
    mol.classList.add('dragging');
    mol.setPointerCapture(e.pointerId);
    mol.onpointermove=_moveDrag;
    mol.onpointerup=mol.onpointercancel=_endDrag;
  }
  function _moveDrag(e){
    if(!_game.dragging) return; e.preventDefault();
    const wrap=document.getElementById('juegoWrap');
    const mol=document.getElementById('juegoMol'); if(!wrap||!mol) return;
    const r=wrap.getBoundingClientRect();
    const nx=e.clientX-r.left-mol.offsetWidth/2;
    const ny=e.clientY-r.top-mol.offsetHeight/2;
    _game.molX=nx; _game.molY=ny;
    mol.style.left=nx+'px'; mol.style.top=ny+'px';
  }
  function _endDrag(e){
    if(!_game.dragging) return;
    _game.dragging=false;
    const mol=document.getElementById('juegoMol'); if(!mol) return;
    mol.classList.remove('dragging');
    mol.onpointermove=mol.onpointerup=mol.onpointercancel=null;
    const round=_game.rounds[_game.round];
    const svg=document.querySelector('#juegoSvgWrap .cine-cell-svg'); if(!svg) return;
    if(_hitTest(e.clientX, e.clientY, round.target, svg)){_roundOK(round);}
    else{_game.failCount++;_game.totalFails++;_roundFail(round);}
  }
  function _cleanDrag(){
    const mol=document.getElementById('juegoMol');
    if(mol){mol.onpointerdown=mol.onpointermove=mol.onpointerup=mol.onpointercancel=null;}
    _game.dragging=false;
  }

  function _hitTest(cx,cy,target,svgEl){
    const sr=svgEl.getBoundingClientRect();
    const {scale,ox,oy}=_svgScale(sr);
    const tx=sr.left+ox+target.x*scale;
    const ty=sr.top+oy+target.y*scale;
    const tr=target.r*scale;
    return Math.sqrt((cx-tx)**2+(cy-ty)**2)<=tr;
  }

  function _roundOK(round){
    const mol=document.getElementById('juegoMol');
    if(mol){
      mol.style.transition='transform .25s,opacity .3s,box-shadow .15s';
      mol.style.transform='scale(1.4)'; mol.style.boxShadow='0 0 28px rgba(52,211,153,0.9)';
      mol.style.border='2.5px solid #34d399';
      setTimeout(()=>{mol.style.opacity='0';},200);
    }
    _game.score+=round.xp;
    setTimeout(()=>{
      _showRoundModal(round, ()=>{
        if(_game.round+1>=_game.rounds.length){_gameComplete();}
        else{_startRound(_game.round+1);}
      });
    }, 550);
  }

  function _roundFail(round){
    const mol=document.getElementById('juegoMol'); if(!mol) return;
    // Descontar 10 XP (minimo 0)
    _game.score=Math.max(0, _game.score-10);
    const sc=document.getElementById('juegoScore');
    if(sc) sc.textContent='⚡ '+_game.score+' XP';
    mol.style.border='2.5px solid #ef4444';
    mol.style.boxShadow='0 0 16px rgba(239,68,68,0.7)';
    _juegoFeedback('-10 XP','fail');
    setTimeout(()=>{
      mol.style.transition='left .3s,top .3s,border .2s,box-shadow .2s';
      mol.style.border='2.5px solid '+round.molecule.border;
      mol.style.boxShadow='0 4px 16px rgba(0,0,0,0.45)';
      const svg=document.querySelector('#juegoSvgWrap .cine-cell-svg');
      const wrap=document.getElementById('juegoWrap');
      if(svg&&wrap){
        const pos=_svgToWrap(round.molSvgX,round.molSvgY,svg,wrap);
        _game.molX=pos.x-round.molecule.r; _game.molY=pos.y-round.molecule.r;
        mol.style.left=_game.molX+'px'; mol.style.top=_game.molY+'px';
      }
      setTimeout(()=>{mol.style.transition='';},320);
    },400);
    if(_game.failCount>=2)
      _juegoFeedback('Pista: arrastrá hacia la organela brillante 🎯','hint');
  }

  function _showRoundModal(round, onContinue){
    const wrap=document.getElementById('juegoWrap'); if(!wrap) return;
    const ex=round.explain||{};
    const isLast=_game.round+1>=_game.rounds.length;
    const ov=document.createElement('div');
    ov.className='juego-modal-overlay';
    ov.innerHTML=`
      <div class="juego-modal">
        <div class="jm-check">✅</div>
        <div class="jm-title">${ex.title||'¡Correcto!'}</div>
        <div class="jm-xp">+${round.xp} XP</div>
        <div class="jm-divider"></div>
        <div class="jm-text">${ex.text||round.feedback}</div>
        <button class="btn btn-cyan jm-btn" id="jmContinue">
          ${isLast?'🏆 Ver resultados':'Continuar →'}
        </button>
      </div>`;
    wrap.appendChild(ov);
    // Desvanecer organelas interiores (membrana + mito quedan visibles)
    ['cellDetails','cellDetails2'].forEach(id=>{
      const el=document.getElementById(id); if(el) el.style.opacity='0';
    });
    requestAnimationFrame(()=>ov.classList.add('visible'));
    document.getElementById('jmContinue').onclick=()=>{
      ov.classList.remove('visible');
      setTimeout(()=>{ov.remove(); onContinue();}, 250);
    };
  }

  function _juegoFeedback(text,type){
    const wrap=document.getElementById('juegoWrap'); if(!wrap) return;
    let fb=document.getElementById('juegoFeedback');
    if(!fb){fb=document.createElement('div');fb.id='juegoFeedback';wrap.appendChild(fb);}
    fb.textContent=text; fb.className='juego-feedback '+type; fb.style.opacity='1';
    clearTimeout(fb._t); fb._t=setTimeout(()=>{fb.style.opacity='0';},1800);
  }

  function _gameComplete(){
    const body=document.getElementById('procesosBody'); if(!body) return;
    _cleanDrag();
    const seen=_getSeen(); const alreadyDone=seen['j_'+_game.id];
    const totalXp=_game.rounds.reduce((s,r)=>s+r.xp,0);
    body.innerHTML=`
      <div class="juego-complete">
        <div class="juego-complete-emoji">🏆</div>
        <div class="juego-complete-title">¡${(JUEGO_META_MAP[_game.id]||{title:_game.id}).title} completada!</div>
        <div class="juego-complete-score">
          <span class="juego-xp-big">+${totalXp} XP</span>
          <span class="juego-xp-sub">¡Excelente trabajo!</span>
          <span class="juego-xp-sub" style="color:${_game.totalFails===0?'#10b981':'#f59e0b'}">${_game.totalFails===0?'Sin errores 💯':_game.totalFails+' error'+(_game.totalFails===1?'':' es')}</span>
        </div>
        <div class="juego-complete-steps">
          ${_game.rounds.map(r=>`<div class="juego-step-badge">✅ ${r.targetLabel}</div>`).join('')}
        </div>
        <div class="juego-complete-btns">
          <button class="btn btn-cyan juego-award-btn" id="juegoAward">
            ${alreadyDone?'✅ Ya completado':'🏆 Recibir +'+totalXp+' XP'}
          </button>
          <button class="btn btn-ghost" id="juegoRetry">🔁 Jugar de nuevo</button>
        </div>
      </div>`;
    document.getElementById('juegoAward').onclick=()=>{
      if(!alreadyDone){
        const s2=_getSeen(); s2['j_'+_game.id]=Date.now();
        localStorage.setItem('cq3_proc_seen',JSON.stringify(s2));
        if(typeof addXP==='function') addXP(totalXp);
        if(typeof checkAch==='function') checkAch();
      }
      document.getElementById('procesosScreen')?.classList.remove('player-active');
      _tab='juego'; _renderTabs(); _renderBody();
    };
    document.getElementById('juegoRetry').onclick=()=>_openJuego(_game.id);
  }

  // ── Rounds data ─────────────────────────────────────────────────
  function _juegoRoundsRespiracion(){
    return [
      { step:1,
        instruction:'La glucosa llegó a la célula. <strong>Arrastrála</strong> hasta el transportador GLUT en la membrana.',
        molecule:{sym:'G',label:'🍬 Glucosa',color:'rgba(245,158,11,0.92)',border:'#f59e0b',r:26},
        molSvgX:288, molSvgY:62,
        target:{x:270, y:126, r:30}, targetLabel:'🚪 GLUT',
        xp:10, feedback:'🍬 ¡Glucosa adentro!',
        explain:{
          title:'¡Glucosa adentro!',
          text:'El <strong>transportador GLUT</strong> es una proteína de la membrana celular que permite la entrada de glucosa por <strong>difusión facilitada</strong> — sin gastar ATP. La insulina regula cuántos GLUT hay en la membrana. Sin glucosa, no hay energía posible.'
        }},
      { step:2,
        instruction:'La glucosa se rompe en piruvatos. <strong>Arrastrála</strong> al citoplasma para la glucólisis.',
        molecule:{sym:'G6P',label:'🔥 Glucosa-6P',color:'rgba(245,158,11,0.88)',border:'#f59e0b',r:26},
        molSvgX:248, molSvgY:75,
        target:{x:205, y:122, r:38}, targetLabel:'💧 Citoplasma',
        xp:10, feedback:'🔥 ¡Glucólisis!',
        explain:{
          title:'¡Glucólisis completada!',
          text:'En el <strong>citoplasma</strong>, la glucosa (6 carbonos) se partió en 2 <strong>piruvatos</strong> (3C cada uno). Se obtuvieron <strong>2 ATP</strong> y 2 NADH. Es la única etapa que no necesita oxígeno — puede ocurrir incluso en músculos durante ejercicio intenso.'
        }},
      { step:3,
        instruction:'El piruvato viaja a la central energética. <strong>Arrastrálo</strong> a la mitocondria.',
        molecule:{sym:'Pir',label:'🚚 Piruvato',color:'rgba(251,191,36,0.92)',border:'#fbbf24',r:22},
        molSvgX:96, molSvgY:135,
        target:{x:208, y:168, r:44}, targetLabel:'🧪 Mitocondria',
        xp:10, feedback:'🚚 ¡Piruvato en la mitocondria!',
        explain:{
          title:'¡Piruvato en la mitocondria!',
          text:'El piruvato se convirtió en <strong>Acetil-CoA</strong> liberando CO₂ — ¡el mismo que exhalás al respirar! Este proceso se llama <strong>descarboxilación oxidativa</strong> y produce NADH extra. El Acetil-CoA ahora entra al ciclo de Krebs.'
        }},
      { step:4,
        instruction:'El NADH lleva energía a la cadena respiratoria. <strong>Arrastrálo</strong> a la membrana interna.',
        molecule:{sym:'NADH',label:'⚙️ NADH',color:'rgba(96,165,250,0.92)',border:'#60a5fa',r:22},
        molSvgX:66, molSvgY:158,
        target:{x:208, y:165, r:42}, targetLabel:'⚙️ Membrana interna',
        xp:10, feedback:'⚙️ ¡Cadena respiratoria activada!',
        explain:{
          title:'¡Cadena respiratoria activada!',
          text:'El <strong>NADH</strong> entregó sus electrones a los complejos proteicos de la membrana interna. Esos electrones bombearon <strong>H⁺</strong> al espacio intermembrana, creando una "batería" de iones — la <strong>fuerza protomotriz</strong>. Esta presión es la que genera ATP.'
        }},
      { step:5,
        instruction:'El oxígeno acepta los electrones finales. <strong>Arrastrálo</strong> al Complejo IV.',
        molecule:{sym:'O₂',label:'💨 Oxígeno',color:'rgba(52,211,153,0.92)',border:'#34d399',r:22},
        molSvgX:292, molSvgY:82,
        target:{x:208, y:168, r:42}, targetLabel:'💨 Complejo IV',
        xp:10, feedback:'⚡ ¡Respiración completa!',
        explain:{
          title:'¡Respiración celular completa!',
          text:'El O₂ aceptó los electrones finales en el <strong>Complejo IV</strong>, formando H₂O. Los H⁺ acumulados volvieron por la <strong>ATP sintasa</strong> generando ~<strong>32–34 ATP</strong>. En total, 1 glucosa → ~36–38 ATP: el combustible que usa la célula para todo.'
        }},
    ];
  }

  function _juegoRoundsAlimentacion(){
    return [
      { step:1,
        instruction:'Una partícula de alimento llegó a la célula. <strong>Arrastrála</strong> a la membrana para que sea engullida por endocitosis.',
        molecule:{sym:'Part',label:'Partícula',color:'rgba(16,185,129,0.92)',border:'#10b981',r:24},
        molSvgX:306, molSvgY:100,
        target:{x:272, y:136, r:32}, targetLabel:'Membrana',
        xp:10, feedback:'¡Endocitosis iniciada!',
        explain:{
          title:'¡Endocitosis iniciada!',
          text:'La membrana celular detectó la partícula gracias a sus <strong>receptores</strong>. Se invaginó formando una bolsa y la engulló — como si abriera la boca. Este proceso se llama <strong>endocitosis mediada por receptor</strong> y consume ATP. La clatrina ayuda a doblar la membrana.'
        }},
      { step:2,
        instruction:'La membrana formó una vesícula. <strong>Arrastrá la vesícula</strong> al citoplasma para convertirla en endosoma.',
        molecule:{sym:'Ves',label:'Vesícula',color:'rgba(0,229,255,0.88)',border:'#00e5ff',r:22},
        molSvgX:265, molSvgY:105,
        target:{x:196, y:130, r:36}, targetLabel:'Citoplasma',
        xp:10, feedback:'¡Endosoma formado!',
        explain:{
          title:'¡Endosoma formado!',
          text:'La vesícula se desprendió de la membrana y se convirtió en un <strong>endosoma temprano</strong>. Las bombas V-ATPasa en su pared empezaron a bombear H⁺ hacia adentro — el pH bajó de 7.4 a 6.0. Esta acidificación activa los procesos de clasificación del contenido.'
        }},
      { step:3,
        instruction:'El Golgi debe empaquetar las enzimas digestivas. <strong>Arrastrá la proteína</strong> al aparato de Golgi.',
        molecule:{sym:'Enz',label:'Enzima',color:'rgba(245,158,11,0.92)',border:'#f59e0b',r:22},
        molSvgX:88, molSvgY:150,
        target:{x:215, y:218, r:30}, targetLabel:'Golgi',
        xp:10, feedback:'¡Enzimas empaquetadas!',
        explain:{
          title:'¡Enzimas empaquetadas en el Golgi!',
          text:'El <strong>aparato de Golgi</strong> es la "oficina postal" de la célula. Tomó las enzimas recién fabricadas, las marcó con una etiqueta especial (<strong>manosa-6-fosfato</strong>) y las empaquetó en vesículas. Esta etiqueta le dice a la célula: "estas van al lisosoma, no las mandes a otro lado".'
        }},
      { step:4,
        instruction:'El lisosoma está cargado de enzimas. <strong>Arrastrálo</strong> hasta el endosoma para fusionarse.',
        molecule:{sym:'Lis',label:'Lisosoma',color:'rgba(236,72,153,0.92)',border:'#ec4899',r:22},
        molSvgX:74, molSvgY:230,
        target:{x:170, y:198, r:34}, targetLabel:'Endosoma',
        xp:10, feedback:'¡Fagolisosoma formado!',
        explain:{
          title:'¡Fagolisosoma formado!',
          text:'El lisosoma se fundió con el endosoma — nació el <strong>fagolisosoma</strong>. El pH bajó a 4.5 y las ~60 <strong>enzimas hidrolíticas</strong> (catepsinas, lipasas, nucleasas) se activaron. Es como abrir una bolsa de ácido dentro de otra bolsa. La membrana tiene proteínas especiales (LAMP1/2) que la protegen de sus propias enzimas.'
        }},
      { step:5,
        instruction:'La digestión terminó. <strong>Arrastrá los residuos</strong> a la membrana para expulsarlos por exocitosis.',
        molecule:{sym:'Res',label:'Residuos',color:'rgba(148,163,184,0.88)',border:'#94a3b8',r:22},
        molSvgX:164, molSvgY:218,
        target:{x:38, y:158, r:30}, targetLabel:'Membrana',
        xp:10, feedback:'¡Exocitosis completada!',
        explain:{
          title:'¡Proceso de alimentación completo!',
          text:'Los residuos que la célula no pudo digerir se acumularon en el <strong>cuerpo residual</strong> y fueron expulsados por <strong>exocitosis</strong>. Los nutrientes aprovechables (aminoácidos, glucosa, ácidos grasos) ya están en el citoplasma, listos para ser usados en síntesis de nuevas proteínas o en la respiración celular.'
        }},
    ];
  }


  function _juegoRoundsReproduccion(){
    return [
      { step:1,
        instruction:'El ADN fue duplicado en la Fase S. <strong>Arrastrá el ADN replicado</strong> al núcleo para completar la síntesis.',
        molecule:{sym:'ADN×2',label:'ADN replicado',color:'rgba(167,139,250,0.92)',border:'#a78bfa',r:26},
        molSvgX:240, molSvgY:68,
        target:{x:122, y:108, r:36}, targetLabel:'Núcleo',
        xp:10, feedback:'¡ADN replicado!',
        explain:{
          title:'¡ADN completamente replicado!',
          text:'En la <strong>Fase S</strong> del ciclo celular, cada cromosoma fue copiado con una precisión increíble: solo 1 error por cada 1.000 millones de bases. Ahora el núcleo tiene el <strong>doble de material genético</strong>. Cada cromosoma consiste de dos <strong>cromátidas hermanas</strong> unidas en el centrómero — listas para ser repartidas entre las células hijas.'
        }},
      { step:2,
        instruction:'El centrosoma debe migrar al polo norte para organizar el huso. <strong>Arrastrá el centrosoma</strong> al polo superior.',
        molecule:{sym:'Cent',label:'Centrosoma',color:'rgba(0,229,255,0.92)',border:'#00e5ff',r:20},
        molSvgX:164, molSvgY:142,
        target:{x:160, y:76, r:28}, targetLabel:'Polo Norte',
        xp:10, feedback:'¡Huso iniciado!',
        explain:{
          title:'¡Huso mitótico en formación!',
          text:'El <strong>centrosoma</strong> es el centro organizador de microtúbulos (MTOC). Al migrar al polo, nucleó el crecimiento de cientos de microtúbulos que forman el <strong>huso mitótico</strong>. Estos microtúbulos buscarán los cinetocoros de cada cromosoma. Sin el huso, los cromosomas no podrían separarse — la célula quedaría atrapada en profase.'
        }},
      { step:3,
        instruction:'En la Metafase, cada cromosoma debe alinearse en el centro. <strong>Arrastrá el cromosoma</strong> a la placa ecuatorial.',
        molecule:{sym:'Chr',label:'Cromosoma',color:'rgba(124,58,237,0.92)',border:'#7c3aed',r:22},
        molSvgX:80, molSvgY:90,
        target:{x:160, y:158, r:38}, targetLabel:'Placa Ecuatorial',
        xp:10, feedback:'¡Alineado!',
        explain:{
          title:'¡Cromosoma alineado en la placa ecuatorial!',
          text:'Cuando los microtúbulos de <strong>ambos polos</strong> se unen al cinetocoro del cromosoma con la misma tensión, el cromosoma queda perfectamente centrado. El <strong>checkpoint SAC</strong> (vigilante del ensamblado del huso) verifica que todos los cromosomas estén correctamente alineados — si hay uno solo mal ubicado, la división se detiene.'
        }},
      { step:4,
        instruction:'¡Las cohesinas se cortaron! La cromátida debe ir al polo sur. <strong>Arrastrála</strong> al polo inferior.',
        molecule:{sym:'Cro',label:'Cromátida',color:'rgba(139,92,246,0.92)',border:'#8b5cf6',r:20},
        molSvgX:90, molSvgY:155,
        target:{x:160, y:238, r:30}, targetLabel:'Polo Sur',
        xp:10, feedback:'¡Anafase completada!',
        explain:{
          title:'¡Anafase: cromátidas separadas!',
          text:'La enzima <strong>separina</strong> cortó las cohesinas que mantenían unidas las cromátidas hermanas. Los microtúbulos se despolimerizaron "jalando" cada cromátida hacia su polo. En este momento la célula tiene <strong>92 cromátidas</strong> moviéndose simultáneamente — 46 hacia arriba y 46 hacia abajo — todo en perfecta sincronía.'
        }},
      { step:5,
        instruction:'Para dividir el citoplasma, el anillo contráctil debe ubicarse en el ecuador. <strong>Arrastrá la actina</strong> al ecuador de la célula.',
        molecule:{sym:'Act',label:'Actomiosina',color:'rgba(236,72,153,0.92)',border:'#ec4899',r:22},
        molSvgX:260, molSvgY:230,
        target:{x:160, y:158, r:32}, targetLabel:'Ecuador',
        xp:10, feedback:'¡Citocinesis!',
        explain:{
          title:'¡Citocinesis iniciada!',
          text:'El anillo de <strong>actina y miosina II</strong> se formó en el ecuador de la célula. Al contraerse como un cinturón, estrechó el citoplasma hasta separarlo en dos. El proceso finaliza en el <strong>cuerpo medio</strong> (midbody), donde la abscisión final separa definitivamente las dos células hijas — ¡cada una perfectamente completa!'
        }},
    ];
  }



  // ══════════════════════════════════════════════
  // DEFENSA INMUNE — MODO CINE (7 pasos)
  // ══════════════════════════════════════════════
  function _stepsDefensa(){
    return [

      // ── Paso 1: Patógeno detectado ──────────────────────────────
      { title:'🦠 Patógeno detectado',
        narration:'Un patógeno (bacteria o virus) ha ingresado al organismo. Las células centinela del sistema inmune innato están patrullando los tejidos.',
        info:'La <strong>inmunidad innata</strong> es la primera línea de defensa: responde en minutos-horas sin necesidad de aprender. Los <strong>macrófagos y neutrófilos</strong> patrullan constantemente en busca de señales de peligro.',
        annotations:[
          {text:['🦠 Patógeno','detectado'],      bx:195, by:55,  tx:255, ty:38},
          {text:['🛡️ Macrófago','patrullando'],   bx:95,  by:55,  tx:30,  ty:68},
        ],
        svg:_cell('d0',
          `<ellipse cx="290" cy="55" rx="18" ry="14" fill="rgba(239,68,68,0.18)" stroke="rgba(239,68,68,0.9)" stroke-width="2"/>
           <line x1="285" y1="41" x2="285" y2="34" stroke="rgba(239,68,68,0.8)" stroke-width="1.5"/>
           <line x1="290" y1="41" x2="292" y2="33" stroke="rgba(239,68,68,0.8)" stroke-width="1.5"/>
           <line x1="295" y1="42" x2="298" y2="35" stroke="rgba(239,68,68,0.8)" stroke-width="1.5"/>
           <line x1="280" y1="44" x2="274" y2="38" stroke="rgba(239,68,68,0.8)" stroke-width="1.5"/>
           <line x1="284" y1="50" x2="277" y2="50" stroke="rgba(239,68,68,0.8)" stroke-width="1.5"/>
           <line x1="295" y1="50" x2="302" y2="48" stroke="rgba(239,68,68,0.8)" stroke-width="1.5"/>
           <text x="290" y="60" text-anchor="middle" font-size="9" fill="rgba(239,68,68,0.9)" font-weight="bold">BACT</text>
           <circle cx="290" cy="55" r="18" fill="none" stroke="rgba(239,68,68,0.6)" stroke-width="1.5" stroke-dasharray="4 3" style="animation:threatPulse 1.2s ease-in-out infinite"/>`,
          'Los patógenos llevan en su superficie patrones moleculares únicos (PAMPs) que las células inmunes reconocen como "señal de peligro".',
          '@keyframes threatPulse{0%,100%{opacity:0.4;r:18}50%{opacity:1;r:21}}'
        )
      },

      // ── Paso 2: Reconocimiento TLR ──────────────────────────────
      { title:'🔍 Reconocimiento — Receptores TLR',
        narration:'Los receptores TLR (Toll-like Receptors) de la membrana del macrófago detectan los PAMPs del patógeno. ¡Alarma activada!',
        info:'Los <strong>Toll-like Receptors (TLR)</strong> son proteínas de la membrana que reconocen patrones moleculares asociados a patógenos (<strong>PAMPs</strong>): lipopolisacáridos bacterianos, flagelinas, ARN viral doble cadena. Activarlos dispara la cascada inflamatoria y fagocítica.',
        annotations:[
          {text:['🔑 TLR','receptor activo'],    bx:165, by:95,  tx:248, ty:101},
          {text:['🦠 PAMP','del patógeno'],      bx:165, by:45,  tx:252, ty:45},
        ],
        svg:_cell('d1',
          `<ellipse cx="290" cy="55" rx="18" ry="14" fill="rgba(239,68,68,0.18)" stroke="rgba(239,68,68,0.7)" stroke-width="1.5"/>
           <text x="290" y="60" text-anchor="middle" font-size="9" fill="rgba(239,68,68,0.8)" font-weight="bold">PAMP</text>
           <rect x="264" y="108" width="14" height="36" rx="7" fill="rgba(245,158,11,0.3)" stroke="rgba(245,158,11,0.95)" stroke-width="2.5" style="animation:tlrGlow 1s 0.2s ease-in-out infinite"/>
           <rect x="264" y="115" width="8" height="22" rx="4" fill="rgba(245,158,11,0.6)"/>
           <line x1="271" y1="108" x2="287" y2="69" stroke="rgba(245,158,11,0.7)" stroke-width="1.5" stroke-dasharray="4 3" style="animation:tlrGlow 1s 0.4s ease-in-out infinite"/>
           <circle cx="287" cy="66" r="5" fill="rgba(245,158,11,0.4)" stroke="rgba(245,158,11,0.9)" stroke-width="1.5" style="animation:tlrGlow 1s 0.6s ease-in-out infinite"/>`,
          'Un solo macrófago puede tener decenas de TLRs diferentes. La unión PAMP–TLR activa NF-κB, factor de transcripción que enciende genes de respuesta inmune.',
          '@keyframes tlrGlow{0%,100%{opacity:0.5}50%{opacity:1}}'
        )
      },

      // ── Paso 3: Fagocitosis ──────────────────────────────────────
      { title:'🧲 Fagocitosis — El macrófago ataca',
        narration:'El macrófago extiende pseudópodos alrededor del patógeno y lo engulle, formando un fagosoma en el citoplasma.',
        info:'La <strong>fagocitosis</strong> es un proceso activo (requiere ATP y reorganización del citoesqueleto de actina). El macrófago rodea al patógeno con extensiones de membrana (<strong>pseudópodos</strong>) hasta encerrarlo en una vesícula llamada <strong>fagosoma</strong>.',
        annotations:[
          {text:['🌀 Pseudópodo','rodea patógeno'],  bx:68,  by:58,  tx:170, ty:58},
          {text:['📦 Fagosoma','formándose'],         bx:60,  by:118, tx:148, ty:118},
        ],
        svg:_cell('d2',
          `<ellipse cx="175" cy="88" rx="28" ry="22" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.8)" stroke-width="2" stroke-dasharray="6 3" style="animation:fagGrow 1.4s ease-in-out infinite"/>
           <ellipse cx="175" cy="88" rx="15" ry="12" fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,0.85)" stroke-width="1.5"/>
           <text x="175" y="92" text-anchor="middle" font-size="8" fill="rgba(239,68,68,0.9)" font-weight="bold">BACT</text>
           <path d="M152 78 Q148 70 155 65 Q165 58 175 66" fill="none" stroke="rgba(245,158,11,0.9)" stroke-width="2.5" stroke-linecap="round" style="animation:fagGrow 1.4s 0.2s ease-in-out infinite"/>
           <path d="M198 78 Q202 70 196 65 Q186 58 176 66" fill="none" stroke="rgba(245,158,11,0.9)" stroke-width="2.5" stroke-linecap="round" style="animation:fagGrow 1.4s 0.4s ease-in-out infinite"/>`,
          'Los pseudópodos están formados por filamentos de actina que se polimerizan rápidamente. Una vez cerrado el fagosoma, el patógeno queda atrapado dentro de la célula.',
          '@keyframes fagGrow{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}'
        )
      },

      // ── Paso 4: Digestión lisosómica ─────────────────────────────
      { title:'⚗️ Digestión — Lisosoma en acción',
        narration:'El fagosoma se fusiona con un lisosoma formando el fagolisosoma. Enzimas hidrolíticas degradan al patógeno en fragmentos pequeños.',
        info:'El <strong>fagolisosoma</strong> es altamente ácido (pH ~4.5) y contiene más de 50 tipos de enzimas: proteasas, lipasas, nucleasas. Además, la <strong>NADPH oxidasa</strong> genera radicales libres de oxígeno (burst oxidativo) que destruyen las membranas bacterianas.',
        annotations:[
          {text:['🧫 Lisosoma','enzimas ácidas'],   bx:210, by:198, tx:95,  ty:198},
          {text:['💥 Fagolisosoma','pH 4.5'],       bx:210, by:155, tx:68,  ty:155},
        ],
        svg:_cell('d3',
          `<circle cx="128" cy="215" r="16" fill="rgba(236,72,153,0.2)" stroke="rgba(236,72,153,0.95)" stroke-width="2.5" style="animation:lysoGlow 1.2s ease-in-out infinite"/>
           <text x="128" y="219" text-anchor="middle" font-size="8" fill="rgba(236,72,153,0.95)" font-weight="bold">LYS</text>
           <ellipse cx="110" cy="175" rx="24" ry="20" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.8)" stroke-width="2" style="animation:lysoGlow 1.2s 0.3s ease-in-out infinite"/>
           <text x="110" y="179" text-anchor="middle" font-size="7" fill="rgba(245,158,11,0.9)">fago+</text>
           <text x="110" y="188" text-anchor="middle" font-size="7" fill="rgba(245,158,11,0.9)">liso</text>
           <path d="M128 199 Q119 192 110 195" fill="none" stroke="rgba(245,158,11,0.7)" stroke-width="2" marker-end="url(#aWd3)"/>
           <line x1="98" y1="163" x2="95" y2="156" stroke="rgba(245,158,11,0.6)" stroke-width="1.5"/>
           <text x="88" y="154" font-size="8" fill="rgba(245,158,11,0.8)">💥</text>`,
          'Tras la digestión, los péptidos resultantes son transportados al retículo endoplásmico para unirse a las moléculas MHC-II, preparando la siguiente fase: la presentación antigénica.',
          '@keyframes lysoGlow{0%,100%{opacity:0.5}50%{opacity:1}}'
        )
      },

      // ── Paso 5: Presentación antigénica MHC-II ──────────────────
      { title:'🔑 Presentación Antigénica — MHC-II',
        narration:'El macrófago presenta los fragmentos del patógeno (antígenos) en su membrana usando proteínas MHC-II. Es la señal para activar los linfocitos T.',
        info:'Las proteínas del <strong>Complejo Mayor de Histocompatibilidad II (MHC-II)</strong> son el "tablero de exhibición" de las células presentadoras de antígeno. Transportan péptidos del fagolisosoma a la superficie celular para ser reconocidos por los linfocitos T CD4+ (helper).',
        annotations:[
          {text:['🔑 MHC-II','presenta antígeno'],  bx:135, by:100, tx:10,  ty:100},
          {text:['🔬 Linfocito T','CD4+ helper'],   bx:135, by:58,  tx:20,  ty:58},
        ],
        svg:_cell('d4',
          `<rect x="8" y="115" width="16" height="38" rx="8" fill="rgba(245,158,11,0.3)" stroke="rgba(245,158,11,0.95)" stroke-width="2.5" style="animation:mhcGlow 1.1s ease-in-out infinite"/>
           <rect x="11" y="122" width="10" height="24" rx="5" fill="rgba(245,158,11,0.6)"/>
           <ellipse cx="38" cy="58" rx="22" ry="18" fill="rgba(0,229,255,0.15)" stroke="rgba(0,229,255,0.85)" stroke-width="2" style="animation:mhcGlow 1.1s 0.4s ease-in-out infinite"/>
           <text x="38" y="57" text-anchor="middle" font-size="7" fill="rgba(0,229,255,0.9)">TCR</text>
           <text x="38" y="66" text-anchor="middle" font-size="7" fill="rgba(0,229,255,0.9)">CD4+</text>
           <path d="M16 115 Q27 90 38 76" fill="none" stroke="rgba(245,158,11,0.6)" stroke-width="1.5" stroke-dasharray="4 3" style="animation:mhcGlow 1.1s 0.6s ease-in-out infinite"/>`,
          'Si el TCR del linfocito T "encaja" con el complejo MHC-II+péptido (unión altamente específica), el linfocito T se activa. Sin esta señal, no hay respuesta inmune adaptativa.',
          '@keyframes mhcGlow{0%,100%{opacity:0.5}50%{opacity:1}}'
        )
      },

      // ── Paso 6: Activación de linfocitos B y anticuerpos ─────────
      { title:'💉 Anticuerpos — Linfocitos B activados',
        narration:'El linfocito T helper libera citocinas que activan los linfocitos B. Estos se diferencian en células plasmáticas y producen anticuerpos (inmunoglobulinas).',
        info:'Los <strong>anticuerpos (IgG, IgM, IgA, IgE, IgD)</strong> son proteínas en forma de Y que se unen con alta especificidad al antígeno. Actúan neutralizando patógenos, marcándolos para fagocitosis (<strong>opsonización</strong>) o activando el sistema del complemento.',
        annotations:[
          {text:['🛡️ Anticuerpo IgG','secretado'],        bx:72,  by:72,  tx:72,  ty:32},
          {text:['💉 Linfocito B','→ célula plasmática'], bx:216, by:72,  tx:216, ty:32},
        ],
        svg:_cell('d5',
          `<ellipse cx="240" cy="55" rx="22" ry="18" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.85)" stroke-width="2" style="animation:bGlow 1.3s ease-in-out infinite"/>
           <text x="240" y="54" text-anchor="middle" font-size="8" fill="rgba(16,185,129,0.9)">B cell</text>
           <text x="240" y="64" text-anchor="middle" font-size="7" fill="rgba(16,185,129,0.8)">→ IgG</text>
           <path d="M92 52 L92 70 M80 61 L92 52 L104 61" fill="none" stroke="rgba(245,158,11,0.9)" stroke-width="2.5" stroke-linecap="round" style="animation:bGlow 1.3s 0.2s ease-in-out infinite"/>
           <path d="M84 70 L100 70" stroke="rgba(245,158,11,0.9)" stroke-width="2.5" stroke-linecap="round" style="animation:bGlow 1.3s 0.2s ease-in-out infinite"/>
           <path d="M88 70 L84 80" stroke="rgba(245,158,11,0.8)" stroke-width="2" stroke-linecap="round"/>
           <path d="M96 70 L100 80" stroke="rgba(245,158,11,0.8)" stroke-width="2" stroke-linecap="round"/>
           <path d="M148 52 L148 70 M136 61 L148 52 L160 61" fill="none" stroke="rgba(245,158,11,0.7)" stroke-width="2" stroke-linecap="round" style="animation:bGlow 1.3s 0.5s ease-in-out infinite"/>
           <path d="M140 70 L156 70" stroke="rgba(245,158,11,0.7)" stroke-width="2" stroke-linecap="round" style="animation:bGlow 1.3s 0.5s ease-in-out infinite"/>
           <path d="M144 70 L140 80" stroke="rgba(245,158,11,0.6)" stroke-width="1.5" stroke-linecap="round"/>
           <path d="M152 70 L156 80" stroke="rgba(245,158,11,0.6)" stroke-width="1.5" stroke-linecap="round"/>`,
          'Un solo linfocito B activado puede convertirse en una célula plasmática capaz de secretar hasta 2.000 anticuerpos por segundo. La producción alcanza su pico en 5–7 días.',
          '@keyframes bGlow{0%,100%{opacity:0.5}50%{opacity:1}}'
        )
      },

      // ── Paso 7: Memoria inmunológica ─────────────────────────────
      { title:'🧬 Memoria Inmunológica — Protección duradera',
        narration:'Una vez eliminado el patógeno, algunas células B y T de memoria quedan en circulación durante años, listas para responder mucho más rápido ante una reinfección.',
        info:'Las <strong>células de memoria</strong> (B y T) son la base de las vacunas. En una segunda exposición, la respuesta es 100–1000× más rápida y potente que la primera vez. Las células de memoria pueden sobrevivir décadas, proporcionando <strong>inmunidad duradera</strong>.',
        annotations:[
          {text:['🔬 Célula T memoria','CD4+/CD8+'],  bx:80,  by:78,  tx:80,  ty:36},
          {text:['💉 Célula B memoria','IgG/IgA'],    bx:216, by:78,  tx:216, ty:36},
        ],
        svg:_cell('d6',
          `<ellipse cx="80" cy="52" rx="20" ry="16" fill="rgba(0,229,255,0.15)" stroke="rgba(0,229,255,0.85)" stroke-width="2" style="animation:memGlow 2s ease-in-out infinite"/>
           <text x="80" y="51" text-anchor="middle" font-size="8" fill="rgba(0,229,255,0.9)">Tm</text>
           <text x="80" y="61" text-anchor="middle" font-size="7" fill="rgba(0,229,255,0.7)">CD4+/CD8+</text>
           <ellipse cx="216" cy="52" rx="20" ry="16" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.85)" stroke-width="2" style="animation:memGlow 2s 0.6s ease-in-out infinite"/>
           <text x="216" y="51" text-anchor="middle" font-size="8" fill="rgba(16,185,129,0.9)">Bm</text>
           <text x="216" y="61" text-anchor="middle" font-size="7" fill="rgba(16,185,129,0.7)">IgG/IgA</text>
           <path d="M115 50 Q148 38 181 50" fill="none" stroke="rgba(245,158,11,0.5)" stroke-width="1.5" stroke-dasharray="5 4"/>
           <text x="148" y="34" text-anchor="middle" font-size="8" fill="rgba(245,158,11,0.8)">años de protección</text>
           <circle cx="148" cy="38" r="14" fill="none" stroke="rgba(245,158,11,0.4)" stroke-width="1.5" stroke-dasharray="3 3" style="animation:memGlow 2s 1s ease-in-out infinite"/>`,
          '¡Por eso las vacunas funcionan! Introducen un antígeno inofensivo para crear memoria sin enfermar. La segunda exposición al patógeno real es neutralizada antes de que cause síntomas.',
          '@keyframes memGlow{0%,100%{opacity:0.4}50%{opacity:1}}'
        )
      },

    ];
  }

  // ══════════════════════════════════════════════
  // DEFENSA INMUNE — MODO JUGADOR (5 rondas)
  // ══════════════════════════════════════════════
  function _juegoRoundsDefensa(){
    return [

      // Ronda 1 — TLR reconoce patógeno en membrana
      { step:1,
        instruction:'Un patógeno está en la membrana. <strong>Arrastrá el patógeno</strong> al receptor TLR para activar la defensa.',
        molecule:{sym:'Pat', label:'🦠 Patógeno', color:'rgba(239,68,68,0.92)', border:'#ef4444', r:24},
        molSvgX:160, molSvgY:36,
        target:{x:273, y:126, r:30}, targetLabel:'🔍 Receptor TLR',
        xp:10, feedback:'¡Reconocimiento activado!',
        explain:{
          title:'¡Receptor TLR activado!',
          text:'El <strong>Toll-like Receptor (TLR)</strong> en la membrana reconoció los patrones moleculares del patógeno (PAMPs). Esta unión dispara la cascada inflamatoria: NF-κB se activa y el gen de decenas de citocinas pro-inflamatorias se enciende. El macrófago está listo para atacar.'
        }},

      // Ronda 2 — Fagosoma se forma en citoplasma
      { step:2,
        instruction:'El patógeno fue engullido. <strong>Arrastrá el fagosoma</strong> al citoplasma para iniciar la digestión.',
        molecule:{sym:'Fag', label:'🎯 Fagosoma', color:'rgba(245,158,11,0.92)', border:'#f59e0b', r:22},
        molSvgX:285, molSvgY:60,
        target:{x:180, y:138, r:36}, targetLabel:'💧 Citoplasma',
        xp:10, feedback:'¡Fagocitosis completa!',
        explain:{
          title:'¡Fagosoma formado!',
          text:'El macrófago extendió sus <strong>pseudópodos</strong> y engulló al patógeno, encerrándolo en un <strong>fagosoma</strong> dentro del citoplasma. La reorganización de actina requirió energía ATP. Ahora el fagosoma comenzará a moverse hacia los lisosomas para el siguiente paso: la digestión.'
        }},

      // Ronda 3 — Enzimas lisosómicas degradan patógeno
      { step:3,
        instruction:'Las enzimas lisosómicas deben degradar el patógeno. <strong>Arrastrá la enzima</strong> al lisosoma.',
        molecule:{sym:'Enz', label:'⚗️ Enzima', color:'rgba(236,72,153,0.92)', border:'#ec4899', r:22},
        molSvgX:62, molSvgY:58,
        target:{x:128, y:215, r:30}, targetLabel:'🧫 Lisosoma',
        xp:10, feedback:'¡Digestión enzimática!',
        explain:{
          title:'¡Fagolisosoma activo!',
          text:'El lisosoma fusionó con el fagosoma formando el <strong>fagolisosoma</strong>. Su pH ácido (4.5) activa más de 50 enzimas hidrolíticas: proteasas, lipasas, nucleasas. El <strong>burst oxidativo</strong> (NADPH oxidasa) genera radicales de oxígeno que destruyen la membrana bacteriana. El patógeno queda fragmentado en péptidos.'
        }},

      // Ronda 4 — Complejo MHC-II presenta antígeno en membrana
      { step:4,
        instruction:'El péptido debe unirse al MHC-II. <strong>Arrastrá el péptido</strong> al núcleo para la presentación antigénica.',
        molecule:{sym:'Pep', label:'🔑 Péptido', color:'rgba(245,158,11,0.92)', border:'#f59e0b', r:22},
        molSvgX:256, molSvgY:240,
        target:{x:122, y:108, r:36}, targetLabel:'🧬 Núcleo (MHC-II)',
        xp:10, feedback:'¡Antígeno presentado!',
        explain:{
          title:'¡Presentación antigénica lista!',
          text:'Los péptidos del patógeno digerido se unieron a las proteínas <strong>MHC-II</strong> (sintetizadas en el retículo endoplásmico y codificadas en el núcleo). El complejo MHC-II + péptido viaja a la membrana donde puede ser reconocido por el <strong>receptor TCR</strong> de los linfocitos T CD4+ helper, activando la inmunidad adaptativa.'
        }},

      // Ronda 5 — Anticuerpos secretados por membrana izquierda
      { step:5,
        instruction:'Los anticuerpos están listos. <strong>Arrastrá el anticuerpo IgG</strong> a la membrana para secretarlo por exocitosis.',
        molecule:{sym:'IgG', label:'🛡️ Anticuerpo', color:'rgba(245,158,11,0.92)', border:'#f59e0b', r:22},
        molSvgX:278, molSvgY:138,
        target:{x:15, y:135, r:30}, targetLabel:'📤 Membrana (exocitosis)',
        xp:10, feedback:'¡Defensa inmune completa!',
        explain:{
          title:'¡Anticuerpos secretados!',
          text:'Las células plasmáticas (linfocitos B diferenciados) producen y secretan <strong>anticuerpos IgG</strong> por <strong>exocitosis</strong> a través de la membrana. Cada anticuerpo tiene dos sitios de unión altamente específicos para el antígeno. Al unirse, neutralizan el patógeno, lo marcan para fagocitosis (<strong>opsonización</strong>) y activan el complemento. ¡La infección está controlada!'
        }},

    ];
  }

  // ══════════════════════════════════════════════
  // SÍNTESIS DE PROTEÍNAS — 7 PASOS
  // ══════════════════════════════════════════════
  function _stepsSintesis(){
    return [

      // ── Paso 0: Vista general ─────────────────────────────────────
      { title:'🧬 El ADN contiene las instrucciones',
        narration:'Dentro del núcleo de cada célula hay un manual de instrucciones increíblemente largo: el <strong>ADN</strong>. Cada gen es una receta que indica cómo construir una proteína específica. Sin proteínas, la célula no puede funcionar.',
        info:'<b>Definición científica:</b> La síntesis de proteínas (expresión génica) convierte la información del ADN en proteínas funcionales. El proceso central sigue el <strong>Dogma Central de la Biología Molecular</strong>: ADN → ARNm → Proteína. En humanos, hay ~20.000 genes codificantes de proteínas que se expresan selectivamente según el tipo celular y el momento.',
        annotations:[
          {text:['🧬 Núcleo','Guarda el ADN'],                          bx:50,  by:80,  tx:112, ty:93},
          {text:['🔩 Ribosoma','Ensambla proteínas'],                   bx:270, by:185, tx:168, ty:172},
          {text:['🏭 RE rugoso','Procesa proteínas'],                   bx:88,  by:195, tx:160, ty:174},
          {text:['📦 Golgi','Empaqueta y envía'],                       bx:270, by:235, tx:218, ty:218},
        ],
        svg: _cell('p0',`
          <text x="122" y="72" text-anchor="middle" font-size="8.5" fill="rgba(167,139,250,0.9)" font-family="sans-serif" font-weight="bold">Núcleo</text>
          <text x="180" y="163" text-anchor="middle" font-size="7.5" fill="rgba(251,191,36,0.85)" font-family="sans-serif">RE rugoso</text>
          <text x="215" y="208" text-anchor="middle" font-size="7.5" fill="rgba(245,158,11,0.65)" font-family="sans-serif">Golgi</text>
          <text x="100" y="142" text-anchor="middle" font-size="7.5" fill="rgba(251,191,36,0.75)" font-family="sans-serif">Ribosoma</text>
          <text x="160" y="52" text-anchor="middle" font-size="9" fill="rgba(6,182,212,0.5)" font-family="sans-serif" font-style="italic">CITOPLASMA</text>
          <!-- ADN helix decoration inside nucleus -->
          <path d="M108 98 Q113 104 108 110 Q103 116 108 122" fill="none" stroke="rgba(167,139,250,0.7)" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M116 98 Q111 104 116 110 Q121 116 116 122" fill="none" stroke="rgba(200,180,255,0.6)" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="108" y1="101" x2="116" y2="101" stroke="rgba(167,139,250,0.5)" stroke-width="1.2"/>
          <line x1="109" y1="107" x2="115" y2="107" stroke="rgba(167,139,250,0.5)" stroke-width="1.2"/>
          <line x1="108" y1="113" x2="116" y2="113" stroke="rgba(167,139,250,0.5)" stroke-width="1.2"/>
          <line x1="109" y1="119" x2="115" y2="119" stroke="rgba(167,139,250,0.5)" stroke-width="1.2"/>
        `, 'ADN → ARNm → Proteína: el Dogma Central de la Biología',
        `@keyframes helixPulse{0%,100%{opacity:0.6}50%{opacity:1}}`) },

      // ── Paso 1: Transcripción ─────────────────────────────────────
      { title:'📋 Transcripción — ARN polimerasa copia el gen',
        narration:'La <strong>ARN polimerasa</strong> se adhiere al ADN en el núcleo y comienza a leer el gen, construyendo una copia en ARN mensajero (ARNm). Es como fotocopiar solo la receta que necesitás.',
        info:'La <strong>ARN polimerasa II</strong> (en eucariotas) reconoce el promotor del gen, separa las dos hebras del ADN y sintetiza el ARNm en dirección 5′→3′. El ARNm resultante recibe un <strong>cap 5′</strong> y una cola <strong>polyA 3′</strong> que lo protegen de la degradación y facilitan su exportación al citoplasma.',
        annotations:[
          {text:['📋 ARN pol II','Lee el gen'],                         bx:50,  by:70,  tx:115, ty:100},
          {text:['🧬 ADN','Molde de información'],                      bx:80,  by:135, tx:120, ty:115},
          {text:['📜 ARNm','Copia del gen'],                            bx:200, by:80,  tx:145, ty:105},
        ],
        svg: _cell('p1',`
          <!-- ARN polimerasa — inside nucleus -->
          <ellipse cx="125" cy="100" rx="12" ry="9" fill="rgba(6,182,212,0.3)" stroke="rgba(6,182,212,0.95)" stroke-width="2" style="animation:polGlow 1.1s ease-in-out infinite"/>
          <text x="125" y="103" text-anchor="middle" font-size="7" fill="rgba(6,182,212,0.95)" font-weight="bold">RNAP</text>
          <!-- mRNA strand emerging from nucleus -->
          <path d="M133 105 Q140 108 145 112 Q152 118 155 125 Q158 132 160 140" fill="none" stroke="rgba(6,182,212,0.85)" stroke-width="2.2" stroke-dasharray="5 3" style="animation:strandFlow 1.5s ease-in-out infinite"/>
          <!-- mRNA label -->
          <text x="168" y="128" font-size="8" fill="rgba(6,182,212,0.9)" font-weight="bold" font-family="sans-serif">ARNm</text>
          <!-- 5' cap indicator -->
          <circle cx="133" cy="105" r="4" fill="rgba(6,182,212,0.5)" stroke="rgba(6,182,212,0.9)" stroke-width="1.5" style="animation:polGlow 1.1s 0.4s ease-in-out infinite"/>
          <text x="133" y="108" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.9)">5'</text>
        `, 'La ARN polimerasa lee el ADN y sintetiza el ARNm en el núcleo',
        `@keyframes polGlow{0%,100%{opacity:0.5}50%{opacity:1}}
         @keyframes strandFlow{0%,100%{stroke-dashoffset:0}100%{stroke-dashoffset:-16}}`) },

      // ── Paso 2: ARNm sale por el poro nuclear ────────────────────
      { title:'🚪 El ARNm sale por el poro nuclear',
        narration:'El ARNm maduro viaja desde el núcleo hasta el citoplasma pasando por los <strong>poros nucleares</strong>. Este tráfico es selectivo y regulado — no cualquier molécula puede pasar.',
        info:'Los <strong>poros nucleares</strong> son complejos proteicos de ~120 MDa formados por ~30 nucleoporinas diferentes. El ARNm sale en forma de <strong>ribonucleoproteína (RNP)</strong>, unido a proteínas de exportación. Las <strong>exportinas</strong> reconocen la señal de exportación y facilitan el transporte activo (requiere GTPasa Ran).',
        annotations:[
          {text:['🚪 Poro nuclear','Controla el tráfico'],              bx:200, by:62,  tx:140, ty:82},
          {text:['📜 ARNm','Abandona el núcleo'],                       bx:240, by:128, tx:175, ty:145},
          {text:['🧬 Núcleo','Queda el ADN original'],                  bx:52,  by:85,  tx:110, ty:100},
        ],
        svg: _cell('p2',`
          <!-- Highlight nuclear pore (upper right) -->
          <circle cx="140" cy="90" r="7" fill="rgba(6,182,212,0.25)" stroke="rgba(6,182,212,0.95)" stroke-width="2.2" style="animation:poreGlow 1.0s ease-in-out infinite"/>
          <text x="140" y="94" text-anchor="middle" font-size="5.5" fill="rgba(6,182,212,0.95)" font-weight="bold">PORO</text>
          <!-- mRNA thread going through pore into cytoplasm -->
          <path d="M140 97 Q142 110 148 122 Q155 138 162 148 Q170 158 178 165" fill="none" stroke="rgba(6,182,212,0.85)" stroke-width="2.5" stroke-linecap="round" style="animation:mrnaMov 1.8s ease-in-out infinite"/>
          <!-- mRNA end label in cytoplasm -->
          <text x="188" y="162" font-size="8" fill="rgba(6,182,212,0.9)" font-weight="bold" font-family="sans-serif">ARNm</text>
          <!-- Arrow direction -->
          <polygon points="178,165 172,158 185,157" fill="rgba(6,182,212,0.8)" style="animation:poreGlow 1.0s 0.5s ease-in-out infinite"/>
        `, 'Los poros nucleares regulan qué moléculas entran y salen del núcleo',
        `@keyframes poreGlow{0%,100%{opacity:0.4}50%{opacity:1}}
         @keyframes mrnaMov{0%,100%{stroke-dasharray:5 3;stroke-dashoffset:0}50%{stroke-dashoffset:-12}}`) },

      // ── Paso 3: Ribosoma — Traducción ────────────────────────────
      { title:'⚙️ Ribosoma — traducción del ARNm',
        narration:'En el citoplasma (o en el RE rugoso), el <strong>ribosoma</strong> se ensambla sobre el ARNm. Lee el mensaje de tres en tres nucleótidos (<strong>codones</strong>) y convoca a los aminoácidos correctos a través del ARN de transferencia (ARNt).',
        info:'Los <strong>ribosomas</strong> constan de dos subunidades (60S + 40S en eucariotas). El sitio A acepta el ARNt cargado, el sitio P sostiene la cadena creciente, el sitio E libera el ARNt vacío. Cada ciclo de elongación consume 2 GTP y avanza 1 codón (~15 aminoácidos/seg en mamíferos).',
        annotations:[
          {text:['⚙️ Ribosoma','60S + 40S'],                           bx:88,  by:150, tx:160, ty:167},
          {text:['📜 ARNm','El "programa" a leer'],                     bx:270, by:170, tx:195, ty:168},
          {text:['🔗 ARNt','Trae aminoácidos'],                         bx:270, by:130, tx:172, ty:154},
        ],
        svg: _cell('p3',`
          <!-- Ribosome complex on mRNA -->
          <ellipse cx="162" cy="160" rx="18" ry="12" fill="rgba(251,191,36,0.25)" stroke="rgba(251,191,36,0.95)" stroke-width="2.5" style="animation:ribAnim 1.2s ease-in-out infinite"/>
          <ellipse cx="162" cy="153" rx="14" ry="9" fill="rgba(251,191,36,0.35)" stroke="rgba(251,191,36,0.85)" stroke-width="1.8" style="animation:ribAnim 1.2s 0.3s ease-in-out infinite"/>
          <text x="162" y="158" text-anchor="middle" font-size="6.5" fill="rgba(255,220,50,0.95)" font-weight="bold">RIB</text>
          <!-- mRNA line through ribosome -->
          <path d="M100 163 L220 163" fill="none" stroke="rgba(6,182,212,0.7)" stroke-width="2" stroke-dasharray="4 2"/>
          <text x="230" y="167" font-size="7.5" fill="rgba(6,182,212,0.9)" font-family="sans-serif">ARNm →</text>
          <!-- tRNA coming in -->
          <path d="M175 132 L168 150" fill="none" stroke="rgba(52,211,153,0.8)" stroke-width="2" stroke-dasharray="4 2" style="animation:trnaMov 1.4s ease-in-out infinite"/>
          <circle cx="175" cy="128" r="6" fill="rgba(52,211,153,0.3)" stroke="rgba(52,211,153,0.9)" stroke-width="1.8" style="animation:trnaMov 1.4s 0.2s ease-in-out infinite"/>
          <text x="175" y="132" text-anchor="middle" font-size="5.5" fill="rgba(52,211,153,0.95)">ARNt</text>
          <!-- Growing peptide chain -->
          <circle cx="148" cy="150" r="4" fill="rgba(96,165,250,0.6)" stroke="rgba(96,165,250,0.9)" stroke-width="1.5"/>
          <circle cx="142" cy="146" r="4" fill="rgba(96,165,250,0.55)" stroke="rgba(96,165,250,0.8)" stroke-width="1.5"/>
          <circle cx="136" cy="143" r="4" fill="rgba(96,165,250,0.5)" stroke="rgba(96,165,250,0.75)" stroke-width="1.5"/>
        `, 'El ribosoma traduce el ARNm: cada codón (3 bases) especifica un aminoácido',
        `@keyframes ribAnim{0%,100%{opacity:0.6}50%{opacity:1}}
         @keyframes trnaMov{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}`) },

      // ── Paso 4: Cadena polipeptídica ─────────────────────────────
      { title:'🔗 Cadena polipeptídica — los aminoácidos se unen',
        narration:'El ribosoma une los aminoácidos uno a uno con <strong>enlaces peptídicos</strong>. La cadena crece hasta que el ribosoma encuentra un codón de stop. ¡La proteína "en crudo" está lista!',
        info:'El enlace peptídico se forma por reacción de condensación entre el grupo carboxilo (–COOH) de un aminoácido y el grupo amino (–NH₂) del siguiente, liberando agua. La cadena resultante se llama <strong>polipéptido</strong>. Se pliega espontáneamente en estructuras 3D específicas (α-hélices, láminas β) y con ayuda de chaperonas (como Hsp70).',
        annotations:[
          {text:['🔗 Enlace peptídico','Une aminoácidos'],              bx:82,  by:145, tx:148, ty:155},
          {text:['⚙️ Ribosoma activo','Lee el codón'],                  bx:270, by:155, tx:175, ty:163},
          {text:['🔴 Cadena crece','Desde N→C terminal'],               bx:52,  by:170, tx:110, ty:160},
        ],
        svg: _cell('p4',`
          <!-- Growing polypeptide chain -->
          <g style="animation:chainGrow 1.6s ease-in-out infinite">
            <circle cx="106" cy="158" r="5.5" fill="rgba(96,165,250,0.7)" stroke="rgba(96,165,250,1)" stroke-width="1.8"/>
            <line x1="111" y1="158" x2="117" y2="158" stroke="rgba(96,165,250,0.7)" stroke-width="1.8"/>
            <circle cx="122" cy="158" r="5.5" fill="rgba(167,139,250,0.7)" stroke="rgba(167,139,250,1)" stroke-width="1.8"/>
            <line x1="127" y1="158" x2="133" y2="158" stroke="rgba(167,139,250,0.7)" stroke-width="1.8"/>
            <circle cx="138" cy="158" r="5.5" fill="rgba(52,211,153,0.7)" stroke="rgba(52,211,153,1)" stroke-width="1.8"/>
            <line x1="143" y1="158" x2="149" y2="158" stroke="rgba(52,211,153,0.7)" stroke-width="1.8"/>
            <circle cx="154" cy="158" r="5.5" fill="rgba(245,158,11,0.7)" stroke="rgba(245,158,11,1)" stroke-width="1.8"/>
            <line x1="159" y1="158" x2="165" y2="158" stroke="rgba(245,158,11,0.7)" stroke-width="1.8"/>
          </g>
          <!-- Active ribosome -->
          <ellipse cx="172" cy="163" rx="16" ry="11" fill="rgba(251,191,36,0.28)" stroke="rgba(251,191,36,0.95)" stroke-width="2.5" style="animation:ribAnim2 1.2s ease-in-out infinite"/>
          <text x="172" y="167" text-anchor="middle" font-size="6.5" fill="rgba(255,220,50,0.95)" font-weight="bold">RIB</text>
          <!-- mRNA -->
          <path d="M90 163 L230 163" fill="none" stroke="rgba(6,182,212,0.55)" stroke-width="1.8" stroke-dasharray="4 2"/>
          <!-- New AA incoming -->
          <circle cx="195" cy="143" r="5.5" fill="rgba(239,68,68,0.45)" stroke="rgba(239,68,68,0.9)" stroke-width="1.8" style="animation:chainGrow 1.6s 0.4s ease-in-out infinite"/>
          <line x1="193" y1="148" x2="186" y2="155" stroke="rgba(239,68,68,0.7)" stroke-width="1.5" stroke-dasharray="3 2" style="animation:chainGrow 1.6s 0.4s ease-in-out infinite"/>
          <!-- Labels -->
          <text x="100" y="178" text-anchor="middle" font-size="7" fill="rgba(96,165,250,0.8)" font-family="sans-serif">N-terminal</text>
          <text x="200" y="140" font-size="7" fill="rgba(239,68,68,0.85)" font-family="sans-serif">+AA</text>
        `, 'Los aminoácidos se unen de forma secuencial por enlaces peptídicos',
        `@keyframes chainGrow{0%,100%{opacity:0.6}50%{opacity:1}}
         @keyframes ribAnim2{0%,100%{opacity:0.6}50%{opacity:1}}`) },

      // ── Paso 5: RE rugoso → Golgi ─────────────────────────────────
      { title:'📦 RE rugoso → Golgi — empaquetado y envío',
        narration:'Las proteínas destinadas a ser secretadas o enviadas a lisosomas entran al <strong>Retículo Endoplásmico rugoso</strong> donde se pliegan correctamente. Luego el <strong>aparato de Golgi</strong> las empaqueta en vesículas según su destino.',
        info:'El <strong>RE rugoso</strong> (rugoso por los ribosomas adheridos) añade modificaciones post-traduccionales: glicosilación (azúcares), formación de puentes disulfuro, plegamiento. El <strong>Golgi</strong> actúa como oficina postal: recibe, modifica (fosforilación, sulfatación) y dirige las vesículas según señales de direccionamiento (ej. manosa-6-fosfato → lisosoma).',
        annotations:[
          {text:['🏭 RE rugoso','Pliega proteínas'],                    bx:88,  by:190, tx:165, ty:175},
          {text:['📦 Golgi','Clasifica y envía'],                       bx:270, by:230, tx:218, ty:218},
          {text:['🫧 Vesícula','Transporta al destino'],                bx:270, by:195, tx:248, ty:222},
        ],
        svg: _cell('p5',`
          <!-- ER highlight with protein inside -->
          <path d="M148 175 Q162 166 178 174 Q194 182 210 174" fill="none" stroke="rgba(6,182,212,0.9)" stroke-width="2.8" stroke-linecap="round" style="animation:erGlow 1.3s ease-in-out infinite"/>
          <path d="M140 195 Q155 186 172 194 Q188 202 204 193" fill="none" stroke="rgba(6,182,212,0.75)" stroke-width="2.2" stroke-linecap="round" style="animation:erGlow 1.3s 0.3s ease-in-out infinite"/>
          <!-- Protein in ER lumen -->
          <circle cx="172" cy="182" r="7" fill="rgba(6,182,212,0.3)" stroke="rgba(6,182,212,0.85)" stroke-width="1.8" style="animation:erGlow 1.3s 0.5s ease-in-out infinite"/>
          <text x="172" y="186" text-anchor="middle" font-size="5.5" fill="rgba(6,182,212,0.95)">Prot</text>
          <!-- Vesicle ER → Golgi -->
          <circle cx="226" cy="200" r="8" fill="rgba(6,182,212,0.2)" stroke="rgba(6,182,212,0.7)" stroke-width="1.5" style="animation:vesMove 1.8s ease-in-out infinite"/>
          <text x="226" y="204" text-anchor="middle" font-size="5.5" fill="rgba(6,182,212,0.85)">Ves</text>
          <!-- Golgi highlight -->
          <path d="M195 210 Q218 205 232 215" fill="none" stroke="rgba(245,158,11,1)" stroke-width="3.2" stroke-linecap="round" style="animation:erGlow 1.3s 0.6s ease-in-out infinite"/>
          <path d="M192 220 Q217 214 233 225" fill="none" stroke="rgba(245,158,11,0.8)" stroke-width="2.5" stroke-linecap="round" style="animation:erGlow 1.3s 0.8s ease-in-out infinite"/>
          <path d="M194 230 Q216 224 230 233" fill="none" stroke="rgba(245,158,11,0.6)" stroke-width="1.8" stroke-linecap="round" style="animation:erGlow 1.3s 1.0s ease-in-out infinite"/>
          <!-- Vesicle from Golgi -->
          <circle cx="248" cy="216" r="7" fill="rgba(245,158,11,0.25)" stroke="rgba(245,158,11,0.7)" stroke-width="1.5" style="animation:vesMove 1.8s 0.6s ease-in-out infinite"/>
        `, 'RE rugoso → Golgi: la "cadena de montaje" de proteínas de la célula',
        `@keyframes erGlow{0%,100%{opacity:0.5}50%{opacity:1}}
         @keyframes vesMove{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`) },

      // ── Paso 6: Proteína lista ────────────────────────────────────
      { title:'✅ Proteína lista — destino final',
        narration:'La proteína está lista y es enviada a su destino: puede quedarse en la célula, insertarse en la membrana, ir a un lisosoma, o ser <strong>secretada al exterior</strong> por exocitosis. ¡Una proteína funcional completamente nueva!',
        info:'Las proteínas tienen destinos muy específicos según sus <strong>señales de localización</strong>: péptido señal (→ RE/secreción), señal NLS (→ núcleo), señal PTS (→ peroxisoma), señal de retención en RE. Una proteína "errónea" o mal plegada es marcada con ubiquitina y degradada por el <strong>proteosoma</strong> (control de calidad).',
        annotations:[
          {text:['✅ Exocitosis','Proteína secretada'],                  bx:52,  by:65,  tx:18,  ty:105},
          {text:['🔌 Membrana','Proteínas integrales'],                  bx:240, by:62,  tx:290, ty:82},
          {text:['♻️ Proteosoma','Degrada mal plegadas'],                bx:270, by:190, tx:240, ty:240},
        ],
        svg: _cell('p6',`
          <!-- Secretory vesicle fusing with membrane (left side) -->
          <circle cx="22" cy="130" r="10" fill="rgba(6,182,212,0.25)" stroke="rgba(6,182,212,0.85)" stroke-width="2" style="animation:exoGlow 1.4s ease-in-out infinite"/>
          <text x="22" y="134" text-anchor="middle" font-size="6" fill="rgba(6,182,212,0.95)" font-weight="bold">→</text>
          <!-- Protein exiting (dots outside membrane left) -->
          <circle cx="6" cy="122" r="5" fill="rgba(6,182,212,0.45)" stroke="rgba(6,182,212,0.8)" stroke-width="1.5" style="animation:exoGlow 1.4s 0.3s ease-in-out infinite"/>
          <circle cx="6" cy="134" r="4.5" fill="rgba(6,182,212,0.35)" stroke="rgba(6,182,212,0.7)" stroke-width="1.5" style="animation:exoGlow 1.4s 0.6s ease-in-out infinite"/>
          <!-- Membrane protein (right side) -->
          <rect x="296" y="100" width="10" height="40" rx="5" fill="rgba(52,211,153,0.3)" stroke="rgba(52,211,153,0.85)" stroke-width="2" style="animation:exoGlow 1.4s 0.5s ease-in-out infinite"/>
          <text x="296" y="124" text-anchor="middle" font-size="5.5" fill="rgba(52,211,153,0.9)" transform="rotate(90 296 124)">↕ prot</text>
          <!-- Proteasome barrel -->
          <rect x="224" cy="232" x="224" y="228" width="22" height="18" rx="4" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.6)" stroke-width="1.5" style="animation:exoGlow 1.4s 0.8s ease-in-out infinite"/>
          <text x="235" y="242" text-anchor="middle" font-size="6" fill="rgba(239,68,68,0.75)" font-family="sans-serif">26S</text>
          <!-- Protein being released label -->
          <text x="22" y="115" text-anchor="middle" font-size="7" fill="rgba(6,182,212,0.85)" font-family="sans-serif">Secretada</text>
        `, '¡Una proteína funcional completada! → secretada, en membrana, o en lisosoma',
        `@keyframes exoGlow{0%,100%{opacity:0.4}50%{opacity:1}}`) },

    ];
  }

  // ══════════════════════════════════════════════
  // SÍNTESIS DE PROTEÍNAS — MODO JUGADOR (5 rondas)
  // ══════════════════════════════════════════════
  function _juegoRoundsSintesis(){
    return [

      // Ronda 1 — ARNm sale por el poro nuclear
      { step:1,
        instruction:'El ARNm está listo en el núcleo. <strong>Arrastrálo</strong> hasta el poro nuclear para que salga al citoplasma.',
        molecule:{sym:'ARNm', label:'📋 ARNm', color:'rgba(6,182,212,0.92)', border:'#06b6d4', r:24},
        molSvgX:86, molSvgY:62,
        target:{x:140, y:93, r:26},
        targetLabel:'🚪 Poro Nuclear',
        xp:10, feedback:'📋 ¡ARNm exportado!',
        explain:{
          title:'¡ARNm sale del núcleo!',
          text:'El <strong>ARNm maduro</strong> (con cap 5\' y cola polyA) fue reconocido por las <strong>exportinas</strong> y transportado activamente a través del poro nuclear. Este proceso consume GTP (Ran-GTP → Ran-GDP). El ARNm llega al citoplasma listo para ser traducido.'
        }},

      // Ronda 2 — Ribosoma se ensambla en el ER rugoso
      { step:2,
        instruction:'El ribosoma debe unirse al ARNm en el Retículo Endoplásmico. <strong>Arrastrá</strong> el ribosoma al RE rugoso.',
        molecule:{sym:'Rib', label:'⚙️ Ribosoma', color:'rgba(251,191,36,0.92)', border:'#fbbf24', r:24},
        molSvgX:78, molSvgY:240,
        target:{x:172, y:178, r:38},
        targetLabel:'🔗 RE Rugoso',
        xp:10, feedback:'⚙️ ¡Ribosoma ensamblado!',
        explain:{
          title:'¡Ribosoma en el RE rugoso!',
          text:'El ribosoma (formado por las subunidades 60S + 40S) se unió al <strong>ARNm</strong> sobre la membrana del <strong>RE rugoso</strong>. Esto forma un <strong>polisoma</strong>: varios ribosomas leyendo el mismo ARNm simultáneamente. La proteína que se sintetice aquí entrará directamente al lumen del RE para su procesamiento.'
        }},

      // Ronda 3 — Aminoácido llega al ribosoma
      { step:3,
        instruction:'El ARNt trae un aminoácido. <strong>Arrastrálo</strong> hasta el ribosoma para alargarlo a la cadena.',
        molecule:{sym:'AA', label:'🔗 Aminoácido', color:'rgba(52,211,153,0.92)', border:'#34d399', r:24},
        molSvgX:264, molSvgY:82,
        target:{x:170, y:170, r:42},
        targetLabel:'⚙️ Ribosoma activo',
        xp:10, feedback:'🔗 ¡Enlace peptídico formado!',
        explain:{
          title:'¡Enlace peptídico formado!',
          text:'El <strong>ARNt</strong> cargado con el aminoácido correcto entró al sitio A del ribosoma. La enzima <strong>peptidil transferasa</strong> (parte del ARN ribosómico 28S) catalizó la formación del <strong>enlace peptídico</strong> entre este aminoácido y la cadena creciente. El ARNt vacío salió por el sitio E.'
        }},

      // Ronda 4 — Proteína se procesa en el Golgi
      { step:4,
        instruction:'La proteína salió del RE y viaja en vesícula. <strong>Arrastrálo</strong> al aparato de Golgi para su procesamiento.',
        molecule:{sym:'Prot', label:'📦 Proteína', color:'rgba(6,182,212,0.92)', border:'#06b6d4', r:24},
        molSvgX:90, molSvgY:62,
        target:{x:214, y:218, r:40},
        targetLabel:'🏭 Aparato de Golgi',
        xp:10, feedback:'📦 ¡Proteína en el Golgi!',
        explain:{
          title:'¡Proteína en el Golgi!',
          text:'La proteína plegada en el RE fue encapsulada en una <strong>vesícula de transporte COPII</strong> y enviada al <strong>aparato de Golgi</strong> (cara cis). Allí recibe modificaciones de carbohidratos, fosforilación y otras marcas que determinan su destino final: lisosoma, membrana plasmática o secreción.'
        }},

      // Ronda 5 — Vesícula secretada al exterior
      { step:5,
        instruction:'La proteína está lista para ser secretada. <strong>Arrastrá</strong> la vesícula a la membrana para la exocitosis.',
        molecule:{sym:'Ves', label:'📤 Vesícula', color:'rgba(245,158,11,0.92)', border:'#f59e0b', r:24},
        molSvgX:248, molSvgY:232,
        target:{x:15, y:138, r:28},
        targetLabel:'📤 Membrana (exocitosis)',
        xp:10, feedback:'✅ ¡Proteína secretada!',
        explain:{
          title:'¡Síntesis de proteínas completa!',
          text:'La vesícula del Golgi se fusionó con la <strong>membrana plasmática</strong> en un proceso de <strong>exocitosis</strong> regulada. La proteína fue secretada al espacio extracelular. ¡Completaste el viaje desde el ADN hasta una proteína funcional secretada! Este proceso ocurre miles de veces por segundo en cada célula.'
        }},

    ];
  }



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


})();
