// CellQuest — Game State
let GS={
  name:'Jugador',avatar:'scientist',difficulty:'normal',score:0,xp:0,totalTime:0,
  timerInterval:null,startTime:null,
  currentLevel:null,currentOrg:null,
  mgIndex:0,mgStart:null,mgErrors:0,
  speedRuns:0,perfectRuns:0,totalDone:0,
  levels:JSON.parse(JSON.stringify(LEVELS)),
  completed:{},
  completedAt:{},   // P1: timestamp of first completion per organelle {levelId:{orgId:ms}}
  lastSession:0,    // P1: timestamp of last save (for return-user detection)
  introduced:{},    // P2: session-only intro card tracking (not saved)
  tfAnswers:{},
  tfCorrect:[],
  achievements:[
    {id:'first_step',name:'Primer Paso',emoji:'🎯',desc:'Completa tu primer puzzle',unlocked:false},
    {id:'novice',name:'Biólogo Novato',emoji:'🧬',desc:'Completa la célula animal',unlocked:false},
    {id:'botanist',name:'Botánico',emoji:'🌿',desc:'Completa la célula vegetal',unlocked:false},
    {id:'microbiologist',name:'Microbiólogo',emoji:'🔬',desc:'Completa la célula procariota',unlocked:false},
    {id:'expert',name:'Experto Celular',emoji:'🏅',desc:'Completa 3 niveles',unlocked:false},
    {id:'speedrunner',name:'Speed Runner',emoji:'⚡',desc:'Completa 5 puzzles en < 20s',unlocked:false},
    {id:'perfectionist',name:'Sin Errores',emoji:'💯',desc:'Completa 10 puzzles sin errores',unlocked:false},
    {id:'scholar',name:'Erudito',emoji:'🌟',desc:'Alcanza 500 puntos',unlocked:false},
    {id:'mastery',name:'Maestría Celular',emoji:'🎓',desc:'Completa todos los niveles disponibles',unlocked:false},
    {id:'secret',name:'Descubridor Secreto',emoji:'🔐',desc:'Desbloquea todos los niveles',unlocked:false},
    {id:'all_procesos',name:'Biólogo Completo',emoji:'🧫',desc:'Completa todos los procesos en Cine y Jugador',unlocked:false},
  ],
};
const AV_EMOJI={scientist:'🧑‍🔬',student:'🎓',teacher:'👨‍🏫'};
const DIFF_LABEL={easy:'⭐ Fácil',normal:'⭐⭐ Normal',hard:'⭐⭐⭐ Difícil'};
