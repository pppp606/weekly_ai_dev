# AI開発ツール リリース情報 (2026年1月4日〜1月11日)

今週の主要なAI開発ツールのリリース情報をまとめました。

---

## 1. Claude Code

**バージョン:** 2.1.0 〜 2.1.4
**更新日:** 2026年1月11日
**リポジトリ:** https://github.com/anthropics/claude-code
**CHANGELOG:** https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### 主要な変更点

#### 2.1.4
- `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS`環境変数を追加し、バックグラウンドタスク機能（自動バックグラウンド化やCtrl+Bショートカット含む）を無効化可能に
- "Help improve Claude"設定のOAuthトークン更新とリトライ処理を修正

#### 2.1.3
- スラッシュコマンドとスキルを統合し、メンタルモデルを簡素化
- リリースチャンネル（`stable`または`latest`）の切り替えを`/config`に追加
- 到達不能なパーミッションルールの検出と警告機能を追加
- `/doctor`コマンドでルールのソースと修正ガイダンスを表示

#### 2.1.2
- ターミナルにドラッグしたイメージにソースパスメタデータを追加
- ツール出力のファイルパスにクリック可能なハイパーリンクを追加（OSC 8対応ターミナル向け）
- Windows Package Manager (winget)インストールのサポートを追加
- bashコマンド処理のコマンドインジェクション脆弱性を修正
- tree-sitterのメモリリークを修正

#### 2.1.0 (メジャーアップデート)

**スキル機能の強化:**
- スキルの自動ホットリロード機能を追加 - `~/.claude/skills`や`.claude/skills`で作成・変更されたスキルがセッション再起動なしで即座に利用可能に
- フォークされたサブエージェントコンテキストでスキル/スラッシュコマンドを実行するための`context: fork`サポートを追加
- スキルに`agent`フィールドを追加し、実行するエージェントタイプを指定可能に

**新機能:**
- `language`設定を追加し、Claudeの応答言語を設定可能（例: `language: "japanese"`）
- LSP (Language Server Protocol)ツールを追加 - go-to-definition、find references、hover documentationなどのコードインテリジェンス機能
- Claude in Chrome (Beta) - Chrome拡張機能と連携してブラウザを直接コントロール
- Bashツールパーミッションでワイルドカードパターンマッチングをサポート（例: `Bash(npm *)`、`Bash(* install)`）
- 統合Ctrl+Bバックグラウンド化 - bashコマンドとエージェントの両方を同時にバックグラウンド化

**Vimモーションの強化:**
- `;`と`,`でf/F/t/Tモーションをリピート
- `y`オペレーターでyank（`yy`/`Y`）
- `p`/`P`でペースト
- テキストオブジェクト（`iw`, `aw`, `iW`, `aW`, `i"`, `a"`, `i'`, `a'`, `i(`, `a(`, `i[`, `a[`, `i{`, `a{`）
- `>>`と`<<`でインデント/デインデント
- `J`で行結合

**その他の改善:**
- MCP `list_changed`通知のサポートを追加
- `/teleport`と`/remote-env`スラッシュコマンドを追加（claude.ai購読者向け）
- 特定のエージェントを無効化する`Task(AgentName)`構文をサポート
- エージェントフロントマターにhooksサポートを追加

### 使用例

**言語設定:**
```json
// settings.json
{
  "language": "japanese"
}
```

**ワイルドカードパーミッション:**
```json
// settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(git * main)"
    ]
  }
}
```

**スキルのフォーク実行:**
```yaml
---
context: fork
agent: researcher
---
# Skill content here
```

---

## 2. Gemini CLI

**バージョン:** v0.23.0
**リリース日:** 2026年1月7日
**リポジトリ:** https://github.com/google-gemini/gemini-cli
**リリースページ:** https://github.com/google-gemini/gemini-cli/releases/tag/v0.23.0

### 主要な変更点

#### Gemini 3 Flashの導入
- **Gemini 3 Flash**がGemini CLIで利用可能に - より高速なモデルでの対話が可能

