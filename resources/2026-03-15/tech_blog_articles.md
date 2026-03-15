# Japanese Tech Blog Articles - 2026-03-15

## Featured Articles

### 1. [MCPはなぜCLIに負けたのか —— 経緯と構造を整理する](https://zenn.dev/hiraly/articles/3409b886607274)
- **著者**: ひらりー (Hiraly)
- **プラットフォーム**: Zenn
- **公開日**: 2026-03-04
- **いいね数**: 240
- **概要**: Model Context Protocol（MCP）が約18か月で従来のCLIアプローチに対して劣勢となった理由を構造的に分析した記事。高度な推論モデル（OpenAI o1/o3、Claude Opus 4.6）がドキュメントを自律的に読み解きCLI操作を実行できるようになったこと、トークン効率の大幅な差（CLIツールのREADME: 約225トークン vs MCP実装: 13,000〜55,000トークン）、さらにAnthropic自身がMCPの限界を認めるドキュメントを公開した経緯を解説している。
- **開発者向けポイント**: MCPサーバーの過剰接続がコンテキストを圧迫しエージェント効率を低下させるリスクがある。プロダクション環境ではCLIベースのアプローチが依然として有効であり、ツール選択時にトークンコストを意識することが重要。Anthropic自身が98.7%のトークン削減をMCP廃止で達成したという事実は、実務での判断材料として非常に参考になる。
- **実装例**: MCPとCLIのトークン消費量ベンチマーク比較、プロダクション環境でのCLIベースツール統合パターンを紹介

### 2. [【完全解説】Claude Agent SDKで本番AIエージェントを作る方法 - コピペで動く実装例つき](https://qiita.com/emi_ndk/items/6c0540300ba0cb3302e7)
- **著者**: @emi_ndk (Babushka AI)
- **プラットフォーム**: Qiita
- **公開日**: 2026-03-14
- **いいね数**: -
- **概要**: Claude Agent SDK（旧Claude Code SDK）を使って本番環境で動作するAIエージェントを構築する完全ガイド。従来のClient SDK（手動ツールループ実装が必要）とAgent SDK（自律的ツール実行）の違いを明確に解説し、`query()`によるワンショットタスクと`ClaudeSDKClient`によるマルチターン対話の2つのAPIを紹介。バグ修正、コードレビュー、テスト生成、ドキュメント作成、セキュリティ監査、DB移行、ブラウザ自動化の7つの実践ユースケースをコード付きで解説。
- **開発者向けポイント**: `@tool`デコレータによるカスタムツール作成、Hooksによるエージェント監視・制御、サブエージェントによるタスク分担、JSON Schemaを使った構造化出力、チェックポイントによるロールバック機能など、本番運用に必要な機能を網羅。「10行のコードで自己修復するバグ修正エージェントが作れる」という実践性が魅力。
- **実装例**: Python `@tool`デコレータ、Agent Teams並列実行、Hooks監視パターン、構造化出力スキーマなど、コピペで動くサンプルコード多数

### 3. [Cursor / Claude Code / Devin / Antigravity の違いを整理してみた](https://zenn.dev/frontline/articles/46112b476b0953)
- **著者**: Kota
- **プラットフォーム**: Zenn
- **公開日**: 2026-03-10
- **いいね数**: 6
- **概要**: 2026年春時点で注目される4つのAI開発ツールの役割と思想の違いを整理した記事。Cursor（AIネイティブIDE＝人間が主導でAIが補助）、Claude Code（AI CLIエージェント＝AIがCLIタスクを自動化）、Devin（AIソフトウェアエンジニア＝要件から実装・テスト・デバッグまで自律遂行）、Antigravity（AI開発チーム＝複数AIエージェントを管理し人間はPMとレビューに集中）という進化スペクトラムを提示。
- **開発者向けポイント**: 開発の進化は「人が書く → AIと作る → AIに任せる」という段階を経ており、エンジニアの役割は実装力から仕様策定・AI指示・品質保証へとシフトしている。ツール選択は「どれが最強か」ではなく「どのフェーズの作業か」で決めるべきという実践的な指針を提供。
- **実装例**: 各ツールの適用シーン（新規開発、リファクタリング、日常コーディング、CI/CD統合）の使い分けマトリクス

### 4. [AIコーディングツール最新比較 2026春 — Cursor・Claude Code・Windsurf・Copilot CLIを使い比べてわかったこと](https://qiita.com/ysshin/items/866b6feb7b3a33ab4171)
- **著者**: @ysshin
- **プラットフォーム**: Qiita
- **公開日**: 2026-03-14
- **いいね数**: -
- **概要**: 2026年春時点の主要AIコーディングツール4種を実際に使い比べた比較レビュー。Claude CodeはOpus 4.6の推論能力とAgent Teamsによる並列開発で新規プロジェクトに最適、CursorのComposerはマルチファイル編集とビジュアルdiffで リファクタリングに強み、Copilot CLIはGitHub Actions連携でCI/CDに、WindsurfのCascadeエンジンは自律実行に優れるとまとめている。2026年Q1の注目アップデートとして、Claude Code Proプラン（$20/月）に1Mコンテキストトークンがデフォルト搭載、GitHub Copilot CLIのGA化、WindsurfのArena Mode追加を紹介。
- **開発者向けポイント**: 「1つの最強ツール」を探す時代は終わり、タスクに応じたツール選択が重要。著者の個人ランキングはClaude Code > Cursor > Windsurf > Copilot CLIだが、IDE重視の開発者はCursorが最適とも述べており、チーム・プロジェクト特性に応じた選定基準を提供。
- **実装例**: 複雑なリファクタリングでのClaude Code（18分）vs Cursor（35分）のパフォーマンス比較

