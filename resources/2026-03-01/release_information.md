# リリース情報まとめ (2026-02-22 〜 2026-03-01)

---

## 1. Gemini CLI v0.31.0

- **リリース日**: 2026-02-27
- **リポジトリ**: https://github.com/google-gemini/gemini-cli
- **リリースページ**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.31.0

### 主な新機能

#### Gemini 3.1 Pro Previewサポート
- Gemini 3.1 Pro Previewモデルが利用可能に。ポリシーチェーンのサポートも追加され、新モデルでの安定した運用が可能。

#### 実験的ブラウザエージェント
- `feat(browser): implement experimental browser agent` により、Gemini CLIから直接ブラウザ操作が可能な実験的ブラウザエージェントが実装された。Webページのインタラクションやテスト自動化への活用が期待される。

#### Plan Modeの大幅強化
- **カスタムプラン保存ディレクトリ**: `plan.storageDirectory` 設定でプランの保存先を変更可能に
- **読み取り専用制約の強制**: Plan Mode中は書き込み系ツールが制限される
- **プラン実行後のサマリー生成**: プラン実行完了後に自動的に作業サマリーが生成される
- **自動モデル切り替え**: Plan Modeで自動的に適切なモデルに切り替え
- **手動退出時のメッセージ挿入**: ユーザーがPlan Modeを手動で抜けた際にコンテキストメッセージが挿入される

#### プロジェクトレベルポリシーサポート
- ワークスペース単位でのツール許可・拒否ポリシーを設定可能に。MCPサーバーのワイルドカードマッチングやツールアノテーションマッチングにも対応。
- 「Always Allow」の永続化がワークスペースレベルに変更。

#### セッションベースアーキテクチャへのリファクタリング
- SDKがセッションベースのアーキテクチャに移行。外部ツールやIDEとの統合がより柔軟に。

#### 読み取り専用ツールの並列実行
- `grep_search` → `read_file` のパイプライン化により、読み取り専用ツールの並列実行が可能に。ターン数の削減で応答速度が向上。

#### macOS通知サポート
- macOSでインタラクティブモード時にrun-event通知が表示されるように。

#### MCP進捗表示の改善
- MCPツール実行中にプログレスバー、スロットリング、入力バリデーションが追加。

#### Extensions Exploreコマンド
- `/extensions explore` コマンドで拡張機能の検索・インストールが可能に。

#### その他の注目機能
- `Alt+D` でカーソル前方の単語を削除
- `--resume` ヒントが終了時に表示される
- `/dir add` で追加したディレクトリが `@` オートコンプリートに反映
- 実験的な直接Web Fetch機能の実装
- `experimental.useOSC52Copy` 設定でOSC52コピーが利用可能
- RuntimeHook関数のサポート追加
- フォルダ信頼性の強化（設定ファイル検出とセキュリティ警告）
- `maxRetries` 設定で最大リトライ回数をカスタマイズ可能に
- Consecaセキュリティフレームワークの導入

### セキュリティ改善
- `web_fetch` ツールにDDoS対策のレート制限を追加
- ターミナル出力からの偽装Unicode文字の除去
- 偽装URL検出と開示機能の実装
- サンドボックスイメージパッケージの整合性チェック強化

### バグ修正（主要なもの）
- ripgrepパターンがflagに見える場合の失敗を修正
- 503 Service Unavailableをリトライ可能なクォータエラーとして処理
- 空の履歴アイテムの追加を防止
- OAuthサーバーの予期しないリクエストによるクラッシュを防止
- McpClientManagerの状態破損を防止

---

## 2. Claude Code v2.1.51 〜 v2.1.63

- **更新期間**: 2026-02-24 〜 2026-02-28
- **リポジトリ**: https://github.com/anthropics/claude-code
- **CHANGELOG**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### v2.1.63 (2026-02-28)

