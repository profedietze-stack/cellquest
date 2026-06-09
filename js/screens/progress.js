// CellQuest — Progress Screen + Achievements
// ═══════════════ ACHIEVEMENTS CHECK ═══════════════
function checkAch(){
  const u=(id)=>{const a=GS.achievements.find(a=>a.id===id);if(a&&!a.unlocked){a.unlocked=true;showToast(a);}};
  const done3=GS.levels.filter(l=>{const o=ORGANELLES[l.id]||[];return o.length&&o.every(org=>(GS.completed[l.id]||{})[org.id]);});
  if(GS.totalDone>=1)u('first_step');
  if(done3.find(l=>l.id==='animal'))u('novice');
  if(done3.find(l=>l.id==='plant'))u('botanist');
  if(done3.find(l=>l.id==='prokaryote'))u('microbiologist');
  if(done3.length>=3)u('expert');
  if(GS.speedRuns>=5)u('speedrunner');
  if(GS.perfectRuns>=10)u('perfectionist');
  if(GS.score>=500)u('scholar');
  const avail=GS.levels.filter(l=>ORGANELLES[l.id]?.length);
  if(avail.length&&avail.every(l=>done3.find(d=>d.id===l.id)))u('mastery');
  if(GS.levels.every(l=>l.unlocked))u('secret');
  // all_procesos: all 5 Cine + all 5 Jugador seen
  try{
    const proc_ids=['respiracion','alimentacion','reproduccion','defensa','sintesis'];
    const seen=JSON.parse(localStorage.getItem('cq3_proc_seen')||'{}');
    if(proc_ids.every(id=>seen[id])&&proc_ids.every(id=>seen['j_'+id]))u('all_procesos');
  }catch(e){};
}
function showToast(a){
  const t=document.createElement('div');t.className='ach-toast';
  t.innerHTML=`<div class="toast-inner"><div class="toast-emoji">${a.emoji}</div><div class="toast-text"><h4>¡Logro desbloqueado!</h4><p>${a.name}: ${a.desc}</p></div></div>`;
  document.body.appendChild(t);setTimeout(()=>t.remove(),4000);
}


// ═══════════════ ORG INFO MODAL ═══════════════
function openOrgInfo(){
  if(!GS.currentOrg)return;
  const info=ORG_INFO[GS.currentOrg];
  document.getElementById('oimTitle').textContent=(info?.emoji||'🔬')+' '+(info?.name||GS.currentOrg);
  if(!info){document.getElementById('oimBody').innerHTML='<p style="color:var(--muted)">Información en construcción.</p>';openModal('orgInfoModal');return;}
  document.getElementById('oimBody').innerHTML=`
    <div class="org-info-header">
      <div class="org-info-emoji">${info.emoji}</div>
      <div class="org-info-title"><h2>${info.name}</h2><p>Información científica a nivel universitario</p></div>
    </div>
    <div class="org-info-grid">
      <div class="org-info-card"><h4>🎯 Función</h4><p>${info.fn}</p></div>
      <div class="org-info-card"><h4>📍 Ubicación</h4><p>${info.loc}</p></div>
      <div class="org-info-card"><h4>🔬 Estructura</h4><p>${info.struct}</p></div>
      <div class="org-info-card"><h4>⚙️ Procesos</h4><p>${info.proc}</p></div>
      ${info.diff?`<div class="org-info-card"><h4>🔄 Diferencias</h4><p>${info.diff}</p></div>`:''}
      ${info.path?`<div class="org-info-card"><h4>🏥 Patologías</h4><p>${info.path}</p></div>`:''}
    </div>
    <div class="curiosity-box"><h4>💡 Dato Científico Curioso</h4><p>${info.cur}</p></div>`;
  openModal('orgInfoModal');
}

// ═══════════════ FULLSCREEN ═══════════════
function enterFullscreen(){
  const el = document.documentElement;

  // ── Path 1: Standard API (Chrome/Firefox/Edge/Android) ──
  const req = el.requestFullscreen
    || el.webkitRequestFullscreen   // Safari 16.4+ desktop, old Chrome
    || el.mozRequestFullScreen
    || el.msRequestFullscreen;

  if(req){
    try{
      const p = req.call(el, {navigationUI:'hide'});
      if(p && typeof p.catch === 'function') p.catch(()=>{}); // suppress rejection if blocked
    }catch(e){}
  }

  // ── Path 2: Safari iOS — no Fullscreen API, use viewport trick ──
  // Forces the page to fill the screen by scrolling chrome away and locking scroll.
  // Also sets a meta viewport to avoid the toolbar shrinking layout on iOS.
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) || 
     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)){
    // Scroll to hide Safari toolbar
    setTimeout(()=>{ window.scrollTo(0,1); },100);
    // Lock body to viewport height
    _applySafariFullscreen();
  }
}

function _applySafariFullscreen(){
  // Use dvh (dynamic viewport height) where supported, fallback to window.innerHeight
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--real-vh', vh + 'px');
    document.documentElement.style.height = window.innerHeight + 'px';
    document.body.style.height = window.innerHeight + 'px';
  };
  setVH();
  window.addEventListener('resize', setVH, {passive:true});
  window.addEventListener('orientationchange', ()=>setTimeout(setVH,300), {passive:true});
}

// Listen for fullscreen change to update UI if user presses Escape
document.addEventListener('fullscreenchange',     _onFsChange);
document.addEventListener('webkitfullscreenchange',_onFsChange);
function _onFsChange(){
  const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
  // Could update a toggle button here if needed — reserved for future use
}

