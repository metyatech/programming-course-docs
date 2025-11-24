---
sidebar_position: 18
---

import Exercise from '@kodai-yamamoto-siw/exercise/client';
import { CodePreview } from '@kodai-yamamoto-siw/code-preview';

# レイアウト総合演習（CSS）

CSS基礎で学んだ **配置・レイアウト** をまとめて練習します。
すべて **「プレビューと同じ見た目になるようにCSSを書く」** 形式です。

HTMLは完成している前提で、**CSSだけで調整**してください。

---

## 演習1（ボックスを縦にそろえる）

**ねらい / テーマ**: 余白と幅の基本レイアウト（`margin`, `padding`, `width`, `text-align`）。

<Exercise title="演習1（プロフィールカードの基本レイアウト）">

次のHTMLに対して、下のプレビューのような **シンプルな縦レイアウトのプロフィールカード** にしてください。

- 全体の幅・余白をそろえて、中央寄せにする
- タイトルと本文の間隔を整える

ヒント: `width`, `margin`, `padding`, `text-align`, `background-color`, `border-radius` などを使います。

<CodePreview
  htmlVisible={true}
  jsVisible={false}
  initialHTML={`<div class="card">
  <h2 class="card-title">自己紹介</h2>
  <p class="card-text">Webデザインの勉強中です。</p>
  <p class="card-text">レイアウトが少し苦手なので練習します。</p>
</div>`}
  initialCSS={`body {
  background-color: #f3f4f6;
  font-family: sans-serif;
}

.card {
  width: 320px;
  margin: 40px auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
}

.card-title {
  margin: 0 0 12px;
  font-size: 20px;
  text-align: center;
}

.card-text {
  margin: 6px 0;
  line-height: 1.6;
}
`}
/>

</Exercise>

---

## 演習2（2カラムの情報レイアウト）

**ねらい / テーマ**: 横並びと幅の比率（`display`, `width`, `box-sizing` などの基本2カラム）。

<Exercise title="演習2（お知らせ + 詳細の2カラム）">

次のHTMLに対して、左にタイトル・右に詳細テキストが並ぶ **2カラムレイアウト** にしてください。

- 左カラムは細め、右カラムは広めにする
- 行間と上下の余白を整える

ヒント: 親ボックスを横並びにしてから、子要素に幅を指定します。

<CodePreview
  htmlVisible={true}
  jsVisible={false}
  initialHTML={`<div class="info">
  <div class="info-label">お知らせ</div>
  <div class="info-main">
    <p>来週の授業はオンラインで実施します。</p>
    <p>教材のダウンロードは前日までに済ませてください。</p>
  </div>
</div>`}
  initialCSS={`body {
  margin: 40px;
  font-family: sans-serif;
}

.info {
  max-width: 640px;
  margin: 0 auto;
  padding: 16px 20px;
  background-color: #fef3c7;
  border-radius: 8px;
}

.info-label {
  float: left;
  width: 100px;
  font-weight: bold;
}

.info-main {
  margin-left: 120px;
}

.info-main p {
  margin: 4px 0;
  line-height: 1.6;
}
`}
/>

</Exercise>

---

## 演習3（ボタンの横並びと間隔）

**ねらい / テーマ**: シンプルな横並びレイアウト（`display: inline-block` か `display: flex` の基本）。

<Exercise title="演習3（3つの操作ボタンの横並び）">

次のHTMLに対して、3つのボタンが **1行に横並び** になり、ボタン同士に一定の間隔がつくようにしてください。

<CodePreview
  htmlVisible={true}
  jsVisible={false}
  initialHTML={`<div class="actions">
  <a href="#" class="btn">保存</a>
  <a href="#" class="btn">下書き保存</a>
  <a href="#" class="btn">キャンセル</a>
</div>`}
  initialCSS={`body {
  margin: 40px;
  font-family: sans-serif;
}

.actions {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 999px;
  background-color: #2563eb;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
}
`}
/>

