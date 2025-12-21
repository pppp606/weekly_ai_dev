# リリース情報 (2025-12-14〜2025-12-21)

## 主要なリリース

### Claude Code v2.0.74
**リリース日**: 2025-12-19
**リポジトリ**: https://github.com/anthropics/claude-code
**CHANGELOG**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

#### 新機能・改善点

**LSP（Language Server Protocol）ツールの追加**
コードインテリジェンス機能として、go-to-definition、find references、hover documentationなどの機能が利用可能になりました。これにより、コードベースのナビゲーションが格段に向上します。

**ターミナルセットアップの拡充**
`/terminal-setup`コマンドで以下のターミナルがサポートされました：
- Kitty
- Alacritty
- Zed
- Warp

**テーマ関連の改善**
- `ctrl+t`ショートカットでシンタックスハイライトのオン/オフを切り替え可能
- テーマピッカーにシンタックスハイライト情報を表示

**その他の改善**
- スキルの`allowed-tools`がスキルから呼び出されたツールにも適用されるよう修正
- macOSキーボードショートカットを`alt`から`opt`表示に変更
- `/context`コマンドでスキルとエージェントをソース別にグループ化表示

#### 過去1週間の注目リリース（v2.0.70〜v2.0.74）

**v2.0.72: Chrome連携機能（Beta）**
Claude in Chrome機能が追加され、Chrome拡張機能（https://claude.ai/chrome）と連携してブラウザを直接Claude Codeから操作可能に。

**v2.0.70: 重要な改善**
- MCPツール権限にワイルドカード構文`mcp__server__*`を追加（サーバーの全ツールを許可/拒否可能）
- メモリ使用量を3倍改善（大規模会話時）
- プロンプトサジェスチョンでEnterキーで即時送信が可能に

---

### Cursor Enterprise Edition
**リリース日**: 2025-12-18
**公式サイト**: https://cursor.sh
**Changelog**: https://cursor.sh/changelog

#### 新機能

**Enterprise Insights**
- コード作業タイプの分析（バグ修正、リファクタリング、説明など）
- 共有エージェントトランスクリプトによるPRドキュメント化
- 組織の支出追跡と予算アラートのためのBilling Groups機能

**セキュリティ強化**
- Linux環境でのエージェントサンドボックスサポート（macOSに加えて）
- ワークフロー自動化のためのService Accounts機能

---

### Kiro v0.8.0 IDE / v1.23.0 CLI
**リリース日**: 2025-12-18
**公式サイト**: https://kiro.dev
**Changelog**: https://kiro.dev/changelog/

#### IDE v0.8.0 新機能

**Webツール**
チャット内でインターネットコンテンツを直接検索・取得可能に。

**Contextual Hooks**
"Prompt Submit"と"Agent Stop"トリガーによるコンテキスト依存フックを追加。

**サブエージェント**
分離されたコンテキストウィンドウで並列タスク実行が可能に。

**強化されたスーパーバイズドモード**
ファイル単位のきめ細かいコードレビュー機能を追加。

#### CLI v1.23.0 新機能

**サブエージェント**
ライブプログレストラッキング付きの複雑なタスク委譲が可能に。

**プランエージェント**
`Shift+Tab`または`/plan`でアイデアを構造化された実装計画に分解。

**新ツール**
- grep/globツールで`.gitignore`を尊重した高速ファイル検索
- マルチセッションサポートとインタラクティブセッションピッカー
- MCPレジストリサポートによるガバナンスとツール管理

---

### GitHub Copilot CLI v0.0.372
**リリース日**: 2025-12-19
**リポジトリ**: https://github.com/github/copilot-cli
**リリースURL**: https://github.com/github/copilot-cli/releases/tag/v0.0.372

#### 新機能

**モデル有効化の改善**
無効化されたモデルをCLIから直接選択・指定して有効化可能に。

**`/context`コマンド**
トークン使用量を視覚化する新コマンドを追加。

