# Japanese Tech Blog Articles - 2026-03-08

## Featured Articles

### 1. [Skillsで実現する軽量パーソナルRAG](https://zenn.dev/karaage0703/articles/d7eaf62437185d)
- **著者**: からあげ (karaage0703)
- **プラットフォーム**: Zenn
- **公開日**: 2026-03-01
- **いいね数**: 165
- **概要**: PostgreSQL + pgvectorを使った従来のMCP RAGサーバーに代わり、SQLiteとmultilingual-e5-smallモデルを活用した軽量なパーソナルRAGシステム「workspace-rag」を紹介。AnthropicのSkillsフレームワークを活用し、`uv sync`だけでセットアップが完了するシンプルな構成を実現している。EMNLP 2024のR²AGコンセプトを実装し、関連性スコア付き検索結果でAIエージェントの文書優先順位付けを改善。
- **開発者向けポイント**: SkillsはMCPよりもパーソナルRAGの導入が簡単で、埋め込みモデルの選択がパフォーマンスとリソース消費に大きく影響する。CLI実行で約9秒、HTTPサーバー常駐モードで約0.1秒の検索速度を実現。
- **実装例**: SQLite + multilingual-e5-small（384次元、約500MB）による軽量RAG構成、SKILL.mdファイルとPythonスクリプトによるエージェント統合パターン

### 2. [【最新版】Cursor vs Claude Code vs Copilot CLI — 三つ巴のAI開発ツール、結局どれを使うべき？](https://zenn.dev/ai_nexus/articles/ai-dev-tools-cursor-claude-copilot-2026)
- **著者**: ysshin
- **プラットフォーム**: Zenn
- **公開日**: 2026-03-02
- **いいね数**: --
- **概要**: 2026年3月時点のCursor、Claude Code、GitHub Copilot CLIの3大AIコーディングツールを徹底比較。各ツールの設計思想の違い（Cursor=AI native編集、Claude Code=エージェント駆動開発、Copilot CLI=エンタープライズ標準AI開発）を分析し、ベンチマーク結果とともに用途別の最適な選択肢を提示している。
- **開発者向けポイント**: 新機能実装でClaude Codeが6分（Cursor 8分、Copilot 9分）、レガシーコード改善でClaude Codeのコード品質92%（Cursor 70%）と、タスクの複雑さに応じた使い分けが重要。個人開発者はCursor、スタートアップはCursor+Claude Codeのハイブリッド、エンタープライズはCopilot CLI+Claude Codeの組み合わせが推奨。
- **実装例**: Agent Teams機能による複数ファイル並列分析・自動テスト、MCP接続による9,000以上の外部ツール統合

### 3. [Claude Code エージェント管理を全自動化するパイプラインを作った](https://qiita.com/noujiru/items/eb346d22aef782ee8619)
- **著者**: noujiru（株式会社ナハト）
- **プラットフォーム**: Qiita
- **公開日**: 2026-03-02
- **いいね数**: 7 / ストック数: 4
- **概要**: Claude Codeのサブエージェント管理を全自動化する6段階パイプライン（Discovery→Ingestion→Quality Assurance→Usage Tracking→Ranking→Team Synchronization）を構築した実践レポート。14個のエージェントを品質スコア100点で管理し、使用頻度に基づくN〜N-Sのランキングシステムで自然な廃止を実現。Boris Chernyの方法論を応用した自己改善ループにより、週2〜3回のエラー修正が0〜1回に削減。
- **開発者向けポイント**: エージェント管理にSkill管理と同じ基準を適用することで混乱を秩序に変換できる。8段階のセキュリティチェックでプロンプトインジェクションを検出、lessons-recorder.pyによるパターンベース学習で再発防止を自動化。
- **実装例**: agent-discovery.py（信頼レベル別GitHubリポジトリスキャン）、agent-audit-check.py（100点満点の品質ルーブリック）、JSONL形式の使用量トラッキング、Git同期による自動配布

