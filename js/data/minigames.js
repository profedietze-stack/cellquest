// CellQuest — Minigame Content
const MINIGAMES_ALL={
  nucleus:{
    easy:[
      {type:'quiz',q:'¿Para qué sirve el núcleo de la célula?',opts:['Es el centro de control: guarda el ADN y dirige la célula','Genera energía en forma de ATP para la célula','Modifica y empaqueta proteínas para su secreción','Contiene enzimas digestivas que reciclan componentes'],ans:0,pts:15},
      {type:'fill',s:'El núcleo contiene el ___, que es la información genética de la célula.',words:['ADN','ATP','ARN'],cor:'ADN',pts:12},
      {type:'trueFalse',items:[{t:'El núcleo controla las actividades de la célula',a:true},{t:'El núcleo produce energía directamente',a:false},{t:'El núcleo tiene una membrana que lo rodea',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la diferencia entre eucromatina y heterocromatina?',opts:['Eucromatina: descondensada y activa; heterocromatina: condensada e inactiva','Eucromatina: solo en mitosis; heterocromatina: solo en interfase','Eucromatina: ARN; heterocromatina: ADN','Eucromatina: en el nucléolo; heterocromatina: en el citoplasma'],ans:0,pts:20},
      {type:'fill',s:'La ___ está formada por ADN e histonas, y representa el material genético en interfase.',words:['cromatina','citoplasma','nucléolo'],cor:'cromatina',pts:15},
      {type:'trueFalse',items:[{t:'El núcleo controla la síntesis de proteínas mediante el ARNm',a:true},{t:'El núcleo fabrica ATP directamente',a:false},{t:'La envoltura nuclear tiene poros nucleares',a:true},{t:'Los procariotas tienen núcleo con membrana',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué proteínas forman los nucleosomas que compactan el ADN en la cromatina?',opts:['Histonas (H2A, H2B, H3, H4 + H1 de unión)','Tubulinas α y β','Actina y miosina','Lamininas A, B y C'],ans:0,pts:30},
      {type:'fill',s:'El complejo del poro nuclear permite el transporte selectivo de ___ del núcleo al citoplasma.',words:['ARNm','glucosa','lípidos'],cor:'ARNm',pts:20},
      {type:'trueFalse',items:[{t:'La heterocromatina es transcripcionalmente inactiva',a:true},{t:'La eucromatina está altamente condensada',a:false},{t:'La lámina nuclear es una red de filamentos intermedios',a:true},{t:'El ADN mitocondrial se replica en el núcleo',a:false}],pts:15},
      {type:'sequence',items:['Interfase: duplicación del ADN (fase S)','Profase: condensación de cromátidas y desaparición del nucléolo','Metafase: alineación de cromosomas en el ecuador','Anafase: separación de cromátidas hacia los polos','Telofase y citocinesis: formación de dos células hijas'],pts:25},
      {type:'sequence',items:['Activadores transcripcionales se unen a potenciadores (enhancers) distales','Mediador forma el bucle cromatina enhancer-promotor (looping)','Complejo de preiniciación (PIC): TBP se une al TATA box, recluta TFIID, TFIIB, TFIIH','ARN Pol II fosforilada en CTD inicia la síntesis del ARN pre-mensajero','Procesamiento co-transcripcional: capping 5’, splicing de intrones, poliadenilación 3’'],pts:28},
      {type:'quiz',q:'¿Qué modificación epi genética silencia genes al compactar la cromatina en heterocromatina?',opts:['Metilación del ADN en citosinas (CpG) y desacetilación de histonas','Acetilación de H3K9 y H3K27','Fosforilación de H2B en Ser14','Ubiquitinación de H2A que activa la transcripción'],ans:0,pts:30},
    ],
  },
  nucleolus:{
    easy:[
      {type:'quiz',q:'¿Qué fabrica el nucléolo dentro del núcleo?',opts:['Las piezas que forman los ribosomas','Energía en forma de ATP','Lípidos de membrana','Glucosa por fotosíntesis'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El nucléolo ayuda a fabricar ribosomas',a:true},{t:'El nucléolo tiene su propia membrana',a:false},{t:'El nucléolo desaparece cuando la célula se divide',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la principal función del nucléolo?',opts:['Sintetizar ARN ribosómico (ARNr) y ensamblar subunidades ribosómicas','Producir ATP por fosforilación oxidativa','Sintetizar lípidos de membrana','Almacenar glucógeno'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'El nucléolo tiene membrana propia',a:false},{t:'El nucléolo desaparece durante la mitosis',a:true},{t:'El nucléolo produce subunidades ribosómicas',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué ARN polimerasa transcribe el ADN ribosómico (ADNr) en el nucléolo?',opts:['ARN polimerasa I','ARN polimerasa II','ARN polimerasa III','ARN polimerasa mitocondrial'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El nucléolo es el sitio de procesamiento del pre-ARNr 45S',a:true},{t:'Las regiones organizadoras del nucléolo (NOR) contienen genes ARNr',a:true},{t:'El nucléolo produce ARNm para proteínas secretadas',a:false}],pts:15},
      {type:'fill',s:'El ARNr del nucléolo es transcrito por ARN polimerasa ___.',words:['I','II','III'],cor:'I',pts:20},
    ],
  },
  mito1:{
    easy:[
      {type:'quiz',q:'¿Qué produce la mitocondria para que la célula tenga energía?',opts:['ATP (adenosín trifosfato)','Glucosa','Oxígeno','Proteínas'],ans:0,pts:15},
      {type:'fill',s:'La mitocondria es conocida como la ___ de la célula porque produce energía.',words:['central energética','fábrica de proteínas','centro de control'],cor:'central energética',pts:12},
      {type:'trueFalse',items:[{t:'La mitocondria produce energía para la célula',a:true},{t:'Las mitocondrias provienen de una bacteria ancestral',a:true},{t:'La mitocondria produce oxígeno',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Dónde ocurre exactamente la síntesis de ATP en la mitocondria?',opts:['En la ATP sintasa (complejo F₀F₁) de la membrana interna','En la membrana externa','En el espacio intermembrana','En el ribosoma mitocondrial'],ans:0,pts:20},
      {type:'fill',s:'Las mitocondrias producen ___ mediante la fosforilación oxidativa.',words:['ATP','glucosa','ARNm'],cor:'ATP',pts:15},
      {type:'trueFalse',items:[{t:'Las mitocondrias tienen ADN propio',a:true},{t:'El ADN mitocondrial es lineal',a:false},{t:'Las mitocondrias se heredan por línea materna',a:true},{t:'Las mitocondrias realizan el ciclo de Krebs en la matriz',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el gradiente electroquímico que impulsa la ATP sintasa mitocondrial?',opts:['Gradiente de H⁺ (protones) entre espacio intermembrana y matriz','Gradiente de Na⁺/K⁺ como en neuronas','Gradiente de Ca²⁺ desde el retículo','Gradiente de glucosa transmembrana'],ans:0,pts:30},
      {type:'fill',s:'La β-oxidación de ácidos grasos ocurre en la ___ mitocondrial.',words:['matriz','membrana interna','espacio intermembrana'],cor:'matriz',pts:20},
      {type:'trueFalse',items:[{t:'El complejo I de la cadena respiratoria es la NADH deshidrogenasa',a:true},{t:'La fosforilación oxidativa ocurre en la membrana externa',a:false},{t:'La teoría endosimbiótica postula origen en una α-proteobacteria',a:true},{t:'Las mitocondrias tienen ribosomas 70S como los procariotas',a:true}],pts:15},
      {type:'sequence',items:['NADH entrega e⁻ al Complejo I','Ubiquinol (CoQ) transporta e⁻ al Complejo III','Citocromo c transfiere e⁻ al Complejo IV','O₂ acepta e⁻ → se forma H₂O','Gradiente de H⁺ impulsa la ATP sintasa → ATP'],pts:25},
    ],
  },
  mito2:{
    easy:[
      {type:'quiz',q:'¿Dónde ocurre la respiración celular que produce la mayor parte de energía?',opts:['En la mitocondria','En el núcleo','En la membrana plasmática','En el aparato de Golgi'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La mitocondria tiene dos membranas',a:true},{t:'La mitocondria sintetiza clorofila',a:false},{t:'Necesitamos oxígeno para que la mitocondria funcione bien',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿En qué parte de la mitocondria ocurre el ciclo de Krebs?',opts:['Matriz mitocondrial','Membrana interna','Membrana externa','Espacio intermembrana'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Las mitocondrias pueden dividirse dentro de la célula',a:true},{t:'Las mitocondrias sintetizan clorofila',a:false},{t:'Las mitocondrias son necesarias para la respiración aeróbica eucariota',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuántas moléculas de ATP se obtienen teóricamente por glucosa en la fosforilación oxidativa completa?',opts:['30-32 ATP','2 ATP','4 ATP','38 ATP exactos siempre'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El NADH de la glucólisis citoplasmática debe ingresar a la mitocondria via lanzaderas',a:true},{t:'El ciclo de Krebs produce directamente la mayor cantidad de ATP',a:false},{t:'El ubiquinol (CoQ) transfiere electrones del complejo I y II al III',a:true}],pts:15},
      {type:'fill',s:'La membrana interna mitocondrial es rica en el fosfolípido exclusivo llamado ___.',words:['cardiolipina','fosfatidilcolina','esfingomielina'],cor:'cardiolipina',pts:20},
    ],
  },
  mito:{
    easy:[
      {type:'quiz',q:'¿Cómo se llaman los pliegues de la membrana interna de la mitocondria?',opts:['Crestas mitocondriales','Tilacoides','Cisternas','Grana'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La mitocondria tiene su propio ADN',a:true},{t:'Las células vegetales no tienen mitocondrias',a:false},{t:'La mitocondria produce ATP',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué la mitocondria tiene su propia información genética (ADN)?',opts:['Porque desciende de una bacteria que vivió dentro de la célula hace millones de años','Porque la célula le dio una copia de reserva','Porque sintetiza proteínas para el núcleo','Porque controla la división celular'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Las mitocondrias tienen ribosomas 70S',a:true},{t:'Las células vegetales no tienen mitocondrias',a:false},{t:'Las mitocondrias se heredan por vía materna',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué evidencia molecular apoya la hipótesis endosimbiótica de Lynn Margulis para las mitocondrias?',opts:['ADN circular, ribosomas 70S, doble membrana y división por fisión binaria','Solo el tamaño similar a bacterias actuales','Únicamente la presencia de cardiolipina en la membrana interna','Solo que producen ATP como algunas bacterias'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El genoma mitocondrial humano codifica 13 proteínas, 22 ARNt y 2 ARNr',a:true},{t:'La cardiolipina es exclusiva de la membrana externa mitocondrial',a:false},{t:'La fisión mitocondrial involucra a la proteína Drp1',a:true}],pts:15},
    ],
  },
  er_rough:{
    easy:[
      {type:'quiz',q:'¿Por qué el Retículo Endoplasmático Rugoso se llama "rugoso"?',opts:['Porque tiene ribosomas pegados en su superficie','Porque su membrana es áspera y gruesa','Porque produce sustancias irritantes','Porque tiene pliegues muy marcados'],ans:0,pts:15},
      {type:'fill',s:'El RE Rugoso fabrica ___ que luego van al aparato de Golgi.',words:['proteínas','grasas','azúcares'],cor:'proteínas',pts:12},
      {type:'trueFalse',items:[{t:'El RE Rugoso tiene ribosomas en su superficie',a:true},{t:'El RE Rugoso produce ATP',a:false},{t:'Las proteínas del RE Rugoso se envían al Golgi',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué diferencia al RE Rugoso del RE Liso?',opts:['El RE Rugoso tiene ribosomas adheridos en su superficie','El RE Liso es más grande y oscuro','El RE Liso sintetiza proteínas de secreción','El RE Rugoso no está conectado al núcleo'],ans:0,pts:20},
      {type:'fill',s:'El RE Rugoso envía proteínas al ___ para su modificación y empaque.',words:['aparato de Golgi','lisosoma','núcleo'],cor:'aparato de Golgi',pts:15},
      {type:'sequence',items:['ARNm se asocia al ribosoma del RER','La proteína ingresa al lumen del RER','N-glicosilación inicial en el RER','Formación de vesícula de transporte','Envío al aparato de Golgi'],pts:25},
    ],
    hard:[
      {type:'quiz',q:'¿Qué secuencia dirige un polipéptido naciente hacia el lumen del RE rugoso?',opts:['Secuencia señal N-terminal reconocida por el SRP (partícula reconocedora de señal)','Secuencia KDEL de retención en RE','Señal de localización nuclear (NLS)','Secuencia de importación mitocondrial'],ans:0,pts:30},
      {type:'fill',s:'La N-glicosilación en el RE transfiere el oligosacárido desde el ___ al residuo de asparagina de la proteína.',words:['dolicol-fosfato','UDP-glucosa','GDP-manosa'],cor:'dolicol-fosfato',pts:20},
      {type:'trueFalse',items:[{t:'Las chaperoninas Hsp70 (BiP) asisten el plegamiento en el lumen del RER',a:true},{t:'La vía ERAD degrada proteínas mal plegadas retrotranslocándolas al citosol',a:true},{t:'El SRP detiene la traducción hasta que el ribosoma se acopla al RER',a:true},{t:'Todas las proteínas sintetizadas en ribosomas libres van al núcleo',a:false}],pts:15},
    ],
  },
  er_smooth:{
    easy:[
      {type:'quiz',q:'¿Cuál es una función importante del Retículo Endoplasmático Liso?',opts:['Fabricar grasas y lípidos y desintoxicar sustancias','Guardar el ADN y controlar las actividades celulares','Producir y secretar proteínas de señalización','Digerir orgánulos dañados con enzimas ácidas'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El RE Liso fabrica lípidos',a:true},{t:'El RE Liso tiene ribosomas pegados',a:false},{t:'El RE Liso almacena calcio en células musculares',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál NO es función del RE Liso?',opts:['Síntesis de proteínas con ribosomas','Síntesis de lípidos y esteroides','Detoxificación de fármacos','Almacenamiento de calcio (Ca²⁺)'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'El RE Liso sintetiza esteroides',a:true},{t:'El RE Liso tiene ribosomas adheridos',a:false},{t:'El retículo sarcoplasmático muscular es una forma de RE Liso',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué sistema enzimático del RE liso hepático realiza la detoxificación de xenobióticos?',opts:['Sistema del citocromo P450 (CYP450) con NADPH-citocromo P450 reductasa','Complejo piruvato deshidrogenasa','Sistema de la xantina oxidasa','Complejo III de la cadena respiratoria'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La síntesis de fosfolípidos ocurre principalmente en la cara citosólica del REL',a:true},{t:'La SERCA (Ca²⁺-ATPasa) bombea Ca²⁺ hacia el lumen del RE',a:true},{t:'El RE Liso en células esteroidogénicas contiene colesterol desmolasa',a:true}],pts:15},
      {type:'fill',s:'El sistema del ___ en el RE liso hepático metaboliza fármacos y toxinas.',words:['citocromo P450','citocromo c','ubiquinol'],cor:'citocromo P450',pts:20},
    ],
  },
  golgi:{
    easy:[
      {type:'quiz',q:'¿A qué se parece el aparato de Golgi en su función?',opts:['A una oficina postal que empaqueta y envía cosas','A una central eléctrica que genera ATP','A una biblioteca que guarda instrucciones genéticas','A una fábrica de ribosomas'],ans:0,pts:15},
      {type:'fill',s:'El Golgi recibe proteínas, las ___ y las envía a su destino.',words:['modifica','destruye','duplica'],cor:'modifica',pts:12},
      {type:'trueFalse',items:[{t:'El Golgi empaqueta proteínas en vesículas',a:true},{t:'El Golgi produce energía ATP',a:false},{t:'El Golgi se llama "oficina postal" de la célula',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cómo se llaman las pilas de membranas del aparato de Golgi?',opts:['Cisternas','Grana','Tilacoides','Vesículas secretoras solamente'],ans:0,pts:20},
      {type:'fill',s:'La cara ___ del Golgi recibe vesículas que provienen del Retículo Endoplasmático.',words:['cis','trans','lateral'],cor:'cis',pts:15},
      {type:'trueFalse',items:[{t:'El Golgi modifica proteínas mediante glicosilación',a:true},{t:'El Golgi produce ATP',a:false},{t:'El Golgi forma vesículas para secreción celular',a:true},{t:'En plantas el Golgi se llama dictiosoma',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué modificación ocurre en las cisternas mediales del Golgi que no ocurre en el RER?',opts:['O-glicosilación y sulfatación de proteoglicanos','N-glicosilación con dolicol-fosfato','Formación del primer enlace N-glicosídico','Plegamiento inicial con BiP'],ans:0,pts:30},
      {type:'fill',s:'La señal de manosa-6-fosfato dirige proteínas hacia los ___.',words:['lisosomas','peroxisomas','mitocondrias'],cor:'lisosomas',pts:20},
      {type:'trueFalse',items:[{t:'El modelo de maduración de cisternas explica el transporte retrógrado de proteínas residentes',a:true},{t:'Las vesículas COPI transportan desde RE al Golgi cis',a:false},{t:'Las vesículas COPII median el transporte anterógrado RER→Golgi',a:true}],pts:15},
      {type:'sequence',items:['Síntesis de proteína en el RER con péptido señal de secreción','Vesículas COPII salen del RER hacia el Golgi cis','Modificación progresiva en cisternas mediales del Golgi','Vesículas secretoras brotan de la cara trans (TGN)','Exocitosis: fusión con membrana y liberación al exterior'],pts:25},
    ],
  },
  lysosome:{
    easy:[
      {type:'quiz',q:'¿Para qué sirven los lisosomas?',opts:['Para digerir y reciclar material dentro de la célula','Para producir proteínas por traducción','Para almacenar calcio y liberar señales','Para transportar vesículas entre orgánulos'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los lisosomas tienen enzimas que digieren materiales',a:true},{t:'Los lisosomas están en las plantas',a:false},{t:'Los lisosomas tienen un interior ácido',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es el pH interno de un lisosoma?',opts:['4.5–5.0 (fuertemente ácido)','7.4 (neutro como el citoplasma)','8.0 (ligeramente básico)','6.0 (levemente ácido)'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los lisosomas contienen hidrolasas ácidas',a:true},{t:'Los lisosomas están presentes en células vegetales',a:false},{t:'La autofagia ocurre en los lisosomas',a:true},{t:'Los lisosomas tienen ADN propio',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué bomba mantiene el pH ácido del lisosoma?',opts:['V-ATPasa (ATPasa vacuolar que bombea H⁺)','Na⁺/K⁺-ATPasa','Ca²⁺-ATPasa (SERCA)','H⁺/K⁺-ATPasa gástrica'],ans:0,pts:30},
      {type:'fill',s:'La enfermedad de Gaucher se debe al déficit de la enzima lisosomal ___.',words:['glucocerebrosidasa','α-galactosidasa','esfingomielinasa'],cor:'glucocerebrosidasa',pts:20},
      {type:'trueFalse',items:[{t:'La autofagia selectiva de mitocondrias se denomina mitofagia',a:true},{t:'Las LAMP (proteínas de membrana lisosomal) están altamente glicosiladas para protegerse de las hidrolasas',a:true},{t:'El receptor de manosa-6-fosfato reutiliza en el trans-Golgi para captar hidrolasas',a:true}],pts:15},
    ],
  },
  lysosome2:{
    easy:[
      {type:'quiz',q:'¿Qué pasa cuando el lisosoma digiere partes dañadas de la propia célula?',opts:['Se llama autofagia y ayuda a reciclar componentes','Se llama digestión externa','La célula muere inmediatamente','Produce más ATP'],ans:0,pts:15},
      {type:'fill',s:'Los lisosomas son producidos por el ___.',words:['aparato de Golgi','núcleo','cloroplasto'],cor:'aparato de Golgi',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proceso ocurre cuando un lisosoma digiere orgánulos propios dañados?',opts:['Autofagia','Endocitosis por receptor','Exocitosis','Mitosis'],ans:0,pts:20},
      {type:'fill',s:'Los lisosomas son producidos y secretados por el ___.',words:['aparato de Golgi','núcleo','cloroplasto'],cor:'aparato de Golgi',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es la diferencia entre macroautofagia y microautofagia?',opts:['La macroautofagia usa autofagosomas de doble membrana; la micro involucra invaginación directa del lisosoma','Son sinónimos del mismo proceso','La microautofagia requiere la proteína Beclin-1','Solo la macroautofagia ocurre en mamíferos'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La autofagia mediada por chaperonas (CMA) requiere LAMP-2A',a:true},{t:'mTORC1 activo promueve la autofagia',a:false},{t:'LC3-II es un marcador de membrana del autofagosoma',a:true}],pts:15},
      {type:'fill',s:'En la enfermedad de Tay-Sachs falta la enzima lisosomal ___.',words:['hexosaminidasa A','glucocerebrosidasa','alfa-galactosidasa A'],cor:'hexosaminidasa A',pts:20},
    ],
  },
  ribosome:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función de los ribosomas?',opts:['Fabricar proteínas leyendo las instrucciones del ARN','Producir energía en forma de ATP','Modificar y empaquetar proteínas para su destino','Guardar y replicar el ADN de la célula'],ans:0,pts:15},
      {type:'fill',s:'Los ribosomas fabrican ___ siguiendo las instrucciones del ARN mensajero.',words:['proteínas','grasas','glucosa'],cor:'proteínas',pts:12},
      {type:'trueFalse',items:[{t:'Los ribosomas fabrican proteínas',a:true},{t:'Los ribosomas tienen membrana propia',a:false},{t:'Los ribosomas de bacterias son más pequeños que los de animales',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuáles son las subunidades del ribosoma eucariota?',opts:['40S y 60S → ribosoma 80S total','30S y 50S → ribosoma 70S total','20S y 40S → ribosoma 60S total','50S y 50S → ribosoma 100S total'],ans:0,pts:20},
      {type:'fill',s:'Los ribosomas sintetizan ___ mediante el proceso de traducción del ARNm.',words:['proteínas','lípidos','ADN'],cor:'proteínas',pts:15},
      {type:'trueFalse',items:[{t:'Los ribosomas libres sintetizan proteínas citoplasmáticas',a:true},{t:'Los ribosomas unidos al RER sintetizan proteínas de secreción',a:true},{t:'Los ribosomas solo existen en el núcleo',a:false},{t:'Los ribosomas en procariotas son 70S',a:true}],pts:10},
      {type:'sequence',items:['ARN polimerasa transcribe el ADN → ARNm en el núcleo','ARNm sale por los poros nucleares al citoplasma','El ribosoma se ensambla en el codón de inicio AUG','ARNt traen aminoácidos al ribosoma → elongación de la cadena','Codón de stop → liberación de la proteína terminada'],pts:20},
    ],
    hard:[
      {type:'quiz',q:'¿Qué actividad enzimática tiene la subunidad grande del ribosoma (60S en eucariotas)?',opts:['Peptidil transferasa (ribozima, catalizada por el ARNr 28S)','Helicasa para desenrollar el ARNm','Kinasa para fosforilar el factor eIF2','ATPasa para translocar el ARNm'],ans:0,pts:30},
      {type:'fill',s:'El sitio ___ del ribosoma aloja el ARNt con el aminoácido que se está añadiendo a la cadena.',words:['A (aceptor)','P (peptidil)','E (salida)'],cor:'A (aceptor)',pts:20},
      {type:'trueFalse',items:[{t:'La traducción comienza en el codón AUG (metionina)',a:true},{t:'El factor EF-Tu lleva el aminoacil-ARNt al sitio A en eucariotas',a:false},{t:'La terminación de la traducción requiere factores de liberación (eRF)',a:true}],pts:15},
    ],
  },
  centrosome:{
    easy:[
      {type:'quiz',q:'¿Para qué sirve el centrosoma cuando la célula se divide?',opts:['Organiza los hilos que separan los cromosomas (huso mitótico)','Produce la energía para la división celular','Sintetiza las copias de ADN durante la fase S','Empaqueta las proteínas que irán a las células hijas'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El centrosoma ayuda en la división celular',a:true},{t:'El centrosoma está en células vegetales superiores',a:false},{t:'El centrosoma tiene dos centriolos',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la función principal del centrosoma?',opts:['Organizar el huso mitótico durante la división celular','Producir ATP por respiración','Sintetizar lípidos de membrana','Almacenar iones de calcio'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'El centrosoma está presente en células vegetales superiores',a:false},{t:'Cada centrosoma contiene dos centriolos',a:true},{t:'El centrosoma organiza microtúbulos',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué proteínas del material pericentriolar (PCM) nuclean los microtúbulos del huso?',opts:['γ-tubulina y el complejo γ-TuRC (γ-tubulin ring complex)','α y β-tubulina directamente','Dinamina y quinesina','Cofilina y profilina'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La duplicación del centrosoma ocurre durante la fase S del ciclo celular',a:true},{t:'La PLK4 (polo-like kinase 4) regula la biogénesis del centriolo',a:true},{t:'Los centriolos tienen una estructura de 9 tripletes de microtúbulos',a:true},{t:'Las células vegetales superiores tienen centrosomas funcionales',a:false}],pts:15},
      {type:'fill',s:'El centrosoma se duplica durante la fase ___ del ciclo celular.',words:['S','G1','M'],cor:'S',pts:20},
      {type:'sequence',items:['G1: crecimiento celular, síntesis de ciclina D, checkpoint G1/S (Rb-E2F)','S: replicación completa del ADN y duplicación del centrosoma','G2: checkpoint G2/M, activación del complejo MPF (CDK1-ciclina B)','Mitosis (PMAT): condensación, alineación y segregación de cromátidas hermanas','Citocinesis: formación del anillo de actomiosina y sección del citoplasma'],pts:28},
    ],
  },
  peroxisome:{
    easy:[
      {type:'quiz',q:'¿Cuál es una función importante del peroxisoma?',opts:['Destruir sustancias tóxicas como el agua oxigenada','Sintetizar proteínas en el retículo endoplasmático','Almacenar iones de calcio para señalización','Generar ATP oxidando glucosa como las mitocondrias'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los peroxisomas eliminan sustancias tóxicas de la célula',a:true},{t:'Los peroxisomas tienen ADN propio',a:false},{t:'Los peroxisomas son especialmente abundantes en el hígado',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué enzima principal tienen los peroxisomas para eliminar H₂O₂?',opts:['Catalasa','Lipasa pancreática','ARN polimerasa','Hexoquinasa'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los peroxisomas oxidan ácidos grasos de cadena muy larga',a:true},{t:'Los peroxisomas contienen ADN propio',a:false},{t:'Los peroxisomas tanto producen como destruyen H₂O₂',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué secuencia señal (PTS) dirige proteínas al interior del peroxisoma?',opts:['PTS1: tripéptido C-terminal SKL (Ser-Lys-Leu) reconocido por Pex5p','PTS2: secuencia N-terminal reconocida por Pex7p','Señal de manosa-6-fosfato','Secuencia señal de RE con SRP'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La β-oxidación peroxisomal de ácidos grasos de cadena muy larga (VLCFA) no produce ATP directamente',a:true},{t:'El síndrome de Zellweger es causado por defectos en genes PEX',a:true},{t:'Los peroxisomas se forman únicamente por gemación del RE',a:false}],pts:15},
      {type:'fill',s:'Las proteínas que ensamblan el peroxisoma se llaman ___, codificadas por genes PEX.',words:['peroxinas','porinas','peroxidinas'],cor:'peroxinas',pts:20},
    ],
  },
  cytoskeleton:{
    easy:[
      {type:'quiz',q:'¿Para qué sirve el citoesqueleto de la célula?',opts:['Da forma a la célula y permite que se mueva','Fabrica las proteínas','Produce energía','Guarda el ADN'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El citoesqueleto da forma a la célula',a:true},{t:'El citoesqueleto es solo una membrana rígida',a:false},{t:'El citoesqueleto participa en la división celular',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál de los siguientes NO es componente del citoesqueleto?',opts:['Peptidoglicano','Microtúbulos de tubulina','Filamentos de actina','Filamentos intermedios'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los microtúbulos están formados por tubulina',a:true},{t:'La colchicina polimeriza microtúbulos',a:false},{t:'El citoesqueleto participa en la división celular',a:true},{t:'Los filamentos de actina tienen 25 nm de diámetro',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué motor molecular se desplaza hacia el extremo (+) de los microtúbulos transportando vesículas?',opts:['Quinesina convencional (Kif5)','Dineína citoplásmica','Miosina II','Miosina V únicamente en axones'],ans:0,pts:30},
      {type:'fill',s:'La nucleación de filamentos de actina in vivo es promovida principalmente por el complejo ___.',words:['Arp2/3','forminas','profilina'],cor:'Arp2/3',pts:20},
      {type:'trueFalse',items:[{t:'Los filamentos intermedios son los más estables de los tres componentes del citoesqueleto',a:true},{t:'La dinamina es una GTPasa que fisa vesículas de membrana',a:true},{t:'La treadmilling ocurre en microtúbulos pero no en filamentos de actina',a:false}],pts:15},
    ],
  },
  membrane:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función principal de la membrana plasmática?',opts:['Proteger la célula y controlar qué entra y sale','Producir energía','Sintetizar proteínas','Guardar el ADN'],ans:0,pts:15},
      {type:'fill',s:'La membrana plasmática deja pasar algunas cosas y otras no, se dice que es ___ permeable.',words:['selectivamente','totalmente','nada'],cor:'selectivamente',pts:12},
      {type:'trueFalse',items:[{t:'La membrana plasmática rodea a todas las células',a:true},{t:'Todo puede atravesar la membrana libremente',a:false},{t:'La membrana tiene proteínas que ayudan al transporte',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál modelo describe la estructura de la membrana plasmática?',opts:['Mosaico fluido (Singer y Nicolson, 1972)','Doble hélice de Watson y Crick','Bicapa rígida e impermeable','Envoltura proteica estática'],ans:0,pts:20},
      {type:'fill',s:'La membrana plasmática está formada por una ___ de fosfolípidos.',words:['bicapa','capa simple','tricapa'],cor:'bicapa',pts:15},
      {type:'trueFalse',items:[{t:'El colesterol estabiliza la fluidez de la membrana',a:true},{t:'Todas las proteínas de membrana son externas (periféricas)',a:false},{t:'La membrana es selectivamente permeable',a:true},{t:'El agua no puede cruzar la membrana por ningún mecanismo',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué son las balsas lipídicas (lipid rafts) y cuál es su relevancia funcional?',opts:['Microdominios ricos en colesterol y esfingolípidos que concentran receptores y proteínas de señalización','Regiones de bicapa con exceso de fosfolípidos insaturados','Áreas de la membrana sin proteínas integrales','Zonas de endocitosis mediada por clatrina'],ans:0,pts:30},
      {type:'fill',s:'El potencial de membrana en reposo de una neurona es de aproximadamente ___ mV.',words:['-70','+40','-90'],cor:'-70',pts:20},
      {type:'trueFalse',items:[{t:'La asimetría de la bicapa lipídica es mantenida por flipasas y flopasas',a:true},{t:'La fosfatidilserina se expone en el exterior durante la apoptosis',a:true},{t:'Las proteínas GPI-ancladas tienen dominios transmembrana',a:false}],pts:15},
      {type:'sequence',items:['Ligando (EGF/insulin) se une al dominio extracelular del receptor RTK','Dimeralización del RTK y trans-autofosforilación en tirosinas intracitoplasmáticas','GRB2-SOS recluta RAS-GDP → RAS-GTP (forma activa)','RAF activa MEK, que activa ERK (cascada MAPK): tres fosforilaciones en serie','ERK nuclear fosforila factores de transcripción (Elk-1, c-Fos) → expresión génica'],pts:28},
      {type:'quiz',q:'¿Qué segundo mensajero produce la adenilato ciclasa al ser activada por una proteína Gs?',opts:['AMPc (adenosina monofosfato cíclico)','IP3 (inositol 1,4,5-trifosfato)','DAG (diacilglicerol)','Ca²⁺ citoplasmático libre'],ans:0,pts:30},
    ],
  },
  chloro1:{
    easy:[
      {type:'quiz',q:'¿Qué produce el cloroplasto usando la luz del sol?',opts:['Glucosa (azúcar) y oxígeno','Proteínas y agua','Energía eléctrica','Dióxido de carbono'],ans:0,pts:15},
      {type:'fill',s:'El cloroplasto realiza la ___, que convierte luz solar en azúcar.',words:['fotosíntesis','respiración','digestión'],cor:'fotosíntesis',pts:12},
      {type:'trueFalse',items:[{t:'El cloroplasto realiza la fotosíntesis',a:true},{t:'El cloroplasto está en células animales',a:false},{t:'El cloroplasto produce oxígeno',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Dónde ocurren las reacciones luminosas de la fotosíntesis?',opts:['En los tilacoides del cloroplasto','En el estroma del cloroplasto','En la membrana externa del cloroplasto','En el nucléolo'],ans:0,pts:20},
      {type:'fill',s:'El cloroplasto produce ___ y oxígeno a partir de luz solar, agua y CO₂.',words:['glucosa','proteínas','ATP únicamente'],cor:'glucosa',pts:15},
      {type:'sequence',items:['Luz solar incide sobre la clorofila','Fotólisis del agua → O₂ + H⁺ + e⁻','Fotofosforilación → ATP y NADPH','Ciclo de Calvin en el estroma','Síntesis de glucosa (G3P)'],pts:25},
    ],
    hard:[
      {type:'quiz',q:'¿Qué complejo proteico realiza la fotólisis del agua en el fotosistema II?',opts:['Complejo de evolución de oxígeno (OEC) con clúster de Mn₄CaO₅','Centro de reacción P700 del fotosistema I','Plastoquinona (PQ) como aceptor primario','Ferredoxina como donante de electrones'],ans:0,pts:30},
      {type:'fill',s:'En el ciclo de Calvin, la enzima ___ cataliza la fijación del CO₂ al RuBP.',words:['RuBisCO','PEP carboxilasa','piruvato carboxilasa'],cor:'RuBisCO',pts:20},
      {type:'trueFalse',items:[{t:'En C4, la PEP carboxilasa fija CO₂ en el mesófilo y la decarboxilación en la vaina lo libera al ciclo de Calvin',a:true},{t:'El ciclo de Calvin es un proceso dependiente de la luz indirectamente (necesita ATP y NADPH)',a:true},{t:'El gradiente de H⁺ en el tilacoide impulsa la ATP sintasa cloroplástica (CF₁CF₀)',a:true}],pts:15},
    ],
  },
  chloro2:{
    easy:[
      {type:'quiz',q:'¿Cómo se llaman las pilas de membranas verdes dentro del cloroplasto?',opts:['Grana (tilacoides apilados)','Cristales de clorofila','Crestas fotosintéticas','Cisternas del estroma'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El cloroplasto tiene su propio ADN',a:true},{t:'El cloroplasto está en células animales',a:false},{t:'La clorofila es el pigmento verde del cloroplasto',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cómo se llaman las pilas de tilacoides en el cloroplasto?',opts:['Grana','Crestas mitocondriales','Cisternas del Golgi','Nucléolo'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'El cloroplasto tiene ADN propio',a:true},{t:'Los cloroplastos provienen de una cianobacteria ancestral',a:true},{t:'Los cloroplastos están presentes en células animales',a:false},{t:'El ciclo de Calvin ocurre en el estroma',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué pigmentos accesorios transfieren energía de excitación a la clorofila a en los complejos antena?',opts:['Clorofila b, carotenoides (β-caroteno, xantofilas) y ficobiliproteínas en algas','Solo clorofila b en todos los organismos','Únicamente carotenoides en plantas superiores','Feofitina como pigmento accesorio principal'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La plastocianina (PC) transfiere electrones del citocromo b6f al fotosistema I',a:true},{t:'El NADPH producido en el fotosistema I es usado en el ciclo de Calvin',a:true},{t:'La fotorespiración ocurre cuando RuBisCO fija O₂ en lugar de CO₂',a:true}],pts:15},
    ],
  },
  chloro3:{
    easy:[
      {type:'quiz',q:'¿Qué le da el color verde a las hojas de las plantas?',opts:['La clorofila dentro de los cloroplastos','El agua que circula por las hojas','El azúcar almacenado','Los minerales del suelo'],ans:0,pts:15},
      {type:'fill',s:'El cloroplasto fija el CO₂ del aire durante el ciclo de ___.',words:['Calvin','Krebs','digestión'],cor:'Calvin',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la diferencia entre las reacciones luminosas y el ciclo de Calvin?',opts:['Las luminosas capturan energía y producen ATP/NADPH; el ciclo de Calvin fija CO₂ usando esa energía','Las luminosas ocurren en el estroma y el ciclo de Calvin en el tilacoide','Las luminosas producen glucosa directamente','No hay diferencia, son el mismo proceso'],ans:0,pts:20},
      {type:'fill',s:'El cloroplasto fija el CO₂ durante el ciclo de ___.',words:['Calvin','Krebs','Cori'],cor:'Calvin',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Por qué la clorofila a refleja luz verde (~550 nm) y absorbe principalmente rojo e azul?',opts:['Por la estructura del anillo porfirínico con Mg²⁺ central y la cola fitol que determina los estados electrónicos','Porque el Mg²⁺ central absorbe toda la luz visible excepto verde','Porque las xantofilas convierten luz verde en otras longitudes de onda','Por efecto de la proteína de unión a clorofila (LHCII)'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La clorofila a tiene máximos de absorción ~430 nm (azul-violeta) y ~680 nm (rojo)',a:true},{t:'Los carotenoides protegen al cloroplasto de la fotoinhibición por exceso de luz',a:true},{t:'La clorofila b tiene un grupo aldehído en C7 en lugar del metilo de la clorofila a',a:true}],pts:15},
    ],
  },
  vacuole:{
    easy:[
      {type:'quiz',q:'¿Para qué sirve la vacuola central de las plantas?',opts:['Almacena agua y mantiene la firmeza de la célula','Produce energía','Sintetiza proteínas','Controla la división celular'],ans:0,pts:15},
      {type:'fill',s:'La vacuola mantiene la ___ celular al absorber agua, lo que mantiene la planta erguida.',words:['turgencia','temperatura','forma esférica'],cor:'turgencia',pts:12},
      {type:'trueFalse',items:[{t:'La vacuola vegetal puede ocupar la mayor parte del volumen celular',a:true},{t:'Las células animales tienen una gran vacuola central',a:false},{t:'La vacuola almacena agua y pigmentos',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proceso físico permite a la vacuola mantener la turgencia celular?',opts:['Ósmosis: el agua entra por gradiente de potencial hídrico','Fagocitosis: la vacuola engulle agua del exterior','Difusión de iones Ca²⁺ desde el exterior','Transporte activo de glucosa hacia la vacuola'],ans:0,pts:20},
      {type:'fill',s:'La vacuola mantiene la ___ celular al absorber agua por ósmosis.',words:['turgencia','temperatura','densidad'],cor:'turgencia',pts:15},
      {type:'trueFalse',items:[{t:'La vacuola central puede ocupar el 90% del volumen celular vegetal',a:true},{t:'Las vacuolas almacenan pigmentos antocianinas',a:true},{t:'Las células animales tienen una gran vacuola central',a:false},{t:'La vacuola cumple función lisosomal en plantas',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué transportadores del tonoplasto regulan el pH vacuolar y el almacenamiento de malato en plantas CAM?',opts:['V-ATPasa y pirofosfatasa vacuolar (V-PPasa) junto a canales de malato (ALMT)',  'Solo acuaporinas TIP','Bombas Na⁺/H⁺ como en animales','Canales CFTR adaptados al vegetal'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las acuaporinas TIP (tonoplast intrinsic proteins) facilitan el flujo de agua al interior vacuolar',a:true},{t:'Las antocianinas son flavonoides solubles en agua almacenados en el lumen vacuolar',a:true},{t:'La presión de turgor es generada por la entrada de agua desde apoplasto al simplasto',a:true}],pts:15},
    ],
  },
  plasmodesmata:{
    easy:[
      {type:'quiz',q:'¿Para qué sirven los plasmodesmos entre células vegetales?',opts:['Son canales que conectan células vecinas para que puedan comunicarse','Son poros de la membrana nuclear','Son los lugares donde se fabrica la celulosa','Son los puntos de unión al suelo'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los plasmodesmos conectan células vegetales vecinas',a:true},{t:'Los plasmodesmos son exclusivos de células animales',a:false},{t:'Los virus pueden moverse entre células usando plasmodesmos',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la función de los plasmodesmos?',opts:['Comunicar el citoplasma de células vegetales vecinas','Absorber luz solar','Sintetizar celulosa para la pared','Almacenar agua y pigmentos'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los plasmodesmos son exclusivos de células vegetales',a:true},{t:'Los virus vegetales se propagan a través de plasmodesmos',a:true},{t:'Los plasmodesmos son equivalentes a las gap junctions animales',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué estructura del RE atraviesa el canal del plasmodesmo conectando células adyacentes?',opts:['El desmotúbulo (tubo de membrana del RE apprimé)','Una extensión del tonoplasto','Un filamento de actina hueco','Una rama del aparato de Golgi'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El tamaño de exclusión molecular (SEL) del plasmodesmo puede regularse durante infección viral',a:true},{t:'La proteína viral de movimiento (MP) dilata el SEL para facilitar la propagación',a:true},{t:'Los plasmodesmos secundarios se forman durante el desarrollo; los primarios solo post-división',a:false}],pts:15},
    ],
  },
  cell_wall:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función principal de la pared celular de las plantas?',opts:['Proteger y dar rigidez a la célula','Producir energía','Guardar el ADN','Realizar la fotosíntesis'],ans:0,pts:15},
      {type:'fill',s:'La pared celular vegetal está hecha principalmente de ___, un polisacárido muy resistente.',words:['celulosa','almidón','proteína'],cor:'celulosa',pts:12},
      {type:'trueFalse',items:[{t:'La pared celular da rigidez a las células vegetales',a:true},{t:'Las células animales tienen pared celular',a:false},{t:'La pared celular está fuera de la membrana plasmática',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es el componente principal de la pared celular vegetal?',opts:['Celulosa (polisacárido de glucosa)','Quitina (polisacárido de N-acetilglucosamina)','Peptidoglicano (mureína)','Colágeno (proteína fibrosa)'],ans:0,pts:20},
      {type:'fill',s:'La ___ forma las microfibrillas que dan resistencia a la pared celular vegetal.',words:['celulosa','amilosa','quitina'],cor:'celulosa',pts:15},
      {type:'trueFalse',items:[{t:'La pared celular rodea la membrana plasmática en plantas',a:true},{t:'Las células animales tienen pared celular',a:false},{t:'La lignina refuerza la pared celular secundaria',a:true},{t:'Los hongos tienen pared de celulosa igual que las plantas',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cómo se organiza la celulosa en la pared primaria de células en expansión?',opts:['Microfibrillas orientadas perpendicularmente al eje de crecimiento (crecimiento anisótropo)','Microfibrillas al azar en una matriz de pectina únicamente','Capas paralelas de lignina entrecruzadas con xilano','Red de calosa con microfibrillas de quitina'],ans:0,pts:30},
      {type:'fill',s:'La enzima ___ sintetiza microfibrillas de celulosa moviéndose en la membrana plasmática.',words:['celulosa sintasa (CesA)','quitina sintasa','pectato liasa'],cor:'celulosa sintasa (CesA)',pts:20},
      {type:'trueFalse',items:[{t:'Las expansinas relajan la pared celular rompiendo puentes de hidrógeno entre celulosa y xiloglucano',a:true},{t:'La laminarina (β-1,3-glucano) forma la pared primaria en plantas superiores',a:false},{t:'La subrina es un polímero lipídico que impermeabiliza la banda de Caspari en la endodermis',a:true}],pts:15},
    ],
  },
  nucleoid:{
    easy:[
      {type:'quiz',q:'¿Qué es el nucleoide de una bacteria?',opts:['La zona donde está concentrado su ADN (sin membrana que lo rodee)','El núcleo de la bacteria con membrana','La mitocondria de la bacteria','El lugar donde fabrica proteínas'],ans:0,pts:15},
      {type:'fill',s:'El ADN del nucleoide es ___, no lineal como en células eucariotas.',words:['circular','cuadrado','fragmentado'],cor:'circular',pts:12},
      {type:'trueFalse',items:[{t:'El nucleoide no tiene membrana propia',a:true},{t:'El nucleoide tiene la misma función que el núcleo eucariota',a:true},{t:'Las bacterias tienen varios nucleoides siempre',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿En qué se diferencia el nucleoide del núcleo eucariota?',opts:['No tiene membrana que lo rodee','Es más grande que el núcleo eucariota','Contiene ADN lineal con extremos libres','Tiene su propio nucléolo diferenciado'],ans:0,pts:20},
      {type:'fill',s:'El ADN del nucleoide es ___ y no está asociado a histonas como en eucariotas.',words:['circular','lineal','fragmentado'],cor:'circular',pts:15},
      {type:'trueFalse',items:[{t:'El nucleoide tiene membrana nuclear propia',a:false},{t:'En procariotas, transcripción y traducción ocurren simultáneamente',a:true},{t:'El nucleoide contiene generalmente un solo cromosoma circular',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué proteínas NAP (nucleoid-associated proteins) compactan el nucleoide bacteriano?',opts:['HU, H-NS, IHF, Fis y StpA actúan como histonas funcionales análogas','Solo histonas H1 adaptadas evolutivamente','Únicamente la proteína HU en todas las bacterias','Proteínas SMC equivalentes a condensinas eucariotas solamente'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El cromosoma bacteriano está organizado en dominios topológicos superenrollados negativamente',a:true},{t:'La ADN girasa bacteriana (topoisomerasa II) introduce superenrollamiento negativo',a:true},{t:'La replicación del cromosoma bacteriano comienza en el oriC y es bidireccional',a:true}],pts:15},
      {type:'sequence',items:['DnaA reconoce y se une al oriC → apertura de la doble hélice','Helicasa (DnaB) desenrolla el ADN en ambas direcciones','ARN primasa sintetiza cebadores de ARN','ADN polimerasa III extiende las cadenas nueva','Topoisomerasa IV separa los cromosomas hijos replicados'],pts:25},
      {type:'fill',s:'El superenrollamiento negativo del ADN bacteriano es introducido por la enzima ___.',words:['ADN girasa (topoisomerasa II)','ARN polimerasa sigma70','ADN polimerasa III'],cor:'ADN girasa (topoisomerasa II)',pts:20},

        {type:'fill',q:'El nucleoide carece de ___ que rodea al ADN, a diferencia del núcleo eucariota.',a:'envoltura nuclear',pts:22},
        {type:'fill',q:'En procariotas, transcripción y traducción ocurren ___ porque no hay envoltura nuclear.',a:'simultáneamente',pts:22},
        {type:'trueFalse',items:[
          {t:'El nucleoide tiene histonas H1, H2A, H2B, H3 y H4 igual que el núcleo eucariota',a:false},
          {t:'El ADN del nucleoide se replica desde un único origen llamado oriC',a:true},
          {t:'En eucariotas el ADN también carece de membrana que lo rodee',a:false},
          {t:'Las proteínas HU y H-NS compactan el ADN bacteriano en ausencia de histonas',a:true},
        ],pts:28},
        {type:'sequence',items:['Apertura del oriC por proteína DnaA','Reclutamiento de helicasa DnaB — desestabilización','Síntesis del ARN cebador por primasa DnaG','Elongación por ADN Polimerasa III (horquillas bidireccionales)','Síntesis de fragmentos de Okazaki en la hebra rezagada','Eliminación de cebadores y relleno por ADN Pol I','Sellado final por ADN ligasa — cromosoma circular'],pts:36},
],
  },
  plasmid:{
    easy:[
      {type:'quiz',q:'¿Para qué sirven los plásmidos de las bacterias?',opts:['Dan ventajas extra como resistir antibióticos o digerir nuevos alimentos','Son el cromosoma principal de la bacteria','Producen energía extra','Forman la pared celular'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los plásmidos son ADN extra de las bacterias',a:true},{t:'Los plásmidos son ARN mensajero',a:false},{t:'Los plásmidos se usan en biotecnología para insertar genes',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Para qué se usan los plásmidos en biotecnología moderna?',opts:['Como vectores para insertar y expresar genes de interés en bacterias','Para producir ATP extra en fermentación','Para degradar proteínas dañadas','Para síntesis de lípidos estructurales'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los plásmidos se replican independientemente del cromosoma',a:true},{t:'Los plásmidos son moléculas de ADN lineal',a:false},{t:'Los plásmidos pueden conferir resistencia a antibióticos',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué es el origen de replicación (ori) de un plásmido y cómo determina el número de copias?',opts:['Secuencia donde se inicia la replicación; ori de alto número de copias como pUC produce ~500 copias vs oriP15A ~15','La región promotora del gen de resistencia','El sitio de restricción múltiple (MCS)','El gen rep que codifica la helicasa replicativa'],ans:0,pts:30},
      {type:'fill',s:'La conjugación bacteriana transfiere plásmidos a través de un ___ formado por pili sexual.',words:['poro de conjugación','flagelo','plasmodesmo'],cor:'poro de conjugación',pts:20},
      {type:'trueFalse',items:[{t:'Los plásmidos Ti de Agrobacterium se usan para transformar plantas genéticamente',a:true},{t:'El sistema CRISPR-Cas9 se puede entregar en células mediante plásmidos',a:true},{t:'Los plásmidos R (de resistencia) solo se transmiten verticalmente',a:false}],pts:15},
      {type:'fill',s:'Los plasmidos de resistencia se transfieren entre bacterias mediante ___, un tipo de transferencia genica horizontal.',words:['conjugacion','transduccion','transformacion'],cor:'conjugacion',pts:20},

        {type:'fill',q:'Los plásmidos R (de resistencia) transfieren genes de resistencia entre bacterias por ___.',a:'conjugación',pts:22},
        {type:'fill',q:'La biotecnología inserta genes de interés en ___ para producirlos en bacterias huésped.',a:'plásmidos',pts:22},
        {type:'trueFalse',items:[
          {t:'Las células animales normalmente contienen plásmidos propios',a:false},
          {t:'Los plásmidos se replican independientemente del cromosoma bacteriano',a:true},
          {t:'Un mismo plásmido puede portar resistencia a múltiples antibióticos',a:true},
          {t:'La insulina humana comercial se produce en E. coli con plásmidos recombinantes',a:true},
        ],pts:28},
        {type:'sequence',items:['Bacteria F+ forma pilus sexual hacia bacteria F−','Contacto físico entre células donadora y receptora','Relaxasa introduce nick en el plásmido F','Transferencia de hebra simple al receptor','Síntesis de hebra complementaria en la donadora','Síntesis de hebra complementaria en la receptora','Receptora se convierte en F+ con plásmido funcional'],pts:36},
],
  },
  ribosome70s:{
    easy:[
      {type:'quiz',q:'¿En qué se diferencian los ribosomas de las bacterias de los de las células humanas?',opts:['Los bacterianos son más pequeños (70S vs 80S)','Los bacterianos son más grandes','Son idénticos en tamaño','Solo difieren en el color que toman al teñirlos'],ans:0,pts:15},
      {type:'fill',s:'Los antibióticos como la tetraciclina atacan los ribosomas ___ de las bacterias sin dañar los nuestros.',words:['70S','80S','60S'],cor:'70S',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué los antibióticos como la tetraciclina pueden matar bacterias sin afectar gravemente al paciente?',opts:['Los ribosomas bacterianos (70S) difieren estructuralmente de los eucariotas (80S)','Las bacterias no pueden reparar el daño','Los antibióticos son demasiado grandes para entrar a células humanas','Los ribosomas humanos son 10 veces más abundantes'],ans:0,pts:20},
      {type:'fill',s:'Antibióticos como la tetraciclina inhiben los ribosomas ___ de las bacterias.',words:['70S','80S','60S'],cor:'70S',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué antibiótico se une al sitio A del ribosoma 70S inhibiendo la entrada del aminoacil-ARNt?',opts:['Tetraciclina (unión reversible a 30S)','Cloranfenicol (inhibe peptidil transferasa 50S)','Estreptomicina (causa lectura errónea en 30S)','Linezolid (inhibe formación del complejo de inicio 70S)'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El ARNr 16S de la subunidad 30S es diana de la estreptomicina',a:true},{t:'La eritromicina inhibe la translocación uniéndose al túnel de salida del peptídico en 50S',a:true},{t:'Los ribosomas cloroplásticos son 80S como los citosólicos eucariotas',a:false}],pts:15},
      {type:'fill',s:'El antibiótico ___ se une a la subunidad 30S del ribosoma bacteriano inhibiendo la síntesis proteica.',words:['estreptomicina','penicilina','rifampicina'],cor:'estreptomicina',pts:20},

        {type:'fill',q:'Los aminoglucósidos (estreptomicina) se unen a la subunidad ___ del ribosoma 70S causando lectura errónea del ARNm.',a:'30S',pts:22},
        {type:'fill',q:'El cloranfenicol inhibe la síntesis proteica bloqueando el centro ___ de la subunidad 50S bacteriana.',a:'peptidil-transferasa',pts:24},
        {type:'trueFalse',items:[
          {t:'Los ribosomas 80S eucarióticos son el blanco de tetraciclina o eritromicina',a:false},
          {t:'Mitocondrias y cloroplastos tienen ribosomas 70S: evidencia de su origen bacteriano',a:true},
          {t:'La eritromicina inhibe la translocación en la subunidad 50S bacteriana',a:true},
          {t:'La diferencia entre 70S y 80S se debe al tamaño de las subunidades ARNr',a:true},
        ],pts:28},
        {type:'sequence',items:['ARNm se une a subunidad 30S — fMet-ARNt ocupa sitio P','Subunidad 50S se une: complejo 70S formado','Aminoacil-ARNt entra al sitio A (elongación)','Peptidil-transferasa: transferencia del péptido al ARNt del sitio A','Translocación: ARNt-péptido de A→P; sitio A queda vacío','Repetición hasta codón de parada (UAA/UAG/UGA)','Factor de terminación: liberación del polipéptido y disociación'],pts:36},
],
  },
  ribosome70s2:{
    easy:[
      {type:'quiz',q:'¿Por qué los antibióticos pueden matar bacterias sin hacernos daño a nosotros?',opts:['Porque los ribosomas bacterianos son distintos a los nuestros y el antibiótico solo encaja en los bacterianos','Porque las bacterias son más pequeñas','Porque nuestras células digieren los antibióticos','Porque los antibióticos solo actúan fuera de las células'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los ribosomas bacterianos son 70S y los humanos son 80S',a:true},{t:'Los antibióticos dañan por igual ribosomas bacterianos y humanos',a:false},{t:'Las mitocondrias tienen ribosomas 70S como las bacterias',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué los antibióticos pueden inhibir ribosomas bacterianos sin dañar células humanas?',opts:['Los ribosomas bacterianos (70S) son distintos a los humanos (80S)','Las bacterias no tienen ribosomas en realidad','Los antibióticos solo actúan fuera de la célula','Los ribosomas humanos son más lentos'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los ribosomas mitocondriales son 70S',a:true},{t:'Inhibir el ribosoma 70S no afecta células eucariotas normales',a:true},{t:'Los ribosomas 80S son más pequeños que los 70S',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué mecanismo de resistencia bacteriana modifica químicamente al antibiótico aminoglucósido?',opts:['Enzimas modificadoras (acetiltransferasas, fosfotransferasas, nucleotidiltransferasas)','Bombas de eflujo que expulsan el aminoglucósido','Mutaciones en el ARNr 16S que reducen la afinidad','Plásmidos que secuestran el aminoglucósido en el periplasma'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La resistencia mediada por plásmidos al cloranfenicol usa la enzima CAT (cloranfenicol acetiltransferasa)',a:true},{t:'Los ribosomas 55S mitocondriales de mamíferos son diana de aminoglucósidos a altas dosis (ototoxicidad)',a:true},{t:'La vancomicina inhibe directamente el ribosoma bacteriano',a:false}],pts:15},
      {type:'fill',s:'El cloranfenicol inhibe la síntesis proteica uniéndose a la subunidad ___ del ribosoma bacteriano.',words:['50S','30S','70S total'],cor:'50S',pts:20},

        {type:'fill',q:'La tetraciclina bloquea el ingreso del aminoacil-ARNt al sitio ___ del ribosoma 70S bacteriano.',a:'A',pts:22},
        {type:'trueFalse',items:[
          {t:'Los ribosomas 70S y 80S son intercambiables funcionalmente',a:false},
          {t:'La subunidad 50S procariota contiene ARNr de tipo 5S y 23S',a:true},
          {t:'Los polirribosomas bacterianos pueden traducir un ARNm mientras aún se transcribe',a:true},
          {t:'La linezolida es un antibiótico que actúa sobre ribosomas 70S inhibiendo el inicio',a:true},
        ],pts:28},
],
  },
  pili:{
    easy:[
      {type:'quiz',q:'¿Para qué usan las bacterias los pili?',opts:['Para pegarse a superficies y a otras células','Para moverse como un motor','Para producir energía','Para guardar su ADN extra'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los pili ayudan a las bacterias a adherirse a células del cuerpo',a:true},{t:'Los pili son visibles sin microscopio',a:false},{t:'Algunos pili sirven para transferir ADN entre bacterias',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué función tienen los pili sexuales en bacterias?',opts:['Transferencia de plásmidos entre bacterias (conjugación)','Propulsión de la bacteria en medios líquidos','Absorción de nutrientes del medio','Resistencia a temperaturas extremas'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los pili ayudan en la adhesión bacteriana a superficies y hospederos',a:true},{t:'Los pili son visibles fácilmente al microscopio óptico común',a:false},{t:'Los pili son estructuras exclusivas de bacterias',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué sistema de secreción usa E. coli para ensamblar pili tipo I hacia el exterior?',opts:['Sistema chaperonas-usher (Chaperone-Usher pathway, CUP)','Sistema de secreción tipo III (T3SS)','Sistema de secreción tipo IV (T4SS) como en conjugación','Via Sec translocón para proteínas solubles'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Los pili de tipo IV pueden retractarse generando fuerza para el "grappling hook motility"',a:true},{t:'Las adhesinas de pili tipo I reconocen manosa en células del urotelio',a:true},{t:'Los pili sexuales F están codificados en el cromosoma bacteriano',a:false}],pts:15},
      {type:'fill',s:'Los pili sexuales bacterianos permiten la transferencia de ___ entre células durante la conjugación.',words:['plasmidos','ribosomas','cromosomas completos'],cor:'plasmidos',pts:20},

        {type:'fill',q:'Los pili tipo I de E. coli se adhieren a células epiteliales de la ___ causando la mayoría de las infecciones urinarias bacterianas.',a:'vejiga',pts:22},
        {type:'fill',q:'El pilus sexual (pili F) conecta dos bacterias para transferir ___ por conjugación.',a:'plásmidos',pts:22},
        {type:'trueFalse',items:[
          {t:'Las células eucariotas humanas también poseen pili para adherirse a superficies',a:false},
          {t:'Los pili son visibles al microscopio óptico convencional (tienen ~7 nm de diámetro)',a:false},
          {t:'Los pili tipo I de E. coli son la causa más frecuente de infecciones urinarias',a:true},
          {t:'Vacunas antipili están en desarrollo clínico para tratar infecciones urinarias recurrentes',a:true},
        ],pts:28},
],
  },
  flagella:{
    easy:[
      {type:'quiz',q:'¿Para qué sirve el flagelo de las bacterias?',opts:['Para moverse, nada en el líquido para buscar alimento o huir de toxinas','Para pegarse a superficies','Para producir energía','Para transferir ADN a otra bacteria'],ans:0,pts:15},
      {type:'fill',s:'El flagelo bacteriano está hecho de la proteína ___.',words:['flagelina','tubulina','actina'],cor:'flagelina',pts:12},
      {type:'trueFalse',items:[{t:'El flagelo bacteriano ayuda a la bacteria a moverse',a:true},{t:'El flagelo bacteriano es igual al de las células animales',a:false},{t:'Las bacterias usan el flagelo para acercarse o alejarse de sustancias',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la diferencia estructural entre el flagelo bacteriano y el eucariota?',opts:['El bacteriano rota (flagelina); el eucariota ondula con axonema 9+2 (tubulina)','Ambos tienen estructura de microtúbulos 9+2 idéntica','El eucariota rota mucho más rápido que el bacteriano','El bacteriano es siempre más largo que el eucariota'],ans:0,pts:20},
      {type:'quiz',q:'¿Cómo se ensambla el filamento flagelar bacteriano?',opts:['Las subunidades de flagelina viajan por el canal hueco del flagelo y se añaden en el extremo distal','Se construye de la base hacia arriba añadiendo subunidades en el cuerpo basal','Se sintetiza en el ribosoma y se exporta completo al exterior','Las subunidades se insertan desde el exterior por difusión pasiva'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'El flagelo bacteriano puede rotar hasta 1.500 rpm',a:true},{t:'El flagelo bacteriano tiene axonema 9+2 de microtúbulos',a:false},{t:'La bacteria usa el flagelo para quimiotaxis',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué componente del cuerpo basal bacteriano actúa como estator del motor flagelar?',opts:['Las proteínas MotA/MotB forman el estator que conduce protones para generar torque','El anillo L embebido en lipopolisacárido','El gancho (hook) de proteína FlgE','El filamento de flagelina polimérizada'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El motor flagelar bacteriano convierte el gradiente de protones (pmf) en rotación mecánica',a:true},{t:'La proteína FliM del anillo C actúa como interruptor de dirección de rotación',a:true},{t:'CheY-P fosforilado promueve la rotación antihoraria del flagelo',a:false}],pts:15},
      {type:'sequence',items:['Receptor MCP detecta quimioatractor en el ambiente','Proteína CheA (histidina quinasa) se autofosforila','CheY-P migra al motor y se une al anillo FliM','Rotación antihoraria del flagelo → nado recto hacia el atractor','CheZ defosforila CheY-P → restablecimiento del estado basal'],pts:25},
      {type:'fill',s:'La rotacion ___ del flagelo bacteriano produce movimiento recto, mientras que la horaria produce tumbo.',words:['antihoraria','horaria','lateral'],cor:'antihoraria',pts:20},

        {type:'fill',q:'El motor flagelar bacteriano obtiene energía del gradiente de ___ a través de la membrana (fuerza motriz protónica).',a:'protones',pts:22},
        {type:'fill',q:'La rotación ___ (CCW) del flagelo produce nado recto; la rotación CW produce el "tumbo".',a:'antihoraria',pts:20},
        {type:'trueFalse',items:[
          {t:'El flagelo bacteriano y el cilio eucariota comparten la estructura axonema 9+2',a:false},
          {t:'La flagelina del filamento se exporta a través del canal hueco del propio flagelo',a:true},
          {t:'Helicobacter pylori usa flagelos para penetrar el mucus gástrico y causar úlceras',a:true},
          {t:'Los flagelos bacterianos requieren ATP directamente para girar (como los cilios)',a:false},
        ],pts:28},
        {type:'sequence',items:['Gradiente de H⁺ (PMF) genera fuerza motriz en la membrana','Motor MotA/MotB convierte flujo de H⁺ en torque rotacional','Rotación CCW → filamentos en haz → nado recto','Quimiorreceptor (MCP) detecta disminución del atractivo','CheA-P transfiere fosfato a CheY','CheY-P se une al motor → cambio a rotación CW','Tumbo: bacteria se reorienta y reanuda nado hacia mayor concentración'],pts:38},
],
  },
  cell_wall_p:{
    easy:[
      {type:'quiz',q:'¿Por qué los antibióticos como la penicilina pueden matar bacterias?',opts:['Destruyen la pared celular de la bacteria, que la protege y le da forma','Destruyen el ADN de la bacteria','Bloquean la reproducción directamente','Deshidratan la bacteria'],ans:0,pts:15},
      {type:'fill',s:'La pared de las bacterias está hecha de una sustancia llamada ___.',words:['peptidoglicano','celulosa','colágeno'],cor:'peptidoglicano',pts:12},
      {type:'trueFalse',items:[{t:'La pared celular bacteriana protege a la bacteria',a:true},{t:'La penicilina daña la pared celular bacteriana',a:true},{t:'La pared bacteriana es igual a la de las plantas',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué antibiótico inhibe la síntesis de la pared celular bacteriana?',opts:['Penicilina (β-lactámico)','Tetraciclina (inhibe ribosomas)','Eritromicina (inhibe ribosomas)','Fluoroquinolonas (inhiben ADN girasa)'],ans:0,pts:20},
      {type:'fill',s:'La pared celular bacteriana está formada por ___.',words:['peptidoglicano','celulosa','quitina'],cor:'peptidoglicano',pts:15},
      {type:'trueFalse',items:[{t:'Gram+ tiene pared de peptidoglicano gruesa',a:true},{t:'Gram− tiene membrana externa adicional',a:true},{t:'La penicilina destruye la membrana plasmática bacteriana',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el mecanismo molecular por el que la penicilina inhibe la síntesis de peptidoglicano?',opts:['Se une covalentemente a PBPs (penicillin-binding proteins, transpeptidasas) bloqueando el entrecruzamiento de cadenas peptídicas','Inhibe la MurA que sintetiza el primer precursor UDP-N-acetilmuramato','Bloquea la transferasa que añade N-acetilglucosamina al lípido II','Interfiere con el transporte del lípido II a través de la membrana'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las bacterias MRSA producen una PBP2a (codificada por mecA) con baja afinidad por β-lactámicos',a:true},{t:'La vancomicina se une al dipéptido D-Ala-D-Ala del precursor del peptidoglicano',a:true},{t:'Las bacterias Gram− son naturalmente resistentes a penicilina G por su membrana externa (LPS)',a:true}],pts:15},
      {type:'fill',s:'Los antibióticos beta-lactámicos inhiben la síntesis de ___, el componente de la pared bacteriana.',words:['peptidoglicano','quitina','celulosa'],cor:'peptidoglicano',pts:20},

        {type:'fill',q:'La penicilina inhibe las ___ (PBPs), enzimas que forman los puentes cruzados del peptidoglicano.',a:'proteínas de unión a penicilina',pts:24},
        {type:'fill',q:'Las bacterias Gram ___ tienen pared de peptidoglicano más gruesa y retienen el colorante violeta en la tinción de Gram.',a:'positivas',pts:20},
        {type:'trueFalse',items:[
          {t:'La pared de la célula vegetal tiene peptidoglicano igual que las bacterias',a:false},
          {t:'Los β-lactámicos actúan sobre la pared bacteriana porque las células humanas no tienen peptidoglicano',a:true},
          {t:'Las bacterias Gram negativas tienen una membrana externa adicional con LPS',a:true},
          {t:'La vancomicina inhibe la síntesis del peptidoglicano uniéndose al precursor D-Ala-D-Ala',a:true},
        ],pts:28},
        {type:'sequence',items:['Síntesis de precursores UDP-MurNAc en el citoplasma','Transporte del precursor por bactoprenol (flip a membrana)','Transglicosilación: inserción del disacárido en la cadena existente','Transpeptidación: puentes cruzados entre cadenas (bloqueada por penicilina)','Acumulación de precursores sin unir → debilitamiento de la pared','Lisis osmótica de la bacteria'],pts:36},
],
  },
  membrane_p:{
    easy:[
      {type:'quiz',q:'¿Qué función extra cumple la membrana plasmática de las bacterias que en nosotros hace la mitocondria?',opts:['Produce energía (ATP) mediante la respiración celular','Fabrica proteínas','Almacena el ADN','Realiza la fotosíntesis siempre'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La membrana bacteriana produce energía como la mitocondria',a:true},{t:'La membrana bacteriana tiene colesterol como la nuestra',a:false},{t:'Algunos antibióticos dañan la membrana bacteriana directamente',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proceso metabólico ocurre en la membrana bacteriana que en eucariotas sucede en las mitocondrias?',opts:['Respiración celular y síntesis de ATP','Síntesis y replicación del ADN','División celular por mitosis','Fotosíntesis en todas las bacterias'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'La membrana bacteriana contiene colesterol como la eucariota',a:false},{t:'La membrana bacteriana cumple funciones de la mitocondria eucariota',a:true},{t:'Las polimixinas desestabilizan la membrana bacteriana',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué lípidos reemplazan al colesterol en la membrana bacteriana manteniendo la fluidez?',opts:['Hopanoides (pentacíclicos tipo hopano) en muchas bacterias; ácidos grasos ramificados en otras','Solo fosfolípidos insaturados de cadena larga','Esfingolípidos similares a los eucariotas','Cardiolipina exclusivamente en todas las bacterias'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La daptomicina se inserta en la membrana bacteriana dependiente de Ca²⁺ formando poros',a:true},{t:'Las polimixinas B y E (colistina) interaccionan con el LPS de la membrana externa de Gram−',a:true},{t:'El sistema de dos componentes PhoP/PhoQ regula modificaciones del LPS para resistir polimixinas',a:true}],pts:15},
      {type:'fill',s:'Las bacterias Gram negativas tienen una ___ adicional fuera de la delgada capa de peptidoglicano.',words:['membrana externa','capsula celulosa','vaina proteica'],cor:'membrana externa',pts:20},

        {type:'fill',q:'La membrana bacteriana cumple la función respiratoria que en eucariotas realiza la ___.',a:'mitocondria',pts:22},
        {type:'fill',q:'Los hopanoides de la membrana bacteriana son equivalentes funcionales del ___ eucariota como estabilizadores de fluidez.',a:'colesterol',pts:22},
        {type:'trueFalse',items:[
          {t:'La membrana plasmática bacteriana contiene colesterol como estabilizador',a:false},
          {t:'La cadena respiratoria bacteriana está en la membrana plasmática por ausencia de mitocondrias',a:true},
          {t:'La membrana interna mitocondrial es homóloga a la membrana plasmática bacteriana',a:true},
          {t:'Las polimixinas destruyen bacterias Gram negativas desorganizando su membrana',a:true},
        ],pts:28},
        {type:'sequence',items:['Oxidación de NADH por Complejo I en membrana plasmática bacteriana','Transferencia de electrones por ubiquinona al Complejo III','Bombeo de H⁺ al espacio periplásmico','Reducción final del O₂ por Complejo IV (citocromo oxidasa)','Gradiente de H⁺ entre periplasma y citoplasma (PMF)','Retorno de H⁺ vía ATP sintasa (Complejo V)','Fosforilación del ADP → ATP bacteriano'],pts:38},
],
  },
  capsule:{
    easy:[
      {type:'quiz',q:'¿Para qué sirve la cápsula de algunas bacterias?',opts:['Las protege de ser destruidas por nuestro sistema inmune','Las ayuda a moverse','Les da color','Las ayuda a reproducirse más rápido'],ans:0,pts:15},
      {type:'fill',s:'La cápsula bacteriana es un factor de ___ porque hace que la bacteria sea más peligrosa.',words:['virulencia','nutrición','movimiento'],cor:'virulencia',pts:12},
      {type:'trueFalse',items:[{t:'La cápsula protege a las bacterias del sistema inmune',a:true},{t:'Todas las bacterias tienen cápsula',a:false},{t:'La cápsula está hecha principalmente de azúcares (polisacáridos)',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cómo protege la cápsula bacteriana a la bacteria del sistema inmune?',opts:['Impide la fagocitosis por macrófagos y neutrófilos','Produce toxinas que destruyen leucocitos','Sintetiza anticuerpos propios','Aumenta la velocidad de los flagelos'],ans:0,pts:20},
      {type:'fill',s:'La cápsula bacteriana es un factor de ___ porque aumenta la capacidad de causar enfermedad.',words:['virulencia','nutrición','respiración'],cor:'virulencia',pts:15},
      {type:'trueFalse',items:[{t:'La cápsula es un factor de virulencia bacteriana',a:true},{t:'Todas las bacterias poseen cápsula obligatoriamente',a:false},{t:'La cápsula está formada principalmente por polisacáridos',a:true},{t:'El experimento de Griffith usó cápsula para demostrar la transformación bacteriana',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Por qué la cápsula de Streptococcus pneumoniae tipo 3 (ácido hialurónico) evade el sistema inmune eficientemente?',opts:['El ácido hialurónico mimetiza el tejido conectivo del hospedero evitando el reconocimiento como extraño','Produce una proteasa que degrada anticuerpos IgG','Activa el complemento vía alternativa para consumirlo','Inhibe la maduración de células dendríticas'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las vacunas antineumocócicas (PCV13) contienen polisacáridos capsulares conjugados a proteínas carrier',a:true},{t:'La cápsula del anthrax de Bacillus anthracis está compuesta de poli-D-ácido glutámico (no polisacárido)',a:true},{t:'La opsonización con IgG y C3b supera la evasión capsular facilitando la fagocitosis',a:true}],pts:15},
      {type:'fill',s:'La cápsula bacteriana está compuesta principalmente de ___, que la protege de la fagocitosis.',words:['polisacáridos','proteínas D-glutámicas','peptidoglicano'],cor:'polisacáridos',pts:20},

        {type:'fill',q:'El experimento de ___ (1928) demostró que la cápsula del neumococo es factor de virulencia al transformar cepas avirulentas.',a:'Griffith',pts:22},
        {type:'fill',q:'La cápsula inhibe la ___ al impedir que los receptores del macrófago reconozcan la superficie bacteriana.',a:'fagocitosis',pts:22},
        {type:'trueFalse',items:[
          {t:'Las células eucariotas humanas tienen una cápsula equivalente a la bacteriana',a:false},
          {t:'S. pneumoniae sin cápsula es avirulento porque puede ser fagocitado eficientemente',a:true},
          {t:'Las vacunas PCV13 y PCV15 contienen polisacáridos capsulares conjugados a proteínas',a:true},
          {t:'La cápsula impide siempre que los antibióticos lleguen a la bacteria',a:false},
        ],pts:28},
        {type:'sequence',items:['Bacteria capsulada ingresa al hospedero','Sistema inmune intenta opsonizar con anticuerpos y complemento','Cápsula bloquea la opsonización (efecto anti-fagocítico)','Macrófago no puede fagocitar a la bacteria capsulada','Bacteria prolifera — infección sistémica','Anticuerpos anti-cápsula (vacuna) superan la evasión inmune','Bacteria opsonizada → fagocitosis efectiva → eliminación'],pts:38},
],
  },
  // ── FUNGI ──
  chitin_wall:{
    easy:[
      {type:'quiz',q:'¿De qué está hecha la pared celular de los hongos?',opts:['Quitina (igual que el exoesqueleto de los insectos)','Celulosa como en las plantas','Peptidoglicano como en las bacterias','Colágeno como en los animales'],ans:0,pts:15},
      {type:'fill',s:'La pared de los hongos está hecha de ___, el mismo material que el caparazón de los insectos.',words:['quitina','celulosa','peptidoglicano'],cor:'quitina',pts:12},
      {type:'trueFalse',items:[{t:'La pared de los hongos está hecha de quitina',a:true},{t:'La pared de los hongos es igual a la de las plantas',a:false},{t:'Los antibióticos como la penicilina destruyen la pared de los hongos',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la diferencia entre la pared de quitina fúngica y la pared de celulosa vegetal?',opts:['La quitina es un polisacárido de N-acetilglucosamina; la celulosa es de glucosa','Son el mismo polímero con diferente nombre','La quitina es inorgánica; la celulosa es orgánica','Solo difieren en el grado de lignificación'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Las equinocandinas atacan la síntesis de β-glucano de la pared fúngica',a:true},{t:'La pared de quitina es idéntica a la pared de peptidoglicano bacteriano',a:false},{t:'La quitina fúngica es una diana antifúngica',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué enzima sintetiza la quitina en la pared fúngica y cuál es su sustrato?',opts:['Quitina sintasa (CHS): UDP-GlcNAc → quitina + UDP','Celulosa sintasa (CesA): UDP-glucosa → celulosa','β-glucano sintasa (FKS1): UDP-glucosa → β-1,3-glucano','Muroil-ligasa: UDP-MurNAc + aminoácidos → peptidoglicano'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las equinocandinas (caspofungina) inhiben la β-1,3-glucano sintasa FKS1',a:true},{t:'La quitina fúngica tiene enlaces β-1,4 idénticos a la celulosa',a:true},{t:'La pared de quitina protege al hongo de la presión osmótica igual que el peptidoglicano bacteriano',a:true}],pts:15},
      {type:'fill',s:'Las ___ son antifungicos que inhiben la sintesis del beta-glucano de la pared fungica.',words:['equinocandinas','azoles','polienos'],cor:'equinocandinas',pts:20},
    ],
  },
  membrane_f:{
    easy:[
      {type:'quiz',q:'¿Qué tiene de especial la membrana de los hongos respecto a la de los animales?',opts:['Tiene ergosterol en vez de colesterol','No tiene membrana plasmática','Tiene clorofila para realizar fotosíntesis','Está hecha de peptidoglicano'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La membrana de los hongos contiene ergosterol en lugar de colesterol',a:true},{t:'Los antifúngicos actúan sobre el ergosterol fúngico',a:true},{t:'La membrana de los hongos es exactamente igual a la nuestra',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué el ergosterol hace posible el desarrollo de antifúngicos específicos?',opts:['El ergosterol es exclusivo de hongos; el colesterol es el esterol en células humanas','El ergosterol es más resistente que el colesterol a los antifúngicos','El ergosterol está fuera de la célula, accesible para los fármacos','El ergosterol produce energía y bloquearlo mata la célula fúngica'],ans:0,pts:20},
      {type:'fill',s:'Los antifúngicos azoles inhiben la síntesis de ___, el esterol de la membrana fúngica.',words:['ergosterol','colesterol','quitina'],cor:'ergosterol',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el mecanismo de acción de la anfotericina B sobre el ergosterol fúngico?',opts:['Se une al ergosterol formando poros que permean iones → lisis osmótica','Inhibe la 14α-desmetilasa del lanosterol como los azoles','Bloquea la síntesis de ergosterol en el RE fúngico','Activa proteasas que degradan el ergosterol de la membrana'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Los azoles inhiben el citocromo P450 CYP51A1 (Erg11p), la 14α-desmetilasa del lanosterol fúngico',a:true},{t:'La anfotericina B forma complejos con el ergosterol creando canales iónicos',a:true},{t:'La resistencia a azoles se debe a mutaciones en ERG11 o sobreexpresión de bombas de eflujo CDR1/2',a:true}],pts:15},
      {type:'fill',s:'Los antifungicos ___ actuan uniendose al ergosterol y formando poros en la membrana fungica.',words:['polienos (anfotericina B)','azoles','equinocandinas'],cor:'polienos (anfotericina B)',pts:20},
    ],
  },
  nucleus_f:{
    easy:[
      {type:'quiz',q:'¿Qué tiene de único la mitosis en los hongos?',opts:['La envoltura nuclear no se rompe: es una mitosis cerrada','Los cromosomas se mueven fuera del núcleo','Solo los hongos tienen mitocondrias durante la mitosis','La mitosis dura 48 horas en todos los hongos'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los hongos realizan mitosis cerrada sin romper la envoltura nuclear',a:true},{t:'El genoma de los hongos es mucho más grande que el humano',a:false},{t:'La levadura fue el primer eucariota en secuenciar su genoma',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la diferencia entre la mitosis cerrada (hongos) y la abierta (animales)?',opts:['En la cerrada, la envoltura nuclear persiste y el huso se forma dentro del núcleo','En la cerrada, los cromosomas no se condensan','En la cerrada, el núcleo se duplica sin división celular','No hay diferencia funcional, solo terminológica'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los hongos haploides y diploides existen como etapas del ciclo vital',a:true},{t:'La mitosis cerrada es exclusiva de hongos y eucariotas primitivos',a:true},{t:'El huso mitótico fúngico se forma fuera del núcleo',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué estructura fúngica actúa como MTOC dentro del núcleo en la mitosis cerrada?',opts:['El SPB (spindle pole body), embebido en la envoltura nuclear','El centrosoma que migra al interior del núcleo','El nucléolo que reorganiza los microtúbulos','La lámina nuclear que genera los microtúbulos del huso'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El SPB fúngico es el equivalente funcional del centrosoma animal',a:true},{t:'En Saccharomyces cerevisiae el SPB se duplica en fase S',a:true},{t:'El huso mitótico fúngico es idéntico en composición al de células animales',a:false}],pts:15},
      {type:'fill',s:'Los hongos realizan mitosis ___, donde la envoltura nuclear no se rompe durante la division.',words:['cerrada','abierta','semi-abierta'],cor:'cerrada',pts:20},
    ],
  },
  nucleolus_f:{
    easy:[
      {type:'fill',s:'El nucléolo fúngico fabrica ___, las partículas que sirven para hacer proteínas.',words:['ribosomas','mitocondrias','vacuolas'],cor:'ribosomas',pts:12},
      {type:'trueFalse',items:[{t:'El nucléolo fúngico fabrica ribosomas',a:true},{t:'El nucléolo tiene su propia membrana',a:false},{t:'Los ribosomas fúngicos son 70S como los bacterianos',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué el nucléolo persiste durante la mitosis en hongos pero desaparece en animales?',opts:['Porque la mitosis fúngica es cerrada y la envoltura nuclear no se rompe','Porque los hongos no tienen cromatina condensada','Porque el nucléolo fúngico se divide como una bacteria','Porque el ARNr fúngico es más estable que el de animales'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'El nucléolo fúngico persiste durante toda la mitosis cerrada',a:true},{t:'El pre-ARNr en levaduras es el 35S (en mamíferos es 45S)',a:true},{t:'Las levaduras tienen dos nucléolos a diferencia de los animales',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cómo se procesa el pre-ARNr 35S en Saccharomyces cerevisiae?',opts:['Cortes en A0,A1,A2 → 18S (40S) y A3,B1,C2 → 5.8S+25S (60S)','Directamente transcrito como 18S y 28S sin procesamiento','Procesado en el citoplasma por ribonucleasas','Clivado solo una vez para dar las dos subunidades'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las snoRNAs guían la modificación del pre-ARNr en el nucléolo',a:true},{t:'El procesamiento del ARNr ocurre tanto en nucléolo como en citoplasma',a:true},{t:'La proteína Nop1p (fibrillarina) está implicada en el procesamiento del ARNr en levaduras',a:true}],pts:15},
      {type:'fill',s:'El pre-ARNr en levaduras es el transcrito ___, precursor de las subunidades ribosomicas 40S y 60S.',words:['35S','45S','23S'],cor:'35S',pts:20},
    ],
  },
  mito_f:{
    easy:[
      {type:'quiz',q:'¿Qué rol tienen las mitocondrias en la fermentación alcohólica de levaduras?',opts:['Pueden cambiar entre respiración y fermentación según el O₂ disponible','Realizan siempre la fermentación sin importar el O₂','No participan en la producción de etanol','Solo funcionan en la fase de crecimiento exponencial'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las levaduras pueden producir etanol sin mitocondrias activas',a:true},{t:'Las mitocondrias fúngicas tienen ADN propio',a:true},{t:'La mitocondria fúngica tiene ribosomas 80S como el citoplasma',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué son las colonias "petite" en Saccharomyces cerevisiae?',opts:['Mutantes con ADN mitocondrial dañado que no pueden hacer respiración aeróbica','Colonias más pequeñas por cultivo a baja temperatura','Cepas que no pueden fermentar lactosa','Mutantes de pared de menor tamaño'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Las levaduras son anaerobias facultativas y pueden vivir sin mitocondrias funcionales',a:true},{t:'El efecto Crabtree es la represión de la respiración por exceso de glucosa',a:true},{t:'Las mitocondrias fúngicas forman una red reticular dinámica',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el mecanismo del efecto Crabtree en levaduras?',opts:['Exceso de glucosa reprime la respiración → fermenta aunque haya O₂','Falta de NAD⁺ bloquea la glucólisis y activa la cadena respiratoria','El ATP inhibe la piruvato descarboxilasa','El etanol producido inhibe la fosforilación oxidativa'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Los mutantes ρ° (rho cero) de levadura carecen de ADN mitocondrial pero son viables',a:true},{t:'La fusión mitocondrial en hongos depende de las proteínas Fzo1p y Ugo1p',a:true},{t:'El mtADN de levaduras puede eliminarse con bromuro de etidio',a:true}],pts:15},
      {type:'fill',s:'En condiciones anaerobias, las levaduras fermentan glucosa produciendo ___ y CO2.',words:['etanol','lactato','acetato'],cor:'etanol',pts:20},
    ],
  },
  er_f:{
    easy:[
      {type:'fill',s:'El Retículo Endoplasmático de los hongos fabrica principalmente ___ que luego van a la membrana.',words:['proteínas','azúcares','lípidos'],cor:'proteínas',pts:12},
      {type:'trueFalse',items:[{t:'El RE fúngico está conectado al núcleo',a:true},{t:'Las proteínas del RE fúngico no necesitan plegarse',a:false},{t:'El RE fúngico envía proteínas al aparato de Golgi',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué es la respuesta UPR (Unfolded Protein Response) en hongos?',opts:['Respuesta al estrés del RE por proteínas mal plegadas; activa Ire1p','Respuesta a la falta de glucosa que activa el ciclo de Krebs','Respuesta a la hipoxia que activa la fermentación alcohólica','Respuesta al calor que desnaturaliza el ADN'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'El estrés del RE en hongos patógenos aumenta su virulencia',a:true},{t:'La proteína BiP/Kar2p en levaduras es la chaperona luminal del RE',a:true},{t:'La UPR fúngica es idéntica a la de células de mamífero',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el mecanismo de señalización de Ire1p en la UPR de S. cerevisiae?',opts:['Ire1p (RNasa/kinasa) splica el ARNm de HAC1 → factor de transcripción activo → genes de plegamiento','Solo fosforila PERK como en mamíferos para inhibir la traducción global','Activa ATF6 que migra al Golgi para su procesamiento proteolítico','Señaliza a través de NF-κB para activar la inflamación'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Ire1p combina actividad kinasa y endorribonucleasa en la misma proteína',a:true},{t:'El splicing no convencional del ARNm de HAC1 elimina un intrón de 252 nt',a:true},{t:'La UPR de levaduras tiene las tres ramas (Ire1, PERK, ATF6) como en mamíferos',a:false}],pts:15},
      {type:'fill',s:'La chaperona ___ en el RE fungico asiste el plegamiento de proteinas (equivalente a BiP de mamiferos).',words:['Kar2p','Hsp90','calnexina'],cor:'Kar2p',pts:20},
    ],
  },
  golgi_f:{
    easy:[
      {type:'quiz',q:'¿Qué diferencia tiene el Golgi de las levaduras respecto al de las células animales?',opts:['En levaduras no forma pilas: son cisternas sueltas dispersas por el citoplasma','El Golgi de levaduras es más grande','El Golgi de levaduras no tiene cara cis ni trans','Las levaduras no tienen aparato de Golgi'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El aparato de Golgi de hongos modifica proteínas para enviarlas a distintos destinos',a:true},{t:'El Golgi de las levaduras forma pilas ordenadas como en animales',a:false},{t:'Los hongos realizan O-manosilación en el Golgi',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué tipo especial de glicosilación realizan los hongos en el Golgi?',opts:['O-manosilación (adición de manosa a Ser/Thr) usando dolichol-P-mannose','O-GlcNAcilación como en células animales','Sulfatación de proteoglicanos como en heparina','N-glicosilación con 9 residuos de manosa (high-mannose)'],ans:0,pts:20},
      {type:'fill',s:'En el Golgi fúngico, las proteínas se recubren de ___ (azúcar), lo que las hace más antigénicas.',words:['manosa','glucosa','galactosa'],cor:'manosa',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es la principal diferencia en el transporte al Golgi entre levaduras y mamíferos?',opts:['En levaduras el Golgi madura de cis a trans (modelo de maduración de cisternas sin cisterna estable)','Las vesículas COPI no existen en levaduras','En levaduras las vesículas COPII transportan más carga','Las proteínas SNARE no participan en la fusión con el Golgi fúngico'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'En levaduras, cada cisterna de Golgi es transitoria y madura hacia la identidad trans',a:true},{t:'Las vesículas COPII en levaduras tienen la misma composición que en mamíferos',a:false},{t:'Sec18p (NSF) y Sec17p (α-SNAP) participan en la disociación de SNARE postfusión en levaduras',a:true}],pts:15},
      {type:'fill',s:'Los hongos O-___ proteinas extensamente en el Golgi, un proceso caracteristico que produce manoproteinas.',words:['manosi lan','N-glicosilan','fosforilan'],cor:'manosi lan',pts:20},
    ],
  },
  vacuole_f:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función principal de la vacuola en las células fúngicas?',opts:['Almacena nutrientes y degrada material celular (como lisosoma + vacuola vegetal)','Solo almacena agua','Produce energía','Es el núcleo del hongo'],ans:0,pts:15},
      {type:'fill',s:'La vacuola fúngica tiene un ___ ácido y contiene enzimas digestivas, como el lisosoma animal.',words:['pH','ADN','glucosa'],cor:'pH',pts:12},
      {type:'trueFalse',items:[{t:'La vacuola fúngica combina funciones del lisosoma y la vacuola vegetal',a:true},{t:'La vacuola fúngica produce ATP',a:false},{t:'La vacuola fúngica almacena polifosfato',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué papel cumple la vacuola fúngica en el estrés nutricional?',opts:['Libera aminoácidos y nutrientes almacenados mediante autofagia','Produce energía por glucólisis vacuolar','Sintetiza proteínas de emergencia','Exporta toxinas al exterior'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'La vacuola fúngica almacena polifosfato inorgánico como reserva de fósforo',a:true},{t:'El pH vacuolar fúngico es ~6, menos ácido que el lisosoma animal (pH 4.5)',a:true},{t:'La vacuola fúngica no cumple funciones de degradación proteica',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué vía de autofagia es más relevante en la vacuola de S. cerevisiae bajo ayuno de nitrógeno?',opts:['Macroautofagia selectiva: formación de autofagosomas dirigida por la vía Atg1-Atg13','Autofagia mediada por chaperonas (CMA) como en mamíferos','Microautofagia exclusiva: invaginación directa del tonoplasto','Mitofagia selectiva como única forma de autofagia en levaduras'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las proteínas ATG (autophagy-related genes) fueron descubiertas en Saccharomyces cerevisiae',a:true},{t:'Yoshinori Ohsumi recibió el Nobel 2016 por descubrir la autofagia en levaduras',a:true},{t:'La autofagia fúngica y la de mamíferos comparten las proteínas ATG esenciales',a:true}],pts:15},
      {type:'fill',s:'Las vacuolas fungicas almacenan hasta el 80% del ___ celular total, clave para el metabolismo del fosforo.',words:['polifosfato','glucogeno','calcio'],cor:'polifosfato',pts:20},
    ],
  },
  ribosome_f:{
    easy:[
      {type:'quiz',q:'¿Son iguales los ribosomas de los hongos a los de las células animales?',opts:['Sí, ambos son 80S, por eso es difícil crear antifúngicos que no nos afecten','No, los hongos tienen ribosomas 70S como las bacterias','Son idénticos y todos los antibióticos actúan igual en hongos','Los hongos no tienen ribosomas'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los ribosomas de los hongos son 80S como los de las células animales',a:true},{t:'Los antibióticos que atacan ribosomas 70S bacterianos también matan los hongos',a:false},{t:'La ciclohexamida inhibe ribosomas 80S tanto fúngicos como animales',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué es difícil crear antifúngicos que maten hongos sin dañar al paciente?',opts:['Los ribosomas 80S fúngicos son casi idénticos a los humanos → baja selectividad','Porque los hongos no tienen membrana y los fármacos no pueden entrar','Porque los hongos mutan más rápido que las bacterias','Porque los hongos producen sus propios antibióticos en respuesta'],ans:0,pts:20},
      {type:'fill',s:'Los antifúngicos preferidos atacan el ___ o la pared de quitina, para evitar dañar al paciente.',words:['ergosterol','ribosoma','ADN'],cor:'ergosterol',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el mecanismo molecular de la ciclohexamida sobre el ribosoma 80S eucariota?',opts:['Se une al sitio E del ribosoma 60S bloqueando la salida del ARNt desacilado e inhibiendo la translocación','Inhibe el factor de iniciación eIF4E bloqueando el reconocimiento del cap','Bloquea la peptidil transferasa en la subunidad 60S igual que el cloranfenicol','Inhibe la GTPasa del factor eEF2 bloqueando la translocación del péptido'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La ciclohexamida es usada en investigación como inhibidor de la síntesis proteica eucariota',a:true},{t:'Los ARNr de la subunidad 60S fúngica y humana son >80% idénticos en secuencia',a:true},{t:'La sordarina es un antifúngico que inhibe selectivamente el factor eEF2 fúngico',a:true}],pts:15},
      {type:'fill',s:'La ___ inhibe los ribosomas 80S eucariotas (incluyendo los fungicos) bloqueando la translocacion.',words:['ciclohexamida','estreptomicina','cloranfenicol'],cor:'ciclohexamida',pts:20},
    ],
  },
  woronin:{
    easy:[
      {type:'quiz',q:'¿Para qué sirven los cuerpos de Woronin en los hongos filamentosos?',opts:['Tapan el poro del septo cuando una hifa se rompe, para no perder citoplasma','Producen energía para el crecimiento de la hifa','Almacenan ADN extra del hongo','Son los orgánulos donde se produce la quitina'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los cuerpos de Woronin son exclusivos de hongos Ascomycetes',a:true},{t:'Los cuerpos de Woronin se encuentran también en plantas',a:false},{t:'Los cuerpos de Woronin actúan como tapones de emergencia',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la proteína principal de los cuerpos de Woronin?',opts:['HEX-1, que forma cristales hexagonales en su interior','Quitina, el mismo material de la pared','Flagelina, la misma que el flagelo bacteriano','Espectrina, como en los glóbulos rojos'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los cuerpos de Woronin están presentes en Basidiomycetes como las setas',a:false},{t:'Los cuerpos de Woronin protegen el micelio de pérdidas citoplasmáticas por daño',a:true},{t:'HEX-1 se autoensambla en la matriz cristalina del cuerpo de Woronin',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cómo se anclan los cuerpos de Woronin al poro del septo en Neurospora crassa?',opts:['A través de la proteína WSC (Woronin body Sorting Complex) que los ancla a la membrana del poro','Directamente por adhesión no específica a la quitina','Mediante quitinas especiales que forman un tapón de quitina','Por atracción electrostática con la carga negativa de la membrana'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El gen hex-1 mutante produce cuerpos de Woronin no funcionales con morfología anormal',a:true},{t:'Los cuerpos de Woronin pueden moverse activamente hacia el poro usando motores moleculares',a:true},{t:'Los cuerpos de Woronin son equivalentes funcionales de los plasmodesmos vegetales',a:false}],pts:15},
      {type:'fill',s:'Los cuerpos de Woronin estan compuestos por una matriz proteica cristalina de la proteina ___.',words:['HEX-1','actina','tubulina'],cor:'HEX-1',pts:20},
    ],
  },
  lipid_drop:{
    easy:[
      {type:'quiz',q:'¿Para qué almacenan los hongos gotas lipídicas en su citoplasma?',opts:['Como reserva de energía para usarla cuando no hay nutrientes disponibles','Para producir la pared de quitina','Para almacenar el ADN extra','Para lubricar la membrana plasmática'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las gotas lipídicas son reservas de energía en los hongos',a:true},{t:'Las gotas lipídicas solo existen en células animales',a:false},{t:'Las levaduras acumulan más gotas lipídicas cuando hay exceso de nutrientes',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué tipos de lípidos se almacenan en las gotas lipídicas fúngicas?',opts:['Triacilgliceroles y ésteres de esteroles (ergosterol esterificado)','Solo fosfolípidos de membrana','Glucolípidos y ceramidas','Quitina en forma lipídica'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Las gotas lipídicas fúngicas tienen una monolámina de fosfolípidos (no bicapa)',a:true},{t:'Las levaduras oleaginosas como Yarrowia lipolytica acumulan más del 20% de su peso en lípidos',a:true},{t:'Las gotas lipídicas fúngicas se forman en la mitocondria',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es la relevancia biotecnológica de las gotas lipídicas en levaduras oleaginosas?',opts:['Producción de biocombustibles y ácidos grasos de cadena larga mediante ingeniería metabólica','Solo sirven como marcador de estrés celular','Son útiles para producir antibióticos β-lactámicos','Su alto contenido en ergosterol las hace fuente de vitamina D'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La perilipina fúngica (Pet10p en S. cerevisiae) recubre la superficie de las gotas lipídicas',a:true},{t:'La lipólisis de gotas lipídicas en levaduras es regulada por lipasas del tipo Tgl3/4/5',a:true},{t:'Las gotas lipídicas fúngicas son estáticas y no interactúan con otros orgánulos',a:false}],pts:15},
      {type:'fill',s:'Las gotas lipidicas estan rodeadas por una ___ de fosfolipidos, no una bicapa como las membranas normales.',words:['monocapa','bicapa','tricapa'],cor:'monocapa',pts:20},
    ],
  },
  hyphal_pore:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función del poro en el septo de las hifas fúngicas?',opts:['Permite que el citoplasma y los orgánulos fluyan entre células del hongo','Impide completamente el paso entre células','Produce la quitina de la pared celular','Es el lugar donde entra el oxígeno'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El poro del septo permite la comunicación entre células de una hifa',a:true},{t:'Todos los hongos tienen septos con poros',a:false},{t:'Los cuerpos de Woronin pueden tapar el poro del septo',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué diferencia hay entre el poro del septo de Ascomycetes y el de Basidiomycetes?',opts:['Ascomycetes: poro simple tapado por Woronin. Basidiomycetes: doliporo en barril con parentosoma','Son idénticos en ambos grupos fúngicos','Los Basidiomycetes tienen poro de Woronin; los Ascomycetes, doliporo','Ambos tienen doliporos pero de diferente tamaño'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los hongos sin septos (cenocíticos) tienen el citoplasma continuo sin divisiones',a:true},{t:'Los virus de hongos se propagan entre células a través de los poros septales',a:true},{t:'El doliporo de Basidiomycetes tiene la misma estructura que el poro de Ascomycetes',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es la función del parentosoma en el doliporo de Basidiomycetes?',opts:['Capa perforada de membrana que regula el paso de partículas grandes a través del doliporo','Proteína estructural que forma el toroide del doliporo','Carbohidrato que sella el poro durante esporulación','Enzima que degrada el septo durante la plasmogamia'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Durante la cariogamia en Basidiomycetes, los núcleos pasan a través de los doliporos',a:true},{t:'Los septos de Ascomycetes pueden tener múltiples poros pequeños en lugar de uno central',a:false},{t:'El dikarión de Basidiomycetes tiene dos núcleos por célula que coexisten sin fusionarse',a:true}],pts:15},
      {type:'fill',s:'En Basidiomycetes, el poro del septo hifal tiene una estructura especializada denominada poro ___.',words:['dolipore','areolado','simple'],cor:'dolipore',pts:20},
    ],
  },
  // ── NEURON ──
  neuron_membrane:{
    easy:[
      {type:'quiz',q:'¿Qué hace especial la membrana de una neurona respecto a otras células?',opts:['Genera señales eléctricas llamadas potenciales de acción','Produce clorofila para captar luz solar','Es más gruesa que otras membranas para proteger el cerebro','No tiene proteínas de transporte'],ans:0,pts:15},
      {type:'fill',s:'La neurona genera un ___ de acción que viaja a lo largo de su prolongación (axón).',words:['potencial','gradiente','impulso'],cor:'potencial',pts:12},
      {type:'trueFalse',items:[{t:'La membrana neuronal puede generar señales eléctricas',a:true},{t:'Todas las células del cuerpo generan potenciales de acción',a:false},{t:'Los canales de sodio son importantes para el potencial de acción',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es el potencial de membrana en reposo de una neurona típica?',opts:['−70 mV (interior negativo respecto al exterior)','0 mV (sin diferencia de potencial)','−40 mV (potencial de umbral)','−90 mV siempre igual en todas las neuronas'],ans:0,pts:20},
      {type:'sequence',items:['Canal Na⁺ se abre: entra Na⁺ → despolarización','Se alcanza el umbral (~-55 mV)','Canal K⁺ se abre: sale K⁺ → repolarización','Hiperpolarización transitoria','Bomba Na⁺/K⁺ ATPasa restaura el potencial de reposo'],pts:25},
    ],
    hard:[
      {type:'quiz',q:'¿Qué genera el período refractario absoluto en la membrana neuronal?',opts:['La inactivación de los canales Nav (cierre de la compuerta h/inactivación rápida)','La hiperpolarización por salida de K⁺ que supera el umbral','La baja concentración de Na⁺ extracelular tras el impulso','La unión irreversible del neurotransmisor al receptor postsináptico'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Los canales Nav1.6 son los más abundantes en los nodos de Ranvier',a:true},{t:'El período refractario relativo se debe a la hiperpolarización por K⁺',a:true},{t:'Los canales de K⁺ de rectificación tardía (Kv) se inactivan al mismo tiempo que los Nav',a:false}],pts:15},
      {type:'fill',s:'El potencial de accion se genera cuando el voltaje supera el umbral de disparo de aprox. ___ mV.',words:['-55','-70','+40'],cor:'-55',pts:20},
    ],
  },
  soma_nucleus:{
    easy:[
      {type:'quiz',q:'¿Por qué las neuronas NO se dividen una vez que el cerebro está formado?',opts:['Son células postmitóticas: perdieron la capacidad de dividirse al madurar','Porque el cerebro no tiene espacio para más células','Porque no tienen mitocondrias para dar energía a la división','Porque sus genes están completamente desactivados'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las neuronas son células postmitóticas que no se dividen',a:true},{t:'Las neuronas pueden dividirse cuando hay lesión cerebral para regenerar el tejido',a:false},{t:'Las neuronas usan casi el 80% de sus genes',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué consecuencia tiene el hecho de que las neuronas sean postmitóticas?',opts:['El daño neuronal es permanente porque no hay regeneración por mitosis','Las neuronas viven menos que otras células','Las neuronas tienen un genoma reducido al no necesitar replicación','Las neuronas no pueden sintetizar proteínas nuevas'],ans:0,pts:20},
      {type:'fill',s:'El daño al ADN neuronal se acumula con el tiempo porque las neuronas no se ___, lo que contribuye al envejecimiento.',words:['dividen','mitosan','replican'],cor:'dividen',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué mecanismos de reparación del ADN son más importantes en neuronas postmitóticas?',opts:['BER y NER para daño oxidativo (activos en células en G0)','NHEJ principal en G1','Recombinación homóloga que requiere ADN hermano (solo en células que se dividen)','Reversión directa de daños por fotoliasas'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La acumulación de daño al ADN neuronal correlaciona con el envejecimiento cerebral',a:true},{t:'El estrés oxidativo es la principal fuente de daño al ADN en neuronas por su alto metabolismo',a:true},{t:'Las neuronas tienen tasas de reparación del ADN 5 veces mayores que células proliferativas',a:false}],pts:15},
      {type:'fill',s:'Las neuronas son celulas ___, es decir, no se dividen en condiciones normales del adulto.',words:['postmitoticas','meioticas','totipotentes'],cor:'postmitoticas',pts:20},
    ],
  },
  nucleolus_n:{
    easy:[
      {type:'fill',s:'El nucléolo neuronal produce ___, que son necesarios para fabricar todas las proteínas de la neurona.',words:['ribosomas','mitocondrias','axones'],cor:'ribosomas',pts:12},
      {type:'trueFalse',items:[{t:'El nucléolo neuronal produce ribosomas',a:true},{t:'El nucléolo neuronal es el más pequeño de todas las células',a:false},{t:'Un nucléolo dañado afecta la síntesis de proteínas de la neurona',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué el nucléolo neuronal es proporcionalmente grande respecto al núcleo?',opts:['Las neuronas necesitan enormes cantidades de ribosomas para sintetizar proteínas axonales','Porque las neuronas no tienen otros orgánulos que compitan','Porque almacena el genoma neuronal extra','Por la positividad de la matriz nuclear en células grandes'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'La reducción del nucléolo es marcador temprano de neurodegeneración en Parkinson',a:true},{t:'Las neuronas motoras tienen los nucléolos más grandes del cuerpo humano',a:true},{t:'El nucléolo neuronal desaparece durante la senescencia normal',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué relación existe entre la función nucleolar y las enfermedades de motoneurona (SLA)?',opts:['Déficit de biogénesis de ribosomas por alteración de nucleolina y NPM1 → estrés de traducción','Solo hay daño axonal sin afectación del nucléolo en SLA','El nucléolo se agranda en SLA por compensación','No hay relación demostrada entre el nucléolo y SLA'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las mutaciones en proteínas de unión a ARN (TDP-43, FUS) afectan la función nucleolar en SLA',a:true},{t:'La separación de fases líquido-líquido del nucléolo neuronal es relevante para la SLA',a:true},{t:'El nucléolo produce exclusivamente ARNr y no está involucrado en respuesta al estrés',a:false}],pts:15},
      {type:'fill',s:'La reduccion del nucleolo neuronal es marcador temprano de neurodegeneracion en enfermedades como ___.',words:['Parkinson','esclerosis multiple','meningitis'],cor:'Parkinson',pts:20},
    ],
  },
  nissl_body:{
    easy:[
      {type:'quiz',q:'¿Qué son los cuerpos de Nissl y para qué sirven en las neuronas?',opts:['Son pilas de RE Rugoso que fabrican enormes cantidades de proteínas','Son los gránulos de glucosa que dan energía a la neurona','Son agregados de mitocondrias en el soma','Son los grupos de neuronas conectadas'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los cuerpos de Nissl son regiones de RE rugoso que sintetizan proteínas',a:true},{t:'Los cuerpos de Nissl están presentes en el axón de la neurona',a:false},{t:'Cuando una neurona se lesiona, los cuerpos de Nissl desaparecen (cromatólisis)',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué es la cromatólisis y qué indica clínicamente?',opts:['Disolución de los cuerpos de Nissl tras lesión axonal: señal de respuesta regenerativa','Fragmentación del núcleo neuronal en apoptosis','Degradación de la mielina en esclerosis múltiple','Pérdida de neurotransmisores de las vesículas sinápticas'],ans:0,pts:20},
      {type:'fill',s:'Los cuerpos de Nissl se tiñen con colorantes ___ como el azul de toluidina porque contienen mucho ARN.',words:['basófilos','eosinófilos','neutros'],cor:'basófilos',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué proteínas de stress granules se co-localizan con el RE rugoso neuronal en neurodegeneración?',opts:['TDP-43 y FUS forman agregados patológicos que secuestran ARNm del RER','Solo proteínas de choque térmico (Hsp70) se acumulan en el RER','La β-amiloide se agrega directamente en el lumen del RER','La alfa-sinucleína bloquea los poros nucleares del RER'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'TDP-43 normalmente regula el procesamiento de ARN en el núcleo pero se deslocaliza en SLA',a:true},{t:'Los cuerpos de Nissl contienen poliribosomas que traducen ARNm de proteínas estructurales del axón',a:true},{t:'La síntesis local en el cono de crecimiento axonal es independiente de los cuerpos de Nissl',a:true}],pts:15},
      {type:'fill',s:'La disolucion de los cuerpos de Nissl tras lesion axonal se llama ___, una respuesta regenerativa.',words:['cromatrolisis','mitofagia','necrosis'],cor:'cromatrolisis',pts:20},
    ],
  },
  mito_n:{
    easy:[
      {type:'quiz',q:'¿Por qué las mitocondrias deben moverse desde el soma hasta el terminal sináptico?',opts:['La neurona fabrica sus mitocondrias en el soma y las transporta donde más energía se necesita','Porque las mitocondrias de la sinapsis son diferentes a las del soma','Para reproducirse en el extremo del axón','Porque el soma no puede retenerlas y las expulsa'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las mitocondrias de las neuronas se mueven por el axón',a:true},{t:'El terminal sináptico necesita energía de las mitocondrias para liberar neurotransmisores',a:true},{t:'Las mitocondrias neurales son inmóviles una vez posicionadas',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué motor molecular transporta las mitocondrias hacia el terminal sináptico?',opts:['Quinesina (transporte anterógrado: soma → terminal)','Dineína (transporte hacia el soma)','Miosina V en microtúbulos axonales','Actina polimerizada que empuja las mitocondrias'],ans:0,pts:20},
      {type:'sequence',items:['Mitocondria sintetizada en el soma','Unión a motor de quinesina vía proteína Miro/Trak','Transporte anterógrado por microtúbulos axonales','Acumulación en terminal sináptico','Provisión de ATP para la exocitosis de neurotransmisores'],pts:25},
    ],
    hard:[
      {type:'quiz',q:'¿Qué proteínas del complejo Miro-Trak regulan la parada de mitocondrias en zonas de alta demanda de Ca²⁺?',opts:['Ca²⁺ se une a Miro1 → desacopla quinesina → mitocondria se detiene donde hay actividad sináptica','La fosforilación de Drp1 por CaMKII para la fusión mitocondrial','Ca²⁺ activa la dineína para retener mitocondrias en los nodos de Ranvier','La calcineurina desfosforila Trak2 permitiendo su unión a microtúbulos'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las mitocondrias son transportadas bidireccionalmente en el axón',a:true},{t:'La disfunción del transporte mitocondrial axonal es un mecanismo de SLA y Parkinson',a:true},{t:'Las mitocondrias del nodo de Ranvier derivan del soma sin síntesis local',a:true}],pts:15},
      {type:'fill',s:'La disfuncion mitocondrial axonal se asocia a enfermedades como ___ y Parkinson por la alta demanda energetica del axon.',words:['SLA','esclerosis multiple','meningitis bacteriana'],cor:'SLA',pts:20},
    ],
  },
  axon:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función principal del axón de una neurona?',opts:['Llevar el impulso nervioso desde el soma hasta el siguiente destino','Recibir señales de otras neuronas','Producir energía para la neurona','Almacenar los neurotransmisores'],ans:0,pts:15},
      {type:'fill',s:'El axón puede medir hasta ___ metro de longitud en las neuronas motoras del ser humano.',words:['1','0.01','100'],cor:'1',pts:12},
      {type:'trueFalse',items:[{t:'El axón conduce el impulso nervioso',a:true},{t:'Una neurona puede tener varios axones',a:false},{t:'El axón puede medir más de un metro en neuronas motoras',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la diferencia entre conducción saltatoria y conducción continua en axones?',opts:['Mielinizado: el impulso salta entre nodos de Ranvier (más rápido). Amielínico: va continuo por toda la membrana','Saltatoria es más lenta porque el impulso "descansa" entre nodos','La conducción continua solo ocurre en el sistema nervioso central','Son términos equivalentes para el mismo proceso'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los axones mielinizados conducen el impulso más rápido que los amielínicos',a:true},{t:'Los nodos de Ranvier carecen de mielina pero tienen alta densidad de canales Na⁺',a:true},{t:'El axón conduce señales en ambas direcciones con igual velocidad',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué determina la velocidad de conducción de un axón?',opts:['Velocidad ∝ raíz del diámetro (amielínico) o ∝ diámetro (mielinizado): mayor diámetro → mayor velocidad','Velocidad ∝ 1/diámetro: axones finos conducen más rápido','El diámetro no afecta la velocidad: solo la longitud del internodo importa','La velocidad es constante independientemente del diámetro'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las fibras Aα (motoras musculares) conducen a 70-120 m/s con diámetro de 13-20 µm',a:true},{t:'Las fibras C (dolor crónico) son amielínicas y conducen a 0.5-2 m/s',a:true},{t:'El transporte axonal de orgánulos usa los microtúbulos y es independiente del potencial de acción',a:true}],pts:15},
      {type:'fill',s:'Tras la seccion de un axon, el segmento distal sufre degeneracion ___, con ruptura de mielina y axon.',words:['walleriana','retrograda','anterograda'],cor:'walleriana',pts:20},
    ],
  },
  myelin:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función de la vaina de mielina que rodea el axón?',opts:['Actúa como aislante eléctrico que acelera la conducción del impulso nervioso','Produce los neurotransmisores','Conecta el axón con el soma','Protege la neurona de las bacterias'],ans:0,pts:15},
      {type:'fill',s:'La esclerosis múltiple se produce cuando el sistema inmune destruye la ___ que cubre los axones.',words:['mielina','membrana','pared'],cor:'mielina',pts:12},
      {type:'trueFalse',items:[{t:'La mielina acelera la conducción nerviosa',a:true},{t:'La mielina es producida por las propias neuronas',a:false},{t:'Perder la mielina causa problemas neurológicos como en la esclerosis múltiple',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué células producen la mielina en el SNC y el SNP?',opts:['SNC: oligodendrocitos. SNP: células de Schwann','SNC: astrocitos. SNP: células satélite','Ambos: microglia en SNC y SNP','SNC: neuronas. SNP: células de Schwann'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Un oligodendrocito puede mielinizar hasta 50 axones diferentes',a:true},{t:'Una célula de Schwann mieliniza un único segmento de un solo axón',a:true},{t:'La esclerosis múltiple afecta la mielina del sistema nervioso periférico',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué proteína de la mielina es la principal diana autoinmune en la esclerosis múltiple?',opts:['MOG (myelin oligodendrocyte glycoprotein) y MBP (myelin basic protein)','PLP (proteolipid protein), la más abundante de la mielina del SNC','MAG (myelin-associated glycoprotein) en los nodos de Ranvier','Neurofascina-186 en el axón en el nodo de Ranvier'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'MBP representa el 30% de la proteína de la mielina del SNC y compacta las capas de membrana',a:true},{t:'La EM tipo recurrente-remitente se trata con interferón-β que modula la respuesta inmune',a:true},{t:'La desmielinización en EM siempre es seguida de remielinización completa',a:false}],pts:15},
      {type:'fill',s:'En el SNC, la vaina de mielina es producida por celulas gliales llamadas ___.',words:['oligodendrocitos','astrocitos','celulas de Schwann'],cor:'oligodendrocitos',pts:20},
    ],
  },
  dendrite:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función principal de las dendritas?',opts:['Recibir señales de otras neuronas y conducirlas hacia el soma','Enviar el impulso nervioso hacia la siguiente neurona','Producir los neurotransmisores','Almacenar la energía de la neurona'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las dendritas reciben señales de otras neuronas',a:true},{t:'Una neurona tiene un solo dendrita como tiene un solo axón',a:false},{t:'Las espinas dendríticas son el lugar donde se forman las sinapsis',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué son las espinas dendríticas y cuál es su relevancia para la memoria?',opts:['Pequeñas protuberancias donde se forman sinapsis excitatorias; cambian de morfología en el aprendizaje','Son estructuras defensivas que protegen la dendrita','Contienen los cuerpos de Nissl para síntesis proteica local','Son los lugares donde se fabrica la mielina dendrítica'],ans:0,pts:20},
      {type:'fill',s:'Las espinas dendríticas cambian de forma durante el aprendizaje, proceso llamado ___ sináptica.',words:['plasticidad','elasticidad','rigidez'],cor:'plasticidad',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el mecanismo molecular de la potenciación a largo plazo (LTP) en espinas dendríticas?',opts:['Activación de NMDAR → entrada de Ca²⁺ → CaMKII → fosforilación e inserción de AMPAR en la membrana','Solo cambios en la síntesis de AMPAR sin modificación de los existentes','Fosforilación de NMDAR por PKA que aumenta su conductancia','Reducción de la inhibición GABAérgica que permite mayor activación'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La LTP requiere la activación del receptor NMDA como detector de coincidencia',a:true},{t:'CaMKII autofosforilada en T286 mantiene la actividad independientemente del Ca²⁺',a:true},{t:'La LTD (depresión a largo plazo) se produce por breves estímulos de alta frecuencia',a:false}],pts:15},
      {type:'fill',s:'Los pequenos salientes de las dendritas donde se forman sinapsis excitatorias se llaman ___ dendriticas.',words:['espinas','varicosidades','cilios'],cor:'espinas',pts:20},
    ],
  },
  synapse:{
    easy:[
      {type:'quiz',q:'¿Qué hace el terminal sináptico cuando llega el impulso nervioso?',opts:['Libera sustancias químicas (neurotransmisores) al espacio entre neuronas','Genera otro impulso eléctrico que salta directamente a la neurona siguiente','Produce más mielina para el axón','Almacena el impulso para el siguiente estímulo'],ans:0,pts:15},
      {type:'fill',s:'Los neurotransmisores se liberan desde el terminal sináptico hacia la ___.',words:['sinapsis','membrana','mielina'],cor:'sinapsis',pts:12},
      {type:'trueFalse',items:[{t:'Los neurotransmisores se liberan por exocitosis en el terminal sináptico',a:true},{t:'La sinapsis química es más rápida que la eléctrica',a:false},{t:'El calcio es necesario para liberar los neurotransmisores',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es el papel del calcio en la exocitosis sináptica?',opts:['Ca²⁺ entra al terminal → activa la proteína sinaptotagmina → fusión de vesículas con la membrana','Ca²⁺ bloquea los canales K⁺ para mantener la despolarización','Ca²⁺ activa la bomba Na⁺/K⁺ ATPasa para recargar el potencial','Ca²⁺ polimeriza la actina que empuja las vesículas hacia la membrana'],ans:0,pts:20},
      {type:'sequence',items:['Potencial de acción llega al terminal','Apertura de canales Ca²⁺ voltaje-dependientes','Ca²⁺ activa sinaptotagmina','Proteínas SNARE fusionan vesícula con membrana','Exocitosis: neurotransmisor al espacio sináptico'],pts:25},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el mecanismo de la toxina botulínica sobre la sinapsis?',opts:['Proteasa zinc-dependiente que cleava proteínas SNARE (SNAP-25, VAMP, sintaxina) → no hay exocitosis','Bloquea los canales Ca²⁺ del terminal presináptico irreversiblemente','Compete con acetilcolina por el receptor nicotínico postsináptico','Inhibe la recaptación del neurotransmisor en el terminal'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'VAMP/sinaptobrevina es la proteína v-SNARE de la vesícula sináptica',a:true},{t:'La toxina tetánica bloquea la liberación de GABA y glicina (inhibitorios) → convulsiones',a:true},{t:'El reciclaje de vesículas sinápticas ocurre por endocitosis mediada por clatrina',a:true}],pts:15},
      {type:'fill',s:'La exocitosis de vesiculas sinapticas es desencadenada por el ingreso de iones ___ al terminal presinaptico.',words:['Ca2+','Na+','K+'],cor:'Ca2+',pts:20},
    ],
  },
  axon_hillock:{
    easy:[
      {type:'quiz',q:'¿Qué es el cono axónico y por qué es tan importante?',opts:['Es la zona donde la neurona decide si generar o no un impulso nervioso','Es el lugar donde la neurona produce neurotransmisores','Es la unión entre dos neuronas diferentes','Es el extremo del axón donde se libera el neurotransmisor'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El cono axónico es la zona donde se genera el potencial de acción',a:true},{t:'El cono axónico tiene alta densidad de ribosomas para síntesis proteica',a:false},{t:'Si la señal en el cono axónico no supera el umbral, no hay potencial de acción',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué el cono axónico tiene el umbral de excitación más bajo de toda la neurona?',opts:['Alta densidad de canales Nav voltaje-dependientes que se abren fácilmente','Porque está más cerca del soma donde hay más energía','Por la ausencia de mielina que lo hace más permeable','Porque recibe más sinapsis excitatorias que cualquier otra zona'],ans:0,pts:20},
      {type:'fill',s:'El cono axónico integra todas las señales del soma: si superan el ___ (~-55 mV), genera un potencial de acción.',words:['umbral','potencial','gradiente'],cor:'umbral',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué mecanismo de clustering de canales Nav en el cono axónico es esencial para su excitabilidad?',opts:['Anquirina G (AnkG) ancla Nav1.6 y KCNQ2/3 al citoesqueleto del segmento inicial del axón','La mielina concentra los canales Nav en el cono al excluirlos del axón mielinizado','Los canales Nav migran activamente del soma al cono por transporte axonal anterógrado','Los astrocitos liberan factores que concentran Nav en el segmento inicial'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El segmento inicial del axón (AIS) contiene la mayor densidad de Nav1.6 de la neurona',a:true},{t:'Mutaciones en AnkG están asociadas con esquizofrenia y trastorno bipolar',a:true},{t:'El AIS puede cambiar de posición y longitud en respuesta a la actividad neuronal',a:true}],pts:15},
      {type:'fill',s:'La alta densidad de canales ___ en el cono axonico es responsable de la generacion del potencial de accion.',words:['Nav (Na+ voltaje-dependientes)','Kv (K+ voltaje-dependientes)','NMDAR'],cor:'Nav (Na+ voltaje-dependientes)',pts:20},
    ],
  },
  golgi_n:{
    easy:[
      {type:'quiz',q:'¿Qué diferencia tiene el Golgi neuronal respecto al de otras células?',opts:['Tiene extensiones que llegan hasta las dendritas (outposts de Golgi)','Es más pequeño porque las neuronas necesitan menos proteínas','No tiene cara cis ni trans','El Golgi neuronal produce principalmente lípidos para la mielina'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El aparato de Golgi neuronal puede extenderse hacia las dendritas',a:true},{t:'El Golgi neuronal procesa las proteínas que van a las sinapsis',a:true},{t:'La fragmentación del Golgi neuronal es señal de buena salud celular',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es el papel de los "outposts de Golgi" en las dendritas neuronales?',opts:['Procesan proteínas localmente en las dendritas sin necesitar envío desde el soma','Solo almacenan proteínas ya procesadas desde el soma','Son artefactos sin función biológica real','Solo aparecen durante el desarrollo embrionario'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Los outposts de Golgi dendríticos procesan receptores de neurotransmisores localmente',a:true},{t:'La fragmentación del Golgi neuronal es marcador temprano de apoptosis',a:true},{t:'El Golgi neuronal es idéntico al de las células epiteliales en organización',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué evidencia apoya la síntesis local de proteínas en dendritas?',opts:['Presencia de ribosomas, ARNm específicos y miniorgánulos de Golgi en espinas dendríticas','Solo el hallazgo de proteínas en dendritas sin mecanismo de síntesis local','La incapacidad de los ARNm para salir del soma','Solo datos teóricos sin evidencia experimental directa'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'ARNm de subunidades de AMPAR pueden encontrarse en dendritas y traducirse localmente',a:true},{t:'La proteína CPEB regula la traducción local de ARNm en dendritas durante la LTP',a:true},{t:'Los outposts de Golgi son estructuras permanentes que no cambian con la actividad sináptica',a:false}],pts:15},
      {type:'fill',s:'Las extensiones del Golgi neuronal en las dendritas que procesan proteinas localmente se llaman ___ de Golgi.',words:['satelites (outposts)','cis-ramas','trans-extensiones'],cor:'satelites (outposts)',pts:20},
    ],
  },
  er_n:{
    easy:[
      {type:'quiz',q:'¿Qué función especial cumple el RE liso en las dendritas durante la señalización?',opts:['Almacena calcio y lo libera como señal cuando llega un impulso sináptico','Solo produce lípidos para las membranas','Almacena glucosa para dar energía a la sinapsis','Produce neurotransmisores directamente'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El RE neuronal almacena calcio que puede liberarse como señal',a:true},{t:'El RE neuronal solo fabrica proteínas y no tiene otras funciones',a:false},{t:'El calcio del RE puede amplificar las señales sinápticas',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cómo participa el RE liso de las espinas dendríticas en la modulación sináptica?',opts:['Libera Ca²⁺ via receptores InsP3R amplificando la señal del NMDAR','Solo actúa como almacén pasivo de Ca²⁺','Sintetiza localmente los receptores AMPA de la espina','Regula el volumen de la espina dendrítica mediante control osmótico'],ans:0,pts:20},
      {type:'fill',s:'El estrés del retículo endoplasmático neuronal lleva a la acumulación de proteínas mal plegadas como en el ___ de Alzheimer.',words:['amiloide','prión','tau'],cor:'amiloide',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el papel del "spine apparatus" en la espina dendrítica?',opts:['Subcompartimento de REL con altas concentraciones de InsP3R2 para señalización Ca²⁺ local','Es simplemente el citoesqueleto que da forma a la espina','Es el sitio donde se sintetizan proteínas sinápticas localmente','Es la región donde se ensamblan los receptores NMDA antes de ir a la membrana'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El spine apparatus está presente solo en espinas mushroom (maduras) de gran tamaño',a:true},{t:'La sinapopodina (synaptopodin) es esencial para la formación del spine apparatus',a:true},{t:'El spine apparatus es independiente del RE soma y forma un compartimento completamente autónomo',a:false}],pts:15},
      {type:'fill',s:'La acumulacion de proteinas mal plegadas en el RE neuronal activa la respuesta ___ (UPR).',words:['al estres del RE','inmune adaptativa','apoptotica directa'],cor:'al estres del RE',pts:20},
    ],
  },
  // ── RBC ──
  rbc_membrane:{
    easy:[
      {type:'quiz',q:'¿Qué hace tan especial la membrana del glóbulo rojo?',opts:['Es extremadamente flexible: puede deformarse para pasar por capilares muy finos','Es la más gruesa de todas las células del cuerpo','Produce energía para transportar el oxígeno','Tiene la capacidad de dividirse para crear más glóbulos rojos'],ans:0,pts:15},
      {type:'fill',s:'El glóbulo rojo vive aproximadamente ___ días en circulación antes de ser destruido.',words:['120','7','365'],cor:'120',pts:12},
      {type:'trueFalse',items:[{t:'El glóbulo rojo puede deformarse para pasar por capilares estrechos',a:true},{t:'El glóbulo rojo tiene núcleo',a:false},{t:'El glóbulo rojo vive aproximadamente 120 días',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué determina los grupos sanguíneos ABO en la membrana del glóbulo rojo?',opts:['Antígenos glucídicos en la superficie de la membrana (A, B, H)','Proteínas integrales diferentes en cada grupo','El tipo de hemoglobina que contiene cada individuo','La concentración de espectrina en el citoesqueleto'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'El glóbulo rojo maduro no tiene núcleo ni mitocondrias',a:true},{t:'Los antígenos de grupo sanguíneo están en proteínas lipopolisacáridas',a:false},{t:'La membrana eritrocítica tiene asimetría lipídica: fosfatidilserina en la cara interna',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Qué mecanismo reconoce los glóbulos rojos senescentes para su fagocitosis en el bazo?',opts:['Exposición de fosfatidilserina al exterior + oxidación de banda 3 → señal fagocítica','Solo el volumen celular determina la senescencia','La hemoglobina oxidada (metHb) difunde al exterior y activa macrófagos','El acortamiento de los telómeros indica la senescencia eritrocítica'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La fosfatidilserina normalmente interna se expone en eritrocitos senescentes como señal eat-me',a:true},{t:'Las flippasas de la membrana eritrocítica mantienen la asimetría lipídica a expensas de ATP',a:true},{t:'Los eritrocitos con drepanocitosis se adhieren a células endoteliales via VLA-4 y CD36',a:true}],pts:15},
      {type:'fill',s:'Los grupos sanguineos ABO dependen de ___ en la superficie del eritrocito que actuan como antigenos.',words:['oligosacaridos','proteinas de espectrina','fosfolipidos'],cor:'oligosacaridos',pts:20},
    ],
  },
  hemoglobin:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función de la hemoglobina?',opts:['Transportar oxígeno desde los pulmones hasta los tejidos','Destruir bacterias en la sangre','Producir energía para los glóbulos rojos','Dar el color rojo a la sangre sin función adicional'],ans:0,pts:15},
      {type:'fill',s:'La hemoglobina contiene hierro en su grupo ___, que es el que se une al oxígeno.',words:['hemo','amino','fosfo'],cor:'hemo',pts:12},
      {type:'trueFalse',items:[{t:'La hemoglobina contiene hierro que se une al oxígeno',a:true},{t:'La hemoglobina fetal (HbF) es igual a la del adulto (HbA)',a:false},{t:'La drepanocitosis ocurre cuando la hemoglobina tiene una mutación',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué es el efecto Bohr y por qué es fisiológicamente importante?',opts:['El CO₂ y el H⁺ reducen la afinidad de la hemoglobina por O₂ → mejor descarga en tejidos activos','La presión aumenta la afinidad de la Hb por O₂ en pulmones','La temperatura reduce la carga de O₂ en pulmones','El CO₂ compite directamente con el O₂ por el grupo hemo'],ans:0,pts:20},
      {type:'fill',s:'La curva de disociación de la hemoglobina es ___, lo que permite la descarga eficiente de O₂ en tejidos.',words:['sigmoide','lineal','exponencial'],cor:'sigmoide',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es la base molecular de la cooperatividad en la unión de O₂ a la hemoglobina?',opts:['Cambio alostérico T→R: la unión del 1er O₂ cambia la conformación favoreciendo los siguientes','La hemoglobina une O₂ de manera independiente en las 4 subunidades','El 2,3-DPG directamente facilita la unión del primer O₂','La cooperatividad es solo cinética, sin cambio conformacional'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El 2,3-bisfosfoglicerato (2,3-BPG) estabiliza la forma T desoxigenada → desplaza la curva a la derecha',a:true},{t:'HbF tiene menor afinidad por 2,3-BPG que HbA, por lo que tiene mayor afinidad por O₂',a:true},{t:'La metahemoglobina (Fe³⁺) puede transportar O₂ con igual eficiencia que la HbA',a:false}],pts:15},
      {type:'fill',s:'El efecto Bohr describe como el CO2 y los H+ ___ la afinidad de la hemoglobina por el O2 en los tejidos.',words:['reducen','aumentan','no afectan'],cor:'reducen',pts:20},
    ],
  },
  spectrin:{
    easy:[
      {type:'quiz',q:'¿Qué hace la red de espectrina en el glóbulo rojo?',opts:['Da elasticidad para que el glóbulo rojo pueda deformarse y recuperar su forma','Produce hemoglobina','Protege al glóbulo rojo de las bacterias','Lleva el oxígeno junto con la hemoglobina'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La espectrina da elasticidad al glóbulo rojo',a:true},{t:'La espectrina está dentro del glóbulo rojo pegada a la membrana',a:true},{t:'Sin espectrina, el glóbulo rojo mantiene su forma normal',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la enfermedad causada por defecto en la espectrina eritrocítica?',opts:['Esferocitosis hereditaria: glóbulos rojos esféricos y frágiles que se destruyen prematuramente','Talasemia: déficit de síntesis de cadenas de globina','Anemia ferropénica: falta de hierro','Policitemia vera: sobreproducción de glóbulos rojos'],ans:0,pts:20},
      {type:'fill',s:'La red de espectrina se organiza en una malla ___ que da forma y resistencia al eritrocito.',words:['hexagonal','triangular','cuadrada'],cor:'hexagonal',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es la estructura molecular del enlace entre espectrina y membrana a través de la anquirina?',opts:['Dímero α/β-espectrina → tetrámero → nodo actina/proteína 4.1 → anquirina → banda 3 transmembrana','La espectrina se une directamente a los fosfolípidos de la cara interna','La proteína 4.2 conecta directamente espectrina a glicoforina sin pasar por anquirina','El colesterol de la membrana ancla la espectrina mediante interacciones hidrofóbicas'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La esferocitosis hereditaria tipo I se debe a defectos en la anquirina (ANK1)',a:true},{t:'La banda 4.1 conecta espectrina al glicoforina C y a la actina en los nodos de la red',a:true},{t:'La red de espectrina se depolimeriza completamente durante el paso por capilares',a:false}],pts:15},
      {type:'fill',s:'La deficiencia hereditaria de espectrina produce ___, donde los eritrocitos adquieren forma esferica.',words:['esferocitosis hereditaria','drepanocitosis','talasemia'],cor:'esferocitosis hereditaria',pts:20},
    ],
  },
  band3:{
    easy:[
      {type:'quiz',q:'¿Qué transporta la proteína Banda 3 a través de la membrana del glóbulo rojo?',opts:['Bicarbonato (HCO₃⁻) a cambio de cloruro (Cl⁻): vital para transportar el CO₂','Solo oxígeno junto con la hemoglobina','Glucosa para dar energía al glóbulo rojo','Agua para mantener la hidratación celular'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La banda 3 intercambia bicarbonato por cloruro en el glóbulo rojo',a:true},{t:'Este intercambio ayuda a transportar el CO₂ de los tejidos a los pulmones',a:true},{t:'La banda 3 es la proteína menos abundante de la membrana eritrocítica',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuántas veces cruza la membrana la proteína Banda 3?',opts:['14 veces (14 segmentos transmembrana que forman el canal de transporte)','1 vez (proteína transmembrana simple)','4 veces (como las porinas bacterianas)','No cruza: es una proteína periférica'],ans:0,pts:20},
      {type:'fill',s:'La banda 3 permite que el CO₂ viaje en la sangre en forma de ___, mucho más soluble en plasma.',words:['bicarbonato','hemoglobina','oxígeno'],cor:'bicarbonato',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cómo utiliza Plasmodium falciparum la proteína Banda 3 para invadir el eritrocito?',opts:['La proteína EBA-175 se une a glicoforina A anclada a banda 3; banda 3 se requiere para la vacuola parasitófora','Plasmodium degrada banda 3 con proteasas antes de la invasión','Banda 3 actúa como receptor directo de la proteína MSP1 del merozoíto','El parásito compite con el bicarbonato por el sitio de transporte de banda 3'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La oxidación de banda 3 en eritrocitos senescentes forma el antígeno reconocido por autoanticuerpos',a:true},{t:'Banda 3 forma microdominios con glicoforinas y anquirina como plataforma de señalización',a:true},{t:'Los eritrocitos de drepanocitosis tienen banda 3 con mayor afinidad por la HbS polimerizada',a:true}],pts:15},
      {type:'fill',s:'La proteina Banda 3 intercambia ___ por HCO3- a traves de la membrana eritrocitica.',words:['Cl-','Na+','K+'],cor:'Cl-',pts:20},
    ],
  },
  band3b:{
    easy:[
      {type:'fill',s:'La proteína Banda 3 es la más ___ de la membrana del glóbulo rojo, con millones de copias.',words:['abundante','pequeña','nueva'],cor:'abundante',pts:12},
      {type:'trueFalse',items:[{t:'Existen millones de copias de la proteína banda 3 en cada glóbulo rojo',a:true},{t:'Las dos copias de Banda 3 realizan exactamente la misma función',a:true},{t:'La Banda 3 solo funciona cuando hay oxígeno disponible',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué ocurre con la banda 3 cuando se une a la hemoglobina desoxigenada?',opts:['El dominio citosólico de banda 3 une desoxiHb → inhibición del transporte aniónico','La unión de desoxiHb activa el transporte aniónico multiplicándolo','La desoxiHb promueve la oligomerización de banda 3 en la membrana','No hay interacción conocida entre la desoxiHb y la banda 3'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'La hemoglobina desoxigenada tiene mayor afinidad por banda 3 que la oxigenada',a:true},{t:'La unión de desoxiHb a banda 3 puede regular metabólicamente el eritrocito',a:true},{t:'Banda 3 actúa como ancla para el citoesqueleto de espectrina a través de la anquirina',a:true}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el significado funcional del complejo metabólico de banda 3 con enzimas glicolíticas?',opts:['En desoxigenación, las enzimas glicolíticas (GAPDH, aldolasa) se disocian de banda 3 → mayor glucólisis → más ATP','Las enzimas glicolíticas usan banda 3 como sustrato para producir HCO₃⁻','El complejo favorece la vía de las pentosas fosfato sobre la glucólisis','Las enzimas glicolíticas inhiben el transporte de banda 3 en capilares pulmonares'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La GAPDH se une al dominio citoplasmático N-terminal de banda 3 inhibiendo su actividad glicolítica',a:true},{t:'La hipoxia regula metabólicamente el eritrocito a través del complejo banda 3-enzimas glicolíticas',a:true},{t:'Este mecanismo acopla el transporte de O₂/CO₂ con la producción de ATP en el eritrocito',a:true}],pts:15},
      {type:'fill',s:'La proteina adaptadora ___ conecta la Banda 3 con la red de espectrina del citoesqueleto eritrocitico.',words:['anquirina','actina','proteina 4.1'],cor:'anquirina',pts:20},
    ],
  },
  glycophorin:{
    easy:[
      {type:'quiz',q:'¿Para qué sirve la glicoforina A en la membrana del glóbulo rojo?',opts:['Su carga negativa (ácido siálico) evita que los glóbulos rojos se peguen entre sí','Transporta el oxígeno junto con la hemoglobina','Produce el color rojo de los glóbulos','Es la proteína que destruye bacterias en la sangre'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La glicoforina tiene mucha carga negativa que evita la agregación de glóbulos rojos',a:true},{t:'La glicoforina solo se encuentra en glóbulos rojos enfermos',a:false},{t:'El parásito de la malaria usa la glicoforina para entrar al glóbulo rojo',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuáles son los antígenos de grupo sanguíneo que porta la glicoforina A?',opts:['Antígenos M y N del sistema MNS (determinados por aminoácidos en las posiciones 1 y 5)','Antígenos A, B y H del sistema ABO','Antígenos Rh (D, C, E) del sistema Rhesus','Antígenos del sistema Kell y Kidd'],ans:0,pts:20},
      {type:'fill',s:'El ácido siálico de la glicoforina genera el ___ zeta negativo que evita la agregación de eritrocitos.',words:['potencial','gradiente','campo'],cor:'potencial',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cómo utiliza Plasmodium falciparum la glicoforina A para la invasión del eritrocito?',opts:['EBA-175 (Erythrocyte-binding antigen 175) se une al dominio extracelular sialilado de glicoforina A','Plasmodium expresa una neuraminidasa que elimina el ácido siálico facilitando la adhesión','La proteína MSP3 mimetiza la glicoforina A para evadir el sistema inmune','Plasmodium inserta su propia proteína en el lugar de la glicoforina A'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Los eritrocitos con el fenotipo En(a-) carecen de glicoforina A y son resistentes a P. falciparum',a:true},{t:'La glicoforina A puede servir como receptor de entrada para el parvovirus B19',a:true},{t:'La interacción EBA-175/Glicoforina A es el único mecanismo de invasión de Plasmodium',a:false}],pts:15},
      {type:'fill',s:'La glicoforina A porta los antigenos del sistema de grupos sanguineos ___.',words:['MN','ABO','Rh'],cor:'MN',pts:20},
    ],
  },
  glycophorin2:{
    easy:[
      {type:'fill',s:'Los glóbulos rojos con deficiencia de glicoforina C tienen forma ___ (elíptica) en vez de disco.',words:['eliptoide','esférica','cóncava'],cor:'eliptoide',pts:12},
      {type:'trueFalse',items:[{t:'La glicoforina C conecta la membrana con el citoesqueleto interno',a:true},{t:'La glicoforina C es igual en estructura a la glicoforina A',a:false},{t:'Sin glicoforina C, el glóbulo rojo pierde su forma normal',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la diferencia funcional entre glicoforina A y glicoforina C?',opts:['GfA: antígenos MN + estabilidad superficial. GfC: ancla el citoesqueleto de espectrina','Son funcionalmente equivalentes con diferente localización','GfA transporta O₂; GfC transporta CO₂','Solo difieren en la cantidad de ácido siálico, no en función'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'La glicoforina C se une a la proteína 4.1 que conecta con la espectrina',a:true},{t:'Eritrocitos con deficiencia de GfC (fenotipo Gerbich negativo) son resistentes a Plasmodium vivax',a:true},{t:'La glicoforina C tiene la misma cantidad de ácido siálico que la glicoforina A',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el mecanismo por el que Plasmodium vivax usa glicoforina C para invadir eritrocitos?',opts:['EBP (erythrocyte binding protein) de P. vivax se une a la región N-terminal de glicoforina C','P. vivax usa el mismo receptor que P. falciparum (glicoforina A)','P. vivax degrada glicoforina C para facilitar su entrada al eritrocito','EBA-140 de P. falciparum también reconoce glicoforina C'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'EBA-140 (BAEBL) de P. falciparum se une a la glicoforina C como mecanismo alternativo de invasión',a:true},{t:'El dominio DBL (Duffy-binding-like) de las proteínas EBA media la unión a glicoforinas',a:true},{t:'La ausencia de glicoforina C protege completamente contra la malaria por P. vivax',a:false}],pts:15},
      {type:'fill',s:'La deficiencia de glicoforina C causa ___ hereditaria leve por desestabilizacion del citoesqueleto.',words:['eliptocitosis','esferocitosis','drepanocitosis'],cor:'eliptocitosis',pts:20},
    ],
  },
  ankyrin:{
    easy:[
      {type:'quiz',q:'¿Qué hace la anquirina en el glóbulo rojo?',opts:['Conecta el citoesqueleto interno (espectrina) con la membrana (banda 3)','Transporta oxígeno junto con la hemoglobina','Produce la energía del glóbulo rojo','Determina el grupo sanguíneo'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La anquirina actúa como proteína de unión entre el citoesqueleto y la membrana',a:true},{t:'Defectos en la anquirina causan esferocitosis hereditaria',a:true},{t:'La anquirina se encuentra en todas las células del cuerpo',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la enfermedad más común causada por defectos en la anquirina eritrocítica?',opts:['Esferocitosis hereditaria tipo I (HS1): anemia hemolítica con glóbulos rojos esféricos y frágiles','Drepanocitosis: glóbulos en hoz por mutación en β-globina','Talasemia α: falta de cadenas α de hemoglobina','Eliptocitosis: glóbulos elípticos por defecto en espectrina'],ans:0,pts:20},
      {type:'fill',s:'La anquirina conecta la β-espectrina del citoesqueleto con la proteína ___ integral de membrana.',words:['banda 3','glicoforina','hemoglobina'],cor:'banda 3',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuáles son los dominios funcionales de la anquirina eritrocítica (ANK1)?',opts:['Dominio ANK-repeat (une banda 3), dominio spectrin-binding, dominio regulador C-terminal','Solo dominio de unión a espectrina y dominio de membrana','Dominio RGD (integrina), dominio de unión a actina y dominio SH2','Dominio PH (pleckstrin homology) y dominio FERM de anclaje'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La ANK1 es codificada por un gen de 41 exones con múltiples isoformas tisulares',a:true},{t:'En neuronas, la AnkG (anquirina G) ancla los canales Nav al segmento inicial del axón',a:true},{t:'La anquirina solo existe en eritrocitos y no tiene función en otros tejidos',a:false}],pts:15},
      {type:'fill',s:'Las mutaciones en anquirina son la causa mas comun de ___ en Europa.',words:['esferocitosis hereditaria','drepanocitosis','talasemia'],cor:'esferocitosis hereditaria',pts:20},
    ],
  },
  carbonic_anh:{
    easy:[
      {type:'quiz',q:'¿Por qué necesitan los glóbulos rojos la anhidrasa carbónica?',opts:['Para convertir el CO₂ producido por los tejidos en bicarbonato y transportarlo a los pulmones','Para producir energía a partir del CO₂','Para destruir el CO₂ tóxico directamente','Para producir O₂ a partir del CO₂'],ans:0,pts:15},
      {type:'fill',s:'La anhidrasa carbónica convierte el CO₂ + H₂O en ___ + H⁺ para transportar el CO₂ en sangre.',words:['bicarbonato','glucosa','ATP'],cor:'bicarbonato',pts:12},
      {type:'trueFalse',items:[{t:'La anhidrasa carbónica transforma CO₂ en bicarbonato en los tejidos',a:true},{t:'En los pulmones, el proceso se invierte para liberar CO₂',a:true},{t:'Sin anhidrasa carbónica, la sangre no podría transportar CO₂',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué la anhidrasa carbónica es esencial para el transporte de CO₂ en sangre?',opts:['Convierte CO₂ en bicarbonato soluble que puede transportarse en plasma','Transporta el CO₂ directamente unido a hierro','Elimina el CO₂ por exocitosis en el pulmón','Convierte CO₂ en O₂ en los capilares pulmonares'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'La anhidrasa carbónica II eritrocítica es la isoforma más activa de las 16 conocidas',a:true},{t:'El zinc del sitio activo de la anhidrasa carbónica es esencial para la catálisis',a:true},{t:'Los inhibidores de la anhidrasa carbónica (acetazolamida) solo actúan en los eritrocitos',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuántas reacciones por segundo puede catalizar la anhidrasa carbónica II?',opts:['1.000.000 reacciones/segundo (10⁶ s⁻¹): una de las enzimas más rápidas','100 reacciones/segundo','10.000 reacciones/segundo','Solo 10 reacciones/segundo'],ans:0,pts:25},
      {type:'quiz',q:'¿Cuál es el mecanismo catalítico de la anhidrasa carbónica II en la hidratación del CO₂?',opts:['Zn²⁺-OH⁻ ataca el CO₂ → HCO₃⁻ se libera → agua rehidrata el Zn²⁺ → mecanismo de zinc-hidroxilo','El CO₂ se une a His64 del sitio activo y se oxida directamente a HCO₃⁻','El Zn²⁺ reduce el CO₂ por adición nucleofílica directa sin intermediarios','Un residuo Lys actúa como base general extrayendo un protón del agua activa'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La transferencia de protones desde el sitio activo al tampón es el paso limitante de la velocidad',a:true},{t:'His64 actúa como puente de protones entre el sitio activo y el solvente en CA-II',a:true},{t:'La acetazolamida es un inhibidor competitivo que ocupa el sitio del CO₂ en el zinc',a:false}],pts:15},
      {type:'fill',s:'La anhidrasa carbonica cataliza CO2 + H2O formando ___ + H+, siendo esencial para el transporte de CO2.',words:['HCO3-','CO3 2-','H2CO3 estable'],cor:'HCO3-',pts:20},
    ],
  },
  biconcave:{
    easy:[
      {type:'quiz',q:'¿Por qué el glóbulo rojo tiene forma de disco aplastado con los lados cóncavos?',opts:['Para tener mayor superficie de intercambio de gases y poder deformarse en capilares','Es simplemente la forma en que nacen sin función específica','Para proteger la hemoglobina de la oxidación','Porque tienen menos agua que otras células'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La forma bicóncava del glóbulo rojo aumenta su superficie sin aumentar su volumen',a:true},{t:'Los glóbulos rojos de las personas con drepanocitosis tienen forma de disco normal',a:false},{t:'El glóbulo rojo maduro no tiene núcleo lo que le permite ser más flexible',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cómo permite la forma bicóncava al glóbulo rojo atravesar capilares de 2-3 µm?',opts:['La forma permite plegarse sobre sí mismo manteniendo la membrana sin tensión excesiva','La membrana se estira irreversiblemente para pasar y luego se recupera','Los capilares se dilatan para dejar pasar el glóbulo sin deformación','El glóbulo rojo pierde agua para reducir su tamaño temporalmente'],ans:0,pts:20},
      {type:'fill',s:'La forma bicóncava da un ___ 20-30% mayor que una esfera del mismo volumen, mejorando el intercambio de gases.',words:['área superficial','peso','volumen'],cor:'área superficial',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué proteínas del citoesqueleto son responsables de mantener la forma bicóncava del eritrocito?',opts:['La red de espectrina-actina-banda 4.1 conectada a la membrana via anquirina-banda 3 y proteína 4.1-glicoforina C','Solo la hemoglobina por su concentración que aplana la célula','Las proteínas de membrana band 3 que crean tensión superficial diferencial','La presión osmótica diferencial entre el citoplasma y el plasma'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La forma bicóncava se mantiene por el balance entre tensión de membrana y la red de espectrina',a:true},{t:'En la esferocitosis hereditaria, la pérdida de lípidos de membrana precede a la esferización',a:true},{t:'Los reticulocitos recién liberados de la médula ya tienen la forma bicóncava definitiva',a:false}],pts:15},
      {type:'fill',s:'El eritrocito maduro carece de ___ y organulos, maximizando el espacio para la hemoglobina.',words:['nucleo','membrana plasmatica','ribosomas'],cor:'nucleo',pts:20},
    ],
  },
  // ── XYLEM ──
  secondary_wall:{
    easy:[
      {type:'quiz',q:'¿Cuál es la sustancia que hace tan dura y resistente la madera?',opts:['La lignina, que endurece la pared celular secundaria','La celulosa, que forma las fibras de la madera','El almidón, la reserva de energía del árbol','La clorofila, que le da color a la madera'],ans:0,pts:15},
      {type:'fill',s:'La pared secundaria del xilema está endurecida con ___, una sustancia que hace la madera impermeable.',words:['lignina','celulosa','quitina'],cor:'lignina',pts:12},
      {type:'trueFalse',items:[{t:'La lignina hace la pared del xilema impermeable y muy resistente',a:true},{t:'La lignificación es reversible: la célula puede eliminar la lignina',a:false},{t:'La madera está compuesta principalmente de células muertas del xilema',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué la célula del xilema muere cuando completa su pared secundaria?',opts:['La lignificación impermeabiliza y mata la célula, dejando un canal hueco para conducir agua','La célula se suicida para liberar los nutrientes del árbol','La pared secundaria bloquea el acceso al ADN e impide la función','La lignina oxida las proteínas de la célula causando su muerte'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'La célula del xilema muere al terminar la lignificación de su pared',a:true},{t:'La pared secundaria tiene 3 capas (S1, S2, S3) con diferente orientación de celulosa',a:true},{t:'La lignina del xilema es el mismo polímero que la celulosa con diferente nombre',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es la ruta biosintética de la lignina y qué enzimas la polimerizan?',opts:['Fenilpropanoides (Phe → ácido cinámico → monolignoles) polimerizados por peroxidasas y lacasas vía radicales libres','Glucosa polimerizada directamente por lignina sintasa en la pared','Acetato → malonato → policétidos condensados en la pared secundaria','Precursores de quitina modificados por metiltransferasas'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Los monolignoles (coniferilo, p-cumarilo, sinapilo) se polimerizan de manera azimétrica → lignina heterogénea',a:true},{t:'Las lacasas (multicopper oxidasas) y peroxidasas catalizan la formación de radicales monolignol',a:true},{t:'Los hongos de podredumbre blanca degradan la lignina con ligninasa y manganeso peroxidasa',a:true}],pts:15},
      {type:'fill',s:'La madera esta compuesta principalmente de ___ de la pared celular secundaria del xilema.',words:['lignina y celulosa','quitina y proteinas','celulosa y pectinas'],cor:'lignina y celulosa',pts:20},
    ],
  },
  primary_wall_x:{
    easy:[
      {type:'quiz',q:'¿De qué está hecha la pared primaria de la célula del xilema?',opts:['Celulosa, hemicelulosa y pectinas: los mismos componentes de otras células vegetales','Solo celulosa pura sin otros componentes','Lignina y quitina mezcladas','Peptidoglicano como en las bacterias'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La pared primaria del xilema es la primera en formarse durante el desarrollo',a:true},{t:'La pared primaria desaparece completamente cuando se forma la secundaria',a:false},{t:'La pared primaria está hecha principalmente de celulosa',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué ocurre con la pared primaria durante la diferenciación del xilema?',opts:['Persiste en las zonas de punteadura; se deposita la pared secundaria sobre el resto','Se degrada completamente para dejar solo la pared secundaria','Se convierte en pared secundaria mediante lignificación directa','Se transforma en la membrana de tílosis'],ans:0,pts:20},
      {type:'fill',s:'Las microfibrillas de celulosa de la pared primaria se orientan al ___, permitiendo el crecimiento de la célula en todas las direcciones.',words:['azar','norte','eje longitudinal'],cor:'azar',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué enzimas relajan la pared primaria durante el crecimiento xilematoso?',opts:['Expansinas: rompen puentes de H entre celulosa y xiloglucano sin actividad hidrolítica → creep ácido','Celulasas: degradan la celulosa durante la expansión reversiblemente','Pectato liasas: degradan pectinas para reducir la rigidez de la pared','Xiloglucanasas: cortan el xiloglucano para desvincular microfibrillas de celulosa'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las expansinas promueven el creep ácido de la pared: pH bajo activa expansinas que relajan la pared',a:true},{t:'La auxina promueve la expansión celular activando la ATPasa de protones que acidifica la pared',a:true},{t:'La pared primaria de traqueidas de coníferas es más gruesa que la de vasos de angiospermas',a:false}],pts:15},
      {type:'fill',s:'La pared primaria del xilema persiste en las zonas de ___, permitiendo el flujo de agua entre vasos.',words:['punteaduras','bandas espirales','tilosis'],cor:'punteaduras',pts:20},
    ],
  },
  pit_membrane:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función de la membrana de punteadura en el xilema?',opts:['Permite que el agua pase entre células del xilema mientras filtra burbujas y patógenos','Produce la celulosa de la pared','Controla la entrada de luz al xilema','Es solo un separador mecánico sin función de filtro'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La membrana de punteadura permite el flujo de agua entre células del xilema',a:true},{t:'La membrana de punteadura puede bloquear el paso de burbujas de aire (cavitación)',a:true},{t:'La membrana de punteadura está hecha de lignina como la pared secundaria',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué es la cavitación xilémica y cómo la previene la membrana de punteadura?',opts:['La cavitación es la formación de burbujas en el xilema. La membrana actúa como barrera para que no se propaguen','La cavitación es el depósito de sales que obstruyen el xilema','La cavitación es la apertura excesiva de punteaduras que se previene con toro','La cavitación es la entrada de hongos que la membrana impide'],ans:0,pts:20},
      {type:'fill',s:'La resistencia de la membrana de punteadura a la ___ determina la eficiencia hidráulica del árbol.',words:['cavitación','fotosíntesis','respiración'],cor:'cavitación',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es la relación entre el diámetro de poros de la membrana y la resistencia a la cavitación?',opts:['Presión ∝ 4γcos(θ)/r: menor diámetro de poro → mayor presión necesaria para propagar la burbuja','Mayor diámetro de poro → mayor resistencia a la cavitación por efecto de tensión superficial','El diámetro de poro no afecta la propagación de la embolia xilémica','Solo el material de la membrana determina la resistencia a la cavitación'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La embolia xilémica se propaga de traqueida en traqueida a través de la membrana de punteadura',a:true},{t:'Las angiospermas con vasos amplios son más vulnerables a la cavitación que las coníferas con traqueidas',a:true},{t:'La membrana de punteadura en angiospermas tiene un toro central diferenciado como en las coníferas',a:false}],pts:15},
      {type:'fill',s:'Segun la teoria cohesion-___, el agua asciende por el xilema gracias a la tension generada por evapotranspiracion.',words:['tension','presion','osmosis'],cor:'tension',pts:20},
    ],
  },
  lumen:{
    easy:[
      {type:'quiz',q:'¿Qué es el lumen del xilema?',opts:['El espacio hueco dentro de los vasos muertos por donde fluye el agua hacia las hojas','Es la pared celular del xilema','Es el lugar donde se produce la fotosíntesis','Es el canal por donde circula el azúcar de las hojas'],ans:0,pts:15},
      {type:'fill',s:'El agua sube por el xilema porque la evapotranspiración de las hojas crea una ___ que jala el agua desde las raíces.',words:['tensión','presión','gravedad'],cor:'tensión',pts:12},
      {type:'trueFalse',items:[{t:'El lumen del xilema es el canal hueco por donde circula el agua',a:true},{t:'El agua sube por el xilema gastando energía metabólica del árbol',a:false},{t:'Las células del lumen están muertas para facilitar el flujo de agua',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la teoría que explica cómo asciende el agua por el xilema de árboles altos?',opts:['Teoría de cohesión-tensión: la evapotranspiración genera tensión negativa que arrastra una columna continua de agua','Teoría de presión radicular: las raíces bombean activamente el agua hacia arriba','Teoría capilar: la capilaridad es suficiente para árboles de hasta 100 m','Teoría osmótica: la alta concentración de sales en las hojas absorbe el agua'],ans:0,pts:20},
      {type:'fill',s:'La presión en el xilema de un árbol bajo estrés hídrico puede llegar a ___ MPa (presión negativa).',words:['-5','+10','-0.1'],cor:'-5',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el límite teórico de altura de un árbol basado en la teoría de cohesión-tensión?',opts:['~130 m (presión de -13 MPa = límite de cavitación del agua); el árbol más alto mide ~116 m','~50 m, limitado por la presión osmótica de las raíces','~200 m, sin límite práctico si la cohesión del agua es suficiente','~30 m, determinado por la resistencia gravitacional solamente'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El agua puede soportar tensiones de hasta -30 MPa en tubos capilares puros antes de cavitar',a:true},{t:'La teoría de cohesión-tensión fue propuesta por Böhm, Askenasy y Dixon/Joly a finales del siglo XIX',a:true},{t:'Los vasos del xilema secundario son más eficientes que las traqueidas para transportar agua',a:true}],pts:15},
      {type:'fill',s:'La ___ xilem atica fluye bajo presion negativa a traves del lumen de los vasos conductores muertos.',words:['savia','linfa','solucion apoplastica'],cor:'savia',pts:20},
    ],
  },
  bordered_pit:{
    easy:[
      {type:'quiz',q:'¿Para qué sirven las punteaduras areoladas del xilema?',opts:['Son válvulas que controlan el paso del agua y pueden sellarse ante una embolia','Son los poros por donde la célula absorbe nutrientes del suelo','Son los sitios donde se produce la fotosíntesis en el xilema','Son las conexiones entre el xilema y el floema'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las punteaduras areoladas actúan como válvulas en el xilema',a:true},{t:'Las punteaduras areoladas son exclusivas de las angiospermas',a:false},{t:'Si hay una burbuja en el xilema, la punteadura se sella para que no se propague',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Qué son el toro y el márgum de una punteadura areolada?',opts:['Toro: parte central rígida de celulosa. Márgum: parte flexible que controla el flujo según la presión','Toro: la cámara exterior. Márgum: la membrana de punteadura','Toro: el canal de agua. Márgum: la pared secundaria alrededor','Toro: el tapón de Woronin. Márgum: la proteína HEX-1'],ans:0,pts:20},
      {type:'fill',s:'El ___ puede desplazarse hacia un lado y sellar la punteadura cuando hay embolia en el xilema.',words:['toro','márgum','lumen'],cor:'toro',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Por qué las punteaduras areoladas de coníferas tienen toro pero las de angiospermas no?',opts:['En coníferas el transporte es por traqueidas: el toro es una adaptación para bloquear embolias sin perder conductividad. Las angiospermas tienen vasos y pueden aislar la pérdida más fácilmente','Las angiospermas tienen toro pero es microscópico e indetectable','Las angiospermas tienen mayor presión de turgor que impide la necesidad de toro','El toro es una estructura ancestral que las angiospermas perdieron evolutivamente sin consecuencias'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'El aspirado del toro (torus aspiration) es irreversible y reduce permanentemente la conductividad',a:true},{t:'Las coníferas pueden sobrevivir con hasta el 50% de sus punteaduras aspiradas sin marchitarse',a:true},{t:'La presión de aspiración del toro es mayor en maderas más resistentes a la sequía',a:true}],pts:15},
      {type:'fill',s:'En las punteaduras areoladas de gimnospermas, el ___ central puede sellar el poro previniendo embolias.',words:['toro','margum','lumen'],cor:'toro',pts:20},
    ],
  },
  bordered_pit2:{
    easy:[
      {type:'fill',s:'Una traqueida de pino puede tener hasta ___ punteaduras areoladas en sus paredes.',words:['300','5','3000'],cor:'300',pts:12},
      {type:'trueFalse',items:[{t:'Las punteaduras areoladas aparecen en pares entre células adyacentes del xilema',a:true},{t:'Tener más punteaduras siempre aumenta la conductividad del xilema',a:false},{t:'Las punteaduras son los puntos de menor resistencia hidráulica en el xilema',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la relación entre el número de punteaduras y la resistencia hidráulica del xilema?',opts:['Más punteaduras → menor resistencia hidráulica, pero mayor riesgo de propagación de embolias','Más punteaduras → siempre mayor resistencia hidráulica por el efecto barrera','El número no importa: solo el diámetro del lumen determina la conductividad','Cada punteadura agrega resistencia independientemente de la conductividad del lumen'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'El compromiso entre conductividad y seguridad es la base de la "hydraulic safety-efficiency tradeoff"',a:true},{t:'Coníferas de climas áridos tienen menos punteaduras y lúmenes más pequeños que las de climas húmedos',a:true},{t:'Todas las punteaduras areoladas de un árbol tienen la misma probabilidad de aspirarse',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuáles son los mecanismos de la degradación de punteaduras por hongos Ophiostoma en el azulado de la madera?',opts:['Producción de celulasas y xilanasas que degradan la membrana de punteadura → pérdida de conductividad','Solo degradación de lignina por lacasas específicas del hongo','Bloqueo mecánico de punteaduras por hifas sin degradación enzimática','Producción de ácido oxálico que disuelve los carbonatos de la membrana'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Los hongos de azulado de la madera colonizan el xilema a través de las punteaduras naturales',a:true},{t:'El azulado de la madera no afecta la resistencia mecánica pero sí reduce la conductividad hidráulica',a:true},{t:'Los fungicidas azoles inhiben la síntesis de ergosterol del hongo previniendo el azulado',a:true}],pts:15},
      {type:'fill',s:'Las punteaduras areoladas funcionan en pares para garantizar ___ hidraulica cuando una de ellas se sella.',words:['redundancia','conductividad','elasticidad'],cor:'redundancia',pts:20},
    ],
  },
  spiral_band:{
    easy:[
      {type:'quiz',q:'¿Por qué algunos vasos del xilema tienen engrosamiento en espiral?',opts:['Porque el xilema joven necesita ser flexible mientras el órgano todavía crece y se estira','Porque la espiral produce el color oscuro de la madera','Porque la espiral ayuda a la célula a dividirse','Porque la forma helicoidal aumenta la velocidad del agua'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las bandas espirales de lignina permiten que el vaso se estire mientras crece el tallo',a:true},{t:'El xilema maduro también tiene vasos en espiral como el joven',a:false},{t:'Las bandas espirales son las primeras estructuras que se forman en el xilema',a:true}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuáles son los tipos de engrosamiento de la pared interna del xilema según su madurez?',opts:['Anular → helicoidal → escalariforme → reticulado → punteado (del más joven al más maduro)','Solo helicoidal en el protoxilema y solo punteado en el metaxilema','Punteado primero y luego helicoidal al envejecer el xilema','Todos los tipos se forman al mismo tiempo según la especie'],ans:0,pts:20},
      {type:'fill',s:'El xilema primario joven (protoxilema) tiene vasos con engrosamiento ___ y helicoidal que le dan flexibilidad.',words:['anular','punteado','escalariforme'],cor:'anular',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué determina el ángulo de las microfibrillas de celulosa (MFA) en la capa S2 de la pared secundaria?',opts:['El MFA determina las propiedades mecánicas: bajo ángulo (~5-30°) → alta rigidez axial; alto ángulo → mayor flexibilidad','El MFA no afecta las propiedades mecánicas de la madera','Solo la lignina determina la rigidez: las microfibrillas son pasivas','El ángulo es siempre 45° en todas las especies de angiospermas'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La madera de reacción (tension wood en angiospermas, compression wood en coníferas) tiene MFA alterado',a:true},{t:'La madera de tensión tiene una capa G (gelatinosa) de celulosa casi pura en S3 en lugar de lignina',a:true},{t:'El ángulo de microfibrillas puede modificarse mediante regulación de la deposición de celulosa',a:true}],pts:15},
      {type:'fill',s:'Las bandas espirales de lignina permiten que el vaso xilemico se ___ sin perder su funcion conductora.',words:['elongue','comprima','tabique'],cor:'elongue',pts:20},
    ],
  },
  spiral_band2:{
    easy:[
      {type:'fill',s:'El agua sube por los vasos muertos del xilema hasta las hojas, donde se evapora en un proceso llamado ___.',words:['transpiración','fotosíntesis','respiración'],cor:'transpiración',pts:12},
      {type:'trueFalse',items:[{t:'Los vasos en espiral conducen agua hacia las hojas',a:true},{t:'El engrosamiento espiral aumenta la fuerza necesaria para romper el vaso',a:true},{t:'El xilema más joven (protoxilema) tiene punteaduras como el xilema maduro',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué el protoxilema con vasos en espiral se rompe durante el crecimiento del órgano?',opts:['Los vasos jóvenes son desechables: se estiran y rompen al crecer el tejido; el metaxilema los reemplaza','Los vasos espirales se regeneran solos cuando se rompen','La rotura de vasos activa la síntesis de tílosis que los repara','El protoxilema en espiral nunca se rompe gracias a su flexibilidad'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'La rotura del protoxilema durante el crecimiento es un proceso programado y normal en el desarrollo vegetal',a:true},{t:'El metaxilema tiene vasos punteados más resistentes que reemplazan al protoxilema roto',a:true},{t:'Las plantas C4 tienen más protoxilema en sus hojas que las C3',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cómo determina el citoesqueleto cortical la orientación de los engrosamientos en espiral del xilema?',opts:['Microtúbulos corticales guían la trayectoria de los complejos CesA → depósito helicoidal de celulosa → la lignificación sigue el mismo patrón','La actina cortical determina el ángulo de las microfibrillas','Los microtúbulos no participan en la orientación de los engrosamientos del xilema','Solo las enzimas de síntesis de lignina determinan el patrón espiral'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Mutaciones en tubulina alteran el patrón de engrosamiento y la conductividad del xilema',a:true},{t:'La depolimerización de microtúbulos con oryzalin produce vasos con engrosamientos desordenados',a:true},{t:'Los complejos CesA se mueven por la membrana siguiendo los microtúbulos corticales durante la síntesis de pared secundaria',a:true}],pts:15},
      {type:'fill',s:'El patron de enrrollamiento de las bandas espirales puede ser dextrogiro o ___, segun la especie.',words:['levogiro','isotrop ico','anisotropo'],cor:'levogiro',pts:20},
    ],
  },
  plasmalemma_x:{
    easy:[
      {type:'quiz',q:'¿Existen células vivas dentro del xilema además de los vasos muertos?',opts:['Sí, las células de parénquima xilemático están vivas y controlan el transporte de minerales','No, todas las células del xilema mueren al madurar','Solo las células de la corteza están vivas','Los vasos se reviven periódicamente para intercambiar minerales'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El xilema tiene células vivas llamadas parénquima que trabajan con los vasos',a:true},{t:'El plasmalema del parénquima xilemático controla el paso de minerales al agua del xilema',a:true},{t:'Las células de parénquima xilemático viven solo unos pocos días',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la función del parénquima xilemático con respecto a la savia?',opts:['Carga y descarga de iones (K⁺, Mg²⁺, Ca²⁺, nutrientes) al agua xilémica; almacenamiento de almidón','Solo función estructural de soporte mecánico a los vasos','Producción de lignina para la pared secundaria','Síntesis de agua metabólica que complementa el flujo transpiratorio'],ans:0,pts:20},
      {type:'fill',s:'Las células vivas del parénquima xilemático almacenan ___, que se hidroliza en glucosa cuando el árbol necesita energía.',words:['almidón','lignina','celulosa'],cor:'almidón',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuáles transportadores del plasmalema participan en la recarga de K⁺ a la savia xilémica?',opts:['Canales SKOR (Stelar K⁺ Outward Rectifier) en células del estele que cargan K⁺ al apoplasto','Solo la ATPasa H⁺ genera el gradiente para que K⁺ entre pasivamente al xilema','Los transportadores HAK1 cargan K⁺ desde el xilema hacia el parénquima','Los canales AKT2 bidireccionales determinan el flujo neto de K⁺ al xilema'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'La expresión de SKOR en la endodermis y periciclo es regulada positivamente por la deficiencia de K⁺',a:true},{t:'Las acuaporinas PIP se encuentran en el plasmalema del parénquima xilemático para facilitar el flujo de agua',a:true},{t:'La carga de nitrato al xilema ocurre via el transportador NRT1.5 (NPF7.3) del plasmalema',a:true}],pts:15},
      {type:'fill',s:'Las celulas vivas del paraquima xilemico controlan la carga de ___ en la savia y almacenan carbohidratos.',words:['iones minerales','oxigeno','CO2'],cor:'iones minerales',pts:20},
    ],
  },
  tylosis:{
    easy:[
      {type:'quiz',q:'¿Qué son las tílosis y cómo ayudan al árbol?',opts:['Son células que se hinchan hacia el interior del vaso xilémico para bloquear patógenos y crear la madera de corazón','Son las esporas de los hongos que infectan el xilema','Son los tapones de lignina que se forman cuando el árbol envejece','Son un tipo de bacteria que vive en el xilema'],ans:0,pts:15},
      {type:'fill',s:'La madera de ___ (duramen) es la zona oscura central del árbol, formada por vasos obstruidos con tílosis.',words:['corazón','albura','floema'],cor:'corazón',pts:12},
      {type:'trueFalse',items:[{t:'Las tílosis bloquean los vasos del xilema impidiendo el paso de patógenos',a:true},{t:'El duramen o madera de corazón está formado por vasos con tílosis',a:true},{t:'Las tílosis hacen el xilema menos resistente a los hongos',a:false}],pts:8},
    ],
    normal:[
      {type:'quiz',q:'¿Cómo se forman las tílosis y qué tipo de células las producen?',opts:['Las células de parénquima xilemático crecen a través de las punteaduras hacia el lumen del vaso','Las tílosis se forman por deposición de suberina desde la membrana del vaso','Son depósitos de lignina excretados por las células del floema hacia el xilema','Se forman por la polimerización de pectinas en el lumen del vaso'],ans:0,pts:20},
      {type:'trueFalse',items:[{t:'Las tílosis son respuesta de defensa ante heridas o infecciones vasculares',a:true},{t:'Fusarium y Verticillium son bloqueados por tílosis en plantas resistentes',a:true},{t:'Las tílosis son permanentes y nunca se degradan en el árbol vivo',a:false}],pts:10},
    ],
    hard:[
      {type:'quiz',q:'¿Cuáles son las vías de señalización que inducen la formación de tílosis ante infección vascular?',opts:['Etileno + jasmonatos → expresión de genes de expansinas en parénquima → crecimiento into lumen','Solo el ácido salicílico activa la formación de tílosis por vía de señalización PR','Las tílosis se forman por daño físico sin participación de señales hormonales','El ácido abscísico induce tílosis a través de ABI5 en el parénquima del xilema'],ans:0,pts:30},
      {type:'trueFalse',items:[{t:'Las tílosis en roble (Quercus) son la razón por la que los barriles de roble son usados para envejecer vino y whisky',a:true},{t:'La suberinización de las tílosis las hace impermeables y aumenta su efecto barrera',a:true},{t:'Las plantas con alta producción de tílosis son siempre más resistentes a todos los patógenos vasculares',a:false}],pts:15},
      {type:'fill',s:'Las tilosis son intrusiones de celulas de ___ que ocluyen el lumen vascular como respuesta defensiva.',words:['paraquima','esclerenquima','colenquima'],cor:'paraquima',pts:20},
    ],
  },
  // === HEPATOCYTE ============================================================

  hepato_membrane:{
    easy:[
      {type:'quiz',q:'¿Cuántos dominios de membrana funcionales tiene el hepatocito?',opts:['Tres: sinusoidal, lateral y canalicular','Uno uniforme como el eritrocito','Dos: apical y basolateral','Cuatro: uno por cada cara'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El dominio sinusoidal del hepatocito da al espacio de Disse, en contacto con la sangre',a:true},{t:'El canalículo biliar está formado por la membrana basolateral del hepatocito',a:false},{t:'El endotelio sinusoidal hepático es fenestrado, facilitando el paso de macromoléculas',a:true}],pts:8},
      {type:'fill',s:'El transportador ___ de la membrana sinusoidal capta sales biliares desde la sangre portal hacia el hepatocito.',words:['NTCP','BSEP','MRP2'],cor:'NTCP',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué transportador de la membrana canalicular exporta sales biliares hacia el canalículo biliar?',opts:['BSEP (bomba exportadora de sales biliares)','NTCP (cotransportador de Na⁺-taurocolato)','OATP1B1 (transportador de aniones orgánicos)','MDR1 (resistencia a múltiples fármacos)'],ans:0,pts:20},
      {type:'fill',s:'El transportador ___ en la membrana canalicular exporta bilirrubina conjugada y otros aniones orgánicos a la bilis.',words:['MRP2','BSEP','NTCP'],cor:'MRP2',pts:15},
    ],
    hard:[
      {type:'fill',q:'El síndrome de Dubin-Johnson se debe a mutaciones en el transportador canalicular ___, que no puede exportar bilirrubina conjugada.',a:'MRP2',pts:22},
      {type:'trueFalse',items:[{t:'OATP1B1 y OATP1B3 captan estatinas del plasma hacia el hepatocito por la membrana sinusoidal',a:true},{t:'MDR3 exporta fosfolipídos al canalículo biliar para solubilizar las sales biliares',a:true},{t:'La polaridad de membrana del hepatocito es idéntica a la de los enterocitos del intestino',a:false},{t:'Las fenestraciones del endotelio sinusoidal desaparecen en la cirrosis hepática',a:true}],pts:28},
      {type:'sequence',items:['Ácidos biliares en sangre portal alcanzan el sinusoide','NTCP (sinusoidal) cotransporta ácido biliar + 2Na⁺ al hepatocito','Conjugación intrahepática del ácido biliar','BSEP (canalicular) exporta ácido biliar conjugado al canalículo','Bilis fluye hacia conductos biliares → vesícula biliar'],pts:36},
    ],
  },

  nucleus_h:{
    easy:[
      {type:'quiz',q:'¿Qué porcentaje de los hepatocitos adultos humanos son binucleados?',opts:['25–30%','Menos del 1%','Más del 80%','El 50% exacto'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los hepatocitos pueden ser binucleados (tener dos núcleos por célula)',a:true},{t:'Los hepatocitos son células que nunca pueden dividirse',a:false},{t:'El hígado puede regenerar hasta el 70% de su masa si se extirpa parcialmente',a:true}],pts:8},
      {type:'fill',s:'El hígado puede regenerar porque los hepatocitos conservan capacidad ___ excepcional para células diferenciadas.',words:['proliferativa','mitocondrial','secretora'],cor:'proliferativa',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proceso convierte a un hepatocito de 2n en 4n (tetraploide)?',opts:['Mitosis sin citocinesis (sin división del citoplasma)','Meiosis incompleta','Fusión de dos hepatocitos diploides','Duplicación del ADN sin fase S'],ans:0,pts:20},
      {type:'fill',s:'La ploidia progresiva de los hepatocitos (2n→4n→8n) aumenta la ___ biosintética de la célula.',words:['capacidad','actividad','eficiencia'],cor:'capacidad',pts:15},
    ],
    hard:[
      {type:'fill',q:'El principal mitogéno hepático que desencadena la regeneración tras hepatectomía parcial es el ___ (factor de crecimiento de hepatocitos).',a:'HGF',pts:22},
      {type:'trueFalse',items:[{t:'La poliploidía hepática se considera protección frente a mutaciones oncogénicas',a:true},{t:'Los hepatocitos de zonas periportales y perivenosas tienen funciones metabólicas idénticas',a:false},{t:'El hígado puede regenerar su masa en aproximadamente 8–10 días en modelos animales',a:true},{t:'La activación de NF-κB es clave en la señalización inicial de la regeneración hepática',a:true}],pts:28},
      {type:'sequence',items:['Hepatectomía parcial (70%) → pérdida de masa hepática','IL-6 y TNF-α liberadas por células de Kupffer','Activación transcripcional (NF-κB, STAT3) en hepatocitos','HGF activa receptor MET → proliferación hepatocítica','Restauración de la masa hepática en 8–10 días'],pts:36},
    ],
  },

  nucleolus_h:{
    easy:[
      {type:'quiz',q:'¿Por qué el nucléolo del hepatocito es especialmente grande?',opts:['Necesita muchos ribosomas para sintetizar albúmina y factores de coagulación','El hígado tiene más ADN que otras células','Los hepatocitos son más grandes que otras células','El hígado es el órgano más activo en dividirse'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El nucléolo sintetiza el ARN ribosmico (ARNr) que forma parte de los ribosomas',a:true},{t:'El nucléolo tiene su propia membrana que lo aísla del nucleoplasma',a:false},{t:'El hepatocito sintetiza la albúmina, la proteína más abundante del plasma humano',a:true}],pts:8},
    ],
    normal:[
      {type:'fill',s:'El hepatocito sintetiza ___ gramos de albúmina por día, la proteína de mayor concentración en el plasma.',words:['12','2','50'],cor:'12',pts:15},
      {type:'quiz',q:'¿Qué otras proteínas plasmáticas sintetiza el hepatocito?',opts:['Fibrinógeno y factores de coagulación II, V, VII, IX, X','Inmunoglobulinas (anticuerpos) IgG e IgM','Hemoglobina para los eritrocitos','Insulina y glucagón pancreáticos'],ans:0,pts:20},
    ],
    hard:[
      {type:'fill',q:'La hipoalbuminemia grave en la cirrosis produce edema y ascitis por pérdida de presión ___ del plasma.',a:'oncótica',pts:20},
      {type:'trueFalse',items:[{t:'Los factores de coagulación vitamina K-dependientes (II, VII, IX, X) se sintetizan en el RER del hepatocito',a:true},{t:'La proteína C-reactiva (PCR), marcador de inflamación, es sintetizada principalmente en el hígado',a:true},{t:'La heparina es sintetizada por el nucléolo del hepatocito y liberada a la sangre',a:false},{t:'El nucléolo neuronal y el del hepatocito tienen la misma actividad transcripcional',a:false}],pts:28},
    ],
  },

  mito_h1:{
    easy:[
      {type:'quiz',q:'¿Cuántas mitocondrias puede tener un hepatocito?',opts:['Hasta 2.000 (20–25% del volumen celular)','Unas 10–20 como las musculares','Solo 1 grande como la levadura','Ninguna en fase adulta'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las mitocondrias del hepatocito participan en el ciclo de la urea (CPS1 en la matriz)',a:true},{t:'Las mitocondrias hepáticas producen ATP para el transporte activo de membrana',a:true},{t:'El hepatocito obtiene energía solo por glucolisis sin mitocondrias',a:false}],pts:8},
    ],
    normal:[
      {type:'fill',s:'La ___ hepática en las mitocondrias convierte acetil-CoA en cuerpos cetónicos durante el ayuno.',words:['cetogénesis','lipogénesis','glicolísis'],cor:'cetogénesis',pts:15},
      {type:'quiz',q:'¿Cuál es la fuente energética principal de la mitocondria hepática en ayuno prolongado?',opts:['Ácidos grasos libres del tejido adiposo','Glucosa de la dieta','Aminoácidos del músculo','Galactosa de la leche'],ans:0,pts:20},
    ],
    hard:[
      {type:'fill',q:'El alcohol etílico es oxidado en la mitocondria hepática por la enzima ___ a acetaldehído y luego a acetato.',a:'alcohol deshidrogenasa',pts:22},
      {type:'trueFalse',items:[{t:'El etanol crónico produce megamitocondrias en los hepatocitos (cambio ultraestructural)',a:true},{t:'La carnitina es indispensable para que los ácidos grasos de cadena larga entren a la mitocondria',a:true},{t:'Las mitocondrias hepáticas también oxidan aminoácidos gluconeogénicos como el alanino',a:true},{t:'La fosforilación oxidativa hepática genera menos ATP que la de las fibras musculares rojas',a:false}],pts:28},
    ],
  },

  mito_h2:{
    easy:[
      {type:'quiz',q:'¿Qué proceso exclusivo de la mitocondria hepática sintetiza cuerpos cetónicos para el cerebro?',opts:['Cetogénesis','Glicolísis anaeróbica','Fosforilación del sustrato','Fotofosforilación'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los cuerpos cetónicos son utilizados por el cerebro como energía en ayuno prolongado',a:true},{t:'La cetogénesis es exclusiva de la mitocondria hepática (no ocurre en músculo)',a:true},{t:'El ciclo de la urea inicia en el citosol y concluye en la mitocondria hepática',a:false}],pts:8},
    ],
    normal:[
      {type:'fill',s:'La enzima ___ de la matriz mitocondrial hepática es el primer paso del ciclo de la urea, condensando NH₃ + CO₂ + 2ATP.',words:['CPS1','AST','ALT'],cor:'CPS1',pts:15},
      {type:'quiz',q:'¿Qué proporciona hasta el 70% de energía cerebral en ayuno de más de 3 días?',opts:['Cuerpos cetónicos (acetoacetato y β-hidroxibutirato)','Glucosa del glucógeno hepático','Lactato muscular reciclado','Ácidos grasos libres del tejido adiposo'],ans:0,pts:20},
    ],
    hard:[
      {type:'fill',q:'La acumulación de NADH por el metabolismo del etanol inhibe la ___, desviando el piruvato a lactato.',a:'gluconeogénesis',pts:22},
      {type:'trueFalse',items:[{t:'En ayuno, la gluconeogénesis hepática usa oxalacetato mitocondrial para generar glucosa',a:true},{t:'El β-hidroxibutirato pasa la barrera hematoencefálica y es el cuerpo cetónico principal en sangre',a:true},{t:'CPT-I es el paso regulador de la β-oxidación e inhibido por malonil-CoA',a:true},{t:'La acetil-CoA producida por β-oxidación puede convertirse directamente en glucosa',a:false}],pts:28},
    ],
  },

  er_rough_h:{
    easy:[
      {type:'quiz',q:'¿Cuál es la principal proteína plasmática sintetizada en el RER del hepatocito?',opts:['Albúmina (12 g/día)','Hemoglobina','Insulina','Colágeno muscular'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El RER del hepatocito está repleto de ribosomas que sintetizan proteínas de secreción',a:true},{t:'Los factores de coagulación VII y X son sintetizados en el RER del hepatocito',a:true},{t:'La albúmina se sintetiza en el núcleo del hepatocito directamente',a:false}],pts:8},
    ],
    normal:[
      {type:'fill',s:'La chaperona ___ (también llamada GRP78) en el lumen del RER hepático reconoce y retiene proteínas mal plegadas.',words:['BiP','calreticulina','calexina'],cor:'BiP',pts:15},
      {type:'quiz',q:'¿Qué proceso en el RER añade oligosacáridos a las proteínas del hepatocito?',opts:['N-glicosilación co-traduccional','O-glicosilación en el Golgi','S-palmitoilación en la membrana','Fosforilación por quinasas de RE'],ans:0,pts:20},
    ],
    hard:[
      {type:'fill',q:'El estrés del RE en hepatocitos activa la rama ___ de la respuesta UPR, que usa XBP1 como factor transcripcional.',a:'IRE1α',pts:22},
      {type:'trueFalse',items:[{t:'La deficiencia de vitamina K impide la γ-carboxilación de factores de coagulación en el RER hepático',a:true},{t:'La apoB-100 es sintetizada en el RER hepático y es imprescindible para el ensamblado del VLDL',a:true},{t:'Las proteínas plasmáticas se empaquetan directamente en el RER sin pasar por el Golgi',a:false},{t:'La retención de α1-antitripsina mutante (Z) en el RER del hepatocito causa daño hepático crónico',a:true}],pts:28},
    ],
  },

  er_smooth_h:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función más característica del REL hepático?',opts:['Detoxificación de fármacos por el sistema citocromo P450','Almacenamiento de Ca²⁺ para la contracción','Síntesis de hormonas esteroideas','Producción de glucógeno como en el músculo'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El citocromo P450 (CYP450) del REL hepático metaboliza ~75% de todos los fármacos',a:true},{t:'El REL hepático se hipertrofia con la exposición crónica a fármacos o alcohol',a:true},{t:'El REL y el RER son orgánulos completamente separados sin continuidad de membrana',a:false}],pts:8},
    ],
    normal:[
      {type:'fill',s:'La isoforma ___ del citocromo P450 en el REL hepático metaboliza el 50% de todos los fármacos disponibles.',words:['CYP3A4','CYP2D6','CYP1A2'],cor:'CYP3A4',pts:15},
      {type:'quiz',q:'¿Qué enzima del REL hepático regula la síntesis de colesterol y es el blanco de las estatinas?',opts:['HMG-CoA reductasa','Colesterol-7α-hidroxilasa','Escualeno sintasa','Lanosterol sintasa'],ans:0,pts:20},
    ],
    hard:[
      {type:'fill',q:'Las reacciones de fase I del REL (oxidación por CYP450) convierten fármacos lipófilos en metabolitos ___ excretables.',a:'hidrófilos',pts:20},
      {type:'trueFalse',items:[{t:'CYP2C9 metaboliza la warfarina; mutaciones en CYP2C9 requieren ajuste de dosis',a:true},{t:'La inducción del CYP3A4 por rifampicina acelera el metabolismo de otros fármacos → menor efecto',a:true},{t:'La síntesis de ácidos biliares a partir del colesterol ocurre en el REL hepático',a:true},{t:'El alcohol no induce cambios en el REL del hepatocito',a:false}],pts:28},
      {type:'sequence',items:['Fármaco lipófilo entra al hepatocito por difusión pasiva','Oxidación (fase I) por CYP450 del REL → grupo funcional reactivo','Conjugación (fase II) con glucuronato, sulfato o glutation → forma polar','Exportación al canalículo biliar por MRP2 o al plasma por MRP3','Eliminación renal (orina) o biliar (heces)'],pts:36},
    ],
  },

  golgi_h:{
    easy:[
      {type:'quiz',q:'¿Qué lipoproteína esencial ensambla el Golgi del hepatocito para exportar lípidos?',opts:['VLDL (lipoproteína de muy baja densidad)','LDL (lipoproteína de baja densidad)','HDL (lipoproteína de alta densidad)','Quilomicrones intestinales'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El Golgi hepático procesa y empaqueta la apoB-100 para formar la partícula VLDL',a:true},{t:'Las estatinas reducen el colesterol al inhibir su síntesis en el Golgi',a:false},{t:'El Golgi realiza O-glicosilación adicional a las proteínas N-glicosiladas en el RER',a:true}],pts:8},
    ],
    normal:[
      {type:'fill',s:'La ___ es la proteína estructural indispensable del VLDL hepático; sin ella no se pueden ensamblar las partículas.',words:['apoB-100','apoA-I','apoC-II'],cor:'apoB-100',pts:15},
      {type:'quiz',q:'¿Qué ocurre cuando el Golgi no puede procesar la apoB-100 correctamente?',opts:['Se acumula grasa en el hígado (esteatosis) porque no puede exportar lípidos como VLDL','Aumenta la secreción de HDL compensatoria','El colesterol se deposita en la vesícula biliar','Los fosfolipídos no pueden sintetizarse'],ans:0,pts:20},
    ],
    hard:[
      {type:'fill',q:'La proteína ___ (MTP) en el RER y Golgi transfiere lípidos a la apoB-100 naciente durante el ensamblado del VLDL.',a:'MTP',pts:22},
      {type:'trueFalse',items:[{t:'La abetalipoproteinemia es causada por mutaciones en MTP → imposibilidad de ensamblar VLDL',a:true},{t:'El Golgi hepático también procesa proteínas del complemento como C3 y C4',a:true},{t:'Los defectos de glicosilación CDG tipo II afectan exclusivamente al Golgi del hepatocito',a:false},{t:'La secreción de VLDL hepático aumenta en resistencia a la insulina, contribuyendo a la dislipemia',a:true}],pts:28},
    ],
  },

  lysosome_h:{
    easy:[
      {type:'quiz',q:'¿Qué proceso lisosomal especial del hepatocito degrada gotas lipídicas?',opts:['Lipofagia (autofagia selectiva de gotas lipídicas)','Apoptosis mediada por caspasas','Necrosis osmótica celular','Exocitosis de vesículas lipídicas'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La autofagia hepática elimina mitocondrias dañadas mediante mitofagia lisosomal',a:true},{t:'Los lisosomas del hepatocito degradan glucógeno (glicofagia) cuando la célula necesita glucosa',a:true},{t:'Los lisosomas del hepatocito tienen el mismo pH que el citosol (7.0–7.4)',a:false}],pts:8},
    ],
    normal:[
      {type:'fill',s:'La enfermedad de ___ se debe a déficit de α-glucosidasa lisosomal → acumulación de glucógeno en hígado y músculo.',words:['Pompe','Gaucher','Fabry'],cor:'Pompe',pts:15},
      {type:'quiz',q:'¿Cuál es la función de la lipofagia lisosomal en el hepatocito en ayuno?',opts:['Degradar gotas lipídicas → liberar ácidos grasos para β-oxidación y VLDL','Sintetizar nuevas gotas lipídicas para reserva','Exportar lípidos al exterior','Transferir lípidos a las mitocondrias directamente'],ans:0,pts:20},
    ],
    hard:[
      {type:'fill',q:'La bilirrubina no conjugada tóxica es conjugada con glicurónico en el hepatocito y excretada por ___ en el canalículo.',a:'MRP2',pts:22},
      {type:'trueFalse',items:[{t:'En la enfermedad de Wilson, el cobre acumulado en el hepatocito causa daño oxidativo lisosomal',a:true},{t:'La CMA (autofagia mediada por chaperonas) es el tipo más activo en hepatocitos en ayuno prolongado',a:true},{t:'La inhibición de la autofagia hepática mejora la esteatosis al reducir la degradación lipídica',a:false},{t:'Los lisosomas hepáticos procesan restos celulares apoptóticos fagocitados por células de Kupffer',a:true}],pts:28},
    ],
  },

  peroxisome_h:{
    easy:[
      {type:'quiz',q:'¿Qué tipo de ácidos grasos solo pueden oxidarse en los peroxisomas del hepatocito?',opts:['Ácidos grasos de cadena muy larga (>C22, AGCML)','Ácidos grasos de cadena corta (C4–C8)','Ácidos grasos saturados de C16 (palmítico)','Ácidos grasos trans de origen dietético'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La catalasa peroxisomal destruye el H₂O₂ producido en la β-oxidación de AGCML',a:true},{t:'Los ácidos biliares primarios (cólico y quenodesoxicólico) se sintetizan en los peroxisomas hepáticos',a:true},{t:'Los peroxisomas hepáticos contienen ribosomas propios como las mitocondrias',a:false}],pts:8},
    ],
    normal:[
      {type:'fill',s:'El síndrome de ___ es una enfermedad neonatal grave causada por déficit en la biogénesis de peroxisomas.',words:['Zellweger','Pompe','Gaucher'],cor:'Zellweger',pts:15},
      {type:'quiz',q:'¿Cuál es la diferencia entre la β-oxidación peroxisomal y la mitocondrial?',opts:['La peroxisomal oxida AGCML y transfiere el resultado a la mitocondria; no produce ATP directamente','La peroxisomal produce más ATP por molécula de ácido graso','Son idénticas en función y localización subcelular','La peroxisomal usa NADH y la mitocondrial FADH₂ como cofactores'],ans:0,pts:20},
    ],
    hard:[
      {type:'fill',q:'Los plasmalógenos (éter-fosfolipídos importantes en el cerebro y el corazón) se sintetizan exclusivamente en los ___ hepáticos.',a:'peroxisomas',pts:22},
      {type:'trueFalse',items:[{t:'La ACOX1 (acil-CoA oxidasa peroxisomal) genera H₂O₂ como subproducto de la β-oxidación de AGCML',a:true},{t:'En el síndrome de Zellweger los peroxisomas están presentes pero con proteínas mal localizadas',a:false},{t:'El fitánico ácido solo puede degradarse por α-oxidación peroxisomal, no por β-oxidación',a:true},{t:'Las estatinas inhiben indirectamente los peroxisomas al reducir la disponibilidad de colesterol',a:false}],pts:28},
    ],
  },

  glycogen:{
    easy:[
      {type:'quiz',q:'¿Cuántos gramos de glucógeno puede almacenar el hígado?',opts:['75–100 gramos','500 gramos como el músculo','Solo 10 gramos','Más de 1 kilogramo'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El glucógeno hepático se moviliza para mantener la glucemia sistémica en el ayuno',a:true},{t:'El glucógeno muscular también mantiene la glucemia sanguínea igual que el hepático',a:false},{t:'La insulina estimula la síntesis de glucógeno en el hepatocito',a:true}],pts:8},
      {type:'fill',s:'La hormona ___ estimula la degradación del glucógeno hepático para elevar la glucemia en el ayuno.',words:['glucagón','insulina','cortisol'],cor:'glucagón',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Cuánto tiempo tarda en agotarse el glucógeno hepático durante el ayuno total?',opts:['Aproximadamente 24 horas','Solo 1 hora de ejercicio intenso','Varios días como el muscular','Nunca se agota'],ans:0,pts:20},
      {type:'fill',s:'La enzima ___ convierte el glucógeno hepático en glucosa-1-fosfato, activada por glucagón y adrenalina.',words:['glucógeno fosforilasa','glucógeno sintasa','fosfatasa'],cor:'glucógeno fosforilasa',pts:15},
    ],
    hard:[
      {type:'fill',q:'La glucogenosis tipo I (enfermedad de von Gierke) se debe a déficit de ___, causando hipoglucemia grave y hepatomegalia.',a:'glucosa-6-fosfatasa',pts:22},
      {type:'trueFalse',items:[{t:'El glucagón activa la fosforilasa quinasa via AMPc/PKA → fosforila la glucógeno fosforilasa → glucogenolisis',a:true},{t:'En el estado postprandial, la insulina activa la PP1 que activa la glucógeno sintasa',a:true},{t:'La glucogenosis tipo III (debrancher) acumula glucógeno con ramas cortas en hígado y músculo',a:true},{t:'El hígado y el músculo comparten la isoforma de la glucosa-6-fosfatasa',a:false}],pts:28},
      {type:'sequence',items:['Hipoglucemia → secreción de glucagón pancreático','Glucagón activa receptor GPCR (Gs) en hepatocito → AMPc','PKA fosforila e inhibe glucógeno sintasa (bloquea síntesis)','PKA activa fosforilasa quinasa → activa glucógeno fosforilasa','Fosforolisis del glucógeno → glucosa-1-P → glucosa-6-P','Glucosa-6-fosfatasa (REL) → glucosa libre → sangre','Corrección de la glucemia sistémica'],pts:38},
    ],
  },

  lipid_drop_h:{
    easy:[
      {type:'quiz',q:'¿Qué enfermedad se produce cuando los hepatocitos acumulan más del 5% de su peso en gotas lipídicas?',opts:['Esteatosis hepática (hígado graso)','Cirrosis hepática avanzada','Hepatitis viral aguda','Colelitiasis (cálculos biliares)'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El NAFLD (hígado graso no alcohólico) afecta al 25% de la población adulta mundial',a:true},{t:'Las gotas lipídicas hepáticas están rodeadas por una bicapa de fosfolipídos',a:false},{t:'La proteína PLIN2 (perilinina 2) recubre las gotas lipídicas hepáticas',a:true}],pts:8},
    ],
    normal:[
      {type:'fill',s:'La progresión del NAFLD de esteatosis simple a ___ (NASH) implica inflamación, estrés oxidativo y daño hepatocítico.',words:['esteatohepatitis','cirrosis','hepatitis'],cor:'esteatohepatitis',pts:15},
      {type:'quiz',q:'¿Cuál es el mecanismo principal de eliminación de gotas lipídicas en el hepatocito durante el ayuno?',opts:['Lipofagia: las gotas son engullidas por autofagosomas y degradadas en lisosomas','Exocitosis directa al espacio de Disse','Transferencia directa a la mitocondria','Conversión en glucógeno por gluconeogénesis inversa'],ans:0,pts:20},
    ],
    hard:[
      {type:'fill',q:'La lipogénesis de novo en el hepatocito está regulada por el factor de transcripción ___, activado por insulina y carbohidratos en exceso.',a:'SREBP-1c',pts:22},
      {type:'trueFalse',items:[{t:'La acumulación de ácidos grasos libres (lipotoxicidad) activa el inflamasoma NLRP3 en hepatocitos → NASH',a:true},{t:'La secreción de VLDL es el mecanismo principal por el que el hígado exporta lípidos hacia tejidos periféricos',a:true},{t:'Las gotas lipídicas hepáticas son estáticas una vez formadas y no se pueden movilizar',a:false},{t:'El ácido oleico (C18:1) es menos lipotóxico que el ácido palmítico (C16:0) en el hepatocito',a:true}],pts:28},
    ],
  },

  bile_canaliculus:{
    easy:[
      {type:'quiz',q:'¿Qué estructura forma el canalículo biliar?',opts:['El surco entre las membranas apicales de 2–3 hepatocitos vecinos','Un canal dentro de un solo hepatocito','La membrana basal de los hepatocitos','El espacio de Disse entre hepatocito y sinusoide'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El hígado produce entre 600 y 1200 mL de bilis por día',a:true},{t:'Las sales biliares emulsionan las grasas de la dieta facilitando su digestión',a:true},{t:'El canalículo biliar transporta bilis desde el intestino hacia el hígado',a:false}],pts:8},
      {type:'fill',s:'El canalículo biliar está sellado por uniones ___ entre hepatocitos adyacentes que impiden la mezcla de bilis con plasma.',words:['ocluyentes','comunicantes','adherentes'],cor:'ocluyentes',pts:12},
    ],
    normal:[
      {type:'fill',s:'La ___ (detención del flujo biliar) puede ocurrir por defectos en transportadores canaliculares, embarazo o fármacos.',words:['colestasis','cirrosis','hepatitis'],cor:'colestasis',pts:15},
      {type:'quiz',q:'¿Qué sucede con las sales biliares una vez que llegan al intestino delgado?',opts:['Son reabsorbidas en el íleon terminal y regresan al hígado (circulación enterohepatica)','Se excretan completamente por las heces','Son convertidas en colesterol y absorbidas directamente','Son destruidas por la microbiota del colon'],ans:0,pts:20},
    ],
    hard:[
      {type:'fill',q:'La colestasis intrahepática familiar progresiva tipo 2 (PFIC2) se debe a mutaciones en ___, el principal transportador canalicular de sales biliares.',a:'BSEP',pts:22},
      {type:'trueFalse',items:[{t:'La bilirrubina directa (conjugada con glucurónico) es hidrosoluble y se excreta por el canalículo biliar',a:true},{t:'MDR3 (ABCB4) exporta fosfatidilcolina al canalículo para evitar que las sales biliares dañen la membrana',a:true},{t:'El color amarillo de la ictericia se debe a acumulación de bilirrubina conjugada en los tejidos',a:false},{t:'Las sales biliares recirculan 6–10 veces por día a través de la circulación enterohepática',a:true}],pts:28},
      {type:'sequence',items:['Colesterol → ácidos biliares primarios (síntesis en REL/peroxisomas)','Conjugación con glicina o taurina → sales biliares','Exportación al canalículo biliar por BSEP','Flujo por canaliculos → conductos biliares → vesícula biliar','Liberación al intestino delgado → emulsificación de grasas','Reabsorción en íleon terminal → vena porta → hígado (circulación enterohepática)'],pts:38},
    ],
  },

  // === MYOCYTE ============================================================
  myocyte_membrane:{
    easy:[
      {type:'quiz',q:'¿Cómo se llama la membrana plasmática de la fibra muscular esquelética?',opts:['Sarcolema','Sarcolema mioide','Membrana Z','Miolemma'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El sarcolema contiene canales Nav1.4 voltaje-dependientes que propagan el potencial de acción',a:true},{t:'Las caveolas son invaginaciones del sarcolema ricas en caveolina-3',a:true},{t:'El sarcolema carece de conexión con el citoesqueleto interno de actina',a:false}],pts:8},
      {type:'fill',s:'El sarcolema se invagina formando los ___ T, que conducen el potencial de acción al interior de la fibra.',words:['túbulos','canales','pliegues'],cor:'túbulos',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proteína ancla el citoesqueleto de actina al sarcolema y su ausencia causa distrofia muscular de Duchenne?',opts:['Distrofina','Espectrina','Integrina','Talina'],ans:0,pts:20},
      {type:'fill',s:'La ___ es una enfermedad X-ligada producida por ausencia de distrofina, con debilidad muscular progresiva e inicio en la infancia.',words:['distrofia de Duchenne','miotonía congénita','distrofia facioescapulohumeral'],cor:'distrofia de Duchenne',pts:15},
    ],
    hard:[
      {type:'quiz',q:'En la miotonía congénita de Thomsen, ¿qué canal del sarcolema está mutado causando relajación muscular lenta?',opts:['Canal de cloruro ClC-1 (CLCN1)','Nav1.4','Cav1.1 (DHPR)','SERCA1a'],ans:0,pts:30},
      {type:'fill',q:'Proteína integral del sarcolema que actúa como sensor de voltaje en el túbulo T y activa mecánicamente al receptor de rianodina del RS',a:'DHPR',pts:22},
      {type:'trueFalse',items:[{t:'Las caveolas del sarcolema concentran receptores y proteínas de señalización (eNOS, caveolina-3)',a:true},{t:'La distrofina solo se expresa en músculo esquelético, no en cardíaco ni cerebro',a:false},{t:'Los canales Nav1.4 son dianas de la mexiletina para tratar miotonías y parálisis periódicas',a:true}],pts:28},
    ],
  },
  nucleus_m:{
    easy:[
      {type:'quiz',q:'¿Dónde se ubican los núcleos de una fibra muscular esquelética madura?',opts:['En la periferia bajo el sarcolema','En el centro, rodeados de miofibrillas','En grupos alrededor de las mitocondrias','Solo en los extremos de la fibra'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La fibra muscular esquelética es multinucleada (sincicio formado por fusión de mioblastos)',a:true},{t:'Los núcleos periféricos de la fibra muscular adulta se dividen activamente durante el ejercicio',a:false},{t:'Las células satélite son mioblastos quiescentes que pueden regenerar fibras lesionadas',a:true}],pts:8},
      {type:'fill',s:'La fibra muscular es un ___, resultado de la fusión de muchos mioblastos durante el desarrollo embrionario.',words:['sincicio','proplasto','nucléolo'],cor:'sincicio',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Cuántos núcleos puede tener una sola fibra muscular esquelética larga (~10 cm)?',opts:['Cientos (100-300)','1-5','10-20','Miles'],ans:0,pts:20},
      {type:'fill',s:'El dominio ___ es el volumen de citoplasma controlado por cada núcleo periférico en la fibra muscular (~37.500 µm³).',words:['miconuclear','sarcomérico','mitocondrial'],cor:'miconuclear',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué gen codifica la distrofina y en qué cromosoma se encuentra?',opts:['DMD en el cromosoma X','MYH7 en cromosoma 14','ACTA1 en cromosoma 1','LMNA en cromosoma 1'],ans:0,pts:30},
      {type:'fill',q:'Tipo de miopatía caracterizada por núcleos centrales (no periféricos) en la biopsia, causada por mutaciones en DNM2 o MTM1',a:'miopatía centronuclear',pts:22},
      {type:'trueFalse',items:[{t:'Las células satélite se activan por HGF y FGF tras una lesión muscular para regenerar la fibra',a:true},{t:'La terapia de exon-skipping con AON (eteplirsen) restaura parcialmente el marco de lectura de la distrofina',a:true},{t:'En miopatías centronucleares los núcleos centrales son solo un artefacto de procesado histológico',a:false}],pts:28},
    ],
  },
  nucleus_m2:{
    easy:[
      {type:'quiz',q:'¿Cuántos núcleos periféricos puede haber en una fibra muscular de 1 mm de longitud?',opts:['~40 núcleos (espaciados ~25 µm)','1-2 núcleos','~500 núcleos','Solo el núcleo central'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los múltiples núcleos de la fibra muscular son idénticos en función',a:false},{t:'Los núcleos en la placa motora expresan genes específicos de la unión neuromuscular (AChR)',a:true},{t:'Durante la hipertrofia por entrenamiento, se incorporan nuevos núcleos procedentes de células satélite',a:true}],pts:8},
      {type:'fill',s:'Las ___ son células mononucleadas quiescentes situadas entre el sarcolema y la lámina basal, que se activan para regenerar el músculo.',words:['células satélite','células de Schwann','células intersticiales'],cor:'células satélite',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué ocurre con los núcleos musculares en la miopatía centronuclear (MTM1)?',opts:['Migran al centro de la fibra en lugar de permanecer periféricos','Se fragmentan y causan apoptosis','Se fusionan formando un núcleo gigante','Desaparecen por necrosis'],ans:0,pts:20},
      {type:'fill',s:'La ___ de proteínas miofibrilares (miosina, actina) está controlada localmente por los núcleos periféricos más cercanos al sarcómero.',words:['síntesis','degradación','importación'],cor:'síntesis',pts:15},
    ],
    hard:[
      {type:'fill',q:'Proteína de lámina nuclear cuyas mutaciones (LMNA) causan distrofia muscular de Emery-Dreifuss, cardiomiopatía dilatada y progeria',a:'lamina A/C',pts:22},
      {type:'trueFalse',items:[{t:'La terapia con células satélite autólogas modificadas genéticamente es un enfoque en desarrollo para distrofias musculares',a:true},{t:'El envejecimiento reduce el número de células satélite y su capacidad de activación, contribuyendo a la sarcopenia',a:true},{t:'Los núcleos periféricos en el extremo de la fibra expresan los mismos genes que los de la zona media',a:false}],pts:28},
      {type:'quiz',q:'¿Cuál es la diferencia funcional entre núcleos "sinápticos" y "extrasinápticos" de la fibra muscular?',opts:['Los sinápticos expresan subunidades específicas de AChR (ε) inducidas por neuregulina/agruina','Los sinápticos producen más ATP','Los extrasinápticos expresan más actina','No hay diferencia funcional'],ans:0,pts:30},
    ],
  },
  sarcomere:{
    easy:[
      {type:'quiz',q:'¿Cuál es la unidad contráctil básica del músculo esquelético?',opts:['Sarcómero','Miofibrilla','Sarcolema','Retículo sarcoplasmático'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El sarcómero está delimitado a ambos extremos por los discos Z',a:true},{t:'Durante la contracción, la banda A (miosina) acorta su longitud',a:false},{t:'La banda I del sarcómero contiene únicamente filamentos delgados de actina',a:true}],pts:8},
      {type:'fill',s:'El sarcómero mide aproximadamente ___ µm en reposo, longitud óptima para la generación de fuerza máxima.',words:['2.2','1.6','3.5'],cor:'2.2',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proteína actúa como resorte molecular (~4 MDa) en el sarcómero y evita que se sobreextienda?',opts:['Titina','Nebulina','Tropomiosina','Troponina T'],ans:0,pts:20},
      {type:'fill',s:'La ___ desplaza la tropomiosina al unirse al Ca²⁺, exponiendo los sitios de unión de la cabeza de miosina en la actina.',words:['troponina C','troponina T','calmodulina'],cor:'troponina C',pts:15},
      {type:'sequence',items:['Ca²⁺ liberado del RS une troponina C','Tropomiosina se desplaza → sitios de actina expuestos','Cabeza de miosina (con ADP+Pi) se une a actina','Power stroke: pivoteo de cabeza → filamentos deslizan ~10 nm','ATP une la cabeza de miosina → despegue del puente cruzado','Hidrólisis de ATP recarga la cabeza de miosina'],pts:25},
    ],
    hard:[
      {type:'quiz',q:'La curva fuerza-longitud del músculo muestra fuerza máxima a 2.2 µm de sarcómero porque...',opts:['El solapamiento actina-miosina es máximo (todos los puentes cruzados pueden formarse)','La titina está en su longitud natural','Las tropomiosinas se liberan completamente','El disco Z activa la troponina'],ans:0,pts:30},
      {type:'fill',q:'Miopatía congénita causada por mutaciones en α-actina, tropomiosina o troponina que forman cuerpos en bastón en el sarcómero',a:'miopatía nemalínica',pts:22},
      {type:'trueFalse',items:[{t:'La cardiomiopatía hipertrófica (MCH) es la cardiopatía hereditaria más frecuente y suele deberse a mutaciones en β-miosina (MYH7)',a:true},{t:'Durante la tetania, el [Ca²⁺] citosólico permanece elevado, impidiendo la relajación y causando el espasmo',a:true},{t:'La zona H del sarcómero contiene actina y miosina en igual proporción',a:false}],pts:28},
    ],
  },
  myofibril:{
    easy:[
      {type:'quiz',q:'¿Qué proteínas forman el filamento delgado de la miofibrilla?',opts:['Actina + tropomiosina + troponina','Miosina + titina','Actinina + nebulina','Calmodulina + calsequestrina'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las miofibrillas ocupan aproximadamente el 80% del volumen de la fibra muscular',a:true},{t:'Las fibras tipo I (lentas, oxidativas) tienen más mitocondrias y mioglobina que las tipo IIb',a:true},{t:'La nebulina actúa como plantilla molecular que fija la longitud de los filamentos gruesos de miosina',a:false}],pts:8},
      {type:'fill',s:'Las fibras musculares ___ (tipo I, lentas) son resistentes a la fatiga y se usan para ejercicio aeróbico de larga duración.',words:['oxidativas','glucolíticas','mixtas'],cor:'oxidativas',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Cuántas moléculas de ATP consume cada ciclo de puente cruzado actina-miosina?',opts:['1 ATP por ciclo completo','2 ATP por ciclo','0.5 ATP (reutiliza ADP)','No consume ATP directamente'],ans:0,pts:20},
      {type:'fill',s:'La ___ es la proteína más grande conocida (~4 MDa), actúa como resorte elástico y define la longitud de sarcómero en reposo.',words:['titina','nebulina','actinina'],cor:'titina',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué distingue a las isoformas de miosina en fibras tipo I vs IIa vs IIx/IIb?',opts:['Velocidad de ciclo de la ATPasa y potencia generada','Número de cabezas de miosina','Longitud del filamento grueso','Capacidad de unión a titina'],ans:0,pts:30},
      {type:'fill',q:'Proceso de degradación proteica muscular mediado por ubiquitinación y el proteasoma 26S, que predomina en atrofia por desuso o ayuno',a:'proteólisis ubiquitina-proteasoma',pts:22},
      {type:'trueFalse',items:[{t:'La nebulina actúa como "regla molecular" que determina la longitud exacta (~1 µm) de los filamentos delgados',a:true},{t:'La contracción isométrica genera fuerza sin cambiar la longitud del sarcómero',a:true},{t:'La actinina-α es la principal proteína del disco Z que ancla los filamentos de actina entre sarcómeros',a:true}],pts:28},
    ],
  },
  t_tubule:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función principal del túbulo T?',opts:['Transmitir el potencial de acción al interior de la fibra para activar el RS','Sintetizar proteínas contráctiles','Almacenar ATP para la contracción','Degradar el glucógeno muscular'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los túbulos T son invaginaciones del sarcolema hacia el interior de la fibra',a:true},{t:'En músculo esquelético los túbulos T se ubican en la unión de las bandas A e I',a:true},{t:'El receptor de rianodina (RyR1) está localizado en la membrana del túbulo T',a:false}],pts:8},
      {type:'fill',s:'El conjunto formado por un túbulo T flanqueado por dos cisternas terminales del RS se llama ___.',words:['tríada','díada','cúpula'],cor:'tríada',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proteína del túbulo T actúa como sensor de voltaje y activa la liberación de Ca²⁺ del RS en músculo esquelético?',opts:['DHPR (Cav1.1)','Nav1.4','RyR1','SERCA1a'],ans:0,pts:20},
      {type:'fill',s:'El acoplamiento ___ une el potencial de acción del sarcolema con la liberación de Ca²⁺ del retículo sarcoplasmático.',words:['excitación-contracción','voltaje-corriente','membrana-retículo'],cor:'excitación-contracción',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cómo difiere el mecanismo de activación de RyR en músculo esquelético vs cardíaco?',opts:['Esquelético: acoplamiento mecánico DHPR→RyR1 (sin Ca²⁺ extracelular); cardíaco: CICR (Ca²⁺ entra por Cav1.2 y dispara RyR2)','Esquelético: CICR; cardíaco: acoplamiento mecánico','Ambos usan CICR con distintas isoformas de RyR','No hay diferencia funcional'],ans:0,pts:30},
      {type:'fill',q:'Fármaco que bloquea el receptor de rianodina (RyR1) usado en el tratamiento de urgencia de la hipertermia maligna',a:'dantroleno',pts:22},
      {type:'trueFalse',items:[{t:'En músculo cardíaco los túbulos T están en los discos Z (no en la unión A-I como en esquelético)',a:true},{t:'Los túbulos T cardíacos forman díadas con el RS (1 cisterna terminal, no 2)',a:true},{t:'La ausencia de túbulos T impediría completamente la contracción muscular',a:true}],pts:28},
    ],
  },
  sr:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función principal del retículo sarcoplasmático?',opts:['Almacenar y liberar Ca²⁺ para controlar la contracción','Sintetizar proteínas contráctiles','Producir ATP por glucólisis','Degradar organelos dañados'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El retículo sarcoplasmático es una forma especializada del RE liso',a:true},{t:'La bomba SERCA recapta Ca²⁺ del citoplasma al RS gastando ATP durante la relajación',a:true},{t:'El RS libera Ca²⁺ durante la relajación muscular',a:false}],pts:8},
      {type:'fill',s:'La bomba ___ (Ca²⁺-ATPasa del RS) bombea Ca²⁺ de regreso al lumen del RS gastando ATP, permitiendo la relajación.',words:['SERCA','RyR1','DHPR'],cor:'SERCA',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Cuánto aumenta la concentración de Ca²⁺ citosólico al liberar el RS durante la contracción?',opts:['De ~100 nM a ~10 µM (aumento 100 veces)','De 1 mM a 10 mM (10 veces)','Baja de 1 µM a 100 nM','Se mantiene constante'],ans:0,pts:20},
      {type:'fill',s:'La ___ es la proteína de unión a Ca²⁺ del lumen del RS, con alta capacidad y baja afinidad, que actúa como tampón y reserva de Ca²⁺.',words:['calsecuestrina','calmodulina','calreticulina'],cor:'calsecuestrina',pts:15},
    ],
    hard:[
      {type:'quiz',q:'En insuficiencia cardíaca crónica, ¿qué ocurre con la función de SERCA2a?',opts:['Su actividad está reducida → sobrecarga de Ca²⁺ citosólico → disfunción diastólica','Su actividad aumenta causando relajación excesiva','Se convierte en la isoforma SERCA1a','Es sustituida por RyR2'],ans:0,pts:30},
      {type:'fill',q:'Inhibidor endógeno de SERCA2a en el miocito cardíaco, cuya fosforilación por PKA (receptor β-adrenérgico) activa la bomba durante el ejercicio',a:'fosfolamban',pts:22},
      {type:'trueFalse',items:[{t:'SERCA1a es la isoforma predominante en músculo esquelético rápido; SERCA2a en cardíaco y músculo lento',a:true},{t:'La terapia génica AAV-SERCA2a fue evaluada en ensayos de fase II/III para insuficiencia cardíaca (CUPID)',a:true},{t:'El calcio del RS muscular se repone desde el calcio extracelular en cada contracción del músculo esquelético',a:false}],pts:28},
    ],
  },
  terminal_cisterna:{
    easy:[
      {type:'quiz',q:'¿Cuántas cisternas terminales flanquean cada túbulo T en músculo esquelético?',opts:['2 (una a cada lado → tríada)','1 (díada)','4','Variable según fatiga'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las cisternas terminales contienen alta densidad del receptor de rianodina tipo 1 (RyR1)',a:true},{t:'La tríada es el conjunto formado por 2 cisternas terminales + 1 túbulo T',a:true},{t:'Las cisternas terminales producen ATP para alimentar los sarcómeros',a:false}],pts:8},
      {type:'fill',s:'En músculo ___, las tríadas se reemplazan por díadas (1 cisterna + 1 túbulo T) y la liberación de Ca²⁺ es por CICR.',words:['cardíaco','liso','esquelético lento'],cor:'cardíaco',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proteína de la cisterna terminal interactúa físicamente con el DHPR del túbulo T para liberar Ca²⁺?',opts:['RyR1 (receptor de rianodina tipo 1)','SERCA1a','Calsecuestrina','Triadin'],ans:0,pts:20},
      {type:'fill',s:'La ___ interactúa con RyR1 y calsecuestrina en la cisterna terminal para modular la liberación luminal de Ca²⁺.',words:['triadin','ankirin','distrofina'],cor:'triadin',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es la diferencia clave entre la activación de RyR1 (esquelético) y RyR2 (cardíaco)?',opts:['RyR1: activación mecánica directa por DHPR (sin Ca²⁺ extracelular); RyR2: activación por Ca²⁺ (CICR)','RyR1 usa Ca²⁺ extracelular; RyR2 es mecánico','Ambos son mecánicos pero con distinta isoforma','No hay diferencia funcional'],ans:0,pts:30},
      {type:'fill',q:'Síndrome de urgencia anestésica causado por mutaciones en RyR1 que producen liberación masiva de Ca²⁺ del RS con hipertermia y rigidez',a:'hipertermia maligna',pts:22},
      {type:'trueFalse',items:[{t:'Las moléculas S107 (rycal) estabilizan RyR1 reduciendo la liberación espontánea de Ca²⁺ en miopatías RyR1',a:true},{t:'La enfermedad de central core (defectos en el centro de la fibra) se debe a mutaciones en RyR1',a:true},{t:'En el músculo esquelético, la contracción requiere Ca²⁺ extracelular en condiciones normales',a:false}],pts:28},
    ],
  },
  mito_m:{
    easy:[
      {type:'quiz',q:'¿Por qué las fibras musculares tipo I (lentas) tienen más mitocondrias que las tipo IIb?',opts:['Para producir ATP aeróbicamente y resistir la fatiga durante ejercicio prolongado','Para almacenar más glucógeno','Para generar más calor corporal','Para sintetizar más proteínas contráctiles'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Las mitocondrias musculares se organizan en hileras entre las miofibrillas y bajo el sarcolema',a:true},{t:'Las mitocondrias musculares solo pueden usar glucosa como combustible energético',a:false},{t:'El ejercicio aeróbico de larga duración aumenta el número y tamaño de las mitocondrias musculares',a:true}],pts:8},
      {type:'fill',s:'El ___ es el proceso por el que el ejercicio aeróbico induce la formación de nuevas mitocondrias musculares, regulado por PGC-1α.',words:['biogénesis mitocondrial','mitofagia','fusión mitocondrial'],cor:'biogénesis mitocondrial',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué porcentaje del volumen celular pueden ocupar las mitocondrias en fibras musculares tipo I muy entrenadas?',opts:['30-40%','5-10%','60-70%','1-2%'],ans:0,pts:20},
      {type:'fill',s:'Las miopatías ___ (MELAS, MERRF) se deben a mutaciones del ADN mitocondrial y causan intolerancia al ejercicio, debilidad proximal y acidosis láctica.',words:['mitocondriales','glucogenóticas','sarcopénicas'],cor:'mitocondriales',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el principal factor transcripcional que regula la biogénesis mitocondrial inducida por ejercicio aeróbico?',opts:['PGC-1α','mTORC1','FoxO3a','NF-κB'],ans:0,pts:30},
      {type:'fill',q:'Tipo de autofagia selectiva de mitocondrias dañadas o senescentes, esencial para mantener la calidad mitocondrial en el músculo',a:'mitofagia',pts:22},
      {type:'trueFalse',items:[{t:'AMPK activada por bajo ATP/AMP estimula PGC-1α e inhibe mTORC1 (favoreciendo catabolismo sobre anabolismo)',a:true},{t:'Las mitocondrias musculares forman redes dinámicas que se fusionan (MFN1/2) y fisionan (DRP1) según la demanda',a:true},{t:'El entrenamiento de fuerza (hipertrofia) aumenta la densidad mitocondrial por unidad de volumen de la fibra',a:false}],pts:28},
    ],
  },
  mito_m2:{
    easy:[
      {type:'quiz',q:'¿Cuál es el rendimiento neto de ATP por molécula de glucosa en respiración aeróbica mitocondrial completa?',opts:['~30-32 ATP','~2 ATP (glucólisis neta)','~18 ATP','~100 ATP'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La β-oxidación de ácidos grasos en mitocondrias produce más ATP por gramo que la oxidación de glucosa',a:true},{t:'Las mitocondrias musculares pueden usar lactato como combustible (lanzadera de lactato intracelular)',a:true},{t:'Las fibras glucolíticas tipo IIb tienen más mitocondrias que las oxidativas tipo I',a:false}],pts:8},
      {type:'fill',s:'La ___ (EPOC) es el consumo extra de O₂ tras ejercicio intenso para reponer ATP, creatin-fosfato y re-oxidar el lactato acumulado.',words:['deuda de oxígeno','oxidación de glucosa','termogénesis'],cor:'deuda de oxígeno',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué vía provee principalmente acetil-CoA a las mitocondrias musculares durante ejercicio de intensidad moderada (50-65% VO₂max)?',opts:['β-oxidación de ácidos grasos libres','Glucólisis anaeróbica','Ciclo de la urea','Vía de las pentosas fosfato'],ans:0,pts:20},
      {type:'fill',s:'La ___ actúa como tampón inmediato de ATP en el músculo (primeros 5-10 s de ejercicio intenso), cediendo su fosfato al ADP.',words:['fosfocreatina','glucosa-fosfato','ATP-fosfato'],cor:'fosfocreatina',pts:15},
    ],
    hard:[
      {type:'fill',q:'Enzima del ciclo de Krebs cuya actividad en músculo es un marcador de capacidad oxidativa y aumenta con el entrenamiento aeróbico',a:'citrato sintasa',pts:22},
      {type:'trueFalse',items:[{t:'El lactato producido en fibras tipo IIb puede ser captado por mitocondrias de fibras tipo I vecinas para ser oxidado',a:true},{t:'La disfunción mitocondrial contribuye a la sarcopenia (pérdida de masa muscular) en el envejecimiento',a:true},{t:'El músculo esquelético expresa UCP3 (desacoplante) que puede generar calor por termogénesis sin tiritar',a:true}],pts:28},
      {type:'quiz',q:'¿Qué efecto tiene el entrenamiento de fuerza sobre la densidad mitocondrial relativa al volumen de fibra?',opts:['La reduce (dilución por hipertrofia miofibrilar)','La aumenta proporcionalmente','No tiene efecto sobre mitocondrias','La convierte en glucolítica'],ans:0,pts:30},
    ],
  },
  glycogen_m:{
    easy:[
      {type:'quiz',q:'¿Por qué el músculo no puede liberar glucosa a la sangre aunque tenga glucógeno?',opts:['Carece de glucosa-6-fosfatasa (necesaria para exportar glucosa libre)','No tiene glucógeno fosforilasa','Su glucógeno es de tipo diferente','No tiene acceso a capilares sanguíneos'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El glucógeno muscular es de uso exclusivamente local (no puede mantener la glucemia)',a:true},{t:'La adrenalina activa la glucógeno fosforilasa muscular durante el ejercicio o el estrés',a:true},{t:'El glucógeno muscular es la principal fuente de glucosa sanguínea durante el ayuno',a:false}],pts:8},
      {type:'fill',s:'La enfermedad de ___ (glucogenosis tipo V) causa mioglobinuria y rabdomiólisis por ejercicio por déficit de glucógeno fosforilasa muscular.',words:['McArdle','Pompe','von Gierke'],cor:'McArdle',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Cuántos gramos de glucógeno puede almacenar el músculo total de un adulto (~30 kg músculo)?',opts:['~300-400 g (>>que el hígado)','~50 g','~1000 g','~100 g'],ans:0,pts:20},
      {type:'fill',s:'El ___ es el activador alostérico de la glucógeno fosforilasa b muscular que acelera la glucogenólisis durante la contracción intensa.',words:['AMP','ATP','glucosa-6-P'],cor:'AMP',pts:15},
    ],
    hard:[
      {type:'quiz',q:'En el test de isquemia del antebrazo de un paciente con enfermedad de McArdle, ¿qué resultado se espera?',opts:['Ausencia de aumento de lactato venoso con elevación normal de amoniaco','Aumento de lactato y descenso de amoniaco','Ausencia de aumento de amoniaco','Aumento excesivo de glucosa venosa'],ans:0,pts:30},
      {type:'fill',q:'Proteína que nuclea la síntesis de glucógeno, actuando como cebador glucoproteico para la glucógeno sintasa',a:'glucogenina',pts:22},
      {type:'trueFalse',items:[{t:'La glucógeno sintasa muscular es activada por insulina (desfosforilación) y alostéricamente por glucosa-6-fosfato',a:true},{t:'Durante un sprint anaeróbico máximo, el glucógeno muscular puede agotarse en 10-15 minutos',a:true},{t:'La glucosa-6-fosfatasa está presente en músculo esquelético permitiendo liberar glucosa al plasma',a:false}],pts:28},
    ],
  },
  myoglobin:{
    easy:[
      {type:'quiz',q:'¿Cuál es la función principal de la mioglobina en la fibra muscular?',opts:['Almacenar O₂ intracelular y facilitar su difusión a las mitocondrias','Transportar O₂ en la sangre','Almacenar hierro de reserva para síntesis de hemoglobina','Sintetizar ATP por oxidación del Fe²⁺'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La mioglobina es monomérica (1 subunidad) mientras la hemoglobina es tetramérica',a:true},{t:'La mioglobina tiene mayor afinidad por el O₂ que la hemoglobina (P50 más bajo)',a:true},{t:'Las fibras musculares blancas (tipo IIb, glucolíticas) tienen alta concentración de mioglobina',a:false}],pts:8},
      {type:'fill',s:'La ___ muscular (orina oscura) ocurre cuando la mioglobina se libera al plasma por rabdomiólisis (rotura de fibras) y es filtrada por el riñón.',words:['mioglobinuria','hemoglobinuria','proteinuria'],cor:'mioglobinuria',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué la mioglobina presenta una curva de disociación de O₂ hiperbólica en vez de sigmoide como la hemoglobina?',opts:['Es monomérica: no hay cooperatividad entre subunidades','Tiene un tipo diferente de hierro hemo','Su P50 es mayor que el de la hemoglobina','Tiene mayor afinidad por CO₂'],ans:0,pts:20},
      {type:'fill',s:'La ___ sérica es el marcador más precoz de infarto de miocardio (se detecta a las 2h del inicio), aunque tiene baja especificidad cardíaca.',words:['mioglobina','troponina I','CK-MB'],cor:'mioglobina',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el P50 de la mioglobina y qué significa para su función en el músculo?',opts:['~2.8 mmHg: solo cede O₂ en hipoxia severa local → actúa como reserva, no como transportador','~26 mmHg: igual que hemoglobina','~50 mmHg: cede O₂ en condiciones normales','~1 mmHg: no cede O₂'],ans:0,pts:30},
      {type:'fill',q:'En cetáceos y mamíferos de buceo la concentración de mioglobina muscular es 10-30 veces mayor que en humanos, permitiendo apneas prolongadas. ¿Qué carga superficial impide la agregación de mioglobina a concentraciones tan altas?',a:'carga positiva (histidinas en la superficie)',pts:22},
      {type:'trueFalse',items:[{t:'La difusión facilitada de O₂ por mioglobina es significativa: puede duplicar el flujo de O₂ a las mitocondrias',a:true},{t:'La carboxi-mioglobina (Mb-CO) no puede ceder O₂, similar a la carboxi-hemoglobina en intoxicación por CO',a:true},{t:'La troponina I cardíaca tiene mayor sensibilidad y especificidad para IAM que la mioglobina',a:true}],pts:28},
    ],
  },
  neuromuscular_jn:{
    easy:[
      {type:'quiz',q:'¿Qué neurotransmisor se libera en la unión neuromuscular para activar la fibra muscular?',opts:['Acetilcolina','Noradrenalina','Serotonina','GABA'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El potencial de placa terminal (EPP) siempre supera el umbral de disparo → siempre genera un PA muscular',a:true},{t:'La acetilcolinesterasa (AChE) degrada rápidamente la ACh en la hendidura sináptica terminando la señal',a:true},{t:'Una sola motoneurona siempre inerva una sola fibra muscular',a:false}],pts:8},
      {type:'fill',s:'La ___ es la región postsináptica de la fibra muscular con alta densidad de receptores nicotínicos de acetilcolina (AChR).',words:['placa motora','cisterna terminal','zona H'],cor:'placa motora',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿En qué enfermedad autoinmune se producen anticuerpos anti-AChR que bloquean la unión neuromuscular?',opts:['Miastenia gravis','Esclerosis lateral amiotrófica','Síndrome de Guillain-Barré','Enfermedad de Lambert-Eaton'],ans:0,pts:20},
      {type:'fill',s:'La ___ inhibe la acetilcolinesterasa, aumentando la vida media de ACh en la hendidura sináptica: tratamiento sintomático de la miastenia gravis.',words:['piridostigmina','vecuronio','succinilcolina'],cor:'piridostigmina',pts:15},
      {type:'sequence',items:['PA llega al terminal axónico de la motoneurona','Apertura de canales Ca²⁺ voltaje-dependientes (VGCC)','Fusión de vesículas sinápticas (maquinaria SNARE) → exocitosis ACh','ACh se une al AChR nicotínico de la placa motora','Apertura del canal → entrada Na⁺ → despolarización EPP','Generación de PA muscular → contracción'],pts:25},
    ],
    hard:[
      {type:'quiz',q:'¿Cuál es el mecanismo del síndrome miasténico de Lambert-Eaton?',opts:['Anticuerpos anti-VGCC presinápticos → menos exocitosis de ACh','Anticuerpos anti-AChR postsinápticos (igual que miastenia gravis)','Inhibición irreversible de acetilcolinesterasa','Defecto genético en proteínas SNARE'],ans:0,pts:30},
      {type:'fill',q:'Toxina bacteriana que cliva proteínas SNARE del terminal axónico de la UNM impidiendo la exocitosis de ACh, causando parálisis flácida descendente',a:'toxina botulínica',pts:22},
      {type:'trueFalse',items:[{t:'La timectomía mejora la miastenia gravis porque el timo es el origen de los linfocitos B que producen anticuerpos anti-AChR',a:true},{t:'El vecuronio y el rocuronio son bloqueadores neuromusculares no despolarizantes que compiten con ACh en AChR',a:true},{t:'La succinilcolina produce parálisis flácida porque es un agonista no despolarizante de AChR',a:false}],pts:28},
    ],
  },

  // === TCELL ================================================================
  tcell_membrane:{
    easy:[
      {type:'quiz',q:'¿Cómo se llama el receptor específico de antígeno del linfocito T?',opts:['TCR (receptor de células T)','BCR (receptor de células B)','MHC-II','CD28'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El TCR reconoce péptidos antigénicos presentados sobre moléculas MHC (no antígenos libres)',a:true},{t:'CD4 y CD8 son coreceptores del TCR que aumentan la señalización',a:true},{t:'El TCR puede reconocer antígenos libres en sangre sin necesidad de MHC',a:false}],pts:8},
      {type:'fill',s:'El ___ es el receptor que reconoce específicamente péptidos presentados por MHC en la superficie del linfocito T.',words:['TCR','BCR','TLR'],cor:'TCR',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proteína ancla constitutivamente a Lck (src quinasa) a la membrana del linfocito T helper?',opts:['CD4 (mediante motivo palmitoilado)','CD3ζ','ZAP-70','LAT'],ans:0,pts:20},
      {type:'fill',s:'La ___ del linfocito T es la zona organizada de contacto entre el linfocito T y la célula presentadora de antígeno.',words:['sinapsis inmunológica','hendidura sináptica','placa motora'],cor:'sinapsis inmunológica',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Por qué el superagonista anti-CD28 TGN1412 causó reacciones adversas graves en 2006?',opts:['Activó policlonalmente todos los T (sin señal TCR): tormenta de citocinas','Inhibió el TCR bloqueando la tolerancia','Activó solo CTL generando HLH','Destruyó CD4+ causando SCID transitoria'],ans:0,pts:30},
      {type:'fill',q:'Terapia que inserta un receptor quimérico (ScFv fusionado a dominios CD3ζ+CD28 o 4-1BB) en linfocitos T del paciente para tratar leucemias y linfomas',a:'CAR-T',pts:22},
      {type:'trueFalse',items:[{t:'El TCR es heterodímero αβ (o γδ) con dominios variables V generados por recombinación V(D)J',a:true},{t:'La diversidad del TCR (10^15-18 especificidades) se genera por recombinación somática + adiciones P/N en las uniones',a:true},{t:'Las células CAR-T mantienen el TCR endógeno activo para aumentar la eficacia antitumoral',a:false}],pts:28},
    ],
  },
  nucleus_t:{
    easy:[
      {type:'quiz',q:'¿Qué factor de transcripción transloca al núcleo del linfocito T tras la señalización del TCR y activa la producción de IL-2?',opts:['NFAT (factor nuclear de células T activadas)','NF-κB','p53','STAT3'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La ciclosporina A inhibe la activación de NFAT al bloquear la calcineurina',a:true},{t:'El núcleo del linfocito T ocupa la mayoría del volumen celular (~85%)',a:true},{t:'La activación del linfocito T comprime la cromatina (la hace más densa)',a:false}],pts:8},
      {type:'fill',s:'La ___ es una fosfatasa que desfosforila NFAT permitiendo su entrada al núcleo. Es inhibida por ciclosporina A y tacrolimus.',words:['calcineurina','calmodulina','caspasa-3'],cor:'calcineurina',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué malignidad proliferativa se produce cuando los precursores de linfocitos T del timo proliferan de forma descontrolada?',opts:['Leucemia linfocítica aguda T (LLA-T)','Linfoma difuso de células B grandes','Leucemia mieloide crónica','Mieloma múltiple'],ans:0,pts:20},
      {type:'fill',s:'El factor de transcripción ___, activado por PKC (vía DAG), controla la supervivencia y la proliferación del linfocito T activado.',words:['NF-κB','NFAT','AP-1'],cor:'NF-κB',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué mecanismo molecular explica la mayor rapidez de respuesta de los linfocitos T memoria respecto a los naive?',opts:['Cromatina más abierta en loci de citocinas y mayor accesibilidad a factores de transcripción','Mayor número de TCR en membrana','Mitocondrias más numerosas','Gránulos líticos preformados en mayor cantidad'],ans:0,pts:30},
      {type:'fill',q:'Combinación de inhibidores de calcineurina usados en trasplante de órganos sólidos que bloquean NFAT impidiendo la producción de IL-2',a:'ciclosporina/tacrolimus',pts:22},
      {type:'trueFalse',items:[{t:'NFAT requiere ser desfosforilado en múltiples residuos serina para exponer su señal de localización nuclear (NLS)',a:true},{t:'AP-1 (FOS+JUN) se activa por la vía Ras-ERK downstream del TCR y coopera con NFAT para activar el promotor de IL-2',a:true},{t:'Los inhibidores BET/BRD4 (JQ1) reducen la expresión de c-Myc y bloquean la proliferación de T leucémicos',a:true}],pts:28},
    ],
  },
  nucleolus_t:{
    easy:[
      {type:'quiz',q:'¿Qué cambio ocurre en el nucléolo del linfocito T cuando se activa?',opts:['Se agranda por aumento de síntesis de ribosomas','Desaparece por condensación de la cromatina','Se fragmenta en múltiples nucléolos pequeños','No cambia de tamaño'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El nucléolo es el sitio de síntesis de ARN ribosómico (ARNr) y ensamblado de subunidades ribosómicas',a:true},{t:'El oncogén c-Myc activa la transcripción del ARNr y la nucleologénesis',a:true},{t:'El nucléolo tiene una membrana propia que lo separa del nucleoplasma',a:false}],pts:8},
      {type:'fill',s:'El ___ activa la transcripción de ARNr (ARN polimerasa I) cuando el linfocito T se activa, enlargeciendo el nucléolo.',words:['c-Myc','p53','PTEN'],cor:'c-Myc',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué el tamaño del nucléolo es un criterio diagnóstico en linfomas T?',opts:['Los linfomas agresivos tienen alta síntesis proteica con nucléolos prominentes','El nucléolo se fusiona con la membrana nuclear en tumores','El nucléolo expresa CD20 detectable por IHQ','Los linfomas indolentes tienen nucleolos gigantes'],ans:0,pts:20},
      {type:'fill',s:'Los inhibidores ___ (JQ1, I-BET762) suprimen c-Myc y la transcripción de ARNr, reduciendo la nucleologénesis en linfomas T agresivos.',words:['BET/BRD4','HDAC','mTOR'],cor:'BET/BRD4',pts:15},
    ],
    hard:[
      {type:'fill',q:'Enzima (ARN polimerasa) que transcribe el ADNr repetitivo en el nucleolo para producir el pre-ARNr 45S precursor de los ARNr 28S, 18S y 5.8S',a:'ARN polimerasa I',pts:22},
      {type:'trueFalse',items:[{t:'El nucleolo desaparece durante la mitosis y se reorganiza en G1 alrededor de las NOR (regiones organizadoras del nucleolo)',a:true},{t:'mTORC1 (diana de rapamicina) activa la síntesis de ARNr aumentando la biogénesis de ribosomas',a:true},{t:'La rapamicina (everolimus) suprime la síntesis de ARNr y la nucleologénesis: mecanismo parcial de su efecto inmunosupresor',a:true}],pts:28},
      {type:'quiz',q:'¿Qué componente estructural del nucleolo se asocia directamente a las NOR (regiones organizadoras) en los cromosomas 13-15, 21, 22?',opts:['Componente fibrilar central (FC)','Componente granular (GC)','Cromatina perinucleolar','Lámina nuclear'],ans:0,pts:30},
    ],
  },
  tcr_cd3:{
    easy:[
      {type:'quiz',q:'¿Cuántos ITAMs (immunoreceptor tyrosine-based activation motifs) tienen las cadenas CD3ζ del complejo TCR-CD3?',opts:['3 ITAMs por cadena (6 tirosinas activadoras)','1 ITAM','6 ITAMs','Solo 2 tirosinas totales'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El complejo CD3 transsduce la señal del TCR porque las cadenas CD3 tienen colas citosólicas largas con ITAMs, a diferencia del TCR',a:true},{t:'El TCR puede reconocer antígenos solubles en plasma sin presentación por MHC',a:false},{t:'Los linfocitos T citotóxicos (CTL) expresan TCR + CD8 (reconocen pMHC-I) mientras que los T helper expresan TCR + CD4 (pMHC-II)',a:true}],pts:8},
      {type:'fill',s:'El TCR αβ reconoce ___ (péptido unido a MHC) presentados en la superficie de células presentadoras de antígeno.',words:['complejos pMHC','antígenos libres','glicoproteínas'],cor:'complejos pMHC',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es el paso inmediatamente posterior a que Lck fosforile los ITAMs de CD3ζ?',opts:['ZAP-70 se une vía tándem SH2 a los ITAMs difosforilados y se activa','CD28 se une a B7 en la CPA','NFAT entra al núcleo','Ca²⁺ entra por canales CRAC'],ans:0,pts:20},
      {type:'fill',s:'La recombinación ___ de los genes del TCR (similar a la de las inmunoglobulinas) genera la enorme diversidad de ~10^18 especificidades distintas.',words:['V(D)J','homóloga','NHEJ'],cor:'V(D)J',pts:15},
      {type:'sequence',items:['pMHC se une al TCR αβ','Lck (unida a CD4/CD8) fosforila ITAMs de CD3ζ','ZAP-70 une ITAMs difosforilados vía tándem SH2','ZAP-70 fosforila LAT (Y136) y SLP-76','PLCγ1 reclutada a LAT → produce IP3 y DAG','IP3 → Ca²⁺ del RE → calcineurina → NFAT nuclear → IL-2'],pts:25},
    ],
    hard:[
      {type:'quiz',q:'¿Por qué el síndrome de Omenn (mutación hipomórfica en RAG1/2) cursa con SCID autoinmune en lugar de la SCID "vacía" clásica?',opts:['RAG1/2 hipomórfico genera un repertorio TCR muy restringido que reconoce autoantígenos (autoinmunidad oligoclonal)','RAG1/2 hipomórfico impide la expresión de CD3','Bloquea solo la recombinación del BCR no del TCR','Genera TCR con alta afinidad por MHC sin péptido'],ans:0,pts:30},
      {type:'fill',q:'Tipo de célula terapéutica en la que se reemplaza el TCR endógeno por un receptor quimérico (ScFv-CD3ζ) para redirigir la citotoxicidad contra tumores',a:'célula CAR-T',pts:22},
      {type:'trueFalse',items:[{t:'La señal TCR sola (sin coestimulación CD28) puede inducir anergia clonal en lugar de activación',a:true},{t:'Los TCR γδ reconocen antígenos lipídicos presentados por CD1, no por MHC clásicos',a:true},{t:'El complejo TCR-CD3 es internalizado y degradado tras la activación (downregulation) como mecanismo de retroalimentación negativa',a:true}],pts:28},
    ],
  },
  immune_synapse:{
    easy:[
      {type:'quiz',q:'¿Cómo se llama la zona central de la sinapsis inmunológica donde se concentran los complejos TCR-pMHC?',opts:['cSMAC (supramolecular activation cluster central)','pSMAC','dSMAC','zona de exclusión'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La sinapsis inmunológica se forma entre el linfocito T y la célula presentadora de antígeno (CPA)',a:true},{t:'En el CTL, los gránulos líticos se liberan hacia el cSMAC de forma direccional (no bystander)',a:true},{t:'El pSMAC contiene los complejos TCR activos y es el anillo exterior de la sinapsis',a:false}],pts:8},
      {type:'fill',s:'En la sinapsis inmunológica, el ___ externo (pSMAC) está enriquecido en LFA-1 y actina, mientras el central (cSMAC) concentra TCR y PKCθ.',words:['anillo periférico','núcleo central','dominio flotante'],cor:'anillo periférico',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué orgánulo celular del linfocito T se polariza hacia la sinapsis inmunológica para permitir la secreción direccional?',opts:['El Golgi y el MTOC (centrosoma)','El núcleo','Las mitocondrias','El RE liso'],ans:0,pts:20},
      {type:'fill',s:'La ___ se produce cuando la maquinaria de degranulación del CTL está defectuosa, impidiendo matar células diana → acumulación de células NK y macrófagos activados → inflamación sistémica fatal.',words:['linfohistiocitosis hemofagocítica','agranulocitosis','aplasia medular'],cor:'linfohistiocitosis hemofagocítica',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué función tiene el dSMAC (zona más periférica de la IS) con respecto a la señalización del TCR?',opts:['Concentra CD45 (fosfatasa) que termina la señal: zona de atenuación','Concentra TCR activos para amplificar la señal','Es el sitio de exocitosis de gránulos líticos','No tiene función conocida'],ans:0,pts:30},
      {type:'fill',q:'Anticuerpo biespecífico anti-CD19/anti-CD3 aprobado para leucemia linfoblástica aguda B que crea una sinapsis inmunológica artificial entre CTL y célula tumoral',a:'blinatumomab',pts:22},
      {type:'trueFalse',items:[{t:'Los microclusters de TCR se forman en la periferia de la IS y se mueven centrípetamente hacia el cSMAC donde son ubiquitinados y degradados',a:true},{t:'La IS del linfocito T helper dirige IL-4 e IFN-γ hacia la célula diana de la misma forma que la IS citotóxica dirige la perforina',a:false},{t:'DOCK8 es necesario para la formación de la IS estable: su deficiencia causa inmunodeficiencia con defecto en respuesta CTL',a:true}],pts:28},
    ],
  },
  mito_t:{
    easy:[
      {type:'quiz',q:'¿Cómo cambia el metabolismo energético del linfocito T naive cuando se activa?',opts:['Pasa de OXPHOS (eficiente) a glucólisis aeróbica (Warburg, rápida)','Pasa de glucólisis a OXPHOS','No cambia: siempre usa OXPHOS','Activa la β-oxidación de ácidos grasos'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los linfocitos T memoria tienen alta spare respiratory capacity (SRC) mitocondrial: responden rápido al reencuentro antigénico',a:true},{t:'La mitocondria del linfocito T regula la apoptosis intrínseca vía citocromo c → caspasa-9',a:true},{t:'Los linfocitos T activados consumen principalmente ácidos grasos como combustible energético',a:false}],pts:8},
      {type:'fill',s:'El efecto ___ describe el uso de glucólisis aeróbica (en presencia de O₂) por las células en proliferación rápida, como los linfocitos T activados.',words:['Warburg','Pasteur','Crabtree'],cor:'Warburg',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué kinasa activa la glucólisis aeróbica en linfocitos T activados, y es inhibida por rapamicina?',opts:['mTORC1','AMPK','PKC','Lck'],ans:0,pts:20},
      {type:'fill',s:'Los linfocitos T ___ en infecciones crónicas o cáncer tienen mitocondrias disfuncionales, alta expresión de PD-1 y producen poco IFN-γ e IL-2.',words:['exhausted (agotados)','naive','reguladores'],cor:'exhausted (agotados)',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Por qué los inhibidores de checkpoint (anti-PD-1) solo revierten parcialmente el agotamiento de los T exhausted?',opts:['Solo revierten el agotamiento epigenético superficial; el agotamiento profundo (disfunción mitocondrial y remodelado cromatínico) persiste','Bloquean el receptor PD-L1 en el tumor pero no en el T','Activan NK en lugar de CTL','Solo funcionan en linfomas no sólidos'],ans:0,pts:30},
      {type:'fill',q:'Factor transcripcional maestro de la biogénesis mitocondrial en linfocitos T que es activado por el ejercicio físico y la restricción calórica',a:'PGC-1α',pts:22},
      {type:'trueFalse',items:[{t:'Los linfocitos T memoria central (TCM) usan principalmente OXPHOS y β-oxidación, mientras los efectores terminales (TEFF) usan glucólisis',a:true},{t:'La metformina puede reprogramar linfocitos T hacia un fenotipo memoria al inhibir mTORC1 y promover OXPHOS',a:true},{t:'La disfunción mitocondrial en T exhausted puede revertirse completamente con anti-PD-1 en todos los pacientes',a:false}],pts:28},
    ],
  },
  mito_t2:{
    easy:[
      {type:'quiz',q:'¿Qué función tienen las ROS mitocondriales (especies reactivas de oxígeno) en el linfocito T activado?',opts:['Actúan como segundos mensajeros que activan NF-κB y la proliferación','Solo dañan el ADN mitocondrial','Inhiben la señalización del TCR','Inducen apoptosis del linfocito T'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'La fisión mitocondrial (vía DRP1) favorece el metabolismo glucolítico en T efectores',a:true},{t:'Las mitocondrias de los linfocitos T forman redes dinámicas que se fusionan y fisionan según el estado de activación',a:true},{t:'Las mitocondrias del linfocito T son estáticas e independientes del estado de activación',a:false}],pts:8},
      {type:'fill',s:'La ___ mitocondrial (vía MFN1/2) favorece el metabolismo oxidativo (OXPHOS) y es característica de los linfocitos T memoria.',words:['fusión','fisión','fragmentación'],cor:'fusión',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Cómo contribuye la glutamina al metabolismo del linfocito T activado además de como fuente de nitrógeno?',opts:['Entra en el ciclo de Krebs como α-cetoglutarato (anaplerósis) para síntesis de nucleótidos y lípidos','Solo se usa para síntesis de proteínas','Alimenta directamente la glucólisis como piruvato','Inhibe mTORC1'],ans:0,pts:20},
      {type:'fill',s:'La ___ (AMP quinasa) actúa como sensor energético: se activa con bajo ATP y promueve OXPHOS inhibiendo mTORC1 y la glucólisis en linfocitos T.',words:['AMPK','mTORC1','PKCθ'],cor:'AMPK',pts:15},
    ],
    hard:[
      {type:'fill',q:'Proceso de degradación selectiva de mitocondrias dañadas en linfocitos T, esencial para mantener la función CTL y evitar la acumulación de mitocondrias proinflamatorias',a:'mitofagia',pts:22},
      {type:'trueFalse',items:[{t:'IRGM es un regulador de mitofagia en linfocitos T cuyas variantes polimórficas se asocian a enfermedad de Crohn',a:true},{t:'Los linfocitos T gamma-delta (γδ) dependen más de la glucólisis que los αβ: son los primeros en responder a infecciones',a:true},{t:'El tratamiento con antioxidantes N-acetilcisteína aumenta siempre la función CTL al neutralizar las ROS señalizadoras',a:false}],pts:28},
      {type:'quiz',q:'¿Por qué los tumores con alta demanda glucolítica (Warburg tumoral) inhiben la función de los T infiltrantes de tumor (TIL)?',opts:['Compiten por la glucosa creando un microambiente glucopénico que impide la glucólisis del CTL','Expresan PD-L1 directamente en los ribosomas','Secretan TGF-β que destruye mitocondrias del CTL','Ninguna de las anteriores'],ans:0,pts:30},
    ],
  },
  er_t:{
    easy:[
      {type:'quiz',q:'¿Qué segundo mensajero liberado del RE del linfocito T activa la calcineurina → NFAT → IL-2?',opts:['Ca²⁺ (liberado por IP3 del RE)','DAG (activa PKC)','PIP3','cAMP'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El RE del linfocito T almacena Ca²⁺ que se libera al citoplasma cuando el TCR se activa',a:true},{t:'STIM1 detecta el vaciamiento del RE y activa los canales Orai1 en el sarcolema para entrada sostenida de Ca²⁺',a:true},{t:'La señalización de Ca²⁺ del RE es innecesaria para la activación del linfocito T si está la señal de CD28',a:false}],pts:8},
      {type:'fill',s:'La ___ es la fosfatasa que desfosforila NFAT después de que el Ca²⁺ del RE sube en el citoplasma del linfocito T activado.',words:['calcineurina','calmodulina quinasa','caspasa-3'],cor:'calcineurina',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué fenómeno ocurre cuando el RE del linfocito T se vacía de Ca²⁺ tras la señal del TCR?',opts:['SOCE (store-operated Ca²⁺ entry): STIM1 oligomeriza y activa Orai1 → entrada de Ca²⁺ extracelular sostenida','El RE se regenera inmediatamente sin necesidad de Ca²⁺ externo','La SERCA se activa y recapta todo el Ca²⁺ del citoplasma','No ocurre nada especial'],ans:0,pts:20},
      {type:'fill',s:'Las mutaciones en ___ o en ___ causan SCID (inmunodeficiencia combinada severa) por fallo completo en la señalización de Ca²⁺ de los linfocitos T y B.',words:['STIM1 / Orai1','IP3R / SERCA','calcineurina / NFAT'],cor:'STIM1 / Orai1',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Por qué el tacrolimus (FK506) es más potente que la ciclosporina A como inmunosupresor a pesar de actuar en el mismo punto?',opts:['FK506 tiene mayor afinidad por su inmunofilina (FKBP12) y el complejo FKBP12-FK506 inhibe calcineurina con mayor potencia','FK506 bloquea también ZAP-70','FK506 actúa upstream del Ca²⁺ bloqueando el IP3R','FK506 bloquea tanto NFAT como NF-κB'],ans:0,pts:30},
      {type:'fill',q:'Canal de Ca²⁺ altamente selectivo de la membrana del linfocito T formado por Orai1 que se activa por el vaciamiento del RE vía STIM1',a:'CRAC (canal activado por vaciamiento del RE)',pts:22},
      {type:'trueFalse',items:[{t:'El calcio del RE activa calmodulina, que activa calcineurina (fosfatasa) y también calmodulina quinasa (CaMKII)',a:true},{t:'Los bloqueadores del canal CRAC (CM4620, Synta66) se estudian para artritis reumatoide y asma severa',a:true},{t:'La señalización de Ca²⁺ en linfocitos T es idéntica a la de neuronas en cuanto a IP3R, SERCA y SOCE',a:false}],pts:28},
    ],
  },
  golgi_t:{
    easy:[
      {type:'quiz',q:'¿Hacia dónde se polariza el aparato de Golgi del linfocito T citotóxico al formar la sinapsis inmunológica?',opts:['Hacia la sinapsis inmunológica (zona de contacto con la célula diana)','Hacia el núcleo','Hacia el polo opuesto a la diana','Se fragmenta durante la activación'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El Golgi del CTL se reorienta hacia la IS junto con el MTOC (centrosoma) en <30 minutos tras el reconocimiento antigénico',a:true},{t:'La polarización del Golgi permite la secreción de perforina/granzimas solo hacia la célula diana (no bystander)',a:true},{t:'En linfocitos T helpers, el Golgi también se polariza hacia la sinapsis para secretar citocinas dirigidas',a:true}],pts:8},
      {type:'fill',s:'El ___ se reorienta junto con el Golgi hacia la sinapsis inmunológica, sirviendo como punto de organización del tráfico vesicular hacia la diana.',words:['MTOC (centrosoma)','núcleo','RE rugoso'],cor:'MTOC (centrosoma)',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proteína mediadora de la fisión vesicular del Golgi es defectuosa en el síndrome de Hermansky-Pudlak tipo 2 (HPS2)?',opts:['Complejo adaptador AP-3 (tráfico de gránulos líticos)','Clatrina','Dinamina','SNAP23'],ans:0,pts:20},
      {type:'fill',s:'La ___ hemofagocítica (HLH) es una consecuencia fatal de defectos en la polarización del Golgi o degranulación: los CTL no matan y la inflamación es incontrolada.',words:['linfohistiocitosis','hemólisis','granulomatosis'],cor:'linfohistiocitosis',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Qué proteína del SNARE del Golgi (requerida para la fusión de gránulos líticos con la membrana plasmática en la IS) está mutada en la HLH tipo 4?',opts:['Sintaxina-11 (STX11)','SNAP23','VAMP7','NSF'],ans:0,pts:30},
      {type:'fill',q:'Proceso de reorientación del centrosoma y el Golgi hacia la zona de contacto con la célula diana, impulsado por señales de PKCθ y Ca²⁺',a:'polarización del MTOC',pts:22},
      {type:'trueFalse',items:[{t:'Las células CAR-T con capacidad de polarización del MTOC/Golgi deteriorada tienen menor actividad citolítica in vivo',a:true},{t:'La PKCθ (isoforma exclusiva del linfocito T) es necesaria para la polarización del MTOC hacia la IS',a:true},{t:'En el linfocito T helper la secreción de IL-4 e IL-10 es no polarizada (difusa, no dirigida hacia la CPA)',a:false}],pts:28},
    ],
  },
  cytotox_granule:{
    easy:[
      {type:'quiz',q:'¿Qué proteína del gránulo citotóxico forma poros en la membrana de la célula diana para permitir la entrada de las granzimas?',opts:['Perforina','Granzima B','FasL','Granulisina'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Los gránulos citotóxicos contienen perforina y granzimas que inducen apoptosis en la célula diana',a:true},{t:'La perforina forma poros en la membrana de la célula diana a pH neutro (no a pH ácido del gránulo)',a:true},{t:'Los gránulos citotóxicos se liberan de forma difusa (bystander) hacia todas las células vecinas',a:false}],pts:8},
      {type:'fill',s:'La ___ B es una serina proteasa del gránulo citotóxico que, una vez en la célula diana, cliva BID → tBID activando la vía intrínseca de apoptosis.',words:['granzima','perforina','catalasa'],cor:'granzima',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Qué proteína de membrana del gránulo (LAMP-1/CD107a) se expresa en la superficie del CTL tras la degranulación y es marcador de función citotóxica?',opts:['CD107a (LAMP-1)','CD95 (Fas)','CD56','CD16'],ans:0,pts:20},
      {type:'fill',s:'La ___ hemofagocítica familiar tipo 2 (FHL2) se debe a mutaciones en la ___ y cursa con fiebre, hepatoesplenomegalia y pancitopenia.',words:['linfohistiocitosis / PRF1 (perforina)','neutropenia / RAG1','aplasia / GATA2'],cor:'linfohistiocitosis / PRF1 (perforina)',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cómo se protege el propio CTL de la perforina que libera hacia la diana?',opts:['Clusterina y CD59 en la membrana del CTL inactivan la perforina antes de que forme poros en el CTL mismo','El CTL secreta inhibidores de serina proteasas','La perforina no puede actuar a temperatura fisiológica sobre el CTL','El CTL expresa un LAMP-1 que neutraliza la perforina'],ans:0,pts:30},
      {type:'fill',q:'Proteína codificada por UNC13D cuyas mutaciones causan HLH tipo 3: es necesaria para la preparación (priming) de los gránulos líticos para la exocitosis',a:'Munc13-4',pts:22},
      {type:'trueFalse',items:[{t:'Los tumores con sobreexpresión de BCL-2/BCL-XL son resistentes a la granzima B (que actúa via BID/mitocondria) pero NO a la granzima A (vía SET/DNasa)',a:true},{t:'El "serial killing" del CTL: libera gránulos hacia una diana, se separa vivo, regenera gránulos y ataca otra célula',a:true},{t:'La perforina se produce constitutivamente en CTL naive y no requiere activación para su síntesis',a:false}],pts:28},
    ],
  },
  cytotox_granule2:{
    easy:[
      {type:'quiz',q:'¿Qué proteína del segundo gránulo citotóxico activa una vía de apoptosis independiente de caspasas mediante el complejo SET?',opts:['Granzima A','Granzima B','Perforina','Granulisina'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'El CTL puede matar múltiples células diana de forma secuencial (serial killing) regenerando gránulos líticos entre cada muerte',a:true},{t:'La granzima A activa la DNasa NM23-H1 del complejo SET causando cortes de ADN monocatenario',a:true},{t:'Los gránulos citotóxicos 1 y 2 del CTL se liberan simultáneamente hacia todas las células vecinas',a:false}],pts:8},
      {type:'fill',s:'El ___ mide la degranulación del CTL expresando LAMP-1 (CD107a) en superficie; se usa para evaluar la función citotóxica en inmunoterapia y diagnóstico de HLH.',words:['test de CD107a','ELISA de perforina','test de proliferación'],cor:'test de CD107a',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Por qué los tumores con alta expresión de BCL-2 (como el linfoma folicular) son resistentes a los CTL pero responden a venetoclax?',opts:['BCL-2 bloquea la vía mitocondrial (apoptosis intrínseca) que usa la granzima B; venetoclax inhibe BCL-2 directamente','BCL-2 degrada la perforina extracelularmente','BCL-2 impide la formación de la IS','BCL-2 expulsa la granzima B del citoplasma'],ans:0,pts:20},
      {type:'fill',s:'La ___ es el gen mutado en la HLH familiar tipo 5 (FHL5), codifica una proteína SNARE requerida para la fusión de los gránulos líticos con la membrana plasmática.',words:['STX11 (sintaxina-11)','RAB27A','PRF1'],cor:'STX11 (sintaxina-11)',pts:15},
    ],
    hard:[
      {type:'fill',q:'Resultado esperado al medir CD107a por citometría de flujo en CTL estimulados in vitro de un paciente con HLH familiar (FHL2 por mutación en perforina)',a:'CD107a aumentado (degranulación normal) pero muerte celular reducida',pts:22},
      {type:'trueFalse',items:[{t:'La granzima B puede activar caspasa-3 directamente (sin necesidad de la vía mitocondrial) en células con poco XIAP',a:true},{t:'La granulisina del gránulo citotóxico tiene actividad antibacteriana y antifúngica directa además de ser citotóxica',a:true},{t:'Los CTL CD8+ usan exclusivamente perforina/granzima para matar; el FasL no contribuye a la citotoxicidad T',a:false}],pts:28},
      {type:'quiz',q:'¿Cuál es el mecanismo por el que RAB27A (mutado en HLH tipo 6 / síndrome de Griscelli) causa defecto en la degranulación del CTL?',opts:['RAB27A acopla los gránulos líticos a la red de actina subcortical para su transporte hasta la IS','RAB27A sintetiza perforina en el RE','RAB27A degrada granzimas en el lisosoma','RAB27A es un sensor de Ca²⁺ que activa la exocitosis'],ans:0,pts:30},
    ],
  },
  lck_signaling:{
    easy:[
      {type:'quiz',q:'¿Cuál es el orden correcto de activación en la señalización proximal del TCR?',opts:['TCR une pMHC → Lck fosforila ITAMs → ZAP-70 se activa → LAT fosforilado → PLCγ','TCR → ZAP-70 → Lck → LAT','Lck → TCR → LAT → ZAP-70','CD28 → Lck → TCR → ZAP-70'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'Lck es una tirosina quinasa de la familia Src que se asocia constitutivamente a CD4 o CD8',a:true},{t:'ZAP-70 tiene dos dominios SH2 en tándem que se unen al di-ITAM fosforilado de CD3ζ',a:true},{t:'La señalización del TCR puede completarse sin necesidad de Lck si hay suficiente ZAP-70',a:false}],pts:8},
      {type:'fill',s:'Lck fosforila las ___ de las cadenas CD3ζ del complejo TCR, creando sitios de unión para ZAP-70 e iniciando la cascada de activación del linfocito T.',words:['ITAMs','SH2','dominios PH'],cor:'ITAMs',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la consecuencia de la mutación en ZAP-70 humana (deficiencia)?',opts:['SCID con CD4+ presentes pero sin CD8+ funcionales','SCID combinada sin T ni B','Déficit exclusivo de linfocitos B','Solo afecta a NKT'],ans:0,pts:20},
      {type:'fill',s:'La ___ (LAT) es el adaptador transmembrana que fosforilado por ZAP-70 recluta PLCγ1, GRB2/SOS (Ras) y PI3K para ramificar la señal del TCR.',words:['proteína LAT','proteína CD28','proteína CD45'],cor:'proteína LAT',pts:15},
    ],
    hard:[
      {type:'quiz',q:'¿Cómo discrimina el linfocito T entre un péptido propio (señal débil) y uno extraño (señal fuerte) usando la cinética del TCR y Lck?',opts:['Los ITAM monofosforilados (señal débil) reclutan SHP-1 → inhibición; los difosforilados (señal fuerte) reclutan ZAP-70 → activación','El TCR tiene afinidades intrínsecamente distintas por propio vs extraño','CD45 diferencia propio de extraño por fosforilación diferencial','La señal débil activa NFAT y la fuerte activa NF-κB'],ans:0,pts:30},
      {type:'fill',q:'Inhibidor aprobado de la quinasa Syk (homóloga de ZAP-70 en plaquetas y B cells) usado para trombocitopenia inmune crónica que también afecta señalización en T',a:'fostamatinib',pts:22},
      {type:'trueFalse',items:[{t:'La ganancia de función en ZAP-70 (mutación M493V en ratones) causa artritis autoinmune por hyperactivación de linfocitos T',a:true},{t:'CD45 es una fosfatasa de membrana del T cell que desfosforila el Y505 inhibidor de Lck manteniéndola activa',a:true},{t:'Inhibidores selectivos de Lck son actualmente el estándar de tratamiento en artritis reumatoide refractaria',a:false}],pts:28},
    ],
  },
  caspase_pathway:{
    easy:[
      {type:'quiz',q:'¿Cuál es la diferencia principal entre la citotoxicidad por perforina/granzima y la vía FasL del CTL?',opts:['Perforina/granzima: rápida (minutos), actúa aunque Fas esté ausente; FasL: más lenta (horas), requiere Fas+ en la diana','FasL es más rápida que perforina','Ambas son idénticas en cinética','FasL actúa solo en linfocitos B'],ans:0,pts:15},
      {type:'trueFalse',items:[{t:'FasL (CD95L) expresado en el CTL se une a Fas (CD95) en la célula diana desencadenando apoptosis extrínseca',a:true},{t:'La vía FasL/Fas es importante para eliminar linfocitos T activados al final de la respuesta inmune (homeostasis)',a:true},{t:'Las mutaciones en FAS no afectan la homeostasis del sistema inmune',a:false}],pts:8},
      {type:'fill',s:'La enfermedad ___ (ALPS) se produce por mutaciones en el gen FAS, impidiendo la apoptosis de linfocitos activados → linfoproliferación y autoanticuerpos.',words:['linfoproliferativa autoinmune','granulomatosa crónica','de DiGeorge'],cor:'linfoproliferativa autoinmune',pts:12},
    ],
    normal:[
      {type:'quiz',q:'¿Cuál es la función de FasL en la eliminación de linfocitos T activados al final de una respuesta inmune?',opts:['Los CTL activados expresan tanto Fas como FasL: la muerte fraticida elimina el exceso de T (AICD)','"Killer" NK matan a los CTL por FasL','Los macrófagos expresan FasL para eliminar T','La apoptosis de T al final depende solo de privación de citocinas'],ans:0,pts:20},
      {type:'fill',s:'La ___ es el complejo proteico que se forma tras la trimerización de Fas + FADD + procaspasa-8, iniciando la señal de apoptosis extrínseca.',words:['DISC (death-inducing signaling complex)','apoptosoma','necrosoma'],cor:'DISC (death-inducing signaling complex)',pts:15},
      {type:'sequence',items:['FasL trimérico (CTL) se une a Fas trimérico (diana)','Fas recluta FADD vía dominio de muerte (DD)','FADD recluta procaspasa-8 vía DED','Autoclivaje → caspasa-8 activa','Caspasa-8 cliva BID → tBID (vía mitocondrial amplificadora)','tBID activa BAX/BAK → citocromo c → caspasoma → caspasa-3 → apoptosis'],pts:25},
    ],
    hard:[
      {type:'quiz',q:'¿Por qué las células tipo II (hepatocitos, T) requieren la amplificación mitocondrial (BID/tBID) para completar la apoptosis por Fas?',opts:['En células tipo II la señal del DISC genera poco caspasa-8; necesitan amplificación via mitocondria para superar BCL-2/BCL-XL','En células tipo I el BCL-2 bloquea totalmente la vía extrínseca','La diferencia es solo cuantitativa, no cualitativa','Las células tipo II no expresan caspasa-3'],ans:0,pts:30},
      {type:'fill',q:'Síndrome hereditario de linfoproliferación y autoinmunidad causado por mutaciones en FAS con herencia autosómica dominante y penetrancia variable',a:'ALPS (síndrome linfoproliferativo autoinmune)',pts:22},
      {type:'trueFalse',items:[{t:'Venetoclax (inhibidor BCL-2) puede sensibilizar tumores resistentes a FasL/perforina al desbloquear la vía mitocondrial de apoptosis',a:true},{t:'Los anticuerpos agonistas de DR4/DR5 (receptores de TRAIL) inducen apoptosis extrínseca similar a FasL en tumores DR4/DR5+',a:true},{t:'La apoptosis inducida por FasL en los propios linfocitos T activados (fraticidio) es un mecanismo de autotolerancia periférica',a:true}],pts:28},
    ],
  },

};

// Function to get minigames for current difficulty
function getMG(orgId){
  const diff=GS.difficulty||'normal';
  const all=MINIGAMES_ALL[orgId];
  if(!all)return [];
  const e=all.easy||[];
  const n=all.normal||[];
  const h=all.hard||[];
  if(diff==='easy')return e;
  if(diff==='hard')return [...e,...n,...h];
  return [...e,...n];
}

