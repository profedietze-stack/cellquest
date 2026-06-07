// CellQuest — Splash Screen + Avatar/Menu Helpers
// ═══════════════ SPLASH SCREEN ═══════════════
(function(){
  const QUOTES=[
    {q:'La ciencia no conoce fronteras, porque el conocimiento pertenece a la humanidad.',a:'Louis Pasteur'},
    {q:'En cada célula late el secreto de la vida. Cada organela es un universo en miniatura.',a:'Lynn Margulis'},
    {q:'La curiosidad tiene su propia razón de existir. El asombro ante los misterios de la vida es el origen de todo arte y toda ciencia.',a:'Albert Einstein'},
    {q:'La biología celular es la física del ser vivo: precisa, elegante, inexorable.',a:'Francis Crick'},
    {q:'Comprender cómo funciona una célula es comprender cómo funciona la vida misma.',a:'Christian de Duve'},
    {q:'La ciencia es la mejor herramienta que ha creado la humanidad para entender cómo funciona el mundo.',a:'Carl Sagan'},
    {q:'Una sola célula contiene más complejidad que cualquier ciudad construida por el ser humano.',a:'Bruce Alberts'},
    {q:'El microscopio abrió un universo que existía ante nuestros ojos sin que pudiéramos verlo.',a:'Antonie van Leeuwenhoek'},
    {q:'La vida es química, la química es física, y la física es matemática. Todo está conectado.',a:'Erwin Schrödinger'},
    {q:'Estudiar biología es descubrir que somos, literalmente, el universo conociéndose a sí mismo.',a:'Neil deGrasse Tyson'},
  ];

  const LEVEL_COLORS={animal:'#ef4444',plant:'#10b981',prokaryote:'#f59e0b',fungi:'#a78bfa',neuron:'#ec4899',rbc:'#dc2626',xylem:'#84cc16'};

  // Welcome messages based on progress
  function getWelcomeMsg(save){
    if(!save)return'Bienvenido, explorador de la ciencia';
    const done=Object.keys(save.completed||{}).filter(id=>Object.values(save.completed[id]||{}).some(Boolean));
    const levels=(save.levels||[]).filter(l=>l.unlocked&&l.id!=='animal');
    if(!done.length)return`¡Bienvenido de vuelta, ${save.name||'explorador'}! Tu aventura comienza.`;
    if(done.length===1)return`¡Regresa, ${save.name||'explorador'}! La Célula Animal espera más descubrimientos.`;
    if(done.length===2)return`¡Bienvenido, científico! Ya conoces ${done.length} tipos celulares.`;
    if(levels.length>=5)return`¡Maestro celular, ${save.name||'biólogo'}! ${done.length} células descubiertas. Solo los más perseverantes llegan aquí.`;
    if(levels.length>=3)return`¡Impresionante, ${save.name||'biólogo'}! Dominas ${done.length} células. ¿Podrás completarlas todas?`;
    return`Bienvenido de vuelta, ${save.name||'explorador de la ciencia'}`;
  }

  function buildSplashOrbs(save){
    const orbs=document.getElementById('splashOrbs');
    if(!orbs)return;
    const levels=LEVELS;
    const savedLevels=save?.levels||[];
    orbs.innerHTML='';
    levels.forEach(lv=>{
      const savedLv=savedLevels.find(l=>l.id===lv.id)||lv;
      const orgs=ORGANELLES[lv.id]||[];
      const completedOrgs=Object.values((save?.completed||{})[lv.id]||{}).filter(Boolean).length;
      const isUnlocked=savedLv.unlocked;
      const isDone=orgs.length&&orgs.every(o=>(save?.completed||{})[lv.id]?.[o.id]);
      const el=document.createElement('div');
      el.className='splash-orb'+(isUnlocked?' unlocked':'');
      el.style.cssText=`background:${LEVEL_COLORS[lv.id]};color:${LEVEL_COLORS[lv.id]};width:${isUnlocked?'12px':'8px'};height:${isUnlocked?'12px':'8px'};opacity:${isDone?'1':isUnlocked?'.75':'.2'}`;
      el.title=lv.name+(isDone?' ✓':'');
      orbs.appendChild(el);
    });
  }

  function buildParticles(){
    const wrap=document.getElementById('splashParticles');
    if(!wrap)return;
    const emojis=['⚗️','🔬','🧬','🦠','🧫','🔭','💊','🧪'];
    for(let i=0;i<12;i++){
      const el=document.createElement('div');
      el.className='sp';
      el.textContent=emojis[i%emojis.length];
      el.style.cssText=`left:${Math.random()*100}%;bottom:${-5-Math.random()*10}%;font-size:${1+Math.random()*1.4}rem;animation-duration:${8+Math.random()*14}s;animation-delay:${Math.random()*8}s;opacity:.15`;
      wrap.appendChild(el);
    }
  }

  // P1: Count organelles due for review from raw save data
  function countOverdueSave(save){
    if(!save||!save.completedAt)return 0;
    const now=Date.now();
    const MS=3*24*60*60*1000;
    let n=0;
    Object.entries(save.completedAt).forEach(([lvId,orgs])=>{
      Object.entries(orgs).forEach(([orgId,t])=>{
        if(t&&(now-t)>MS)n++;
      });
    });
    return n;
  }

  function initSplash(){
    const raw=localStorage.getItem('cq3');
    const save=raw?JSON.parse(raw):null;

    // Welcome text
    const wEl=document.getElementById('splashWelcome');
    if(wEl)wEl.textContent=getWelcomeMsg(save);

    // P1: Show review reminder if returning after ≥24h with overdue organelles
    const reviewEl=document.getElementById('splashReviewBanner');
    if(reviewEl&&save){
      const hoursSince=save.lastSession?((Date.now()-save.lastSession)/3600000):0;
      const overdueN=countOverdueSave(save);
      if(hoursSince>=24&&overdueN>0){
        reviewEl.textContent='🔔 Tienes '+overdueN+' organela'+(overdueN===1?'':'s')+' para repasar. ¡Refuerza tu memoria!';
        reviewEl.style.display='block';
      }
    }

    // Random quote
    const q=QUOTES[Math.floor(Math.random()*QUOTES.length)];
    const qEl=document.getElementById('splashQuote');
    const aEl=document.getElementById('splashAuthor');
    if(qEl)qEl.textContent=q.q;
    if(aEl)aEl.textContent='— '+q.a;

    // Progress orbs
    buildSplashOrbs(save);
    buildParticles();
  }

  window.startFromSplash=function(){
    sndStart();
    enterFullscreen();   // must be called synchronously inside user gesture
    // Boot Tone.js AudioContext here (user gesture)
    if(typeof Tone!=='undefined'){
      Tone.start().then(()=>{
        if(typeof buildMusic==='function')buildMusic();
      });
    }
    // Animate out
    const splash=document.getElementById('splashScreen');
    splash.classList.add('hidden');
    setTimeout(()=>{
      splash.classList.remove('active');
      splash.classList.remove('hidden');
      showScreen('menuScreen');
    },580);
  };

  // Run after DOM + scripts ready
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initSplash);
  } else {
    initSplash();
  }
})();
function spawnConfetti(n=10){
  const em=['🧬','✨','⭐','🔬','💫','🎉','🌟','🏆'];
  for(let i=0;i<n;i++){setTimeout(()=>{const el=document.createElement('div');el.className='confetti-piece';el.textContent=em[Math.floor(Math.random()*em.length)];el.style.left=Math.random()*100+'%';el.style.top='-20px';el.style.animationDuration=(1.4+Math.random())+'s';document.body.appendChild(el);setTimeout(()=>el.remove(),2400);},i*55);}
}


