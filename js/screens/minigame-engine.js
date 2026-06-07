// CellQuest — Organelle Selection + Minigame Engine
// ═══════════════ SELECT ORGANELLE ═══════════════
function selectOrg(orgId,levelId){
  const org=(ORGANELLES[levelId]||[]).find(o=>o.id===orgId);
  if(!org)return;
  _inReviewSession=false; // reset review mode when switching organelle
  GS.currentOrg=orgId;GS.mgIndex=0;GS.mgErrors=0;GS.tfAnswers={};GS.tfCorrect=[];
  document.getElementById('ptabOrg').style.display='block';
  showPTab('organelle');
  document.getElementById('opEmoji').textContent=org.emoji;
  document.getElementById('opName').textContent=org.name;
  const _lvSub=GS.currentLevel&&GS.levels?GS.levels.find(l=>l.id===GS.currentLevel):null;
  document.getElementById('opSub').textContent=_lvSub?(_lvSub.emoji+' '+_lvSub.name):'';
  renderPills(orgId,levelId);
  loadMG(orgId,levelId);
  const _ct=document.getElementById('cellTip');if(_ct)_ct.textContent='';// zoom hint managed by mic-zoom module
}
function renderPills(orgId,levelId){
  const mgs=getMG(orgId);
  const c=(GS.completed[levelId]||{})[orgId];
  const pills=document.getElementById('opPills');pills.innerHTML='';
  if(c){pills.innerHTML='<span style="font-size:.8rem;color:var(--accent3);font-weight:700">✅ Organela completa</span>';return;}
  mgs.forEach((_,i)=>{const p=document.createElement('div');p.className='puzzle-pill'+(i<GS.mgIndex?' done':i===GS.mgIndex?' current':'');pills.appendChild(p);});
}

// ═══════════════ REVIEW MODE (G4 — Replayability) ═══════════════
let _inReviewSession=false;
const _reviewedThisSession=new Set();
function startReview(orgId,levelId){
  _inReviewSession=true;
  GS.mgIndex=0;GS.mgErrors=0;GS.tfAnswers={};GS.tfCorrect=[];
  loadMG(orgId,levelId);
}

