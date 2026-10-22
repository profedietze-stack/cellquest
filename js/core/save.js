// CellQuest — Save / Load
// ═══════════════ SAVE / LOAD ═══════════════
// IMP-02: debounce writes so rapid consecutive calls (e.g. per-puzzle) collapse into one
let _saveTimer=null;
let _saveErrorShown=false;
function _showSaveError(){
  if(_saveErrorShown)return;
  _saveErrorShown=true;
  const t=document.createElement('div');
  t.className='ach-toast';
  t.style.cssText='background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.4)';
  t.innerHTML='<div class="toast-inner"><div class="toast-emoji">⚠️</div><div class="toast-text"><h4>Progreso no disponible</h4><p>Modo privado no permite guardar datos</p></div></div>';
  document.body.appendChild(t);
  requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),400);},4000);
}
function _doSave(){
  try{localStorage.setItem('cq3',JSON.stringify({name:GS.name,avatar:GS.avatar,difficulty:GS.difficulty||'normal',score:GS.score,xp:GS.xp||0,totalTime:GS.totalTime,levels:GS.levels,completed:GS.completed,achievements:GS.achievements,speedRuns:GS.speedRuns,perfectRuns:GS.perfectRuns,totalDone:GS.totalDone,completedAt:GS.completedAt||{},lastSession:Date.now()}));}catch(e){_showSaveError();}
}
function saveGame(immediate){
  clearTimeout(_saveTimer);
  if(immediate){_doSave();return;}
  _saveTimer=setTimeout(_doSave,800);
}
function loadSave(){
  try{
    const r=localStorage.getItem('cq3');
    if(!r)return false;
    const s=JSON.parse(r);
    // BUG-02 fix: merge by id (not index) so new levels added between versions are handled correctly
    const mergedLevels=JSON.parse(JSON.stringify(LEVELS)).map(baseLv=>{
      const saved=(s.levels||[]).find(l=>l.id===baseLv.id);
      return saved?{...baseLv,...saved,unlocked:saved.unlocked||baseLv.unlocked}:baseLv;
    });
    // Igual que con los niveles: mergear por id, no reemplazar el array entero.
    // Un save viejo guardado antes de agregar un logro nuevo (p.ej. "all_procesos")
    // tenía menos logros que GS.achievements; `s.achievements||GS.achievements`
    // reemplazaba el array completo y el logro nuevo desaparecía para siempre en
    // esa cuenta, porque progress.js busca por id y no encontraba nada que marcar.
    const mergedAchievements=JSON.parse(JSON.stringify(GS.achievements)).map(baseAch=>{
      const saved=(s.achievements||[]).find(a=>a.id===baseAch.id);
      return saved?{...baseAch,...saved}:baseAch;
    });
    Object.assign(GS,{name:s.name||'Jugador',avatar:s.avatar||'scientist',difficulty:s.difficulty||'normal',score:s.score||0,xp:s.xp||0,totalTime:s.totalTime||0,levels:mergedLevels,completed:s.completed||{},achievements:mergedAchievements,speedRuns:s.speedRuns||0,perfectRuns:s.perfectRuns||0,totalDone:s.totalDone||0,completedAt:s.completedAt||{},lastSession:s.lastSession||0});
    return true;
  }catch(e){return false;}
}