#### 新機能
- **リモートエージェントインフラストラクチャ**を導入し、ローカルエグゼキュータの名称変更
- **`/auth logout`コマンド**を追加 - 認証情報と認証状態をクリア可能
- **ACP SDK**の公式版を採用し、HTTP/SSEベースのMCPサーバーをサポート
- **エージェントTOMLパーサー**を追加
- **Windows クリップボード画像サポート**とAlt+Vペーストの回避策を追加
- **JITコンテキストメモリローディング**とUIシンクを実装
- **`.geminiignore`サポート**をSearchTextツールに追加

#### フック機能の強化
- フックにフレンドリーな名前と説明のサポートを追加
- フックのログ詳細度を削減し、UIでのエラー報告を改善
- フックのClearcut loggingによるテレメトリを追加

#### UX改善
- ツール確認ラベルを簡素化してUXを改善
- コマンドパース時のログをより堅牢に
- 設定ダイアログのちらつきを防止するパディングを追加
- スラッシュコマンド補完で兄弟コマンドが隠れる問題を修正

#### セキュリティ修正
- フックコマンド展開のサニタイズとインジェクション防止
- 信頼フォルダレベルのバリデーションを追加

### 使用例

**認証ログアウト:**
```bash
gemini /auth logout
```

**システムプロンプトのオーバーライド:**
```bash
export GEMINI_SYSTEM_MD="path/to/custom_system.md"
gemini
```

---

## 3. Cline

**バージョン:** v3.47.0 〜 v3.49.0
**リリース日:** 2026年1月6日〜1月10日
**リポジトリ:** https://github.com/cline/cline
**リリースページ:** https://github.com/cline/cline/releases

### v3.49.0 (2026年1月10日)

- **OTEL collector**のランタイム設定を追加
- Minimax-2.1を無料モデルリストから削除（無料トライアル終了のため）
- MCP応答での画像表示を改善
- リモートMCPサーバーをリモート設定からローカル設定に自動同期

**リリースページ:** https://github.com/cline/cline/releases/tag/v3.49.0

### v3.48.0 (2026年1月9日)

#### 新機能
- **Skillsシステム**を追加 - 再利用可能なオンデマンドエージェント指示
- **Clineプロバイダーに新しいウェブ検索ツール**を追加
- zai-glm-4.7をCerebrasモデルリストに追加
- Vercel AI Gatewayのモデルリフレッシュと推論サポートを改善

#### バグ修正
- diff view/ドキュメント切り詰めの回帰を修正
- コンテキストメニューセレクター使用時の拡張機能クラッシュを修正

**リリースページ:** https://github.com/cline/cline/releases/tag/v3.48.0

### v3.47.0 (2026年1月6日)

#### 新機能
- **Background Edits**の実験的サポートを追加 - diffビューを開かずにバックグラウンドでファイル編集可能
- 無料モデルを**MiniMax M2.1**に更新（MiniMax M2から変更）
- OpenAI CompatibleプロバイダーとAzure OpenAIで**Azure based identity認証**をサポート
- Basetenモデルに`supportsReasoning`プロパティを追加

#### バグ修正
- 認証リクエストでの期限切れトークン使用を防止
- 拡張子なしのバイナリファイルをdiffから除外
- ファイル末尾と改行を保持
- Cerebrasのレート制限を修正
- Claude Codeプロバイダーの自動コンパクトを修正

#### リファクタリング
- ClaudeとGemini 3モデルでの並列ツール使用のためのプロンプトを修正

**リリースページ:** https://github.com/cline/cline/releases/tag/v3.47.0

---

## 4. Cursor

**バージョン:** CLI (2026年1月8日リリース)
**ウェブサイト:** https://cursor.sh
**Changelog:** https://cursor.com/changelog

### 主要な変更点

#### CLIの新機能
- **モデル選択コントロール** - `agent models`コマンドと`/models`スラッシュコマンドで利用可能
- **ルール管理** - CLIから直接`/rules`コマンドでルールの作成・編集が可能
- **MCP サーバー管理** - `/mcp enable`と`/mcp disable`コマンドで管理
- **自動タブ命名** - チャットに基づいて自動的にタブに名前を付与
- **プライマリエントリポイント変更** - `agent`コマンドが主要なエントリポイントに（`cursor-agent`は後方互換性のためのエイリアスとして維持）

#### パフォーマンス改善
- **フックの並列実行** - 10倍のレイテンシ削減を実現