#### 新機能
- **`/simplify` と `/batch` バンドルスラッシュコマンド追加**: 新しいビルトインコマンドとして `/simplify`（コードの簡素化提案）と `/batch`（バッチ処理）が追加
- **HTTPフック対応**: シェルコマンドの代わりにURLにJSON POSTして応答を受け取るHTTPフックが利用可能に。外部サービスとの連携が容易に
- **プロジェクト設定とauto-memoryのワークツリー間共有**: 同一リポジトリのgitワークツリー間でプロジェクト設定と自動メモリが共有されるように
- **`ENABLE_CLAUDEAI_MCP_SERVERS=false` 環境変数**: claude.aiのMCPサーバーを無効化するオプション
- **`/model` コマンド改善**: 現在アクティブなモデルがスラッシュコマンドメニューに表示
- **MCP OAuth手動URLペーストフォールバック**: 自動リダイレクトが動作しない場合にコールバックURLを手動で貼り付け可能
- **「Always copy full response」オプション**: `/copy` ピッカーで「常に全レスポンスをコピー」が選択可能に
- **VSCode: セッションリネーム・削除アクション**: セッションリストからセッション名変更と削除が可能に

#### バグ修正・改善
- 多数のメモリリーク修正（ブリッジポーリング、MCP OAuth、パーミッションハンドラ、gitルート検出キャッシュ、JSON解析キャッシュ、チームメイトメッセージ蓄積、MCPサーバーフェッチキャッシュなど）
- サブエージェントの長時間セッションでのメモリ使用量改善（プログレスメッセージのペイロード圧縮）
- `/clear` でキャッシュされたスキルがリセットされない問題を修正

### v2.1.62 (2026-02-27)
- プロンプト提案キャッシュのヒット率低下リグレッションを修正

### v2.1.61 (2026-02-26)
- Windows環境での設定ファイル同時書き込みによる破損を修正

### v2.1.59 (2026-02-26)

#### 新機能
- **自動メモリ保存 (`/memory`)**: Claudeが有用なコンテキストを自動的にauto-memoryに保存。`/memory` コマンドで管理可能
- **`/copy` コマンド**: コードブロックが含まれる場合にインタラクティブピッカーを表示し、個別コードブロックまたは全レスポンスを選択してコピー可能
- **改善された「always allow」プレフィクス提案**: 複合bashコマンド（例: `cd /tmp && git fetch && git push`）に対してサブコマンドごとの賢いプレフィクスを計算

#### バグ修正
- MCP OAuthトークンリフレッシュの競合状態を修正
- 複数Claude Codeインスタンス同時実行時の設定ファイル破損を修正

### v2.1.58 (2026-02-25)
- Remote Controlをより多くのユーザーに拡大

### v2.1.56 (2026-02-25)
- VS Code: 「command 'claude-vscode.editor.openLast' not found」クラッシュの別の原因を修正

### v2.1.55 (2026-02-25)
- Windows環境でBashToolがEINVALエラーで失敗する問題を修正

### v2.1.53 (2026-02-25)

#### バグ修正
- ユーザー入力送信後のUIフリッカーを修正
- バルクエージェントキル（Ctrl+F）を単一の集約通知に修正
- `--worktree` が初回起動時に無視される問題を修正
- Windows環境での複数のクラッシュ修正（corrupted valueパニック、プロセス大量生成時、WASMインタープリタ、ARM64環境）

### v2.1.52 (2026-02-24)
- VS Code: Windows環境での拡張機能クラッシュを修正

### v2.1.51 (2026-02-24)

#### 新機能
- **`claude remote-control` サブコマンド**: 外部ビルド向けに全ユーザーがローカル環境サーブ可能に
- **BashToolのログインシェルスキップ**: シェルスナップショット利用時にデフォルトで `-l` フラグをスキップ、コマンド実行パフォーマンスが向上
- **カスタムnpmレジストリ対応**: プラグインのnpmソースからのインストール時にカスタムレジストリと特定バージョンピン留めに対応
- **マネージド設定のmacOS plist / Windows Registry対応**: macOS plistまたはWindowsレジストリ経由でマネージド設定が可能に
- **`/model` ピッカーの改善**: 人間が読みやすいラベル（例: "Sonnet 4.5"）でモデル表示、新バージョン利用可能時にアップグレードヒントを表示
- **`CLAUDE_CODE_ACCOUNT_UUID` 等の環境変数追加**: SDK呼び出し元がアカウント情報を同期的に提供可能に
- ツール結果の50Kへの閾値引き下げ（以前は100K）でコンテキストウィンドウ使用量を削減

