// CellQuest — Atlas Screen
// ═══════════════ ATLAS CELULAR ═══════════════
(function(){
  // Derived from LEVELS — single source of truth
  const ATLAS_CELLS=LEVELS.map(l=>({id:l.id,emoji:l.emoji}));

  let currentCell='animal', currentOrg=null;

  // ── viewBox zoom/pan (same logic as game cell) ─────────────
  const VB0={x:0,y:0,w:540,h:540};
  let avb={...VB0};
  const MIN_W=108,MAX_W=540,STEP=0.7;

  function applyAvb(){
    avb.x=Math.max(-avb.w*.5,Math.min(540-avb.w*.5,avb.x));
    avb.y=Math.max(-avb.h*.5,Math.min(540-avb.h*.5,avb.y));
    const s=document.getElementById('atlasSvg');
    if(s)s.setAttribute('viewBox',`${avb.x.toFixed(1)} ${avb.y.toFixed(1)} ${avb.w.toFixed(1)} ${avb.h.toFixed(1)}`);
  }
  function aZoomAt(svgX,svgY,factor){
    const nw=Math.max(MIN_W,Math.min(MAX_W,avb.w*factor));
    avb.x=svgX-(svgX-avb.x)*(nw/avb.w);
    avb.y=svgY-(svgY-avb.y)*(nw/avb.w);
    avb.w=avb.h=nw;applyAvb();
  }
  function aResetZoom(){avb={...VB0};applyAvb();}
  function screenToAtlasSvg(cx,cy){
    const s=document.getElementById('atlasSvg');
    const r=s.getBoundingClientRect();
    return{x:avb.x+(cx-r.left)*avb.w/r.width,y:avb.y+(cy-r.top)*avb.h/r.height};
  }

  // ── Drawer toggle ───────────────────────────────────────────
  window.toggleAtlasDrawer=function(){
    document.getElementById('atlasDrawer')?.classList.toggle('open');
  };

  // ── Build cell-type tabs ────────────────────────────────────
  function buildTabs(){
    const tabs=document.getElementById('atlasTabs');if(!tabs)return;
    tabs.innerHTML='';
    ATLAS_CELLS.forEach(c=>{
      const lv=LEVELS.find(l=>l.id===c.id)||{name:c.id};
      const btn=document.createElement('button');
      btn.className='atlas-tab'+(c.id===currentCell?' active':'');
      btn.dataset.id=c.id;
      btn.textContent=c.emoji+' '+lv.name;
      btn.onclick=()=>selectAtlasCell(c.id);
      tabs.appendChild(btn);
    });
  }

  // ── Build organelle chip list ───────────────────────────────
  function buildOrgList(cellId){
    const list=document.getElementById('atlasOrgList');if(!list)return;
    const orgs=ORGANELLES[cellId]||[];
    list.innerHTML='';
    orgs.forEach(o=>{
      const chip=document.createElement('div');
      chip.className='atlas-org-chip'+(o.id===currentOrg?' active':'');
      chip.dataset.id=o.id;
      chip.innerHTML=`<span class="chip-emoji">${o.emoji}</span><span class="chip-name">${o.name}</span>`;
      chip.onclick=()=>{ selectAtlasOrg(o.id); };
      list.appendChild(chip);
    });
    const cnt=document.getElementById('atlasOrgCount');
    if(cnt)cnt.textContent=orgs.length;
  }

  // ── Select a cell type ─────────────────────────────────────
  function selectAtlasCell(cellId){
    currentCell=cellId;currentOrg=null;
    // Update tabs
    document.querySelectorAll('.atlas-tab').forEach(t=>{
      t.classList.toggle('active',t.dataset.id===cellId);
    });
    aResetZoom();
    const svg=document.getElementById('atlasSvg');
    if(!svg)return;
    drawCell(cellId,svg);
    buildOrgList(cellId);
    showAtlasHint();
    // Close drawer when switching cells
    document.getElementById('atlasDrawer')?.classList.remove('open');
    bindAtlasSvgClicks(svg);
  }

  // ── Floating info card ─────────────────────────────────────
  const INFO_SECTIONS=[
    ['🔬 Función',     'fn'],
    ['📍 Localización','loc'],
    ['🧱 Estructura',  'struct'],
    ['⚙️ Procesos',    'proc'],
    ['🔄 Diferencias', 'diff'],
    ['🏥 Patología',   'path'],
    ['💡 Curiosidad',  'cur'],
  ];

  function selectAtlasOrg(orgId){
    currentOrg=orgId;
    // Highlight chips
    document.querySelectorAll('.atlas-org-chip').forEach(c=>
      c.classList.toggle('active',c.dataset.id===orgId));
    // Dim other organelles
    document.querySelectorAll('#atlasSvg g[data-org-id]').forEach(g=>
      g.style.opacity=g.dataset.orgId===orgId?'1':'0.35');

    const info=ORG_INFO[orgId];
    const org=(ORGANELLES[currentCell]||[]).find(o=>o.id===orgId);
    if(!info||!org){showAtlasHint();return;}

    const panel=document.getElementById('atlasOrgInfo');
    const floatCard=document.getElementById('atlasFloatInfo');
    if(!panel||!floatCard)return;

    panel.innerHTML=`
      <div class="atlas-org-title">
        <span>${org.emoji}</span>
        <span>${org.name}</span>
        <span class="atlas-org-badge">${currentCell}</span>
      </div>
      <div class="atlas-summary-fn">${info.fn||''}</div>
      ${info.loc?`<div class="atlas-summary-loc">📍 ${info.loc}</div>`:''}
      <button class="atlas-expand-btn" onclick="openAtlasModal('${orgId}')">
        📖 Ver información completa
      </button>`;

    floatCard.classList.add('visible');

    // Collapse drawer when info opens (more room to see)
    document.getElementById('atlasDrawer')?.classList.remove('open');
  }

  window.showAtlasHint=function(){
    currentOrg=null;
    const floatCard=document.getElementById('atlasFloatInfo');
    if(floatCard)floatCard.classList.remove('visible');
    document.querySelectorAll('#atlasSvg g[data-org-id]').forEach(g=>g.style.opacity='1');
    document.querySelectorAll('.atlas-org-chip').forEach(c=>c.classList.remove('active'));
  };

  window.openAtlasModal=function(orgId){
    const info=ORG_INFO[orgId];
    const org=(ORGANELLES[currentCell]||[]).find(o=>o.id===orgId);
    if(!info||!org)return;
    document.getElementById('atlasModal')?.remove();
    const overlay=document.createElement('div');
    overlay.className='atlas-modal-overlay';overlay.id='atlasModal';
    overlay.innerHTML=`
      <div class="atlas-modal">
        <div class="atlas-modal-header">
          <span style="font-size:1.5rem">${org.emoji}</span>
          <div class="atlas-modal-title">${org.name}</div>
          <span class="atlas-org-badge" style="margin-right:.3rem">${currentCell}</span>
          <button class="atlas-modal-close" onclick="document.getElementById('atlasModal').remove()">✕</button>
        </div>
        <div class="atlas-modal-body">
          ${INFO_SECTIONS.map(([label,key])=>info[key]?`
            <div class="atlas-modal-section">
              <div class="atlas-modal-label">${label}</div>
              <div class="atlas-modal-text">${info[key]}</div>
            </div>`:'').join('')}
        </div>
      </div>`;
    overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove();});
    document.body.appendChild(overlay);
  };

  // ── SVG click binding ──────────────────────────────────────
  function bindAtlasSvgClicks(svg){
    svg.addEventListener('click',e=>{
      if(e.target===svg||e.target.tagName==='svg')showAtlasHint();
    },{once:false});
  }

  // ── Zoom controls init ─────────────────────────────────────
  let _zoomInited=false;
  function initAtlasZoom(){
    if(_zoomInited)return;_zoomInited=true;
    const svg=document.getElementById('atlasSvg');if(!svg)return;

    document.getElementById('atlasZoomIn')?.addEventListener('click',e=>{
      e.stopPropagation();aZoomAt(avb.x+avb.w/2,avb.y+avb.h/2,STEP);});
    document.getElementById('atlasZoomOut')?.addEventListener('click',e=>{
      e.stopPropagation();aZoomAt(avb.x+avb.w/2,avb.y+avb.h/2,1/STEP);});
    document.getElementById('atlasZoomReset')?.addEventListener('click',e=>{
      e.stopPropagation();aResetZoom();});

    svg.addEventListener('wheel',e=>{
      e.preventDefault();
      const pt=screenToAtlasSvg(e.clientX,e.clientY);
      aZoomAt(pt.x,pt.y,e.deltaY>0?1/STEP:STEP);
    },{passive:false});

    let drag=null;
    svg.addEventListener('mousedown',e=>{
      if(e.button!==0)return;
      drag={sx:e.clientX,sy:e.clientY,vx:avb.x,vy:avb.y,moved:false};
      svg.style.cursor='grabbing';
    });
    window.addEventListener('mousemove',e=>{
      if(!drag)return;
      const r=svg.getBoundingClientRect();
      const dx=(e.clientX-drag.sx)*avb.w/r.width;
      const dy=(e.clientY-drag.sy)*avb.h/r.height;
      if(Math.abs(dx)>2||Math.abs(dy)>2)drag.moved=true;
      if(!drag.moved)return;
      avb.x=drag.vx-dx;avb.y=drag.vy-dy;applyAvb();
    });
    window.addEventListener('mouseup',()=>{
      if(drag){svg.style.cursor='crosshair';drag=null;}
    });

    let touch=null;
    svg.addEventListener('touchstart',e=>{
      if(e.touches.length===1){
        touch={type:'pan',sx:e.touches[0].clientX,sy:e.touches[0].clientY,
               vx:avb.x,vy:avb.y,moved:false,t:Date.now()};
      } else if(e.touches.length===2){
        const mx=(e.touches[0].clientX+e.touches[1].clientX)/2;
        const my=(e.touches[0].clientY+e.touches[1].clientY)/2;
        touch={type:'pinch',sd:Math.hypot(e.touches[0].clientX-e.touches[1].clientX,
               e.touches[0].clientY-e.touches[1].clientY),
               sw:avb.w,pivot:screenToAtlasSvg(mx,my),vx:avb.x,vy:avb.y};
      }
    },{passive:true});
    svg.addEventListener('touchmove',e=>{
      e.preventDefault();if(!touch)return;
      if(touch.type==='pan'&&e.touches.length===1){
        const r=svg.getBoundingClientRect();
        const dx=(e.touches[0].clientX-touch.sx)*avb.w/r.width;
        const dy=(e.touches[0].clientY-touch.sy)*avb.h/r.height;
        if(Math.abs(dx)>3||Math.abs(dy)>3)touch.moved=true;
        if(!touch.moved)return;
        avb.x=touch.vx-dx;avb.y=touch.vy-dy;applyAvb();
      } else if(touch.type==='pinch'&&e.touches.length===2){
        const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,
                           e.touches[0].clientY-e.touches[1].clientY);
        const nw=Math.max(MIN_W,Math.min(MAX_W,touch.sw*touch.sd/d));
        avb.x=touch.pivot.x-(touch.pivot.x-touch.vx)*(nw/touch.sw);
        avb.y=touch.pivot.y-(touch.pivot.y-touch.vy)*(nw/touch.sw);
        avb.w=avb.h=nw;applyAvb();
      }
    },{passive:false});
    svg.addEventListener('touchend',()=>{touch=null;},{passive:true});
  }

  // ── Public entry point ─────────────────────────────────────
  window._atlasSelectOrg=function(orgId){selectAtlasOrg(orgId);};

  window.goAtlas=function(){
    if(typeof stopTimer==='function')stopTimer(); // UX-03: pausar timer mientras se navega al atlas
    window._atlasSelectOrg=function(orgId){selectAtlasOrg(orgId);};
    _zoomInited=false;
    buildTabs();
    selectAtlasCell(currentCell);
    showScreen('atlasScreen');
    setTimeout(initAtlasZoom,80);
  };

  // Clear atlas mode when leaving
  const _origBack=window._backFromMeta;
  window._backFromMeta=function(){
    window._atlasSelectOrg=null;
    document.getElementById('atlasModal')?.remove();
    if(_origBack)_origBack();
    else{if(window.GS&&GS.currentLevel)showScreen('gameScreen');else showScreen('menuScreen');}
  };

})(); // end Atlas IIFE

