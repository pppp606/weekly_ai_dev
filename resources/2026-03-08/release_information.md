# AI開発ツール リリース情報（2026-03-01〜2026-03-08）

## 1. Gemini CLI v0.32.0 / v0.32.1

- **リリース日**: v0.32.0（2026-03-04）、v0.32.1（2026-03-04 パッチ）
- **リポジトリ**: https://github.com/google-gemini/gemini-cli
- **リリースページ**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.32.0

### 主な新機能・変更点

#### エージェント機能の強化
- **Generalist Agent の有効化**: 汎用的なエージェント機能が利用可能に。サブエージェントの分類として `Kind.Agent` が導入され、エージェントツール間の並行処理（contiguous parallel admission）がサポートされた
- **A2A（Agent-to-Agent）ストリーミング**: 堅牢なA2Aストリーミング再組み立てとタスク継続性の修正が実装された。A2Aコンテンツ抽出も改善
- **タスクトラッカー基盤**: タスクの追跡と管理のための基盤サービスが実装された

#### プランモードの大幅改善
- **タスク複雑度に基づく適応的プランニング**: タスクの複雑さに応じてプランニングワークフローを自動調整
- **外部エディタでのプラン編集**: プラン承認時に外部エディタでプランファイルを開いて編集可能に
- **マルチセレクト対応**: プランのオプション選択時に複数選択をサポートし、各オプションの説明も表示
- **プランモードでの `/memory add` コマンド対応**

#### インタラクティブシェルの改善
- **シェルオートコンプリート**: インタラクティブシェルでのタブ補完機能が実装された
- **エクステンションの並列読み込み**: 起動時のエクステンション読み込みがパラレル化され高速化

#### モデル・設定関連
- **ワークスペースでのモデルステアリング**: ワークスペース設定からモデルを指定可能に
- **`model.name` 設定の永続化**: 設定ダイアログからモデル名を永続化できるようになった
- **`maxAttempts` 設定のサポート**: 設定経由でリトライ回数を制御可能に

#### エラーハンドリング・安定性
- **HTTP 499エラーのリトライ対応**: `RetryableQuotaError` としてマッピング
- **全認証タイプでのクォータエラーフォールバック**: 認証方法に関わらずクォータエラー時のフォールバックが動作
- **CPU 100%消費の孤立プロセス防止**: ターミナル終了時のプロセス管理を改善

#### その他
- **ワークスペースポリシー更新ダイアログの自動承認**: デフォルトで自動承認に変更
- **`grep_search` の `include` パラメータを `include_pattern` にリネーム**
- **テレメトリのOTEL対応強化**: トレースに追加属性を付与
- **エクステンションでのポリシーエンジンサポート**
- **G1 AI クレジットの超過フロー実装**: 課金テレメトリ付き
- **エラーメッセージの改善**

---

## 2. Claude Code v2.1.69 / v2.1.70 / v2.1.71

- **更新日**: 2026-03-03〜2026-03-07（CHANGELOG.md 複数回更新）
- **リポジトリ**: https://github.com/anthropics/claude-code
- **CHANGELOG**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### v2.1.71 の主な変更点

#### 新機能
- **`/loop` コマンド**: 定期的にプロンプトやスラッシュコマンドを実行する機能（例: `/loop 5m check the deploy` で5分ごとにデプロイ確認）
- **cronスケジューリングツール**: セッション内で定期実行プロンプトのスケジュール設定が可能に
- **`voice:pushToTalk` キーバインド**: `keybindings.json` でボイス起動キーを再バインド可能に（デフォルト: スペース）
- **bash自動承認リストの拡充**: `fmt`, `comm`, `cmp`, `numfmt`, `expr`, `test`, `printf`, `getconf`, `seq`, `tsort`, `pr` を追加

#### バグ修正
- 長時間セッションでのstdinフリーズ修正
- ボイスモード有効時の起動フリーズ（5〜8秒）修正（CoreAudio初期化がメインスレッドをブロック）
- claude.aiプロキシコネクタのOAuthトークン同時更新時のUI凍結修正
- `/fork` でプランファイルが共有される問題の修正
- Readツールで画像処理失敗時にオーバーサイズ画像がコンテキストに入る問題の修正
- heredocコミットメッセージを含むbashコマンドでの偽陽性パーミッションプロンプト修正
- 複数インスタンス実行時のプラグインインストール消失修正
- `--print` がチームエージェント設定時にハングする問題の修正

#### パフォーマンス改善
- ネイティブイメージプロセッサの遅延読み込みによる起動時間短縮
- スリープ復帰後のブリッジセッション再接続が数秒で完了（以前は最大10分）
- プラグインMCPサーバーの重複検出と自動スキップ

### v2.1.70 の主な変更点

