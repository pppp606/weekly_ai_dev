# 週次リリース情報サマリー (2026-04-26 〜 2026-05-03)

## google-gemini/gemini-cli — v0.40.1 (v0.40.0 含む)

- **公開日**: 2026-04-30 (v0.40.1) / 2026-04-28 (v0.40.0)
- **リポジトリ**: https://github.com/google-gemini/gemini-cli
- **リリース URL**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.40.1 / https://github.com/google-gemini/gemini-cli/releases/tag/v0.40.0

### 概要
v0.40.1 は v0.40.0 の挙動修正パッチ (cherry-pick) のみ。実質的な機能追加は直前の **v0.40.0** に集中しています。

### v0.40.0 の主な変更

**新機能・改善**
- **`gemini gemma` ローカルモデルセットアップ**: ローカル実行のための合理化されたセットアップコマンドを追加。オフライン/ローカル開発の利便性が向上。
- **MCP リソース対応の新ツール**: `list` と `read` MCP リソースを扱うツールを core に追加。MCP サーバ側で公開された任意のリソース (ドキュメント・データ) をエージェントから直接取得可能に。
- **ripgrep バイナリの SEA 同梱**: スタンドアロン実行環境にも ripgrep を同梱しオフライン環境でも検索が動作。
- **`/new` を `/clear` のエイリアスとして追加**: セッションリセット操作を直感化。
- **Auto memory フラグの分離**: `memoryManager` フラグから `autoMemory` を分離し、メモリ機能の挙動を細かく制御可能に。
- **GitHub colorblind テーマ追加**: アクセシビリティ向上。
- **OSC 777 ターミナル通知対応**: 対応ターミナルでのデスクトップ通知を改善。
- **Vertex AI リクエストルーティング設定**: `Vertex` 経由利用時のルーティングを制御する設定を追加。
- **`@` レコメンドのファイル監視ベース更新**: 新規ファイルもリアルタイムに `@` 補完候補として検出。
- **トピック更新ナレーション機能を一般公開し、デフォルト有効化**: 進行中の作業内容を自然言語で随時要約。サブエージェントでは無効化。
- **メモリ編集を 4 階層のプロンプトドリブン方式にリファクタ**: `MemoryManagerAgent` を置換し、より柔軟・正確な記憶更新を実現。

**主なバグ修正・セキュリティ**
- **(セキュリティ) `.env` から IDE stdio を上書きできていた RCE を修正** (workspace `.env`)。
- **コマンドインジェクション (shell) を修正**。
- `GOOGLE_GEMINI_BASE_URL` / `GOOGLE_VERTEX_BASE_URL` の尊重。
- YOLO モードがダウングレードされていた問題を修正。
- Bun での detached モード無効化 (子プロセス即時 SIGHUP 防止)。

### 開発者へのインパクト
- 新たに追加された **MCP リソース取得ツール** により、MCP サーバ側で「読み取り可能リソース」を公開すれば、ドキュメントやスキーマをエージェントが自律的に読み込めます。例: 社内 API スキーマや設計ドキュメントを MCP リソースとして公開し、コーディング時に自動参照させる、といった構成が可能に。
- `gemini gemma` により Ollama 等を用いた **ローカル LLM 駆動の開発フロー** が組みやすくなりました。

---

## anthropics/claude-code — v2.1.126

- **公開日**: 2026-05-01 (CHANGELOG.md 最終更新)
- **リポジトリ**: https://github.com/anthropics/claude-code
- **CHANGELOG URL**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### 主な新機能

**`/model` ピッカーがゲートウェイの `/v1/models` をリスト**
- `ANTHROPIC_BASE_URL` が Anthropic 互換ゲートウェイを指している場合、ゲートウェイ側で公開されているモデルが `/model` ピッカーに自動列挙される。
- 自社 LLM プロキシや LiteLLM のようなゲートウェイ経由で複数モデルを使い分ける運用に直結。

**`claude project purge [path]` コマンド追加**
```bash
# プロジェクトの Claude Code 状態をすべて削除
claude project purge .                  # カレントプロジェクト
claude project purge --dry-run .        # 削除対象を事前確認
claude project purge -y .               # 確認なしで削除
claude project purge -i                 # 対話的に選択
claude project purge --all              # 全プロジェクト削除
```
削除対象: 会話トランスクリプト、タスク、ファイル履歴、設定エントリ。長期運用で肥大化したローカル状態を一括クリーンアップできる。

