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
// Un guardado se lee campo por campo y con el tipo verificado: `s.score||0` deja pasar
// "abc" (y despues `score+10` da "abc10"), y `(s.levels||[]).find` tira TypeError si
// `levels` es un string. No hace falta un alumno editando el localStorage: alcanza con que
// una version futura cambie un tipo. Lo que no tiene la forma esperada cae al valor por defecto.
function _numSeguro(v,d){return typeof v==='number'&&isFinite(v)&&v>=0?v:d;}
function _arrSeguro(v){return Array.isArray(v)?v.filter(x=>x&&typeof x==='object'):[];}
function _objSeguro(v){return v&&typeof v==='object'&&!Array.isArray(v)?v:{};}
// {nivel:{organela:valor}} -> solo los niveles que son objetos; el resto se descarta.
function _mapaSeguro(v,validoValor){
  const out={};
  Object.entries(_objSeguro(v)).forEach(([lv,orgs])=>{
    if(!orgs||typeof orgs!=='object'||Array.isArray(orgs))return;
    out[lv]={};
    Object.entries(orgs).forEach(([o,val])=>{if(validoValor(val))out[lv][o]=val;});
  });
  return out;
}
function loadSave(){
  try{
    const r=localStorage.getItem('cq3');
    if(!r)return false;
    const parsed=JSON.parse(r);
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return false;
    const s=parsed;
    // BUG-02 fix: merge by id (not index) so new levels added between versions are handled correctly
    const mergedLevels=JSON.parse(JSON.stringify(LEVELS)).map(baseLv=>{
      const saved=_arrSeguro(s.levels).find(l=>l.id===baseLv.id);
      return saved?{...baseLv,...saved,unlocked:saved.unlocked||baseLv.unlocked}:baseLv;
    });
    // Igual que con los niveles: mergear por id, no reemplazar el array entero.
    // Un save viejo guardado antes de agregar un logro nuevo (p.ej. "all_procesos")
    // tenía menos logros que GS.achievements; `s.achievements||GS.achievements`
    // reemplazaba el array completo y el logro nuevo desaparecía para siempre en
    // esa cuenta, porque progress.js busca por id y no encontraba nada que marcar.
    const mergedAchievements=JSON.parse(JSON.stringify(GS.achievements)).map(baseAch=>{
      const saved=_arrSeguro(s.achievements).find(a=>a.id===baseAch.id);
      return saved?{...baseAch,...saved}:baseAch;
    });
    Object.assign(GS,{name:(typeof s.name==='string'&&s.name.trim()?s.name.trim().slice(0,40):'Jugador'),avatar:(typeof s.avatar==='string'&&AV_EMOJI[s.avatar]?s.avatar:'scientist'),difficulty:(['easy','normal','hard'].includes(s.difficulty)?s.difficulty:'normal'),score:_numSeguro(s.score,0),xp:_numSeguro(s.xp,0),totalTime:_numSeguro(s.totalTime,0),levels:mergedLevels,completed:_mapaSeguro(s.completed,v=>v===true),achievements:mergedAchievements,speedRuns:_numSeguro(s.speedRuns,0),perfectRuns:_numSeguro(s.perfectRuns,0),totalDone:_numSeguro(s.totalDone,0),completedAt:_mapaSeguro(s.completedAt,v=>typeof v==='number'&&isFinite(v)),lastSession:_numSeguro(s.lastSession,0)});
    return true;
  }catch(e){return false;}
}

