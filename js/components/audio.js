// CellQuest — Audio Engine (SFX + Procedural Music)
// ═══════════════ SOUND (Web Audio API) ═══════════════
// Dedicated SFX context — completely separate from Tone.js's context.
// NEVER call Tone.getContext() or Tone.start() from here; that would
// cause Tone's scheduler to glitch every time a hover/click fires.
let _sfxAC=null;
function getAC(){
  if(!_sfxAC||_sfxAC.state==='closed')
    _sfxAC=new(window.AudioContext||window.webkitAudioContext)();
  // Only resume if suspended; never touch Tone.js's context.
  if(_sfxAC.state==='suspended')_sfxAC.resume();
  return _sfxAC;
}

// Utility: make a tone burst
function _tone(freq,type,vol,dur,t,c,freqEnd){
  const o=c.createOscillator(),g=c.createGain();
  o.connect(g);g.connect(c.destination);
  o.type=type;o.frequency.setValueAtTime(freq,t);
  if(freqEnd)o.frequency.exponentialRampToValueAtTime(freqEnd,t+dur*.7);
  g.gain.setValueAtTime(vol,t);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.start(t);o.stop(t+dur+.01);
}

// Utility: noise burst (click/thud body)
function _noise(vol,dur,t,c,hipass=0){
  const buf=c.createBuffer(1,c.sampleRate*dur,c.sampleRate);
  const d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  const src=c.createBufferSource();src.buffer=buf;
  const g=c.createGain();
  if(hipass){const f=c.createBiquadFilter();f.type='highpass';f.frequency.value=hipass;src.connect(f);f.connect(g);}
  else src.connect(g);
  g.connect(c.destination);
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  src.start(t);src.stop(t+dur+.01);
}

// CLICK — layered soft mechanical thud + subtle high tick
function sndClick(){
  try{
    const c=getAC(),t=c.currentTime;
    _noise(.14,.022,t,c,0);            // body thud
    _tone(100,'sine',.18,.07,t,c,55);  // low body resonance, slight pitch drop
    _tone(3200,'sine',.025,.018,t,c);  // subtle top tick
  }catch(e){}
}

// HOVER — very soft, ultra-short tick. Uses OWN _sfxAC, never touches Tone.
// Rate-limited to 90ms in the listener below; safe.
function sndHover(){
  try{
    const c=getAC(),t=c.currentTime;
    _tone(1800,'sine',.018,.012,t,c);  // barely audible presence tick
  }catch(e){}
}

// START GAME — dramatic low-to-high power-on sweep
function sndStart(){
  try{
    const c=getAC(),t=c.currentTime;
    // Sub boom
    _tone(60,'sine',.35,.45,t,c,40);
    // Mid sweep
    _tone(150,'triangle',.2,.6,t,c,600);
    // High shimmer arrives late
    _tone(800,'sine',.12,.5,t+.35,c,2400);
    // Noise whoosh
    _noise(.15,.5,t,c,400);
  }catch(e){}
}

// CORRECT — clean ascending two-tone + shimmer
function sndOk(){
  try{
    const c=getAC(),t=c.currentTime;
    _tone(523,'sine',.16,.16,t,c);       // C5
    _tone(659,'sine',.13,.22,t+.13,c);   // E5
    _tone(784,'sine',.08,.18,t+.24,c);   // G5 shimmer
    _noise(.025,.03,t+.13,c,5000);
  }catch(e){}
}

// ERROR — low descending thud + subtle dissonance
function sndErr(){
  try{
    const c=getAC(),t=c.currentTime;
    _tone(220,'sawtooth',.10,.32,t,c,110);   // descending
    _tone(233,'sawtooth',.06,.28,t+.02,c,116); // slight dissonance
    _noise(.10,.07,t,c,0);
  }catch(e){}
}

// Wire playSound
function playSound(s){if(s==='ok')sndOk();else sndErr();}

// Hover: throttled (90ms) + skip if pointer is still inside same element
const _HSEL='.btn,.diff-card,.level-card,.mg-opt,.tf-btn,.fill-word,.seq-item,.ptab,.mtab';
let _lastHoverT=0;
document.addEventListener('mouseover',e=>{
  const now=Date.now();
  if(now-_lastHoverT<90)return;
  const el=e.target.closest(_HSEL);
  if(!el)return;
  if(el.contains(e.relatedTarget))return; // still inside el, not a real entry
  _lastHoverT=now;
  sndHover();
},{passive:true});

// Click: dedupe — same element within 100ms = ignore
let _lastCkEl=null,_lastCkT=0;
document.addEventListener('click',e=>{
  const el=e.target.closest('.btn,.ptab,.mtab,.modal-close');
  if(!el)return;
  const now=Date.now();
  if(el===_lastCkEl&&now-_lastCkT<100)return;
  _lastCkEl=el;_lastCkT=now;
  sndClick();
},{passive:true});