#### セキュリティ修正
- `statusLine` と `fileSuggestion` フックコマンドがワークスペース信頼なしに実行可能だった問題を修正

---

## 3. Cursor

- **ウェブサイト**: https://cursor.sh
- **Changelog**: https://cursor.sh/changelog

### Bugbot Autofix (2026-02-26)
- PRに対して自動的にクラウドエージェントが実行され、問題を検出して修正を提案する機能。提案された変更の35%以上がマージされている実績。PR上のコメントでAutofix結果のプレビューが表示され、`@cursor` コマンドでマージしたり、自動ブランチ更新を設定可能。

### Cloud Agents with Computer Use (2026-02-24)
- クラウドエージェントが完全な開発環境を備えた隔離された仮想マシン上でソフトウェアを実行可能に。マージ可能なPRを生成し、動画・スクリーンショット・ログなどのアーティファクトを伴う。Web、デスクトップ、モバイル、Slack、GitHubなど複数プラットフォームに対応。

---

## 4. Cline v3.67.0 〜 v3.68.0

- **リポジトリ**: https://github.com/cline/cline

### v3.68.0 (2026-02-27)
- **リリースページ**: https://github.com/cline/cline/releases/tag/v3.68.0

#### 新機能
- **動的Clineプロバイダーモデルフェッチ**: Clineエンドポイントからのモデル情報の動的取得に対応
- **CLI Markdown表示強化**: CLIでのMarkdownフォーマットが改善
- **拡張機能フォーカスインジケーター**: アクションボタンにフォーカスインジケーターを追加

#### バグ修正
- OCA認証リフレッシュ失敗時の再認証ループを防止するため全シークレットをクリア
- "Could not find the file context" エラーの解決
- `yaml.load` にJSON_SCHEMAを使用して安全でないデシリアライゼーションを防止
- Claude 3.7+モデルの `maxTokens` 値を更新（Anthropic、Bedrock、Vertex、SAP AI Core）
- OpenRouterでハードコード値の代わりに `model.info.maxTokens` を使用

### v3.67.1 (2026-02-24)
- **リリースページ**: https://github.com/cline/cline/releases/tag/v3.67.1

#### 新機能
- **Cline SDK API**: プログラムからClineの機能やツールにアクセスするためのAPIインターフェースを追加。カスタムアプリケーションへの統合が可能に
- **Codex 5.3モデルサポート**: OpenAI Codex 5.3モデルに対応

#### バグ修正
- OpenAI Codexで `store` を `false` に設定して修正
- パス包含チェックに `isLocatedInPath()` を使用

### v3.67.0 (2026-02-24)
- **リリースページ**: https://github.com/cline/cline/releases/tag/v3.67.0

#### 新機能
- **サブエージェント設定でスキルとモデルID指定**: サブエージェントにスキルとオプションのmodelIdを設定可能に
- **AgentConfigLoader**: ファイルベースのエージェント設定を読み込むローダーを追加
- **OpenAI Responses APIサポート**: OpenAIネイティブプロバイダーでResponses APIに対応
- **WebSocketプリコネクト**: レスポンスレイテンシ削減のためWebSocketの事前接続を実装
- **`/q` コマンド**: CLIを終了するためのコマンドを追加
- **MCP企業設定**: MCPのエンタープライズ設定の詳細を追加
- **動的バナーキャッシュ**: バナーキャッシュ期間を調整する動的フラグを追加

#### バグ修正
- Gemini 3.1 Pro互換性の修正
- CLIのYOLOモードがディスクに設定を永続化しないよう修正
- Cline認証のACPフラグ修正

---

## 5. OpenAI Codex v0.106.0

- **リリース日**: 2026-02-26
- **リポジトリ**: https://github.com/openai/codex
- **リリースページ**: https://github.com/openai/codex/releases/tag/rust-v0.106.0

### 新機能

#### ダイレクトインストールスクリプト
- macOSとLinux向けのダイレクトインストールスクリプトが追加。GitHubリリースアセットとして公開され、既存のプラットフォームペイロード（`codex` と `rg` を含む）を利用してインストール可能。