**`--dangerously-skip-permissions` の挙動変更**
- `.claude/`、`.git/`、`.vscode/`、シェル設定ファイル等への書き込み確認をバイパスするように変更 (ただし破滅的削除コマンドはセーフティネットとして引き続き確認)。
- CI/自動化環境で従来詰まっていた `.gitignore` 更新等のフローがスムーズに。

**`claude auth login` のターミナル貼り付け対応**
- WSL2 / SSH / コンテナなどブラウザコールバックが localhost に届かない環境で、ブラウザに表示された OAuth コードを **ターミナルに貼り付けて認証完了** できるように。リモート開発環境の認証障壁が解消。

**OpenTelemetry: スキル起動の可視化強化**
- `claude_code.skill_activated` イベントが **ユーザー起動のスラッシュコマンドでも発火**。
- `invocation_trigger` 属性 (`"user-slash"` / `"claude-proactive"` / `"nested-skill"`) によりスキル起動経路を分析可能。スキル利用率の社内モニタリングに活用しやすい。

**Windows: PowerShell 検出と既定シェル化の改善**
- Microsoft Store 版 PowerShell 7、PATH なし MSI、`.NET global tool` 経由インストールも検出。
- PowerShell ツールが有効な場合、Bash ではなく **PowerShell を主シェル** として扱うように変更。Windows ネイティブ運用の体験が大幅改善。

**ホスト管理デプロイのテレメトリ挙動修正**
- `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` 利用時に Bedrock/Vertex/Foundry でも analytics が自動無効化されないように。エンタープライズ管理下での観測性を確保。

### 主な不具合修正
- **セキュリティ**: 上位の managed-settings に `sandbox` ブロックがない場合に `allowManagedDomainsOnly` / `allowManagedReadPathsOnly` が無視されていた問題を修正。
- 2000px を超える画像貼り付けによるセッション破壊を、貼り付け時に自動ダウンスケールして修正。
- OAuth ログインのタイムアウト・IPv6 専用 devcontainer・スロー回線・低速プロキシでの失敗を修正。
- `Stream idle timeout` (Mac スリープ復帰後 / 長考中の偽陽性) を修正。
- Cursor および VS Code 1.92〜1.104 の統合ターミナルでのトラックパッドスクロール過剰問題を修正。
- Windows でのクリップボード書き込みがプロセス引数として EDR/SIEM に漏洩する問題を修正 (22KB 以上のセレクションも対応)。
- `context: fork` スキルの初回ターンで WebSearch/WebFetch 等の deferred ツールが利用不可だった問題を修正。

### 開発ワークフローへの影響
- **プロジェクトクリーンアップ** が CLI 一発で可能になり、長期運用時のメンテ負担が低減。
- **ゲートウェイ経由のマルチモデル切替** が `/model` から自然に行えるため、企業内 LLM プロキシの利便性が向上。
- **OAuth 認証フローの強化**で、リモート/コンテナ/WSL2 ユーザーの初期セットアップ離脱が大きく減ると見込まれる。

---

## microsoft/vscode — 1.118.0 / 1.118.1

- **公開日**: 2026-04-29 (1.118.0) / 2026-04-30 (1.118.1)
- **リポジトリ**: https://github.com/microsoft/vscode
- **リリース URL**: https://github.com/microsoft/vscode/releases/tag/1.118.0 / https://github.com/microsoft/vscode/releases/tag/1.118.1

> 1.118.1 は「VS Code から GitHub Copilot CLI が起動しない」障害の hotfix。実質的な機能追加は **1.118.0** にあり、AI/Copilot 関連が多数。

### Copilot / AI 関連の主な変更 (1.118.0)

**VS Code Agents アプリ (Insiders Preview)**
- Insiders タイトルバーから到達できる新エントリポイントを追加。
- VS Code 本体と認証・AI カスタマイズ・ワークスペース信頼・キーバインドを共有。
- **Claude エージェント**を Copilot CLI / Copilot Cloud と並んで統合。
- `insiders.vscode.dev/agents` から Web 経由でアクセス可、Dev Tunnel 対応。
- 統合ブラウザがセッション間で永続化、リフレッシュ不要。
- エージェント変更の **side-by-side diff とモーダル表示** を切替可能。

**Copilot CLI のリモートコントロール (Experimental)**
- 進行中の Copilot CLI セッションを GitHub.com やモバイルから監視・制御。
- 設定: `github.copilot.chat.cli.remote.enabled`
- コマンド: `/remote on`、`/remote` (状態確認)、`/remote off`

**Git 共著者の自動付与**
- ファイル変更時に Copilot を Git の co-author として自動付与 (デフォルト有効)。
- 設定: `git.addAICoAuthor`

