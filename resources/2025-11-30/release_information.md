# リリース情報 (2025-11-24〜2025-11-30)

## Claude Code (v2.0.51〜v2.0.55)

**更新日**: 2025-11-26
**リポジトリ**: https://github.com/anthropics/claude-code
**CHANGELOG**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### 主なアップデート

#### v2.0.51 - Claude Opus 4.5リリース
- **Claude Opus 4.5対応**: Anthropicの最新最高性能モデルが利用可能に
- **Claude Code for Desktop**: デスクトップアプリケーションがリリース (https://claude.com/download)
- **利用制限の更新**: Opus 4.5を試用できるよう利用制限が調整
- **Proユーザー向け**: Opus 4.5へのアクセスのための追加利用枠購入が可能に
- **Plan Modeの改善**: より精密なプラン構築と徹底した実行が可能に
- 利用制限通知のわかりやすさ向上
- thinkingエラーのハンドリング修正
- パフォーマンス回帰の修正

#### v2.0.54〜v2.0.55 - 安定性向上
- **Hooks機能強化**: PermissionRequestフックで「常に許可」提案の処理と権限更新の適用が可能に
- **プロキシDNS解決**: デフォルトで強制されなくなり、`CLAUDE_CODE_PROXY_RESOLVES_HOSTS=true`環境変数でオプトイン
- **キーボードナビゲーション修正**: メモリロケーションセレクターで矢印キー長押し時のレスポンス問題を解決
- **AskUserQuestion改善**: シングルセレクト質問の最後で自動送信、レビュー画面を省略
- **ファジーマッチング改善**: `@`ファイル提案がより高速・正確に
- iTerm通知過多の問題修正

#### v2.0.49〜v2.0.52 - 機能改善
- readline形式の`ctrl-y`によるペースト機能追加
- Bashコマンドで`$!`の一部使用を許可
- Wayland環境のLinuxでの画像ペースト対応（wl-pasteフォールバック）
- `/usage`コマンドの進捗バー表示修正
- コマンドライン引数起動時のメッセージ重複表示修正

---

## Cline (v3.38.2〜v3.38.3)

**更新日**: 2025-11-27
**リポジトリ**: https://github.com/cline/cline
**リリース**: https://github.com/cline/cline/releases/tag/v3.38.3

### 主な新機能

#### Claude Opus 4.5サポート
- Claude Opus 4.5が利用可能に
- Bedrockグローバルエンドポイントでも対応

#### 新モデル対応
- **Kimi K2シリーズ**: `kimi-k2-thinking`、`kimi-k2-thinking-turbo`を追加
- **Grok 4.1 & Grok Code**: Grokモデルを追加
- **Cerebrasモデル**: 更新と速度向上
- **Perplexity sonar/sonar-pro**: SAP AI Core Providerで対応

#### Hooks機能強化
- **TaskComplete Hook**: タスク完了時に実行されるフック機能を実装
- **Hooks Tab**: Rules & Workflowsモーダルにフックタブを追加

#### API・プロバイダー改善
- **Responses API対応**: OpenAI-nativeプロバイダーでResponses APIをサポート
- **LiteLLMダイナミックモデルフェッチ**: モデル一覧の動的取得に対応
- **OpenRouter自動モデル情報導出**: modelInfoの自動取得
- **ネイティブツールコール**: Baseten、Kimi K2モデルで有効化

#### 開発者体験の向上
- **thinking level設定**: Gemini 3.0 Pro、Vertex、Anthropicモデルで思考レベル設定が可能
- **プロキシサポート強化**: McpHubなどでプロキシルールとサポートを追加
- **OpenTelemetryメトリクス**: テレメトリインフラストラクチャを追加
- **タスクメタデータ拡張**: OS/Clineバージョン/ホスト情報を追加
- **Edit tools変換アダプター**: ツール変換機能を実装

#### バグ修正・改善
- ルールモーダルのポジショニング修正
- deep_planningでnew_taskツールパラメータをリマインド
- UIでの使用量更新タイミング改善
- 認証フェイルオーバー時のエラーハンドリング改善
- Windows cmd.exeのコマンド引数簡素化

---

## Kiro IDE/CLI

**更新日**: 2025-11-24〜2025-11-25
**ウェブサイト**: https://kiro.dev
**Changelog**: https://kiro.dev/changelog/

### v1.21.0 - Web検索・フェッチ機能 (2025-11-25)
- **Web検索・フェッチ機能**: Kiro CLIにリアルタイムウェブ情報へのアクセス機能を追加
- インターネットから最新情報を取得可能に

### v1.20.2 - コンテキスト管理改善 (2025-11-25)
- **スティッキーアクティブTodo**: タスク詳細とともに固定表示
- **`/tangent forget`コマンド**: 会話履歴から最近のメッセージを削除
- **ナレッジベース改善**: ファイルメタデータ、制限コントロール、ソートオプションを追加
- **設定マイグレーション**: `.amazonq`から`.kiro`への自動移行

### v1.20.1 - バグ修正 (2025-11-24)
- デフォルトエージェントパス表示の問題解決
- ワークスペーススコープでのMCP設定失敗を修正
- インラインコードブロックの色更新を修正

### Claude Opus 4.5サポート (2025-11-24)
- **Claude Opus 4.5対応**: Anthropicの最高性能モデルをIDEとCLIの両方で利用可能
- 実験的サポートとして提供

---

## Google Gemini CLI (v0.18.3〜v0.18.4)

**更新日**: 2025-11-26
**リポジトリ**: https://github.com/google-gemini/gemini-cli
**リリース**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.18.4

### v0.18.4
- バグ修正パッチ (cherry-pick 030a5ac)

---

## GitHub Copilot CLI (v0.0.365)

**更新日**: 2025-11-26
**リポジトリ**: https://github.com/github/copilot-cli
**リリース**: https://github.com/github/copilot-cli/releases/tag/v0.0.365

### 新機能
- **`--silent`オプション追加**: 統計出力を抑制し、スクリプト利用時に便利

---

## OpenAI Codex (v0.64.0-alpha.9〜v0.64.0-alpha.10)

**更新日**: 2025-11-25〜2025-11-28
**リポジトリ**: https://github.com/openai/codex
**リリース**: https://github.com/openai/codex/releases/tag/rust-v0.64.0-alpha.10

### アルファリリース
- Rust実装のCodex CLIが継続的にアルファリリースを更新
- **マルチプラットフォーム対応**: macOS (Intel/ARM)、Linux (GNU/musl)、Windows
- **codex-responses-api-proxy**: APIプロキシツールも同時配布
- **codex-sdk/codex-shell-tool-mcp**: npmパッケージとして提供

---

## VS Code (1.106.3)

**更新日**: 2025-11-26
**リポジトリ**: https://github.com/microsoft/vscode
**リリース**: https://github.com/microsoft/vscode/releases/tag/1.106.3

### October 2025 Recovery 3
- バグ修正リリース（AI関連の特記事項なし）
- 詳細: https://code.visualstudio.com/updates/v1_106

---

## 今週のハイライト

1. **Claude Opus 4.5の広範なサポート**: Claude Code、Cline、Kiroの3つのAIコーディングツールすべてが対応
2. **Claude Code for Desktop**: デスクトップアプリケーションとして利用可能に
3. **Kiro CLI Web機能**: リアルタイムウェブ検索・フェッチ機能の追加
4. **Cline Hooks強化**: TaskCompleteフックとUIの改善
5. **新モデル対応の拡大**: Kimi K2、Grok、Cerebrasなど多様なモデルへの対応
