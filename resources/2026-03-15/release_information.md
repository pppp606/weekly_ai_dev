# Release Information (2026-03-08 ~ 2026-03-15)

## 1. Gemini CLI v0.33.0 / v0.33.1

- **リポジトリ**: https://github.com/google-gemini/gemini-cli
- **リリース日**: v0.33.0 (2026-03-11) / v0.33.1 (2026-03-12)
- **リリースページ**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.33.1

### 主な変更点

#### 新機能
- **A2A (Agent-to-Agent) リモートエージェントのHTTP認証サポート**: リモートエージェントへのHTTP認証接続が可能に。認証済みA2Aエージェントカードの発見にも対応
- **GitHub Issue Creator スキル追加**: `github-issue-creator` スキルが組み込みで利用可能に
- **プランモードに研究サブエージェント**: プランモードで組み込みの研究サブエージェントが利用可能に（`feat(plan): enable built-in research subagents in plan mode`）
- **プランのフィードバック注釈**: プランにフィードバックを付けてイテレーションできる機能（`feat(plan): support annotating plans with feedback for iteration`）
- **プランコピーコマンド**: `/plan copy` サブコマンドが追加
- **拡張機能マニフェストにプランディレクトリサポート**: 拡張機能がプランディレクトリを指定可能に
- **ACP向けスラッシュコマンド実装**: `/memory`, `/init`, `/extensions`, `/restore` がACP (Agent Communication Protocol) で利用可能に
- **`/unassign` コマンドサポート**: タスクのアサイン解除コマンドが追加
- **コンテキストウィンドウ表示の改善**: 使用量ベースの表示に変更
- **チャット履歴の30日デフォルト保持**: 管理者向けにチャット履歴のデフォルト保持期間が30日に設定
- **ヘッダーデザインの刷新**: ASCIIアイコン付きのコンパクトなヘッダーデザインに

#### バグ修正・改善
- LLMベースのループ検知の誤検知を削減
- サブエージェントが修飾MCP ツール名を使用するよう修正
- MCP OAuth プロバイダーの実装（MCP SDK OAuthClientProvider準拠）
- TOML ポリシーファイルでのツール名バリデーション追加
- 大規模MCP ツール出力の自動トランケーション
- サブエージェントのアクティビティUX改善
- `/hooks` コマンドにダイアログパターンUI導入
- Windows PowerShell向けドキュメント追加

---

## 2. Claude Code v2.1.76

- **リポジトリ**: https://github.com/anthropics/claude-code
- **更新日**: 2026-03-14
- **CHANGELOG**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### 主な変更点

#### 新機能
- **MCP Elicitation サポート**: MCP サーバーがタスク実行中に構造化入力をインタラクティブダイアログ（フォームフィールドまたはブラウザURL）で要求可能に。`Elicitation` および `ElicitationResult` フックで応答のインターセプトとオーバーライドが可能
- **セッション名の CLI フラグ**: `-n` / `--name <name>` フラグでセッション起動時に表示名を設定可能
  ```bash
  claude -n "Feature Implementation"
  ```
- **ワークツリーのスパースチェックアウト**: `worktree.sparsePaths` 設定で大規模monorepo内の必要なディレクトリのみをチェックアウト可能
  ```json
  {
    "worktree.sparsePaths": ["packages/my-package", "shared/utils"]
  }
  ```
- **`PostCompact` フック**: コンパクション完了後に発火する新フック
- **`/effort` スラッシュコマンド**: モデルのエフォートレベルをセッション内で設定可能
- **セッション品質アンケート**: エンタープライズ管理者が `feedbackSurveyRate` 設定でサンプリングレートを調整可能

#### バグ修正
- 遅延ツール（`ToolSearch` 経由）がコンパクション後にスキーマを失う問題を修正
- スラッシュコマンドが "Unknown skill" と表示される問題を修正
- プランモード承認済みプランの再承認要求を修正
- ボイスモードでパーミッションダイアログ中のキー入力が飲み込まれる問題を修正
- Windows での `/voice` 動作不良を修正
- 自動コンパクションの連続失敗時の無限リトライにサーキットブレーカー導入（3回で停止）
- tmux over SSH でのクリップボードコピー改善
- `/export` のファイルパス表示修正

#### 改善
- `--worktree` の起動パフォーマンス向上（git refs 直接読み取り、冗長な `git fetch` スキップ）
- バックグラウンドエージェント終了時に部分結果を保持するよう改善
- モデルフォールバック通知が常に表示されるように改善
- ブロッククォートの可読性向上（ダークテーマ対応）
- ステイルワークツリーの自動クリーンアップ
- Remote Control セッションタイトルの改善