**コードベース検索/コンテキスト**
- セマンティックインデックスを **GitHub/ADO 以外を含む全ワークスペース**に拡張 (`Build Codebase semantic index` コマンドで明示構築も可)。
- 新ツール `githubTextSearch`: GitHub 組織/リポジトリ横断の grep スタイル検索。既存の `githubRepo` (セマンティック) と相補。
- **Skills 用 Dedicated Context (Experimental)**: スキルを `context: fork` でサブエージェントコンテキストに分離。`github.copilot.chat.skillTool.enabled` で有効化。
- **MCP**: workspace レベル `.mcp.json` をサポート、同名 MCP サーバの自動重複排除。

**トークン効率化 (大幅改善)**
- **プロンプトキャッシュ**: アクティブなエージェントセッションでリクエストの **93% 超がキャッシュ再利用**。
- **Last-Two-Messages キャッシュ戦略**: `github.copilot.chat.anthropic.cacheBreakpoints.lastTwoMessages` で system prompt + tools + 直近 2 メッセージにキャッシュアンカー。
- **Tool Search Tool**: 約 30 のコアツールを常時利用可能とし、それ以外は要求時に semantic search で取得。Anthropic モデル (Claude Sonnet 4.5+/Opus 4.5+) でデフォルト有効、**最大 20% のトークン削減**。OpenAI モデル (GPT-5.4/5.5) にも `github.copilot.chat.responsesApi.toolSearchTool.enabled` で展開中。
- **Agentic Search Tool**: 専用ファインチューン小型モデルが並列検索を実行、最小ターン数で完了。
- **Agentic Execution Tool**: ターミナル実行を専用モデルが代行、呼び出しを 10 回/起動に制限し冗長出力を圧縮。

**チャット性能・履歴**
- **OpenAI Responses API の WebSocket 対応**: 永続接続でリクエストサイズ・レイテンシを削減、**OpenAI モデルで 12% 高速化**。設定不要。
- **Chronicle (Experimental)**: ローカル SQLite にチャット・セッションメタ・触ったファイル・参照 PR/Issue/コミットを記録。
  - `/chronicle:standup` — 直近 24 時間の作業を機能/ブランチ別にスタンドアップレポート化。
  - `/chronicle:tips` — 7 日間を分析しプロンプト/ツール利用の改善 Tips を提示。
  - `/chronicle [query]` — 自由文クエリで履歴検索。
  - 設定: `github.copilot.chat.localIndex.enabled`

**信頼性・セキュリティ**
- **承認済みアカウント組織ポリシー** (`ChatApprovedAccountOrganizations`) によりエンタープライズで承認 GitHub 組織所属者のみチャットを有効化、未検証時は fail-closed。
- **サンドボックス読取権限の縮小**: `$HOME` 配下を自動許可せず、明示的に必要なファイルのみ許可。

**アクセシビリティ・その他**
- 質問カルーセルから **⌥T (Alt+T)** でターミナルへフォーカス。
- `ms-vscode.vscode-chat-customizations-evaluations` 拡張: prompt files / agents / instructions / skills を診断・推奨。
- Dev Container Lockfile (`devcontainer-lock.json`) がデフォルト有効、Feature バージョン・チェックサム固定でサプライチェーン耐性を向上。

### 1.118.1 の修正
- VS Code から GitHub Copilot CLI が起動しない問題を修正。

---

## cursor — Team Marketplace / Security Review / SDK (今週の 3 リリース)

- **対象期間内のリリース日**: 2026-05-01, 2026-04-30, 2026-04-29
- **公式サイト**: https://cursor.com (旧 https://cursor.sh)
- **Changelog URL**: https://cursor.com/changelog

### 2026-05-01 — Team Marketplace のアップデート
- 管理者がリポジトリ接続なしで **チームマーケットプレイス**を構築できるように。
- マーケットプレイス設定から **first-party プラグイン**を直接管理可能。
- 配布モードは 3 種:
  - **Default Off**: ユーザーが任意で有効化。
  - **Default On**: デフォルトでインストール、オプトアウト可。
  - **Required**: 強制配布、ユーザー側で削除不可。
- 大規模チームでの社内ツール標準化を、リポジトリ階層に縛られず実施できる。

### 2026-04-30 — Cursor Security Review (Beta)
- Teams / Enterprise 向けセキュリティレビュー機能をベータ提供開始。
- 構成は 2 コンポーネント:
  - **Security Reviewer**: PR の脆弱性・インジェクションリスクをスキャン。
  - **Vulnerability Scanner**: 古い依存関係や設定不備を**スケジュール実行**で評価。