#### バグ修正
- `ANTHROPIC_BASE_URL` 使用時のAPI 400エラー修正（サードパーティゲートウェイ対応）
- カスタムBedrock推論プロファイルでの `effort` パラメータエラー修正
- `ToolSearch` 直後の空レスポンス修正
- SSH接続時のEnterキーが改行になる問題の修正
- Windows/WSLでのクリップボード非ASCII文字化け修正（PowerShell `Set-Clipboard` 使用）

#### VS Code拡張
- アクティビティバーにスパークアイコン追加（全セッション一覧表示）
- プランのフルMarkdownドキュメントビュー（コメント追加対応）
- ネイティブMCPサーバー管理ダイアログ（`/mcp` コマンド）

#### パフォーマンス
- ターン中のプロンプト入力再レンダリングを約74%削減
- Remote Control `/poll` レートを10分に1回に削減（従来1〜2秒、サーバー負荷約300倍削減）

### v2.1.69 の主な変更点

#### 新機能
- **`/claude-api` スキル**: Claude APIとAnthropic SDKを使ったアプリケーション構築用スキル
- **Voice STT 10言語追加**: ロシア語、ポーランド語、トルコ語、オランダ語、ウクライナ語、ギリシャ語、チェコ語、デンマーク語、スウェーデン語、ノルウェー語（合計20言語）
- **`${CLAUDE_SKILL_DIR}` 変数**: SKILL.md内でスキルの自ディレクトリを参照可能
- **`InstructionsLoaded` フックイベント**: CLAUDE.mdやルールファイル読み込み時に発火
- **`sandbox.enableWeakerNetworkIsolation` 設定（macOS）**: `gh`, `gcloud`, `terraform` などのGoプログラムでカスタムMITMプロキシ使用時のTLS証明書検証を許可
- **`includeGitInstructions` 設定**: ビルトインのコミット・PRワークフロー指示をシステムプロンプトから除外可能
- **`/reload-plugins` コマンド**: 再起動不要でプラグイン変更を反映

#### セキュリティ修正
- gitignoreディレクトリ（`node_modules`等）からのスキル読み込み脆弱性修正
- `.mcp.json` サーバーの初回実行時サイレント有効化の修正
- シンボリックリンク経由のディレクトリ脱出修正（`acceptEdits` モード）

#### 大規模メモリリーク修正（多数）
- React Compiler `memoCache` のメモリリーク修正
- REPLレンダースコープのメモリリーク修正（1000ターンで約35MB）
- インプロセスチームメイトでの会話履歴固定によるメモリリーク修正
- フックイベント蓄積によるメモリリーク修正

---

## 3. Cursor（IDE 0.10.78 / Version 2.6 / JetBrains対応 / Automations）

- **リリース日**: 2026-03-03〜2026-03-05
- **ウェブサイト**: https://cursor.com
- **Changelog**: https://cursor.com/changelog

### Automations（2026-03-05）

- **常時稼働エージェントの導入**: ユーザー定義のトリガーと指示に基づいて動作する自動化エージェント機能
- **イベントトリガー対応**: Slack、Linear、GitHub、PagerDuty、Webhookからのイベントで起動可能
- **クラウドサンドボックス**: エージェントはクラウドサンドボックスをスピンアップし、設定済みMCPとモデルを使用
- **メモリツール**: エージェントが過去の実行から学習し、繰り返し改善する機能
- **テンプレート**: cursor.com/automations でクイックセットアップ用テンプレートを提供

### JetBrains IDE 対応（2026-03-04）

- **CursorがIntelliJ IDEA、PyCharm、WebStorm等のJetBrains IDEで利用可能に**
- Agent Client Protocol（ACP）経由で接続
- OpenAI、Anthropic、Google、Cursorのフロンティアモデルをサポート
- ACP Registryから直接インストール、既存Cursorアカウントで認証

### Version 2.6 - MCP Apps and Team Marketplaces（2026-03-03）

- **MCP Apps**: エージェントチャット内でインタラクティブUIを表示（Amplitudeのチャート、Figmaのダイアグラム、tldrawのホワイトボード）
- **Team Marketplaces**: Teams/Enterpriseプランの管理者がプライベートプラグインをガバナンス管理付きで内部共有
- デスクトップ改善15件（並列デバッグセッション、staleコードクリーンアップ、適応型インストゥルメンテーションログ、ブラウザツール改善等）
- デスクトップバグ修正10件

---

## 4. VS Code v1.110 / v1.110.1（February 2026）

- **リリース日**: v1.110（2026-03-04）、v1.110.1（2026-03-07）
- **リポジトリ**: https://github.com/microsoft/vscode
- **リリースページ**: https://github.com/microsoft/vscode/releases/tag/1.110
- **リリースノート**: https://code.visualstudio.com/updates/v1_110