// ═══════════════ MINIGAMES ═══════════════
function loadMG(orgId,levelId){
  const area=document.getElementById('mgArea');area.innerHTML='';
  GS.tfAnswers={};

  // P2: Show organelle intro card before first puzzle (only on first visit per session)
  if(!_inReviewSession && GS.mgIndex===0 && !(GS.completed[levelId]||{})[orgId]){
    if(!GS.introduced)GS.introduced={};
    const _ik=levelId+'.'+orgId;
    if(!GS.introduced[_ik]){
      GS.introduced[_ik]=true;
      const _info=typeof ORG_INFO!=='undefined'?ORG_INFO[orgId]:null;
      if(_info){
        area.innerHTML=
          '<div class="org-intro-card">'+
            '<div class="org-intro-emoji">'+_info.emoji+'</div>'+
            '<h3 class="org-intro-name">'+_info.name+'</h3>'+
            '<p class="org-intro-fn">'+_info.fn+'</p>'+
            '<div class="org-intro-fact"><span class="org-intro-fact-icon">💡</span>'+_info.cur+'</div>'+
            '<button class="btn btn-cyan org-intro-btn" onclick="loadMG(\''+orgId+'\',\''+levelId+'\')">¡Comenzar Quiz →</button>'+
          '</div>';
        return;
      }
    }
  }

  if((GS.completed[levelId]||{})[orgId]&&!_inReviewSession){
    const _rxp=(typeof REVIEW_XP!=='undefined'?REVIEW_XP[GS.difficulty]:5)||5;
    const _rk=levelId+'.'+orgId;
    const _alreadyReviewed=_reviewedThisSession.has(_rk);
    area.innerHTML=`<div class="org-done-card"><span style="font-size:2rem">✅</span><p>¡Organela completada!<br><small>Pulsa ℹ️ Info para ver información científica detallada.</small></p>`+
      (!_alreadyReviewed?`<button class="btn review-btn" onclick="startReview('${orgId}','${levelId}')">🔄 Repasar <span class="review-xp-badge">+${_rxp} XP</span></button>`:`<p class="review-done-msg">✓ Repasado hoy — ¡vuelve mañana!</p>`)+
      `</div>`;
    return;
  }
  const mgs=getMG(orgId);
  if(!mgs.length){area.innerHTML='<div class="mg-feedback" style="background:var(--card);border:1px solid var(--border)">🚧 Puzzle en construcción</div>';return;}
  const mg=mgs[GS.mgIndex]||mgs[0];
  GS.mgStart=Date.now();
  const labels={quiz:'❓ Quiz Opción Múltiple',fill:'📝 Completar Texto',trueFalse:'✓/✗ Verdadero o Falso',sequence:'🔢 Ordenar Secuencia'};
  const puzzleNum=GS.mgIndex+1;const puzzleTotal=mgs.length;
  const _reviewBanner=_inReviewSession?`<div class="review-mode-banner">🔄 Modo Repaso</div>`:'';
  let h=_reviewBanner+`<span class="mg-type-badge">${labels[mg.type]||'🧩 Mini-juego'}</span><span class="mg-progress-counter">Puzzle ${puzzleNum} / ${puzzleTotal}</span>`;
  if(mg.type==='quiz'){
    h+=`<div class="mg-question">${mg.q}</div><div class="mg-options">`;
    mg.opts.forEach((o,i)=>{h+=`<button class="mg-opt" onclick="pickOpt(this,${i})">${String.fromCharCode(65+i)}. ${o}</button>`;});
    h+=`</div><button class="btn btn-cyan mg-submit" id="mgBtn" onclick="submitQuiz('${orgId}','${levelId}')" disabled>Enviar Respuesta</button>`;
  } else if(mg.type==='fill'){
    const parts=mg.s.split('___');
    const ws=[...mg.words].sort(()=>Math.random()-.5);
    h+=`<div class="fill-sentence">${parts[0]}<span class="fill-blank" id="fillBlank">___</span>${parts[1]||''}</div>`;
    h+=`<div class="fill-words">`;ws.forEach(w=>{h+=`<button class="fill-word" onclick="pickWord(this,'${w}','${mg.cor}')">${w}</button>`;});h+=`</div>`;
    h+=`<button class="btn btn-cyan mg-submit" id="mgBtn" onclick="submitFill('${orgId}','${levelId}','${mg.cor}',${mg.pts})" disabled>Enviar Respuesta</button>`;
  } else if(mg.type==='trueFalse'){
    GS.tfAnswers={};
    GS.tfCorrect=mg.items.map(it=>it.a); // store correct answers in state, not inline
    h+=`<div class="mg-question">Clasifica cada afirmación:</div><div class="tf-list" id="tfList">`;
    mg.items.forEach((item,i)=>{h+=`<div class="tf-item"><div class="tf-text">${i+1}. ${item.t}</div><div class="tf-btns"><button class="tf-btn tf-true" onclick="pickTF(this,${i},true)">✓ Verdadero</button><button class="tf-btn tf-false" onclick="pickTF(this,${i},false)">✗ Falso</button></div></div>`;});
    h+=`</div><button class="btn btn-cyan mg-submit" id="tfSubmitBtn" onclick="submitTF('${orgId}','${levelId}',${mg.pts})">Enviar Respuestas</button>`;
  } else if(mg.type==='sequence'){
    const sh=[...mg.items.map((t,i)=>({t,i}))].sort(()=>Math.random()-.5);
    h+=`<div class="mg-question">Presioná y arrastrá para ordenar:</div><div class="seq-items" id="seqItems">`;
    sh.forEach((item,idx)=>{h+=`<div class="seq-item" data-orig="${item.i}"><span class="seq-handle">⠿</span><span class="seq-num">${idx+1}</span>${item.t}</div>`;});
    h+=`</div><button class="btn btn-cyan mg-submit" onclick="submitSeq('${orgId}','${levelId}',${mg.pts})">Verificar Orden</button>`;
  }
  area.innerHTML=h;
}