</Exercise>

---

## 演習4（カード一覧のグリッド風レイアウト）

**ねらい / テーマ**: 複数ボックスの並びと折り返し（`display: flex`, `gap`, `flex-wrap`）。

<Exercise title="演習4（サービス紹介カードの並べ方）">

次のHTMLに対して、カードが横に並び、画面幅が足りなくなったら **次の行に折り返すレイアウト** にしてください。

<CodePreview
  htmlVisible={true}
  jsVisible={false}
  initialHTML={`<div class="services">
  <div class="service-card">
    <h3>Webデザイン</h3>
    <p>レイアウトと配色の基礎を学べます。</p>
  </div>
  <div class="service-card">
    <h3>フロントエンド</h3>
    <p>HTML / CSS / JavaScript を使います。</p>
  </div>
  <div class="service-card">
    <h3>ポートフォリオ</h3>
    <p>自分の作品ページを作成します。</p>
  </div>
  <div class="service-card">
    <h3>就職サポート</h3>
    <p>作品の見せ方を一緒に考えます。</p>
  </div>
</div>`}
  initialCSS={`body {
  margin: 32px;
  font-family: sans-serif;
  background-color: #f9fafb;
}

.services {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.service-card {
  flex: 0 0 220px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.service-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.service-card p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
}
`}
/>

</Exercise>

---

## 演習5（ヘッダーの3分割レイアウト）

**ねらい / テーマ**: ヘッダーの典型レイアウト（左ロゴ・中央ナビ・右ボタン）を `flex` で組む。

<Exercise title="演習5（サイトヘッダーのレイアウト）">

次のHTMLに対して、左にサイト名、中央にナビゲーション、右にボタンが並ぶ **ヘッダーレイアウト** にしてください。

<CodePreview
  htmlVisible={true}
  jsVisible={false}
  initialHTML={`<header class="site-header">
  <div class="site-logo">MySite</div>
  <nav class="site-nav">
    <a href="#">ホーム</a>
    <a href="#">コース</a>
    <a href="#">お問い合わせ</a>
  </nav>
  <div class="site-login">
    <a href="#" class="login-btn">ログイン</a>
  </div>
</header>`}
  initialCSS={`body {
  margin: 0;
  font-family: sans-serif;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: #0f172a;
  color: #e5e7eb;
}

.site-logo {
  font-weight: bold;
}

.site-nav {
  display: flex;
  gap: 20px;
}

.site-nav a {
  color: #e5e7eb;
  text-decoration: none;
  font-size: 14px;
}

.site-login .login-btn {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  background-color: #2563eb;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
}
`}
/>

</Exercise>

---

## 演習6（メイン + サイドバーの2カラム）

**ねらい / テーマ**: メインコンテンツとサイドバーのレイアウト（`flex` で幅の比率を調整）。

<Exercise title="演習6（ブログ風レイアウト）">

次のHTMLに対して、左にメイン記事、右にサイドバーがある **ブログ風2カラムレイアウト** にしてください。

<CodePreview
  htmlVisible={true}
  jsVisible={false}
  initialHTML={`<div class="layout">
  <main class="main">
    <h1>レイアウト練習ブログ</h1>
    <p>このページではCSSレイアウトの練習をしています。</p>
    <p>文章量が増えても、読みやすい幅に保つことが大切です。</p>
  </main>
  <aside class="sidebar">
    <h2>メニュー</h2>
    <ul>
      <li>プロフィール</li>
      <li>記事一覧</li>
      <li>お問い合わせ</li>
    </ul>
  </aside>
</div>`}
  initialCSS={`body {
  margin: 0;
  font-family: sans-serif;
  background-color: #f3f4f6;
}

.layout {
  max-width: 960px;
  margin: 32px auto;
  display: flex;
  gap: 24px;
}

.main {
  flex: 2;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
}

.sidebar {
  flex: 1;
  padding: 16px;
  background-color: #111827;
  color: #e5e7eb;
  border-radius: 8px;
}

.sidebar h2 {
  margin-top: 0;
}

.sidebar ul {
  margin: 8px 0 0;
  padding-left: 18px;
}

.sidebar li {
  margin: 4px 0;
}
`}
/>

