# リリース情報 (2025-10-12)

過去7日間（2025-10-05 〜 2025-10-12）の主要なAI開発ツールのリリース情報をまとめました。

## Anthropic Claude Code 2.0.14

**リリース日**: 2025-10-10

Claude Codeの最新バージョンでは、いくつかの重要な修正と改善が含まれています。

### 主な変更点

#### バージョン 2.0.14
- MCPサーバーの@メンション機能の修正：MCPサーバーのオン/オフ切り替えが正しく動作するようになりました
- Bash権限チェックの改善：インライン環境変数を含むコマンドの権限チェックがより正確になりました
- ultrathink + thinking トグル機能の修正
- 不要なログイン回数の削減
- `--system-prompt`のドキュメント追加
- レンダリングの改善
- プラグインUIの改善

#### バージョン 2.0.13
- ネイティブビルドで`/plugin`コマンドが動作しない問題を修正

#### バージョン 2.0.12 - プラグインシステムリリース
- **プラグインシステム正式リリース**: カスタムコマンド、エージェント、フック、MCPサーバーでClaude Codeを拡張可能に
- プラグイン管理コマンド：`/plugin install`、`/plugin enable/disable`、`/plugin marketplace`
- チームコラボレーション向けリポジトリレベルのプラグイン設定（`extraKnownMarketplaces`経由）
- `/plugin validate`コマンドでプラグイン構造と設定の検証が可能
- `/doctor`コマンドによる包括的なエラーメッセージと診断
- `/model`セレクターのちらつき防止
- `/help`の改善
- `/resume`サマリーでのフック言及を回避
- `/config`の"verbose"設定がセッション間で永続化

### リンク
- リポジトリ: https://github.com/anthropics/claude-code
- CHANGELOG: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
- プラグイン発表ブログ: https://www.anthropic.com/news/claude-code-plugins
- プラグインドキュメント: https://docs.claude.com/en/docs/claude-code/plugins

---

## Cline CLI v3.32.6-cli

**リリース日**: 2025-10-11

Cline CLIの最新バージョンでは、スタンドアロンCLIインストール機能と多数の新機能が追加されました。

### 主な変更点

- **スタンドアロンCLIインストール**: Node.js v22.15.0をバンドルした完全なスタンドアロン版
- **CLI認証ウィザード**: `cline auth login`で簡単にログイン可能
- **設定管理の強化**:
  - `cline config set`コマンドで設定を簡単に変更
  - `cline config get`コマンドで設定を確認
  - `cline config list`コマンドで全設定を一覧表示
- **プランモードの改善**: マークダウンストリーミングサポート、メモリからの読み取り修正
- **インスタンス管理の改善**: `instance list`の視覚的改善
- **フック機能フラグの追加**: カスタムフック機能の実験的サポート
- **APIリトライ機能**: 失敗したAPIリクエストに対する指数バックオフ付き自動リトライ
- **WebFetch、ListDefinitions、検索などのツールがCLIレンダリングに追加**

### インストール方法

```bash
# ワンコマンドでインストール
curl -fsSL https://raw.githubusercontent.com/cline/cline/main/scripts/install.sh | bash

# インストール確認
cline version

# ログイン
cline auth login
```

### プラットフォーム別ダウンロード
- macOS (Intel): `cline-v3.32.6-cli-darwin-x64.tar.gz`
- macOS (Apple Silicon): `cline-v3.32.6-cli-darwin-arm64.tar.gz`
- Linux (x64): `cline-v3.32.6-cli-linux-x64.tar.gz`

### リンク
- リポジトリ: https://github.com/cline/cline
- リリースURL: https://github.com/cline/cline/releases/tag/v3.32.6-cli
- ドキュメント: https://docs.cline.bot/

---

## Microsoft Visual Studio Code 1.105.0 (September 2025)

**リリース日**: 2025-10-09

Visual Studio Code 9月リリースでは、AI機能に焦点を当てた重要なアップデートが含まれています。

### AI関連の主な変更点

#### MCPマーケットプレイス（プレビュー）
- MCPマーケットプレイスからMCPサーバーを直接インストール可能
- エージェントツールの統合が容易に

#### AI支援によるマージコンフリクト解決
- マージコンフリクトの解決にAIアシスタンスを利用可能
- 開発者の生産性向上に貢献

#### チャット機能の強化
- 最近のチャットセッションを表示（実験的機能）
- 前回の作業から再開が容易に
- チャット応答とタスク完了のOS通知機能

#### 完全修飾ツール名
- ツール名の競合を避けるために完全修飾名を使用
- MCP統合の信頼性向上

### その他の改善
- macOS: ネイティブ認証エクスペリエンス（Microsoft認証のネイティブブローカーサポート）

### リンク
- リポジトリ: https://github.com/microsoft/vscode
- リリースURL: https://github.com/microsoft/vscode/releases/tag/1.105.0
- 詳細な更新情報: https://code.visualstudio.com/updates/v1_105

---

## Windsurf Editor 1.12.16

**リリース日**: 2025-10-10

Windsurf Editorの最新バージョンでは、コードベース理解のための新機能「Codemaps」がベータ版としてリリースされました。

### 主な変更点

#### Codemaps（ベータ版）
- コードベースの理解とナビゲーションのための新機能
- 大規模なプロジェクトでのコード探索を効率化
- 開発者のコード理解を支援

#### Cascadeの修正
- 内部エラーを減らすための修正
- ターミナル出力の可視性を改善
- 各種バグ修正と安定性の向上

### リンク
- ウェブサイト: https://windsurf.com
- Changelog: https://windsurf.com/changelog

---

## Google Gemini CLI v0.9.0-preview.2

**リリース日**: 2025-10-11

Gemini CLIのプレビュー版がマイナーアップデートされました。

### 主な変更点

- バグ修正: リリース/v0.9.0-preview.1-pr-10828へのコミット0b6c020のチェリーピック（コンフリクト解決）

### リンク
- リポジトリ: https://github.com/google-gemini/gemini-cli
- リリースURL: https://github.com/google-gemini/gemini-cli/releases/tag/v0.9.0-preview.2
- 完全なChangelog: https://github.com/google-gemini/gemini-cli/compare/v0.9.0-preview.1...v0.9.0-preview.2

---

## OpenAI Codex rust-v0.47.0-alpha.1

**リリース日**: 2025-10-09

OpenAI Codexのアルファ版がリリースされました（プレリリース版）。

### 主な情報

- バージョン: 0.47.0-alpha.1（Rust版）
- ステータス: プレリリース（アルファ版）
- 詳細なリリースノートは後日公開予定

### リンク
- リポジトリ: https://github.com/openai/codex
- リリースURL: https://github.com/openai/codex/releases/tag/rust-v0.47.0-alpha.1

---

## まとめ

今週は特にAI開発環境の拡張性と統合性に焦点を当てたアップデートが多く見られました。Claude CodeとClineのプラグインシステム、VS CodeのMCPマーケットプレイス、Windsurfの新しいCodemaps機能など、開発者の生産性向上を目指した機能が充実しています。