// Quiz
function pickOpt(btn,i){document.querySelectorAll('.mg-opt').forEach(b=>{b.classList.remove('selected');delete b.dataset.sel;});btn.classList.add('selected');btn.dataset.sel=i;const b=document.getElementById('mgBtn');if(b)b.disabled=false;}
function submitQuiz(orgId,levelId){
  const mgs=getMG(orgId);const mg=mgs[GS.mgIndex]||mgs[0];
  const sel=document.querySelector('.mg-opt.selected');
  if(!sel)return;
  const correct=parseInt(sel.dataset.sel)===mg.ans;
  document.querySelectorAll('.mg-opt').forEach((b,i)=>{if(i===mg.ans)b.classList.add('correct');else if(b.classList.contains('selected'))b.classList.add('wrong');b.classList.add('disabled');});
  document.getElementById('mgBtn')&&(document.getElementById('mgBtn').disabled=true);
  handleResult(correct,mg.pts,mg.opts[mg.ans],orgId,levelId);
}

// Fill
function pickWord(btn,w,cor){
  document.querySelectorAll('.fill-word').forEach(b=>b.classList.add('used'));
  btn.classList.remove('used');btn.classList.add('selected');
  const blank=document.getElementById('fillBlank');blank.textContent=w;blank.dataset.v=w;
  const b=document.getElementById('mgBtn');if(b)b.disabled=false;
}
function submitFill(orgId,levelId,cor,pts){
  const blank=document.getElementById('fillBlank');const v=blank?.dataset.v||blank?.textContent;
  const correct=v===cor;
  if(blank){blank.style.color=correct?'var(--accent3)':'var(--red)';blank.style.borderColor=correct?'var(--accent3)':'var(--red)';}
  document.getElementById('mgBtn')&&(document.getElementById('mgBtn').disabled=true);
  handleResult(correct,pts,cor,orgId,levelId);
}

// TrueFalse
function pickTF(btn,i,v){const row=btn.closest('.tf-item');row.querySelectorAll('.tf-btn').forEach(b=>{b.classList.remove('sel-true','sel-false');});btn.classList.add(v?'sel-true':'sel-false');GS.tfAnswers[i]=v;}
function submitTF(orgId,levelId,pts){
  const items=GS.tfCorrect||[];
  // Check all answered
  for(let i=0;i<items.length;i++){
    if(GS.tfAnswers[i]===undefined){
      const area=document.getElementById('mgArea');
      const existing=area.querySelector('.tf-warning');
      if(!existing){
        const w=document.createElement('div');
        w.className='mg-feedback error tf-warning';
        w.innerHTML='⚠️ Debes clasificar todas las afirmaciones antes de enviar.';
        area.appendChild(w);
        setTimeout(()=>w.remove(),2500);
      }
      return;
    }
  }
  // G7: contar ítems correctos para crédito parcial
  let correctCount=0;
  items.forEach((ans,i)=>{if(GS.tfAnswers[i]===ans)correctCount++;});
  const allCorrect=correctCount===items.length;
  const halfCorrect=correctCount>=Math.ceil(items.length/2); // ≥50%

  // Show correct answers visually
  const tfItems=document.querySelectorAll('.tf-item');
  tfItems.forEach((row,i)=>{
    const ans=items[i];
    const given=GS.tfAnswers[i];
    const trueBtn=row.querySelector('.tf-true');
    const falseBtn=row.querySelector('.tf-false');
    if(trueBtn)trueBtn.style.pointerEvents='none';
    if(falseBtn)falseBtn.style.pointerEvents='none';
    if(ans===true){
      if(trueBtn)trueBtn.style.background='rgba(16,185,129,0.4)';
      if(falseBtn&&given===false)falseBtn.style.background='rgba(239,68,68,0.3)';
    } else {
      if(falseBtn)falseBtn.style.background='rgba(16,185,129,0.4)';
      if(trueBtn&&given===true)trueBtn.style.background='rgba(239,68,68,0.3)';
    }
  });
  document.getElementById('tfSubmitBtn')&&(document.getElementById('tfSubmitBtn').disabled=true);
  const cor=items.map((ans,i)=>`${i+1}:${ans?'V':'F'}`).join(' ');

  if(allCorrect){
    handleResult(true,pts,cor,orgId,levelId);
  } else if(halfCorrect){
    // Crédito parcial: avanza el puzzle con puntos proporcionales
    const partialPts=Math.max(1,Math.round(pts*(correctCount/items.length)));
    GS.mgErrors++; // parcial = no perfecto
    handleResult(true,partialPts,cor,orgId,levelId,true);
  } else {
    handleResult(false,pts,cor,orgId,levelId);
  }
}

