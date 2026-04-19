# Weekly Release Information (2026-04-13 〜 2026-04-19)

本レポートは、直近7日間（2026年4月12日〜4月19日）にリリースされた主要AI開発ツールのアップデート情報をまとめたものです。

---

## 1. google-gemini/gemini-cli

- **最新リリース**: v0.38.2 (2026-04-17)
- **前バージョン**: v0.38.1 (2026-04-15)、v0.38.0 (2026-04-14)
- **リポジトリ**: https://github.com/google-gemini/gemini-cli
- **リリースURL**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.38.2

### 主な変更点

v0.38.2 および v0.38.1 は、いずれも v0.38.0 に対するパッチリリースです。直近7日間のメインの変更点は、安定版メジャーリリースである v0.38.0 にまとめられています。

#### v0.38.2 (2026-04-17)
- cherry-pick によるパッチ修正 (PR #25585)

#### v0.38.1 (2026-04-15)
- cherry-pick によるパッチ修正 (PR #25466)

#### v0.38.0 の主要な新機能・改善 (2026-04-14)

**新機能**
- **ContextCompressionService の導入**: 長いコンテキストを自動圧縮するサービスが本体に組み込まれ、長時間セッションでの安定性が向上
- **背景メモリサービス (Background Memory Service)**: スキル抽出のためのバックグラウンドメモリサービスを追加 (PR #24274)
- **コンテキストを意識した永続的ポリシー承認 (Context-aware persistent policy approvals)**: 承認したツール操作の記憶範囲がより細かくなり、再確認回数を削減
- **トピック単位のコンテキスト分割 (split context)**: 会話を論理トピックで分割し、必要な部分のみ展開・折り畳み可能
- **選択的トピック展開 / クリック展開**: 任意のトピックヘッダーをクリックで展開／折り畳みできるUI
- **`/about`, `/help` コマンドの ACP 対応** (PR #24649, #24839)
- **環境変数のデフォルト値サポート**: CLI 設定で環境変数に既定値を指定できるように (PR #24469)
- **バックグラウンドプロセスの監視・検査ツール** (PR #23799)
- **compact tool output をデフォルト有効化**: ツール実行結果の表示がデフォルトでコンパクトに (PR #24510)
- **コピーモードのショートカットを Ctrl+G に変更** (従来は Ctrl+X)

**サンドボックス / セキュリティ**
- Linux sandbox の ARG_MAX クラッシュ修正（リファクタリング）
- Windows サンドボックスの信頼性向上と `__write` のネイティブ化
- Plan モードでのツールサンドボックス上書きをデフォルトに近づける
- Sandbox エラーマッチングとキャッシングの改善

**UI / UX**
- **TerminalBuffer モード**: 画面フリッカーを解消する新レンダリングモード (ただし v0.38.0 で default=false に戻された)
- 入力プロンプトのスクロールバー追加 (PR #21992)
- テーブル描画のスタイル修正
- Hook システムメッセージを UI に表示
- ロール別メトリクスを `/stats` に追加

**開発者への実用的影響**
- 長大な対話でもコンテキスト圧縮が自動で行われるため、手動での `/compact` の必要性が減少
- トピック単位の展開により、長大セッションでも必要な情報だけを素早く参照可能
- Windows サポートが強化され、`-S` シェバンや Vim/PATH 問題などの複数の Windows 固有バグが解消

---

## 2. anthropics/claude-code

- **最新バージョン**: 2.1.114
- **CHANGELOG 最終更新**: 2026-04-18
- **リポジトリ**: https://github.com/anthropics/claude-code
- **CHANGELOG URL**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### 主な変更点

直近7日間で 2.1.111 〜 2.1.114 までの4バージョンが公開されました。とくに **2.1.111** と **2.1.113** が機能追加の大きな節目です。

#### 2.1.114 (最新)
- agent teams のチームメイトがツール権限を要求した際の権限ダイアログクラッシュを修正

#### 2.1.113
- **ネイティブバイナリ配布へ移行**: CLI はバンドル JavaScript ではなく、プラットフォーム別のネイティブ Claude Code バイナリを spawn するようになった (optional dependency 経由)。起動速度の改善が期待される
- **`sandbox.network.deniedDomains` 設定を追加**: `allowedDomains` のワイルドカードで許可された場合でも、特定ドメインを明示的にブロック可能
  ```json
  {
    "sandbox": {
      "network": {
        "allowedDomains": ["*.example.com"],
        "deniedDomains": ["tracker.example.com"]
      }
    }
  }
  ```
- **Fullscreen モードの改善**: Shift+↑/↓ が選択範囲を拡張しつつビューポートをスクロール
- **readline 準拠の編集キー**: マルチライン入力で `Ctrl+A` / `Ctrl+E` が論理行頭・行末へ移動
- Windows: `Ctrl+Backspace` で直前の単語を削除
- **サブエージェントのタイムアウト**: ストリーム中に停止したサブエージェントは、10分後に明確なエラーで失敗 (サイレントハングを回避)
- **セキュリティ強化**:
  - macOS: `/private/{etc,var,tmp,home}` が `Bash(rm:*)` 許可ルールでも「危険削除対象」として扱われる
  - Bash deny ルールが `env` / `sudo` / `watch` / `ionice` / `setsid` で wrap されたコマンドにもマッチ
  - `Bash(find:*)` 許可ルールでも `find -exec` / `-delete` は自動承認しない
- **`/loop` の改善**: Esc で予定された起床をキャンセル可能
- **`/ultrareview` の高速化**: チェックを並列化し、起動時のダイアログに diffstat を表示
- Remote Control クライアントから `/context`, `/exit`, `/reload-plugins`, `@`-ファイル補完, `/extra-usage` が利用可能に

#### 2.1.111
- **Claude Opus 4.7 xhigh 公開**: `high` と `max` の中間に位置する新しい effort レベルを追加。`/effort`, `--effort`, モデルピッカーから利用可能
- **Auto モード**: `--enable-auto-mode` が不要に。Max 加入者は Opus 4.7 で Auto モード利用可能
- **`/effort` がインタラクティブスライダーに**: 引数なしで呼び出すと、矢印キーとEnterでレベル選択可能
- **「Auto (match terminal)」テーマ**: 端末の dark/light モードに自動追従
- **`/less-permission-prompts` スキル**: トランスクリプトを走査し、読み取り専用 Bash / MCP ツール呼び出しから `.claude/settings.json` 用の優先付き allowlist を提案
- **`/ultrareview` コマンド**: クラウド上で並列マルチエージェントによる包括的コードレビューを実行
  - 引数なし: 現在のブランチをレビュー
  - `/ultrareview <PR#>`: 指定した GitHub PR を取得してレビュー
- **Windows PowerShell ツール**: 段階的ロールアウト開始。`CLAUDE_CODE_USE_POWERSHELL_TOOL=1` で opt-in (Linux / macOS は `pwsh` 必須)
- **Read-only コマンドの自動許可拡張**: `ls *.ts` のような glob パターンや `cd <project-dir> &&` で始まるコマンドは権限プロンプト不要に
- **タイポ候補提案**: `claude udpate` → "Did you mean `claude update`?"
- **プランファイル名の改善**: ランダム語ではなくプロンプト由来 (例: `fix-auth-race-snug-otter.md`)
- **`/setup-vertex` / `/setup-bedrock` 強化**: `CLAUDE_CONFIG_DIR` に対応、「with 1M context」オプション提示
- **`/skills` メニューのトークン数ソート**: `t` キーで推定トークン数順にソート可能
- **`OTEL_LOG_RAW_API_BODIES`**: デバッグ用に完全な API リクエスト/レスポンスボディを OTel ログイベントとして出力

#### 2.1.112
- 「claude-opus-4-7 is temporarily unavailable」 (auto モード) の修正

**開発者への実用的影響**
- **セキュリティの大幅強化**: `rm` や `find` のエスケープハッチが塞がれ、`dangerouslyDisableSandbox` の勝手実行や Bash 多行コマンドでの UI スプーフィングなども修正。`.claude/settings.json` の allowlist で安全に自動化しやすい環境に
- **`/ultrareview` は PR レビュー業務で即戦力**: 引数なしで作業中ブランチを、番号指定で任意 PR を並列マルチエージェントでレビュー可能
- **Windows ユーザー向け体験の改善**: PowerShell ツールのロールアウト、ドライブレターパスの正規化など

---

## 3. Cursor

- **最新リリース**: Cursor 3.1 (2026-04-13, 4月15日更新あり)
- **Website**: https://cursor.sh
- **Changelog URL**: https://cursor.sh/changelog

### 主な変更点 (直近7日)

- **Canvases (4月15日追加)**: エージェントが作成可能なインタラクティブ可視化。テーブル、ボックス、ダイアグラム、チャートなどのファーストパーティコンポーネントで、ダッシュボードやカスタム UI を構築可能。生成されたアーティファクトは Agents Window のサイドパネルに表示
- **Tiled Layout (タイル型レイアウト)**: 現在のビューを複数ペインに分割し、複数のエージェントを並行して実行・管理可能。タブ切り替えなしに複数のエージェント会話で同時作業が可能
- **ボイス入力の強化**: バッチ speech-to-text 処理により、録音と文字起こしの信頼性・精度が向上。`Ctrl+M` で起動、新UI では波形可視化とタイマー表示
- **ナビゲーションの改善**: diff から特定ファイルの該当行へ直接ジャンプ。エディタのフル機能を保ったまま手動編集・コード探索が可能
- **ファイル検索フィルタ**: include/exclude フィルタにより、特定ファイルセットにスコープを限定した検索が可能
- **パフォーマンス最適化**: 大きな edit での dropped frames を 87% 削減、会話スクロールの滑らかさを改善

---

## 4. microsoft/vscode (GitHub Copilot Chat)

- **最新リリース**: v0.44.1 (2026-04-16)
- **リポジトリ**: https://github.com/microsoft/vscode
- **リリースURL**: https://github.com/microsoft/vscode/releases/tag/v0.44.1

### 主な変更点 (AI / Copilot 関連のみ)

このリリースはリポジトリ的には microsoft/vscode のアセットを含みますが、内容は GitHub Copilot Chat 拡張 (`GitHub.copilot-chat.0.44.1.universal.vsix`) の更新です。

- **Copilot バージョンの更新** (#310652)
- **Copilot 依存関係を 1.0.28 に更新** (#310361)

大きな機能追加というよりは、Copilot 本体および関連依存の追従アップデートです。

---

## 5. cline/cline

- **最新リリース**: v3.79.0 (2026-04-16)
- **リポジトリ**: https://github.com/cline/cline
- **リリースURL**: https://github.com/cline/cline/releases/tag/v3.79.0

### 主な変更点

**追加機能**
- **Claude Opus 4.7 モデルサポート**: 新モデル Opus 4.7 を Cline から利用可能に
- **Azure Blob Storage をストレージプロバイダとして追加**: チェックポイントや履歴などの保存先に Azure Blob Storage を選択可能に
- **`globalSkills` をリモート設定に追加**: 組織/リモート設定経由でグローバルに共有されるスキルを定義可能
- **Inline value reuse in user-level remote-config discovery**: ユーザーレベルのリモート設定検出で値のインライン再利用をサポート

**修正**
- Cline および Vercel API ハンドラの cache reflection 修正
- ターミナルコマンドが予期せず終了した際に `command_output` ask がスタックするバグを修正
- GLM, Hermes, XS モデルのシステムプロンプトに `use_subagents` を追加 (サブエージェント活用を促進)
- **アクションインジェクションのセキュリティリスクを修正**

**変更**
- 非推奨の evals ツールを削除

**開発者への実用的影響**
- Opus 4.7 対応により、Cline からも最新の Anthropic 推論モデルを活用可能に
- Azure Blob Storage サポートで、エンタープライズ環境の Azure 中心構成に統合しやすくなった
- `globalSkills` はチーム/組織でのスキル共有を容易にする重要な拡張

---

## 6. kiro.dev

- **最新リリース**: Claude Opus 4.7 対応 (2026-04-17)、Kiro CLI 2.0 ほか (2026-04-13)
- **Website**: https://kiro.dev
- **Changelog URL**: https://kiro.dev/changelog/

### 主な変更点 (直近7日)

#### 2026-04-17: Claude Opus 4.7 サポート
- **Opus 4.7 対応**: 「より強力なエージェンティックコーディング、より精密な指示追従、3倍高解像度のビジョン」を特徴とする Opus 4.7 を Kiro から利用可能に
- **1M トークンコンテキスト**、クレジット倍率は 2.2x
- Pro 以上の加入者を対象に AWS IAM Identity Center 経由で段階的にロールアウト (現時点では実験的提供)

#### 2026-04-13: Kiro CLI 2.0 ほか
- **Kiro CLI 2.0 を Windows ネイティブサポートへ拡張**
- **ヘッドレスモード**: CI/CD 自動化での利用を念頭に追加
- **ターミナル UI がデフォルトインターフェースに**
- **サブエージェント機能**: タスク依存関係 (task dependencies) をサポート
- **コンソール拡張**: Users / Subscriptions タブにメール列を追加し、IAM Identity Center ユーザーの識別を容易に

---

## 7. openai/codex

- **最新リリース**: 0.122.0-alpha.10 (2026-04-18, プレリリース)
- **リポジトリ**: https://github.com/openai/codex
- **リリースURL**: https://github.com/openai/codex/releases/tag/rust-v0.122.0-alpha.10

### 主な変更点

直近7日間で alpha.7 〜 alpha.10 まで複数のアルファリリースが継続的に公開されています。リリースノート自体は「Release 0.122.0-alpha.10」のみで詳細変更点の記載はなく、配布物として各種プラットフォーム向けバイナリ、npm パッケージ、SDK (`codex-sdk-npm-0.122.0-alpha.10.tgz`)、Responses API proxy、Windows sandbox setup、zsh 補完などが含まれています。

**配布アセットから読み取れるトピック**
- **Windows sandbox setup バイナリ** (aarch64 / x86_64): Windows 向けサンドボックス環境のセットアップツール
- **codex-responses-api-proxy**: Responses API のプロキシバイナリ
- **codex-sdk-npm**: SDK の npm 配布
- **zsh 補完バイナリ** (codex-zsh): シェル補完サポートの拡充
- **argument-comment-lint**: 引数コメントの linter バイナリ

0.122.0 系はアルファ段階のため、正式版リリース時の詳細なチェンジログに注意が必要です。

---

## 8. github/copilot-cli

- **最新リリース**: v1.0.32 (2026-04-17)
- **リポジトリ**: https://github.com/github/copilot-cli
- **リリースURL**: https://github.com/github/copilot-cli/releases/tag/v1.0.32

### 主な変更点

**新機能**
- **短いセッション ID プレフィックス (7文字以上の hex)** を `--resume` と `/resume` で利用可能に (フル ID 不要)
- **モデル `auto` の選択**: セッションごとに最適なモデルを Copilot が自動選択
- **`--print-debug-info` フラグ**: バージョン、ターミナルの capability、環境変数を表示
- **使用量警告**: 週次使用量の 75% / 90% 接近時に警告を表示
- **ドキュメントファイル添付サポート**: サポートされる文書ファイルをプロンプトに添付し、エージェントが読み取り・推論可能
- **`--connect` フラグ**: リモートセッションへ ID で直接接続
- **`--session-idle-timeout`**: セッションのアイドルタイムアウトを設定可能 (デフォルトは無効)

**改善 / 修正**
- `/feedback` は作業ディレクトリが書き込み不可の場合、バンドルを TEMP に保存
- `copilot login --host` が GitHub Enterprise Cloud (GHE) インスタンスで正しく認証
- エージェントコンテキストの現在日時にローカルタイムゾーンオフセットを追加
- ターミナルのプログレスインジケータがエージェント思考中も表示され続ける
- Neovim など一部端末での `/clear` 後の Unicode グリフ残り修正
- `/cd` でディレクトリ変更後の Rewind が正しく動作
- `/plan` とプランモードでマルチライン入力が保持される
- 空入力時のみ Backspace でシェルモードを抜けるよう修正
- `/ask` ダイアログでのマウスホイールスクロール修正
- レート制限セッションではキューメッセージをドロップせず、一時停止して自動リトライ
- テーブル表示（列幅、絵文字、リサイズ時の境界線）修正
- レート制限エラーメッセージが制限種別に応じた具体的コンテキストを表示
- トークン制限を超過したスキルも、名前で発見・呼び出し可能

**開発者への実用的影響**
- 短縮セッション ID 対応によりスクリプトからの `--resume` 運用が容易に
- `--print-debug-info` により環境起因の問題報告が効率化
- 使用量警告とレート制限時の自動リトライにより、プラン上限周辺での運用がより安定

---

## まとめ

直近7日間は **Claude Opus 4.7 の各ツール対応 (Cline, Kiro)** と **Claude Code の機能ラッシュ (2.1.111 〜 2.1.114)** が特に大きなトピックでした。Claude Code はネイティブバイナリ化 (2.1.113)、`/ultrareview` コマンド追加 (2.1.111)、`xhigh` effort レベルの追加など実用的機能が多数投入されています。また、Cursor は「Canvases」「Tiled Layout」といった UI レベルの大きな刷新を行い、gemini-cli は ContextCompressionService の導入で長時間セッションの安定性を強化しました。GitHub Copilot CLI も `auto` モデル選択やセッション ID 省略など、日常運用での使い勝手を大きく改善しています。
