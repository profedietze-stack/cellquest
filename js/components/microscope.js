// CellQuest — Microscope Particle System
// ═══════════════ MICROSCOPE PARTICLE SYSTEM ═══════════════
(function(){
  let animId=null;
  const particles=[];
  const PARTICLE_COUNT=55;

  function initParticles(w,h){
    particles.length=0;
    for(let i=0;i<PARTICLE_COUNT;i++){
      particles.push(createParticle(w,h,true));
    }
  }

  function createParticle(w,h,randomStart=false){
    const types=['bacteria','debris','ion','vesicle','protein'];
    const type=types[Math.floor(Math.random()*types.length)];
    return {
      x:randomStart?Math.random()*w:Math.random()*w,
      y:randomStart?Math.random()*h:-10,
      vx:(Math.random()-.5)*.35,
      vy:(Math.random()*.3+.05),
      r:type==='bacteria'?(Math.random()*2.5+1.5):type==='vesicle'?(Math.random()*3+2):(Math.random()*1.8+0.7),
      alpha:Math.random()*.55+.1,
      alphaTarget:Math.random()*.55+.1,
      alphaSpd:Math.random()*.005+.001,
      color:['rgba(0,229,255,','rgba(120,180,255,','rgba(180,220,255,','rgba(80,160,240,','rgba(200,240,255,'][Math.floor(Math.random()*5)],
      type,
      wobble:Math.random()*Math.PI*2,
      wobbleSpd:Math.random()*.03+.005,
      wobbleAmp:Math.random()*0.8+0.1,
      life:1,drift:0,
    };
  }

  function drawParticle(ctx,p){
    ctx.save();
    const alpha=p.alpha*(0.6+0.4*Math.sin(p.wobble));
    ctx.globalAlpha=Math.max(0,Math.min(1,alpha));
    if(p.type==='vesicle'){
      // small membrane-bound vesicle
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.strokeStyle=p.color+'0.7)';
      ctx.lineWidth=1.2;
      ctx.stroke();
      ctx.globalAlpha*=0.3;
      ctx.fillStyle=p.color+'0.3)';
      ctx.fill();
    } else if(p.type==='bacteria'){
      // tiny elongated bacteria
      ctx.beginPath();
      ctx.ellipse(p.x,p.y,p.r*1.8,p.r*.8,p.wobble,0,Math.PI*2);
      ctx.fillStyle=p.color+'0.5)';
      ctx.fill();
    } else if(p.type==='ion'){
      // tiny bright dot (ion)
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r*.7,0,Math.PI*2);
      ctx.fillStyle=p.color+'0.9)';
      ctx.fill();
    } else {
      // generic debris
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.color+'0.5)';
      ctx.fill();
    }
    ctx.restore();
  }

  function animate(canvas,ctx,w,h){
    ctx.clearRect(0,0,w,h);
    // gentle blue haze (fluid medium)
    const grad=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,w*.55);
    grad.addColorStop(0,'rgba(0,30,60,0.0)');
    grad.addColorStop(1,'rgba(0,10,30,0.15)');
    ctx.fillStyle=grad;
    ctx.fillRect(0,0,w,h);

    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i];
      p.x+=p.vx+Math.sin(p.wobble)*p.wobbleAmp*.4;
      p.y+=p.vy;
      p.wobble+=p.wobbleSpd;
      // brownian micro-drift
      p.vx+=(Math.random()-.5)*.04;
      p.vy+=(Math.random()-.5)*.02;
      p.vx*=0.98;p.vy*=0.98;
      // alpha drift
      if(Math.abs(p.alpha-p.alphaTarget)<0.005){p.alphaTarget=Math.random()*.5+.08;p.alphaSpd=Math.random()*.004+.001;}
      if(p.alpha<p.alphaTarget)p.alpha+=p.alphaSpd;else p.alpha-=p.alphaSpd;
      drawParticle(ctx,p);
      if(p.y>h+10||p.x<-20||p.x>w+20){
        particles[i]=createParticle(w,h,false);
        particles[i].x=Math.random()*w;
        particles[i].y=-10;
      }
    }
    animId=requestAnimationFrame(()=>animate(canvas,ctx,w,h));
  }

  function startMicroscope(){
    const canvas=document.getElementById('microscopeCanvas');
    if(!canvas)return;
    const panel=canvas.parentElement;
    const w=panel.clientWidth,h=panel.clientHeight;
    canvas.width=w;canvas.height=h;
    const ctx=canvas.getContext('2d');
    initParticles(w,h);
    if(animId)cancelAnimationFrame(animId);
    animate(canvas,ctx,w,h);
  }

  function stopMicroscope(){
    if(animId){cancelAnimationFrame(animId);animId=null;}
  }

  // Patch enterGame and backToMenu
  const _origEnter=enterGame;
  enterGame=function(){_origEnter();setTimeout(startMicroscope,80);};
  const _origBack=backToMenu;
  backToMenu=function(){stopMicroscope();_origBack();};

  window.addEventListener('resize',()=>{
    const gs=document.getElementById('gameScreen');
    if(gs&&gs.classList.contains('active'))startMicroscope();
  });
})();