### AI・Copilot関連の主な変更点

#### Agent Plugins（実験的）
- スキル、ツール、フックのプリパッケージバンドルをExtensionsビューからインストール可能
- `@agentPlugins` で検索可能
- 設定可能なプラグインマーケットプレイスとローカルパス対応

#### Agentic Browser Tools（実験的）
- エージェントがブラウザを自律操作してアプリと対話し、自身の変更を検証
- ページナビゲーション（`openBrowserPage`, `navigatePage`）
- コンテンツツール（`readPage`, `screenshotPage`）
- インタラクションツール（`clickElement`, `hoverElement`, `dragElement`, `typeInPage`, `handleDialog`）
- `runPlaywrightCode` によるカスタム自動化
- プライベート・インメモリセッション

#### Session Memory for Plans
- プランが会話ターンをまたいで永続化
- コンテキストコンパクション後も保持

#### Context Compaction
- `/compact` スラッシュコマンドで手動トリガー（カスタム指示付き）
- コンテキストウィンドウが満杯時に自動実行
- ローカル・バックグラウンド・Claudeエージェントセッションで利用可能

#### Explore Subagent
- コードベース探索専用の読み取り専用リサーチエージェント
- 高速モデル（Claude Haiku 4.5、Gemini 3 Flash）をデフォルトで使用

#### Fork Chat Sessions
- `/fork` で完全な履歴を引き継いだ独立セッションを作成
- 個別リクエストからチェックポイントベースのフォークも可能

#### Agent Debug Panel（プレビュー）
- チャットイベントとカスタマイズのリアルタイム可視化
- イベントシーケンスの階層チャートビュー

#### チャットからカスタマイズを作成
- `/create-prompt`、`/create-instruction`、`/create-skill`、`/create-agent`、`/create-hook` コマンド

#### Long-Distance Next Edit Suggestions（NES）
- カーソル近傍だけでなく、ファイル内の任意の場所での編集予測
- `github.copilot.nextEditSuggestions.extendedRange` で拡張レンジ設定

#### AI Co-Author Attribution
- AI生成コントリビューションへの自動 `Co-authored-by:` トレーラー
- git blame ホバーでco-author表示
- 設定: `off`（デフォルト）、`chatAndAgent`、`all`

#### Kitty Graphics Protocol
- 統合ターミナルで高精細画像を直接レンダリング

---

## 5. Cline v3.69.0 / v3.70.0 / v3.71.0

- **リリース日**: v3.69.0（2026-03-03）、v3.70.0（2026-03-04）、v3.71.0（2026-03-06）
- **リポジトリ**: https://github.com/cline/cline
- **リリースページ**: https://github.com/cline/cline/releases/tag/v3.71.0

### v3.71.0（2026-03-06）
- **GPT-5.4モデル対応**: ChatGPTサブスクリプションユーザー向けにGPT-5.4モデルを追加
- **Notification Hook**: アテンションと完了の境界を通知するフックを追加
- Streamable HTTP MCP再接続の信頼性向上

### v3.70.0（2026-03-04）
- **Cline API ドキュメント公開**: Getting Started、Auth、Chat Completions、Models、Errors、SDK Examplesのドキュメント
- **フックペイロード強化**: `model.provider` と `model.slug` を含むようになった
- **トークン/コスト更新のリアルタイム化**: ツール実行後ではなく、使用チャンク到着時に即時更新
- サブエージェントのコンテキストコンパクションロジック改善
- シリアライゼーションエラーのキャッチとログ（クラッシュ防止）
- OpenRouterリクエストからの不正な `max_tokens` 除去

### v3.69.0（2026-03-03）
- `User-Agent` ヘッダーをClineバックエンドリクエストに追加
- Cline SDKドキュメントのページ表示
- チェックポイントでのgit restoreリトライとサイレント `.git_disabled` 残留防止
- 中国語ファイル名のdiffビューでのエスケープ修正
- OpenRouterコンテキストオーバーフロー時の自動コンパクション
- GPT-OSSネイティブファイル編集のOpenAI互換モデルでの復元
- Windows PowerShellでのフックサポート改善

---

## 6. Kiro（IDE v0.10.78 / CLI v1.27）

- **リリース日**: CLI v1.27（2026-03-02）、IDE v0.10.78（2026-03-05）
- **ウェブサイト**: https://kiro.dev
- **Changelog**: https://kiro.dev/changelog/

### CLI v1.27（2026-03-02）
- **AI支援エージェント作成の簡素化**: `/agent create` コマンドがデフォルトでAI支援モードに（従来の `/agent generate` ワークフローを統合）
- **細粒度ツールトラスト**: シェルコマンドやファイル操作に対してスコープ付きパーミッションを設定するインタラクティブピッカー
- **セッション設定ツール**: 設定ファイルを編集せずに、会話中に設定を調整可能