// Sequence drag
// ═══════════════ SEQUENCE DRAG (Pointer Events — desktop + mobile) ═══════════════
(function(){
  let ghost=null,src=null,srcIdx=-1,lastTarget=null;
  function getItems(){return[...document.querySelectorAll('#seqItems .seq-item')];}
  function renumber(){getItems().forEach((el,i)=>el.querySelector('.seq-num').textContent=i+1);}
  function clearDropMarkers(){getItems().forEach(el=>el.classList.remove('drop-above','drop-below'));}
  function removeGhost(){if(ghost){ghost.remove();ghost=null;}}
  function getTargetFromPoint(x,y){
    removeGhost();
    const els=getItems();
    for(const el of els){
      const r=el.getBoundingClientRect();
      if(y>=r.top&&y<=r.bottom)return el;
    }
    return null;
  }
  function insertAtTarget(t,y){
    if(!t||t===src)return;
    const r=t.getBoundingClientRect();
    const mid=r.top+r.height/2;
    const list=document.getElementById('seqItems');
    if(y<mid)list.insertBefore(src,t);
    else list.insertBefore(src,t.nextSibling);
  }
  document.addEventListener('pointerdown',function(e){
    const item=e.target.closest('.seq-item');
    if(!item||!document.getElementById('seqItems'))return;
    e.preventDefault();
    src=item;
    srcIdx=[...item.parentNode.children].indexOf(item);
    item.setPointerCapture(e.pointerId);
    item.classList.add('dragging');
    const r=item.getBoundingClientRect();
    ghost=item.cloneNode(true);
    ghost.classList.add('seq-ghost');
    // IMP-07: force fixed positioning + pointer-events:none to prevent page scroll on mobile
    const _gh=r.height/2;
    ghost.style.cssText=`position:fixed;pointer-events:none;z-index:9999;width:${r.width}px;`+
      `top:${Math.max(0,Math.min(window.innerHeight-r.height,e.clientY-_gh))}px;`+
      `left:${r.left}px;`;
    document.body.appendChild(ghost);
  },{passive:false});
  document.addEventListener('pointermove',function(e){
    if(!src)return;
    e.preventDefault();
    if(ghost){
      const _gh2=ghost.offsetHeight/2,_gw2=ghost.offsetWidth/2;
      ghost.style.top=Math.max(0,Math.min(window.innerHeight-ghost.offsetHeight,e.clientY-_gh2))+'px';
      ghost.style.left=Math.max(0,Math.min(window.innerWidth-ghost.offsetWidth,e.clientX-_gw2))+'px';
    }
    clearDropMarkers();
    const t=getTargetFromPoint(e.clientX,e.clientY);
    if(t&&t!==src){
      const r=t.getBoundingClientRect();
      t.classList.add(e.clientY<r.top+r.height/2?'drop-above':'drop-below');
      lastTarget={el:t,y:e.clientY};
    } else {lastTarget=null;}
  },{passive:false});
  document.addEventListener('pointerup',function(e){
    if(!src)return;
    removeGhost();
    clearDropMarkers();
    src.classList.remove('dragging');
    if(lastTarget)insertAtTarget(lastTarget.el,lastTarget.y);
    renumber();
    src=null;lastTarget=null;
  });
  document.addEventListener('pointercancel',function(){
    if(!src)return;
    removeGhost();clearDropMarkers();src.classList.remove('dragging');src=null;lastTarget=null;
  });
})();
function submitSeq(orgId,levelId,pts){
  const items=[...document.getElementById('seqItems').querySelectorAll('.seq-item')];
  let correct=true;items.forEach((el,i)=>{if(parseInt(el.dataset.orig)!==i)correct=false;});
  const cor=items.map((el,i)=>`${i+1}. ${el.textContent.replace(/^[⠿\s\d]+/,'').trim()}`).join(' → ');
  handleResult(correct,pts,cor,orgId,levelId);
}

