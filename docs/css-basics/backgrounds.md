---
sidebar_position: 4
---

import Exercise, { Solution } from '@kodai-yamamoto-siw/exercise/client';
import { CodePreview } from '@kodai-yamamoto-siw/code-preview';

# 背景プロパティ（background の基本）

## 今回の目標

次の6つを使って、背景の見た目を自由にコントロールできるようにします。

- background-color
- background-image
- background-repeat
- background-position
- background-attachment
- background-size

ポイント：むずかしい専門用語は使わず、「色」「画像」「くり返し」「置き場所」「スクロールの動き」「大きさ」をセットで理解します。

---

## 1. background-color（復習）

要素のうしろ側に色をぬります。

書き方：
```css
セレクタ {
  background-color: 色;
}
```

<CodePreview 
  initialHTML={`<div class="box">あか</div>
<div class="box">みどり</div>
<div class="box">あお</div>`}
  initialCSS={`.box {
  padding: 8px;
  margin: 6px 0;
}
.box:nth-child(1) { background-color: #ffdddd; }
.box:nth-child(2) { background-color: #ddffdd; }
.box:nth-child(3) { background-color: #dde7ff; }`}
/>

<Exercise title="演習1：箱に背景色をつける">

3つの段落に、それぞれちがう背景色をつけてください。

要件：
- 1つ目：うすいオレンジ
- 2つ目：うすいみずいろ
- 3つ目：うすいきみどり

<Solution>

<CodePreview 
  initialHTML={`<p class="bun1">1つ目の文</p>
<p class="bun2">2つ目の文</p>
<p class="bun3">3つ目の文</p>`}
  initialCSS={`.bun1 { background-color: #ffe8cc; padding: 8px; }
.bun2 { background-color: #e3f2fd; padding: 8px; }
.bun3 { background-color: #e8f5e9; padding: 8px; }`}
/>

</Solution>

</Exercise>

---

## 2. background-image（画像をしきつめる）

うしろに画像をしくことができます。画像ファイルをURLで指定します。

書き方：
```css
セレクタ {
  background-image: url("画像のパス");
}
```

<CodePreview 
  initialHTML={`<div class="hako">背景画像のサンプル</div>`}
  initialCSS={`.hako {
  height: 160px;
  padding: 12px;
  color: white;
  background-image: url('/programming-course-docs/files/picnic.jpg');
}`}
/>

注意：見やすくするために、あとで「大きさ」「くり返し」「置き場所」を合わせて使うことが多いです。

<Exercise title="演習2：見出しのうしろに画像を入れる">

要件：
- 高さ180pxの箱を作る（クラス名：`midashi`）
- 背景画像に `picnic.jpg` を使う（`/programming-course-docs/files/picnic.jpg`）
- 文字は白にする

<Solution>

<CodePreview 
  initialHTML={`<div class="midashi">イベントのお知らせ</div>`}
  initialCSS={`.midashi {
  height: 180px;
  padding: 12px;
  color: #fff;
  background-image: url('/programming-course-docs/files/picnic.jpg');
}`}
/>

</Solution>

</Exercise>

---

## 3. background-repeat（画像をくり返すか）

背景画像をタイルのようにくり返すかどうかを決めます。

- repeat（初期）…たてよこにくり返す
- no-repeat … くり返さない（1枚だけ）
- repeat-x … よこ方向だけくり返す
- repeat-y … たて方向だけくり返す

<CodePreview 
  initialHTML={`<div class="r1">repeat</div>
<div class="r2">no-repeat</div>
<div class="r3">repeat-x</div>
<div class="r4">repeat-y</div>`}
  initialCSS={`div { height: 120px; padding: 8px; margin: 6px 0; color: #fff; }
.r1 { background-image: url('/programming-course-docs/files/picnic.jpg'); background-repeat: repeat; background-size: 120px; }
.r2 { background-image: url('/programming-course-docs/files/picnic.jpg'); background-repeat: no-repeat; background-size: 120px; }
.r3 { background-image: url('/programming-course-docs/files/picnic.jpg'); background-repeat: repeat-x; background-size: 120px; }
.r4 { background-image: url('/programming-course-docs/files/picnic.jpg'); background-repeat: repeat-y; background-size: 120px; }`}
/>