### v2.1.75 の主な変更点（同期間内）
- **Opus 4.6 の 1M コンテキストウィンドウ**: Max、Team、Enterprise プランでデフォルト利用可能に
- **`/color` コマンド**: プロンプトバーのカラーをセッション単位で設定可能
- メモリファイルに最終更新タイムスタンプ追加
- トークン推定の過剰カウント修正（早期コンテキストコンパクション防止）
- macOS での起動パフォーマンス改善
- **破壊的変更**: Windows マネージド設定のフォールバックパス変更（`C:\ProgramData\ClaudeCode\` → `C:\Program Files\ClaudeCode\`）

---

## 3. Cursor - New Plugins on the Cursor Marketplace

- **ウェブサイト**: https://cursor.com
- **Changelog**: https://cursor.com/changelog
- **更新日**: 2026-03-11

### 主な変更点

- **Marketplace に30以上の新プラグイン追加**: Atlassian、Datadog、GitLab などのパートナーから30以上のプラグインが追加。プラグインにはクラウドエージェント向けの MCP が含まれる
- クラウドエージェント連携のための MCP サーバー統合がさらに拡充

---

## 4. Visual Studio Code 1.111.0 (March 2026) - AI関連機能

- **リポジトリ**: https://github.com/microsoft/vscode
- **リリース日**: 2026-03-09
- **リリースページ**: https://github.com/microsoft/vscode/releases/tag/1.111.0

### AI / Copilot / エージェント関連の変更点

VS Code 1.111 は**初の週次安定版リリース**であり、エージェント体験の強化に焦点を当てている。

#### Agent Permissions（エージェント権限制御）
- Chat ビューに**パーミッションピッカー**が追加。セッションごとにエージェントの自律性レベルを調整可能
  - **Default Approvals**: ツール実行前に確認ダイアログを表示
  - **Bypass Approvals**: 確認なしで全ツール呼び出しを自動承認
  - **Autopilot (Preview)**: 全ツール呼び出しを自動承認し、エラー時の自動リトライ、質問への自動応答、`task_complete` ツール呼び出しまで自律的に動作

#### Autopilot (Preview)
- `chat.autopilot.enabled` 設定で有効化可能
- エージェントが `task_complete` ツールを呼び出すまで自律的に作業を継続

#### Agent-Scoped Hooks (Preview)
- カスタムフロントマターでエージェント固有のフックを定義可能。特定のエージェント選択時や `runSubagent` 呼び出し時にのみ実行される
- `chat.useCustomAgentHooks` 設定で有効化

#### Debug Events Snapshot
- `#debugEventsSnapshot` でエージェントのデバッグイベントスナップショットをチャットに添付可能。トークン消費やカスタマイズのトラブルシューティングに活用

---

## 5. Cline v3.72.0

- **リポジトリ**: https://github.com/cline/cline
- **リリース日**: 2026-03-12
- **リリースページ**: https://github.com/cline/cline/releases/tag/v3.72.0

### 主な変更点

#### 新機能
- **Anthropic Opus 4.6 ファストモード対応**: Opus 4.6 のファストモードバリアントが追加

#### バグ修正
- ネイティブツールのプレースホルダー補間修正
- Gemini: Flash の出力トークン上限を全プロバイダーで8192に統一
- Windows ユニットテストのパス正規化修正
- Windows でのフレーキーなフックテスト修正
- Bedrock: メッセージ変換とストリーミングで thinking / redacted_thinking ブロックを正しく処理
- `list_files` や `list_code_definition_names` がファイルパスを受け取った際のクラッシュ防止

#### 変更
- Markdown 画像の読み込みにユーザー同意が必要に
- Hooks 機能トグルの再導入

---

## 6. Kiro IDE v0.11

- **ウェブサイト**: https://kiro.dev
- **Changelog**: https://kiro.dev/changelog/
- **リリース日**: 2026-03-11（最新パッチ: 0.11.34 on 2026-03-13）

### 主な変更点

#### 新機能
- **MCP Registry Governance**: エンタープライズ管理者が JSON レジストリファイルで組織が使用する MCP サーバーを制御可能に。リモートおよびローカルサーバーをサポート
- **Model Governance**: 組織がモデルアクセス管理のトグルと承認済みモデルリストを Kiro コンソールから管理可能に。データレジデンシーコンプライアンスに対応
- **ドキュメント添付機能**: チャットメッセージに最大5つのドキュメント（PDF、CSV、DOC、DOCX、XLS、XLSX、HTML、TXT、Markdown）をネイティブドキュメントブロックとして直接添付可能

#### 改善
- サブエージェントのコンテキストにファイルツリー構造を追加
- チャットパフォーマンスの向上（再レンダリング削減）
- 500MB 閾値での自動セッションストレージクリーンアップ
- Web fetch でJavaScript重視のページ向けレンダリングモードをサポート

#### バグ修正
- 同時チャットセッションでの重複エージェントメッセージ解消
- ナビゲーション中のチャット入力テキスト消失を修正
- トークンリフレッシュループによるログイン再要求を修正

---

## 7. OpenAI Codex v0.112.0 / v0.113.0 / v0.114.0

- **リポジトリ**: https://github.com/openai/codex
- **リリース日**: v0.112.0 (2026-03-08) / v0.113.0 (2026-03-10) / v0.114.0 (2026-03-11)
- **リリースページ**: https://github.com/openai/codex/releases/tag/rust-v0.114.0

### v0.114.0 の主な変更点

