// CellQuest — Mobile Drawer + App Init
// ═══════════════ MOBILE DRAWER ═══════════════
function isMobile(){return window.innerWidth<=768;}

function toggleDrawer(){
  if(document.getElementById('info-panel')?.classList.contains('drawer-open')||
     document.querySelector('.info-panel')?.classList.contains('drawer-open')){
    closeDrawer();
  } else {
    openDrawer();
  }
}

function openDrawer(){
  const panel=document.querySelector('.info-panel');
  const overlay=document.getElementById('drawerOverlay');
  const fab=document.getElementById('drawerFab');
  const icon=document.getElementById('fabIcon');
  const lbl=document.getElementById('fabLabel');
  if(!isMobile())return;
  panel?.classList.add('drawer-open');
  overlay?.classList.add('dim');
  fab?.classList.add('fab-open');
  if(icon)icon.textContent='✕';
  if(lbl)lbl.textContent='Cerrar';
  document.body.style.overflow='hidden';
}

function closeDrawer(){
  const panel=document.querySelector('.info-panel');
  const overlay=document.getElementById('drawerOverlay');
  const fab=document.getElementById('drawerFab');
  const icon=document.getElementById('fabIcon');
  const lbl=document.getElementById('fabLabel');
  panel?.classList.remove('drawer-open');
  overlay?.classList.remove('dim');
  fab?.classList.remove('fab-open');
  if(icon)icon.textContent=document.getElementById('ptabOrg')?.style.display!=='none'?'🔬':'🗺️';
  if(lbl)lbl.textContent=document.getElementById('ptabOrg')?.style.display!=='none'?'Ver Quiz':'Ver Niveles';
  document.body.style.overflow='';
}

function updateFabLabel(){
  if(!isMobile())return;
  const icon=document.getElementById('fabIcon');
  const lbl=document.getElementById('fabLabel');
  const orgTabVisible=document.getElementById('ptabOrg')?.style.display!=='none';
  const drawerOpen=document.querySelector('.info-panel')?.classList.contains('drawer-open');
  if(drawerOpen){if(icon)icon.textContent='✕';if(lbl)lbl.textContent='Cerrar';return;}
  if(orgTabVisible&&document.getElementById('tabOrganelle')?.style.display!=='none'){
    if(icon)icon.textContent='🔬';if(lbl)lbl.textContent='Ver Quiz';
  } else {
    if(icon)icon.textContent='🗺️';if(lbl)lbl.textContent='Ver Niveles';
  }
}

// Show FAB only on game screen
function updateFabVisibility(){
  const fab=document.getElementById('drawerFab');
  const overlay=document.getElementById('drawerOverlay');
  if(!fab)return;
  const gameActive=document.getElementById('gameScreen')?.classList.contains('active');
  fab.style.display=(gameActive&&isMobile())?'flex':'none';
  if(!gameActive&&overlay)overlay.classList.remove('dim');
}

// Al seleccionar organela: abrir drawer en móvil / expandir panel en desktop
const _origSelectOrg=selectOrg;
selectOrg=function(orgId,levelId){
  _origSelectOrg(orgId,levelId);
  if(isMobile()){
    setTimeout(()=>{openDrawer();updateFabLabel();},80);
  } else {
    if(typeof expandInfoPanel==='function')expandInfoPanel();
  }
};

// Al seleccionar nivel: cerrar drawer en móvil / colapsar panel en desktop
const _origStartLevel=startLevel;
startLevel=function(id){
  _origStartLevel(id);
  if(isMobile()){
    // cerrar el drawer para mostrar la célula completa
    setTimeout(()=>{closeDrawer();updateFabLabel();},80);
  } else {
    // colapsar panel lateral para dar más espacio a la célula
    setTimeout(()=>{if(typeof collapseInfoPanel==='function')collapseInfoPanel();},60);
  }
};

// Update FAB label when tabs switch
const _origShowPTab=showPTab;
showPTab=function(tab){
  _origShowPTab(tab);
  updateFabLabel();
};


// Swipe down to close drawer on mobile
(function(){
  let startY=0;
  document.addEventListener('touchstart',e=>{startY=e.touches[0].clientY;},{passive:true});
  document.addEventListener('touchend',e=>{
    const dy=e.changedTouches[0].clientY-startY;
    const panel=document.querySelector('.info-panel');
    if(dy>60&&panel?.classList.contains('drawer-open'))closeDrawer();
  },{passive:true});
})();

window.addEventListener('resize',()=>{
  if(!isMobile()){
    closeDrawer();
    document.querySelector('.info-panel')?.classList.remove('drawer-open');
    document.body.style.overflow='';
  }
  updateFabVisibility();
});

// ═══════════════ INIT ═══════════════
window.addEventListener('load',()=>{
  const h=loadSave();
  // btnContinue state set when menu becomes visible
  window._hasSave=h;
  updateFabVisibility();
  const fab=document.getElementById('drawerFab');
  if(fab)fab.style.display='none';
});

// When menuScreen becomes active, refresh btnContinue
const _origShowScreen=showScreen;
showScreen=function(id){
  _origShowScreen(id);
  if(id==='menuScreen'){
    document.getElementById('btnContinue').style.display=window._hasSave?'inline-block':'none';
  }
};
window.addEventListener('click',e=>{
  ['infoModal','orgInfoModal'].forEach(id=>{const m=document.getElementById(id);if(e.target===m)m.classList.remove('open');});
});

