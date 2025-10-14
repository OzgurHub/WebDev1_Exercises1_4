
// Cart badge + aria-live confirmation
(() => {
  const live = document.createElement('div');
  live.className = 'sr-live';
  live.setAttribute('aria-live','polite');
  live.setAttribute('aria-atomic','true');
  live.style.position='absolute';
  live.style.left='-9999px';
  document.body.appendChild(live);

  const cart = document.querySelector('.cart');
  let count = 0, badge;

  function updateBadge(){
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      cart.style.position = 'relative';
      badge.style.position = 'absolute';
      badge.style.top = '-6px';
      badge.style.right = '-6px';
      badge.style.minWidth = '20px';
      badge.style.height = '20px';
      badge.style.borderRadius = '999px';
      badge.style.background = '#d00';
      badge.style.color = '#fff';
      badge.style.fontSize = '12px';
      badge.style.display = 'grid';
      badge.style.placeItems = 'center';
      badge.style.padding = '0 6px';
      cart.appendChild(badge);
    }
    badge.textContent = String(count);
  }

  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      count += 1;
      updateBadge();
      live.textContent = 'Added to basket. Total items ' + count + '.';
    });
  });
})();
