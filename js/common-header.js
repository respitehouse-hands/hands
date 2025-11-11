// js/common-header.js
// オフライン対応：fetch不要。HTMLを文字列で埋め込み → 指定位置に差し込む。
// export: mountHeader(mountSelector, { currentLeaf?: 'xxx.html' })

export function mountHeader(mountSelector, opts = {}) {
  const mount = document.querySelector(mountSelector);
  if (!mount) return;

  const currentLeaf =
    (opts.currentLeaf || location.pathname.split('/').pop() || 'index.html')
      .toLowerCase();

  const html = `
<header id="site-header" class="c-header c-hamburger-menu">
  <a href="index.html" class="c-header__logo"><img src="img/logo.png" alt="ロゴ"></a>
  <input type="checkbox" id="hamburger" class="c-hamburger-menu__input"/>
  <label for="hamburger" class="c-hamburger-menu__bg"></label>

  <ul class="c-header__list c-hamburger-menu__list">
    <li class="c-header__list-item"><a href="index.html" class="c-header__list-link">TOP</a></li>

    <li class="c-header__list-item has-sub" data-menu="company">
      <input type="checkbox" id="sub-company" class="sub-toggle">
      <a href="corp.html" class="c-header__list-link">法人概要</a>
      <label for="sub-company" class="sub-caret" aria-label="法人概要のメニューを開閉"></label>
      <ul class="submenu">
        <li><a href="philosophy.html">ハンズの理念</a></li>
        <li><a href="history.html">ハンズのあゆみ</a></li>
        <li><a href="teikan.html">定款</a></li>
        <li><a href="officers.html">役員</a></li>
      </ul>
    </li>

    <li class="c-header__list-item has-sub" data-menu="offices">
      <input type="checkbox" id="sub-offices" class="sub-toggle">
      <a href="office.html" class="c-header__list-link">事業所紹介</a>
      <label for="sub-offices" class="sub-caret" aria-label="事業所紹介のメニューを開閉"></label>
      <ul class="submenu">
        <li><a href="wahaha.html">わぁははクラブ</a></li>
        <li><a href="residence.html">居宅介護</a></li>
        <li><a href="soudan.html">相談支援</a></li>
        <li><a href="little.html">リトルハンズ</a></li>
        <li><a href="sakura.html">さくらなみき</a></li>
        <li><a href="myroot.html">マイルートリンク</a></li>
        <li><a href="ichisapo.html">若者サポートステーション</a></li>
        <li><a href="jobcafe.html">ジョブカフェ</a></li>
        <li><a href="citizen.html">市民活動センター</a></li>
      </ul>
    </li>

    <li class="c-header__list-item"><a href="staff.html" class="c-header__list-link">スタッフ紹介</a></li>
    <li class="c-header__list-item"><a href="contact.html" class="c-header__list-link">お問い合わせ</a></li>
  </ul>

  <label for="hamburger" class="c-hamburger-menu__button">
    <span class="c-hamburger-menu__button-mark"></span>
    <span class="c-hamburger-menu__button-mark"></span>
    <span class="c-hamburger-menu__button-mark"></span>
  </label>
</header>
`;

  // 差し込み
  mount.outerHTML = html;

  // ========== 現在地ハイライト ==========
  const headerEl = document.getElementById('site-header');
  const links = headerEl.querySelectorAll('.c-header__list a, .submenu a');

  // 1) 子リンクに aria-current 付与（完全一致）
  let leafMatched = null;
  links.forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href && href === currentLeaf) {
      a.setAttribute('aria-current', 'page');
      leafMatched = a;
    }
  });

  // 2) 子が一致した時だけ親の .is-current を付ける
  if (leafMatched) {
    const parent = leafMatched.closest('.has-sub');
    if (parent) parent.classList.add('is-current');
  }

  // 3) office.html / corp.html 自体に居るときだけ、親リンクに aria-current
  const parentRules = [
    { id: 'offices', page: 'office.html' },
    { id: 'company', page: 'corp.html'  },
  ];
  parentRules.forEach(({ id, page }) => {
    if (currentLeaf === page) {
      headerEl
        .querySelector(`.has-sub[data-menu="${id}"] > .c-header__list-link`)
        ?.setAttribute('aria-current', 'page');
      headerEl
        .querySelector(`.has-sub[data-menu="${id}"]`)
        ?.classList.add('is-current');
    }
  });

  // ========== 「＋／－」での開閉（遷移を止める） ==========
  headerEl.addEventListener('click', (e) => {
    // 矢印（.sub-caret）クリック → トグル
    const caret = e.target.closest('.sub-caret');
    if (caret) {
      e.preventDefault();
      e.stopPropagation();
      const li = caret.closest('.has-sub');
      const cb = li?.querySelector('.sub-toggle');
      if (cb) cb.checked = !cb.checked;
      return;
    }

    // 親ラベル（.c-header__list-link）を短押ししたときは「開閉」だけにする（PC幅でもモバイルでも）
    const parentLink = e.target.closest('.has-sub > .c-header__list-link');
    if (parentLink) {
      // ドロップダウンを開く（遷移させない）
      e.preventDefault();
      const li = parentLink.closest('.has-sub');
      const cb = li?.querySelector('.sub-toggle');
      if (cb) cb.checked = !cb.checked;
      return;
    }
  }, { capture: true });

  // ========== 最低限の競合保険CSSを注入（必要分だけ） ==========
  const style = document.createElement('style');
  style.textContent = `
    #site-header .has-sub { position: relative; }
    #site-header .has-sub > .sub-caret{
      position:absolute; inset:0 0 0 auto; width:48px;
      display:grid; place-items:center; cursor:pointer; background:transparent;
      -webkit-tap-highlight-color:transparent;
    }
    #site-header .has-sub > .c-header__list-link{ padding-right:48px; }
    #site-header .has-sub > .submenu{ display:none; }
    #site-header .has-sub > .sub-toggle:checked ~ .submenu{ display:block; }

    /* 「常に事業所紹介が色付き」問題の抑止：
       まず親に色を付けない（.is-current のときだけ任せる） */
    #site-header .has-sub > .c-header__list-link[aria-current="page"] {
      /* 必要ならここで色を薄くする。共通CSSが強いなら !important で上書き */
    }
  `;
  document.head.appendChild(style);
}
