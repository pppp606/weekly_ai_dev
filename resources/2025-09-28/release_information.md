# リリース情報 (2025-09-28)

## 主要なリリース

### 🔧 Cline v3.32.1
**リリース日:** 2025-09-28
**リポジトリ:** https://github.com/cline/cline
**リリースURL:** https://github.com/cline/cline/releases/tag/v3.32.1

**主な変更点:**
- **思考モード（Thinking）のデフォルト有効化**: サポートされているモデルで思考モードがデフォルト有効になり、チャットでのテキスト冗長性を削減
- **推論トレースの保持**: cline/openrouter/anthropicプロバイダーで推論トレースを保持し、会話の整合性を維持
- **SAP AI Coreプロバイダーの改善**: リトライロジックを追加
- **UI改善**: VSCodeでの右サイドバーに関する情報バナーメッセージの改善
- **プロキシ接続の修正**: hostbridge接続でno proxyを強制適用
- **統合テストのコンパイル問題修正**

### 🌪️ Windsurf 1.12.11
**リリース日:** 2025-09-26
**ウェブサイト:** https://windsurf.com
**チェンジログ:** https://windsurf.com/changelog

**主な変更点:**
- **MCPツールの修正**: 特定のモデルでMCPツールを使用する際の問題を修正
- **Windows端末問題の修正**: Windowsでの端末に関する各種問題を解決

**追加情報（1.12.8 - 1.12.9）:**
- **GPT-5-Codexが利用可能**: 有料ユーザーは0倍クレジット、無料ユーザーは0.5倍クレジットで利用可能
- **Cascadeの追加メッセージ機能**: Cascadeが動作中に追加のメッセージを送信可能
- **Mermaid図の描画対応**: Cascadeでmermaid図をレンダリング

### 🔗 Google Gemini CLI v0.8.0-nightly.20250927
**リリース日:** 2025-09-27
**リポジトリ:** https://github.com/google-gemini/gemini-cli
**リリースURL:** https://github.com/google-gemini/gemini-cli/releases/tag/v0.8.0-nightly.20250927.19400ba8

**主な変更点:**
- **循環依存の解決**: Configから設定フィルタリング定数を抽出して循環依存を解消
- **シェルコマンドの警告追加**: コマンド置換を避けるための警告をrun_shell_commandツールに追加
- **スマート編集の改善**: ファイルパスの自動修正機能
- **UI改善**: ユーザーメッセージの境界線削除と`>`の色設定で可読性向上
- **アクセシビリティ改善**: 中央集約型スクリーンリーダーレイアウトの実装
- **ドキュメント自動構築**: 変更時にドキュメントを自動再構築するGitHubアクション追加

### 🚀 OpenAI Codex 0.43.0-alpha.2
**リリース日:** 2025-09-27
**リポジトリ:** https://github.com/openai/codex
**リリースURL:** https://github.com/openai/codex/releases/tag/rust-v0.43.0-alpha.2

**主な変更点:**
- **アルファ版のプレリリース**: 新機能のテスト版
- **マルチプラットフォーム対応**: macOS（Intel/Apple Silicon）、Windows、Linux（GNU/musl）向けバイナリ提供
- **NPMパッケージ**: Node.js環境での利用サポート

### 🖥️ Kiro v0.2.68
**リリース日:** 2025-09-23
**ウェブサイト:** https://kiro.dev
**チェンジログ:** https://kiro.dev/changelog/

**主な変更点:**
- **セキュリティアップデート**: CVE-2025-10585に対処するためChromium 138.0.7204.251をマージ
- **PowerShell脆弱性修正**: 悪意のあるコマンドを許可する可能性があった脆弱性を修正
- **ライセンスページの描画問題修正**

### 🔧 Anthropic Claude Code 1.0.126
**最終更新:** 2025-09-26
**リポジトリ:** https://github.com/anthropics/claude-code
**チェンジログ:** https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

**主な変更点:**
- **BedrockとVertexでの/contextコマンド有効化**: コンテキスト管理機能の拡張
- **mTLSサポート追加**: HTTP-ベースのOpenTelemetryエクスポーター向けのmTLS（相互TLS）サポート
- **Bashツール環境変数**: `CLAUDE_BASH_NO_LOGIN`環境変数でログインシェルのスキップが可能
- **セキュリティ改善**: Bashツールの権限チェックにおけるセキュリティ脆弱性を修正
- **VSCode拡張のパフォーマンス向上**: 大きなファイルでの性能改善

## ツール・ライブラリ

### 📝 VS Code 1.104.2
**リリース日:** 2025-09-26
**リポジトリ:** https://github.com/microsoft/vscode
**リリースURL:** https://github.com/microsoft/vscode/releases/tag/1.104.2

**主な変更点:**
- **バグ修正**: August 2025 Recovery 2として各種不具合の修正
- **注記**: AI機能やGitHub Copilot統合に関する特筆すべき変更はなし

## 重要な技術動向

### 思考モード（Thinking Mode）の普及
複数のAI開発ツール（ClineやWindsurf）で思考モードがデフォルト機能として採用され、AIの推論プロセスの透明性と品質向上が図られています。

### セキュリティ強化の継続
Claude CodeやKiroなど、主要なAI開発ツールでセキュリティ脆弱性の修正が継続的に行われており、信頼性の高い開発環境の構築が進んでいます。

### プラットフォーム統合の改善
WindsurfでのMCPツール対応改善やClaude CodeでのBedrock/Vertex統合強化など、異なるAIプラットフォーム間の連携機能が向上しています。