<Exercise title="演習3：背景のタイル設定">

要件：
- 高さ150pxの箱（`tile`）を作る
- 背景画像：`picnic.jpg`
- よこ方向だけくり返す（repeat-x）
- 画像の大きさは 100px × 100px にする

<Solution>

<CodePreview 
  initialHTML={`<div class="tile"></div>`}
  initialCSS={`.tile {
  height: 150px;
  background-image: url('/programming-course-docs/files/picnic.jpg');
  background-repeat: repeat-x;
  background-size: 100px 100px;
}`}
/>

</Solution>

</Exercise>

---

## 4. background-position（画像の置き場所）

くり返さない画像（no-repeat）を、どこに置くか決めます。

主な指定：`left` / `center` / `right` と `top` / `center` / `bottom` の組み合わせ、または `px`・`%`。

<CodePreview 
  initialHTML={`<div class="p1">left top</div>
<div class="p2">center center</div>
<div class="p3">right bottom</div>`}
  initialCSS={`div { height: 140px; padding: 8px; margin: 6px 0; color: #fff; }
.p1 { background-image: url('/programming-course-docs/files/picnic.jpg'); background-repeat: no-repeat; background-size: 120px 120px; background-position: left top; }
.p2 { background-image: url('/programming-course-docs/files/picnic.jpg'); background-repeat: no-repeat; background-size: 120px 120px; background-position: center center; }
.p3 { background-image: url('/programming-course-docs/files/picnic.jpg'); background-repeat: no-repeat; background-size: 120px 120px; background-position: right bottom; }`}
/>

<Exercise title="演習4：右上にロゴを置く">

要件：
- 高さ160pxの箱（`logo`）
- 背景画像：`park_map.jpg`
- くり返さない（no-repeat）
- 右上に置く（`right top`）
- 画像の大きさは 120px × 120px

<Solution>

<CodePreview 
  initialHTML={`<div class="logo">右上ロゴ</div>`}
  initialCSS={`.logo {
  height: 160px;
  padding: 8px;
  background-image: url('/programming-course-docs/files/park_map.jpg');
  background-repeat: no-repeat;
  background-size: 120px 120px;
  background-position: right top;
}`}
/>

</Solution>

</Exercise>

---

## 5. background-attachment（スクロール時の動き）

背景画像を、スクロールに合わせて動かすか固定するかを決めます。

- scroll（初期）…いっしょに動く
- fixed … 画面に固定（いわゆる「固定背景」）

<CodePreview 
  initialHTML={`<div class="fix">固定背景のサンプル（スクロールしてみてください）<br>行1<br>行2<br>行3<br>行4<br>行5<br>行6<br>行7<br>行8<br>行9<br>行10<br>行11<br>行12</div>`}
  initialCSS={`.fix {
  height: 220px;
  overflow: auto;
  color: #fff;
  padding: 12px;
  background-image: url('/programming-course-docs/files/picnic.jpg');
  background-size: cover;
  background-attachment: fixed;
}`}
/>

<Exercise title="演習5：固定背景の見出し帯">

要件：
- 高さ200pxの帯（`obi`）を作る
- 背景画像：`picnic.jpg`
- 画像は画面に固定（fixed）
- 画像の大きさは全面に広げる（cover）
- 文字は白、中央寄せ

<Solution>

<CodePreview 
  initialHTML={`<div class="obi">学校イベント 2025</div>`}
  initialCSS={`.obi {
  height: 200px;
  color: #fff; font-weight: bold; text-align: center; line-height: 200px;
  background-image: url('/programming-course-docs/files/picnic.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}`}
/>

</Solution>

</Exercise>

---

## 6. background-size（画像の大きさ）

背景画像の大きさを決めます。

- `cover` … はみ出してもよいので、枠いっぱいに広げる（切り抜きが発生）
- `contain` … ぜんぶ入るようにおさめる（余白が出る）
- `幅 高さ` … 例：`120px 80px`、`50% 50%`