### 5. [※3/14追記 Antigravityが、静かに別物になっていた、、](https://note.com/petabyte_ai/n/n4d8afe9cafbb)
- **著者**: Neiju | AIオタク
- **プラットフォーム**: note
- **公開日**: 2026-03-13（3/15更新）
- **いいね数**: 150
- **概要**: 2026年3月12日にGoogleが発表したAntigravityの大幅アップデートについて速報的にまとめた記事。Google AI Proサブスクリプションとの統合により、ビルトインAIクレジットがAntigravityで利用可能に。「ユーザーにスケーリングへのシームレスなパスを提供する」方向性への転換を分析し、単なるIDE機能を超えてGoogleのAIプラットフォーム全体の一部として位置づけられるようになった変化を解説している。
- **開発者向けポイント**: GoogleのAntigravityは急速に進化しており、AI開発ツール市場の競争が激化している。Google AI Proプランとの統合は、既にGCPを利用している開発者にとってはコスト面での大きなメリットとなりうる。CursorやClaude Codeとの使い分けを再検討する契機となる。
- **実装例**: Google AI Proプランとの連携設定、Antigravityの最新機能活用パターン

### 6. [Claude Codeはなぜそう動くのか — 設計思想と挙動の完全ガイド](https://zenn.dev/boku_yaji/articles/6f549c712b40cd)
- **著者**: boku-yaji
- **プラットフォーム**: Zenn
- **公開日**: 2026-03-10
- **いいね数**: 2
- **概要**: Claude Codeの内部アーキテクチャと設計思想を深く分析した技術記事。Claude Codeを「エージェントハーネス」（言語モデルにツール・コンテキスト管理・実行環境を装備するインフラ）として捉え、「コンテキストウィンドウはすぐ埋まり、埋まるほど性能が劣化する」という根本制約からすべてのアーキテクチャ判断が導かれていることを解説。Agentループ、5カテゴリのツール群、自動コンパクション、サブエージェント、オンデマンドSkills、MCP Tool Searchなどのコンテキスト管理戦略を詳述。
- **開発者向けポイント**: CLAUDE.md指示は「アドバイザリ（助言的）」でLLMが無視する可能性があるのに対し、Hooksは「決定論的」で必ず実行される。この違いを理解することで、リンティングやアクセス制限を確実に機能させる設計が可能になる。Managed（組織）> Project（チーム）> User（個人）の3層階層モデルも実務でのClaude Code運用に役立つ。
- **実装例**: AgentループのWhileパターン、stop_reason制御、auto-compactionの動作仕組み、Hooks実装例

## Trending Topics
- **MCP vs CLI論争**: AnthropicがMCPをLinux FoundationのAAIFに移管する一方で、実務ではCLIベースアプローチの優位性が議論されており、「MCPはなぜCLIに負けたのか」が240いいねを集めるなど大きな関心を集めている
- **AI開発ツールの使い分け時代**: Cursor、Claude Code、Windsurf、Copilot CLI、Devin、Antigravityなど選択肢が増え、「1つの最強ツール」ではなく「タスクに応じた使い分け」が主流テーマに
- **Claude Agent SDK登場**: Claude Code SDKからリブランドされたAgent SDKにより、Claude Codeと同等のエージェント機能をプログラマティックに利用可能に
- **Google Antigravity の急速な進化**: GoogleのAntigravityがAI Proプランとの統合を発表し、エージェント型開発ツール市場への本格参入を加速
- **コンテキストエンジニアリングの重要性**: Rules、Skills、マルチエージェント構成、ツール統合など、モデル能力以上に「適切なタイミングで適切なコンテキストを提供する」ことがエージェントの信頼性を決定する
- **Vibe CodingからAgentic Engineeringへ**: 探索的なAIコーディングから、仕様駆動・構造化されたエージェントオーケストレーションへの移行が進行中

## Recommended Reading Order
1. **初心者・概要向け**: [Cursor / Claude Code / Devin / Antigravity の違いを整理してみた](https://zenn.dev/frontline/articles/46112b476b0953) - AI開発ツールの全体像と各ツールの位置づけを把握
2. **実践・実装向け**: [【完全解説】Claude Agent SDKで本番AIエージェントを作る方法](https://qiita.com/emi_ndk/items/6c0540300ba0cb3302e7) - 具体的なコード例で本番エージェント構築を学ぶ
3. **設計・アーキテクチャ向け**: [Claude Codeはなぜそう動くのか — 設計思想と挙動の完全ガイド](https://zenn.dev/boku_yaji/articles/6f549c712b40cd) - Claude Codeの内部動作を理解し最適な活用法を見出す
4. **業界トレンド・上級者向け**: [MCPはなぜCLIに負けたのか](https://zenn.dev/hiraly/articles/3409b886607274) - MCP vs CLIの技術的議論を通じてエージェント開発の未来を考察