#### 新機能
- **実験的コードモード**: より隔離されたコーディングワークフロー向けの新モード
- **実験的フックエンジン**: `SessionStart` と `Stop` フックイベントをサポート
- **WebSocket app-server のヘルスチェック**: `GET /readyz` と `GET /healthz` エンドポイント追加
- **バンドルシステムスキル無効化スイッチ**: 設定でバンドルスキルを完全に無効化可能
- **ハンドオフ時のリアルタイムトランスクリプトコンテキスト**: ターン間の作業引き継ぎ時の継続性が向上
- **`$` メンションピッカーの改善**: Skills、Apps、Plugins を明確にラベリング

#### バグ修正
- Linux tmux クラッシュ修正
- 再開スレッドの進行中状態固定を修正
- 権限ハンドリングの改善

### v0.113.0 の主な変更点

#### 新機能
- **`request_permissions` ツール**: 実行中のターンがランタイムで追加権限を要求可能に
- **プラグインマーケットプレイス拡充**: キュレーション済みマーケットプレイスの発見、リッチメタデータ、認証チェック付きインストール
- **ストリーミング対応の app-server コマンド実行**: stdin/stdout/stderr のストリーミングとTTY/PTYサポート
- **Web 検索の詳細設定**: フルツール設定（フィルタ、位置情報等）が可能に
- **新パーミッションプロファイル設定言語**: ファイルシステム/ネットワークのサンドボックスポリシーをより精密に制御

### v0.112.0 の主な変更点

#### 新機能
- **`@plugin` メンション**: チャットでプラグインを直接参照し、MCP/app/skill コンテキストを自動インクルード
- **モデルカタログ更新の表面化**: TUIピッカーフローに最新モデルカタログの変更を表示
- **実行権限プロファイルのサンドボックスポリシー統合**: zsh-fork スキル実行向けに安全な権限ハンドリング

---

## 8. GitHub Copilot CLI v1.0.4 / v1.0.5

- **リポジトリ**: https://github.com/github/copilot-cli
- **リリース日**: v1.0.4 (2026-03-11) / v1.0.5 (2026-03-13)
- **リリースページ**: https://github.com/github/copilot-cli/releases/tag/v1.0.5

### v1.0.5 の主な変更点

#### 新機能
- **`/pr` コマンド**: PR の作成・閲覧、CI 失敗の自動修正、レビューフィードバック対応、マージコンフリクト解決を支援
  ```
  /pr          # PRを作成
  /pr view     # PRのステータスを確認
  ```
- **`/extensions` コマンド**: CLI 拡張機能の表示、有効化、無効化が可能に
- **`/version` コマンド**: CLI バージョン表示とセッション内からの更新チェック
- **`/changelog` コマンド強化**: `last <N>`, `since <version>`, `summarize` オプションで複数のリリースノートを閲覧・要約
- **`write_agent` ツール**: バックグラウンドエージェントにフォローアップメッセージを送信し、マルチターン対話が可能に
- **実験的な埋め込みベース動的検索**: ターンごとにMCPとスキル指示を動的に取得
- **`preCompact` フック**: コンテキストコンパクション開始前にコマンドを実行
- **`@` ファイルメンションの拡張**: プロジェクト外のパスをサポート（絶対パス `@/usr/...`、ホームディレクトリ `@~/...`、相対親パス `@../...`）
- **`/diff` のシンタックスハイライト**: 17言語対応

#### バグ修正・改善
- ターミナルタイトルの `/clear` / `/new` 後のリセット
- Windows での diff 表示の文字化け修正
- Kitty キーボードプロトコルのエスケープシーケンス修正
- `claude-sonnet-4.6` のデフォルトモデル設定の保持
- API リクエストIDのタイムラインへの表示（エラー発生時）

### v1.0.4 の主な変更点

#### 新機能
- **`session.shell.exec` / `session.shell.kill` RPC メソッド**: ストリーミング stdout/stderr 付きのシェルコマンド実行
- **OpenTelemetry インストルメンテーション**: エージェントセッション、LLM呼び出し、ツール実行のオブザーバビリティ
- **アダプティブカラーエンジン**: 動的カラーモードとインタラクティブテーマピッカー
- **`configure-copilot` サブエージェント**: MCP サーバー、カスタムエージェント、スキルをタスクツール経由で管理
- **`--reasoning-effort` CLI フラグ**: 推論エフォートレベルの設定
- **フック確認プロンプト**: ツール実行前に `ask` パーミッション決定でユーザー確認を要求可能
- **CommonJS 拡張機能サポート**: 拡張機能を `.cjs` モジュールとして記述可能
- **Azure DevOps リポジトリ識別**: セッションログでの対応
- **パスパーミッションダイアログ**: 一回限りの承認オプション追加

#### バグ修正・改善
- MCP OAuth 再認証の信頼性向上（Microsoft Entra ID対応含む）
- Autopilot モードの API エラー後のループ停止
- Windows での高速シェルコマンド（PowerShell プロファイル読み込みスキップ）
- `/pr open` が `/pr view [local|web]` に変更
