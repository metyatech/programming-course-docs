## GitHub Copilot 指示書（AIエージェント向け）

プロジェクト種別: Docusaurus v3 で構築した日本語の授業用ドキュメントサイト。対象はHTML/CSS初学者。

開発ワークフロー（Node >= 20）
- ローカル開発: `npm run start`
- 本番ビルド: `npm run build`
- プレビュー提供: `npm run serve`

主要ディレクトリと設定
- `docs/` 教材（html-basics, css-basics）; MDXでカスタムコンポーネント利用可
- `static/img` 画像（CodePreview等で利用）
- `sidebars.ts` サイドバー制御（frontmatter: `sidebar_position` を使用）
- `docusaurus.config.ts` で `@kodai-yamamoto-siw/exercise` を有効化、言語は ja

コンテンツ作成の原則（このリポジトリ固有）
- 文章・コメントはすべて日本語。学習済みの概念のみを前提に段階的に導入
- 識別子（クラス名・変数名など）は基本やさしい命名（例: box, btn1, moji1）。発展・総合演習では短い英単語可（例: card, price）

カスタムコンポーネントの使い方
- CodePreview（`@kodai-yamamoto-siw/code-preview`）
  - `initialHTML` は body 内のみを書く。`initialCSS` は別記
  - 複数行の場合は2行目以降2スペースインデント。CSS の `{}` の前後は必ず改行
  - 例:
    ```jsx
    <CodePreview
      initialHTML={`<div class="box">あか</div>
        <div class="box">みどり</div>
        <div class="box">あお</div>`}
      initialCSS={`.box {
        padding: 8px;
        margin: 6px 0;
      }
      .box:nth-child(1) {
        background-color: #ffdddd;
      }`}
    />
    ```
  - 表示制御: `htmlVisible`, `cssVisible`, `jsVisible`, `previewVisible` で表示切替可能
- Exercise（`@kodai-yamamoto-siw/exercise`）
  - 問題・解答・例示などで `sourceId` を使うと、以降の同じIDのCodePreview間で initialHTML/initialCSS等が共有される

画像・アセットの扱い
- 画像は `static/img` に配置。MDXからは `/programming-course-docs/img/...` で参照
- CodePreview でローカル相対参照を使う場合は `images` マップで仮想パス → 実パスを渡す

新しい教材ページの追加
1. `docs/<category>/xxx.md` を作成し `sidebar_position` を設定
2. ページ先頭で必要なコンポーネントを import

演習作成ルール（最重要）
- その回の主要概念に絞る。余計な装飾は避ける
- 問題の完成イメージはプレビューのみ。サイズなどの要件はコメントに明記
- 解答は Solution 内に置き、説明は初学者向けに短く具体的に