#### バグ修正
- ゴーストライン描画の修正
- レースコンディションの修正
- チャット名生成の修正

---

## 5. VS Code

**バージョン:** 1.108.0 (December 2025)
**リリース日:** 2026年1月8日
**リポジトリ:** https://github.com/microsoft/vscode
**リリースページ:** https://github.com/microsoft/vscode/releases/tag/1.108.0

### AI関連機能のアップデート

#### Agent Skills (実験的機能)
- **Agent Skills**機能を導入 - コーディングエージェントに専門的な機能を教えることが可能
- スキルは`SKILL.md`ファイルを含むディレクトリに格納
- `.github/skills`フォルダから自動検出

#### Agent Sessionsビューの改善
- キーボードアクセスサポート
- 状態と経過時間によるセッショングループ化
- 変更されたファイルと関連プルリクエストの表示
- マルチセッションアーカイブ
- アクセシビリティの改善

#### チャット機能の強化
- **チャットピッカーのリデザイン** - Quick Pickがエージェントセッションビューのデータを反映
- **チャットタイトルコントロールの改善** - Activity Bar設定に関わらず表示
- **再起動時の空チャット** - 前回のセッションは自動復元せず、新しい空のチャットを表示

#### ターミナルツールの改善
- **自動承認のデフォルト** - `git ls-files`、`rg`、`sed`などが自動承認
- **NPMスクリプトの自動承認** - ワークスペースのnpmスクリプトがデフォルトで自動承認
- **シェル履歴防止** - ターミナルツールで実行されるコマンドはbash、zsh、pwsh、fishのシェル履歴に含まれなくなった

#### アクセシビリティ
- **ストリーミング応答** - アクセシブルビューでチャット応答をリアルタイムで動的にストリーミング
- **ノイズ軽減** - MCPサーバー出力がデフォルトでアクセシブルビューから除外

---

## 6. OpenAI Codex

**バージョン:** 0.81.0-alpha.2 (プレリリース)
**リリース日:** 2026年1月11日
**リポジトリ:** https://github.com/openai/codex
**リリースページ:** https://github.com/openai/codex/releases/tag/rust-v0.81.0-alpha.2

### リリース情報

- Rustベースの新しいアルファリリース
- 複数のプラットフォーム向けバイナリを提供:
  - macOS (Apple Silicon, Intel)
  - Linux (x86_64, aarch64, glibc/musl)
  - Windows (x86_64, aarch64)
- **codex-responses-api-proxy**の提供
- **codex-command-runner**の提供
- **codex-windows-sandbox-setup**の提供
- NPMパッケージとして`codex-npm-0.81.0-alpha.2.tgz`も利用可能

---

## 7. GitHub Copilot CLI

**バージョン:** 0.0.378-0 (プレリリース)
**リリース日:** 2026年1月9日
**リポジトリ:** https://github.com/github/copilot-cli
**リリースページ:** https://github.com/github/copilot-cli/releases/tag/v0.0.378-0

### リリース情報

- プレリリースバージョン
- 対応プラットフォーム:
  - macOS (darwin-arm64, darwin-x64)
  - Linux (linux-arm64, linux-x64)
  - Windows (win32-arm64, win32-x64)
- NPMパッケージとして`github-copilot-0.0.378-0.tgz`も利用可能

---

## まとめ

今週は多くのAI開発ツールで重要なアップデートがありました:

1. **Claude Code 2.1.x**: スキル機能の強化、LSPツール、言語設定、Vimモーションの拡張など大規模なアップデート
2. **Gemini CLI v0.23.0**: Gemini 3 Flash対応、リモートエージェントインフラ、ACP SDK採用
3. **Cline v3.47-v3.49**: Skillsシステム、Background Edits、ウェブ検索ツールの追加
4. **Cursor CLI**: モデル選択、ルール管理、MCP管理のCLI対応、パフォーマンス大幅改善
5. **VS Code 1.108**: Agent Skills実験機能、Agent Sessionsビュー改善、ターミナル自動承認
6. **OpenAI Codex 0.81.0-alpha.2**: Rust実装の新アルファリリース
7. **GitHub Copilot CLI 0.0.378-0**: 最新プレリリース
