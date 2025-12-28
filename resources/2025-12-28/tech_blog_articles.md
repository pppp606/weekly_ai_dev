# Japanese Tech Blog Articles - 2025-12-28

## Featured Articles

### 1. [Codex と Claude Code と Antigravity と Cursor を併用する](https://note.com/biwakonbu/n/n1907b69fe39e)
- **著者**: Ryo@VibeCoder
- **プラットフォーム**: note
- **公開日**: 2025-12-25
- **概要**: 複数のAIコーディングツールを同時に使い分ける実践的なワークフローを紹介。Cursor上でClaude Code + Codexを動かしつつ、Antigravityで別リポジトリの作業を並行して行うスタイルを解説している。
- **開発者向けポイント**: 各ツールの特性を理解した使い分けが重要。Claude Code（Opus 4.5）はUI実装、Codex（GPT-5.2-codex high）は複雑なAPI調査、Antigravity（Gemini 3 Flash）は高速プロトタイピングに適している。
- **実装例**: Cursorを5インスタンス同時起動し、リポジトリごとに使い分ける運用方法を紹介。

### 2. [【決定版】Agent Skillsがオープン標準に！Claude、Cursor、GitHubで使い回せる時代へ](https://note.com/yasuda_forceai/n/nb88b61f00d6d)
- **著者**: やすだ.dev
- **プラットフォーム**: note
- **公開日**: 2025-12-22
- **概要**: 2025年12月18日にAnthropicがAgent Skillsをオープン標準として公開したことを解説。Claude、Cursor、GitHub Copilot、VS Codeで同じスキルを使い回せるようになった。
- **開発者向けポイント**: SKILL.md形式でスキルを定義し、.claude/skills/（ローカル）や.github/skills/（リポジトリ）に配置するだけで複数プラットフォームで利用可能。起動時のトークン消費を約100トークンに抑える「progressive disclosure」の仕組みも解説。
- **実装例**: 自律性レベル（high/medium/low）の設定方法、A/Bテストによるスキル評価の実践例。

### 3. [週刊AI駆動開発 - 2025年12月21日](https://zenn.dev/pppp303/articles/weekly_ai_20251221)
- **著者**: pppp303
- **プラットフォーム**: Zenn
- **公開日**: 2025-12-21
- **概要**: 12月中旬のAIコーディングツール大型アップデートを網羅的にまとめた週刊レポート。Claude Code v2.0.74のLSPサポート、Cursor Enterprise Edition、Kiro v0.8.0のサブエージェント機能などを紹介。
- **開発者向けポイント**: Claude CodeのLSP対応によりgo-to-definitionやfind-referencesが利用可能に。VS Code 1.107.1ではGitHub Copilotとカスタムエージェントを組み合わせたマルチエージェントオーケストレーションが実現。
- **実装例**: sst/opencode（オープンソースターミナルAIエージェント）、thedotmack/claude-mem（永続メモリプラグイン）などの注目OSSを紹介。

### 4. [AIコーディング実践環境の構築方法【2025年12月】](https://zenn.dev/mkj/articles/bf59c4c86d98a8)
- **著者**: からあげ
- **プラットフォーム**: Zenn
- **公開日**: 2025-12-01
- **いいね数**: 362
- **概要**: Claude Codeを中心としたAIコーディング環境の構築手順を包括的に解説。ベンダーロックインを避けつつ、GitHub CopilotやCursorにも応用可能なスキルを身につける方法を紹介。
- **開発者向けポイント**: 仕様書駆動開発（cc-sdd）による自動ドキュメント生成、MCP Serverの活用、linting/formattingツールの設定など、AI時代の開発基盤を構築するための実践的なノウハウを提供。
- **実装例**: nvm/Node.js、VS Code、Ruff（Python向け）、GitHub CLI（ghコマンド）の設定手順を詳細に解説。

## Trending Topics
- **マルチツール併用**: 単一ツールではなく、Claude Code + Codex + Cursorなど複数ツールを用途別に使い分けるワークフローが主流に
- **Agent Skillsのオープン標準化**: プラットフォーム横断でスキルを共有できる時代が到来、スキル資産の再利用性が向上
- **LSP統合**: Claude CodeのLanguage Server Protocol対応により、従来のIDE機能とAIエージェントの融合が進展
- **仕様書駆動開発**: ドキュメントを起点としたAI協調開発が定着、cc-sddなどのツールが注目を集める

## Recommended Reading Order
1. **入門**: [AIコーディング実践環境の構築方法](https://zenn.dev/mkj/articles/bf59c4c86d98a8) - 環境構築の基礎から始める
2. **最新動向**: [週刊AI駆動開発 - 2025年12月21日](https://zenn.dev/pppp303/articles/weekly_ai_20251221) - ツールアップデートを把握
3. **実践応用**: [Codex と Claude Code と Antigravity と Cursor を併用する](https://note.com/biwakonbu/n/n1907b69fe39e) - マルチツール運用を学ぶ
4. **発展**: [Agent Skillsがオープン標準に](https://note.com/yasuda_forceai/n/nb88b61f00d6d) - スキル共有の新標準を理解