```bash
# インストール例
curl -fsSL https://github.com/openai/codex/releases/download/rust-v0.106.0/install.sh | sh
```

#### App Server v2 Thread Realtime API
- スレッドスコープのリアルタイムエンドポイント・通知と、`thread/unsubscribe` フローが追加。ライブスレッドをアーカイブせずにアンロード可能に。

#### JS REPL実験的機能の昇格
- `js_repl` が `/experimental` に昇格。起動時の互換性チェックとユーザー向け警告が追加。最低Node.jsバージョンが `22.22.0` に引き下げ。

#### メモリ機能の改善
- Diff-basedフォーゲッティングと使用頻度に基づくメモリ選択で、より効率的なメモリ管理を実現。

#### その他
- `request_user_input` がDefaultコラボレーションモードでも利用可能に（Plan modeに限定されず）
- `5.3-codex` モデルがCLIモデルリストに表示されるように

### バグ修正
- リアルタイムWebSocketのタイムアウト関連HTTP 400ハンドシェイク失敗のリトライ改善
- zshフォーク実行パスでサンドボックスラッパーが消失する問題の修正
- TUIおよびApp Serverに約1M文字の入力サイズ上限を追加（巨大ペースト時のハング/クラッシュ防止）
- サブエージェントの `Ctrl-C` ハンドリングを修正

### パフォーマンス改善
- サブエージェント起動時のオーバーヘッド削減（履歴メタデータスキャンのスキップ）
- `steer` フィーチャーフラグの削除と常時有効パスへの標準化

---

## 6. GitHub Copilot CLI v0.0.419 〜 v0.0.420

- **リポジトリ**: https://github.com/github/copilot-cli

### v0.0.420 (2026-02-27)
- **リリースページ**: https://github.com/github/copilot-cli/releases/tag/v0.0.420

#### 主な変更
- **自動更新がバイナリ実行ファイルも更新**: 自動アップデートがJSパッケージだけでなくバイナリ実行ファイルも更新するように
- **`#` でGitHubリソースを参照**: `#` を入力してGitHubのIssue、Pull Request、Discussionを参照可能に
- プラグインとマーケットプレイスのgitリポジトリがforce-pushやtag-basedインストール後に正しく更新
- 502 Bad Gatewayエラーの自動リトライ（生HTMLの出力によるセッションクラッシュを防止）
- GhosttyでのmacOSコピーヒント改善

### v0.0.419 (2026-02-27)
- **リリースページ**: https://github.com/github/copilot-cli/releases/tag/v0.0.419

#### 主な変更
- **`/chronicle` コマンド（実験的）**: セッション履歴を活用した `standup`、`tips`、`improve` サブコマンドを追加。日々の開発活動のサマリー生成が可能
- **マウス操作の改善**: 左右スクロールが意図しないマウスボタン押下を引き起こさないよう修正
- **ページスクロールショートカット**: `Ctrl+F`/`Ctrl+B` でalt-screen表示のページダウン/アップが可能
- **`--mouse`/`--no-mouse` フラグ**: alt-screenでのマウスモードの有効/無効を制御
- **外部エディタでのプロンプト編集**: `Ctrl+G` ショートカットで外部エディタでプロンプトを編集可能
- **AUTO テーマ改善**: ターミナルの実際のANSIカラーパレットを使用してより正確な色表示
- **MCP改善**: MCP サーバー名でドット、スラッシュ、@文字をサポート（npm形式の名前 `@modelcontextprotocol/server` に対応）
- MCPサーバーのenv変数がcommand、args、cwdフィールドで参照された場合に自動的にサーバー環境に含まれる
- `/mcp enable` がビルトインサーバーの再有効化に対応
- `/diagnose` がセッション未開始時にヘルプメッセージを表示

---

## 7. Kiro IDE 0.10.32

- **ウェブサイト**: https://kiro.dev
- **Changelog**: https://kiro.dev/changelog/

### IDE 0.10.32 パッチ (2026-02-23)
- エージェントがspecおよびタスク実行中にファイルの書き込みや変更ができない問題を修正。spec駆動開発ワークフローでのファイル操作の信頼性が向上。