### 4. [プロンプトエンジニアリング ? RAG ? Skills ? MCP ? コンテキストエンジニアリング ? - 全然わからん！](https://zenn.dev/rna4219/articles/9f04caba99091e)
- **著者**: ゲノムちゃん
- **プラットフォーム**: Zenn
- **公開日**: 2026-03-04
- **いいね数**: 3
- **概要**: 2026年のLLMパイプラインを構成する技術要素（MCP、Agent Skills、コンテキストエンジニアリング、RAG）を体系的に整理した記事。「プロンプト最適化だけでは限界がある」という主張のもと、情報フロー設計こそが本質であることを解説。「Workflow Cookbook」という独自フレームワークを提案し、プロジェクトの前提条件・手順書・評価基準・ガードレールをコンテキスト成果物として管理するアプローチを紹介。
- **開発者向けポイント**: MCPは「AIアプリと外部システムをつなぐ接続標準」、Agent Skillsは「タスク単位の小さなソフトウェア」、コンテキストエンジニアリングは「毎ターンLLMに渡す情報を決める縦レイヤ」として役割を明確化。単一プロンプト最適化より情報フロー設計に投資すべき。
- **実装例**: Workflow Cookbookパターン（前提条件・手順書・評価基準・ガードレールの文書化）、コンテキスト有限リソースの最適配分戦略

### 5. [デフォルトのまま使うな ── Claude Code で本当に効いた設定10選](https://qiita.com/shimo4228/items/f80a6716a91eac35deb3)
- **著者**: shimo4228
- **プラットフォーム**: Qiita
- **公開日**: 2026-03-05
- **いいね数**: --
- **概要**: 270セッションのClaude Code実践経験から厳選した10個の設定戦略を解説。コンテキストウィンドウ80%到達時のセッション分割、88以上の安全なBashコマンドの事前許可、6パターンのみの正規表現ベース安全バリア（rm -rf /、git push --force、git add .など）、PostToolUseフックによる自動テスト実行、200行上限のMEMORY.md管理など、実践的なClaude Code運用ノウハウを体系化。
- **開発者向けポイント**: PreToolUse/PostToolUse/Stopの3層フックアーキテクチャで安全と自動化を両立。ルールファイルを言語非依存の原則と実装固有のルールに分離することで保守性を向上。プラグインは必要最小限に絞りトークン予算を温存すべき。
- **実装例**: PreToolUseフック（正規表現による危険パターンブロック）、PostToolUseフック（batsテスト自動実行）、Stopフック（リポジトリ構造検証）、グローバルSkillとプロジェクト固有Skillの分離パターン

### 6. [OpenCode完全ガイド：ターミナルで動くOSSのAIコーディングエージェント](https://zenn.dev/long910/articles/2026-03-04-opencode)
- **著者**: Long
- **プラットフォーム**: Zenn
- **公開日**: 2026-03-04
- **いいね数**: 2
- **概要**: SST（Serverless Stack）チームが開発したオープンソースのターミナルベースAIコーディングエージェント「OpenCode」の完全ガイド。75以上のAIプロバイダー対応、LSP統合によるセマンティックコード理解、MCP対応によるツール拡張性、マルチセッション並列実行などの特徴を網羅的に解説。Claude Code代替としてのコスト最適化やベンダーロックイン回避の観点から評価。
- **開発者向けポイント**: Claude Pro/MaxのOAuthトークンはOpenCodeで使用不可（2026年1月のポリシー変更）。コスト最適化戦略として、Groqなどの安価なモデルでドラフト→高性能モデルで仕上げの二段階アプローチが有効。Ollama連携で完全無料のローカルLLM運用も可能。
- **実装例**: opencode.json設定ファイル、`{env:VARIABLE}`構文によるセキュアな認証情報管理、provider/model-id形式のモデル指定

