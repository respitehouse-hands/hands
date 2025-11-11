// js/common-footer.js
// export: mountFooter(mountSelector)

export function mountFooter(mountSelector) {
  const mount = document.querySelector(mountSelector);
  if (!mount) return;

  const html = `
<footer class="site-footer" aria-labelledby="footer-title">
  <h2 id="footer-title" class="visually-hidden">フッター</h2>
  <div class="footer__inner">
    <section class="footer__brand">
      <a href="index.html" class="footer__logo">
        <img src="img/logo.png" alt="レスパイトハウス ハンズ" height="48">
      </a>
      <address class="footer__addr">
        〒021-0031　岩手県一関市青葉二丁目 ６-16<br>
        TEL：<a href="tel:0191-31-5720">0191-31-5720</a><br>
        FAX：0191-31-5721<br>
        MAIL：<a href="mailto:hands.guitar@ocn.ne.jp">hands.guitar@ocn.ne.jp</a>
      </address>
      <p class="footer__note">受付時間：平日 9:00–18:00（年末年始を除く）</p>
      <p class="footer__map"><a href="https://maps.google.com" target="_blank" rel="noopener">Googleマップで見る</a></p>
    </section>

    <nav class="footer__nav" aria-label="フッターナビゲーション">
      <div class="footer__group">
        <h3>法人概要</h3>
        <ul>
          <li><a href="philosophy.html">ハンズの理念</a></li>
          <li><a href="history.html">ハンズのあゆみ</a></li>
          <li><a href="teikan.html">定款</a></li>
          <li><a href="officers.html">役員</a></li>
        </ul>
      </div>
      <div class="footer__group">
        <h3>事業所紹介</h3>
        <ul>
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
      </div>
      <div class="footer__group">
        <h3>外部リンク</h3>
        <ul>
          <li><a href="https://www.city.ichinoseki.iwate.jp/" target="_blank" rel="noopener">一関市HP</a></li>
          <li><a href="https://ichisapo.jp/" target="_blank" rel="noopener">いちのせき若者サポートステーション</a></li>
          <li><a href="https://www.center-i.org/" target="_blank" rel="noopener">いちのせき市民活動センター</a></li>
        </ul>
      </div>
      <div class="footer__group">
        <h3>情報公開</h3>
        <ul>
          <li><a href="privacy.html">プライバシーポリシー</a></li>
          <li><a href="accessibility.html">アクセシビリティ方針</a></li>
          <li><a href="sitemap.html">サイトマップ</a></li>
        </ul>
      </div>
    </nav>
  </div>

  <div class="footer__bar">
    <small>© 2025 Respite House Hands</small>
    <a href="#top" class="footer__top" aria-label="ページの先頭へ">▲ TOP</a>
  </div>
</footer>
`;
  mount.outerHTML = html;
}
