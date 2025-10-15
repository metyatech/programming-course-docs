# GitHub Copilot 指示書

## プロジェクト概要

これは**Docusaurusベースの教育用ドキュメントサイト**で、完全初学者の高校生卒業程度の学生を対象とした「プログラミング演習Ⅰ」の授業資料です。HTML/CSSの基礎を初心者向けのアプローチで教えています。

## アーキテクチャと主要コンポーネント

### ドキュメント構造
- `docs/` - 科目別に整理された授業資料（html-basics、css-basics）
- `sidebars.ts` - `sidebar_position`で順序付けされたナビゲーション構造
- 各授業は以下の流れ：概念説明 → コード例 → 演習

### カスタムコンポーネント
- **CodePreview** (`src/components/CodePreview/`) - ライブHTML/CSSエディタとプレビュー
  - `initialHTML`はHTMLのbody内容のみ（DOCTYPE/html/headタグは不要）
  - `initialCSS`で別途CSSスタイリングを指定
  - 例：`<CodePreview initialHTML="<p>こんにちは</p>" initialCSS="p { color: red; }" />`
- **Exercise**（`@kodai-yamamoto-siw/exercise` パッケージ）- 折りたたみ可能な解答付きの演習問題
  - 解答は`<Solution>`コンポーネントで展開可能にする

### コンテンツ規約
- **対象者**：学力が高くない高校生初学者
- **言語**：すべてのコンテンツは日本語で記述する
- **命名規則**：クラス名には平易なローマ字/日本語を使用（英語のCSS/HTML用語は避ける）
  - ✅ 良い例：`box`、`hidari`、`migi`、`button1`
  - ❌ 避ける例：`container`、`wrapper`、`nav-item`（CSSプロパティと混同しやすい）

## 重要な指示

### 日本語での記述
- **すべてのコンテンツ、コメント、説明は日本語で記述してください**
- **変数名やクラス名は初学者にとって理解しやすい平易な名前を使用してください**
- **技術用語は避け、分かりやすい表現を心がけてください**

## 開発ワークフロー

### ローカル開発
```bash
npm start          # 開発サーバー（自動リロード）
npm run build      # 本番ビルド
npm run serve      # ビルド済みサイトをローカル提供
```

### 新しい授業の追加手順
1. 適切な`docs/`サブディレクトリに`.md`ファイルを作成
2. フロントマターに`sidebar_position: N`を追加
3. `sidebars.ts`を更新して新しいページを含める
4. 一貫した授業構造を使用：導入 → 例 → 演習 → まとめ

### コード例のパターン
CodePreviewでは常にHTMLとCSSを分離する：
```jsx
<CodePreview 
  initialHTML={`<button class="btn1">ボタン</button>`}
  initialCSS={`.btn1 { background-color: blue; }`}
/>
```

注意：`initialHTML` や `initialCSS` の内容が複数行にまたがる場合は、2行目以降は必ずインデントを入れてください。目安としては「1段分のインデント（半角スペース2つ）」を使います。これにより、コードの見た目が揃い、読みやすくなります。

例（推奨フォーマット）：
```jsx
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
```

追加ルール：CSS の波括弧（{}）の前後は、必ず改行を入れてください。可読性を高め、初学者が構造を理解しやすくするためです。

例：
```css
.box {
  padding: 8px;
  margin: 6px 0;
}

.other {
  color: red;
}
```

このルールは、`initialCSS` の中に書く場合でも同様に適用してください（波括弧の前後で必ず改行する）。

## ファイル構成

### 重要なファイル
- `docusaurus.config.ts` - サイト設定、GitHub Pagesデプロイメント
- `sidebars.ts` - コースナビゲーション構造
- `.cursor/rules/global.mdc` - 初学者向け命名のためのAIエージェント指示

### コンテンツガイドライン
- **授業の流れ**：既に教えた概念のみを基に構築する
- **実用的な例**：身近なシナリオを使用（ボタン、カード、メニュー）
- **演習パターン**：HTMLテンプレート提供 → CSS要件指定 → 解答表示
- **段階的複雑化**：シンプルに始め、一度に一つの概念を追加
- **こまめな演習**：新しい概念を説明した直後、理解が進むタイミングで演習を挿入する

## 統合ポイント

### Docusaurus機能
- カスタムコンポーネントはページレベルでインポート
- `static/`ディレクトリの静的アセット
- インタラクティブコンテンツ用のJSXコンポーネント付きMarkdown
- 日本語ロケール設定（`i18n.defaultLocale: 'ja'`）

### GitHub Pagesデプロイメント
- `npm run deploy`で`gh-pages`ブランチにデプロイ
- ベースURL：`/programming-course-docs/`
- 組織：`Kodai-Yamamoto-SIW`

## 共通パターン

### 演習構造
```jsx
import Exercise, { Solution } from '@kodai-yamamoto-siw/exercise/client';

<Exercise>
### 課題: [タイトル]
[問題の説明と要件]

<Solution>
[完全な解答と説明]
</Solution>
</Exercise>
```

### 授業テンプレート
1. コンポーネントのimport文
2. 実用的な文脈での概念導入
3. CodePreviewを使用したインタラクティブな例
4. **概念説明直後の小演習**（理解定着のため）
5. より複雑なSolutionを含む実践演習
6. 重要なポイントのまとめ

### 演習挿入のタイミング
- **新しいプロパティ説明後** - 単独で試せる小さな演習
- **複数概念の組み合わせ後** - 統合的な理解を確認する演習
- **セクション終了前** - 学習内容の総合的な応用演習
- **つまずきやすいポイント** - 特に混乱しやすい概念は複数回演習

確立された初学者向けアプローチに従い、専門用語を避け、視覚的な例を使用し、各授業が前の知識の上に段階的に構築されるようにしてください。

### 演習作成ルール（必須）

演習は受講者がその回で学ぶ「主要な概念」だけに集中できるよう作成してください。余計なスタイル指定（色・余白・フォント・レイアウトの過剰な調整など）は原則として含めません。以下のルールを常に守ってください：

- 演習の目的は「その回に教えたプロパティや概念の理解を確認すること」です。別の概念を無理に混ぜない。
- 問題（完成イメージ）として配置する `CodePreview` は、エディタを非表示にして「プレビューだけ見せる」設定にしてください。具体的には下記のプロパティを使用します：
  - `htmlVisible={false}`
  - `cssVisible={false}`
  - `jsVisible={false}`
  - `previewVisible={true}`
 例（問題側）:
```jsx
<CodePreview
  sourceId="sample-exercise-1"
  initialHTML={`<div class="box">サンプル</div>`}
  initialCSS={`.box { border: 1px solid #333; }`}
  htmlVisible={false}
  cssVisible={false}
  jsVisible={false}
  previewVisible={true}
/>
```

- 解答（`<Solution>` 内）では、同じ `sourceId` を持つ `CodePreview` を「1行表記」で置いてください。解答側ではエディタ表示の制御は不要です（デフォルトの挙動に任せる）。
  例（解答側）:
```jsx
<CodePreview sourceId="sample-exercise-1"/>
```

- `sourceId` を使って問題と解答のコードを共有してください。問題では `initialHTML` / `initialCSS` を指定してプレビューを作り、解答では `sourceId` のみを指定してコードを表示させることで、受講者が先に結果を見てから解答を確認できるようにします。

これらのルールは全ての教材ページに適用してください。