// ═══════════════ HANDLE RESULT ═══════════════
// partial: true  → TrueFalse con crédito parcial (avanza pero puntos reducidos, sin speed bonus)
function handleResult(correct,pts,correctAns,orgId,levelId,partial){
  const elapsed=Math.floor((Date.now()-GS.mgStart)/1000);
  const area=document.getElementById('mgArea');
  if(correct){
    let earned=pts;
    const speedEligible=!partial&&elapsed<20;
    if(speedEligible){earned+=5;GS.speedRuns++;}
    GS.score+=earned;GS.totalDone++;
    document.getElementById('ghScore').textContent=GS.score;
    const fb=document.createElement('div');fb.className='mg-feedback success';
    fb.innerHTML=partial
      ?`⚠️ Parcialmente correcto · +${earned} pts`
      :`✅ ¡Correcto! +${earned} pts${speedEligible?' ⚡ Bonus velocidad!':''}`;
    area.appendChild(fb);
    playSound('ok');spawnConfetti();
    GS.mgIndex++;
    const mgs=getMG(orgId);
    renderPills(orgId,levelId);
    if(GS.mgIndex>=mgs.length){
      if(GS.mgErrors===0)GS.perfectRuns++; // BUG-04 fix: cuenta organelas perfectas, no puzzles
      if(!GS.completed[levelId])GS.completed[levelId]={};
      const firstCompletion=!GS.completed[levelId][orgId];
      GS.completed[levelId][orgId]=true;
      // Award XP only on first completion of this organelle
      if(firstCompletion&&typeof addXP==='function'){
        addXP((typeof DIFF_XP!=='undefined'?DIFF_XP[GS.difficulty]:0)||20);
        // P1: record completion timestamp for spaced-repetition tracking
        if(!GS.completedAt)GS.completedAt={};
        if(!GS.completedAt[levelId])GS.completedAt[levelId]={};
        GS.completedAt[levelId][orgId]=Date.now();
      }
      // G4: Award small review XP once per session per organelle (not first completion)
      if(!firstCompletion&&_inReviewSession&&typeof addXP==='function'){
        const _rk=levelId+'.'+orgId;
        if(!_reviewedThisSession.has(_rk)){
          _reviewedThisSession.add(_rk);
          const _rxp=(typeof REVIEW_XP!=='undefined'?REVIEW_XP[GS.difficulty]:5)||5;
          addXP(_rxp);
          setTimeout(()=>{
            const _a=document.getElementById('mgArea');
            if(_a){const _fb=document.createElement('div');_fb.className='mg-feedback success';_fb.style.cssText='margin-top:.4rem;font-size:.85rem;';_fb.innerHTML='🔄 Repaso completado! +'+_rxp+' XP';_a.prepend(_fb);}
          },200);
        }
        _inReviewSession=false;
      }
      drawCell(levelId);updateLevelProgress(levelId);renderLevelGrid();
      checkLevelComplete(levelId);
      setTimeout(()=>{loadMG(orgId,levelId);renderPills(orgId,levelId);},1600);
    } else {
      setTimeout(()=>loadMG(orgId,levelId),1500);
    }
  } else {
    GS.mgErrors++;
    // G6: penalización diferenciada por dificultad
    const penalty={easy:3,normal:10,hard:20}[GS.difficulty]||10;
    GS.score=Math.max(0,GS.score-penalty);
    document.getElementById('ghScore').textContent=GS.score;
    const fb=document.createElement('div');fb.className='mg-feedback error';
    // G6: en hard no se revela la respuesta correcta
    const showAns=GS.difficulty!=='hard';
    fb.innerHTML=`❌ Incorrecto −${penalty} pts${showAns&&correctAns?`<br><small>✔ Respuesta: ${correctAns.slice(0,80)}</small>`:''}`;
    area.appendChild(fb);
    playSound('err');
    setTimeout(()=>{loadMG(orgId,levelId);},2200);
  }
  checkAch();saveGame();
}