function confirmNewGame(){
  // BUG-08 fix: check xp/score/currentLevel too, not only totalDone
  const hasSave=!!localStorage.getItem('cq3');
  const hasProgress=hasSave&&(GS.totalDone>0||GS.score>0||(GS.xp||0)>0||!!GS.currentLevel);
  if(!hasProgress)startNewGame();
  else openModal('resetModal');
}
function startNewGame(){
  GS={...GS,name:'Jugador',avatar:'scientist',difficulty:'normal',score:0,xp:0,totalTime:0,timerInterval:null,startTime:null,currentLevel:null,currentOrg:null,mgIndex:0,mgStart:null,mgErrors:0,speedRuns:0,perfectRuns:0,totalDone:0,levels:JSON.parse(JSON.stringify(LEVELS)),completed:{},tfAnswers:{},achievements:GS.achievements.map(a=>({...a,unlocked:false}))};
  showScreen('avatarScreen');
}
function continueGame(){loadSave()?enterGame():startNewGame();}
function backToMenu(){stopTimer();saveGame(true);showScreen('menuScreen');}

function selAvatar(el){document.querySelectorAll('.diff-card,.avatar-card').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');}
function confirmAvatar(){
  const n=document.getElementById('playerNameInput').value.trim();
  const sel=document.querySelector('.diff-card.selected,.avatar-card.selected');
  GS.difficulty=sel?.dataset.diff||'normal';
  GS.avatar=sel?.dataset.av||'teacher';
  const defaults={easy:'Estudiante',normal:'Docente',hard:'Científico/a'};
  GS.name=n||(defaults[GS.difficulty]||'Explorador');
  enterGame();
}
function enterGame(){
  showScreen('gameScreen');
  document.getElementById('ghAvatar').firstChild.textContent=AV_EMOJI[GS.avatar]||'🧑‍🔬';
  document.getElementById('ghTip').textContent=GS.name+' · '+(DIFF_LABEL[GS.difficulty]||'');
  document.getElementById('ghScore').textContent=GS.score;
  updateTimerDisplay();startTimer();
  renderLevelGrid();
  if(GS.currentLevel)startLevel(GS.currentLevel);
}

