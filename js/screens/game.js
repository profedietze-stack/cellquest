// CellQuest — Game Screen Logic
// ═══════════════ PANEL TABS ═══════════════
function showPTab(tab){
  document.querySelectorAll('.ptab').forEach(b=>b.classList.remove('active'));
  document.getElementById(tab==='levels'?'ptabLevels':'ptabOrg').classList.add('active');
  document.getElementById('tabLevels').style.display=tab==='levels'?'block':'none';
  document.getElementById('tabOrganelle').style.display=tab==='organelle'?'block':'none';
}
function switchMTab(btn,id){
  document.querySelectorAll('.mtab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.mtab-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');document.getElementById(id).classList.add('active');
}

// ═══════════════ TIMER ═══════════════
function startTimer(){stopTimer();GS.startTime=Date.now()-(GS.totalTime*1000);GS.timerInterval=setInterval(()=>{GS.totalTime=Math.floor((Date.now()-GS.startTime)/1000);updateTimerDisplay();},1000);}
function stopTimer(){if(GS.timerInterval){clearInterval(GS.timerInterval);GS.timerInterval=null;}}
function updateTimerDisplay(){const m=Math.floor(GS.totalTime/60),s=GS.totalTime%60;document.getElementById('ghTimer').textContent=`${m}:${s.toString().padStart(2,'0')}`;}

// ═══════════════ P1: SPACED REPETITION HELPERS ═══════════════
const _REVIEW_DUE_MS = 3 * 24 * 60 * 60 * 1000; // 3 days
function getOverdueOrgs(levelId){
  const orgs = ORGANELLES[levelId]||[];
  const cat = GS.completedAt||{};
  const reviewed = typeof _reviewedThisSession!=='undefined'?_reviewedThisSession:new Set();
  const now = Date.now();
  return orgs.filter(o=>{
    const t = cat[levelId]?.[o.id];
    if(!t) return false; // never completed
    if(reviewed.has(levelId+'.'+o.id)) return false; // reviewed this session
    return (now - t) > _REVIEW_DUE_MS;
  });
}

// ═══════════════ LEVEL GRID ═══════════════
function renderLevelGrid(){
  const g=document.getElementById('levelGrid');g.innerHTML='';
  GS.levels.forEach(lv=>{
    const orgs=ORGANELLES[lv.id]||[];
    const done=Object.values(GS.completed[lv.id]||{}).filter(Boolean).length;
    const total=orgs.length;const pct=total?Math.round(done/total*100):0;
    const isDone=done===total&&total>0;
    const isEmpty=!orgs.length; // level defined but no organelles yet
    const card=document.createElement('div');
    card.className='level-card'+(lv.unlocked&&!isEmpty?' '+(lv.id===GS.currentLevel?'lc-active':'')+(isDone?' lc-done':''):'  lc-locked');
    const xpThresh=(typeof CELL_XP_UNLOCK!=='undefined'&&CELL_XP_UNLOCK[lv.id])||0;
    const xpLeft=Math.max(0,xpThresh-(GS.xp||0));
    const lockStatus=xpLeft>0?`<span class="lc-xp-needed">+${xpLeft} XP para desbloquear</span>`:'Completa el nivel anterior';
    // P1: spaced repetition badge
    const overdueN = lv.unlocked&&!isEmpty ? getOverdueOrgs(lv.id).length : 0;
    const overdueBadge = overdueN>0 ? `<span class="lc-overdue-badge" title="Organelas para repasar">🔔 ${overdueN}</span>` : '';
    card.innerHTML=`<span class="lc-lock">${lv.unlocked?(isDone?'✅':isEmpty?'🚧':''):'🔒'}</span>${overdueBadge}<div class="lc-emoji">${lv.emoji}</div><div class="lc-name">${lv.name}</div><div class="lc-status">${isEmpty?'<span style="color:var(--accent4);font-size:.7rem">✨ Próximamente</span>':lv.unlocked?(isDone?'¡Completado! Modo libre':''+done+'/'+total+' organelas'):lockStatus}</div><div class="lc-bar"><div class="lc-bar-fill" style="width:${pct}%"></div></div>`;
    if(lv.unlocked&&!isEmpty)card.onclick=()=>startLevel(lv.id);
    g.appendChild(card);
  });
}

// ═══════════════ START LEVEL ═══════════════
function startLevel(id){
  if(!id)return; // IMP-01: guard against null/undefined id
  GS.currentLevel=id;GS.currentOrg=null;
  const lv=GS.levels.find(l=>l.id===id);
  if(!lv)return;
  document.getElementById('ghLevelName').textContent=lv.name;
  document.getElementById('cellNameTag').textContent=lv.emoji+' '+lv.name;
  drawCell(id);updateLevelProgress(id);
  document.getElementById('ptabOrg').style.display='none';
  showPTab('levels');renderLevelGrid();saveGame();
}
function updateLevelProgress(id){
  const orgs=ORGANELLES[id]||[];
  const done=Object.values(GS.completed[id]||{}).filter(Boolean).length;
  const total=orgs.length;const pct=total?Math.round(done/total*100):0;
  document.getElementById('ghOrgCount').textContent=`${done}/${total}`;
  document.getElementById('ghPct').textContent=pct+'%';
  document.getElementById('ghBar').style.width=pct+'%';
}

// ═══════════════ PANEL COLAPSO (desktop) ═══════════════
function _isPanelCollapsed(){
  return document.querySelector('.info-panel')?.classList.contains('panel-collapsed');
}
function _updateToggleBtn(collapsed){
  const btn=document.getElementById('panelToggleBtn');
  if(!btn)return;
  // El CSS maneja la posición via .game-body.info-collapsed — solo actualizamos el glifo
  if(collapsed){
    btn.innerHTML='&#8250;';  // ›
    btn.title='Abrir panel';
    btn.setAttribute('aria-label','Abrir panel lateral');
  } else {
    btn.innerHTML='&#8249;';  // ‹
    btn.title='Cerrar panel';
    btn.setAttribute('aria-label','Cerrar panel lateral');
  }
}
function collapseInfoPanel(){
  if(typeof isMobile==='function'&&isMobile())return;
  const panel=document.querySelector('.info-panel');
  if(!panel)return;
  panel.classList.add('panel-collapsed');
  document.querySelector('.game-body')?.classList.add('info-collapsed');
  _updateToggleBtn(true);
}
function expandInfoPanel(){
  if(typeof isMobile==='function'&&isMobile())return;
  const panel=document.querySelector('.info-panel');
  if(!panel)return;
  panel.classList.remove('panel-collapsed');
  document.querySelector('.game-body')?.classList.remove('info-collapsed');
  _updateToggleBtn(false);
}
function toggleInfoPanel(){
  _isPanelCollapsed()?expandInfoPanel():collapseInfoPanel();
}

// ═══════════════ SVG HELPERS ═══════════════
function svgEl(tag,a={}){const e=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));return e;}
function hex2rgba(h,a){h=h.replace('#','');const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return `rgba(${r},${g},${b},${a})`;}

