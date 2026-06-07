// CellQuest — SVG Zoom & Pan (game microscope)
// ═══════════════ MICROSCOPE ZOOM ═══════════════
(function(){
  // ═══════════════════════════════════════════════════════════
  // ZOOM & PAN — viewBox-based (SVG never scales, graphics intact)
  // ═══════════════════════════════════════════════════════════
  const svg      = document.getElementById('cellSvg');
  const tipBox   = document.getElementById('cellTip');
  const btnIn    = document.getElementById('zoomIn');
  const btnOut   = document.getElementById('zoomOut');
  const btnReset = document.getElementById('zoomReset');
  const lblZoom  = document.getElementById('zoomLevel');

  // viewBox state
  const VB_FULL = {x:0, y:0, w:540, h:540};   // 100% — full cell visible
  const MIN_W = 108;   // max zoom ×5
  const MAX_W = 540;   // min zoom ×1 (full view)
  const ZOOM_STEP = 0.7;  // multiply width by this per step (zoom in)

  let vb = {...VB_FULL};  // current viewBox

  function applyVB(animated){
    // Clamp pan so cell never goes fully off-screen
    vb.x = Math.max(-(vb.w*0.5), Math.min(540 - vb.w*0.5, vb.x));
    vb.y = Math.max(-(vb.h*0.5), Math.min(540 - vb.h*0.5, vb.y));
    svg.setAttribute('viewBox', `${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`);
    const pct = Math.round(540 / vb.w * 100);
    lblZoom.textContent = pct + '%';
    btnOut.disabled   = vb.w >= MAX_W - 0.5;
    btnIn.disabled    = vb.w <= MIN_W + 0.5;
    btnReset.disabled = (vb.x === 0 && vb.y === 0 && vb.w === 540);
  }

  function zoomAt(svgX, svgY, factor){
    // factor < 1 = zoom in, > 1 = zoom out
    const newW = Math.max(MIN_W, Math.min(MAX_W, vb.w * factor));
    const newH = newW; // square viewBox
    // Keep the svgX/Y point fixed under the cursor
    vb.x = svgX - (svgX - vb.x) * (newW / vb.w);
    vb.y = svgY - (svgY - vb.y) * (newH / vb.h);
    vb.w = newW;
    vb.h = newH;
    applyVB();
  }

  function resetView(){
    vb = {...VB_FULL};
    applyVB();
  }

  // Convert screen (clientX/Y) to SVG coordinates
  function screenToSvg(clientX, clientY){
    const rect = svg.getBoundingClientRect();
    const ratioX = vb.w / rect.width;
    const ratioY = vb.h / rect.height;
    return {
      x: vb.x + (clientX - rect.left) * ratioX,
      y: vb.y + (clientY - rect.top)  * ratioY,
    };
  }

  // ── Buttons ──────────────────────────────────────────────────
  btnIn.addEventListener('click', e => {
    e.stopPropagation();
    zoomAt(vb.x + vb.w/2, vb.y + vb.h/2, ZOOM_STEP);
  });
  btnOut.addEventListener('click', e => {
    e.stopPropagation();
    zoomAt(vb.x + vb.w/2, vb.y + vb.h/2, 1/ZOOM_STEP);
  });
  btnReset.addEventListener('click', e => {
    e.stopPropagation();
    resetView();
  });

  // ── Mouse wheel (PC) ─────────────────────────────────────────
  svg.addEventListener('wheel', e => {
    e.preventDefault();
    const pt = screenToSvg(e.clientX, e.clientY);
    const factor = e.deltaY > 0 ? 1/ZOOM_STEP : ZOOM_STEP;
    zoomAt(pt.x, pt.y, factor);
  }, {passive: false});

  // ── Mouse drag pan (PC) ──────────────────────────────────────
  let drag = null;
  svg.addEventListener('mousedown', e => {
    if(e.button !== 0) return;
    // Don't start pan if clicking on an organelle (let selectOrg fire)
    drag = {startX: e.clientX, startY: e.clientY, vbx: vb.x, vby: vb.y, moved: false};
    svg.classList.add('panning');
  });
  window.addEventListener('mousemove', e => {
    if(!drag) return;
    const rect = svg.getBoundingClientRect();
    const dx = (e.clientX - drag.startX) * vb.w / rect.width;
    const dy = (e.clientY - drag.startY) * vb.h / rect.height;
    if(Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.moved = true;
    if(!drag.moved) return;
    vb.x = drag.vbx - dx;
    vb.y = drag.vby - dy;
    applyVB();
  });
  window.addEventListener('mouseup', () => {
    if(drag){ svg.classList.remove('panning'); drag = null; }
  });

  // ── Touch pinch-to-zoom + pan (mobile) ───────────────────────
  let touch = null;

  function midpoint(t1, t2){
    return { x:(t1.clientX+t2.clientX)/2, y:(t1.clientY+t2.clientY)/2 };
  }
  function dist(t1, t2){
    const dx=t1.clientX-t2.clientX, dy=t1.clientY-t2.clientY;
    return Math.sqrt(dx*dx+dy*dy);
  }

  svg.addEventListener('touchstart', e => {
    if(e.touches.length === 1){
      touch = {
        type:'pan',
        startX: e.touches[0].clientX, startY: e.touches[0].clientY,
        vbx: vb.x, vby: vb.y, moved: false,
        t: Date.now(), target: e.touches[0].target,
      };
    } else if(e.touches.length === 2){
      const mid = midpoint(e.touches[0], e.touches[1]);
      const pt  = screenToSvg(mid.x, mid.y);
      touch = {
        type:'pinch',
        startDist: dist(e.touches[0], e.touches[1]),
        startW: vb.w, startH: vb.h,
        pivotSvg: pt,
        pivotMid: mid,
        vbx: vb.x, vby: vb.y,
      };
    }
  }, {passive: true});

  svg.addEventListener('touchmove', e => {
    e.preventDefault();
    if(!touch) return;
    if(touch.type === 'pan' && e.touches.length === 1){
      const rect = svg.getBoundingClientRect();
      const dx = (e.touches[0].clientX - touch.startX) * vb.w / rect.width;
      const dy = (e.touches[0].clientY - touch.startY) * vb.h / rect.height;
      if(Math.abs(dx) > 3 || Math.abs(dy) > 3) touch.moved = true;
      if(!touch.moved) return;
      vb.x = touch.vbx - dx;
      vb.y = touch.vby - dy;
      applyVB();
    } else if(touch.type === 'pinch' && e.touches.length === 2){
      const d = dist(e.touches[0], e.touches[1]);
      const scale = touch.startDist / d;  // < 1 = spreading = zoom in
      const newW = Math.max(MIN_W, Math.min(MAX_W, touch.startW * scale));
      // Keep pivot point fixed
      vb.x = touch.pivotSvg.x - (touch.pivotSvg.x - touch.vbx) * (newW / touch.startW);
      vb.y = touch.pivotSvg.y - (touch.pivotSvg.y - touch.vby) * (newW / touch.startW);
      vb.w = newW; vb.h = newW;
      applyVB();
    }
  }, {passive: false});

  svg.addEventListener('touchend', e => {
    if(!touch) return;
    // Single tap on organelle — fire selectOrg
    if(touch.type === 'pan' && !touch.moved && Date.now() - touch.t < 300){
      // handled by existing click listener on <g> elements
    }
    touch = null;
  }, {passive: true});

  // ── Reset viewBox when cell changes ──────────────────────────
  const _origDrawCell = drawCell;
  drawCell = function(levelId, targetSvg){
    if(targetSvg){
      // Atlas mode: draw directly into targetSvg, don't touch game viewBox or hint
      _origDrawCell(levelId, targetSvg);
      return;
    }
    resetView();
    _origDrawCell(levelId);
    if(window._showZoomHint) setTimeout(window._showZoomHint, 400);
  };

  // ── Tip hint ─────────────────────────────────────────────────
  const isTouch = () => navigator.maxTouchPoints > 0;
  function showZoomHint(){
    if(!tipBox) return;
    tipBox.textContent = isTouch()
      ? '👆 Toca organela · Pellizca para hacer zoom'
      : '👆 Click en organela · Rueda o +/− para zoom · Arrastrá para mover';
  }
  window._showZoomHint = showZoomHint;

  // init
  applyVB();

})();
