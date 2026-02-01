# Japanese Tech Blog Articles - 2026-02-01

## Featured Articles

### 1. [Claude Codeで「AI部下10人」を作ったら、勝手にバグ直して「違反は切腹」ルールを追加してきて、オレは適当にしゃべるだけになった](https://zenn.dev/shio_shoppaize/articles/5fee11d03a11a1)
- **著者**: おしお (Shio Shoppaize)
- **プラットフォーム**: Zenn
- **公開日**: 2026-01-25（2026-01-28更新）
- **いいね数**: 1,253
- **概要**: Claude Codeとtmuxを使い、戦国時代の軍制をモチーフにしたマルチエージェントシステム「multi-agent-shogun」を構築。将軍1名・家老1名・足軽8名の階層構造で10体のAIエージェントを並列稼働させ、人間はカジュアルに指示するだけで開発が進む体制を実現した。エージェントが自律的にバグを発見・修正し、独自のルールまで提案してきた事例が話題に。
- **開発者向けポイント**: tmuxによる複数Claude Codeセッション管理、YAML通信によるAPI費用削減、イベント駆動型アーキテクチャによるアイドルコスト排除。Claude Max x5（$100/月）で10体のAIエージェント常時稼働が可能。
- **実装例**: WSL2 + tmux環境でのマルチエージェント構成、send-keysの2段階実行の注意点、マークダウンベースのリアルタイムダッシュボード

### 2. [【2026年最新】Claude Code作者が実践する「超並列駆動」開発術がエンジニアの常識を破壊していた](https://qiita.com/ot12/items/66e7c07c459e3bb7082d)
- **著者**: @ot12
- **プラットフォーム**: Qiita
- **公開日**: 2026-01-18
- **いいね数**: 663
- **概要**: Claude Code作者Boris Cherny氏の開発ワークフローを詳細に解析。常時10〜15のClaudeインスタンスを並列稼働させ、ローカルとクラウドに戦力を分散配備する手法を紹介。従来の逐次的なコーディングから「AIチームを設計・運用する」パラダイムシフトを提唱している。
- **開発者向けポイント**: Opus 4.5 with thinkingの一貫使用（軽量モデルよりトータル効率が高い）、CLAUDE.mdによるチーム知見の蓄積とGitHub Actionsでの自動更新、Plan Modeでの事前合意形成、PostToolUse hooksによるCI失敗の排除。
- **実装例**: `.claude/settings.json`での許可コマンド管理、サブエージェント（code-simplifier, verify-app）の専門分野活用、MCPによるSlack/BigQuery/Sentry連携

### 3. [【神アプデ】Claude Code 2.1の隠し機能16選｜99%の人が知らない生産性爆上げテクニック](https://qiita.com/emi_ndk/items/bac26d4e39054d358da5)
- **著者**: @emi_ndk (Babushka Ai)
- **プラットフォーム**: Qiita
- **公開日**: 2026-01-29
- **いいね数**: 1
- **概要**: 2026年1月7日リリースのClaude Code 2.1.0（1,096コミット）で追加された16の隠し機能を網羅的に解説。Hooksシステム、Session Teleportation、カスタムキーバインド、Thinking Block表示（Ctrl+O）、Skills Hot Reload、IS_DEMOモードなど、設定ファイルベースで有効化できる機能群を紹介。
- **開発者向けポイント**: `~/.claude/`配下のsettings.json、hooks.json、keybindings.jsonの3ファイルで大半の機能が制御可能。言語設定（日本語）、MCPトークン閾値（15%）、ファイル書き込み時の自動フォーマットhookが推奨最低設定。
- **実装例**: hooks.jsonによるツール実行前後の自動処理、Session Teleportationによるデバイス間セッション移行、Ctrl+Bによるバックグラウンド実行統合

### 4. [Claude Code でAIにコードを書かせてAIにレビューさせる開発スタイル](https://zenn.dev/sora_biz/articles/claude-code-ai-review-workflow)
- **著者**: そら (Sora)
- **プラットフォーム**: Zenn
- **公開日**: 2026-01-25
- **いいね数**: 7
- **概要**: Claude Codeで「ビルダー」と「オーディター」の役割を分離し、AIにコードを書かせた後に別のAIにレビューさせる開発手法を提案。1つのAIが自分のコードを評価する際のセルフバイアスを防止し、コード品質を向上させる。サブエージェント方式とCodex CLI方式の2つの実装アプローチを紹介。
- **開発者向けポイント**: `.claude/agents/`と`.claude/skills/`にレビュー設定ファイルを配置。オーディターは読み取り専用に制限し、セキュリティ脆弱性・潜在バグ・パフォーマンス最適化・コーディング規約の4軸で評価。`/review`コマンドでレビューサイクルを実行。
- **実装例**: サブエージェント設定によるread-onlyレビューア、グローバル設定による複数プロジェクトへの横展開、コミット→レビュー→修正→再レビューのワークフロー

### 5. [素人質問が大好きな教授にコードレビューを頼んでみた結果](https://qiita.com/i-inose/items/e21155fe84a5beb4782d)
- **著者**: Izuru Inose (@i-inose)
- **プラットフォーム**: Qiita（KDDIアジャイル開発センター）
- **公開日**: 2026-01-21
- **いいね数**: 110
- **概要**: AIコーディングツールへの過度な依存で自身のコードを説明できなくなった経験から、大学教授のように厳しく質問してくるAIコードレビューアプリ「Professor Code Reviewer」を開発。Mastraフレームワークを活用し、優しいモードと鬼モードの2種類のレビュー体験を実装。AI時代における技術力の本質的な維持方法を問う。
- **開発者向けポイント**: Mastraフレームワークによるデュアルロールエージェント設計、Zodスキーマを用いた構造化出力、chatRoute（ストリーミング）とカスタムエンドポイント（バッチ処理）の使い分け。AIツール依存からの脱却と深い技術理解の両立がテーマ。
- **実装例**: createStepによるワークフローパイプライン構築、structuredOutputとZod union typesによる型安全なAI応答パース

## Trending Topics
- **マルチエージェント開発**: Claude Codeの複数インスタンス並列稼働によるチーム型AI開発が最大のトレンド。将軍モデルやSwarm Modeなど多様なアーキテクチャが提案されている
- **Claude Code 2.1系の新機能活用**: Hooks、Session Teleportation、Skills Hot Reloadなど設定ファイルベースの隠し機能の発掘と活用が進む
- **AIレビュー・品質管理**: AIにコードを書かせるだけでなく、別のAIにレビューさせる役割分離パターンが注目を集めている
- **開発者のAI依存とスキル維持**: AI駆動開発が浸透する中で、エンジニアの技術的理解を維持する方法論への関心が高まっている
- **Opus 4.5の実戦投入**: 軽量モデルよりもOpus 4.5 with thinkingの一貫使用がトータル効率で優れるという知見が共有されている

## Recommended Reading Order
1. **入門・概要**: [素人質問が大好きな教授にコードレビューを頼んでみた結果](https://qiita.com/i-inose/items/e21155fe84a5beb4782d) - AI開発ツール依存の課題認識と、Mastraフレームワークによる実装例
2. **実践・実装**: [【2026年最新】Claude Code作者が実践する「超並列駆動」開発術](https://qiita.com/ot12/items/66e7c07c459e3bb7082d) - プロが実践する並列AI開発の具体的手法
3. **応用・上級**: [Claude Codeで「AI部下10人」を作った話](https://zenn.dev/shio_shoppaize/articles/5fee11d03a11a1) - マルチエージェントシステムの自律的運用事例