### IDE v0.10.78（2026-03-05）
- **コンテキスト使用バナー**: モデルコンテキストウィンドウの消費量をリアルタイムで表示
- **警告システム**: カテゴリがコンテキストの30%を超えた場合にアラート
- **ターミナルフォーカス制御**: エージェントコマンド実行時の不要なパネルアクティベーション防止
- 複数のバグ修正（セッション履歴消失、Supervisedモードの信頼性向上）

---

## 7. OpenAI Codex v0.107.0 / v0.110.0 / v0.111.0

- **リリース日**: v0.107.0（2026-03-02）、v0.110.0（2026-03-05）、v0.111.0（2026-03-05）
- **リポジトリ**: https://github.com/openai/codex
- **リリースページ**: https://github.com/openai/codex/releases/tag/rust-v0.111.0

### v0.111.0（2026-03-05）
- **Fastモードがデフォルト有効**: TUIヘッダーにFast/Standardモード表示
- **`js_repl` でローカルESMファイルインポート対応**: `.js` / `.mjs` ファイルをREPLから動的インポート可能
- **プラグイン情報のセッション開始時通知**: 有効なMCP、アプリ、スキルのディスカバリー改善
- **MCP elicitation対応**: App-server v2でリクエスト/レスポンスフローとして公開
- **画像ワークフロー拡張**: 画像生成イベントのクライアント側処理対応
- スレッド再開時のgitコンテキストとアプリ有効状態の保持修正

### v0.110.0（2026-03-05）
- **プラグインシステム導入**: スキル、MCPエントリ、アプリコネクタをconfig/ローカルマーケットプレイスから読み込み
- **マルチエージェントフローの大幅拡張**: TUIでの承認プロンプト、`/agent` ベースの有効化、ロール付きハンドオフコンテキスト
- **`/fast` トグルの永続化**: TUIとApp-serverで `fast` / `flex` サービスティア対応
- **メモリ改善**: ワークスペーススコープ書き込み、設定名リネーム、staleファクト保存のガードレール
- **Windows直接インストーラースクリプト**
- `@` ファイルメンションでの `.gitignore` ルール修正
- サブエージェントの高速化・信頼性向上（シェル状態の再利用）

### v0.107.0（2026-03-02）
- **スレッドフォークによるマルチエージェント**: 現在の会話からサブエージェントに分岐可能
- **リアルタイム音声デバイス選択**: マイク・スピーカーデバイスの選択と永続化
- **カスタムツールのマルチモーダル出力**: 画像等の構造化コンテンツを返却可能に
- **メモリの設定可能化**: `codex debug clear-memories` コマンドでメモリ完全リセット
- **モデル可用性メタデータ**: プラン制限モデルのツールチップ表示
- `thread/resume` での保留承認・入力リクエストの復元修正
- diff レンダリングのテーマカラー対応改善
- MCP OAuth `resource` パラメータの正しい転送

---

## 8. GitHub Copilot CLI v1.0.2 / v0.0.423

- **リリース日**: v0.0.423（2026-03-06）、v1.0.2（2026-03-06）
- **リポジトリ**: https://github.com/github/copilot-cli
- **リリースページ**: https://github.com/github/copilot-cli/releases/tag/v1.0.2

### v1.0.2（GA記念メジャーバージョン更新）
- **メジャーバージョン1.0到達**: GitHub Copilot CLIが先週のGA（一般提供）を記念してバージョン1.0に
- `exit` コマンドでCLIを終了可能に
- `ask_user` フォームがEnterキーで送信可能、enumフィールドでカスタムレスポンス対応
- フック設定で `command` フィールドをbash/powershellのクロスプラットフォームエイリアスとしてサポート
- `timeout` を `timeoutSec` のエイリアスとして受付
- metaキーとcontrolキーの組み合わせ処理修正（shift+enter含む）

### v0.0.423（2026-03-06）
- **危険な展開・置換のガードレール**: 潜在的に危険なシェルコマンドの展開や置換のユースケースに対するプロンプト表示、悪意ある攻撃への追加ガードレール
- EMU・GHE CloudユーザーへのShare gist ブロック（明確なエラーメッセージ付き）
- Elicitation enum・booleanフィールドの確認操作改善（Enter確定、確認済み値に ✓ インジケータ）
- **MCPサーバーのURL訪問リクエスト**: OAuthフローやAPIキー入力などのアウトオブバンドインタラクション用URL表示対応
- Exploreエージェントの精度向上と大規模リポジトリサポート改善
- WindowsでのCRLF改行でのDiffモード表示修正
