// CellQuest — Tutorial de primer uso
(function(){
  const KEY = 'cq3_tutorial';

  const STEPS = [
    { targetId: null,
      icon: '🧬', title: '¡Bienvenido a CellQuest!',
      body: 'Vas a explorar el interior de distintos tipos de células. Activa sus organelas y resuelve minijuegos para convertirte en experto.',
      btn: 'Comenzar tour →' },
    { targetId: function(){ return (typeof isMobile === 'function' && isMobile()) ? 'drawerFab' : 'levelGrid'; },
      icon: '🗺️', title: '① Elige una célula',
      body: 'Selecciona el tipo de célula que quieres explorar para cargar su diagrama interactivo.',
      btn: 'Siguiente →' },
    { targetId: 'cellSvgWrap',
      icon: '🔬', title: '② Activa una organela',
      body: 'Haz clic en cualquier organela del diagrama. Cada una tiene sus propios minijuegos y preguntas de biología.',
      btn: 'Siguiente →' },
    { targetId: null,
      icon: '🏆', title: '③ Completa y sube de nivel',
      body: 'Supera todas las organelas de una célula para dominarla. Cuanto mejor respondas, más puntos y logros ganarás.',
      btn: '¡Empezar!' }
  ];

  var step = 0;
  var overlayEl = null;
  var spotlightEl, calloutEl, backdropEl;

  function seen(){ return !!localStorage.getItem(KEY); }
  function markSeen(){ localStorage.setItem(KEY, '1'); }

  function init(){
    if(seen()) return;
    if(overlayEl) return;

    overlayEl  = Object.assign(document.createElement('div'), {id:'tut-overlay'});
    backdropEl = Object.assign(document.createElement('div'), {id:'tut-backdrop'});
    spotlightEl= Object.assign(document.createElement('div'), {id:'tut-spotlight'});
    calloutEl  = Object.assign(document.createElement('div'), {id:'tut-callout'});

    overlayEl.append(backdropEl, spotlightEl, calloutEl);
    document.body.appendChild(overlayEl);

    showStep(0);
  }

  function resolveTarget(s){
    if(!s.targetId) return null;
    var id = typeof s.targetId === 'function' ? s.targetId() : s.targetId;
    return id ? document.getElementById(id) : null;
  }

  function showStep(n){
    step = n;
    var s = STEPS[n];
    var targetEl = resolveTarget(s);

    if(targetEl){
      var r = targetEl.getBoundingClientRect();
      var PAD = 10;
      Object.assign(spotlightEl.style, {
        display: 'block',
        left:   (r.left   - PAD) + 'px',
        top:    (r.top    - PAD) + 'px',
        width:  (r.width  + PAD*2) + 'px',
        height: (r.height + PAD*2) + 'px'
      });
      backdropEl.style.display = 'none';
      overlayEl.dataset.mode = 'spotlight';
    } else {
      spotlightEl.style.display = 'none';
      backdropEl.style.display = 'block';
      overlayEl.dataset.mode = 'backdrop';
    }

    var isLast = (n === STEPS.length - 1);
    calloutEl.innerHTML =
      '<div class="tut-icon">' + s.icon + '</div>' +
      '<div class="tut-step">Paso ' + (n+1) + ' de ' + STEPS.length + '</div>' +
      '<h3 class="tut-title">' + s.title + '</h3>' +
      '<p class="tut-body">' + s.body + '</p>' +
      '<div class="tut-footer">' +
        (isLast ? '' : '<button class="tut-skip" onclick="window._tutSkip()">Saltar</button>') +
        '<button class="tut-next" onclick="window._tutNext()">' + s.btn + '</button>' +
      '</div>';

    // Position callout near target or centered
    if(targetEl){
      var r2 = targetEl.getBoundingClientRect();
      var CW = 288, CH = 200;
      var left = r2.left;
      var top  = r2.bottom + 18;
      if(top + CH > window.innerHeight - 12) top = r2.top - CH - 18;
      if(left + CW > window.innerWidth  - 12) left = window.innerWidth - CW - 12;
      left = Math.max(12, left);
      top  = Math.max(12, top);
      Object.assign(calloutEl.style, { left: left+'px', top: top+'px', transform:'none' });
    } else {
      Object.assign(calloutEl.style, { left:'50%', top:'50%', transform:'translate(-50%,-50%)' });
    }
  }

  window._tutNext = function(){
    if(step < STEPS.length - 1) showStep(step + 1);
    else closeTutorial();
  };

  window._tutSkip = function(){ closeTutorial(); };

  function closeTutorial(){
    markSeen();
    if(overlayEl){ overlayEl.remove(); overlayEl = null; }
  }

  // Patch enterGame — trigger tutorial on first play
  var _orig = enterGame;
  enterGame = function(){
    _orig.apply(this, arguments);
    if(!seen()) setTimeout(init, 750);
  };

  // Dev helpers
  window._resetTutorial = function(){ localStorage.removeItem(KEY); location.reload(); };
  window._showTutorial  = init;

})();
