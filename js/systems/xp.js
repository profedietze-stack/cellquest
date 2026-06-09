// CellQuest — XP & Player Level System

// ═══ PLAYER RANK TABLE ═══
const PLAYER_LEVELS = [
  {level:1,  title:'Aprendiz',           xp:0},
  {level:2,  title:'Estudiante',         xp:150},
  {level:3,  title:'Observador',         xp:350},
  {level:4,  title:'Investigador',       xp:650},
  {level:5,  title:'Científico',         xp:1050},
  {level:6,  title:'Biólogo',            xp:1550},
  {level:7,  title:'Experto',            xp:2150},
  {level:8,  title:'Investigador Sénior',xp:2850},
  {level:9,  title:'Maestro',            xp:3650},
  {level:10, title:'CellMaster',         xp:4500},
];

// ═══ XP NEEDED TO UNLOCK EACH CELL ═══
// Thresholds calibrated so each cell unlocks after a natural milestone:
//   plant     → after ~4 easy organelles of animal          (~80 XP)
//   prokaryote→ after completing animal easy mode           (~300 XP)
//   fungi     → after completing animal easy+normal         (~800 XP)
//   neuron    → after completing animal fully               (~1600 XP)
//   rbc       → after animal+plant easy mode                (~2500 XP)
//   xylem     → after 3 cells heavily completed             (~3200 XP)
const CELL_XP_UNLOCK = {
  animal:0, plant:80, prokaryote:300, fungi:800, neuron:1600, hepatocyte:2000, rbc:2500, xylem:3200, myocyte:5200, tcell:6800
};

// ═══ XP AWARDED PER ORGANELLE FIRST COMPLETION ═══
const DIFF_XP = {easy:20, normal:35, hard:55};

// ═══ XP AWARDED FOR REPLAYING A COMPLETED ORGANELLE (once per session) ═══
const REVIEW_XP = {easy:5, normal:8, hard:12};

// ─────────────────────────────────────────
function getPlayerLevel(xp){
  xp = xp || 0;
  let found = PLAYER_LEVELS[0];
  for(const l of PLAYER_LEVELS){ if(xp >= l.xp) found = l; else break; }
  return found;
}
function getNextLevel(xp){
  xp = xp || 0;
  for(const l of PLAYER_LEVELS){ if(l.xp > xp) return l; }
  return null; // already max
}

// ─────────────────────────────────────────
function addXP(amount){
  if(!amount) return;
  const prev = getPlayerLevel(GS.xp);
  GS.xp = (GS.xp || 0) + amount;
  const curr = getPlayerLevel(GS.xp);

  checkXPUnlocks();
  updateXPDisplay();
  if(typeof saveGame === 'function') saveGame();

  _showXPGain(amount);
  if(curr.level > prev.level) _showLevelUpToast(curr);
}

// ─────────────────────────────────────────
function _showXPGain(amount){
  const el = document.createElement('div');
  el.className = 'xp-gain-pop';
  el.textContent = '+' + amount + ' XP';
  // anchor to XP bar if visible, else top-right
  const bar = document.getElementById('xpBar');
  const anchor = bar ? bar.closest('.xp-track') || bar.parentElement : null;
  if(anchor){
    const rect = anchor.getBoundingClientRect();
    el.style.cssText = 'position:fixed;left:' + (rect.left + rect.width/2) + 'px;top:' + (rect.top - 4) + 'px;transform:translate(-50%,0)';
  } else {
    el.style.cssText = 'position:fixed;right:18px;top:70px';
  }
  document.body.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('xp-gain-pop--run'));
  setTimeout(()=>el.remove(), 1100);
}

// ─────────────────────────────────────────
function checkXPUnlocks(){
  const xp = GS.xp || 0;
  const newlyUnlocked = [];
  GS.levels.forEach(lv => {
    const thresh = CELL_XP_UNLOCK[lv.id];
    if(thresh !== undefined && !lv.unlocked && xp >= thresh){
      lv.unlocked = true;
      newlyUnlocked.push(lv);
    }
  });
  if(newlyUnlocked.length){
    if(typeof renderLevelGrid === 'function') renderLevelGrid();
    newlyUnlocked.forEach((lv,i) => {
      setTimeout(() => {
        const t = document.createElement('div');
        t.className = 'ach-toast unlock-toast';
        t.innerHTML =
          '<div class="toast-inner">' +
            '<div class="toast-emoji">🔓</div>' +
            '<div class="toast-text">' +
              '<h4>¡Nueva célula disponible!</h4>' +
              '<p>' + lv.emoji + ' ' + lv.name + ' desbloqueada</p>' +
            '</div>' +
          '</div>';
        document.body.appendChild(t);
        setTimeout(function(){ t.remove(); }, 4000);
      }, 400 + i*600);
    });
  }
  return newlyUnlocked;
}

// ─────────────────────────────────────────
function updateXPDisplay(){
  const xp   = GS.xp || 0;
  const curr = getPlayerLevel(xp);
  const next = getNextLevel(xp);

  const badge = document.getElementById('playerLevelBadge');
  const lbl   = document.getElementById('xpLabel');
  const bar   = document.getElementById('xpBar');

  if(badge) badge.textContent = 'Nv.' + curr.level + ' ' + curr.title;

  if(next){
    const pct = Math.min(100, Math.round(((xp - curr.xp) / (next.xp - curr.xp)) * 100));
    if(lbl) lbl.textContent = xp + ' / ' + next.xp + ' XP';
    if(bar) bar.style.width = pct + '%';
  } else {
    if(lbl) lbl.textContent = xp + ' XP — MAX';
    if(bar) bar.style.width = '100%';
  }
}

// ─────────────────────────────────────────
function _showLevelUpToast(lvlData){
  const t = document.createElement('div');
  t.className = 'ach-toast levelup-toast';
  t.innerHTML =
    '<div class="toast-inner">' +
      '<div class="toast-emoji">⭐</div>' +
      '<div class="toast-text">' +
        '<h4>¡Subiste de nivel!</h4>' +
        '<p>Ahora eres <strong>' + lvlData.title + '</strong> (Nv.' + lvlData.level + ')</p>' +
      '</div>' +
    '</div>';
  document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, 4500);
}

// ─────────────────────────────────────────
// Init: drawer.js loads before xp.js and its 'load' handler calls loadSave() first,
// so by the time this handler runs GS is already populated — no setTimeout needed (IMP-03).
window.addEventListener('load', function(){
  if(typeof GS !== 'undefined'){
    checkXPUnlocks();
    updateXPDisplay();
  }
});