- どちらも追加指示でカスタマイズ可、既存セキュリティインフラと統合可能。
- Cursor 内で **PR レビュー段階のセキュリティチェック**まで完結する流れに。

### 2026-04-29 — Cursor SDK
- Cursor 本体と同じランタイム・ハーネス・モデルを使ってエージェントを構築できる **TypeScript SDK** をリリース。
- ローカル実行と Cursor クラウド実行のいずれにも対応。
- フロンティアモデルをサポート、料金は標準のトークン課金。
- 既存の独自エージェント構築フレームワーク (LangChain 系) に対し、Cursor の harness 自体をライブラリ化した点が独自性。社内エージェントを Cursor の挙動と互換性を保って構築可能。

---

## cline/cline — v3.82.0

- **公開日**: 2026-05-01
- **リポジトリ**: https://github.com/cline/cline
- **リリース URL**: https://github.com/cline/cline/releases/tag/v3.82.0

### 主な変更

**追加 (Added)**
- **VS Code フォアグラウンドターミナル**サポートと関連設定を復活。手動でコマンドを観察したいケースで有用。
- 最新の **OpenAI / SAP AI Core / Z AI モデル**を追加。エンタープライズ向け SAP AI Core 経由のプロビジョニングや、Z AI の最新モデル (GLM 系) が選択可能に。

**修正 (Fixed)**
- フックテンプレートの JSON エスケープを修正。
- ripgrep ファイル検索のエラーハンドリングを改善。

**変更 (Changed)**
- ドキュメントからハードコードされたモデルリストを削除 (常に最新モデル一覧が引かれるように)。

### 開発者へのインパクト
- VS Code フォアグラウンドターミナルが復活したことで、Cline がバックグラウンド実行するコマンドの **進捗を可視で追える** ワークフローが戻りました。
- SAP AI Core 対応により、SAP BTP を含むエンタープライズ環境での Cline 採用ハードルが下がります。

---

## openai/codex — rust-v0.128.0

- **公開日**: 2026-04-30
- **リポジトリ**: https://github.com/openai/codex
- **リリース URL**: https://github.com/openai/codex/releases/tag/rust-v0.128.0

### 主な新機能

**`/goal` ワークフローの永続化**
- アプリサーバ API、モデルツール、ランタイム継続、TUI コントロール (作成・一時停止・再開・クリア) を含む包括的な「ゴール」管理機能を追加。
- 長期にわたるタスクを目標として登録し、セッションをまたいで進捗を保持・再開できる。中断・再開を多用する開発フローに直結。

**`codex update` コマンド追加**
- CLI 内から自身を更新可能に。インストールスクリプトを再走させる手間が解消。

**TUI 体験の強化**
- 設定可能なキーマップ (`fcoury-oai`)。
- プランモードのナッジ (composer ドラフトからプランモードを提案)。
- アクションが必要な状態でターミナルタイトルに表示。
- アクティブなターン中でも `/statusline` と `/title` の編集が可能。

**Permission profiles の拡充**
- 組み込みデフォルトプロファイルを追加。
- サンドボックス CLI のプロファイル選択、cwd コントロール、アクティブプロファイルメタデータをクライアントに公開。
- `--full-auto` を **deprecated** とし、明示的なパーミッションプロファイルと信頼フローへ誘導。エンタープライズ向け権限管理の刷新。

**プラグイン・MCP**
- マーケットプレイスインストール、リモートバンドルキャッシュ、リモートアンインストール。
- プラグイン同梱フックの発見、フック有効化状態の永続化。
- 外部エージェント設定のインポート (バックグラウンドインポート、imported-session タイトルハンドリング含む)。

**MultiAgentV2**
- スレッド上限・待機時間の設定、root/subagent ヒント、v2 専用の depth ハンドリングを明確化。

**ドキュメント・スキル**
- 同梱 OpenAI Docs スキルが **GPT-5.5 と `gpt-image-2`** に対応、アップグレードガイダンスを刷新。

### 主なバグ修正
- 古い割り込みハングや永続化されたプロバイダの復元、巨大なリモートレジューム応答、フィルタ済みレジュームリストの遅さなど、レジューム/中断系の修正。
- TUI のターミナルリサイズリフロー、Markdown リスト間隔、スラッシュコマンドポップアップ、シェルモード ESC 等。
- マネージドネットワークの遅延拒否、プロキシバイパスのデフォルト、解決済みターゲットチェック、IPv6 ホスト一致、`git -C` 承認の修正。
- Windows サンドボックス / PTY (pseudoconsole 起動、エレベーション、コアシェル環境変数、名前付きパイプ検証)。
- Bedrock の `apply_patch` 対応、GPT-5.4 reasoning レベル、Bedrock GPT-5.4 エンドポイント/モデル ID 更新。

