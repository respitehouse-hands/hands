// js/site.js (軽量版)

// =========================
// 1) 「上へ戻る」進捗リング
// =========================
(() => {
  const btn = document.getElementById('backToTop');
  if(!btn) return;

  const showAt = 200;
  const ring = btn.querySelector('.btt__ring');

  const update = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const r = h>0 ? Math.min(y/h,1) : 0;
    ring && ring.style.setProperty('--btt-progress', Math.round(r*360)+'deg');
    if (y>showAt) btn.classList.add('is-visible'); else btn.classList.remove('is-visible');
  };

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  addEventListener('scroll', update, {passive:true});
  addEventListener('resize', update);
  update();
})();

// =========================
// 2) ページの表示解放（これを即時実行させるのが大事）
// =========================
(() => {
  const html = document.documentElement;
  document.body.classList.add('page-show');
  html.classList.remove('no-scroll');
  html.style.overflowY = 'auto';
})();

// =========================
// 3) ヘッダーのスクロール検知
// =========================
(function(){
  const hd = document.getElementById('site-header');
  if(!hd) return;
  const on = ()=> {
    const y = window.scrollY || document.documentElement.scrollTop;
    hd.classList.toggle('is-scrolled', y > 8);
  };
  window.addEventListener('scroll', on, {passive:true});
  on();
})();