// ═══════════════ LEVEL COMPLETE ═══════════════
function checkLevelComplete(levelId){
  const orgs=ORGANELLES[levelId]||[];
  if(!orgs.every(o=>(GS.completed[levelId]||{})[o.id]))return;
  const idx=GS.levels.findIndex(l=>l.id===levelId);
  if(idx>=0&&idx<GS.levels.length-1&&!GS.levels[idx+1].unlocked){GS.levels[idx+1].unlocked=true;renderLevelGrid();}
  const lv=GS.levels.find(l=>l.id===levelId);
  document.getElementById('cmpEmoji').textContent=lv?.emoji||'🎉';
  document.getElementById('cmpTitle').textContent='¡'+lv?.name+' Completada!';
  const _isLastLv=idx>=GS.levels.length-1||!GS.levels[idx+1];
  document.getElementById('cmpSub').textContent=_isLastLv?'¡Completaste todas las células disponibles! Eres un maestro celular 🏆':'Todas las organelas descubiertas. ¡Siguiente nivel desbloqueado!';
  document.getElementById('completeOverlay').classList.add('show');
  spawnConfetti(24);
}

// ── ACHIEVEMENT REQUIREMENTS (for locked display) ──────────────────────────
const ACH_REQ={
  first_step:   'Completá 1 puzzle',
  novice:       'Completá todas las organelas de la célula Animal',
  botanist:     'Completá todas las organelas de la célula Vegetal',
  microbiologist:'Completá todas las organelas de la Procariota',
  expert:       'Completá 3 niveles completos',
  speedrunner:  'Resolvé 5 puzzles en menos de 20 segundos',
  perfectionist:'Completá 10 puzzles sin errores',
  scholar:      'Alcanzá 500 puntos de score',
  mastery:      'Completá todos los niveles disponibles',
  secret:       'Desbloqueá todos los niveles del juego',
};

let _progCurrentTab='stats';

function switchProgTab(tab){
  _progCurrentTab=tab;
  document.querySelectorAll('.prog-tab').forEach(t=>t.classList.remove('active'));
  const btn=document.getElementById('ptab-'+tab);if(btn)btn.classList.add('active');
  renderProgress(tab);
}

