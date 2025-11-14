// js/site.js

// =========================
// 1) ページ遷移フェード
// =========================
(() => {
  const doc = document.documentElement;
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 入場：次フレームで不透明に
  if (!REDUCED) {
    doc.classList.add('is-enter');
    requestAnimationFrame(() => doc.classList.add('is-in'));
  }

  // 離脱：通常リンクのみフェードアウト
  const DURATION = 180; // ms
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    const href = a.getAttribute('href') || '';
    const sameHost = a.host === location.host;
    const isHash = href.startsWith('#');
    const isJs = href.startsWith('javascript:');
    const isTel = href.startsWith('tel:') || href.startsWith('mailto:');
    const noTrans = a.hasAttribute('data-no-transition');

    if (
      e.defaultPrevented || noTrans || a.target === '_blank' || a.hasAttribute('download') ||
      !href || isHash || isJs || isTel || (!sameHost && !href.startsWith('/'))
    ) return;

    if (REDUCED) return;

    e.preventDefault();
    doc.classList.add('is-leave');
    setTimeout(() => { location.href = a.href; }, DURATION);
  }, { capture: true });

  // bfcache復帰時は即表示
  addEventListener('pageshow', (ev) => {
    if (ev.persisted) {
      doc.classList.remove('is-leave');
      doc.classList.add('is-enter','is-in');
    }
  });
})();

// =========================
// 2) 「上へ戻る」進捗リング（既存）
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
// 3) サブページの表示解放（既存）
// =========================
(() => {
  const html = document.documentElement;
  document.body.classList.add('page-show');
  html.classList.remove('no-scroll');
  html.style.overflowY = 'auto';
})();


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

// =========================
// ページ内リンク用スムーススクロール
// （wahaha.html のサブナビなど共通で使える）
// =========================
(function () {
  // #から始まるリンク（同一ページ内のみ）
  const anchors = document.querySelectorAll('a[href^="#"]');
  if (!anchors.length) return;

  // ヘッダー＋サブナビのぶんだけ少し上に余裕を持たせる
  const HEADER_OFFSET = 120; // 好みで 80〜140 くらいに調整してOK

  anchors.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      // 同一ページ内リンクだけ対象にする（外部への #付きリンクは無視）
      if (location.pathname !== link.pathname || location.hostname !== link.hostname) {
        return;
      }

      e.preventDefault();

      const rect = target.getBoundingClientRect();
      const y = rect.top + window.pageYOffset - HEADER_OFFSET;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    });
  });
})();
