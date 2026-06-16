// CellQuest — Dev Debug Tools
// Activa con ?debug=1 en URL. No afecta producción normal.
(function(){
  'use strict';

  const params = new URLSearchParams(location.search);
  const DEBUG  = params.has('debug');

  // ══════════════════════════════════════════════
  // B — ERROR SURFACE (siempre activo en local)
  // ══════════════════════════════════════════════
  window.onerror = function(msg, src, line, col, err){
    _errToast('[JS ERROR] ' + msg + '\n' + (src||'').split('/').pop() + ':' + line + ':' + col);
    return false;
  };
  window.addEventListener('unhandledrejection', function(e){
    _errToast('[Promise] ' + (e.reason && e.reason.message ? e.reason.message : String(e.reason)));
  });
  function _errToast(text){
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:99999;' +
      'background:#1a0a0a;border:1.5px solid #ef4444;border-radius:10px;padding:10px 14px;' +
      'color:#fca5a5;font-family:monospace;font-size:.75rem;max-width:90vw;white-space:pre-wrap;' +
      'box-shadow:0 4px 20px rgba(239,68,68,.35);';
    d.textContent = '🔴 ' + text;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 8000);
  }

  // ══════════════════════════════════════════════
  // C — URL PARAMS (siempre activos al cargar)
  // ══════════════════════════════════════════════
  window.addEventListener('load', function(){
    // ?reset=1 — borra localStorage y recarga sin el param
    if(params.has('reset')){
      localStorage.removeItem('cq3');
      localStorage.removeItem('cq3_proc_seen');
      const u = new URL(location.href);
      u.searchParams.delete('reset');
      location.replace(u.toString());
      return;
    }

    // ?xp=N — fuerza XP al valor indicado
    if(params.has('xp')){
      const xp = parseInt(params.get('xp'), 10);
      if(!isNaN(xp) && typeof GS !== 'undefined'){
        GS.xp = xp;
        if(typeof checkXPUnlocks === 'function') checkXPUnlocks();
        if(typeof updateXPDisplay === 'function') updateXPDisplay();
        if(typeof saveGame === 'function') saveGame(true);
        _devLog('XP set → ' + xp);
      }
    }

    // ?unlock=all — desbloquea todas las células
    if(params.get('unlock') === 'all' && typeof GS !== 'undefined'){
      GS.levels.forEach(l => l.unlocked = true);
      if(typeof renderLevelGrid === 'function') renderLevelGrid();
      if(typeof saveGame === 'function') saveGame(true);
      _devLog('All cells unlocked');
    }

    // ?proc=ID — abre Célula en Acción directo a ese proceso (Cine)
    if(params.has('proc')){
      const procId = params.get('proc');
      setTimeout(function(){
        if(typeof goProcesos === 'function') goProcesos();
        setTimeout(function(){
          if(typeof window._dbgOpenProc === 'function') window._dbgOpenProc(procId);
        }, 300);
      }, 500);
      _devLog('Opening proceso: ' + procId);
    }

    // Panel de debug
    if(DEBUG) _buildPanel();
  });

  // Expose hook for ?proc param (procesos.js calls this after IIFE init)
  window._dbgOpenProc = function(id){
    // Try to click the matching cine card
    const cards = document.querySelectorAll('.proc-card');
    cards.forEach(function(c){
      if(c.dataset && c.dataset.procId === id) c.click();
    });
  };

  // ══════════════════════════════════════════════
  // A — DEBUG PANEL (?debug=1)
  // ══════════════════════════════════════════════
  function _buildPanel(){
    const panel = document.createElement('div');
    panel.id = 'dbgPanel';
    panel.style.cssText =
      'position:fixed;top:0;right:0;z-index:99998;width:280px;max-height:100vh;overflow-y:auto;' +
      'background:rgba(5,10,25,.97);border-left:2px solid #00e5ff;font-family:monospace;font-size:.72rem;' +
      'color:#8eaec0;padding:10px;box-sizing:border-box;';

    panel.innerHTML =
      '<div style="color:#00e5ff;font-weight:700;margin-bottom:8px;font-size:.8rem">🔬 CellQuest Debug</div>' +

      // Quick actions
      '<div style="color:#fbbf24;margin:6px 0 3px">— Acciones —</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">' +
        _btn('Reset save',   'cqDbgReset()')   +
        _btn('+100 XP',      'cqDbgXP(100)')   +
        _btn('+500 XP',      'cqDbgXP(500)')   +
        _btn('Unlock all',   'cqDbgUnlock()')  +
        _btn('All procesos', 'cqDbgProcSeen()') +
        _btn('Clear proc',   'cqDbgProcClear()') +
        _btn('Refresh GS',   'cqDbgRefresh()') +
      '</div>' +

      // GS snapshot
      '<div style="color:#fbbf24;margin:6px 0 3px">— Game State —</div>' +
      '<pre id="dbgGS" style="white-space:pre-wrap;word-break:break-all;margin:0;font-size:.68rem;color:#94a3b8"></pre>' +

      // localStorage
      '<div style="color:#fbbf24;margin:6px 0 3px">— localStorage —</div>' +
      '<pre id="dbgLS" style="white-space:pre-wrap;word-break:break-all;margin:0;font-size:.68rem;color:#94a3b8"></pre>';

    document.body.appendChild(panel);
    _refreshPanel();

    // Auto-refresh every 2s
    setInterval(_refreshPanel, 2000);
  }

  function _btn(label, fn){
    return '<button onclick="' + fn + '" style="background:rgba(0,229,255,.1);border:1px solid rgba(0,229,255,.3);' +
      'color:#00e5ff;border-radius:5px;padding:2px 7px;font-size:.68rem;cursor:pointer">' + label + '</button>';
  }

  function _refreshPanel(){
    const gsEl = document.getElementById('dbgGS');
    const lsEl = document.getElementById('dbgLS');
    if(gsEl && typeof GS !== 'undefined'){
      const snap = {
        name: GS.name, xp: GS.xp, score: GS.score,
        difficulty: GS.difficulty,
        unlockedCells: (GS.levels||[]).filter(l=>l.unlocked).map(l=>l.id),
        achievements: (GS.achievements||[]).filter(a=>a.unlocked).map(a=>a.id),
      };
      gsEl.textContent = JSON.stringify(snap, null, 2);
    }
    if(lsEl){
      const ls = {};
      try{ ls['cq3(keys)'] = Object.keys(JSON.parse(localStorage.getItem('cq3')||'{}')); }catch(e){}
      try{ ls['cq3_proc_seen'] = JSON.parse(localStorage.getItem('cq3_proc_seen')||'{}'); }catch(e){}
      lsEl.textContent = JSON.stringify(ls, null, 2);
    }
  }

  // ══════════════════════════════════════════════
  // DEBUG ACTION FUNCTIONS (global)
  // ══════════════════════════════════════════════
  window.cqDbgReset = function(){
    localStorage.removeItem('cq3');
    localStorage.removeItem('cq3_proc_seen');
    location.reload();
  };
  window.cqDbgXP = function(amount){
    if(typeof addXP === 'function') addXP(amount);
    _refreshPanel();
  };
  window.cqDbgUnlock = function(){
    if(typeof GS === 'undefined') return;
    GS.levels.forEach(l => l.unlocked = true);
    if(typeof renderLevelGrid === 'function') renderLevelGrid();
    if(typeof saveGame === 'function') saveGame(true);
    _refreshPanel();
    _devLog('All cells unlocked');
  };
  window.cqDbgProcSeen = function(){
    const all = ['respiracion','alimentacion','reproduccion','defensa','sintesis','fotosintesis'];
    const seen = {};
    all.forEach(id => { seen[id] = true; seen['j_' + id] = true; });
    localStorage.setItem('cq3_proc_seen', JSON.stringify(seen));
    _refreshPanel();
    _devLog('All procesos marked seen');
  };
  window.cqDbgProcClear = function(){
    localStorage.removeItem('cq3_proc_seen');
    _refreshPanel();
    _devLog('Proc seen cleared');
  };
  window.cqDbgRefresh = function(){
    _refreshPanel();
  };

  function _devLog(msg){
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:99999;' +
      'background:rgba(0,229,255,.12);border:1px solid rgba(0,229,255,.4);border-radius:8px;' +
      'padding:6px 14px;color:#00e5ff;font-family:monospace;font-size:.75rem;pointer-events:none;';
    d.textContent = '🔬 ' + msg;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 2500);
  }

})();
