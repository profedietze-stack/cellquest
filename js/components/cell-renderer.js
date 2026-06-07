// CellQuest — Cell SVG Renderer
// drawCell, drawOrg, addOrgDetail + helpers
// ═══════════════ DRAW CELL ═══════════════
function drawCell(levelId, targetSvg){
  const svg=targetSvg||document.getElementById('cellSvg');svg.innerHTML='';
  const orgs=ORGANELLES[levelId]||[];
  if(!orgs.length){
    svg.innerHTML='<text x="270" y="255" fill="rgba(0,229,255,0.35)" text-anchor="middle" font-size="48">🚧</text><text x="270" y="300" fill="rgba(142,174,192,0.6)" text-anchor="middle" font-size="16" font-family="Nunito,sans-serif">Nivel en construcción</text><text x="270" y="325" fill="rgba(142,174,192,0.35)" text-anchor="middle" font-size="12" font-family="Nunito,sans-serif">Próximamente disponible</text>';
    return;
  }
  // defs
  const defs=svgEl('defs');
  // glow filter
  const f1=svgEl('filter',{id:'glow',x:'-30%',y:'-30%',width:'160%',height:'160%'});
  const fb=svgEl('feGaussianBlur',{stdDeviation:'3',result:'b'});
  const fm=svgEl('feMerge');fm.appendChild(svgEl('feMergeNode',{in:'b'}));fm.appendChild(svgEl('feMergeNode',{in:'SourceGraphic'}));
  f1.appendChild(fb);f1.appendChild(fm);defs.appendChild(f1);
  // gold glow
  const f2=svgEl('filter',{id:'glowGold',x:'-40%',y:'-40%',width:'180%',height:'180%'});
  const fb2=svgEl('feGaussianBlur',{stdDeviation:'5',result:'b'});
  const fm2=svgEl('feMerge');fm2.appendChild(svgEl('feMergeNode',{in:'b'}));fm2.appendChild(svgEl('feMergeNode',{in:'SourceGraphic'}));
  f2.appendChild(fb2);f2.appendChild(fm2);defs.appendChild(f2);
  // soft glow for organelles
  const f3=svgEl('filter',{id:'glowSoft',x:'-50%',y:'-50%',width:'200%',height:'200%'});
  const fb3=svgEl('feGaussianBlur',{stdDeviation:'8',result:'b'});
  const fco=svgEl('feComposite',{in:'SourceGraphic',in2:'b',operator:'over'});
  const fm3=svgEl('feMerge');fm3.appendChild(svgEl('feMergeNode',{in:'b'}));fm3.appendChild(svgEl('feMergeNode',{in:'SourceGraphic'}));
  f3.appendChild(fb3);f3.appendChild(fm3);defs.appendChild(f3);
  // cytoplasm radial gradient
  const rg=svgEl('radialGradient',{id:'cytoGrad',cx:'50%',cy:'50%',r:'50%'});
  const rs1=svgEl('stop',{offset:'0%','stop-color':'rgba(10,22,45,0.0)'});
  const rs2=svgEl('stop',{offset:'75%','stop-color':'rgba(6,15,30,0.0)'});
  const rs3=svgEl('stop',{offset:'100%','stop-color':'rgba(0,0,0,0.55)'});
  rg.appendChild(rs1);rg.appendChild(rs2);rg.appendChild(rs3);defs.appendChild(rg);
  // membrane inner glow gradient
  const mg=svgEl('radialGradient',{id:'memGrad',cx:'50%',cy:'50%',r:'50%'});
  const ms1=svgEl('stop',{offset:'0%','stop-color':'rgba(0,229,255,0.0)'});
  const ms2=svgEl('stop',{offset:'85%','stop-color':'rgba(0,229,255,0.0)'});
  const ms3=svgEl('stop',{offset:'100%','stop-color':'rgba(0,229,255,0.12)'});
  mg.appendChild(ms1);mg.appendChild(ms2);mg.appendChild(ms3);defs.appendChild(mg);
  svg.appendChild(defs);

  // ── Cell-specific background shape ──
  const isNeuron=levelId==='neuron';
  const isRbc=levelId==='rbc';
  const isXylem=levelId==='xylem';
  const isProkaryote=levelId==='prokaryote';
  const isHepato=levelId==='hepatocyte';
  const isMyocyte=levelId==='myocyte';
  const isTcell=levelId==='tcell';

  if(isRbc){
    // Biconcave disk: red ellipse with darker center depression
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:220,ry:178,fill:'rgba(30,8,8,0.7)','pointer-events':'none'}));
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:96,ry:78,fill:'rgba(80,10,10,0.55)','pointer-events':'none'}));
  } else if(isNeuron){
    svg.appendChild(svgEl('ellipse',{cx:270,cy:195,rx:110,ry:103,fill:'rgba(16,4,24,0.65)','pointer-events':'none'}));
    svg.appendChild(svgEl('ellipse',{cx:270,cy:78,rx:130,ry:62,fill:'rgba(10,3,18,0.4)','pointer-events':'none'}));
    svg.appendChild(svgEl('path',{d:'M252 290 Q262 310 265 330 L275 330 Q278 310 288 290 Z',fill:'rgba(12,4,20,0.55)','pointer-events':'none'}));
    svg.appendChild(svgEl('rect',{x:257,y:326,width:26,height:160,rx:10,fill:'rgba(12,4,20,0.55)','pointer-events':'none'}));
    svg.appendChild(svgEl('rect',{x:248,y:330,width:44,height:152,rx:14,fill:'rgba(20,8,4,0.35)','pointer-events':'none'}));
    svg.appendChild(svgEl('ellipse',{cx:270,cy:500,rx:32,ry:24,fill:'rgba(18,14,2,0.5)','pointer-events':'none'}));
  } else if(isXylem){
    // Xylem vessel: rectangular-ish with thick walls
    svg.appendChild(svgEl('rect',{x:18,y:18,width:504,height:504,rx:32,fill:'rgba(5,15,5,0.6)','pointer-events':'none'}));
  } else if(isProkaryote){
    // E. coli Gram-negativo: fondo verde oscuro con capa LPS externa
    // Fondo principal (oval coincide con la cápsula rx:248 ry:222)
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:252,ry:226,fill:'rgba(6,20,6,0.72)','pointer-events':'none'}));
    // Membrana externa Gram-negativo (LPS) — anillo naranja exterior distintivo
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:266,ry:240,fill:'none',stroke:'rgba(245,158,11,0.22)','stroke-width':'5','stroke-dasharray':'14 7','pointer-events':'none'}));
    // Espacio periplásmico (anillo interior sutil)
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:240,ry:214,fill:'none',stroke:'rgba(245,158,11,0.07)','stroke-width':'2.5','pointer-events':'none'}));
    // Eje central del bacilo (E. coli es un bastón — banda horizontal semitransparente)
    svg.appendChild(svgEl('rect',{x:22,y:235,width:496,height:70,rx:35,fill:'rgba(245,158,11,0.04)','pointer-events':'none'}));
  } else if(isHepato){
    // Hepatocyte: polyhedral liver cell — warm amber/brown tones
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:252,ry:244,fill:'rgba(18,8,2,0.74)','pointer-events':'none'}));
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:234,ry:226,fill:'none',stroke:'rgba(217,119,6,0.16)','stroke-width':'5','pointer-events':'none'}));
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:248,ry:240,fill:'none',stroke:'rgba(134,239,172,0.09)','stroke-width':'3','stroke-dasharray':'22 11','pointer-events':'none'}));
    svg.appendChild(svgEl('ellipse',{cx:270,cy:320,rx:145,ry:95,fill:'rgba(217,119,6,0.04)','pointer-events':'none'}));
  } else if(isMyocyte){
    // Muscle fiber: elongated horizontal with sarcomere band pattern
    svg.appendChild(svgEl('rect',{x:18,y:92,width:504,height:356,rx:28,fill:'rgba(40,5,10,0.75)','pointer-events':'none'}));
    for(let i=0;i<8;i++){const bx=52+i*58;svg.appendChild(svgEl('rect',{x:bx,y:108,width:30,height:324,rx:3,fill:'rgba(220,38,38,0.055)','pointer-events':'none'}));}
    for(let i=0;i<9;i++){const zx=38+i*58;svg.appendChild(svgEl('line',{x1:zx,y1:108,x2:zx,y2:432,stroke:'rgba(239,68,68,0.11)','stroke-width':'1.5','pointer-events':'none'}));}
    for(let j=0;j<5;j++){const fy=150+j*52;svg.appendChild(svgEl('line',{x1:28,y1:fy,x2:512,y2:fy,stroke:'rgba(239,68,68,0.06)','stroke-width':'1','pointer-events':'none'}));}
    svg.appendChild(svgEl('rect',{x:18,y:92,width:504,height:356,rx:28,fill:'none',stroke:'rgba(220,38,38,0.2)','stroke-width':'4','pointer-events':'none'}));
  } else if(isTcell){
    // T lymphocyte: small round cell, large nucleus, purple tones
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:250,ry:242,fill:'rgba(18,6,32,0.76)','pointer-events':'none'}));
    const tpts=24;for(let i=0;i<tpts;i++){const a=i/tpts*Math.PI*2;const px=270+248*Math.cos(a),py=270+238*Math.sin(a);svg.appendChild(svgEl('circle',{cx:px,cy:py,r:2.8,fill:'rgba(167,139,250,0.32)','pointer-events':'none'}));}
    svg.appendChild(svgEl('ellipse',{cx:270,cy:485,rx:88,ry:20,fill:'rgba(124,58,237,0.1)',stroke:'rgba(167,139,250,0.15)','stroke-width':'2','pointer-events':'none'}));
    svg.appendChild(svgEl('ellipse',{cx:268,cy:256,rx:165,ry:158,fill:'rgba(109,40,217,0.07)','pointer-events':'none'}));
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:248,ry:240,fill:'none',stroke:'rgba(139,92,246,0.16)','stroke-width':'4','pointer-events':'none'}));
  } else {
    // Default round cell
    svg.appendChild(svgEl('ellipse',{cx:270,cy:270,rx:250,ry:242,fill:'rgba(8,18,38,0.55)','pointer-events':'none'}));
  }

  // draw largest first (background), smallest last (foreground)
  const sorted=[...orgs].sort((a,b)=>b.rx-a.rx);
  const _atlasMode=!!targetSvg;
  sorted.forEach(org=>drawOrg(svg,org,levelId,_atlasMode));

  // vignette overlay
  const vig=svgEl('ellipse',{cx:270,cy:270,rx:268,ry:268,fill:'url(#cytoGrad)','pointer-events':'none'});
  svg.appendChild(vig);
  // lens border — amber tint for prokaryote (Gram-neg orange), cyan for eukaryotes
  const lensColor=isProkaryote?'rgba(245,158,11,0.12)':isHepato?'rgba(217,119,6,0.15)':isMyocyte?'rgba(220,38,38,0.13)':isTcell?'rgba(124,58,237,0.13)':'rgba(0,180,220,0.08)';
  const lens=svgEl('circle',{cx:270,cy:270,r:266,fill:'none',stroke:lensColor,'stroke-width':'6','pointer-events':'none'});
  svg.appendChild(lens);
}

function drawOrg(svg,org,levelId,atlasMode){
  const done=atlasMode?true:(GS.completed[levelId]||{})[org.id];
  const g=svgEl('g');g.style.cursor='pointer';
  g.dataset.orgId=org.id;
  const isLarge=org.rx>80;
  const shape=svgEl('ellipse',{
    cx:org.cx,cy:org.cy,rx:org.rx,ry:org.ry,
    fill:hex2rgba(org.color,done?0.32:isLarge?0.12:0.2),
    stroke:done?'#fbbf24':org.color,
    'stroke-width':done?'2.8':isLarge?'1.5':'2',
    'stroke-dasharray':(org.id.includes('membrane')||org.id.includes('cell_wall')||org.id.includes('capsule'))?'8 4':'none',
    filter:done?'url(#glowGold)':isLarge?'none':'url(#glow)',
  });
  g.appendChild(shape);
  // Internal details
  addOrgDetail(g,org);
  // Label
  if(org.rx>18){
    // label shadow
    const lblShadow=svgEl('text',{x:org.cx+1,y:org.cy+org.ry+16,'text-anchor':'middle','font-size':'10',fill:'rgba(0,0,0,0.6)','font-family':'Nunito,sans-serif','font-weight':'700','pointer-events':'none'});
    lblShadow.textContent=org.name.length>20?org.name.slice(0,19)+'…':org.name;
    g.appendChild(lblShadow);
    const lbl=svgEl('text',{x:org.cx,y:org.cy+org.ry+15,'text-anchor':'middle','font-size':'10',fill:done?'#fbbf24':'rgba(200,225,245,0.75)','font-family':'Nunito,sans-serif','font-weight':'700','pointer-events':'none'});
    lbl.textContent=org.name.length>20?org.name.slice(0,19)+'…':org.name;
    g.appendChild(lbl);
  }
  if(done){const ck=svgEl('text',{x:org.cx,y:org.cy-org.ry-6,'text-anchor':'middle','font-size':'14','pointer-events':'none'});ck.textContent='✅';g.appendChild(ck);}
  g.addEventListener('click',()=>{
    if(atlasMode && window._atlasSelectOrg) window._atlasSelectOrg(org.id);
    else selectOrg(org.id,levelId);
  });
  g.addEventListener('mouseenter',()=>{shape.setAttribute('fill',hex2rgba(org.color,done?.52:isLarge?.22:.38));shape.setAttribute('stroke-width',done?'3.5':'2.8');});
  g.addEventListener('mouseleave',()=>{shape.setAttribute('fill',hex2rgba(org.color,done?.32:isLarge?.12:.20));shape.setAttribute('stroke-width',done?'2.8':isLarge?'1.5':'2');});
  svg.appendChild(g);
}

