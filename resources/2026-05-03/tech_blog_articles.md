# Japanese Tech Blog Articles - 2026-05-03

## Featured Articles

### 1. [6週間、AI のほうが先に壊れとった ― 4/23 postmortem の正体](https://zenn.dev/yokoi_ai/articles/cc-2026-04-30)
- **著者**: 横井のAI日和（yokoi_ai）
- **プラットフォーム**: Zenn
- **公開日**: 2026-04-30
- **いいね数**: 非公開（トレンド入り）
- **概要**: 2026年3月初旬から4月下旬にかけて、Claude Codeに3つの独立したバグが重なり約6週間にわたって品質が静かに低下していた問題のポストモーテムを解説。Anthropicは4/23に公式ポストモーテムを公開し、利用上限のリセットによる補償を行った。
- **開発者向けポイント**: (1) 推論エフォートが「high→medium」に密かに変更されていた（33日間）、(2) thinking履歴の剪定処理がコンテキストを毎ターン削っていた（15日間）、(3) システムプロンプトがツール応答を25語に制限していた（4日間）。定量メトリクスでは品質低下が捉えられず、ユーザの体感が先に異常を察知した。v2.1.116（4/20）で修正完了。
- **実装例**: ユーザ側の対策として個人の利用ログ・バージョン記録を残し、`/ultrareview`等の「AIがAIをレビュー」する仕組みを併用することが推奨されている。

### 2. [AWSインフラエンジニアのための Claude Code 完全活用ガイド 2026 — Context 肥大化を制する者がAI開発を制す](https://qiita.com/hidetarou2013@github/items/0bdcbca4efa29d9dd28e)
- **著者**: Hidetoshi Maekawa（@hidetarou2013@github）
- **プラットフォーム**: Qiita
- **公開日**: 2026-04-20
- **いいね数**: 0（新着・実装重視の良記事）
- **概要**: AWSインフラエンジニアがCDK開発でClaude Codeを活用する際、最大の制約となる「コンテキストウィンドウ肥大化」を制御するための実践ガイド。長期運用で品質を維持する具体策に踏み込んでいる。
- **開発者向けポイント**: (1) ツール呼び出しが20〜30回を超えたら`/compact`実行、(2) 探索・レビュー系タスクはサブエージェントへ委譲し主コンテキストを汚染しない、(3) `CLAUDE.md`は200行未満を維持し`@import`でモジュール化、(4) MCPは全文ロードではなくサブエージェント＋MCPサーバで必要部分のみ取得する戦略が有効。
- **実装例**:
  ```json
  // .mcp.json
  {
    "mcpServers": {
      "aws-docs": {
        "type": "stdio",
        "command": "uvx",
        "args": ["awslabs.aws-documentation-mcp-server@latest"]
      }
    }
  }
  ```
  破壊的AWSコマンドをブロックするhookスクリプト例も掲載。

### 3. [Claude Codeがプロジェクトを記憶する方法 — CLAUDE.mdと自動メモリの使い分け](https://note.com/masaru_furuya/n/n64eb3b355254)
- **著者**: 古家大（EM | AI開発オペレーションマネージャー）
- **プラットフォーム**: note
- **公開日**: 2026-05-02
- **いいね数**: 2
- **概要**: Claude Codeの2つのメモリ機構である「CLAUDE.md（人間が書く永続指示）」と「自動メモリ（Claudeが自分で学習・蓄積するメモ）」の使い分けを体系的に整理。大規模プロジェクトでの運用知見をまとめている。
- **開発者向けポイント**: (1) どちらも「強制設定」ではなく「コンテキスト」として扱われるため、具体的・簡潔・構造化された指示ほど遵守率が高い、(2) 動作をガイドしたいなら`CLAUDE.md`、修正の積み重ねから自動学習させたいなら自動メモリ、(3) 大規模プロジェクトでは`.claude/rules/`でトピック分割し`paths` frontmatterで適用範囲を絞る、(4) 配置は「より具体的な場所」が優先（`./CLAUDE.local.md` > プロジェクト > ユーザ）。
- **実装例**: `.claude/rules/`配下のpaths frontmatterによるファイル種別ごとのルールスコーピング例を提示。

### 4. [[Claude Design] 6分でデザインがコードになった——Claude Design × Claude Code で起きていること](https://note.com/gashi/n/n2e4dcfb5650c)
- **著者**: ヒデ（AI-led PdM）
- **プラットフォーム**: note
- **公開日**: 2026-04-23
- **いいね数**: 26
- **概要**: 4/17にリリースされたClaude Designと既存のClaude Codeを連携させた「ハンドオフ」機能の本質を、Datadog・Brilliant等の事例を交えて解説。「デザインから実装への翻訳工程が構造的に消えた」という観点が独自。
- **開発者向けポイント**: (1) Datadogでは「1週間かかっていたデザインレビューサイクルが1会話に圧縮」、(2) Brilliantでは「競合ツールで20プロンプト必要だったものが2プロンプトで完成」、(3) ハンドオフは「ファイル受け渡し」ではなく設計意図を含むコンテキスト束の引き渡しである点を強調。Figma的なハンドオフと根本的に異なる。
- **実装例**: 具体的なコード例ではなく、PdMやエンジニアがデザイン→実装フローをどう再設計すべきかのアーキテクチャ的示唆。

