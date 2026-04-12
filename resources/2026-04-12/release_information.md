# リリース情報まとめ（2026-04-05〜2026-04-12）

---

## 1. Gemini CLI v0.37.1

- **リリース日**: 2026-04-09
- **リポジトリ**: https://github.com/google-gemini/gemini-cli
- **リリースページ**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.37.1

### 主な変更点

バグフィックスと安定性向上を中心としたパッチリリース。

- `InvalidStreamError`の全タイプをプロンプト処理で適切にハンドリングするよう修正
- `/about`コマンドの追加（Gemini CLIの情報表示）
- `/help`コマンドの追加（ヘルプ情報の表示）

---

## 2. Claude Code v2.1.101 / v2.1.98

- **CHANGELOG更新日**: 2026-04-10
- **リポジトリ**: https://github.com/anthropics/claude-code
- **CHANGELOG**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### v2.1.101 の主な変更点

#### 新機能
- **`/team-onboarding`コマンドの追加**: ローカルのClaude Code使用状況からチームメイト向けオンボーディングガイドを自動生成
- **OS CA証明書ストアのデフォルト信頼**: エンタープライズTLSプロキシが追加設定なしで動作するように。`CLAUDE_CODE_CERT_STORE=bundled`でバンドルCAのみ使用可能
- **`/ultraplan`の自動環境作成**: リモートセッション機能がWebセットアップ不要でデフォルトのクラウド環境を自動作成

#### 改善
- Brief Modeの改善: プレーンテキスト応答時に構造化メッセージとして1回リトライ
- Focus Modeの改善: 最終メッセージのみ表示されることを前提に、より自己完結型のサマリーを生成
- ツール未利用エラーの改善: 理由と対処法を説明
- レート制限リトライメッセージの改善: どの制限に達したかとリセット時刻を表示
- `claude -p --resume <name>`がセッションタイトルを受け付けるように
- SDK `query()`のサブプロセスと一時ファイルのクリーンアップ改善

#### セキュリティ修正
- POSIX `which`フォールバックにおけるコマンドインジェクション脆弱性の修正

#### バグ修正（主要なもの）
- 長時間セッションでのメモリリーク修正（仮想スクローラーでのメッセージリスト保持）
- `--resume`/`--continue`の大規模セッションでのコンテキスト消失修正
- ハードコードされた5分のリクエストタイムアウトを`API_TIMEOUT_MS`で制御可能に
- `permissions.deny`ルールがPreToolUseフックの`permissionDecision: "ask"`で上書きされる問題を修正
- Bedrock SigV4認証のAuthorizationヘッダー競合の修正
- サブエージェントがMCPツールを継承しない問題の修正
- Grep toolのENOENTエラー時にシステム`rg`へフォールバックし自己修復

### v2.1.98 の主な変更点

#### 新機能
- **Google Vertex AIセットアップウィザード**: ログイン画面から「3rd-party platform」選択時にGCP認証、プロジェクト/リージョン設定をガイド
- **`CLAUDE_CODE_PERFORCE_MODE`環境変数**: 読み取り専用ファイルへのEdit/Writeを`p4 edit`ヒントで失敗させる
- **Monitor tool**: バックグラウンドスクリプトからのイベントストリーミング
- **サブプロセスサンドボックス**: Linux上のPID名前空間分離（`CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`設定時）
- **`--exclude-dynamic-system-prompt-sections`フラグ**: プリントモードでのクロスユーザープロンプトキャッシング改善

#### セキュリティ修正
- Bash toolの権限バイパス修正（バックスラッシュエスケープフラグによる任意コード実行）
- 複合Bashコマンドの強制権限プロンプトバイパスの修正
- `/dev/tcp/`・`/dev/udp/`リダイレクトのプロンプト追加

#### 改善
- `/agents`のタブレイアウト追加（Running/Libraryタブ）
- Vim mode: `j`/`k`でNORMALモードの履歴ナビゲーション対応
- Accept Editsモードの安全なenv var/プロセスラッパー付きコマンドの自動承認

---

## 3. Cursor - Bugbot Learned Rules & MCP対応

- **更新日**: 2026-04-08
- **Webサイト**: https://cursor.com
- **Changelog**: https://cursor.com/changelog