### 開発者へのインパクト
- **`/goal`** 機能と `codex update` により、Codex が長期的な開発ループ (大規模リファクタ、長尺の調査) のセッション運用に耐えうる方向へ進化。
- **`--full-auto` の非推奨化と permission profiles** への移行は、エンタープライズ採用時の権限統制を改善する一方、既存スクリプトのアップデートが必要。

---

## github/copilot-cli — v1.0.40

- **公開日**: 2026-05-01
- **リポジトリ**: https://github.com/github/copilot-cli
- **リリース URL**: https://github.com/github/copilot-cli/releases/tag/v1.0.40

### 主な変更

**追加・改善**
- **MCP サーバの `client_credentials` OAuth grant 対応**: ブラウザを使わない完全ヘッドレス認証が可能に (CI/サーバサイド連携で大幅な利便性向上)。
- **サブエージェントが自身のモデル**でツール検索サポートを評価 (親セッション設定を継承しない)。
- `/research` が **orchestrator/subagent モデル**を使用し、より徹底かつ信頼性の高いディープリサーチを実現。
- **オートパイロットモードの継続上限** をデフォルト 5 回に制限 (`--max-autopilot-continues` で変更可)。暴走防止。
- 自動更新時に **古い CLI パッケージをディスクから自動クリーンアップ**。
- リモートセッションのステータスラインが**リモートの作業ディレクトリ/ブランチを表示** (ローカルではなく)。
- セッション履歴・ファイル追跡・`/chronicle` コマンドが**全ユーザー**に開放。
- ACP クライアント (Zed 等) でスキルがスラッシュコマンドとして利用可能に。CLI と同等の体験。
- ACP クライアントから**カスタムエージェントの一覧表示・切替**が可能 (agent config オプション)。
- **Azure DevOps リポジトリを検出して GitHub MCP サーバを自動無効化**。
- ACP クライアントが**エージェントのライブプラン**を多段タスク進行時に表示。
- カスタムステータスラインの表示切替トグルをステータスラインピッカーに追加。
- リモートコントロールリンクが timeline で **完全な URL を表示** (旧: 'Open in browser')。
- `--config-dir` を deprecated とし、`COPILOT_HOME` を推奨。

**セキュリティ**
- **プロンプトモード (`-p`)**: リポジトリフック・ワークスペース MCP を **opt-in 環境変数** (`GITHUB_COPILOT_PROMPT_MODE_REPO_HOOKS`、`GITHUB_COPILOT_PROMPT_MODE_WORKSPACE_MCP`) でゲート。デフォルトでセキュアに。
- MCP OAuth トークンが、複数サーバが同 URL かつ異なる static OAuth クライアント ID を使う場合でも正しくキャッシュ。

**主な修正**
- PR ブランチ装飾がモデル名長に関係なくフッタに正しく表示。
- `/clear` と `/new` でアクティブなカスタムエージェント選択をリセット。
- アシスタント応答のストリーミングが滑らかに。
- `copilot plugin update` 後に `copilot plugin list` が正しいバージョンを表示。
- セッション切替時に保留メッセージが新セッションへ持ち越されない。
- 大きなファイル添付送信時に CLI が 100% CPU でハングする問題を修正。
- レジュームピッカーで Mission Control ベースの重複エントリを排除。
- Ctrl+C をプロンプトモード中に押した際に "Exiting…" を即時 stderr に出力。
- セッションレジュームが、前回 CLI プロセス異常終了後に「使用中」と誤検知される問題を修正。
- MCP ツール名にドットや無効文字が含まれる場合のサニタイズを修正。
- `Ctrl+C` と double-Esc が保留キューを一度に全消去せず**1 件ずつ**削除。
- スラッシュコマンド候補で **prefix マッチをファジーマッチより上位**にランク付け。
- `--config-dir` がプラグインサブコマンドへ正しく伝播。
- `/ask` 応答ダイアログ表示中もマウスセレクションが動作。
- カスタム CA 証明書の非同期ロードによる CLI 起動高速化。

### 開発者へのインパクト
- **`client_credentials` OAuth サポート**は、CI/サーバ間連携で MCP を使う際の最大級の改善。これまでブラウザ前提だったヘッドレス環境の MCP 認証が単純化される。
- **オートパイロット継続上限のデフォルト化**で、長尺自律実行のコスト・暴走リスクが管理しやすくなった。
- **`/chronicle` の全ユーザー開放**で、過去セッション横断の振り返り・ナレッジ抽出が標準化。