### 5. [無料で Claude Code？！ Qwen3.6 と LM Studio でローカルLLMコーディング](https://zenn.dev/yokoe24/articles/147ceccdd72319)
- **著者**: 横江（@yokoe24）
- **プラットフォーム**: Zenn
- **公開日**: 2026-04-27
- **いいね数**: 非公開（トレンド入り）
- **概要**: Qwen3.6-35B-A3BとLM StudioでローカルLLM環境を構築し、Claude Codeのフロントエンド経由で無料コーディングを実現する手順を紹介。Discordサイコロボット（Go）の実装で動作検証している。
- **開発者向けポイント**: (1) LM StudioはOpenAI互換APIを`http://localhost:1234`で提供、(2) `.claude/settings.json`にプロジェクト単位でLLM設定を書ける、(3) ダイレクトコーディングでは3回中1回しか成功しない一方、Plan Modeを使うと実用レベルに達する、(4) 35Bモデルは約34GB RAMを消費。Anthropic Pro剥奪騒動への保険として有効。
- **実装例**:
  ```json
  // .claude/settings.json
  {
    "ANTHROPIC_BASE_URL": "http://localhost:1234",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "qwen3.6-35b-a3b-ud-mlx"
  }
  ```

### 6. [AIコーディングツール徹底比較2026 — Claude Code・Codex・GitHub Copilot、現場で使って分かった選び方](https://qiita.com/NakajimaSH/items/624e35eb77bca83c1f0f)
- **著者**: @NakajimaSH
- **プラットフォーム**: Qiita
- **公開日**: 2026-04-09
- **いいね数**: 2
- **概要**: Claude Code・Codex・GitHub Copilotを7軸で比較し、「単一ツール選択」ではなく「補完的併用」を推奨する実務ガイド。各ツールが動作する層（ターミナル/クラウド/IDE）が根本的に異なるという視点が秀逸。
- **開発者向けポイント**: (1) Claude Code＝ターミナルでの「タスク委任」（大規模リファクタ・横断デバッグ向き）、(2) Codex＝クラウドでの「並列タスク実行」（複数同時作業・PR自動化向き）、(3) GitHub Copilot＝IDE内の「協調コーディング」（リアルタイム補完・日常作業向き）。推奨組み合わせはCopilot Pro（$10/月）+ Claude Code Pro（$20/月）。
- **実装例**: コード例はなく、ワークフロー設計の指針が中心。

## Trending Topics
- **Claude Code品質ポストモーテム**: 6週間にわたる静かな品質低下とAnthropicの透明性、補償対応が大きな関心事
- **コンテキスト管理が最重要課題**: `/compact`、サブエージェント分離、`CLAUDE.md`分割、MCPの戦略的利用など、長時間セッションでの品質維持テクニックが多くの記事で議論
- **Claude Design × Claude Code連携**: 4/17リリースのClaude Designと既存ツールのハンドオフが「デザイン→実装の翻訳工程」を構造的に消すという議論
- **Anthropic料金体系の不安定さへの対策**: Pro剥奪騒動を受けて、ローカルLLM（Qwen3.6 + LM Studio）への移行ガイドや、複数ツール併用によるリスク分散が広がる
- **マルチエージェント前提の設計**: サブエージェント・Agent Teams・`/ultrareview`等、エージェントオーケストレーションが標準化

## Recommended Reading Order
1. **入門・俯瞰**: [AIコーディングツール徹底比較2026](https://qiita.com/NakajimaSH/items/624e35eb77bca83c1f0f) — 各ツールの位置づけと現場での使い分けを把握
2. **実践実装**: [Claude Codeがプロジェクトを記憶する方法](https://note.com/masaru_furuya/n/n64eb3b355254) — `CLAUDE.md`と自動メモリの設計原則を理解し、すぐに自プロジェクトに反映
3. **応用・現場運用**: [AWSインフラエンジニアのための Claude Code 完全活用ガイド 2026](https://qiita.com/hidetarou2013@github/items/0bdcbca4efa29d9dd28e) — コンテキスト肥大化対策・MCP活用・hookによるガードレール設計まで踏み込んだ高度な運用設計
4. **業界動向理解**: [6週間、AI のほうが先に壊れとった ― 4/23 postmortem の正体](https://zenn.dev/yokoi_ai/articles/cc-2026-04-30) — Claude Code品質低下事件から学ぶ「ユーザ側のQA体制」の必要性
5. **ヘッジ戦略**: [無料で Claude Code？！ Qwen3.6 と LM Studio でローカルLLMコーディング](https://zenn.dev/yokoe24/articles/147ceccdd72319) — 料金変動リスクへの保険としてローカルLLM環境を構築