### 7. [【2026年3月版】Claude Codeの最新機能まとめ — Voice Mode・Worktree・Auto Memory・Agent Teams](https://qiita.com/kotaro_ai_lab/items/0f010a4be57b8689ee33)
- **著者**: kotaro_ai_lab（株式会社Good Lab）
- **プラットフォーム**: Qiita
- **公開日**: 2026-03-05
- **いいね数**: --
- **概要**: 2026年2月〜3月にリリースされたClaude Code v2.1.47〜v2.1.69の主要新機能を体系的にまとめた記事。Voice Mode（3月3日リリース、20言語対応、スペースバーでプッシュトゥートーク）、Auto Memory（プロジェクトパターンの自動保存）、Git Worktree（並列エージェント実行のための隔離環境）、Agent Teams（複数エージェント協調の研究プレビュー）の4大機能を解説。
- **開発者向けポイント**: Voice Modeの音声→テキスト変換トークンは無料。Auto Memoryは`~/.claude/projects/[project]/memory/`に自動保存。Worktreeで`isolation: worktree`を指定すると並列編集時の干渉を防止。新コマンド`/simplify`（自動コードレビュー）、`/batch`（一括ファイル操作）が追加。Opus 4.6ではmedium effortがデフォルトに、1Mトークンコンテキストウィンドウがベータ提供中。
- **実装例**: Remote Control（外部ツールのプログラマティック統合）、HTTP Hooks（JSONエンドポイントへのPOST）、カスタムnpmレジストリ対応プラグインシステム

## Trending Topics
- **AIコーディングツールのハイブリッド運用**: Cursor、Claude Code、Copilot CLI、Antigravityの4ツールを場面に応じて使い分ける戦略が主流化
- **仕様駆動開発（SDD）の浸透**: バイブコーディングの限界を受け、cc-sddやSpecKitなどの仕様管理ツールを活用したSDD手法が急速に普及
- **コンテキストエンジニアリング**: プロンプトエンジニアリングの次のフェーズとして、LLMに渡す情報フロー全体を設計する概念が注目
- **Claude Code v2.1.x系の急速な進化**: Voice Mode、Auto Memory、Worktree、Agent Teamsなど実用的な機能が続々追加
- **Skills vs MCP**: 軽量な用途ではSkillsベースのアプローチがMCPサーバーより実用的という議論
- **エージェント管理の自動化**: サブエージェントの品質管理・セキュリティ・ライフサイクル管理を自動化するパイプラインの実践事例
- **OpenCodeなどOSS代替ツール**: ベンダーロックインを避けつつ柔軟なAI開発環境を構築するニーズの高まり

## Recommended Reading Order
1. **初心者・概要把握向け**: [【2026年3月版】Claude Codeの最新機能まとめ](https://qiita.com/kotaro_ai_lab/items/0f010a4be57b8689ee33) - 最新のClaude Code機能を把握するための入門記事
2. **概念理解向け**: [プロンプトエンジニアリング ? RAG ? Skills ? MCP ? コンテキストエンジニアリング ?](https://zenn.dev/rna4219/articles/9f04caba99091e) - 2026年のLLMパイプラインの全体像を整理
3. **実践導入向け**: [デフォルトのまま使うな ── Claude Code で本当に効いた設定10選](https://qiita.com/shimo4228/items/f80a6716a91eac35deb3) - 即座に適用できる具体的な設定ノウハウ
4. **ツール選定向け**: [【最新版】Cursor vs Claude Code vs Copilot CLI](https://zenn.dev/ai_nexus/articles/ai-dev-tools-cursor-claude-copilot-2026) - チーム規模・用途に応じた最適ツール選択ガイド
5. **上級者・アーキテクチャ向け**: [Claude Code エージェント管理を全自動化するパイプラインを作った](https://qiita.com/noujiru/items/eb346d22aef782ee8619) - エージェント管理の自動化アーキテクチャ
6. **軽量RAG実装向け**: [Skillsで実現する軽量パーソナルRAG](https://zenn.dev/karaage0703/articles/d7eaf62437185d) - MCPに頼らない軽量RAGの実装方法