function addOrgDetail(g,org){
  const c=org.color,id=org.id;
  const cx=org.cx,cy=org.cy,rx=org.rx,ry=org.ry;

  // ── NUCLEUS ──────────────────────────────────────────────────────────────
  if(id==='nucleus'){
    // Double envelope (inner + outer membrane)
    [.92,.82].forEach((s,i)=>{
      const env=svgEl('ellipse',{cx,cy,rx:rx*s,ry:ry*s,fill:'none',stroke:hex2rgba(c,i===0?.25:.15),'stroke-width':i===0?'2.5':'1.2','stroke-dasharray':i===1?'5 3':'none','pointer-events':'none'});
      g.appendChild(env);
    });
    // Nuclear pores with animated rings
    for(let i=0;i<12;i++){
      const a=i/12*Math.PI*2;
      const px=cx+Math.cos(a)*rx*.95,py=cy+Math.sin(a)*ry*.95;
      const pore=svgEl('circle',{cx:px,cy:py,r:3.8,fill:c,opacity:'.6','pointer-events':'none'});
      pore.classList.add('nucleus-pore');
      pore.style.animationDelay=(i*0.25)+'s';
      g.appendChild(pore);
      const ring=svgEl('circle',{cx:px,cy:py,r:6.5,fill:'none',stroke:hex2rgba(c,.35),'stroke-width':'1.5','pointer-events':'none'});
      ring.classList.add('pore-ring');ring.style.animationDelay=(i*0.25+0.12)+'s';
      g.appendChild(ring);
    }
    // Chromatin threads (heterochromatin + euchromatin)
    for(let i=0;i<8;i++){
      const a1=i/8*Math.PI*2,a2=a1+0.9;
      const x1=cx+Math.cos(a1)*rx*.52,y1=cy+Math.sin(a1)*ry*.52;
      const x2=cx+Math.cos(a2)*rx*.47,y2=cy+Math.sin(a2)*ry*.47;
      const xm=cx+Math.cos(a1+0.45)*rx*.62,ym=cy+Math.sin(a1+0.45)*ry*.62;
      const th=svgEl('path',{d:`M${x1} ${y1} Q${xm} ${ym} ${x2} ${y2}`,fill:'none',stroke:hex2rgba(c,i%2===0?.45:.25),'stroke-width':i%2===0?'2':'1','pointer-events':'none'});
      th.classList.add('chromatin-thread');th.style.animationDelay=(i*0.5)+'s';
      g.appendChild(th);
    }
    // Nucleolus with glow
    const nuc=svgEl('ellipse',{cx:cx+rx*.1,cy:cy-ry*.05,rx:rx*.32,ry:ry*.28,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.7),'stroke-width':'1.5','pointer-events':'none'});
    nuc.classList.add('nucleolus-glow');g.appendChild(nuc);
    // rRNA strands from nucleolus
    for(let i=0;i<3;i++){
      const a=i/3*Math.PI*2+0.3;
      g.appendChild(svgEl('line',{x1:cx+rx*.1+Math.cos(a)*rx*.32,y1:cy-ry*.05+Math.sin(a)*ry*.28,x2:cx+Math.cos(a)*rx*.65,y2:cy+Math.sin(a)*ry*.62,stroke:hex2rgba(c,.3),'stroke-width':'1','stroke-dasharray':'3 2','pointer-events':'none'}));
    }
    // Floating transport particles
    for(let i=0;i<4;i++){
      const a=i/4*Math.PI*2;
      const tp=svgEl('circle',{cx:cx+Math.cos(a)*rx*.75,cy:cy+Math.sin(a)*ry*.75,r:2,fill:'#fbbf24',opacity:'.7','pointer-events':'none'});
      tp.style.animation=`float2 ${2+i*0.5}s ease-in-out infinite`;
      tp.style.animationDelay=(i*0.6)+'s';
      g.appendChild(tp);
    }
  }

  // ── NUCLEOLUS ────────────────────────────────────────────────────────────
  if(id==='nucleolus'){
    // Fibrillar center (FC) - dense bright core
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.35,ry:ry*.35,fill:hex2rgba(c,.85),'pointer-events':'none'}));
    // Dense fibrillar component (DFC)
    const dfc=svgEl('ellipse',{cx,cy,rx:rx*.6,ry:ry*.6,fill:'none',stroke:hex2rgba(c,.55),'stroke-width':'2.5','stroke-dasharray':'4 2','pointer-events':'none'});
    dfc.classList.add('nucleolus-glow');g.appendChild(dfc);
    // Granular component outer ring
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.88,ry:ry*.88,fill:'none',stroke:hex2rgba(c,.22),'stroke-width':'1.5','pointer-events':'none'}));
    // rRNA strands emanating in all directions
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2;
      const strand=svgEl('path',{d:`M${cx+Math.cos(a)*rx*.35} ${cy+Math.sin(a)*ry*.35} Q${cx+Math.cos(a+.3)*rx*.65} ${cy+Math.sin(a+.3)*ry*.65} ${cx+Math.cos(a)*rx*.88} ${cy+Math.sin(a)*ry*.88}`,fill:'none',stroke:hex2rgba(c,.4),'stroke-width':'1.5','stroke-linecap':'round','pointer-events':'none'});
      strand.style.animation=`nucleolusGlow ${2+i*0.3}s ease-in-out infinite`;
      strand.style.animationDelay=(i*0.4)+'s';
      g.appendChild(strand);
    }
    // Pre-ribosomal particles leaving
    for(let i=0;i<3;i++){
      const a=i/3*Math.PI*2+0.8;
      const p=svgEl('circle',{cx:cx+Math.cos(a)*rx*.85,cy:cy+Math.sin(a)*ry*.85,r:2.5,fill:'#94a3b8',opacity:'.8','pointer-events':'none'});
      p.classList.add('ribosome-active');p.style.animationDelay=(i*0.5)+'s';
      g.appendChild(p);
    }
  }

  // ── MITOCHONDRIA ─────────────────────────────────────────────────────────
  if(id.startsWith('mito')){
    // Outer membrane
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.95,ry:ry*.95,fill:'none',stroke:hex2rgba(c,.45),'stroke-width':'2','pointer-events':'none'}));
    // Inner membrane (slightly wavy)
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.82,ry:ry*.82,fill:'none',stroke:hex2rgba(c,.3),'stroke-width':'1.2','stroke-dasharray':'6 3','pointer-events':'none'}));
    // Cristae — animated curved folds
    const cristaCount=5;
    for(let i=1;i<=cristaCount;i++){
      const lx=cx-rx*.75+(rx*1.5/cristaCount)*i*.9;
      const cresta=svgEl('path',{d:`M${lx} ${cy-ry*.72} Q${lx+rx*.12} ${cy} ${lx} ${cy+ry*.72}`,fill:'none',stroke:hex2rgba(c,.7),'stroke-width':'2.2','stroke-linecap':'round','pointer-events':'none'});
      cresta.classList.add('mito-cresta');cresta.style.animationDelay=(i*0.35)+'s';
      g.appendChild(cresta);
      // ATP synthase stalks on inner membrane
      if(i%2===0){
        const asy=svgEl('circle',{cx:lx,cy:cy+ry*.68,r:3,fill:'#fbbf24',opacity:'.8','pointer-events':'none'});
        asy.style.animation=`atpSpin ${3+i}s linear infinite`;
        asy.style.transformBox='fill-box';asy.style.transformOrigin='center';
        g.appendChild(asy);
        g.appendChild(svgEl('line',{x1:lx,y1:cy+ry*.6,x2:lx,y2:cy+ry*.72,stroke:'#fbbf24',opacity:'.5','stroke-width':'1.5','pointer-events':'none'}));
      }
    }
    // Matrix granules (Ca²⁺ deposits)
    [{x:-.3,y:-.2},{x:.25,y:.15},{x:-.1,y:.3}].forEach(({x,y},i)=>{
      const mg=svgEl('circle',{cx:cx+x*rx,cy:cy+y*ry,r:2.2,fill:'rgba(250,204,21,.5)','pointer-events':'none'});
      mg.classList.add('mito-glow');mg.style.animationDelay=(i*0.7)+'s';
      g.appendChild(mg);
    });
    // ETC glow on inner membrane top
    const etc=svgEl('path',{d:`M${cx-rx*.6} ${cy-ry*.7} Q${cx} ${cy-ry*.85} ${cx+rx*.6} ${cy-ry*.7}`,fill:'none',stroke:'rgba(239,68,68,.4)','stroke-width':'3','stroke-linecap':'round','pointer-events':'none'});
    etc.classList.add('mito-glow');g.appendChild(etc);
  }

  // ── ENDOPLASMIC RETICULUM ─────────────────────────────────────────────────
  if(id.startsWith('er_')){
    // Multiple animated cisternae layers
    for(let i=0;i<4;i++){
      const y=cy-ry*.62+ry*.38*i;
      let d=`M${cx-rx*.9} ${y}`;
      for(let j=0;j<=5;j++)d+=` Q${cx-rx*.7+j*rx*.36} ${y+(j%2===0?-7:7)} ${cx-rx*.55+j*rx*.32} ${y}`;
      const cis=svgEl('path',{d,fill:'none',stroke:hex2rgba(c,.5+i*.05),'stroke-width':'2','pointer-events':'none'});
      cis.classList.add('er-tube');cis.style.animationDelay=(i*0.6)+'s';
      g.appendChild(cis);
    }
    if(id==='er_rough'||id==='er_rough_h'){
      // Ribosomes with staggered blink + protein threads
      const rpos=[{rx:-.72,ry:-.55},{rx:-.38,ry:-.55},{rx:-.04,ry:-.55},{rx:.3,ry:-.55},{rx:.62,ry:-.55},
                  {rx:-.56,ry:.07},{rx:-.22,ry:.07},{rx:.14,ry:.07},{rx:.48,ry:.07},
                  {rx:-.72,ry:.4},{rx:-.35,ry:.4},{rx:.05,ry:.4}];
      rpos.forEach(({rx:rpx,ry:rpy},i)=>{
        const rb=svgEl('circle',{cx:cx+rpx*rx,cy:cy+rpy*ry,r:3.5,fill:'#94a3b8','pointer-events':'none'});
        rb.classList.add('ribosome-active');rb.style.animationDelay=(i*0.18)+'s';
        g.appendChild(rb);
        // small subunit
        g.appendChild(svgEl('ellipse',{cx:cx+rpx*rx+2,cy:cy+rpy*ry+2.5,rx:2.2,ry:1.5,fill:'#64748b','pointer-events':'none'}));
        // protein thread
        if(i%3===0){
          const pt=svgEl('path',{d:`M${cx+rpx*rx} ${cy+rpy*ry+3.5} Q${cx+rpx*rx+8} ${cy+rpy*ry+12} ${cx+rpx*rx+12} ${cy+rpy*ry+18}`,fill:'none',stroke:'rgba(148,163,184,.45)','stroke-width':'1.5','stroke-linecap':'round','pointer-events':'none'});
          pt.classList.add('protein-flow');pt.style.animationDelay=(i*0.3)+'s';
          g.appendChild(pt);
        }
      });
      // Lumen label
      g.appendChild(svgEl('text',{x:cx,y:cy+ry*.5,'text-anchor':'middle','font-size':'7.5',fill:hex2rgba(c,.45),'pointer-events':'none','font-style':'italic'})).textContent='lumen';
    }
    if(id==='er_smooth'||id==='er_smooth_h'||id==='er_t'){
      // Tubular network — 3 curved ellipses
      [{rx:.58,ry:.2,a:0},{rx:.45,ry:.15,a:.5},{rx:.62,ry:.18,a:-.4}].forEach(({rx:trx,ry:try_,a},i)=>{
        const cy2=cy+ry*(i===0?-.15:i===1?.15:-.38);
        const tub=svgEl('ellipse',{cx,cy:cy2,rx:rx*trx,ry:ry*try_,fill:'none',stroke:hex2rgba(c,.4+i*.08),'stroke-width':'2','pointer-events':'none'});
        tub.style.transform=`rotate(${a}rad)`;tub.style.transformBox='fill-box';tub.style.transformOrigin='center';
        tub.classList.add('er-tube');tub.style.animationDelay=(i*0.8)+'s';
        g.appendChild(tub);
      });
      // Lipid droplets forming
      [{x:-.55,y:-.3},{x:.52,y:.2},{x:-.15,y:.45}].forEach(({x,y},i)=>{
        const ld=svgEl('circle',{cx:cx+x*rx,cy:cy+y*ry,r:4,fill:hex2rgba(c,.4),stroke:hex2rgba(c,.6),'stroke-width':'1','pointer-events':'none'});
        ld.style.animation=`vesiclePop ${2.5+i*.5}s ease-in-out infinite`;
        ld.style.animationDelay=(i*0.7)+'s';
        g.appendChild(ld);
      });
    }
  }

  // ── GOLGI APPARATUS ──────────────────────────────────────────────────────
  if(id==='golgi'){
    // cis label
    g.appendChild(svgEl('text',{x:cx-rx*.88,y:cy-ry*.72,'font-size':'7',fill:hex2rgba(c,.55),'pointer-events':'none','font-weight':'700'})).textContent='cis';
    // 6 stacked curved cisternae with progressive curvature
    for(let i=0;i<6;i++){
      const gy=cy-ry*.65+i*(ry*.26);
      const curve=8-i*1.2;
      const arc=svgEl('path',{d:`M${cx-rx*.92} ${gy} Q${cx} ${gy-curve} ${cx+rx*.92} ${gy}`,fill:'none',stroke:hex2rgba(c,.45+i*.07),'stroke-width':'2.8','stroke-linecap':'round','pointer-events':'none'});
      arc.classList.add('golgi-arc');arc.style.animationDelay=(i*0.28)+'s';
      g.appendChild(arc);
      // cisternae end caps
      g.appendChild(svgEl('circle',{cx:cx-rx*.92,cy:gy,r:2,fill:hex2rgba(c,.5),'pointer-events':'none'}));
      g.appendChild(svgEl('circle',{cx:cx+rx*.92,cy:gy,r:2,fill:hex2rgba(c,.5),'pointer-events':'none'}));
    }
    // trans label
    g.appendChild(svgEl('text',{x:cx-rx*.88,y:cy+ry*.8,'font-size':'7',fill:hex2rgba(c,.55),'pointer-events':'none','font-weight':'700'})).textContent='trans';
    // Budding vesicles (trans side — right)
    [[rx*.98,-12,5.5,0],[rx*1.02,5,4.2,.9],[rx*.88,-24,3.5,1.7],[rx*1.05,20,3,2.4]].forEach(([vx,vy,vr,d])=>{
      const ves=svgEl('circle',{cx:cx+vx,cy:cy+vy,r:vr,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.8),'stroke-width':'1','pointer-events':'none'});
      ves.classList.add('vesicle-float');ves.style.animationDelay=d+'s';
      g.appendChild(ves);
      // vesicle neck line
      g.appendChild(svgEl('line',{x1:cx+rx*.92,y1:cy+vy,x2:cx+vx-vr,y2:cy+vy,stroke:hex2rgba(c,.3),'stroke-width':'1','pointer-events':'none'}));
    });
    // Incoming vesicles (cis side — left)
    [[-rx*.95,-14,4],[- rx*.9,10,3.2]].forEach(([vx,vy,vr],i)=>{
      const iv=svgEl('circle',{cx:cx+vx,cy:cy+vy,r:vr,fill:hex2rgba(c,.35),stroke:hex2rgba(c,.55),'stroke-width':'1','stroke-dasharray':'2 1','pointer-events':'none'});
      iv.classList.add('vesicle-pop');iv.style.animationDelay=(i*1.2)+'s';
      g.appendChild(iv);
    });
  }

  // ── LYSOSOMES ────────────────────────────────────────────────────────────
  if(id.startsWith('lysosome')){
    // Acidic lumen gradient
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.75,ry:ry*.75,fill:hex2rgba(c,.3),'pointer-events':'none'}));
    // Enzymatic protein dots — varied positions
    const cols=['#22c55e','#16a34a','#4ade80','#86efac','#15803d'];
    for(let i=0;i<8;i++){
      // IMP-09: deterministic radial offsets (no Math.random) so redraw never flickers
      const a=i/8*Math.PI*2,r=0.38+Math.sin(i*1.9+0.7)*0.15;
      const dot=svgEl('circle',{cx:cx+Math.cos(a)*rx*r,cy:cy+Math.sin(a)*ry*r,r:2.2,fill:cols[i%5],opacity:'.7','pointer-events':'none'});
      dot.classList.add('lyso-dot');dot.style.animationDelay=(i*0.22)+'s';
      g.appendChild(dot);
    }
    // H⁺ pump icons (V-ATPase)
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'9',fill:'rgba(250,204,21,.8)','pointer-events':'none','font-weight':'bold'})).textContent='H⁺';
    // pH label
    g.appendChild(svgEl('text',{x:cx,y:cy-rx*.55,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.55),'pointer-events':'none'})).textContent='pH 4.5-5';
    // Membrane-bound enzymes
    for(let i=0;i<5;i++){
      const a=i/5*Math.PI*2;
      g.appendChild(svgEl('rect',{x:cx+Math.cos(a)*rx*.9-2,y:cy+Math.sin(a)*ry*.9-4,width:4,height:8,rx:2,fill:hex2rgba('#7c3aed',.5),'pointer-events':'none'}));
    }
  }

  // ── RIBOSOMES (80S) ───────────────────────────────────────────────────────
  if(id==='ribosome'||id==='ribosome2'||id.startsWith('ribosome70s')){
    // Large subunit (60S) — animated
    const large=svgEl('ellipse',{cx,cy:cy-ry*.18,rx:rx*.78,ry:ry*.58,fill:hex2rgba(c,.75),stroke:hex2rgba(c,.4),'stroke-width':'1.5','pointer-events':'none'});
    large.classList.add('ribo-dock');large.style.animationDelay='0s';
    g.appendChild(large);
    // Small subunit (40S)
    const small=svgEl('ellipse',{cx:cx+rx*.08,cy:cy+ry*.32,rx:rx*.58,ry:ry*.38,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.3),'stroke-width':'1','pointer-events':'none'});
    small.classList.add('ribo-dock');small.style.animationDelay='.4s';
    g.appendChild(small);
    // mRNA channel
    const mrna=svgEl('line',{x1:cx-rx*.85,y1:cy+ry*.12,x2:cx+rx*.85,y2:cy+ry*.12,stroke:'rgba(251,191,36,.6)','stroke-width':'1.5','stroke-dasharray':'4 2','pointer-events':'none'});
    mrna.classList.add('protein-flow');mrna.style.animationDelay='.2s';
    g.appendChild(mrna);
    // Emerging polypeptide
    const pp=svgEl('path',{d:`M${cx+rx*.4} ${cy-ry*.6} Q${cx+rx*.7} ${cy-ry*.9} ${cx+rx*.9} ${cy-ry*1.1}`,fill:'none',stroke:'rgba(148,163,184,.6)','stroke-width':'2','stroke-linecap':'round','pointer-events':'none'});
    pp.classList.add('protein-flow');g.appendChild(pp);
    // Labels
    g.appendChild(svgEl('text',{x:cx-rx*.5,y:cy-ry*.05,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.6),'pointer-events':'none'})).textContent='60S';
    g.appendChild(svgEl('text',{x:cx+rx*.1,y:cy+ry*.42,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='40S';
  }

  // ── CENTROSOME ────────────────────────────────────────────────────────────
  if(id==='centrosome'){
    // PCM (pericentriolar material) cloud
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.85,ry:ry*.85,fill:hex2rgba(c,.08),stroke:hex2rgba(c,.15),'stroke-width':'1','stroke-dasharray':'3 2','pointer-events':'none'}));
    // Two centrioles (perpendicular)
    const c1=svgEl('rect',{x:cx-rx*.55,y:cy-ry*.18,width:rx*1.1,height:ry*.36,rx:4,fill:hex2rgba(c,.28),stroke:hex2rgba(c,.65),'stroke-width':'2','pointer-events':'none'});
    const c2=svgEl('rect',{x:cx-rx*.18,y:cy-ry*.58,width:rx*.36,height:ry*1.16,rx:4,fill:hex2rgba(c,.22),stroke:hex2rgba(c,.5),'stroke-width':'1.5','pointer-events':'none'});
    g.appendChild(c1);g.appendChild(c2);
    // Triplet microtubules inside centriole
    for(let i=0;i<3;i++){
      g.appendChild(svgEl('circle',{cx:cx-rx*.3+i*rx*.3,cy,r:2.5,fill:hex2rgba(c,.4),'pointer-events':'none'}));
    }
    // Microtubule asters growing outward
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI*2;
      const mt=svgEl('line',{x1:cx,y1:cy,x2:cx+Math.cos(a)*rx*1.5,y2:cy+Math.sin(a)*ry*1.5,stroke:hex2rgba(c,.25),'stroke-width':'1.2','stroke-dasharray':'4 3','pointer-events':'none'});
      mt.classList.add('mt-grow');mt.style.animationDelay=(i*0.3)+'s';
      g.appendChild(mt);
      // plus-end cap
      g.appendChild(svgEl('circle',{cx:cx+Math.cos(a)*rx*1.5,cy:cy+Math.sin(a)*ry*1.5,r:1.5,fill:c,opacity:'.5','pointer-events':'none'}));
    }
    // γ-tubulin ring (MTOC)
    g.appendChild(svgEl('circle',{cx,cy,r:rx*.2,fill:'none',stroke:'rgba(251,191,36,.5)','stroke-width':'2','pointer-events':'none'}));
  }

  // ── PEROXISOME ────────────────────────────────────────────────────────────
  if(id==='peroxisome'){
    // Crystalline catalase core
    const crys=svgEl('rect',{x:cx-rx*.35,y:cy-ry*.35,width:rx*.7,height:ry*.7,rx:3,fill:hex2rgba(c,.38),stroke:hex2rgba(c,.65),'stroke-width':'1.5','pointer-events':'none'});
    crys.classList.add('crystal-shine');g.appendChild(crys);
    // Diagonal crystal lines
    g.appendChild(svgEl('line',{x1:cx-rx*.3,y1:cy-ry*.3,x2:cx+rx*.3,y2:cy+ry*.3,stroke:hex2rgba(c,.45),'stroke-width':'1','pointer-events':'none'}));
    g.appendChild(svgEl('line',{x1:cx+rx*.3,y1:cy-ry*.3,x2:cx-rx*.3,y2:cy+ry*.3,stroke:hex2rgba(c,.45),'stroke-width':'1','pointer-events':'none'}));
    // H₂O₂ label
    g.appendChild(svgEl('text',{x:cx,y:cy+2,'text-anchor':'middle','font-size':'7',fill:'rgba(250,204,21,.8)','pointer-events':'none','font-weight':'bold'})).textContent='H₂O₂';
    // Catalase reaction bubbles
    for(let i=0;i<3;i++){
      const bx=cx+(-1+i)*rx*.4,by=cy-ry*.6;
      const bub=svgEl('circle',{cx:bx,cy:by,r:2.5,fill:'none',stroke:hex2rgba(c,.6),'stroke-width':'1','pointer-events':'none'});
      bub.style.animation=`h2o2Bubble ${1.5+i*0.4}s ease-out infinite`;
      bub.style.animationDelay=(i*0.5)+'s';
      g.appendChild(bub);
    }
    // FAO enzymes (beta-oxidation dots)
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.75,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='β-ox';
  }

  // ── CYTOSKELETON ─────────────────────────────────────────────────────────
  if(id==='cytoskeleton'){
    // Microtubules — thick animated lines
    for(let i=0;i<4;i++){
      const x=cx-rx*.8+i*rx*.52;
      const mt=svgEl('line',{x1:x,y1:cy-ry*.88,x2:x+rx*.28,y2:cy+ry*.88,stroke:hex2rgba(c,.55),'stroke-width':'2','pointer-events':'none'});
      mt.classList.add('filament-line');mt.style.animationDelay=(i*0.4)+'s';
      g.appendChild(mt);
      // tubulin dimer dots
      for(let d=0;d<4;d++){
        g.appendChild(svgEl('circle',{cx:x+rx*.07,cy:cy-ry*.6+d*ry*.4,r:2,fill:hex2rgba(c,.45),'pointer-events':'none'}));
      }
    }
    // Actin filaments — thinner dashed
    for(let i=0;i<3;i++){
      const y=cy-ry*.55+i*ry*.52;
      const act=svgEl('line',{x1:cx-rx*.92,y1:y,x2:cx+rx*.92,y2:y+3,stroke:hex2rgba('#ef4444',.45),'stroke-width':'1.5','stroke-dasharray':'5 3','pointer-events':'none'});
      act.classList.add('filament-line');act.style.animationDelay=(i*0.55+0.2)+'s';
      g.appendChild(act);
    }
    // Intermediate filaments — wavy
    for(let i=0;i<2;i++){
      const yif=cy+(i===0?-1:1)*ry*.25;
      const ifil=svgEl('path',{d:`M${cx-rx*.88} ${yif} Q${cx-rx*.4} ${yif+(i===0?-8:8)} ${cx} ${yif} Q${cx+rx*.4} ${yif+(i===0?8:-8)} ${cx+rx*.88} ${yif}`,fill:'none',stroke:'rgba(234,179,8,.4)','stroke-width':'1.5','pointer-events':'none'});
      ifil.style.animation=`erPulse ${4+i}s ease-in-out infinite`;
      g.appendChild(ifil);
    }
    // Kinesin motor proteins
    [{x:-.3,y:-.6},{x:.35,y:.2}].forEach(({x,y},i)=>{
      const km=svgEl('rect',{x:cx+x*rx-3,y:cy+y*ry-3,width:6,height:6,rx:2,fill:'rgba(251,191,36,.6)','pointer-events':'none'});
      km.style.animation=`ribosomeDock ${2+i}s ease-in-out infinite`;
      g.appendChild(km);
    });
  }

  // ── MEMBRANE / MEMBRANE_P ─────────────────────────────────────────────────
  if(id==='membrane'||id==='membrane_p'){
    // Phospholipid bilayer — two animated rows of dots
    const totalDots=28;
    for(let i=0;i<totalDots;i++){
      const a=i/totalDots*Math.PI*2;
      const rx1=rx*.97,ry1=ry*.97,rx2=rx*.86,ry2=ry*.86;
      const d1=svgEl('circle',{cx:cx+Math.cos(a)*rx1,cy:cy+Math.sin(a)*ry1,r:2.8,fill:hex2rgba(c,.45),'pointer-events':'none'});
      d1.style.animation=`nucleusPulse ${2.5+Math.random()}s ease-in-out infinite`;
      d1.style.animationDelay=(i*0.1)+'s';
      g.appendChild(d1);
      const d2=svgEl('circle',{cx:cx+Math.cos(a)*rx2,cy:cy+Math.sin(a)*ry2,r:2.8,fill:hex2rgba(c,.28),'pointer-events':'none'});
      d2.style.animation=`nucleusPulse ${2.5+Math.random()}s ease-in-out infinite`;
      d2.style.animationDelay=((i*0.1)+0.15)+'s';
      g.appendChild(d2);
      // Tail line connecting the two leaflets
      if(i%3===0){
        g.appendChild(svgEl('line',{x1:cx+Math.cos(a)*rx1,y1:cy+Math.sin(a)*ry1,x2:cx+Math.cos(a)*rx2,y2:cy+Math.sin(a)*ry2,stroke:hex2rgba(c,.18),'stroke-width':'1','pointer-events':'none'}));
      }
    }
    // Integral membrane proteins
    const protAngles=[0.3,1.1,2.0,3.1,3.9,5.0];
    protAngles.forEach((a,i)=>{
      const px=cx+Math.cos(a)*rx*.915,py=cy+Math.sin(a)*ry*.915;
      g.appendChild(svgEl('rect',{x:px-3,y:py-8,width:6,height:16,rx:3,fill:hex2rgba('#7c3aed',.6),stroke:'rgba(167,139,250,.5)','stroke-width':'1','pointer-events':'none'}));
      // Glycoprotein sugar chain (every other)
      if(i%2===0){
        const gx=cx+Math.cos(a)*rx*1.06,gy=cy+Math.sin(a)*ry*1.06;
        g.appendChild(svgEl('circle',{cx:gx,cy:gy,r:2,fill:'rgba(16,185,129,.6)','pointer-events':'none'}));
        g.appendChild(svgEl('circle',{cx:gx+Math.cos(a)*4,cy:gy+Math.sin(a)*4,r:1.5,fill:'rgba(16,185,129,.4)','pointer-events':'none'}));
      }
    });
    // Cholesterol molecules (wedge shape)
    [1.6,3.7,5.4].forEach(a=>{
      const mx=cx+Math.cos(a)*rx*.92,my=cy+Math.sin(a)*ry*.92;
      g.appendChild(svgEl('rect',{x:mx-1.5,y:my-5,width:3,height:10,rx:1,fill:'rgba(251,191,36,.4)','pointer-events':'none'}));
    });
    if(id==='membrane_p'){
      // ETC complexes — bacteria have respiratory chain on plasma membrane
      [{a:0.8},{a:2.5},{a:4.3}].forEach(({a},i)=>{
        const ex=cx+Math.cos(a)*rx*.915,ey=cy+Math.sin(a)*ry*.915;
        g.appendChild(svgEl('rect',{x:ex-4,y:ey-10,width:8,height:20,rx:3,fill:'rgba(239,68,68,.35)',stroke:'rgba(239,68,68,.55)','stroke-width':'1','pointer-events':'none'}));
        const etc=svgEl('text',{x:ex,y:ey+2,'text-anchor':'middle','font-size':'5.5',fill:'rgba(251,191,36,.8)','pointer-events':'none','font-weight':'bold'});
        etc.textContent=['I','III','V'][i];g.appendChild(etc);
      });
    }
  }

  // ── CHLOROPLAST ───────────────────────────────────────────────────────────
  if(id.startsWith('chloro')){
    // Outer + inner envelope
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.94,ry:ry*.94,fill:'none',stroke:hex2rgba(c,.35),'stroke-width':'2','pointer-events':'none'}));
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.86,ry:ry*.86,fill:'none',stroke:hex2rgba(c,.2),'stroke-width':'1.2','pointer-events':'none'}));
    // Grana stacks (thylakoids) — 4 stacks
    for(let col=0;col<4;col++){
      const gx=cx-rx*.6+col*rx*.4;
      for(let row=0;row<5;row++){
        const gy=cy-ry*.48+row*6;
        const th=svgEl('rect',{x:gx-8,y:gy,width:16,height:5,rx:2.5,fill:hex2rgba(c,.58),stroke:hex2rgba(c,.3),'stroke-width':'.8','pointer-events':'none'});
        th.classList.add('chloro-thylakoid');
        th.style.animationDelay=(col*.4+row*.15)+'s';
        g.appendChild(th);
      }
      // Stroma lamellae connecting stacks
      if(col<3){
        const sl=svgEl('path',{d:`M${gx+8} ${cy} Q${gx+rx*.18} ${cy-6} ${gx+rx*.4-8} ${cy}`,fill:'none',stroke:hex2rgba(c,.28),'stroke-width':'1.2','pointer-events':'none'});
        sl.classList.add('er-tube');sl.style.animationDelay=(col*.5)+'s';
        g.appendChild(sl);
      }
    }
    // Photon arrival bursts
    for(let i=0;i<3;i++){
      const bx=cx-rx*.4+i*rx*.4,by=cy-ry*.85;
      const ph=svgEl('circle',{cx:bx,cy:by,r:2,fill:'rgba(251,191,36,.9)','pointer-events':'none'});
      ph.style.animation=`photonBurst ${2+i*0.6}s ease-out infinite`;
      ph.style.animationDelay=(i*0.7)+'s';
      g.appendChild(ph);
    }
    // Stroma enzyme (RuBisCO) dots
    [{x:-.55,y:.35},{x:.5,y:.3},{x:-.1,y:.55}].forEach(({x,y},i)=>{
      const rb=svgEl('circle',{cx:cx+x*rx,cy:cy+y*ry,r:3,fill:'rgba(20,184,166,.55)',stroke:'rgba(20,184,166,.4)','stroke-width':'1','pointer-events':'none'});
      rb.style.animation=`nucleolusGlow ${3+i*.4}s ease-in-out infinite`;
      g.appendChild(rb);
    });
    // RuBisCO label
    g.appendChild(svgEl('text',{x:cx+rx*.35,y:cy+ry*.55,'font-size':'6',fill:'rgba(20,184,166,.5)','pointer-events':'none'})).textContent='RuBisCO';
  }

  // ── VACUOLE ───────────────────────────────────────────────────────────────
  if(id==='vacuole'){
    // Tonoplast inner detail rings (ripple effect)
    for(let i=1;i<=4;i++){
      const ring=svgEl('ellipse',{cx,cy,rx:rx*(0.2+i*.18),ry:ry*(0.2+i*.18),fill:'none',stroke:hex2rgba(c,.06+i*.03),'stroke-width':'1.5','pointer-events':'none'});
      ring.style.animation=`vacuoleRipple ${3+i*.5}s ease-out infinite`;
      ring.style.animationDelay=(i*0.8)+'s';
      g.appendChild(ring);
    }
    // Tonoplast label
    const tl=svgEl('text',{x:cx,y:cy+4,'text-anchor':'middle','font-size':'10',fill:hex2rgba(c,.4),'pointer-events':'none','font-style':'italic'});
    tl.textContent='tonoplasto';tl.classList.add('h2o-float');g.appendChild(tl);
    // H₂O molecules drifting
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2+0.3;
      const wd=svgEl('text',{x:cx+Math.cos(a)*rx*.55,y:cy+Math.sin(a)*ry*.5+3,'text-anchor':'middle','font-size':'7',fill:'rgba(125,211,252,.5)','pointer-events':'none'});
      wd.textContent='H₂O';wd.classList.add('h2o-float');wd.style.animationDelay=(i*0.6)+'s';
      g.appendChild(wd);
    }
    // Anthocyanin color pigment dots
    ['rgba(167,139,250,.5)','rgba(236,72,153,.5)','rgba(59,130,246,.5)'].forEach((col,i)=>{
      const a=i/3*Math.PI*2+1;
      g.appendChild(svgEl('circle',{cx:cx+Math.cos(a)*rx*.35,cy:cy+Math.sin(a)*ry*.35,r:4,fill:col,'pointer-events':'none'}));
    });
  }

  // ── PLASMODESMATA ─────────────────────────────────────────────────────────
  if(id==='plasmodesmata'){
    for(let i=-1;i<=1;i++){
      const pcy=cy+i*14;
      // Outer channel (plasmalemma sleeve)
      const ch=svgEl('line',{x1:cx-rx,y1:pcy,x2:cx+rx,y2:pcy,stroke:hex2rgba(c,.65),'stroke-width':'4','stroke-linecap':'round','pointer-events':'none'});
      ch.classList.add('filament-line');ch.style.animationDelay=(Math.abs(i)*0.4)+'s';
      g.appendChild(ch);
      // Desmotubule (ER inner core)
      const dt=svgEl('line',{x1:cx-rx,y1:pcy,x2:cx+rx,y2:pcy,stroke:'rgba(249,115,22,.65)','stroke-width':'1.5','stroke-linecap':'round','pointer-events':'none'});
      dt.classList.add('er-tube');dt.style.animationDelay=(Math.abs(i)*0.4+0.2)+'s';
      g.appendChild(dt);
      // Symplastic transport particles
      if(i===0){
        const sp=svgEl('circle',{cx:cx-rx*.3,cy:pcy,r:2.5,fill:'rgba(251,191,36,.7)','pointer-events':'none'});
        sp.classList.add('vesicle-float');g.appendChild(sp);
      }
    }
    // Cell wall context
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.75,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.45),'pointer-events':'none'})).textContent='simplasto';
  }

  // ── CELL WALL (plant) ─────────────────────────────────────────────────────
  if(id==='cell_wall'){
    // Cellulose microfibril lattice — animated crossing lines
    const fibCount=8;
    for(let i=0;i<fibCount;i++){
      const a=i/fibCount*Math.PI*2;
      const r1=rx*.87,r2=rx*.98;
      const fib=svgEl('line',{x1:cx+Math.cos(a)*r1,y1:cy+Math.sin(a)*ry*.87,x2:cx+Math.cos(a+0.55)*r2,y2:cy+Math.sin(a+0.55)*ry*.98,stroke:hex2rgba(c,.38),'stroke-width':'2','pointer-events':'none'});
      fib.classList.add('wall-fibril');fib.style.animationDelay=(i*0.35)+'s';
      g.appendChild(fib);
    }
    // Middle lamella (pectin)
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*1.04,ry:ry*1.04,fill:'none',stroke:'rgba(251,191,36,.2)','stroke-width':'3','pointer-events':'none'}));
    // Pit field markers
    [{a:0.7},{a:2.2},{a:4.5}].forEach(({a})=>{
      const px=cx+Math.cos(a)*rx*.93,py=cy+Math.sin(a)*ry*.93;
      g.appendChild(svgEl('circle',{cx:px,cy:py,r:4,fill:'none',stroke:hex2rgba(c,.5),'stroke-width':'1.5','stroke-dasharray':'2 1','pointer-events':'none'}));
    });
    // Lignin label
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.1,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.4),'pointer-events':'none'})).textContent='celulosa';
  }

  // ── NUCLEOID ──────────────────────────────────────────────────────────────
  if(id==='nucleoid'){
    // Supercoiled DNA domain loops
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.75,ry:ry*.75,fill:'none',stroke:hex2rgba(c,.38),'stroke-width':'1.2','stroke-dasharray':'6 3','pointer-events':'none'}));
    // Circular chromosome arcs — animated
    for(let i=0;i<8;i++){
      const a1=i/8*Math.PI*2,a2=(i+0.55)/8*Math.PI*2;
      const x1=cx+Math.cos(a1)*rx*.52,y1=cy+Math.sin(a1)*ry*.52;
      const x2=cx+Math.cos(a2)*rx*.57,y2=cy+Math.sin(a2)*ry*.57;
      const xc=cx+Math.cos(a1+0.27)*rx*.38,yc=cy+Math.sin(a1+0.27)*ry*.38;
      const arc=svgEl('path',{d:`M${x1} ${y1} Q${xc} ${yc} ${x2} ${y2}`,fill:'none',stroke:hex2rgba(c,.7),'stroke-width':'2','stroke-linecap':'round','pointer-events':'none'});
      arc.classList.add('dna-coil');arc.style.animationDelay=(i*0.3)+'s';
      g.appendChild(arc);
    }
    // oriC marker
    const oriC=svgEl('circle',{cx:cx+rx*.52,cy,r:4,fill:hex2rgba(c,.55),stroke:'rgba(251,191,36,.6)','stroke-width':'1.5','pointer-events':'none'});
    oriC.classList.add('gene-flash');g.appendChild(oriC);
    g.appendChild(svgEl('text',{x:cx+rx*.52,y:cy-7,'text-anchor':'middle','font-size':'6',fill:'rgba(251,191,36,.7)','pointer-events':'none'})).textContent='oriC';
    // HU proteins (NAPs)
    [{x:.1,y:-.35},{x:-.3,y:.15},{x:.25,y:.3}].forEach(({x,y},i)=>{
      const nap=svgEl('rect',{x:cx+x*rx-2.5,y:cy+y*ry-2.5,width:5,height:5,rx:1,fill:'rgba(148,163,184,.5)','pointer-events':'none'});
      nap.classList.add('supercoil');nap.style.animationDelay=(i*0.5)+'s';
      g.appendChild(nap);
    });
    // Domain topological boundaries
    for(let i=0;i<4;i++){
      const a=i/4*Math.PI*2+0.4;
      g.appendChild(svgEl('line',{x1:cx,y1:cy,x2:cx+Math.cos(a)*rx*.58,y2:cy+Math.sin(a)*ry*.58,stroke:hex2rgba(c,.2),'stroke-width':'1','stroke-dasharray':'3 2','pointer-events':'none'}));
    }
  }

  // ── PLASMID ───────────────────────────────────────────────────────────────
  if(id==='plasmid'){
    // Outer dsDNA circle — spinning
    const outer=svgEl('ellipse',{cx,cy,rx:rx*.7,ry:ry*.7,fill:'none',stroke:hex2rgba(c,.8),'stroke-width':'3','pointer-events':'none'});
    outer.classList.add('plasmid-spin');g.appendChild(outer);
    // Inner strand (complementary)
    const inner=svgEl('ellipse',{cx,cy,rx:rx*.58,ry:ry*.58,fill:'none',stroke:hex2rgba(c,.4),'stroke-width':'1.2','stroke-dasharray':'4 2','pointer-events':'none'});
    inner.classList.add('plasmid-spin');inner.style.animationDirection='reverse';
    g.appendChild(inner);
    // Gene markers (colored arcs)
    [['#fbbf24',0,.7],['#ef4444',1.1,1.8],['#10b981',2.5,3.1]].forEach(([col,a1,a2])=>{
      const path=svgEl('path',{d:`M${cx+Math.cos(a1)*rx*.7} ${cy+Math.sin(a1)*ry*.7} A${rx*.7} ${ry*.7} 0 0 1 ${cx+Math.cos(a2)*rx*.7} ${cy+Math.sin(a2)*ry*.7}`,fill:'none',stroke:col,'stroke-width':'4','pointer-events':'none'});
      g.appendChild(path);
      // Gene label dot
      const mid=(a1+a2)/2;
      const gd=svgEl('circle',{cx:cx+Math.cos(mid)*rx*.7,cy:cy+Math.sin(mid)*ry*.7,r:3.5,fill:col,opacity:'.85','pointer-events':'none'});
      gd.classList.add('gene-flash');gd.style.animationDelay=(a1*0.3)+'s';
      g.appendChild(gd);
    });
    // ori label
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.55),'pointer-events':'none'})).textContent='ori';
  }

  // ── RIBOSOME 70S ─────────────────────────────────────────────────────────
  if(id.startsWith('ribosome70s')){
    // 50S subunit (large) — animated
    const s50=svgEl('ellipse',{cx,cy:cy-ry*.15,rx:rx*.78,ry:ry*.55,fill:hex2rgba(c,.78),stroke:hex2rgba(c,.45),'stroke-width':'1.5','pointer-events':'none'});
    s50.classList.add('ribo-dock');g.appendChild(s50);
    // 30S subunit (small)
    const s30=svgEl('ellipse',{cx:cx+rx*.06,cy:cy+ry*.35,rx:rx*.55,ry:ry*.35,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.3),'stroke-width':'1','pointer-events':'none'});
    s30.classList.add('ribo-dock');s30.style.animationDelay='.35s';g.appendChild(s30);
    // mRNA threading
    const mrna=svgEl('line',{x1:cx-rx*.9,y1:cy+ry*.15,x2:cx+rx*.9,y2:cy+ry*.15,stroke:'rgba(251,191,36,.55)','stroke-width':'1.5','stroke-dasharray':'4 2','pointer-events':'none'});
    mrna.classList.add('protein-flow');g.appendChild(mrna);
    // Nascent polypeptide emerging from exit tunnel
    const pp=svgEl('path',{d:`M${cx+rx*.3} ${cy-ry*.65} Q${cx+rx*.6} ${cy-ry*.9} ${cx+rx*.85} ${cy-ry*1.05}`,fill:'none',stroke:'rgba(148,163,184,.55)','stroke-width':'2','stroke-linecap':'round','pointer-events':'none'});
    pp.classList.add('protein-flow');pp.style.animationDelay='.5s';g.appendChild(pp);
    // Subunit labels
    g.appendChild(svgEl('text',{x:cx-rx*.2,y:cy-ry*.05,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.6),'pointer-events':'none'})).textContent='50S';
    g.appendChild(svgEl('text',{x:cx+rx*.1,y:cy+ry*.42,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='30S';
    // tRNA at A and P sites
    [{dx:-.15,dy:-.55,col:'#10b981',lbl:'P'},{dx:.15,dy:-.52,col:'#f59e0b',lbl:'A'}].forEach(({dx,dy,col,lbl})=>{
      const tx=svgEl('text',{x:cx+dx*rx*2,y:cy+dy*ry,'text-anchor':'middle','font-size':'6',fill:col,'pointer-events':'none','font-weight':'bold'});
      tx.textContent=lbl;g.appendChild(tx);
    });
  }

  // ── PILI ─────────────────────────────────────────────────────────────────
  if(id==='pili'){
    // Multiple pili extending in different angles
    const piliData=[{dx:-2,dy:0,a:-5},{dx:0,dy:0,a:0},{dx:2,dy:0,a:5},{dx:-3,dy:0,a:-10},{dx:3,dy:0,a:10}];
    piliData.forEach(({dx,dy,a},i)=>{
      const px=cx+(dx*4);
      const rad=a*Math.PI/180;
      const ex=px+Math.sin(rad)*ry*1.8,ey=cy-ry*.85+Math.cos(rad)*ry*1.8-ry;
      const pil=svgEl('line',{x1:px,y1:cy-ry*.85,x2:px+Math.sin(rad)*ry,y2:cy+ry*.85,stroke:hex2rgba(c,.62),'stroke-width':'2.2','stroke-linecap':'round','pointer-events':'none'});
      pil.classList.add('pili-line');pil.style.animationDelay=(i*0.3)+'s';
      g.appendChild(pil);
      // Adhesin tip (FimH)
      const adh=svgEl('circle',{cx:px+(i-2)*0.5,cy:cy+ry*.88,r:3,fill:hex2rgba(c,.88),'pointer-events':'none'});
      adh.classList.add('adhesin');adh.style.animationDelay=(i*0.3)+'s';
      g.appendChild(adh);
    });
    // Assembly platform (Sec pore at base)
    g.appendChild(svgEl('rect',{x:cx-8,y:cy-ry*.9-4,width:16,height:6,rx:2,fill:hex2rgba(c,.25),stroke:hex2rgba(c,.4),'stroke-width':'1','pointer-events':'none'}));
    // Pilins label
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.65,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.45),'pointer-events':'none'})).textContent='pilina';
  }

  // ── FLAGELLA (bacterial) ─────────────────────────────────────────────────
  if(id==='flagella'){
    // Helical filament (flagellin polymer) — animated wave
    const fil=svgEl('path',{d:`M${cx} ${cy+ry*.75} C${cx-22} ${cy+ry*.38} ${cx+22} ${cy} ${cx-16} ${cy-ry*.38} S${cx+20} ${cy-ry*.72} ${cx} ${cy-ry*.9}`,fill:'none',stroke:hex2rgba(c,.88),'stroke-width':'3','stroke-linecap':'round','pointer-events':'none'});
    fil.style.animation='erPulse 2s ease-in-out infinite';
    g.appendChild(fil);
    // Hook (FlgE)
    g.appendChild(svgEl('path',{d:`M${cx} ${cy+ry*.75} Q${cx+12} ${cy+ry*.82} ${cx+4} ${cy+ry*.92}`,fill:'none',stroke:hex2rgba(c,.75),'stroke-width':'4','stroke-linecap':'round','pointer-events':'none'}));
    // Basal body — L, P, M, S rings
    const rings=[{r:7,col:.55,y:0},{r:5.5,col:.65,y:8},{r:4.5,col:.75,y:14},{r:6,col:.45,y:-6}];
    rings.forEach(({r,col,y},i)=>{
      g.appendChild(svgEl('circle',{cx:cx+4,cy:cy+ry*.92+y,r,fill:'none',stroke:hex2rgba(c,col),'stroke-width':'2','pointer-events':'none'}));
    });
    // Motor stator (MotA/MotB)
    g.appendChild(svgEl('circle',{cx:cx+4,cy:cy+ry*.92+14,r:10,fill:'none',stroke:hex2rgba(c,.3),'stroke-width':'3','stroke-dasharray':'5 3','pointer-events':'none'}));
    // Rotation arrow
    g.appendChild(svgEl('text',{x:cx+16,y:cy+ry*.92+12,'font-size':'9',fill:hex2rgba(c,.55),'pointer-events':'none'})).textContent='↺';
    // CW/CCW label
    g.appendChild(svgEl('text',{x:cx-rx*.5,y:cy,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.45),'pointer-events':'none'})).textContent='flagelina';
  }

  // ── CELL WALL (bacterial) ─────────────────────────────────────────────────
  if(id==='cell_wall_p'){
    // Thick peptidoglycan layer
    for(let layer=0;layer<3;layer++){
      const s=0.88+layer*.04;
      const lyr=svgEl('ellipse',{cx,cy,rx:rx*s,ry:ry*s,fill:'none',stroke:hex2rgba(c,.3-layer*.08),'stroke-width':'3','pointer-events':'none'});
      lyr.classList.add('wall-fibril');lyr.style.animationDelay=(layer*0.6)+'s';
      g.appendChild(lyr);
    }
    // Peptidoglycan crosslink bridges
    for(let i=0;i<10;i++){
      const a=i/10*Math.PI*2;
      const r1=rx*.86,r2=rx*.98;
      const br=svgEl('line',{x1:cx+Math.cos(a)*r1,y1:cy+Math.sin(a)*ry*.86,x2:cx+Math.cos(a+0.25)*r2,y2:cy+Math.sin(a+0.25)*ry*.98,stroke:hex2rgba(c,.4),'stroke-width':'1.5','pointer-events':'none'});
      br.classList.add('filament-line');br.style.animationDelay=(i*0.2)+'s';
      g.appendChild(br);
    }
    // PBP (penicillin-binding protein) markers
    [0.5,2.1,3.8,5.2].forEach((a,i)=>{
      const pbpx=cx+Math.cos(a)*rx*.92,pbpy=cy+Math.sin(a)*ry*.92;
      g.appendChild(svgEl('rect',{x:pbpx-3,y:pbpy-6,width:6,height:12,rx:2,fill:'rgba(239,68,68,.4)',stroke:'rgba(239,68,68,.55)','stroke-width':'1','pointer-events':'none'}));
    });
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.4),'pointer-events':'none'})).textContent='peptidoglicano';
  }

  // ── CAPSULE ───────────────────────────────────────────────────────────────
  if(id==='capsule'){
    // Polysaccharide network — multiple animated shells
    for(let i=0;i<3;i++){
      const s=0.88+i*.04;
      const shell=svgEl('ellipse',{cx,cy,rx:rx*s,ry:ry*s,fill:'none',stroke:hex2rgba(c,.18+i*.06),'stroke-width':'4-i','stroke-dasharray':`${12+i*3} ${5+i*2}`,'pointer-events':'none'});
      shell.style.animation=`erPulse ${3+i}s ease-in-out infinite`;
      shell.style.animationDelay=(i*0.7)+'s';
      g.appendChild(shell);
    }
    // Polysaccharide fibril nodes
    for(let i=0;i<12;i++){
      const a=i/12*Math.PI*2;
      const fr=.82+Math.sin(i)*0.08;
      const fib=svgEl('circle',{cx:cx+Math.cos(a)*rx*fr,cy:cy+Math.sin(a)*ry*fr,r:3.5,fill:hex2rgba(c,.38),stroke:hex2rgba(c,.55),'stroke-width':'1','pointer-events':'none'});
      fib.style.animation=`lysoDigest ${2+i*0.2}s ease-in-out infinite`;
      fib.style.animationDelay=(i*0.18)+'s';
      g.appendChild(fib);
    }
    // Fibril connection lines
    for(let i=0;i<12;i+=2){
      const a1=i/12*Math.PI*2,a2=(i+1)/12*Math.PI*2;
      g.appendChild(svgEl('line',{x1:cx+Math.cos(a1)*rx*.88,y1:cy+Math.sin(a1)*ry*.88,x2:cx+Math.cos(a2)*rx*.88,y2:cy+Math.sin(a2)*ry*.88,stroke:hex2rgba(c,.2),'stroke-width':'1','pointer-events':'none'}));
    }
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.38),'pointer-events':'none'})).textContent='polisacáridos';
  }

  // ── FUNGI ORGANELLES ──────────────────────────────────────────────────────

  if(id==='chitin_wall'){
    const fibCount=10;
    for(let i=0;i<fibCount;i++){
      const a=i/fibCount*Math.PI*2;
      const r1=rx*.9,r2=rx*.98;
      const fib=svgEl('line',{x1:cx+Math.cos(a)*r1,y1:cy+Math.sin(a)*ry*.9,x2:cx+Math.cos(a+.6)*r2,y2:cy+Math.sin(a+.6)*ry*.98,stroke:hex2rgba(c,.38),'stroke-width':'2','pointer-events':'none'});
      fib.classList.add('chitin-wall');fib.style.animationDelay=(i*0.3)+'s';g.appendChild(fib);
    }
    // β-glucan cross-links
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI*2;
      const link=svgEl('ellipse',{cx:cx+Math.cos(a)*rx*.94,cy:cy+Math.sin(a)*ry*.94,rx:3.5,ry:3.5,fill:hex2rgba(c,.3),stroke:hex2rgba(c,.5),'stroke-width':'1','pointer-events':'none'});
      link.classList.add('spore-pulse');link.style.animationDelay=(i*0.4)+'s';g.appendChild(link);
    }
    // Inner mannoprotein layer
    for(let i=0;i<7;i++){
      const a=i/7*Math.PI*2;
      g.appendChild(svgEl('circle',{cx:cx+Math.cos(a)*rx*.78,cy:cy+Math.sin(a)*ry*.78,r:2.5,fill:'rgba(167,139,250,.4)','pointer-events':'none'}));
    }
    // GPI-anchored proteins on surface
    [[.2,.9],[-.3,.88],[.5,.85],[-.55,.82]].forEach(([dx,dy])=>{
      g.appendChild(svgEl('rect',{x:cx+dx*rx-2,y:cy+dy*ry-6,width:4,height:12,rx:2,fill:hex2rgba(c,.4),stroke:hex2rgba(c,.6),'stroke-width':'1','pointer-events':'none'}));
    });
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.45),'pointer-events':'none'})).textContent='quitina β-1,4';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.6,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.35),'pointer-events':'none'})).textContent='β-glucano';
  }

  if(id==='membrane_f'){
    const n=24;
    for(let i=0;i<n;i++){
      const a=i/n*Math.PI*2;
      const d1=svgEl('circle',{cx:cx+Math.cos(a)*rx*.97,cy:cy+Math.sin(a)*ry*.97,r:2.8,fill:hex2rgba(c,.45),'pointer-events':'none'});
      d1.style.animation=`nucleusPulse ${2.5+i*0.08}s ease-in-out infinite`;d1.style.animationDelay=(i*0.1)+'s';g.appendChild(d1);
      const d2=svgEl('circle',{cx:cx+Math.cos(a)*rx*.87,cy:cy+Math.sin(a)*ry*.87,r:2.8,fill:hex2rgba(c,.28),'pointer-events':'none'});
      d2.style.animation=`nucleusPulse ${2.5+i*0.08}s ease-in-out infinite`;d2.style.animationDelay=((i*0.1)+0.15)+'s';g.appendChild(d2);
    }
    // Ergosterol markers (diamond shapes)
    [0.4,1.8,3.2,4.6].forEach((a,i)=>{
      const ex=cx+Math.cos(a)*rx*.92,ey=cy+Math.sin(a)*ry*.92;
      g.appendChild(svgEl('rect',{x:ex-4,y:ey-4,width:8,height:8,rx:1,transform:`rotate(45,${ex},${ey})`,fill:hex2rgba('#fbbf24',.55),stroke:'rgba(251,191,36,.7)','stroke-width':'1','pointer-events':'none'}));
    });
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.45),'pointer-events':'none'})).textContent='ergosterol';
  }

  if(id==='nucleus_f'||id==='nucleolus_f'){
    if(id==='nucleus_f'){
      // Closed mitosis hint — SPB on envelope
      [.92,.82].forEach((s,i)=>{
        const env=svgEl('ellipse',{cx,cy,rx:rx*s,ry:ry*s,fill:'none',stroke:hex2rgba(c,i===0?.3:.15),'stroke-width':i===0?'2.5':'1.2','stroke-dasharray':i===1?'5 3':'none','pointer-events':'none'});g.appendChild(env);
      });
      for(let i=0;i<10;i++){
        const a=i/10*Math.PI*2;const px=cx+Math.cos(a)*rx*.95,py=cy+Math.sin(a)*ry*.95;
        const pore=svgEl('circle',{cx:px,cy:py,r:3.5,fill:c,opacity:'.6','pointer-events':'none'});pore.classList.add('nucleus-pore');pore.style.animationDelay=(i*0.28)+'s';g.appendChild(pore);
      }
      // SPB (spindle pole body) — embedded in envelope
      const spb=svgEl('rect',{x:cx+rx*.88,y:cy-6,width:10,height:12,rx:2,fill:'rgba(251,191,36,.8)',stroke:'rgba(251,191,36,.4)','stroke-width':'1.5','pointer-events':'none'});
      spb.style.animation='ribosomeDock 2s ease-in-out infinite';g.appendChild(spb);
      g.appendChild(svgEl('text',{x:cx+rx*.93+5,y:cy-10,'text-anchor':'middle','font-size':'6',fill:'rgba(251,191,36,.75)','pointer-events':'none'})).textContent='SPB';
      const nuc=svgEl('ellipse',{cx:cx+rx*.1,cy:cy-ry*.05,rx:rx*.32,ry:ry*.28,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.7),'stroke-width':'1.5','pointer-events':'none'});nuc.classList.add('nucleolus-glow');g.appendChild(nuc);
    }
    if(id==='nucleolus_f'){
      g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.35,ry:ry*.35,fill:hex2rgba(c,.85),'pointer-events':'none'}));
      const dfc=svgEl('ellipse',{cx,cy,rx:rx*.6,ry:ry*.6,fill:'none',stroke:hex2rgba(c,.55),'stroke-width':'2.5','stroke-dasharray':'4 2','pointer-events':'none'});dfc.classList.add('nucleolus-glow');g.appendChild(dfc);
      g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.88,ry:ry*.88,fill:'none',stroke:hex2rgba(c,.22),'stroke-width':'1.5','pointer-events':'none'}));
      for(let i=0;i<5;i++){
        const a=i/5*Math.PI*2;
        const strand=svgEl('path',{d:`M${cx+Math.cos(a)*rx*.35} ${cy+Math.sin(a)*ry*.35} Q${cx+Math.cos(a+.3)*rx*.65} ${cy+Math.sin(a+.3)*ry*.65} ${cx+Math.cos(a)*rx*.88} ${cy+Math.sin(a)*ry*.88}`,fill:'none',stroke:hex2rgba(c,.4),'stroke-width':'1.5','stroke-linecap':'round','pointer-events':'none'});
        strand.style.animation=`nucleolusGlow ${2+i*0.3}s ease-in-out infinite`;strand.style.animationDelay=(i*0.4)+'s';g.appendChild(strand);
      }
    }
  }

  if(id==='mito_f'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.95,ry:ry*.95,fill:'none',stroke:hex2rgba(c,.45),'stroke-width':'2','pointer-events':'none'}));
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.82,ry:ry*.82,fill:'none',stroke:hex2rgba(c,.3),'stroke-width':'1.2','stroke-dasharray':'6 3','pointer-events':'none'}));
    for(let i=1;i<=4;i++){
      const lx=cx-rx*.65+(rx*1.3/4)*i*.9;
      const cresta=svgEl('path',{d:`M${lx} ${cy-ry*.68} Q${lx+rx*.12} ${cy} ${lx} ${cy+ry*.68}`,fill:'none',stroke:hex2rgba(c,.7),'stroke-width':'2.2','stroke-linecap':'round','pointer-events':'none'});
      cresta.classList.add('mito-cresta');cresta.style.animationDelay=(i*0.35)+'s';g.appendChild(cresta);
    }
    // Ethanol label (fermentation)
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.6,'text-anchor':'middle','font-size':'7',fill:'rgba(251,191,36,.7)','pointer-events':'none','font-style':'italic'})).textContent='EtOH/ATP';
  }

  if(id==='er_f'){
    for(let i=0;i<3;i++){
      const y=cy-ry*.5+ry*.42*i;
      let d=`M${cx-rx*.88} ${y}`;
      for(let j=0;j<=4;j++)d+=` Q${cx-rx*.65+j*rx*.38} ${y+(j%2===0?-6:6)} ${cx-rx*.5+j*rx*.34} ${y}`;
      const cis=svgEl('path',{d,fill:'none',stroke:hex2rgba(c,.5+i*.07),'stroke-width':'2','pointer-events':'none'});
      cis.classList.add('er-tube');cis.style.animationDelay=(i*0.6)+'s';g.appendChild(cis);
    }
    // Ribosomes on surface
    [{rx:-.6,ry:-.4},{rx:.2,ry:-.4},{rx:-.2,ry:.3}].forEach(({rx:rpx,ry:rpy},i)=>{
      const rb=svgEl('circle',{cx:cx+rpx*rx,cy:cy+rpy*ry,r:3.2,fill:'#94a3b8','pointer-events':'none'});rb.classList.add('ribosome-active');rb.style.animationDelay=(i*0.22)+'s';g.appendChild(rb);
    });
    // Lumen label
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.4,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.35),'pointer-events':'none','font-style':'italic'})).textContent='lumen';
    // UPR sensor on membrane
    const ire1=svgEl('rect',{x:cx+rx*.65,y:cy-ry*.55,width:12,height:18,rx:4,fill:'rgba(251,191,36,.45)',stroke:'rgba(251,191,36,.6)','stroke-width':'1.2','pointer-events':'none'});
    ire1.classList.add('ribosome-active');ire1.style.animationDelay='.8s';g.appendChild(ire1);
    g.appendChild(svgEl('text',{x:cx+rx*.71,y:cy-ry*.35,'text-anchor':'middle','font-size':'5.5',fill:'rgba(251,191,36,.75)','pointer-events':'none'})).textContent='Ire1p';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.65,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.45),'pointer-events':'none','font-style':'italic'})).textContent='Kar2p/BiP';
  }

  if(id==='golgi_f'){
    // Dispersed cisternae (not stacked) — fungi Golgi
    const cisPositions=[{dx:-25,dy:-20},{dx:15,dy:-12},{dx:-10,dy:12},{dx:20,dy:20}];
    cisPositions.forEach(({dx,dy},i)=>{
      const arc=svgEl('path',{d:`M${cx+dx-rx*.35} ${cy+dy} Q${cx+dx} ${cy+dy-6} ${cx+dx+rx*.35} ${cy+dy}`,fill:'none',stroke:hex2rgba(c,.5+i*.08),'stroke-width':'3','stroke-linecap':'round','pointer-events':'none'});
      arc.classList.add('golgi-arc');arc.style.animationDelay=(i*0.35)+'s';g.appendChild(arc);
    });
    // Vesicles for O-mannosylation
    [[rx*.7,8,4.5],[rx*.8,-10,3.5],[rx*.65,-22,3],[rx*.75,22,3]].forEach(([vx,vy,vr],i)=>{
      const ves=svgEl('circle',{cx:cx+vx,cy:cy+vy,r:vr,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.8),'stroke-width':'1','pointer-events':'none'});
      ves.classList.add('vesicle-float');ves.style.animationDelay=(i*0.8)+'s';g.appendChild(ves);
      g.appendChild(svgEl('line',{x1:cx+rx*.9*.72,y1:cy+vy,x2:cx+vx-vr,y2:cy+vy,stroke:hex2rgba(c,.25),'stroke-width':'1','pointer-events':'none'}));
    });
    // Incoming vesicles from ER
    [[-rx*.78,-16,3.5],[-rx*.82,14,3]].forEach(([vx,vy,vr],i)=>{
      const iv=svgEl('circle',{cx:cx+vx,cy:cy+vy,r:vr,fill:hex2rgba(c,.3),stroke:hex2rgba(c,.5),'stroke-width':'1','stroke-dasharray':'2 1','pointer-events':'none'});
      iv.classList.add('vesicle-pop');iv.style.animationDelay=(i*1.3)+'s';g.appendChild(iv);
    });
    g.appendChild(svgEl('text',{x:cx-rx*.82,y:cy-ry*.65,'font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none','font-weight':'700'})).textContent='cis';
    g.appendChild(svgEl('text',{x:cx-rx*.82,y:cy+ry*.75,'font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none','font-weight':'700'})).textContent='trans';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.9,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.4),'pointer-events':'none'})).textContent='O-manosilación';
  }

  if(id==='vacuole_f'){
    for(let i=1;i<=3;i++){
      const ring=svgEl('ellipse',{cx,cy,rx:rx*(0.25+i*.22),ry:ry*(0.25+i*.22),fill:'none',stroke:hex2rgba(c,.06+i*.04),'stroke-width':'1.5','pointer-events':'none'});
      ring.style.animation=`vacuoleRipple ${3+i*.6}s ease-out infinite`;ring.style.animationDelay=(i*0.9)+'s';g.appendChild(ring);
    }
    // Polyphosphate granules
    for(let i=0;i<5;i++){
      const a=i/5*Math.PI*2,r=.25+Math.random()*.3;
      const pp=svgEl('circle',{cx:cx+Math.cos(a)*rx*r,cy:cy+Math.sin(a)*ry*r,r:3.5,fill:'rgba(251,191,36,.6)',stroke:'rgba(251,191,36,.3)','stroke-width':'1','pointer-events':'none'});
      pp.style.animation=`lysoDigest ${2+i*0.3}s ease-in-out infinite`;pp.style.animationDelay=(i*0.5)+'s';g.appendChild(pp);
    }
    // V-ATPase icon
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'9',fill:'rgba(125,211,252,.8)','pointer-events':'none','font-weight':'bold'})).textContent='H⁺';
    g.appendChild(svgEl('text',{x:cx,y:cy-rx*.55,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.55),'pointer-events':'none'})).textContent='pH ~6';
  }

  if(id==='ribosome_f'){
    const large=svgEl('ellipse',{cx,cy:cy-ry*.18,rx:rx*.78,ry:ry*.58,fill:hex2rgba(c,.75),stroke:hex2rgba(c,.4),'stroke-width':'1.5','pointer-events':'none'});large.classList.add('ribo-dock');g.appendChild(large);
    const small=svgEl('ellipse',{cx:cx+rx*.08,cy:cy+ry*.32,rx:rx*.58,ry:ry*.38,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.3),'stroke-width':'1','pointer-events':'none'});small.classList.add('ribo-dock');small.style.animationDelay='.4s';g.appendChild(small);
    g.appendChild(svgEl('text',{x:cx-rx*.5,y:cy-ry*.05,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.6),'pointer-events':'none'})).textContent='60S';
    g.appendChild(svgEl('text',{x:cx+rx*.1,y:cy+ry*.42,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='40S';
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*1.2,'text-anchor':'middle','font-size':'6.5',fill:'rgba(251,191,36,.7)','pointer-events':'none'})).textContent='80S';
  }

  if(id==='woronin'){
    // Crystalline hexagonal matrix
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.7,ry:ry*.7,fill:hex2rgba(c,.3),stroke:hex2rgba(c,.65),'stroke-width':'2','pointer-events':'none'}));
    // Hex pattern
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2;
      g.appendChild(svgEl('line',{x1:cx,y1:cy,x2:cx+Math.cos(a)*rx*.65,y2:cy+Math.sin(a)*ry*.65,stroke:hex2rgba(c,.5),'stroke-width':'1.2','pointer-events':'none'}));
    }
    g.appendChild(svgEl('circle',{cx,cy,r:rx*.18,fill:hex2rgba(c,.8),'pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*1.25,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.6),'pointer-events':'none'})).textContent='HEX-1';
  }

  if(id==='lipid_drop'){
    // Oil body — concentric glow
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.8,ry:ry*.8,fill:hex2rgba(c,.4),'pointer-events':'none'}));
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.55,ry:ry*.55,fill:hex2rgba(c,.6),'pointer-events':'none'}));
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.3,ry:ry*.3,fill:hex2rgba(c,.8),'pointer-events':'none'}));
    // Monolayer proteins
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2;
      g.appendChild(svgEl('rect',{x:cx+Math.cos(a)*rx*.83-2,y:cy+Math.sin(a)*ry*.83-4,width:4,height:8,rx:2,fill:'rgba(251,191,36,.6)','pointer-events':'none'}));
    }
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:'rgba(6,11,26,.8)','pointer-events':'none','font-weight':'bold'})).textContent='TAG';
  }

  if(id==='hyphal_pore'){
    // Septa walls (quitina)
    for(let i=-1;i<=1;i++){
      const pcy=cy+i*18;
      const ch=svgEl('rect',{x:cx-rx,y:pcy-5,width:rx*2,height:10,rx:2,fill:hex2rgba(c,.35),stroke:hex2rgba(c,.65),'stroke-width':'2','pointer-events':'none'});
      ch.classList.add('chitin-wall');ch.style.animationDelay=(Math.abs(i)*0.5)+'s';g.appendChild(ch);
      // Central pore opening
      g.appendChild(svgEl('circle',{cx,cy:pcy,r:5.5,fill:'rgba(6,11,26,.9)',stroke:hex2rgba(c,.55),'stroke-width':'2','pointer-events':'none'}));
    }
    // Flow arrows through pore
    for(let i=0;i<3;i++){
      const arr=svgEl('text',{x:cx+(i-1)*12,y:cy+4,'text-anchor':'middle','font-size':'9',fill:'rgba(125,211,252,.5)','pointer-events':'none'});
      arr.textContent='↓';arr.style.animation=`axonFlow ${1.4+i*0.3}s linear infinite`;arr.style.animationDelay=(i*0.4)+'s';g.appendChild(arr);
    }
    // Woronin body nearby
    const wb=svgEl('circle',{cx:cx+rx*.55,cy:cy-14,r:5.5,fill:'rgba(240,171,252,.65)',stroke:'rgba(240,171,252,.85)','stroke-width':'1.5','pointer-events':'none'});
    wb.classList.add('spore-pulse');g.appendChild(wb);
    // Hex pattern inside woronin
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2;
      g.appendChild(svgEl('line',{x1:cx+rx*.55,y1:cy-14,x2:cx+rx*.55+Math.cos(a)*4,y2:cy-14+Math.sin(a)*4,stroke:'rgba(240,171,252,.5)','stroke-width':'0.8','pointer-events':'none'}));
    }
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.7,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='comunicación hifal';
    g.appendChild(svgEl('text',{x:cx+rx*.55,y:cy-22,'text-anchor':'middle','font-size':'5.5',fill:'rgba(240,171,252,.65)','pointer-events':'none'})).textContent='Woronin';
  }

  // ── NEURON ORGANELLES ──────────────────────────────────────────────────────

  if(id==='neuron_membrane'){
    // Ion channel density
    const n=20;
    for(let i=0;i<n;i++){
      const a=i/n*Math.PI*2;
      const d1=svgEl('circle',{cx:cx+Math.cos(a)*rx*.97,cy:cy+Math.sin(a)*ry*.97,r:2.5,fill:hex2rgba(c,.45),'pointer-events':'none'});
      d1.style.animation=`synapseFire ${1.5+i*0.15}s ease-in-out infinite`;d1.style.animationDelay=(i*0.12)+'s';g.appendChild(d1);
    }
    // Na+ and K+ channel labels
    ['Na⁺','K⁺','Ca²⁺'].forEach((ion,i)=>{
      const a=(i/3)*Math.PI*2+0.5;
      g.appendChild(svgEl('text',{x:cx+Math.cos(a)*rx*.72,y:cy+Math.sin(a)*ry*.72+3,'text-anchor':'middle','font-size':'7',fill:'rgba(251,191,36,.8)','pointer-events':'none','font-weight':'bold'})).textContent=ion;
    });
    // Action potential wave
    const ap=svgEl('path',{d:`M${cx-rx*.85} ${cy} L${cx-rx*.5} ${cy} L${cx-rx*.3} ${cy-ry*.7} L${cx} ${cy+ry*.4} L${cx+rx*.2} ${cy} L${cx+rx*.85} ${cy}`,fill:'none',stroke:'rgba(251,191,36,.65)','stroke-width':'2','stroke-linecap':'round','pointer-events':'none'});
    ap.style.animation='dendriteWave 2s ease-in-out infinite';g.appendChild(ap);
    // Pump proteins (Na+/K+ ATPase)
    [1.2,2.8,4.4,5.8].forEach((a,i)=>{
      const px=cx+Math.cos(a)*rx*.94,py=cy+Math.sin(a)*ry*.94;
      g.appendChild(svgEl('rect',{x:px-3,y:py-6,width:6,height:12,rx:3,fill:'rgba(251,191,36,.5)',stroke:'rgba(251,191,36,.7)','stroke-width':'1','pointer-events':'none'}));
    });
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.7,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='-70 mV';
    g.appendChild(svgEl('text',{x:cx-rx*.65,y:cy-ry*.65,'font-size':'5.5',fill:'rgba(251,191,36,.55)','pointer-events':'none'})).textContent='Nav';
    g.appendChild(svgEl('text',{x:cx+rx*.55,y:cy+ry*.62,'font-size':'5.5',fill:'rgba(125,211,252,.55)','pointer-events':'none'})).textContent='Kv';
  }

  if(id==='soma_nucleus'){
    [.92,.82].forEach((s,i)=>{
      const env=svgEl('ellipse',{cx,cy,rx:rx*s,ry:ry*s,fill:'none',stroke:hex2rgba(c,i===0?.3:.15),'stroke-width':i===0?'2.5':'1.2','stroke-dasharray':i===1?'5 3':'none','pointer-events':'none'});g.appendChild(env);
    });
    for(let i=0;i<10;i++){
      const a=i/10*Math.PI*2;const px=cx+Math.cos(a)*rx*.95,py=cy+Math.sin(a)*ry*.95;
      const pore=svgEl('circle',{cx:px,cy:py,r:3.5,fill:c,opacity:'.6','pointer-events':'none'});pore.classList.add('nucleus-pore');pore.style.animationDelay=(i*0.28)+'s';g.appendChild(pore);
    }
    const nuc=svgEl('ellipse',{cx,cy,rx:rx*.42,ry:ry*.38,fill:hex2rgba(c,.6),stroke:hex2rgba(c,.75),'stroke-width':'2','pointer-events':'none'});nuc.classList.add('nucleolus-glow');g.appendChild(nuc);
    // Post-mitotic label
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*1.4,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='postmitótico';
  }

  if(id==='nucleolus_n'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.38,ry:ry*.38,fill:hex2rgba(c,.85),'pointer-events':'none'}));
    const dfc=svgEl('ellipse',{cx,cy,rx:rx*.65,ry:ry*.65,fill:'none',stroke:hex2rgba(c,.55),'stroke-width':'2.5','stroke-dasharray':'4 2','pointer-events':'none'});dfc.classList.add('nucleolus-glow');g.appendChild(dfc);
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.88,ry:ry*.88,fill:'none',stroke:hex2rgba(c,.2),'stroke-width':'1.5','pointer-events':'none'}));
    for(let i=0;i<4;i++){
      const a=i/4*Math.PI*2;
      const strand=svgEl('path',{d:`M${cx+Math.cos(a)*rx*.38} ${cy+Math.sin(a)*ry*.38} Q${cx+Math.cos(a+.3)*rx*.65} ${cy+Math.sin(a+.3)*ry*.65} ${cx+Math.cos(a)*rx*.88} ${cy+Math.sin(a)*ry*.88}`,fill:'none',stroke:hex2rgba(c,.4),'stroke-width':'1.5','stroke-linecap':'round','pointer-events':'none'});
      strand.style.animation=`nucleolusGlow ${2+i*0.3}s ease-in-out infinite`;strand.style.animationDelay=(i*0.4)+'s';g.appendChild(strand);
    }
  }

  if(id==='nissl_body'){
    // ER stacks
    for(let i=0;i<3;i++){
      const y=cy-ry*.45+ry*.42*i;
      let d=`M${cx-rx*.88} ${y}`;
      for(let j=0;j<=4;j++)d+=` Q${cx-rx*.65+j*rx*.38} ${y+(j%2===0?-5:5)} ${cx-rx*.5+j*rx*.34} ${y}`;
      const cis=svgEl('path',{d,fill:'none',stroke:hex2rgba(c,.52+i*.07),'stroke-width':'2.2','pointer-events':'none'});
      cis.classList.add('er-tube');cis.style.animationDelay=(i*0.6)+'s';g.appendChild(cis);
      // Ribosomes
      [{rx:-.6},{rx:-.2},{rx:.2},{rx:.6}].forEach(({rx:rpx})=>{
        const rb=svgEl('circle',{cx:cx+rpx*rx,cy:y,r:3,fill:'#94a3b8','pointer-events':'none'});rb.classList.add('ribosome-active');g.appendChild(rb);
      });
    }
    // Polyribosomes between stacks
    for(let i=0;i<4;i++){
      const px=cx-rx*.6+i*rx*.42,py=cy+ry*.22;
      const rb=svgEl('circle',{cx:px,cy:py,r:2.8,fill:'#94a3b8','pointer-events':'none'});rb.classList.add('ribosome-active');rb.style.animationDelay=(i*0.25)+'s';g.appendChild(rb);
      if(i<3) g.appendChild(svgEl('line',{x1:px+2.8,y1:py,x2:cx-rx*.6+(i+1)*rx*.42-2.8,y2:py,stroke:'rgba(148,163,184,.35)','stroke-width':'1','pointer-events':'none'}));
    }
    // Emerging protein thread
    const pt=svgEl('path',{d:`M${cx+rx*.3} ${cy+ry*.3} Q${cx+rx*.6} ${cy+ry*.5} ${cx+rx*.75} ${cy+ry*.2}`,fill:'none',stroke:'rgba(148,163,184,.45)','stroke-width':'1.5','stroke-linecap':'round','pointer-events':'none'});
    pt.classList.add('protein-flow');g.appendChild(pt);
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.75,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='Nissl basófilo';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.92,'text-anchor':'middle','font-size':'5.5',fill:hex2rgba(c,.35),'pointer-events':'none'})).textContent='polirribosomas';
  }

  if(id==='mito_n'){
    // Elongated axonal mitochondrion
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.95,ry:ry*.95,fill:'none',stroke:hex2rgba(c,.45),'stroke-width':'2','pointer-events':'none'}));
    for(let i=1;i<=3;i++){
      const lx=cx-rx*.6+(rx*1.2/3)*i*.9;
      const cresta=svgEl('path',{d:`M${lx} ${cy-ry*.65} Q${lx+rx*.1} ${cy} ${lx} ${cy+ry*.65}`,fill:'none',stroke:hex2rgba(c,.7),'stroke-width':'2.2','stroke-linecap':'round','pointer-events':'none'});
      cresta.classList.add('mito-cresta');cresta.style.animationDelay=(i*0.4)+'s';g.appendChild(cresta);
    }
    // Movement arrows (axonal transport)
    g.appendChild(svgEl('text',{x:cx-rx*.6,y:cy-ry*1.2,'text-anchor':'middle','font-size':'10',fill:'rgba(251,191,36,.65)','pointer-events':'none'})).textContent='→';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*1.35,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='transporte axonal';
  }

  if(id==='axon'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.9,ry:ry*.92,fill:hex2rgba(c,.1),stroke:hex2rgba(c,.45),'stroke-width':'1.5','pointer-events':'none'}));
    for(let i=0;i<3;i++){
      const x=cx+(i-1)*rx*.28;
      const mt=svgEl('line',{x1:x,y1:cy-ry*.85,x2:x,y2:cy+ry*.85,stroke:hex2rgba('#7dd3fc',.45),'stroke-width':'1.5','stroke-dasharray':'7 3','pointer-events':'none'});
      mt.classList.add('axon-flow');mt.style.animationDelay=(i*.5)+'s';g.appendChild(mt);
    }
    for(let i=0;i<2;i++){
      const x=cx+(i===0?-1:1)*rx*.52;
      const nf=svgEl('line',{x1:x,y1:cy-ry*.8,x2:x,y2:cy+ry*.8,stroke:'rgba(234,179,8,.3)','stroke-width':'1','stroke-dasharray':'4 4','pointer-events':'none'});
      nf.style.animation=`erPulse ${3.5+i}s ease-in-out infinite`;g.appendChild(nf);
    }
    const arrow=svgEl('text',{x:cx+rx*.3,y:cy,'text-anchor':'middle','font-size':'13',fill:'rgba(251,191,36,.65)','pointer-events':'none'});
    arrow.textContent='↓';arrow.style.animation='axonFlow 1.5s linear infinite';g.appendChild(arrow);
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.9,'text-anchor':'middle','font-size':'5.5',fill:hex2rgba(c,.4),'pointer-events':'none'})).textContent='axolema';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.92,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='impulso nervioso';
  }

  if(id==='myelin'){
    const segH=ry*.56,nodeH=ry*.08;
    const startY=cy-ry*.92;
    [0,1,2].forEach((i)=>{
      const y0=startY+i*(segH+nodeH);
      g.appendChild(svgEl('rect',{x:cx-rx*.88,y:y0,width:rx*1.76,height:segH,rx:5,fill:hex2rgba(c,.22),stroke:hex2rgba(c,.48),'stroke-width':'2','pointer-events':'none'}));
      [.28,.56].forEach((t,l)=>{
        const ly=y0+segH*t;
        const lam=svgEl('line',{x1:cx-rx*.82,y1:ly,x2:cx+rx*.82,y2:ly,stroke:hex2rgba(c,.28),'stroke-width':'1','pointer-events':'none'});
        lam.classList.add('myelin-seg');lam.style.animationDelay=((i*2+l)*.35)+'s';g.appendChild(lam);
      });
      if(i<2){
        const ny=y0+segH;
        g.appendChild(svgEl('rect',{x:cx-rx*.5,y:ny,width:rx,height:nodeH,rx:3,fill:'rgba(6,11,26,.92)',stroke:'rgba(251,191,36,.7)','stroke-width':'1.5','pointer-events':'none'}));
        for(let d=0;d<3;d++){
          g.appendChild(svgEl('circle',{cx:cx-rx*.25+d*rx*.25,cy:ny+nodeH*.5,r:1.8,fill:'rgba(251,191,36,.7)','pointer-events':'none'}));
        }
        g.appendChild(svgEl('text',{x:cx+rx*.95,y:ny+nodeH*.8,'font-size':'5.5',fill:'rgba(251,191,36,.6)','pointer-events':'none'})).textContent='nodo';
      }
    });
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.96,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='conducción saltatoria';
  }

  if(id==='dendrite'){
    // Multipolar dendritic tree — 7 primary dendrites radiating upward/sideways from soma
    const primaries=[
      {angle:-100,len:88,w:4},{angle:-75,len:75,w:3.5},{angle:-55,len:70,w:3.5},
      {angle:-125,len:65,w:3},{angle:-30,len:80,w:4},{angle:-10,len:72,w:3.5},{angle:10,len:60,w:3},
    ];
    primaries.forEach(({angle,len,w},i)=>{
      const rad=angle*Math.PI/180;
      const x1=cx+Math.cos(rad)*rx*.15,y1=cy+Math.sin(rad)*ry*.15;
      const x2=cx+Math.cos(rad)*len,y2=cy+Math.sin(rad)*len*.8;
      const c1x=x1+Math.cos(rad+.3)*len*.4,c1y=y1+Math.sin(rad+.3)*len*.4;
      const c2x=x2+Math.cos(rad-.2)*len*.2,c2y=y2+Math.sin(rad-.2)*len*.2;
      const br=svgEl('path',{d:`M${x1} ${y1} C${c1x} ${c1y} ${c2x} ${c2y} ${x2} ${y2}`,fill:'none',stroke:hex2rgba(c,.6),'stroke-width':w,'stroke-linecap':'round','pointer-events':'none'});
      br.classList.add('dendrite-wave');br.style.animationDelay=(i*.4)+'s';g.appendChild(br);
      if(len>65){
        const srad=rad+.4;
        const sx1=cx+Math.cos(rad)*len*.6,sy1=cy+Math.sin(rad)*len*.55;
        const sx2=sx1+Math.cos(srad)*len*.35,sy2=sy1+Math.sin(srad)*len*.35;
        const sb=svgEl('path',{d:`M${sx1} ${sy1} Q${(sx1+sx2)/2+8} ${(sy1+sy2)/2-5} ${sx2} ${sy2}`,fill:'none',stroke:hex2rgba(c,.45),'stroke-width':w*.6,'stroke-linecap':'round','pointer-events':'none'});
        sb.classList.add('dendrite-wave');sb.style.animationDelay=(i*.4+.2)+'s';g.appendChild(sb);
      }
      for(let s=0;s<3;s++){
        const t=.3+s*.25;
        const spine=svgEl('circle',{cx:cx+Math.cos(rad)*len*t,cy:cy+Math.sin(rad)*len*.8*t,r:3,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.8),'stroke-width':'1','pointer-events':'none'});
        spine.style.animation=`synapseFire ${2.5+i*.3+s*.15}s ease-in-out infinite`;spine.style.animationDelay=(i*.4+s*.2)+'s';g.appendChild(spine);
      }
    });
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.82,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='árbol dendrítico';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*1.02,'text-anchor':'middle','font-size':'5.5',fill:hex2rgba(c,.35),'pointer-events':'none'})).textContent='neurona multipolar';
  }

  if(id==='synapse'){
    // Presynaptic terminal bulb
    g.appendChild(svgEl('ellipse',{cx,cy:cy-ry*.15,rx:rx*.85,ry:ry*.65,fill:hex2rgba(c,.15),stroke:hex2rgba(c,.35),'stroke-width':'1.5','pointer-events':'none'}));
    // Synaptic vesicles
    const vesPos=[{x:-.5,y:-.3},{x:-.15,y:-.45},{x:.22,y:-.35},{x:.5,y:-.15},{x:-.4,y:.1},{x:.1,y:.05},{x:.42,y:.1}];
    vesPos.forEach(({x,y},i)=>{
      const ves=svgEl('circle',{cx:cx+x*rx,cy:cy+y*ry,r:4,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.8),'stroke-width':'1','pointer-events':'none'});
      ves.classList.add('vesicle-float');ves.style.animationDelay=(i*0.3)+'s';g.appendChild(ves);
    });
    // Synaptic cleft
    g.appendChild(svgEl('line',{x1:cx-rx*.8,y1:cy+ry*.52,x2:cx+rx*.8,y2:cy+ry*.52,stroke:'rgba(251,191,36,.4)','stroke-width':'1','stroke-dasharray':'3 2','pointer-events':'none'}));
    // Neurotransmitter release dots
    for(let i=0;i<4;i++){
      const sx=cx-rx*.4+i*rx*.27;
      const dot=svgEl('circle',{cx:sx,cy:cy+ry*.48,r:2.5,fill:'rgba(251,191,36,.8)','pointer-events':'none'});
      dot.classList.add('synapse-dot');dot.style.animationDelay=(i*0.3)+'s';g.appendChild(dot);
    }
    // Postsynaptic density
    g.appendChild(svgEl('rect',{x:cx-rx*.75,y:cy+ry*.58,width:rx*1.5,height:ry*.22,rx:3,fill:hex2rgba(c,.22),stroke:hex2rgba(c,.4),'stroke-width':'1.5','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.88,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='postsinapsis';
  }

  if(id==='axon_hillock'){
    // Cone shape converging to axon
    const hillPath=svgEl('path',{d:`M${cx-rx*.85} ${cy-ry*.75} Q${cx} ${cy-ry*.85} ${cx+rx*.85} ${cy-ry*.75} Q${cx+rx*.45} ${cy+ry*.5} ${cx+rx*.28} ${cy+ry*.85} L${cx-rx*.28} ${cy+ry*.85} Q${cx-rx*.45} ${cy+ry*.5} ${cx-rx*.85} ${cy-ry*.75}`,fill:hex2rgba(c,.18),stroke:hex2rgba(c,.45),'stroke-width':'2.5','pointer-events':'none'});g.appendChild(hillPath);
    // High Nav channel density
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI*2;const r=.5+Math.random()*.3;
      const ch=svgEl('rect',{x:cx+Math.cos(a)*rx*r-2,y:cy+Math.sin(a)*ry*r-5,width:4,height:10,rx:2,fill:hex2rgba(c,.55),'pointer-events':'none'});
      ch.style.animation=`synapseFire ${1.5+i*0.2}s ease-in-out infinite`;ch.style.animationDelay=(i*0.18)+'s';g.appendChild(ch);
    }
    // Threshold line
    g.appendChild(svgEl('line',{x1:cx-rx*.7,y1:cy,x2:cx+rx*.7,y2:cy,stroke:'rgba(251,191,36,.5)','stroke-width':'1.2','stroke-dasharray':'4 2','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.7,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='umbral';
  }

  if(id==='golgi_n'){
    // Standard Golgi but with dendritic outposts
    g.appendChild(svgEl('text',{x:cx-rx*.85,y:cy-ry*.65,'font-size':'7',fill:hex2rgba(c,.55),'pointer-events':'none','font-weight':'700'})).textContent='cis';
    for(let i=0;i<5;i++){
      const gy=cy-ry*.55+i*(ry*.25);
      const curve=7-i*1.0;
      const arc=svgEl('path',{d:`M${cx-rx*.88} ${gy} Q${cx} ${gy-curve} ${cx+rx*.88} ${gy}`,fill:'none',stroke:hex2rgba(c,.45+i*.07),'stroke-width':'2.5','stroke-linecap':'round','pointer-events':'none'});
      arc.classList.add('golgi-arc');arc.style.animationDelay=(i*0.28)+'s';g.appendChild(arc);
    }
    // Outpost arrow
    const arr=svgEl('path',{d:`M${cx+rx*.9} ${cy} Q${cx+rx*1.3} ${cy-ry*.3} ${cx+rx*1.2} ${cy-ry*.8}`,fill:'none',stroke:'rgba(251,191,36,.5)','stroke-width':'1.2','stroke-dasharray':'3 2','pointer-events':'none'});g.appendChild(arr);
    g.appendChild(svgEl('text',{x:cx+rx*1.1,y:cy-ry*.9,'font-size':'5.5',fill:'rgba(251,191,36,.65)','pointer-events':'none'})).textContent='outpost';
  }

  if(id==='er_n'){
    // RER + smooth ER with Ca2+ storage
    for(let i=0;i<3;i++){
      const y=cy-ry*.45+ry*.42*i;
      let d=`M${cx-rx*.85} ${y}`;
      for(let j=0;j<=4;j++)d+=` Q${cx-rx*.62+j*rx*.36} ${y+(j%2===0?-5:5)} ${cx-rx*.48+j*rx*.32} ${y}`;
      const cis=svgEl('path',{d,fill:'none',stroke:hex2rgba(c,.5+i*.06),'stroke-width':'2','pointer-events':'none'});
      cis.classList.add('er-tube');cis.style.animationDelay=(i*0.55)+'s';g.appendChild(cis);
    }
    // Ca2+ ions
    for(let i=0;i<4;i++){
      const a=i/4*Math.PI*2;
      const ca=svgEl('text',{x:cx+Math.cos(a)*rx*.45,y:cy+Math.sin(a)*ry*.4+3,'text-anchor':'middle','font-size':'6.5',fill:'rgba(125,211,252,.7)','pointer-events':'none','font-weight':'bold'});
      ca.textContent='Ca²⁺';ca.style.animation=`o2Float ${2+i*0.4}s ease-in-out infinite`;ca.style.animationDelay=(i*0.5)+'s';g.appendChild(ca);
    }
    // InsP3 receptor
    const ip3=svgEl('rect',{x:cx+rx*.65,y:cy-ry*.58,width:10,height:18,rx:3,fill:'rgba(249,115,22,.4)',stroke:'rgba(249,115,22,.65)','stroke-width':'1.2','pointer-events':'none'});
    ip3.classList.add('ribosome-active');ip3.style.animationDelay='1s';g.appendChild(ip3);
    g.appendChild(svgEl('text',{x:cx+rx*.7,y:cy-ry*.3,'text-anchor':'middle','font-size':'5',fill:'rgba(249,115,22,.7)','pointer-events':'none'})).textContent='IP3R';
    // Spine apparatus label
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.75,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.4),'pointer-events':'none'})).textContent='spine apparatus';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.9,'text-anchor':'middle','font-size':'5.5',fill:hex2rgba(c,.3),'pointer-events':'none'})).textContent='señal Ca²⁺';
  }

  // ── RBC ORGANELLES ────────────────────────────────────────────────────────

  if(id==='rbc_membrane'){
    // Biconcave disk shape overlay
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.95,ry:ry*.95,fill:'none',stroke:hex2rgba(c,.25),'stroke-width':'1','stroke-dasharray':'6 3','pointer-events':'none'}));
    // Phospholipid bilayer dots
    const n=26;
    for(let i=0;i<n;i++){
      const a=i/n*Math.PI*2;
      const d1=svgEl('circle',{cx:cx+Math.cos(a)*rx*.97,cy:cy+Math.sin(a)*ry*.97,r:2.8,fill:hex2rgba(c,.45),'pointer-events':'none'});
      d1.style.animation=`nucleusPulse ${2.5+i*0.08}s ease-in-out infinite`;d1.style.animationDelay=(i*0.1)+'s';g.appendChild(d1);
      const d2=svgEl('circle',{cx:cx+Math.cos(a)*rx*.87,cy:cy+Math.sin(a)*ry*.87,r:2.5,fill:hex2rgba(c,.28),'pointer-events':'none'});
      d2.style.animation=`nucleusPulse ${2.5+i*0.08}s ease-in-out infinite`;d2.style.animationDelay=((i*0.1)+0.15)+'s';g.appendChild(d2);
    }
    // Glycocalyx (sugar coat)
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI*2;
      const spx=cx+Math.cos(a)*rx*1.04,spy=cy+Math.sin(a)*ry*1.04;
      g.appendChild(svgEl('circle',{cx:spx,cy:spy,r:3,fill:'rgba(16,185,129,.35)',stroke:'rgba(16,185,129,.5)','stroke-width':'1','pointer-events':'none'}));
    }
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.55,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.45),'pointer-events':'none'})).textContent='120 días';
  }

  if(id==='hemoglobin'){
    // Tetrameric structure - 4 subunits
    const subPos=[{dx:-.38,dy:-.38,lbl:'α'},{dx:.38,dy:-.38,lbl:'β'},{dx:-.38,dy:.38,lbl:'α'},{dx:.38,dy:.38,lbl:'β'}];
    subPos.forEach(({dx,dy,lbl},i)=>{
      const sub=svgEl('ellipse',{cx:cx+dx*rx,cy:cy+dy*ry,rx:rx*.38,ry:ry*.38,fill:hex2rgba(c,.35+(i%2)*.15),stroke:hex2rgba(c,.6),'stroke-width':'1.5','pointer-events':'none'});
      sub.classList.add('hemo-pulse');sub.style.animationDelay=(i*0.5)+'s';g.appendChild(sub);
      // Heme group
      g.appendChild(svgEl('circle',{cx:cx+dx*rx,cy:cy+dy*ry,r:rx*.12,fill:'rgba(220,38,38,.7)',stroke:'rgba(220,38,38,.4)','stroke-width':'1','pointer-events':'none'}));
      g.appendChild(svgEl('text',{x:cx+dx*rx,y:cy+dy*ry+ry*.5,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.7),'pointer-events':'none','font-weight':'bold'})).textContent=lbl;
    });
    // O2 binding
    const o2=svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'8',fill:'rgba(125,211,252,.8)','pointer-events':'none','font-weight':'bold'});
    o2.textContent='O₂';o2.style.animation='o2Float 2.5s ease-in-out infinite';g.appendChild(o2);
  }

  if(id==='spectrin'){
    // Hexagonal network
    const hexR=rx*.55;
    for(let i=0;i<6;i++){
      const a1=i/6*Math.PI*2,a2=(i+1)/6*Math.PI*2;
      g.appendChild(svgEl('line',{x1:cx+Math.cos(a1)*hexR,y1:cy+Math.sin(a1)*ry*.55,x2:cx+Math.cos(a2)*hexR,y2:cy+Math.sin(a2)*ry*.55,stroke:hex2rgba(c,.5),'stroke-width':'2','pointer-events':'none'}));
    }
    // Inner connections to center
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2;
      const net=svgEl('line',{x1:cx,y1:cy,x2:cx+Math.cos(a)*hexR,y2:cy+Math.sin(a)*ry*.55,stroke:hex2rgba(c,.3),'stroke-width':'1.2','stroke-dasharray':'3 2','pointer-events':'none'});
      net.classList.add('spectrin-net');net.style.animationDelay=(i*0.35)+'s';g.appendChild(net);
      // Node points
      g.appendChild(svgEl('circle',{cx:cx+Math.cos(a)*hexR,cy:cy+Math.sin(a)*ry*.55,r:3.5,fill:hex2rgba(c,.6),'pointer-events':'none'}));
    }
    // Actin node at center
    g.appendChild(svgEl('circle',{cx,cy,r:5,fill:'rgba(239,68,68,.5)',stroke:'rgba(239,68,68,.7)','stroke-width':'1.2','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.75,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='hexagonal';
  }

  if(id==='band3'||id==='band3b'){
    // 14 TM helices
    for(let i=0;i<7;i++){
      const x=cx-rx*.7+i*rx*.22;
      g.appendChild(svgEl('rect',{x:x-3,y:cy-ry*.7,width:6,height:ry*1.4,rx:3,fill:hex2rgba(c,.35+(i%2)*.15),stroke:hex2rgba(c,.55),'stroke-width':'1','pointer-events':'none'}));
    }
    // Cytoplasmic domain
    g.appendChild(svgEl('ellipse',{cx,cy:cy+ry*.8,rx:rx*.7,ry:ry*.22,fill:hex2rgba(c,.25),stroke:hex2rgba(c,.45),'stroke-width':'1.5','pointer-events':'none'}));
    // Transport arrow with animation
    const cl=svgEl('text',{x:cx-rx*.4,y:cy-ry*.15,'text-anchor':'middle','font-size':'7',fill:'rgba(125,211,252,.8)','pointer-events':'none','font-weight':'bold'});
    cl.textContent='HCO₃⁻↕Cl⁻';g.appendChild(cl);
    // Animated transport dots
    for(let i=0;i<3;i++){
      const td=svgEl('circle',{cx:cx-rx*.35+i*rx*.35,cy:cy+ry*.12,r:2.5,fill:'rgba(125,211,252,.6)','pointer-events':'none'});
      td.classList.add('vesicle-float');td.style.animationDelay=(i*0.5)+'s';g.appendChild(td);
    }
    // Spectrin anchor below
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.95,'text-anchor':'middle','font-size':'5.5',fill:hex2rgba(c,.4),'pointer-events':'none'})).textContent='ancla espectrina';
  }

  if(id==='glycophorin'||id==='glycophorin2'){
    // Single TM protein with glycan chain
    g.appendChild(svgEl('rect',{x:cx-4,y:cy-ry*.65,width:8,height:ry*1.3,rx:4,fill:hex2rgba(c,.4),stroke:hex2rgba(c,.65),'stroke-width':'2','pointer-events':'none'}));
    // Sialic acid chain outside
    let prevX=cx,prevY=cy-ry*.65;
    for(let i=0;i<5;i++){
      const nx=cx+Math.cos(i*0.7-0.5)*(8+i*6);
      const ny=cy-ry*.7-i*8;
      g.appendChild(svgEl('line',{x1:prevX,y1:prevY,x2:nx,y2:ny,stroke:hex2rgba(c,.4),'stroke-width':'1','pointer-events':'none'}));
      const sa=svgEl('circle',{cx:nx,cy:ny,r:3.5+(i*.5),fill:'rgba(16,185,129,.5)',stroke:'rgba(16,185,129,.7)','stroke-width':'1','pointer-events':'none'});
      sa.classList.add('vesicle-pop');sa.style.animationDelay=(i*0.4)+'s';g.appendChild(sa);
      prevX=nx;prevY=ny;
    }
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.9,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='ác. siálico';
  }

  if(id==='ankyrin'){
    // Ankyrin repeat domain (stacked repeats)
    for(let i=0;i<5;i++){
      g.appendChild(svgEl('rect',{x:cx-rx*.55,y:cy-ry*.6+i*ry*.26,width:rx*1.1,height:ry*.22,rx:4,fill:hex2rgba(c,.25+(i*.05)),stroke:hex2rgba(c,.5),'stroke-width':'1.5','pointer-events':'none'}));
    }
    // Connections to spectrin and band3
    g.appendChild(svgEl('line',{x1:cx-rx*.85,y1:cy,x2:cx-rx*1.4,y2:cy-ry*.4,stroke:'rgba(251,191,36,.5)','stroke-width':'1.5','stroke-dasharray':'3 2','pointer-events':'none'}));
    g.appendChild(svgEl('line',{x1:cx+rx*.85,y1:cy,x2:cx+rx*1.4,y2:cy+ry*.3,stroke:'rgba(251,191,36,.5)','stroke-width':'1.5','stroke-dasharray':'3 2','pointer-events':'none'}));
    // Animations on top repeats
    for(let i=0;i<5;i++){
      const ry2=cy-ry*.6+i*ry*.26;
      const hl=svgEl('rect',{x:cx-rx*.52,y:ry2+ry*.02,width:rx*1.04,height:ry*.18,rx:4,fill:hex2rgba(c,.08),stroke:'none','pointer-events':'none'});
      hl.style.animation=`nucleusPulse ${2.5+i*0.4}s ease-in-out infinite`;hl.style.animationDelay=(i*0.45)+'s';g.appendChild(hl);
    }
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.9,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='ANK repeat';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*1.08,'text-anchor':'middle','font-size':'5.5',fill:hex2rgba(c,.35),'pointer-events':'none'})).textContent='esferocitosis hereditaria';
  }

  if(id==='carbonic_anh'){
    // Enzyme with Zn active site
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.75,ry:ry*.75,fill:hex2rgba(c,.22),stroke:hex2rgba(c,.45),'stroke-width':'2','pointer-events':'none'}));
    // Zn2+ active site
    g.appendChild(svgEl('circle',{cx,cy,r:rx*.18,fill:'rgba(251,191,36,.7)',stroke:'rgba(251,191,36,.9)','stroke-width':'2','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:'rgba(6,11,26,.9)','pointer-events':'none','font-weight':'bold'})).textContent='Zn²⁺';
    // Reaction labels
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.85,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.6),'pointer-events':'none'})).textContent='CO₂+H₂O';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.95,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.6),'pointer-events':'none'})).textContent='HCO₃⁻+H⁺';
    // Catalytic rate
    // Reaction velocity pulse around active site
    const pulse=svgEl('circle',{cx,cy,r:rx*.28,fill:'none',stroke:'rgba(251,191,36,.35)','stroke-width':'2','pointer-events':'none'});
    pulse.style.animation='apPulse 2s ease-out infinite';g.appendChild(pulse);
    // His64 proton shuttle
    const his=svgEl('circle',{cx:cx+rx*.35,cy:cy-ry*.3,r:3.5,fill:'rgba(125,211,252,.5)',stroke:'rgba(125,211,252,.7)','stroke-width':'1','pointer-events':'none'});
    his.classList.add('vesicle-float');g.appendChild(his);
    g.appendChild(svgEl('text',{x:cx+rx*.35,y:cy-ry*.55,'text-anchor':'middle','font-size':'5.5',fill:'rgba(125,211,252,.65)','pointer-events':'none'})).textContent='His64';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*1.25,'text-anchor':'middle','font-size':'5.5',fill:'rgba(251,191,36,.6)','pointer-events':'none'})).textContent='10⁶ rxn/s';
  }

  if(id==='biconcave'){
    // Biconcave disk top-view (donut effect)
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.9,ry:ry*.85,fill:hex2rgba(c,.12),'stroke':hex2rgba(c,.35),'stroke-width':'2','pointer-events':'none'}));
    // Central depression
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.4,ry:ry*.38,fill:hex2rgba(c,.3),stroke:hex2rgba(c,.5),'stroke-width':'1.5','pointer-events':'none'}));
    // Cross-section side view inset
    const sideY=cy+ry*.6;
    g.appendChild(svgEl('path',{d:`M${cx-rx*.7} ${sideY} Q${cx-rx*.3} ${sideY-12} ${cx} ${sideY-14} Q${cx+rx*.3} ${sideY-12} ${cx+rx*.7} ${sideY} Q${cx+rx*.3} ${sideY+4} ${cx} ${sideY+2} Q${cx-rx*.3} ${sideY+4} ${cx-rx*.7} ${sideY}`,fill:hex2rgba(c,.35),stroke:hex2rgba(c,.6),'stroke-width':'1.5','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.05,'text-anchor':'middle','font-size':'6.5',fill:'rgba(6,11,26,.7)','pointer-events':'none'})).textContent='depresión';
    // Spectrin net suggestion (inner)
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2;
      const sl=svgEl('line',{x1:cx+Math.cos(a)*rx*.55,y1:cy+Math.sin(a)*ry*.55,x2:cx+Math.cos(a+Math.PI/3)*rx*.55,y2:cy+Math.sin(a+Math.PI/3)*ry*.55,stroke:'rgba(252,165,165,.25)','stroke-width':'1','pointer-events':'none'});
      sl.classList.add('spectrin-net');sl.style.animationDelay=(i*0.4)+'s';g.appendChild(sl);
    }
    // Breathing animation on outer shape
    const breathe=svgEl('ellipse',{cx,cy:cy-ry*.15,rx:rx*.88,ry:ry*.82,fill:'none',stroke:hex2rgba(c,.18),'stroke-width':'1.5','pointer-events':'none'});
    breathe.style.animation='rbcBreathe 3s ease-in-out infinite';g.appendChild(breathe);
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.55,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='6-8 µm';
  }

  // ── XYLEM ORGANELLES ─────────────────────────────────────────────────────

  if(id==='secondary_wall'){
    // S1, S2, S3 layers with different microfibril orientation
    const layers=[{r:.96,angle:70,col:.28,w:'3'},{r:.86,angle:15,col:.38,w:'4'},{r:.76,angle:75,col:.25,w:'2.5'}];
    layers.forEach(({r,angle,col,w},i)=>{
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+(angle*Math.PI/180);
        const x1=cx+Math.cos(a)*rx*r,y1=cy+Math.sin(a)*ry*r;
        const x2=cx+Math.cos(a+Math.PI)*rx*r,y2=cy+Math.sin(a+Math.PI)*ry*r;
        const fib=svgEl('line',{x1,y1,x2,y2,stroke:hex2rgba(c,col),'stroke-width':w,'pointer-events':'none'});
        fib.classList.add('lignin-ring');fib.style.animationDelay=(j*0.3+i*0.8)+'s';g.appendChild(fib);
      }
    });
    // Lignin label + layer rings
    [{r:.96,lbl:'S1'},{r:.86,lbl:'S2'},{r:.76,lbl:'S3'}].forEach(({r,lbl})=>{
      g.appendChild(svgEl('text',{x:cx-rx*r-.5,y:cy-ry*r*.35,'font-size':'5.5',fill:hex2rgba(c,.4),'pointer-events':'none'})).textContent=lbl;
    });
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='S1-S2-S3';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.55,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.4),'pointer-events':'none'})).textContent='lignina';
    // Monolignol indicator
    const mli=svgEl('circle',{cx:cx+rx*.55,cy:cy-ry*.6,r:4,fill:'rgba(190,242,100,.4)',stroke:'rgba(190,242,100,.7)','stroke-width':'1.2','pointer-events':'none'});
    mli.classList.add('lignin-ring');g.appendChild(mli);
    g.appendChild(svgEl('text',{x:cx+rx*.55,y:cy-ry*.78,'text-anchor':'middle','font-size':'5.5',fill:'rgba(190,242,100,.6)','pointer-events':'none'})).textContent='monolignol';
  }

  if(id==='primary_wall_x'){
    // Random cellulose microfibrils
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI*2+Math.random()*0.5;
      const fib=svgEl('line',{x1:cx+Math.cos(a)*rx*.85,y1:cy+Math.sin(a)*ry*.85,x2:cx+Math.cos(a+Math.PI)*rx*.85,y2:cy+Math.sin(a+Math.PI)*ry*.85,stroke:hex2rgba(c,.38),'stroke-width':'2','stroke-dasharray':'5 3','pointer-events':'none'});
      fib.classList.add('water-flow');fib.style.animationDelay=(i*0.4)+'s';g.appendChild(fib);
    }
    // Pectin matrix
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.5,ry:ry*.5,fill:hex2rgba(c,.15),stroke:hex2rgba(c,.3),'stroke-width':'1.5','stroke-dasharray':'4 2','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='celulosa';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.65,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.4),'pointer-events':'none'})).textContent='al azar';
  }

  if(id==='pit_membrane'){
    // Pit with torus and margo
    // Margo (flexible fibrous)
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.85,ry:ry*.85,fill:'none',stroke:hex2rgba(c,.35),'stroke-width':'1.5','stroke-dasharray':'5 3','pointer-events':'none'}));
    // Torus (central rigid)
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.28,ry:ry*.28,fill:hex2rgba(c,.6),stroke:hex2rgba(c,.8),'stroke-width':'2.5','pointer-events':'none'}));
    // Radial fibrils of margo
    for(let i=0;i<10;i++){
      const a=i/10*Math.PI*2;
      g.appendChild(svgEl('line',{x1:cx+Math.cos(a)*rx*.28,y1:cy+Math.sin(a)*ry*.28,x2:cx+Math.cos(a)*rx*.82,y2:cy+Math.sin(a)*ry*.82,stroke:hex2rgba(c,.3),'stroke-width':'1','pointer-events':'none'}));
    }
    // Water flow arrows
    [[-1,0],[1,0]].forEach(([dx],i)=>{
      const arr=svgEl('text',{x:cx+dx*rx*1.15,y:cy+4,'text-anchor':'middle','font-size':'11',fill:'rgba(125,211,252,.65)','pointer-events':'none'});
      arr.textContent=dx<0?'→':'←';arr.classList.add('water-flow');arr.style.animationDelay=(i*0.8)+'s';g.appendChild(arr);
    });
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'6',fill:'rgba(6,11,26,.8)','pointer-events':'none','font-weight':'bold'})).textContent='T';
  }

  if(id==='lumen'){
    // Empty vessel lumen — water flowing
    // Water flow arrows going up
    for(let i=0;i<4;i++){
      const x=cx-rx*.6+i*rx*.4;
      const arr=svgEl('text',{x,y:cy,'text-anchor':'middle','font-size':'14',fill:'rgba(125,211,252,.5)','pointer-events':'none'});
      arr.textContent='↑';
      arr.style.animation=`waterFlow ${1.5+i*0.3}s linear infinite`;arr.style.animationDelay=(i*0.3)+'s';g.appendChild(arr);
    }
    // Dissolved mineral dots
    for(let i=0;i<8;i++){
      const x=cx-rx*.7+Math.random()*rx*1.4;
      const y=cy-ry*.6+Math.random()*ry*1.2;
      const dot=svgEl('circle',{cx:x,cy:y,r:2.5,fill:'rgba(251,191,36,.5)','pointer-events':'none'});
      dot.style.animation=`waterDot ${1.8+Math.random()}s linear infinite`;
      dot.style.setProperty('--sy',y+'');dot.style.setProperty('--ey',(y-50)+'');
      dot.style.animationDelay=(Math.random()*2)+'s';g.appendChild(dot);
    }
    // Tension indicator
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.65,'text-anchor':'middle','font-size':'6',fill:'rgba(125,211,252,.45)','pointer-events':'none'})).textContent='−1 a −10 MPa';
    // Cohesion-tension arrows
    [[cx-rx*.5,cy-ry*.2],[cx+rx*.4,cy+ry*.1]].forEach(([ax,ay],i)=>{
      const arr=svgEl('text',{x:ax,y:ay,'text-anchor':'middle','font-size':'9',fill:'rgba(125,211,252,.4)','pointer-events':'none'});
      arr.textContent='↑';arr.style.animation=`waterFlow ${1.8+i*.3}s linear infinite`;arr.style.animationDelay=(i*.7)+'s';g.appendChild(arr);
    });
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.7,'text-anchor':'middle','font-size':'6.5',fill:'rgba(125,211,252,.55)','pointer-events':'none'})).textContent='savia xilémica';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.86,'text-anchor':'middle','font-size':'5.5',fill:'rgba(125,211,252,.35)','pointer-events':'none'})).textContent='cohesión-tensión';
  }

  if(id==='bordered_pit'||id==='bordered_pit2'){
    // Bordered pit cross-section
    // Outer pit border (chamber)
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.88,ry:ry*.88,fill:'none',stroke:hex2rgba(c,.35),'stroke-width':'2.5','stroke-dasharray':'5 3','pointer-events':'none'}));
    // Pit aperture (inner border)
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.5,ry:ry*.5,fill:'none',stroke:hex2rgba(c,.55),'stroke-width':'2','pointer-events':'none'}));
    // Pit membrane
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.75,ry:ry*.75,fill:'none',stroke:hex2rgba(c,.25),'stroke-width':'1.2','stroke-dasharray':'3 2','pointer-events':'none'}));
    // Torus (central disc)
    const tor=svgEl('circle',{cx,cy,r:rx*.22,fill:hex2rgba(c,.7),stroke:hex2rgba(c,.9),'stroke-width':'2','pointer-events':'none'});
    tor.classList.add('pittedWall');g.appendChild(tor);
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'6',fill:'rgba(6,11,26,.9)','pointer-events':'none','font-weight':'bold'})).textContent='T';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.65,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='areolada';
  }

  if(id==='spiral_band'||id==='spiral_band2'){
    // Helical lignin band
    const n=20,turns=2.5;
    for(let i=0;i<n-1;i++){
      const t1=i/n,t2=(i+1)/n;
      const a1=t1*turns*Math.PI*2,a2=t2*turns*Math.PI*2;
      const y1=cy-ry*.8+t1*ry*1.6,y2=cy-ry*.8+t2*ry*1.6;
      const x1=cx+Math.cos(a1)*rx*.75,x2=cx+Math.cos(a2)*rx*.75;
      const seg=svgEl('line',{x1,y1,x2,y2,stroke:hex2rgba(c,.6+i*.015),'stroke-width':'3.5','stroke-linecap':'round','pointer-events':'none'});
      seg.classList.add('lignin-ring');seg.style.animationDelay=(i*0.12)+'s';g.appendChild(seg);
    }
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.92,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='protoxilema';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*1.1,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.55),'pointer-events':'none'})).textContent='espiral lignina';
    // Lumen space
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.22,ry:ry*.75,fill:'rgba(125,211,252,.08)',stroke:'rgba(125,211,252,.18)','stroke-width':'1','pointer-events':'none'}));
    // Flow dot
    const fd=svgEl('circle',{cx,cy:cy-ry*.5,r:3,fill:'rgba(125,211,252,.4)','pointer-events':'none'});
    fd.style.animation=`waterDot 2s linear infinite`;fd.style.setProperty('--sy',(cy-ry*.5)+'');fd.style.setProperty('--ey',(cy+ry*.5)+'');g.appendChild(fd);
  }

  if(id==='plasmalemma_x'){
    // Living parenchyma cell among dead vessels
    const n=18;
    for(let i=0;i<n;i++){
      const a=i/n*Math.PI*2;
      const d1=svgEl('circle',{cx:cx+Math.cos(a)*rx*.97,cy:cy+Math.sin(a)*ry*.97,r:2.5,fill:hex2rgba(c,.45),'pointer-events':'none'});
      d1.style.animation=`nucleusPulse ${2.5+i*0.1}s ease-in-out infinite`;d1.style.animationDelay=(i*0.12)+'s';g.appendChild(d1);
    }
    // Starch granules inside
    for(let i=0;i<4;i++){
      const a=i/4*Math.PI*2;
      const st=svgEl('ellipse',{cx:cx+Math.cos(a)*rx*.45,cy:cy+Math.sin(a)*ry*.45,rx:rx*.2,ry:ry*.2,fill:'rgba(251,191,36,.4)',stroke:'rgba(251,191,36,.6)','stroke-width':'1','pointer-events':'none'});
      st.classList.add('vesicle-pop');st.style.animationDelay=(i*0.6)+'s';g.appendChild(st);
    }
    // Ion channels (SKOR)
    [0.5,2.1,3.7].forEach(a=>{
      const px=cx+Math.cos(a)*rx*.95,py=cy+Math.sin(a)*ry*.95;
      g.appendChild(svgEl('rect',{x:px-2.5,y:py-5,width:5,height:10,rx:2,fill:'rgba(0,229,255,.5)',stroke:'rgba(0,229,255,.7)','stroke-width':'1','pointer-events':'none'}));
    });
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.45),'pointer-events':'none'})).textContent='parénquima';
  }


  // ── HEPATOCYTE ORGANELLES ──────────────────────────────────────────────

  if(id==='nucleus_h'){
    [.92,.82].forEach((s,i)=>{g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*s,ry:ry*s,fill:'none',stroke:hex2rgba(c,i===0?.25:.15),'stroke-width':i===0?'2.5':'1.2','stroke-dasharray':i===1?'5 3':'none','pointer-events':'none'}));});
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const px=cx+Math.cos(a)*rx*.95,py=cy+Math.sin(a)*ry*.95;const pore=svgEl('circle',{cx:px,cy:py,r:3.8,fill:c,opacity:'.6','pointer-events':'none'});pore.classList.add('nucleus-pore');pore.style.animationDelay=(i*0.25)+'s';g.appendChild(pore);const ring=svgEl('circle',{cx:px,cy:py,r:6.5,fill:'none',stroke:hex2rgba(c,.35),'stroke-width':'1.5','pointer-events':'none'});ring.classList.add('pore-ring');ring.style.animationDelay=(i*0.25+0.12)+'s';g.appendChild(ring);}
    for(let i=0;i<8;i++){const a1=i/8*Math.PI*2,a2=a1+0.9;const x1=cx+Math.cos(a1)*rx*.52,y1=cy+Math.sin(a1)*ry*.52,x2=cx+Math.cos(a2)*rx*.47,y2=cy+Math.sin(a2)*ry*.47,xm=cx+Math.cos(a1+0.45)*rx*.62,ym=cy+Math.sin(a1+0.45)*ry*.62;const th=svgEl('path',{d:`M${x1} ${y1} Q${xm} ${ym} ${x2} ${y2}`,fill:'none',stroke:hex2rgba(c,i%2===0?.45:.25),'stroke-width':i%2===0?'2':'1','pointer-events':'none'});th.classList.add('chromatin-thread');th.style.animationDelay=(i*0.5)+'s';g.appendChild(th);}
    const nuc=svgEl('ellipse',{cx:cx+rx*.08,cy:cy-ry*.06,rx:rx*.34,ry:ry*.3,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.7),'stroke-width':'1.5','pointer-events':'none'});nuc.classList.add('nucleolus-glow');g.appendChild(nuc);
    const bn=svgEl('ellipse',{cx:cx+rx*.42,cy:cy+ry*.44,rx:rx*.2,ry:ry*.18,fill:hex2rgba(c,.08),stroke:hex2rgba(c,.22),'stroke-width':'1.5','stroke-dasharray':'3 2','pointer-events':'none'});bn.style.animation='nucleusPulse 4s ease-in-out infinite';g.appendChild(bn);
    g.appendChild(svgEl('text',{x:cx+rx*.42,y:cy+ry*.44+3,'text-anchor':'middle','font-size':'5.5',fill:hex2rgba(c,.32),'pointer-events':'none'})).textContent='2n?';
  }

  if(id==='nucleolus_h'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.35,ry:ry*.35,fill:hex2rgba(c,.85),'pointer-events':'none'}));
    const dfc=svgEl('ellipse',{cx,cy,rx:rx*.6,ry:ry*.6,fill:'none',stroke:hex2rgba(c,.55),'stroke-width':'2.5','stroke-dasharray':'4 2','pointer-events':'none'});dfc.classList.add('nucleolus-glow');g.appendChild(dfc);
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.88,ry:ry*.88,fill:'none',stroke:hex2rgba(c,.22),'stroke-width':'1.5','pointer-events':'none'}));
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const strand=svgEl('path',{d:`M${cx+Math.cos(a)*rx*.35} ${cy+Math.sin(a)*ry*.35} Q${cx+Math.cos(a+.3)*rx*.65} ${cy+Math.sin(a+.3)*ry*.65} ${cx+Math.cos(a)*rx*.88} ${cy+Math.sin(a)*ry*.88}`,fill:'none',stroke:hex2rgba(c,.4),'stroke-width':'1.5','stroke-linecap':'round','pointer-events':'none'});strand.style.animation=`nucleolusGlow ${2+i*0.3}s ease-in-out infinite`;strand.style.animationDelay=(i*0.4)+'s';g.appendChild(strand);}
    for(let i=0;i<3;i++){const a=i/3*Math.PI*2+0.8;const p=svgEl('circle',{cx:cx+Math.cos(a)*rx*.85,cy:cy+Math.sin(a)*ry*.85,r:2.5,fill:'#94a3b8',opacity:'.8','pointer-events':'none'});p.classList.add('ribosome-active');p.style.animationDelay=(i*0.5)+'s';g.appendChild(p);}
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*1.4,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='albúmina';
  }

  if(id==='golgi_h'){
    g.appendChild(svgEl('text',{x:cx-rx*.88,y:cy-ry*.72,'font-size':'7',fill:hex2rgba(c,.55),'pointer-events':'none','font-weight':'700'})).textContent='cis';
    for(let i=0;i<6;i++){const gy=cy-ry*.65+i*(ry*.26);const curve=8-i*1.2;const arc=svgEl('path',{d:`M${cx-rx*.92} ${gy} Q${cx} ${gy-curve} ${cx+rx*.92} ${gy}`,fill:'none',stroke:hex2rgba(c,.45+i*.07),'stroke-width':'2.8','stroke-linecap':'round','pointer-events':'none'});arc.classList.add('golgi-arc');arc.style.animationDelay=(i*0.28)+'s';g.appendChild(arc);g.appendChild(svgEl('circle',{cx:cx-rx*.92,cy:gy,r:2,fill:hex2rgba(c,.5),'pointer-events':'none'}));g.appendChild(svgEl('circle',{cx:cx+rx*.92,cy:gy,r:2,fill:hex2rgba(c,.5),'pointer-events':'none'}));}
    g.appendChild(svgEl('text',{x:cx-rx*.88,y:cy+ry*.8,'font-size':'7',fill:hex2rgba(c,.55),'pointer-events':'none','font-weight':'700'})).textContent='trans';
    [[rx*.98,-12,6.5,0,'VLDL'],[rx*1.02,10,5,0.9,''],[rx*.88,-26,4,1.7,'']].forEach(([vx,vy,vr,d,lbl])=>{const ves=svgEl('circle',{cx:cx+vx,cy:cy+vy,r:vr,fill:hex2rgba(c,.55),stroke:hex2rgba(c,.8),'stroke-width':'1','pointer-events':'none'});ves.classList.add('vesicle-float');ves.style.animationDelay=d+'s';g.appendChild(ves);g.appendChild(svgEl('line',{x1:cx+rx*.92,y1:cy+vy,x2:cx+vx-vr,y2:cy+vy,stroke:hex2rgba(c,.3),'stroke-width':'1','pointer-events':'none'}));if(lbl)g.appendChild(svgEl('text',{x:cx+vx+vr+2,y:cy+vy+3,'font-size':'5.5',fill:hex2rgba(c,.65),'pointer-events':'none'})).textContent=lbl;});
  }

  if(id==='peroxisome_h'){
    const crys=svgEl('rect',{x:cx-rx*.35,y:cy-ry*.35,width:rx*.7,height:ry*.7,rx:3,fill:hex2rgba(c,.38),stroke:hex2rgba(c,.65),'stroke-width':'1.5','pointer-events':'none'});crys.classList.add('crystal-shine');g.appendChild(crys);
    g.appendChild(svgEl('line',{x1:cx-rx*.3,y1:cy-ry*.3,x2:cx+rx*.3,y2:cy+ry*.3,stroke:hex2rgba(c,.45),'stroke-width':'1','pointer-events':'none'}));
    g.appendChild(svgEl('line',{x1:cx+rx*.3,y1:cy-ry*.3,x2:cx-rx*.3,y2:cy+ry*.3,stroke:hex2rgba(c,.45),'stroke-width':'1','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+2,'text-anchor':'middle','font-size':'6.5',fill:'rgba(250,204,21,.8)','pointer-events':'none','font-weight':'bold'})).textContent='AGCML';
    for(let i=0;i<3;i++){const bx=cx+(-1+i)*rx*.4,by=cy-ry*.65;const bub=svgEl('circle',{cx:bx,cy:by,r:2.5,fill:'none',stroke:hex2rgba(c,.6),'stroke-width':'1','pointer-events':'none'});bub.style.animation=`h2o2Bubble ${1.5+i*0.4}s ease-out infinite`;bub.style.animationDelay=(i*0.5)+'s';g.appendChild(bub);}
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.78,'text-anchor':'middle','font-size':'5.5',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='ác. biliares';
  }

  if(id==='hepato_membrane'){
    const n=28;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;const d1=svgEl('circle',{cx:cx+Math.cos(a)*rx*.97,cy:cy+Math.sin(a)*ry*.97,r:2.8,fill:hex2rgba(c,.45),'pointer-events':'none'});d1.style.animation=`nucleusPulse ${2.5+i*0.09}s ease-in-out infinite`;d1.style.animationDelay=(i*0.1)+'s';g.appendChild(d1);const d2=svgEl('circle',{cx:cx+Math.cos(a)*rx*.86,cy:cy+Math.sin(a)*ry*.86,r:2.8,fill:hex2rgba(c,.28),'pointer-events':'none'});d2.style.animation=`nucleusPulse ${2.5+i*0.09}s ease-in-out infinite`;d2.style.animationDelay=((i*0.1)+0.15)+'s';g.appendChild(d2);}
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.96,'text-anchor':'middle','font-size':'5.5',fill:'rgba(59,130,246,.7)','pointer-events':'none'})).textContent='sinusoidal';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.98,'text-anchor':'middle','font-size':'5.5',fill:'rgba(134,239,172,.7)','pointer-events':'none'})).textContent='canalicular';
    [-1.3,-1.6,-1.9].forEach(a=>{const px=cx+Math.cos(a)*rx*.915,py=cy+Math.sin(a)*ry*.915;g.appendChild(svgEl('rect',{x:px-3,y:py-7,width:6,height:14,rx:3,fill:'rgba(59,130,246,.5)',stroke:'rgba(59,130,246,.7)','stroke-width':'1','pointer-events':'none'}));});
    [1.3,1.6,1.9].forEach(a=>{const px=cx+Math.cos(a)*rx*.915,py=cy+Math.sin(a)*ry*.915;g.appendChild(svgEl('rect',{x:px-3,y:py-7,width:6,height:14,rx:3,fill:'rgba(134,239,172,.5)',stroke:'rgba(134,239,172,.7)','stroke-width':'1','pointer-events':'none'}));});
  }

  if(id==='lipid_drop_h'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.82,ry:ry*.82,fill:hex2rgba(c,.4),'pointer-events':'none'}));
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.58,ry:ry*.58,fill:hex2rgba(c,.62),'pointer-events':'none'}));
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.32,ry:ry*.32,fill:hex2rgba(c,.82),'pointer-events':'none'}));
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2;g.appendChild(svgEl('rect',{x:cx+Math.cos(a)*rx*.85-2,y:cy+Math.sin(a)*ry*.85-4,width:4,height:8,rx:2,fill:'rgba(251,191,36,.6)','pointer-events':'none'}));}
    g.appendChild(svgEl('text',{x:cx,y:cy-1,'text-anchor':'middle','font-size':'7',fill:'rgba(6,11,26,.8)','pointer-events':'none','font-weight':'bold'})).textContent='TAG';
    const vldl=svgEl('text',{x:cx,y:cy+ry*.6,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.55),'pointer-events':'none'});vldl.textContent='→VLDL';vldl.classList.add('protein-flow');g.appendChild(vldl);
  }

  if(id==='glycogen'||id==='glycogen_m'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.85,ry:ry*.82,fill:hex2rgba(c,.07),'pointer-events':'none'}));
    const gpos=[{dx:-.55,dy:-.45},{dx:-.25,dy:-.55},{dx:.15,dy:-.52},{dx:.48,dy:-.38},{dx:.60,dy:-.05},{dx:.52,dy:.32},{dx:.18,dy:.54},{dx:-.18,dy:.56},{dx:-.52,dy:.40},{dx:-.64,dy:.08},{dx:-.32,dy:-.18},{dx:.28,dy:.18},{dx:-.08,dy:.28},{dx:.14,dy:-.22},{dx:-.28,dy:.10},{dx:.42,dy:.20}];
    gpos.forEach(({dx,dy},i)=>{const sz=3.5+Math.abs(Math.sin(i*1.3))*2,op=0.42+Math.abs(Math.cos(i*0.9))*0.2;const gr=svgEl('circle',{cx:cx+dx*rx,cy:cy+dy*ry,r:sz,fill:hex2rgba(c,op),stroke:hex2rgba(c,.55),'stroke-width':'.8','pointer-events':'none'});gr.classList.add('lyso-dot');gr.style.animationDelay=(i*0.18)+'s';g.appendChild(gr);});
    g.appendChild(svgEl('circle',{cx,cy,r:rx*.12,fill:hex2rgba(c,.45),stroke:hex2rgba(c,.6),'stroke-width':'1.5','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.5),'pointer-events':'none','font-style':'italic'})).textContent='glucógeno';
    const grel=svgEl('text',{x:cx+rx*.58,y:cy-ry*.62,'text-anchor':'middle','font-size':'7.5',fill:'rgba(251,191,36,.65)','pointer-events':'none'});grel.textContent='→Glc';grel.classList.add('protein-flow');grel.style.animationDelay='.5s';g.appendChild(grel);
  }

  if(id==='bile_canaliculus'){
    g.appendChild(svgEl('rect',{x:cx-rx*.88,y:cy-ry*.32,width:rx*1.76,height:ry*.64,rx:ry*.28,fill:hex2rgba(c,.1),stroke:hex2rgba(c,.42),'stroke-width':'2','pointer-events':'none'}));
    for(let i=0;i<10;i++){const mx=cx-rx*.78+(i/9)*rx*1.56,off=(i%2-0.5)*1.8;const mv1=svgEl('line',{x1:mx+off,y1:cy-ry*.32,x2:mx+off,y2:cy-ry*.72,stroke:hex2rgba(c,.65),'stroke-width':'1.8','stroke-linecap':'round','pointer-events':'none'});mv1.classList.add('filament-line');mv1.style.animationDelay=(i*0.12)+'s';g.appendChild(mv1);const mv2=svgEl('line',{x1:mx-off,y1:cy+ry*.32,x2:mx-off,y2:cy+ry*.72,stroke:hex2rgba(c,.65),'stroke-width':'1.8','stroke-linecap':'round','pointer-events':'none'});mv2.classList.add('filament-line');mv2.style.animationDelay=((i+5)*0.12)+'s';g.appendChild(mv2);}
    [-.9,.9].forEach(dx=>{g.appendChild(svgEl('rect',{x:cx+dx*rx-3,y:cy-ry*.38,width:6,height:ry*.76,rx:3,fill:'rgba(239,68,68,.32)',stroke:'rgba(239,68,68,.58)','stroke-width':'1.2','pointer-events':'none'}));});
    const bflow=svgEl('text',{x:cx,y:cy+4,'text-anchor':'middle','font-size':'7.5',fill:hex2rgba(c,.68),'pointer-events':'none','font-weight':'bold'});bflow.textContent='→ bilis';bflow.style.animation='axonFlow 2.5s linear infinite';g.appendChild(bflow);
    g.appendChild(svgEl('text',{x:cx-rx*.92,y:cy-ry*.55,'text-anchor':'middle','font-size':'5.5',fill:'rgba(239,68,68,.6)','pointer-events':'none'})).textContent='TJ';
    g.appendChild(svgEl('text',{x:cx+rx*.92,y:cy-ry*.55,'text-anchor':'middle','font-size':'5.5',fill:'rgba(239,68,68,.6)','pointer-events':'none'})).textContent='TJ';
  }


  // ── MYOCYTE ORGANELLES ────────────────────────────────────────────────────
  if(id==='myocyte_membrane'){
    const pts=18;for(let i=0;i<pts;i++){const a=i/pts*Math.PI*2;const px=cx+rx*.96*Math.cos(a),py=cy+ry*.96*Math.sin(a);g.appendChild(svgEl('circle',{cx:px,cy:py,r:2.8,fill:hex2rgba(c,.22),'pointer-events':'none'}));}
    [-0.6,-0.2,0.2,0.6].forEach((dx,i)=>{const pm=svgEl('rect',{x:cx+dx*rx*.88-3,y:cy-ry*.98,width:6,height:5,rx:2,fill:'rgba(96,165,250,0.55)','pointer-events':'none'});pm.classList.add('lyso-dot');pm.style.animationDelay=(i*0.2)+'s';g.appendChild(pm);});
    [-0.55,0,0.55].forEach(dx=>{const cav=svgEl('circle',{cx:cx+dx*rx*.6,cy:cy+ry*.92,r:4.5,fill:hex2rgba(c,.12),stroke:hex2rgba(c,.35),'stroke-width':'1','pointer-events':'none'});cav.classList.add('spore-pulse');g.appendChild(cav);});
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.58,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.42),'pointer-events':'none','font-style':'italic'})).textContent='sarcolema';
    g.appendChild(svgEl('text',{x:cx+rx*.75,y:cy+4,'text-anchor':'middle','font-size':'6',fill:'rgba(96,165,250,0.5)','pointer-events':'none'})).textContent='Nav1.4';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.78,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.38),'pointer-events':'none'})).textContent='caveolae';
  }

  if(id==='nucleus_m'||id==='nucleus_m2'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.92,ry:ry*.88,fill:hex2rgba(c,.12),stroke:hex2rgba(c,.5),'stroke-width':'1.8','pointer-events':'none'}));
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.76,ry:ry*.7,fill:hex2rgba(c,.07),stroke:hex2rgba(c,.25),'stroke-width':'1','pointer-events':'none'}));
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const px=cx+rx*.88*Math.cos(a),py=cy+ry*.82*Math.sin(a);const p=svgEl('circle',{cx:px,cy:py,r:2.2,fill:hex2rgba(c,.55),'pointer-events':'none'});p.classList.add('npore-dot');p.style.animationDelay=(i*0.15)+'s';g.appendChild(p);}
    [[-0.55,0.38],[0.55,0.38],[0,-0.5]].forEach(([dx,dy])=>{g.appendChild(svgEl('ellipse',{cx:cx+dx*rx*.55,cy:cy+dy*ry*.55,rx:rx*.16,ry:ry*.2,fill:hex2rgba(c,.28),'pointer-events':'none'}));});
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.52),'pointer-events':'none','font-style':'italic'})).textContent='periférico';
  }

  if(id==='sarcomere'){
    g.appendChild(svgEl('rect',{x:cx-rx*.22,y:cy-ry*.88,width:rx*.44,height:ry*1.76,rx:3,fill:hex2rgba(c,.06),'pointer-events':'none'}));
    g.appendChild(svgEl('rect',{x:cx-rx*.72,y:cy-ry*.88,width:rx*.5,height:ry*1.76,rx:3,fill:hex2rgba(c,.14),'pointer-events':'none'}));
    g.appendChild(svgEl('rect',{x:cx+rx*.22,y:cy-ry*.88,width:rx*.5,height:ry*1.76,rx:3,fill:hex2rgba(c,.14),'pointer-events':'none'}));
    g.appendChild(svgEl('line',{x1:cx-rx*.97,y1:cy-ry*.94,x2:cx-rx*.97,y2:cy+ry*.94,stroke:hex2rgba(c,.78),'stroke-width':'2.5','pointer-events':'none'}));
    g.appendChild(svgEl('line',{x1:cx+rx*.97,y1:cy-ry*.94,x2:cx+rx*.97,y2:cy+ry*.94,stroke:hex2rgba(c,.78),'stroke-width':'2.5','pointer-events':'none'}));
    g.appendChild(svgEl('line',{x1:cx,y1:cy-ry*.82,x2:cx,y2:cy+ry*.82,stroke:'rgba(252,165,165,0.5)','stroke-width':'1.2','pointer-events':'none'}));
    [-0.55,-0.18,0.18,0.55].forEach(dy=>{g.appendChild(svgEl('line',{x1:cx-rx*.68,y1:cy+ry*dy,x2:cx+rx*.68,y2:cy+ry*dy,stroke:hex2rgba(c,.52),'stroke-width':'1.8','stroke-linecap':'round','pointer-events':'none'}));});
    [-0.64,-0.32,0,0.32,0.64].forEach(dy=>{g.appendChild(svgEl('line',{x1:cx-rx*.95,y1:cy+ry*dy,x2:cx-rx*.23,y2:cy+ry*dy,stroke:'rgba(252,165,165,0.42)','stroke-width':'1','stroke-linecap':'round','pointer-events':'none'}));g.appendChild(svgEl('line',{x1:cx+rx*.23,y1:cy+ry*dy,x2:cx+rx*.95,y2:cy+ry*dy,stroke:'rgba(252,165,165,0.42)','stroke-width':'1','stroke-linecap':'round','pointer-events':'none'}));});
    [[-0.42,-0.28],[0.36,-0.08],[-0.08,0.46],[0.52,0.32]].forEach(([dx,dy],i)=>{const d=svgEl('circle',{cx:cx+rx*dx,cy:cy+ry*dy,r:2.5,fill:'rgba(251,191,36,0.75)','pointer-events':'none'});d.innerHTML='<animate attributeName="opacity" values="0.1;0.9;0.1" dur="'+(1.1+i*0.35)+'s" repeatCount="indefinite"/>';g.appendChild(d);});
    [['Z',cx-rx*.97,cy-ry-7],['I',cx-rx*.73,cy-ry-7],['A',cx-rx*.35,cy-ry-7],['H',cx,cy-ry-7],['Z',cx+rx*.97,cy-ry-7],['M',cx,cy+ry+11]].forEach(([t,lx,ly])=>{const l=svgEl('text',{x:lx,y:ly,'text-anchor':'middle','font-size':'7.5',fill:'rgba(252,165,165,0.72)','pointer-events':'none'});l.textContent=t;g.appendChild(l);});
  }

  if(id==='myofibril'){
    for(let i=0;i<5;i++){const fy=cy-ry*.7+i*ry*.35;g.appendChild(svgEl('line',{x1:cx-rx*.9,y1:fy,x2:cx+rx*.9,y2:fy,stroke:hex2rgba(c,.38),'stroke-width':'1.5','stroke-linecap':'round','pointer-events':'none'}));}
    for(let i=0;i<5;i++){const zx=cx-rx*.78+i*rx*.39;g.appendChild(svgEl('line',{x1:zx,y1:cy-ry*.85,x2:zx,y2:cy+ry*.85,stroke:hex2rgba(c,.62),'stroke-width':'1.8','pointer-events':'none'}));}
    for(let i=0;i<4;i++){const x1=cx-rx*.78+i*rx*.39,x2=x1+rx*.39;const wl=svgEl('path',{d:'M'+x1+','+cy+' Q'+((x1+x2)/2)+','+(cy-ry*.52)+' '+x2+','+cy,fill:'none',stroke:'rgba(253,186,116,0.32)','stroke-width':'1','pointer-events':'none'});wl.classList.add('filament-line');wl.style.animationDelay=(i*0.2)+'s';g.appendChild(wl);}
    g.appendChild(svgEl('text',{x:cx,y:cy+ry+11,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.5),'pointer-events':'none','font-style':'italic'})).textContent='miofibrilla';
    g.appendChild(svgEl('text',{x:cx-rx*.78,y:cy-ry-7,'text-anchor':'middle','font-size':'6',fill:'rgba(252,165,165,0.5)','pointer-events':'none'})).textContent='Z';
  }

  if(id==='t_tubule'){
    g.appendChild(svgEl('rect',{x:cx-rx*.55,y:cy-ry*.92,width:rx*1.1,height:ry*1.84,rx:rx*.5,fill:hex2rgba(c,.12),stroke:hex2rgba(c,.48),'stroke-width':'1.8','pointer-events':'none'}));
    for(let i=0;i<4;i++){const py=cy-ry*.55+i*ry*.38;[-0.52,0.52].forEach(dx=>{const m=svgEl('rect',{x:cx+dx*rx-2.5,y:py-2.5,width:5,height:5,rx:1.5,fill:'rgba(96,165,250,0.65)','pointer-events':'none'});m.classList.add('lyso-dot');m.style.animationDelay=(i*0.15)+'s';g.appendChild(m);});}
    for(let i=0;i<3;i++){const d=svgEl('circle',{cx,cy:cy-ry*.35+i*ry*.38,r:2,fill:'rgba(147,197,253,0.7)','pointer-events':'none'});d.innerHTML='<animate attributeName="cy" values="'+(cy-ry*.35+i*ry*.38)+';'+(cy+ry*.35+i*ry*.18)+';'+(cy-ry*.35+i*ry*.38)+'" dur="'+(1.8+i*0.3)+'s" repeatCount="indefinite"/>';g.appendChild(d);}
    g.appendChild(svgEl('text',{x:cx+rx+8,y:cy+2,'text-anchor':'start','font-size':'6.5',fill:'rgba(147,197,253,0.65)','pointer-events':'none'})).textContent='DHPR';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry+12,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.48),'pointer-events':'none','font-style':'italic'})).textContent='tüb.T';
  }

  if(id==='sr'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.88,ry:ry*.75,fill:hex2rgba(c,.08),stroke:hex2rgba(c,.38),'stroke-width':'1.8','stroke-dasharray':'10 5','pointer-events':'none'}));
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const d=svgEl('circle',{cx:cx+rx*.52*Math.cos(a),cy:cy+ry*.45*Math.sin(a),r:2.8,fill:'rgba(251,191,36,0.52)','pointer-events':'none'});d.classList.add('lyso-dot');d.style.animationDelay=(i*0.14)+'s';g.appendChild(d);}
    [-0.6,-0.2,0.2,0.6].forEach((dx,i)=>{const pm=svgEl('rect',{x:cx+dx*rx*.82-3,y:cy-ry*.82,width:6,height:5,rx:2,fill:'rgba(251,191,36,0.52)','pointer-events':'none'});pm.classList.add('lyso-dot');pm.style.animationDelay=(i*0.2)+'s';g.appendChild(pm);});
    const fl=svgEl('text',{x:cx,y:cy+4,'text-anchor':'middle','font-size':'8',fill:'rgba(251,191,36,0.65)','pointer-events':'none'});fl.textContent='Ca²⁺';fl.classList.add('protein-flow');g.appendChild(fl);
    g.appendChild(svgEl('text',{x:cx,y:cy+ry+12,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.45),'pointer-events':'none','font-style':'italic'})).textContent='SERCA';
  }

  if(id==='terminal_cisterna'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.88,ry:ry*.8,fill:hex2rgba(c,.2),stroke:hex2rgba(c,.6),'stroke-width':'2','pointer-events':'none'}));
    for(let i=0;i<4;i++){const px=cx-rx*.55+i*rx*.37;const r=svgEl('circle',{cx:px,cy:cy-ry*.72,r:2.8,fill:hex2rgba(c,.68),'pointer-events':'none'});r.classList.add('npore-dot');r.style.animationDelay=(i*0.18)+'s';g.appendChild(r);}
    const ca=svgEl('text',{x:cx,y:cy-ry*.12,'text-anchor':'middle','font-size':'7',fill:'rgba(251,191,36,0.72)','pointer-events':'none','font-weight':'bold'});ca.textContent='↑Ca²⁺';ca.classList.add('protein-flow');g.appendChild(ca);
    g.appendChild(svgEl('text',{x:cx,y:cy+ry+11,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none'})).textContent='RyR1';
  }

  if(id==='myoglobin'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.82,ry:ry*.82,fill:hex2rgba(c,.22),stroke:hex2rgba(c,.55),'stroke-width':'2','pointer-events':'none'}));
    g.appendChild(svgEl('circle',{cx,cy,r:rx*.28,fill:'rgba(185,28,28,0.45)',stroke:'rgba(239,68,68,0.65)','stroke-width':'1.5','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7',fill:'rgba(252,165,165,0.78)','pointer-events':'none','font-weight':'bold'})).textContent='Fe';
    for(let i=0;i<3;i++){const a=i/3*Math.PI*2;const od=svgEl('circle',{cx:cx+rx*.54*Math.cos(a),cy:cy+ry*.54*Math.sin(a),r:3,fill:'rgba(147,197,253,0.65)','pointer-events':'none'});od.innerHTML='<animate attributeName="opacity" values="0.2;0.85;0.2" dur="'+(1.3+i*0.4)+'s" repeatCount="indefinite"/>';g.appendChild(od);}
    g.appendChild(svgEl('text',{x:cx,y:cy+ry+12,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none','font-style':'italic'})).textContent='O₂';
    g.appendChild(svgEl('text',{x:cx+rx*.78,y:cy-ry*.72,'text-anchor':'start','font-size':'5.5',fill:hex2rgba(c,.44),'pointer-events':'none'})).textContent='P50≈3';
  }

  if(id==='neuromuscular_jn'){
    g.appendChild(svgEl('ellipse',{cx,cy:cy-ry*.15,rx:rx*.72,ry:ry*.72,fill:'rgba(251,191,36,0.1)',stroke:'rgba(251,191,36,0.4)','stroke-width':'1.8','pointer-events':'none'}));
    for(let i=0;i<7;i++){const vx=cx-rx*.52+(i/6)*rx*1.04;const v=svgEl('circle',{cx:vx,cy:cy-ry*.18,r:3,fill:'rgba(251,191,36,0.55)','pointer-events':'none'});v.classList.add('lyso-dot');v.style.animationDelay=(i*0.12)+'s';g.appendChild(v);}
    g.appendChild(svgEl('rect',{x:cx-rx*.68,y:cy+ry*.28,width:rx*1.36,height:ry*.2,fill:'rgba(251,191,36,0.04)',stroke:'rgba(251,191,36,0.22)','stroke-width':'1','stroke-dasharray':'4 3','pointer-events':'none'}));
    for(let i=0;i<5;i++){const fx=cx-rx*.6+i*rx*.3;g.appendChild(svgEl('line',{x1:fx,y1:cy+ry*.48,x2:fx,y2:cy+ry*.88,stroke:hex2rgba(c,.52),'stroke-width':'1.8','pointer-events':'none'}));const ar=svgEl('circle',{cx:fx,cy:cy+ry*.5,r:2.2,fill:'rgba(251,191,36,0.62)','pointer-events':'none'});ar.classList.add('npore-dot');ar.style.animationDelay=(i*0.15)+'s';g.appendChild(ar);}
    const ach=svgEl('text',{x:cx,y:cy+ry*.18,'text-anchor':'middle','font-size':'7',fill:'rgba(251,191,36,0.68)','pointer-events':'none'});ach.textContent='ACh↓';ach.classList.add('protein-flow');g.appendChild(ach);
    g.appendChild(svgEl('text',{x:cx-rx*.72,y:cy-ry*.82,'text-anchor':'start','font-size':'6',fill:'rgba(251,191,36,0.45)','pointer-events':'none'})).textContent='AChR';
  }


  // ── TCELL ORGANELLES ──────────────────────────────────────────────────────
  if(id==='tcell_membrane'){
    const pts=24;for(let i=0;i<pts;i++){const a=i/pts*Math.PI*2;const px=cx+rx*.95*Math.cos(a),py=cy+ry*.95*Math.sin(a);g.appendChild(svgEl('circle',{cx:px,cy:py,r:2.5,fill:hex2rgba(c,.25),'pointer-events':'none'}));}
    [0,.42,.84,1.26,1.68,2.1,2.52,2.94,3.36,3.78].forEach((t,i)=>{const px=cx+rx*.97*Math.cos(t),py=cy+ry*.97*Math.sin(t);const tc=svgEl('circle',{cx:px,cy:py,r:3.8,fill:'rgba(167,139,250,0.52)',stroke:'rgba(196,181,253,0.38)','stroke-width':'.8','pointer-events':'none'});tc.classList.add('npore-dot');tc.style.animationDelay=(i*0.18)+'s';g.appendChild(tc);});
    [[-0.5,-0.86,'CD4'],[0.5,-0.86,'CD8']].forEach(([dx,dy,lbl])=>{g.appendChild(svgEl('rect',{x:cx+dx*rx-3,y:cy+dy*ry-4,width:6,height:7,rx:2,fill:'rgba(251,191,36,0.52)','pointer-events':'none'}));g.appendChild(svgEl('text',{x:cx+dx*rx,y:cy+dy*ry-7,'text-anchor':'middle','font-size':'6',fill:'rgba(251,191,36,0.52)','pointer-events':'none'})).textContent=lbl;});
    const cd28=svgEl('circle',{cx:cx+rx*.82,cy:cy+ry*.52,r:4.2,fill:'rgba(34,197,94,0.4)',stroke:'rgba(34,197,94,0.28)','stroke-width':'1','pointer-events':'none'});cd28.classList.add('spore-pulse');g.appendChild(cd28);
    g.appendChild(svgEl('text',{x:cx+rx*.82,y:cy+ry*.74,'text-anchor':'middle','font-size':'5.5',fill:'rgba(34,197,94,0.5)','pointer-events':'none'})).textContent='CD28';
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.52,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.42),'pointer-events':'none','font-style':'italic'})).textContent='TCR/CD3';
  }

  if(id==='nucleus_t'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.94,ry:ry*.92,fill:hex2rgba(c,.14),stroke:hex2rgba(c,.52),'stroke-width':'2.2','pointer-events':'none'}));
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.8,ry:ry*.78,fill:hex2rgba(c,.07),stroke:hex2rgba(c,.24),'stroke-width':'1','pointer-events':'none'}));
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const px=cx+rx*.9*Math.cos(a),py=cy+ry*.88*Math.sin(a);const p=svgEl('circle',{cx:px,cy:py,r:2.5,fill:hex2rgba(c,.55),'pointer-events':'none'});p.classList.add('npore-dot');p.style.animationDelay=(i*0.1)+'s';g.appendChild(p);}
    [0,.52,1.05,1.57,2.09,2.62,3.14,3.67].forEach((a,i)=>{g.appendChild(svgEl('ellipse',{cx:cx+rx*.68*Math.cos(a),cy:cy+ry*.66*Math.sin(a),rx:rx*.08,ry:ry*.08,fill:hex2rgba(c,.35),'pointer-events':'none'}));});
    for(let i=0;i<5;i++){const x1=cx-rx*.55+i*rx*.28,y1=cy-ry*.32+i*ry*.15;g.appendChild(svgEl('line',{x1,y1,x2:x1+rx*.22,y2:y1+ry*.15,stroke:hex2rgba(c,.26),'stroke-width':'1.2','pointer-events':'none'}));}
    const nf=svgEl('text',{x:cx,y:cy+4,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.42),'pointer-events':'none','font-style':'italic'});nf.textContent='NFAT→';nf.classList.add('protein-flow');g.appendChild(nf);
  }

  if(id==='nucleolus_t'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.68,ry:ry*.65,fill:'rgba(165,180,252,0.17)',stroke:'rgba(165,180,252,0.42)','stroke-width':'1.5','pointer-events':'none'}));
    g.appendChild(svgEl('circle',{cx,cy,r:rx*.34,fill:'rgba(139,92,246,0.28)','pointer-events':'none'}));
    for(let i=0;i<5;i++){const a=i/5*Math.PI*2;const rl=svgEl('line',{x1:cx+rx*.34*Math.cos(a),y1:cy+ry*.32*Math.sin(a),x2:cx+rx*.65*Math.cos(a),y2:cy+ry*.6*Math.sin(a),stroke:'rgba(196,181,253,0.48)','stroke-width':'1.2','pointer-events':'none'});rl.classList.add('filament-line');rl.style.animationDelay=(i*0.2)+'s';g.appendChild(rl);}
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'6',fill:'rgba(196,181,253,0.65)','pointer-events':'none','font-style':'italic'})).textContent='ARNr';
  }

  if(id==='tcr_cd3'){
    g.appendChild(svgEl('ellipse',{cx:cx-rx*.2,cy:cy-ry*.22,rx:rx*.3,ry:ry*.42,fill:hex2rgba(c,.18),stroke:hex2rgba(c,.52),'stroke-width':'1.5','pointer-events':'none'}));
    g.appendChild(svgEl('ellipse',{cx:cx+rx*.2,cy:cy-ry*.22,rx:rx*.3,ry:ry*.42,fill:hex2rgba(c,.18),stroke:hex2rgba(c,.52),'stroke-width':'1.5','pointer-events':'none'}));
    [-0.55,-0.18,0.18,0.55].forEach((dx,i)=>{const m=svgEl('rect',{x:cx+dx*rx*.6-2.5,y:cy+ry*.15,width:5,height:ry*.55,rx:2,fill:hex2rgba(c,.38),'pointer-events':'none'});m.classList.add('lyso-dot');m.style.animationDelay=(i*0.18)+'s';g.appendChild(m);});
    [0,1,2].forEach(i=>{const d=svgEl('circle',{cx:cx,cy:cy+ry*.3+i*ry*.22,r:2.8,fill:'rgba(251,191,36,0.65)','pointer-events':'none'});d.innerHTML='<animate attributeName="opacity" values="0.1;0.9;0.1" dur="'+(1.1+i*0.28)+'s" repeatCount="indefinite"/>';g.appendChild(d);});
    g.appendChild(svgEl('text',{x:cx,y:cy-ry-8,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.62),'pointer-events':'none'})).textContent='pMHC↓';
    g.appendChild(svgEl('text',{x:cx,y:cy+ry+11,'text-anchor':'middle','font-size':'6.5',fill:'rgba(251,191,36,0.55)','pointer-events':'none'})).textContent='ITAM';
  }

  if(id==='immune_synapse'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.92,ry:ry*.85,fill:'none',stroke:'rgba(167,139,250,0.4)','stroke-width':'2.5','stroke-dasharray':'8 4','pointer-events':'none'}));
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.52,ry:ry*.58,fill:hex2rgba(c,.16),stroke:hex2rgba(c,.52),'stroke-width':'2','pointer-events':'none'}));
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const d=svgEl('circle',{cx:cx+rx*.3*Math.cos(a),cy:cy+ry*.32*Math.sin(a),r:3.2,fill:hex2rgba(c,.62),'pointer-events':'none'});d.classList.add('lyso-dot');d.style.animationDelay=(i*0.15)+'s';g.appendChild(d);}
    const fl=svgEl('text',{x:cx,y:cy+4,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.65),'pointer-events':'none'});fl.textContent='cSMAC';fl.classList.add('protein-flow');g.appendChild(fl);
    g.appendChild(svgEl('text',{x:cx+rx*.82,y:cy+3,'text-anchor':'start','font-size':'6',fill:'rgba(167,139,250,0.48)','pointer-events':'none'})).textContent='pSMAC';
    const cyfl=svgEl('text',{x:cx-rx*.42,y:cy-ry*.55,'text-anchor':'middle','font-size':'6.5',fill:'rgba(34,197,94,0.62)','pointer-events':'none'});cyfl.textContent='↓IL-2';cyfl.classList.add('protein-flow');g.appendChild(cyfl);
  }

  if(id==='golgi_t'){
    for(let i=0;i<5;i++){const sp=i*rx*.06;const arc=svgEl('path',{d:'M'+(cx-rx*.72+sp)+','+(cy-ry*.42+i*ry*.3)+' Q'+cx+','+(cy-ry*.68+i*ry*.28)+' '+(cx+rx*.72-sp)+','+(cy-ry*.42+i*ry*.3),fill:'none',stroke:hex2rgba(c,.38+i*.06),'stroke-width':'2.2','stroke-linecap':'round','pointer-events':'none'});arc.classList.add('golgi-arc');arc.style.animationDelay=(i*.12)+'s';g.appendChild(arc);}
    [[-0.38,0.48],[0,0.58],[0.38,0.48]].forEach(([dx,dy],i)=>{const v=svgEl('circle',{cx:cx+rx*dx,cy:cy+ry*dy,r:5,fill:hex2rgba(c,.35),stroke:hex2rgba(c,.28),'stroke-width':'1','pointer-events':'none'});v.classList.add('spore-pulse');v.style.animationDelay=(i*0.22)+'s';g.appendChild(v);});
    const pa=svgEl('text',{x:cx,y:cy+ry+11,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.5),'pointer-events':'none'});pa.textContent='↓IS';pa.classList.add('protein-flow');g.appendChild(pa);
    g.appendChild(svgEl('text',{x:cx-rx*.62,y:cy-ry*.58,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.42),'pointer-events':'none'})).textContent='cis';
    g.appendChild(svgEl('text',{x:cx+rx*.62,y:cy+ry*.28,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.42),'pointer-events':'none'})).textContent='trans';
  }

  if(id==='cytotox_granule'||id==='cytotox_granule2'){
    g.appendChild(svgEl('circle',{cx,cy,r:rx*.82,fill:hex2rgba(c,.22),stroke:hex2rgba(c,.58),'stroke-width':'2','pointer-events':'none'}));
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const sp=svgEl('line',{x1:cx+rx*.22*Math.cos(a),y1:cy+rx*.22*Math.sin(a),x2:cx+rx*.65*Math.cos(a),y2:cy+rx*.65*Math.sin(a),stroke:'rgba(52,211,153,0.55)','stroke-width':'1.5','stroke-linecap':'round','pointer-events':'none'});sp.classList.add('filament-line');sp.style.animationDelay=(i*0.14)+'s';g.appendChild(sp);}
    const grd=svgEl('circle',{cx,cy,r:rx*.22,fill:'rgba(16,185,129,0.42)','pointer-events':'none'});grd.classList.add('spore-pulse');g.appendChild(grd);
    g.appendChild(svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'5.5',fill:'rgba(52,211,153,0.72)','pointer-events':'none','font-weight':'bold'})).textContent='PFN';
    const ra=svgEl('text',{x:cx,y:cy-rx*.35,'text-anchor':'middle','font-size':'7',fill:'rgba(34,197,94,0.68)','pointer-events':'none'});ra.textContent='↓';ra.classList.add('protein-flow');g.appendChild(ra);
    g.appendChild(svgEl('text',{x:cx,y:cy+rx+11,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.5),'pointer-events':'none','font-style':'italic'})).textContent='GzmB';
  }

  if(id==='lck_signaling'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.85,ry:ry*.82,fill:hex2rgba(c,.14),stroke:hex2rgba(c,.38),'stroke-width':'1.5','stroke-dasharray':'6 3','pointer-events':'none'}));
    g.appendChild(svgEl('circle',{cx:cx-rx*.36,cy:cy-ry*.18,r:rx*.28,fill:hex2rgba(c,.35),stroke:hex2rgba(c,.6),'stroke-width':'1.5','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx-rx*.36,y:cy-ry*.18+3,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.78),'pointer-events':'none','font-weight':'bold'})).textContent='Lck';
    g.appendChild(svgEl('circle',{cx:cx+rx*.36,cy:cy+ry*.18,r:rx*.26,fill:'rgba(251,191,36,0.32)',stroke:'rgba(251,191,36,0.58)','stroke-width':'1.5','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx+rx*.36,y:cy+ry*.18+3,'text-anchor':'middle','font-size':'5.5',fill:'rgba(251,191,36,0.75)','pointer-events':'none','font-weight':'bold'})).textContent='ZAP70';
    [[-0.08,-0.58],[0.32,-0.46],[0.58,-0.08]].forEach(([dx,dy],i)=>{const pd=svgEl('circle',{cx:cx+rx*dx,cy:cy+ry*dy,r:2.5,fill:'rgba(251,191,36,0.72)','pointer-events':'none'});pd.innerHTML='<animate attributeName="opacity" values="0.1;0.88;0.1" dur="'+(0.9+i*0.25)+'s" repeatCount="indefinite"/>';g.appendChild(pd);});
    g.appendChild(svgEl('text',{x:cx,y:cy+ry+11,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.45),'pointer-events':'none'})).textContent='P·P·P';
  }

  if(id==='caspase_pathway'){
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.84,ry:ry*.8,fill:hex2rgba(c,.17),stroke:hex2rgba(c,.52),'stroke-width':'2','pointer-events':'none'}));
    [[-0.42,-0.32],[0.08,-0.45],[0.44,-0.12],[0.38,0.32],[-0.08,0.44],[-0.42,0.18]].forEach(([dx,dy],i)=>{const cd=svgEl('circle',{cx:cx+rx*dx,cy:cy+ry*dy,r:2.8,fill:hex2rgba(c,.55),'pointer-events':'none'});cd.classList.add('lyso-dot');cd.style.animationDelay=(i*0.16)+'s';g.appendChild(cd);});
    g.appendChild(svgEl('text',{x:cx,y:cy-ry*.4,'text-anchor':'middle','font-size':'7',fill:hex2rgba(c,.68),'pointer-events':'none','font-weight':'bold'})).textContent='FasL';
    const ap=svgEl('text',{x:cx,y:cy+ry*.3,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.6),'pointer-events':'none'});ap.textContent='→Casp8';ap.classList.add('protein-flow');g.appendChild(ap);
    g.appendChild(svgEl('text',{x:cx,y:cy+ry+11,'text-anchor':'middle','font-size':'6',fill:hex2rgba(c,.45),'pointer-events':'none','font-style':'italic'})).textContent='apoptosis';
  }

  if(id==='er_t'){
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const d=svgEl('circle',{cx:cx+rx*.52*Math.cos(a),cy:cy+ry*.45*Math.sin(a),r:2.8,fill:'rgba(251,191,36,0.5)','pointer-events':'none'});d.classList.add('lyso-dot');d.style.animationDelay=(i*0.13)+'s';g.appendChild(d);}
    const ip=svgEl('text',{x:cx,y:cy+4,'text-anchor':'middle','font-size':'7',fill:'rgba(251,191,36,0.62)','pointer-events':'none'});ip.textContent='Ca²⁺';ip.classList.add('protein-flow');g.appendChild(ip);
    g.appendChild(svgEl('text',{x:cx,y:cy+ry+11,'text-anchor':'middle','font-size':'6',fill:'rgba(251,191,36,0.45)','pointer-events':'none'})).textContent='IP3R';
  }

  if(id==='tylosis'){
    // Parenchyma cell growing into vessel lumen
    // Vessel outline
    g.appendChild(svgEl('ellipse',{cx,cy,rx:rx*.92,ry:ry*.9,fill:'none',stroke:hex2rgba(c,.25),'stroke-width':'1.5','stroke-dasharray':'5 3','pointer-events':'none'}));
    // Tylosis mass
    const tylPath=svgEl('ellipse',{cx:cx-rx*.05,cy:cy+ry*.1,rx:rx*.58,ry:ry*.62,fill:hex2rgba(c,.35),stroke:hex2rgba(c,.6),'stroke-width':'2.5','pointer-events':'none'});
    tylPath.classList.add('spore-pulse');g.appendChild(tylPath);
    // Cell wall of tylosis
    g.appendChild(svgEl('ellipse',{cx:cx-rx*.05,cy:cy+ry*.1,rx:rx*.5,ry:ry*.54,fill:hex2rgba(c,.15),stroke:hex2rgba(c,.4),'stroke-width':'1.2','pointer-events':'none'}));
    // Connection pore (punteadura)
    g.appendChild(svgEl('rect',{x:cx-rx*.45,y:cy-ry*.55,width:rx*.2,height:ry*.15,rx:2,fill:hex2rgba(c,.35),stroke:hex2rgba(c,.6),'stroke-width':'1','pointer-events':'none'}));
    g.appendChild(svgEl('text',{x:cx,y:cy+ry*.8,'text-anchor':'middle','font-size':'6.5',fill:hex2rgba(c,.55),'pointer-events':'none'})).textContent='tílosis';
  }
}

