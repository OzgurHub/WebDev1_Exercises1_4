
// Accessible lightbox for gallery images
(() => {
  const imgs = Array.from(document.querySelectorAll('.gallery img'));
  if (!imgs.length) return;

  const tpl = document.createElement('template');
  tpl.innerHTML = `
    <div class="lb-backdrop" role="dialog" aria-modal="true" aria-label="Image viewer" hidden>
      <button class="lb-close" aria-label="Close">×</button>
      <img class="lb-img" alt="">
      <div class="lb-controls">
        <button class="lb-prev" aria-label="Previous image">‹</button>
        <button class="lb-next" aria-label="Next image">›</button>
      </div>
    </div>`;
  document.body.appendChild(tpl.content);

  const backdrop = document.querySelector('.lb-backdrop');
  const img = backdrop.querySelector('.lb-img');
  const prev = backdrop.querySelector('.lb-prev');
  const next = backdrop.querySelector('.lb-next');
  const closeBtn = backdrop.querySelector('.lb-close');

  let idx = 0, lastFocus = null;

  function open(i) {
    idx = i;
    img.src = imgs[idx].src;
    img.alt = imgs[idx].alt || '';
    backdrop.hidden = false;
    lastFocus = document.activeElement;
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }
  function close() {
    backdrop.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function move(d) {
    idx = (idx + d + imgs.length) % imgs.length;
    img.src = imgs[idx].src;
    img.alt = imgs[idx].alt || '';
  }

  imgs.forEach((el,i)=>{
    el.tabIndex = 0;
    el.addEventListener('click',()=>open(i));
    el.addEventListener('keydown',(e)=>{
      if (e.key==='Enter' || e.key===' ') { e.preventDefault(); open(i); }
    });
  });
  prev.addEventListener('click',()=>move(-1));
  next.addEventListener('click',()=>move(1));
  closeBtn.addEventListener('click',close);
  backdrop.addEventListener('click',(e)=>{ if (e.target===backdrop) close(); });
  window.addEventListener('keydown',(e)=>{
    if (backdrop.hidden) return;
    if (e.key==='Escape') close();
    if (e.key==='ArrowLeft') move(-1);
    if (e.key==='ArrowRight') move(1);
  });
})();