### 主な変更点

- **Bugbot Learned Rules**: プルリクエストへのフィードバックから学習したルールを生成し、将来のレビューを改善
- **MCPサーバーサポート**: Teams/Enterpriseプランでコードレビュー向けMCPサーバー対応を追加
- **解決率78%達成**: Bugbotの解決率が向上
- **「Fix All」アクション**: 複数の修正を一括適用する新機能
- **設定インターフェースの刷新**: パーソナルとチーム設定を分離
- **Bugbot Autofixの改善**: 重要な発見に対してのみ実行されるよう最適化

---

## 4. VS Code 1.115.0

- **リリース日**: 2026-04-08
- **リポジトリ**: https://github.com/microsoft/vscode
- **リリースページ**: https://github.com/microsoft/vscode/releases/tag/1.115.0
- **リリースノート**: https://code.visualstudio.com/updates/v1_115

### AI関連の主な変更点

#### VS Code Agents App（プレビュー）
エージェントネイティブ開発のための新しいコンパニオンアプリケーション。

- 複数リポジトリにまたがる並列エージェントセッション（各セッションは独自のworktreeで分離）
- アダプティブUIによるコンテキスト切り替え
- インラインdiffビューとフィードバック機能
- アプリ内からのプルリクエスト作成
- カスタム指示、プロンプトファイル、カスタムエージェントのサポート
- VS Code Insidersに同梱、コマンドパレットから起動可能

#### エージェント向けブラウザ統合の強化
- ツール呼び出しのラベル改善（ターゲットブラウザタブへの直接リンク付き）
- 「Run Playwright Code」ツールが5秒超のスクリプトを遅延結果ポーリングでサポート
- 重複ブラウザタブの抑制

#### エージェント向けターミナルツール
- **`send_to_terminal`ツール**: エージェントがバックグラウンドターミナルに入力を送信可能
- **自動通知（実験的機能）**: バックグラウンドターミナルのステータス変更でエージェントに自動通知

---

## 5. Cline v3.78.0

- **リリース日**: 2026-04-10
- **リポジトリ**: https://github.com/cline/cline
- **リリースページ**: https://github.com/cline/cline/releases/tag/v3.78.0

### 主な変更点

#### 追加
- **「Spend Limit Reached」エラーUI**: 利用上限到達時の専用エラー表示を追加
- ドキュメントの更新

#### 修正
- チャットUIで`read_file`の実際の行範囲を正しく表示するよう修正

---

## 6. Kiro IDE v0.11.131

- **更新日**: 2026-04-08
- **Webサイト**: https://kiro.dev
- **Changelog**: https://kiro.dev/changelog/

### 主な変更点

- 並列ツール操作中にエージェントチャットがスタックする問題を修正
- specタスクでPowers、MCPサーバー、スキルへのアクセスを復元
- エンタープライズユーザーに影響するMCPストリーミングコマンドの失敗を修正
- プロフィール情報の欠落によるサインイン問題の修正
- エンタープライズのテレメトリがコンテンツ収集状況を誤報告する問題の修正

---

## 7. OpenAI Codex v0.120.0 / v0.119.0

- **リリース日**: v0.120.0 = 2026-04-11、v0.119.0 = 2026-04-10
- **リポジトリ**: https://github.com/openai/codex
- **リリースページ（v0.120.0）**: https://github.com/openai/codex/releases/tag/rust-v0.120.0
- **リリースページ（v0.119.0）**: https://github.com/openai/codex/releases/tag/rust-v0.119.0

### v0.120.0 の主な変更点

#### 新機能
- **Realtime V2のバックグラウンドエージェント進捗ストリーミング**: 作業中にバックグラウンドエージェントの進捗をリアルタイムで表示し、アクティブレスポンス完了までフォローアップレスポンスをキューイング
- **フック活動表示の改善**: TUIでの実行中フックと完了済みフックの分離表示
- **カスタムTUIステータス行**: スレッドタイトルのリネーム結果を表示可能
- **Code-modeツール宣言**: MCP `outputSchema`の詳細を含めることで構造化ツール結果を型付け
- **SessionStartフック**: `/clear`と新規起動/再開セッションを区別可能

