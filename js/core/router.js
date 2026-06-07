// CellQuest — Navigation / Router
// ═══════════════ NAVIGATION ═══════════════
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');closeDrawer();updateFabVisibility();}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
function closeComplete(){document.getElementById('completeOverlay').classList.remove('show');}
function goAchievements(){goProgress('ach');}
function goStats(){goProgress('stats');}
function goProgress(tab){if(typeof stopTimer==='function')stopTimer();renderProgress(tab||'stats');showScreen('progressScreen');}
function goProcesos(){showScreen('procesosScreen');if(typeof initProcesos==='function')initProcesos();}
function _backFromMeta(){if(GS.currentLevel){showScreen('gameScreen');if(typeof startTimer==='function')startTimer();}else{showScreen('menuScreen');}}