// ═══════════════ CHILLOUT MUSIC (Tone.js) ═══════════════
(function(){
  let musicStarted=false;
  let musicOn=true;
  let _toneReady=false; // true only after AudioContext confirmed running

  // Sync both buttons (FAB + game header) to current state
  function _syncBtns(){
    const icon=musicOn&&_toneReady?'🎵':'🔇';
    const op=musicOn&&_toneReady?'1':'.45';
    const fab=document.getElementById('musicToggle');
    const gh=document.getElementById('ghMusicBtn');
    if(fab){fab.textContent=icon;fab.style.opacity=op;}
    if(gh){gh.textContent=icon;gh.style.opacity=op;}
  }

  function buildMusic(){
    if(musicStarted)return;
    if(typeof Tone==='undefined'){
      console.warn('Tone.js not loaded — music disabled');
      _toneReady=false;_syncBtns();return;
    }
    musicStarted=true;

    Tone.start().then(()=>{
      // iOS Safari: Tone.start() resolves but AudioContext can stay 'suspended'
      // after the promise if the gesture wasn't trusted. Detect and recover.
      const ctx=Tone.getContext().rawContext;
      if(ctx.state!=='running'){
        console.warn('AudioContext not running after Tone.start() — iOS autoplay blocked');
        musicStarted=false; // allow retry on next explicit tap
        _toneReady=false;_syncBtns();return;
      }
      _toneReady=true;

    Tone.Transport.bpm.value=82;

    const masterVol=new Tone.Volume(-4).toDestination();
    const masterReverb=new Tone.Reverb({decay:4,wet:.28}).connect(masterVol);

    const pad=new Tone.PolySynth(Tone.Synth,{
      oscillator:{type:'sawtooth'},
      envelope:{attack:.8,decay:.5,sustain:.5,release:1.5},
      volume:-20
    });
    pad.maxPolyphony=4;
    const padFilter=new Tone.Filter({frequency:1600,type:'lowpass',rolloff:-24});
    const padChorus=new Tone.Chorus({frequency:0.4,delayTime:3.5,depth:.5,wet:.5}).start();
    pad.connect(padFilter);padFilter.connect(padChorus);padChorus.connect(masterReverb);

    const lead=new Tone.Synth({
      oscillator:{type:'sine'},
      envelope:{attack:.3,decay:.4,sustain:.4,release:1.5},
      volume:-22
    });
    const leadDelay=new Tone.PingPongDelay({delayTime:'8n.',feedback:.22,wet:.28});
    lead.connect(leadDelay);leadDelay.connect(masterReverb);

    const bass=new Tone.Synth({
      oscillator:{type:'triangle'},
      envelope:{attack:.06,decay:.12,sustain:.65,release:.8},
      volume:-14
    });
    const bassFilter=new Tone.Filter({frequency:280,type:'lowpass'});
    bass.connect(bassFilter);bassFilter.connect(masterVol);

    const hat=new Tone.NoiseSynth({
      noise:{type:'pink'},
      envelope:{attack:.003,decay:.055,sustain:0,release:.035},
      volume:-32
    });
    const hatFilter=new Tone.Filter({frequency:9000,type:'highpass'});
    hat.connect(hatFilter);hatFilter.connect(masterVol);

    const chords=[
      ['A2','E3','A3','C4'],
      ['F2','C3','F3','A3'],
      ['C2','G2','C3','E3'],
      ['G2','D3','G3','B3'],
    ];
    const bassNotes=['A1','F1','C1','G1'];
    const melody=['E4','—','C4','D4','E4','—','A3','—','C4','D4','E4','—','F4','E4','D4','C4'];

    const padSeq=new Tone.Sequence((time,chordIdx)=>{
      pad.releaseAll(time);
      pad.triggerAttackRelease(chords[chordIdx],'2n',time,.5);
    },[0,1,2,3],'1n');

    const bassSeq=new Tone.Sequence((time,chordIdx)=>{
      bass.triggerAttackRelease(bassNotes[chordIdx],'8n',time,.65);
    },[0,0,1,1,2,2,3,3],'2n');

    const melSteps=melody.map(n=>n==='—'?null:n);
    const melSeq=new Tone.Sequence((time,note)=>{
      if(note)lead.triggerAttackRelease(note,'8n',time,.45);
    },melSteps,'8n');

    const hatSeq=new Tone.Sequence((time,vel)=>{
      hat.triggerAttackRelease('16n',time,vel);
    },[.85,.3,.85,.3],'4n');

    masterReverb.ready.then(()=>{
      padSeq.start(0);bassSeq.start(0);melSeq.start(0);hatSeq.start(0);
      Tone.Transport.start();
      _syncBtns();
    });

    window._musicToggle=function(){
      musicOn=!musicOn;
      if(musicOn){Tone.Transport.start();}
      else{pad.releaseAll();Tone.Transport.pause();}
      _syncBtns();
    };

    }).catch(err=>{
      // Tone.start() promise rejection — treat as silent failure
      console.warn('Tone.start() failed:',err);
      musicStarted=false;
      _toneReady=false;_syncBtns();
    });
  }

  window.buildMusic=buildMusic;

  // Shared toggle handler used by both FAB and game header button
  window.ghMusicToggle=function(){
    sndClick();
    if(!musicStarted||!_toneReady){
      // Explicit user gesture: retry building music (bypasses iOS autoplay policy)
      musicStarted=false;
      buildMusic();
    } else if(window._musicToggle){
      window._musicToggle();
    }
  };

  // FAB button (floating, visible on all screens)
  window.addEventListener('load',()=>{
    const fab=document.createElement('button');
    fab.id='musicToggle';
    fab.textContent='🎵';
    fab.title='Música';
    // IMP-04: placed bottom-left so it never overlaps the drawer FAB (bottom-right)
    fab.style.cssText='position:fixed;bottom:1.1rem;left:1.1rem;z-index:1000;background:rgba(6,11,26,0.75);border:1.5px solid rgba(0,229,255,0.25);border-radius:50%;width:44px;height:44px;font-size:1.3rem;cursor:pointer;backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;transition:all .2s;box-shadow:0 2px 12px rgba(0,0,0,.4);';
    fab.onclick=window.ghMusicToggle;
    document.body.appendChild(fab);
  });

  // Patch start/continue to boot music on first explicit user gesture
  const _patchNav=()=>{
    const _sng=startNewGame,_cg=continueGame;
    startNewGame=function(){sndStart();buildMusic();enterFullscreen();_sng();};
    continueGame=function(){sndStart();buildMusic();enterFullscreen();_cg();};
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',_patchNav);
  else _patchNav();
})();