**`--resume`フラグ**
リモートセッションをローカルで継続するためのフラグを追加。

**URL権限制御**
Webアクセスを行う一般的なシェルコマンドに影響するURL権限制御を追加。

**UI改善**
長いコマンドで折り返し時に重複するインテンションヘッダーを表示しないよう修正。

---

### Cline v3.45.x
**リリース日**: 2025-12-17〜2025-12-20
**リポジトリ**: https://github.com/cline/cline
**リリースURL**: https://github.com/cline/cline/releases/tag/v3.45.1

#### 新機能

**v3.45.0**
- 新しいモデル設定機能を追加
- Gemini 3 Flash Previewモデルをモデルピッカーとバナーに追加

**v3.45.1（バグ修正）**
- MCP設定のレースコンディションを修正（auto-approveのトグルやタイムアウト設定変更時のUI点滅と設定リバートの問題を解消）

---

### VS Code 1.107.1（November 2025 Recovery 1）
**リリース日**: 2025-12-17
**リポジトリ**: https://github.com/microsoft/vscode
**リリースURL**: https://github.com/microsoft/vscode/releases/tag/1.107.1

#### AI関連機能（VS Code 1.107）

**マルチエージェントオーケストレーション**
GitHub Copilotとカスタムエージェントを組み合わせて開発を加速・並列化。Agent HQによる集中管理、バックグラウンドエージェント、ローカル/バックグラウンド/クラウドエージェント間の委譲が可能に。

**エージェント機能強化**
- **セッション統合**: エージェントがChat viewに統合され、統一されたステータスモニタリングとファイル変更統計を提供
- **バックグラウンド処理**: チャットウィンドウを閉じても長時間の自律タスクを継続
- **タスクハンドオフ**: "Continue in"オプションでバックグラウンドやクラウドエージェントにシームレスに作業を移行
- **Git Worktree分離**: バックグラウンドエージェントが専用Git worktreeで実行され、ファイル競合を防止

**チャットモデル管理**
- 新しいLanguage Modelsエディタで利用可能なモデルを一元管理
- Anthropic拡張思考予算の設定（デフォルト4,000トークン）
- AzureモデルプロバイダーがEntra ID認証をデフォルトに

**ツール改善**
- **Fetchツール**: JavaScript重視のサイトの動的レンダリングコンテンツに対応
- **ターミナル統合**: xterm.jsターミナルレンダリングと自動承認オプション
- **Claude Skills再利用**: エージェントが`~/.claude/skills/`からClaudeスキルを発見・ロード可能

---

## ツール・ライブラリ

### Gemini CLI v0.21.0-nightly（Pre-release）
**リリース日**: 2025-12-21
**リポジトリ**: https://github.com/google-gemini/gemini-cli
**リリースURL**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.21.0-nightly.20251221.8feeffb29

#### バグ修正
- 信頼されたフォルダレベルのバリデーションを追加
- トラストダイアログの右ボーダーオーバーフローを修正
- accepting-editsがオフにされた後も続行するバグを修正
- `--resume`失敗時の無限再起動ループを防止

---

### OpenAI Codex v0.78.0-alpha.1（Pre-release）
**リリース日**: 2025-12-21
**リポジトリ**: https://github.com/openai/codex
**リリースURL**: https://github.com/openai/codex/releases/tag/rust-v0.78.0-alpha.1

#### リリース概要
Rust実装のアルファリリース。以下のプラットフォーム向けバイナリを提供：
- macOS (Apple Silicon, Intel)
- Windows (x64, ARM64)
- Linux (x64, ARM64、glibc/musl両対応)

追加コンポーネント：
- `codex-command-runner`: コマンド実行用ツール
- `codex-responses-api-proxy`: APIプロキシ
- `codex-windows-sandbox-setup`: Windowsサンドボックスセットアップ
- NPMパッケージ（SDK、Shell Tool MCPなど）