function renderProgress(tab){
  _progCurrentTab=tab||_progCurrentTab;
  const body=document.getElementById('progressBody');if(!body)return;
  body.innerHTML='';

  // Sync tab active state only if not already set (handles direct calls bypassing switchProgTab)
  const activeBtn=document.getElementById('ptab-'+_progCurrentTab);
  if(activeBtn&&!activeBtn.classList.contains('active')){
    document.querySelectorAll('.prog-tab').forEach(t=>t.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  if(_progCurrentTab==='stats') _renderStats(body);
  else if(_progCurrentTab==='ach') _renderAch(body);
  else if(_progCurrentTab==='cells') _renderCells(body);
}

function _renderStats(body){
  const done=GS.levels.filter(l=>{const o=ORGANELLES[l.id]||[];return o.length&&o.every(org=>(GS.completed[l.id]||{})[org.id]);});
  const totalOrgs=Object.values(GS.completed).flatMap(v=>Object.values(v)).filter(Boolean).length;
  const allOrgs=Object.keys(ORGANELLES).flatMap(k=>ORGANELLES[k]).length;
  const achUnlocked=GS.achievements.filter(a=>a.unlocked).length;
  const totalPuzzles=GS.totalDone+GS.mgErrors; // approximate total attempts
  const accuracy=totalPuzzles>0?Math.round((GS.totalDone/(GS.totalDone+GS.mgErrors))*100):0;
  const mins=Math.floor(GS.totalTime/60);
  const secs=GS.totalTime%60;

  // Player card
  const av=AV_EMOJI[GS.avatar]||'🧑‍🔬';
  const diff=DIFF_LABEL[GS.difficulty]||'Normal';
  body.insertAdjacentHTML('beforeend',`
    <div class="prog-player-card">
      <div class="prog-avatar">${av}</div>
      <div class="prog-player-info">
        <div class="prog-player-name">${GS.name||'Jugador'}</div>
        <div class="prog-player-meta">
          <span>🎯 ${diff}</span>
          <span>⭐ ${GS.score} pts</span>
          <span>⏱️ ${mins}m ${secs}s</span>
          <span>🏆 ${achUnlocked}/${GS.achievements.length} logros</span>
        </div>
      </div>
    </div>`);

  // Primary stats grid
  body.insertAdjacentHTML('beforeend','<div class="prog-section-title">Resumen general</div>');
  const grid=document.createElement('div');grid.className='prog-stats-grid';
  const stats=[
    {l:'⭐ Puntuación',v:GS.score,s:'puntos totales',hi:GS.score>=500},
    {l:'🧩 Puzzles OK',v:GS.totalDone,s:'completados correctamente',hi:GS.totalDone>=10},
    {l:'🎯 Precisión',v:accuracy+'%',s:`${GS.mgErrors} errores cometidos`,hi:accuracy>=80},
    {l:'⚡ Speed Runs',v:GS.speedRuns,s:'puzzles en < 20 seg',hi:GS.speedRuns>=5},
    {l:'💯 Sin Errores',v:GS.perfectRuns,s:'organelas perfectas',hi:GS.perfectRuns>=10},
    {l:'🔬 Organelas',v:totalOrgs+'/'+allOrgs,s:'descubiertas',hi:totalOrgs===allOrgs},
    {l:'🏅 Niveles',v:done.length+'/'+GS.levels.length,s:'completados',hi:done.length===GS.levels.length},
    {l:'🏆 Logros',v:achUnlocked+'/'+GS.achievements.length,s:'desbloqueados',hi:achUnlocked===GS.achievements.length},
  ];
  stats.forEach(s=>{
    const c=document.createElement('div');
    c.className='prog-stat-card'+(s.hi?' highlight':'');
    c.innerHTML=`<div class="prog-stat-label">${s.l}</div><div class="prog-stat-value">${s.v}</div><div class="prog-stat-sub">${s.s}</div>`;
    grid.appendChild(c);
  });
  body.appendChild(grid);

  // Accuracy bar
  body.insertAdjacentHTML('beforeend',`
    <div class="prog-accuracy-row">
      <div class="prog-section-title" style="margin-bottom:.3rem">Precisión de respuestas</div>
      <div class="prog-bar-wrap"><div class="prog-bar-fill" style="width:${accuracy}%;background:${accuracy>=80?'#34d399':accuracy>=50?'#fbbf24':'#ef4444'}"></div></div>
      <div class="prog-bar-label"><span>${GS.mgErrors} errores</span><span>${accuracy}% correcto</span><span>${GS.totalDone} aciertos</span></div>
    </div>`);

  // Level breakdown table
  body.insertAdjacentHTML('beforeend','<div class="prog-section-title">Detalle por nivel</div>');
  const table=document.createElement('div');table.className='prog-levels-table';
  table.innerHTML='<div class="prog-levels-row header"><div class="lname">Nivel</div><div class="lorgs">Organelas</div><div class="lscore">Avance</div><div class="lstatus">Estado</div></div>';
  GS.levels.forEach(lv=>{
    const orgs=ORGANELLES[lv.id]||[];
    const doneOrgs=Object.values(GS.completed[lv.id]||{}).filter(Boolean).length;
    const total=orgs.length;
    const pct=total?Math.round(doneOrgs/total*100):0;
    const isDone=total&&doneOrgs===total;
    const status=!lv.unlocked?'🔒 Bloqueado':!total?'🚧 Pronto':isDone?'✅ Completo':`${pct}%`;
    const avance=!lv.unlocked||!total?'—':isDone?'100%':pct+'%';
    const row=document.createElement('div');row.className='prog-levels-row';
    row.innerHTML=`<div class="lname">${lv.emoji} ${lv.name}</div><div class="lorgs">${total?doneOrgs+'/'+total:'—'}</div><div class="lscore">${avance}</div><div class="lstatus">${status}</div>`;
    table.appendChild(row);
  });
  body.appendChild(table);
}

function _renderAch(body){
  const unlocked=GS.achievements.filter(a=>a.unlocked).length;
  body.insertAdjacentHTML('beforeend',`
    <div class="prog-player-card">
      <div class="prog-avatar">🏆</div>
      <div class="prog-player-info">
        <div class="prog-player-name">${unlocked} de ${GS.achievements.length} logros desbloqueados</div>
        <div class="prog-player-meta"><span>Desbloqueá todos los logros para dominar el juego</span></div>
      </div>
    </div>`);

  body.insertAdjacentHTML('beforeend','<div class="prog-section-title">Logros desbloqueados</div>');
  const gridU=document.createElement('div');gridU.className='prog-ach-grid';
  let hasUnlocked=false;
  GS.achievements.filter(a=>a.unlocked).forEach(a=>{
    hasUnlocked=true;
    const c=document.createElement('div');c.className='prog-ach-card unlocked';
    c.innerHTML=`<div class="prog-ach-emoji">${a.emoji}</div><div class="prog-ach-body"><div class="prog-ach-name">${a.name}</div><div class="prog-ach-desc">${a.desc}</div><div class="prog-ach-status">✅ Desbloqueado</div></div>`;
    gridU.appendChild(c);
  });
  if(!hasUnlocked){gridU.innerHTML='<div style="color:var(--muted);font-size:.85rem;grid-column:1/-1;padding:.5rem">Todavía no desbloqueaste ningún logro. ¡A jugar!</div>';}
  body.appendChild(gridU);

  body.insertAdjacentHTML('beforeend','<div class="prog-section-title" style="margin-top:.4rem">Logros pendientes — Requisitos</div>');
  const gridL=document.createElement('div');gridL.className='prog-ach-grid';
  let hasLocked=false;
  GS.achievements.filter(a=>!a.unlocked).forEach(a=>{
    hasLocked=true;
    const c=document.createElement('div');c.className='prog-ach-card locked';
    c.innerHTML=`<div class="prog-ach-emoji">${a.emoji}</div><div class="prog-ach-body"><div class="prog-ach-name">${a.name}</div><div class="prog-ach-desc">${a.desc}</div><div class="prog-ach-req">📋 Requisito: ${ACH_REQ[a.id]||a.desc}</div><div class="prog-ach-locked-badge">🔒 Bloqueado</div></div>`;
    gridL.appendChild(c);
  });
  if(!hasLocked){gridL.innerHTML='<div style="color:#34d399;font-size:.85rem;grid-column:1/-1;padding:.5rem">🎉 ¡Desbloqueaste todos los logros! ¡Maestría celular completa!</div>';}
  body.appendChild(gridL);
}

function _renderCells(body){
  body.insertAdjacentHTML('beforeend','<div class="prog-section-title">Progreso detallado por célula y organela</div>');
  // Derived from LEVELS — single source of truth
  const cellDefs=LEVELS.map(l=>({id:l.id,name:l.name,emoji:l.emoji}));
  cellDefs.forEach(cd=>{
    const orgs=ORGANELLES[cd.id]||[];
    if(!orgs.length)return;
    const completedOrgs=GS.completed[cd.id]||{};
    const doneCount=orgs.filter(o=>completedOrgs[o.id]).length;
    const pct=Math.round(doneCount/orgs.length*100);
    const sec=document.createElement('div');sec.className='prog-cell-section';
    sec.innerHTML=`
      <div class="prog-cell-header">
        <div class="prog-cell-emoji">${cd.emoji}</div>
        <div class="prog-cell-name">${cd.name}</div>
        <div class="prog-cell-pct">${doneCount}/${orgs.length} · ${pct}%</div>
      </div>
      <div class="prog-cell-progress"><div class="prog-cell-progress-fill" style="width:${pct}%"></div></div>
      <div class="prog-cell-orgs">
        ${orgs.map(o=>{
          const done=!!completedOrgs[o.id];
          return `<div class="prog-org-row ${done?'done':''}">
            <span class="${done?'org-done':'org-pend'}">${done?'✓':'○'}</span>
            <span class="org-emoji">${o.emoji}</span>
            <span class="org-name">${o.name}</span>
          </div>`;
        }).join('')}
      </div>`;
    body.appendChild(sec);
  });
}

// Legacy compatibility
function renderAchievements(){renderProgress('ach');}
function renderStats(){renderProgress('stats');}