<CodePreview 
  initialHTML={`<div class="s1">cover</div>
<div class="s2">contain</div>
<div class="s3">120px 80px</div>`}
  initialCSS={`div { height: 130px; padding: 8px; margin: 6px 0; color: #fff; }
.s1 { background-image: url('/programming-course-docs/files/picnic.jpg'); background-size: cover; background-position: center; }
.s2 { background-image: url('/programming-course-docs/files/picnic.jpg'); background-size: contain; background-repeat: no-repeat; background-position: center; }
.s3 { background-image: url('/programming-course-docs/files/picnic.jpg'); background-size: 120px 80px; background-repeat: no-repeat; background-position: center; }`}
/>

<Exercise title="演習6：カードに背景をあてる">

要件：
- 3つのカード（`card`）を横にならべるイメージで3つ作る（ここでは縦に出ます）
- 1枚目：`cover`、2枚目：`contain`、3枚目：`200px 120px`
- 文字は白、中央寄せ

<Solution>

<CodePreview 
  initialHTML={`<div class="kaado ichi">cover</div>
<div class="kaado ni">contain</div>
<div class="kaado san">200x120</div>`}
  initialCSS={`.kaado { height: 160px; margin: 8px 0; color:#fff; text-align:center; line-height:160px; background-image:url('/programming-course-docs/files/picnic.jpg'); background-position:center; }
.ichi { background-size: cover; }
.ni { background-size: contain; background-repeat: no-repeat; }
.san { background-size: 200px 120px; background-repeat: no-repeat; }`}
/>

</Solution>

</Exercise>

---

## 演習 - 発展（ステップアップ）

次にいくほど少しずつむずかしくなります。すべて、このページの6つだけで解けます。

<Exercise title="発展1：ニュース見出しの帯">

要件：
- 高さ180pxの帯（`news`）
- 背景画像：`park_map.jpg`
- `background-size: cover`、`background-position: center`
- 右下に同じ画像をもう1枚…はまだやりません（この回では1枚だけ）
- 文字は白、左下寄せ（上下左右の配置はCSSで自由に）

<Solution>

<CodePreview 
  initialHTML={`<div class="news">学校だより 4月号</div>`}
  initialCSS={`.news {
  height: 180px; color:#fff; padding: 140px 12px 12px; /* 左下寄せになるよう下側に余白を小さく */
  background-image: url('/programming-course-docs/files/park_map.jpg');
  background-size: cover;
  background-position: center;
}`}
/>

</Solution>

</Exercise>

<Exercise title="発展2：固定背景のセクション（パラパラ効果）">

要件：
- 3つのセクション `sec1` `sec2` `sec3`
- `sec2` は固定背景（`fixed`）＋ `cover`、ほかは単色
- それぞれ高さは `200px`

<Solution>

<CodePreview 
  initialHTML={`<div class="sec1">上のセクション</div>
<div class="sec2">固定背景のセクション</div>
<div class="sec3">下のセクション</div>`}
  initialCSS={`.sec1 { height:200px; background-color:#f5f5f5; text-align:center; line-height:200px; }
.sec2 { height:200px; color:#fff; text-align:center; line-height:200px; background-image:url('/programming-course-docs/files/picnic.jpg'); background-size:cover; background-position:center; background-attachment:fixed; }
.sec3 { height:200px; background-color:#eef7ff; text-align:center; line-height:200px; }`}
/>

</Solution>

</Exercise>

<Exercise title="発展3：位置とくり返しの細かな調整">

要件：
- 高さ180pxの箱 `fine`
- 画像は `picnic.jpg`
- 画像の大きさは 120px × 120px
- 置き場所は 左から20px、上から40px（`background-position: 20px 40px;`）
- よこ方向だけくり返す（repeat-x）

<Solution>

<CodePreview 
  initialHTML={`<div class="fine"></div>`}
  initialCSS={`.fine {
  height: 180px;
  background-image: url('/programming-course-docs/files/picnic.jpg');
  background-size: 120px 120px;
  background-position: 20px 40px;
  background-repeat: repeat-x;
}`}
/>

</Solution>

</Exercise>

---

## まとめ（この回で大切なこと）

- 色・画像・くり返し・置き場所・動き・大きさの6点セットで考える
- 画像を使うときは、`background-repeat`・`background-position`・`background-size` をセットで調整することが多い
- 固定背景（`fixed`）は、強い効果なので使いすぎに注意

次回は、背景の「一括指定」や複数画像の重ね合わせに進みます。
