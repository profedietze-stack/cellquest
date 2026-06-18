// CellQuest — Capturador global de errores (solo dev/test)
// Muestra banner rojo fijo cuando ocurre un error no capturado.
// Sin esto, un throw silencioso deja la UI congelada sin pista.
(function initErrorBanner() {
  function _show(title, detail) {
    let box = document.getElementById('__err_banner');
    if (!box) {
      box = document.createElement('div');
      box.id = '__err_banner';
      box.style.cssText = [
        'position:fixed','top:0','left:0','right:0',
        'z-index:2147483647',
        'background:#b00020','color:#fff',
        'font:12px/1.4 monospace','padding:10px 40px 10px 12px',
        'white-space:pre-wrap','word-break:break-word',
        'max-height:50vh','overflow:auto',
        'box-shadow:0 2px 12px rgba(0,0,0,.6)',
        'cursor:pointer',
      ].join(';');
      document.body.appendChild(box);

      const close = document.createElement('button');
      close.textContent = 'X';
      close.setAttribute('aria-label', 'Cerrar error');
      close.style.cssText = 'position:fixed;top:6px;right:8px;z-index:2147483647;background:#fff;color:#b00020;border:0;width:28px;height:28px;font:bold 14px monospace;border-radius:6px;cursor:pointer;';
      close.onclick = function(e) { e.stopPropagation(); box.remove(); close.remove(); };
      document.body.appendChild(close);

      box.addEventListener('click', function() {
        navigator.clipboard && navigator.clipboard.writeText(box.textContent).catch(function(){});
      });
    }
    box.textContent = 'ERROR: ' + title + '\n' + detail;
  }

  window.addEventListener('error', function(e) {
    var where = e.filename
      ? e.filename.split('/').pop() + ':' + e.lineno + ':' + e.colno
      : '(sin ubicacion)';
    var stack = e.error && e.error.stack
      ? '\n' + e.error.stack.split('\n').slice(0, 4).join('\n') : '';
    _show(e.message || 'error desconocido', where + stack);
  });

  window.addEventListener('unhandledrejection', function(e) {
    var reason = e.reason;
    var msg = (reason && reason.message) ? reason.message : String(reason);
    var stack = (reason && reason.stack)
      ? '\n' + reason.stack.split('\n').slice(0, 4).join('\n') : '';
    _show('Promesa rechazada: ' + msg, stack);
  });

  console.info('[error-banner] activo');
})();