#### バグ修正
- Windowsの分割ファイルシステムポリシーでの昇格サンドボックス処理の修正
- シンボリックリンクされた書き込み可能ルートのサンドボックスパーミッション修正
- `codex --remote wss://...`のパニック修正（RustlsクリプトプロバイダーのTLS接続前インストール）
- ツール検索結果の順序保持（アルファベット順の再ソートを防止）

### v0.119.0 の主な変更点

#### 新機能
- **Realtime音声セッションのWebRTCデフォルト化**: v2 WebRTCパスがデフォルトに。トランスポート設定、音声選択、ネイティブTUIメディアサポート対応
- **MCP Appsの拡張サポート**: リソース読み取り、ツール呼び出しメタデータ、カスタムサーバーツール検索、サーバー駆動型elicitations対応
- **リモート/app-serverワークフロー**: egress WebSocketトランスポート、リモート`--cd`フォワーディング、sandbox対応ファイルシステムAPI、実験的`codex exec-server`サブコマンド
- **`Ctrl+O`でエージェント応答コピー**: SSH越しやクロスプラットフォームでのクリップボード動作改善
- **`/resume`のID/名前指定**: TUIからセッションにID/名前で直接ジャンプ可能
- **TUI通知のカスタマイズ**: Warp OSC 9サポート、ターミナルフォーカス時通知のオプトイン

---

## 8. GitHub Copilot CLI v1.0.22〜v1.0.24

- **リリース日**: v1.0.24 = 2026-04-10、v1.0.23 = 2026-04-10、v1.0.22 = 2026-04-09
- **リポジトリ**: https://github.com/github/copilot-cli
- **リリースページ（v1.0.24）**: https://github.com/github/copilot-cli/releases/tag/v1.0.24

### v1.0.24 の主な変更点

- **preToolUseフックの改善**: `modifiedArgs`/`updatedInput`と`additionalContext`フィールドを反映
- **カスタムエージェントモデルフィールド**: VS Codeからの表示名とベンダーサフィックスを受け付け（例: "Claude Sonnet 4.5", "GPT-5.4 (copilot)"）
- **ターミナル状態の復元**: CLIクラッシュ（OOMやsegfault）後にalt screen、カーソル、rawモードを正しく復元
- **`--remote`フラグの尊重**: GitHub repoでの初回実行時のセッション同期プロンプトで反映
- **終了画面のリデザイン**: Copilotマスコットとクリーンな使用状況サマリーレイアウト

### v1.0.23 の主な変更点

- **`--mode`、`--autopilot`、`--plan`フラグの追加**: 特定のエージェントモードで直接CLIを起動可能
  ```bash
  copilot --mode agent    # エージェントモードで起動
  copilot --autopilot     # 自動操縦モードで起動
  copilot --plan          # プランモードで起動
  ```
- **メモリバックエンド不可時のハング修正**: 初回ターンでエージェントが停止しないように
- **`Ctrl+L`でターミナル画面クリア**: セッションはクリアせずに画面のみクリア
- **スラッシュコマンドピッカーの改善**: フルスキル説明とスクロールバーの表示
- **実行中のエージェント操作**: `/diff`、`/agent`、`/feedback`、`/ide`、`/tuikit`がエージェント実行中に利用可能
- **推論トークン使用量の表示**: モデル別トークン内訳に推論トークン情報を追加
- **Remoteタブの改善**: Copilot coding agentタスクの正しい表示とTasks APIによるステアリング対応

### v1.0.22 の主な変更点

- **カスタムエージェントの`skills`フィールド**: 起動時にスキルコンテンツをエージェントコンテキストに事前ロード
- **プラグインのポストインストールメッセージ**: インストール後のセットアップ手順表示
- **`.mcp.json`への統一**: `.vscode/mcp.json`と`.devcontainer/devcontainer.json`のMCPサーバー設定ソースを廃止
- **サブエージェント深度・並行数制限**: 暴走するエージェント生成を防止
- **プラグインの永続化**: セッション間でプラグインが有効状態を維持し、起動時に自動インストール
- **MCP非標準JSONスキーマのサニタイズ**: 全モデルプロバイダーとの互換性確保