</Exercise>

---

## 演習7（カード + ボタンのまとまりレイアウト）

**ねらい / テーマ**: 1つのカードの中で、上下と左右のバランスを取るレイアウト。

<Exercise title="演習7（申込みカードのレイアウト）">

次のHTMLに対して、タイトル・説明・ボタンが見やすくまとまった **申込みカード** にしてください。

<CodePreview
  htmlVisible={true}
  jsVisible={false}
  initialHTML={`<div class="plan">
  <h2 class="plan-title">体験レッスン</h2>
  <p class="plan-text">オンラインで60分の体験授業が受けられます。</p>
  <p class="plan-price">無料</p>
  <a href="#" class="plan-btn">申し込む</a>
</div>`}
  initialCSS={`body {
  margin: 40px;
  font-family: sans-serif;
  background-color: #0b1120;
}

.plan {
  width: 320px;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1d4ed8, #6366f1);
  color: #e5e7eb;
}

.plan-title {
  margin: 0 0 8px;
  font-size: 20px;
}

.plan-text {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.6;
}

.plan-price {
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: bold;
}

.plan-btn {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 999px;
  background-color: #facc15;
  color: #111827;
  text-decoration: none;
  font-weight: bold;
}
`}
/>

</Exercise>

---

## 演習8（ページ全体のレイアウト）

**ねらい / テーマ**: ヘッダー・メイン・カード一覧を組み合わせた、ページ全体のレイアウト設計。

<Exercise title="演習8（シンプルなLPレイアウト）">

次のHTMLに対して、1ページの **シンプルな紹介ページ（LP）レイアウト** にしてください。

<CodePreview
  htmlVisible={true}
  jsVisible={false}
  initialHTML={`<header class="lp-header">
  <h1 class="lp-title">レイアウト練習コース</h1>
  <p class="lp-lead">配置のコツを、小さなステップで身につけます。</p>
</header>

<main class="lp-main">
  <section class="lp-section">
    <h2>この講座で学べること</h2>
    <p>ボックス配置、余白、2カラム、カードレイアウトなど。</p>
  </section>

  <section class="lp-cards">
    <article class="lp-card">
      <h3>基礎レイアウト</h3>
      <p>まずは1カラムから始めます。</p>
    </article>
    <article class="lp-card">
      <h3>2カラム</h3>
      <p>メイン + サイドバーの形に慣れます。</p>
    </article>
    <article class="lp-card">
      <h3>カード一覧</h3>
      <p>サービス紹介や作品一覧でよく使います。</p>
    </article>
  </section>
</main>`}
  initialCSS={`body {
  margin: 0;
  font-family: sans-serif;
  background-color: #020617;
  color: #e5e7eb;
}

.lp-header {
  padding: 40px 24px 32px;
  text-align: center;
  background: radial-gradient(circle at top, #38bdf8, #0f172a);
}

.lp-title {
  margin: 0 0 8px;
  font-size: 26px;
}

.lp-lead {
  margin: 0;
  font-size: 14px;
}

.lp-main {
  max-width: 960px;
  margin: 24px auto 40px;
  padding: 0 16px;
}

.lp-section {
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 12px;
  background-color: #020617;
  border: 1px solid #1e293b;
}

.lp-cards {
  display: flex;
  gap: 16px;
}

.lp-card {
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  background-color: #0b1120;
  border: 1px solid #1f2937;
}

.lp-card h3 {
  margin: 0 0 6px;
}

.lp-card p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
}
`}
/>

</Exercise>
