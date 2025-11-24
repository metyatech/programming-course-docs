---
sidebar_position: 18
---

import Exercise, { Solution } from '@kodai-yamamoto-siw/exercise/client';
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
  sourceId="ex1"
  htmlVisible={true}
  cssVisible={false}
  jsVisible={false}
  initialHTML={`<div class="card">
    <h2 class="card-title">自己紹介</h2>
    <p class="card-text">Webデザインの勉強中です。</p>
    <p class="card-text">レイアウトが少し苦手なので練習します。</p>
  </div>`}
  initialCSS={`body {
  }

  .card {
    width: 320px;
    margin: auto;
    padding: 20px;
  }

  .card-title {
    margin: 0;
    text-align: center;
  }

  .card-text {
    margin: 0;
  }
`}
/>

<Solution>

<CodePreview sourceId="ex1" />

</Solution>

</Exercise>

---

## 演習2（ボタンの横並びと間隔）

**ねらい / テーマ**: シンプルな横並びレイアウト（`display: inline-block` か `display: flex` の基本）。

<Exercise title="演習2（3つの操作ボタンの横並び）">

次のHTMLに対して、3つのボタンが **1行に横並び** になり、ボタン同士に一定の間隔がつくようにしてください。

<CodePreview
  sourceId="ex2"
  htmlVisible={true}
  cssVisible={false}
  jsVisible={false}
  initialHTML={`<div class="actions">
    <a href="#" class="btn">保存</a>
    <a href="#" class="btn">下書き保存</a>
    <a href="#" class="btn">キャンセル</a>
  </div>`}
  initialCSS={`body {
    margin: 20px;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  .btn {
    display: inline-block;
    padding: 10px 20px;
  }
`}
/>

<Solution>

<CodePreview sourceId="ex2" />

</Solution>

</Exercise>

---

## 演習3（カード一覧のグリッド風レイアウト）

**ねらい / テーマ**: 複数ボックスの並びと折り返し（`display: flex`, `gap`, `flex-wrap`）。

<Exercise title="演習3（サービス紹介カードの並べ方）">

次のHTMLに対して、カードが横に並び、画面幅が足りなくなったら **次の行に折り返すレイアウト** にしてください。

<CodePreview
  sourceId="ex3"
  htmlVisible={true}
  cssVisible={false}
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
    margin: 20px;
  }

  .services {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .service-card {
    flex: 0 0 200px;
    padding: 15px;
  }

  .service-card h3 {
    margin: 0;
  }

  .service-card p {
    margin: 0;
  }
`}
/>

<Solution>

<CodePreview sourceId="ex3" />

</Solution>

</Exercise>

---

## 演習4（ヘッダーの3分割レイアウト）

**ねらい / テーマ**: ヘッダーの典型レイアウト（左ロゴ・中央ナビ・右ボタン）を `flex` で組む。

<Exercise title="演習4（サイトヘッダーのレイアウト）">

次のHTMLに対して、左にサイト名、中央にナビゲーション、右にボタンが並ぶ **ヘッダーレイアウト** にしてください。

<CodePreview
  sourceId="ex4"
  htmlVisible={true}
  cssVisible={false}
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
  }

  .site-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
  }

  .site-logo {
  }

  .site-nav {
    display: flex;
    gap: 15px;
  }

  .site-nav a {
  }

  .site-login .login-btn {
    display: inline-block;
    padding: 10px 20px;
  }
`}
/>

<Solution>

<CodePreview sourceId="ex4" />

</Solution>

</Exercise>

---

## 演習5（メイン + サイドバーの2カラム）

**ねらい / テーマ**: メインコンテンツとサイドバーのレイアウト（`flex` で幅の比率を調整）。

<Exercise title="演習5（ブログ風レイアウト）">

次のHTMLに対して、左にメイン記事、右にサイドバーがある **ブログ風2カラムレイアウト** にしてください。

<CodePreview
  sourceId="ex5"
  htmlVisible={true}
  cssVisible={false}
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
  }

  .layout {
    max-width: 960px;
    margin: 20px auto;
    display: flex;
    gap: 20px;
  }

  .main {
    flex: 2;
    padding: 15px;
  }

  .sidebar {
    flex: 1;
    padding: 15px;
  }

  .sidebar h2 {
    margin: 0;
  }

  .sidebar ul {
    margin: 10px 0 0;
    padding-left: 15px;
  }

  .sidebar li {
    margin: 0;
  }
`}
/>

<Solution>

<CodePreview sourceId="ex5" />

</Solution>

</Exercise>

---

## 演習6（カード + ボタンのまとまりレイアウト）

**ねらい / テーマ**: 1つのカードの中で、上下と左右のバランスを取るレイアウト。

<Exercise title="演習6（申込みカードのレイアウト）">

次のHTMLに対して、タイトル・説明・ボタンが見やすくまとまった **申込みカード** にしてください。

<CodePreview
  sourceId="ex6"
  htmlVisible={true}
  cssVisible={false}
  jsVisible={false}
  initialHTML={`<div class="plan">
    <h2 class="plan-title">体験レッスン</h2>
    <p class="plan-text">オンラインで60分の体験授業が受けられます。</p>
    <p class="plan-price">無料</p>
    <a href="#" class="plan-btn">申し込む</a>
  </div>`}
  initialCSS={`body {
    margin: 20px;
  }

  .plan {
    width: 300px;
    padding: 20px;
  }

  .plan-title {
    margin: 0;
  }

  .plan-text {
    margin: 10px 0;
  }

  .plan-price {
    margin: 10px 0;
  }

  .plan-btn {
    display: inline-block;
    padding: 10px 20px;
  }
`}
/>

<Solution>

<CodePreview sourceId="ex6" />

</Solution>

</Exercise>

---

## 演習7（ページ全体のレイアウト）

**ねらい / テーマ**: ヘッダー・メイン・カード一覧を組み合わせた、ページ全体のレイアウト設計。

<Exercise title="演習7（シンプルなLPレイアウト）">

次のHTMLに対して、1ページの **シンプルな紹介ページ（LP）レイアウト** にしてください。

<CodePreview
  sourceId="ex7"
  htmlVisible={true}
  cssVisible={false}
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
  }

  .lp-header {
    padding: 30px 20px;
    text-align: center;
  }

  .lp-title {
    margin: 0;
  }

  .lp-lead {
    margin: 10px 0 0;
  }

  .lp-main {
    max-width: 960px;
    margin: 20px auto;
    padding: 0 15px;
  }

  .lp-section {
    margin-bottom: 20px;
    padding: 15px;
  }

  .lp-cards {
    display: flex;
    gap: 15px;
  }

  .lp-card {
    flex: 1;
    padding: 15px;
  }

  .lp-card h3 {
    margin: 0;
  }

  .lp-card p {
    margin: 0;
  }
`}
/>

<Solution>

<CodePreview sourceId="ex7" />

</Solution>

</Exercise>
