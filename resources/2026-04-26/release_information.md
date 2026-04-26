# Release Information (2026-04-19 〜 2026-04-26)

調査対象期間: 2026-04-19 〜 2026-04-26（基準日: 2026-04-26）

---

## 1. google-gemini/gemini-cli `v0.39.1` (2026-04-24)

- リポジトリ: https://github.com/google-gemini/gemini-cli
- リリース: https://github.com/google-gemini/gemini-cli/releases/tag/v0.39.1
- 公開日: 2026-04-24

### 概要

`v0.39.1` は安定版ラインのパッチリリースで、`v0.39.0`（2026-04-23 公開）以降に取り込まれた累積的な修正を反映したもの。`v0.39.0` には数多くの新機能・改善が含まれている。

### 主な新機能・変更（v0.39.0 〜 v0.39.1）

- **`/memory inbox` コマンドの追加**: 抽出済みスキルをレビュー・適用するための新しい UI。`/memory inbox` で候補を確認し、必要なスキルだけをメモリに反映できる（PR #24544、#25148）。
- **subagent ツールの統合**: 個別のラッパーツールを廃止し、`invoke_subagent` という統一ツールに集約（PR #24489、#25053）。subagent 呼び出しの記録に `agentId` が永続化されるようになり、トレーサビリティが向上。
- **Plan Mode の改善**:
  - `activate_skill` 実行時にユーザー確認を必須化（PR #24946）。
  - サイレントなフォールバック付きのモデルルーティングを実装（PR #25317）。
  - ポリシー優先度を簡素化し、読み取り専用ルールを統合（PR #24849）。
- **エージェント体験**: `useAgentStream` フックを実装し、`AppContainer` に組み込み（PR #24292、#24297）。ツール出力の表示を制御する display protocol（Steps 2-3）も追加（PR #25134）。
- **MCP サーバー認証**: エージェント側の `mcpServers` 設定で `auth` ブロックをサポート（PR #24770）。
- **チャット記録のストリーミング化**: チャット履歴の保存を JSONL ベースのストリーミングに移行し、長時間セッションでのメモリ消費を改善（PR #23749）。
- **メモリリーク修正の集中投入**: subagent / OAuth / トレース / PTY / リスナーなど多数の箇所で発生していたメモリリークを修正（PR #25048、#24968、#25049、#25079、#25089）。
- **サンドボックス強化**:
  - macOS Seatbelt と Linux サンドボックスでパス解決を中央化（PR #24984、#24985、#25305）。
  - Windows サンドボックスでネイティブ ACL 適用による初期化高速化（PR #25077）。
  - Windows のシンボリックリンクバイパスを修正（PR #24834）。
- **UI / 入力**:
  - Windows Terminal で `Ctrl+Backspace` による単語削除が有効に（PR #21447）。
  - `Ctrl+Shift+G` のサポート（PR #25035）。
  - スクロールモメンタムの強化（PR #24447）。
  - `AskUser` の複数行回答でマウスクリックによるカーソル移動が可能に（PR #24630）。
- **コンテキストアーキテクチャ刷新**: `ContextManager` と Sidecar を分離した新アーキテクチャを導入（PR #24752）。

### 開発者への影響

- `/memory inbox` の追加により、AI が学習した「スキル」を**ユーザーが選別**してから反映する運用が可能になり、誤学習の混入を防ぎやすくなる。
- subagent 周りのリーク修正と統合により、長時間セッション・大規模プロジェクトでの安定性が向上。
- Plan Mode のスキル発動確認は、自動実行時の意図しない副作用を防ぐ重要な安全策。
- MCP `auth` ブロックのエージェント設定対応で、認証付きツールサーバーをエージェントごとに切り替えやすくなった。

---

## 2. anthropics/claude-code `2.1.119` (CHANGELOG 更新: 2026-04-25)

- リポジトリ: https://github.com/anthropics/claude-code
- CHANGELOG: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
- 最終更新: 2026-04-25

期間内に `2.1.116` 〜 `2.1.119` の 4 バージョンが反映された。代表的な新機能・変更は以下のとおり。

### 2.1.119（最新）

- **`/config` の永続化**: テーマ、エディタモード、verbose などの設定が `~/.claude/settings.json` に保存され、project/local/policy のオーバーライド優先順位に組み込まれるようになった。
- **`prUrlTemplate` 設定の追加**: フッターの PR バッジを `github.com` 以外のカスタムなコードレビュー URL に向けられるようになり、社内 GitLab/Bitbucket への対応が容易に。
  - 例: GitLab の MR、Bitbucket の PR、GitHub Enterprise PR URL のいずれも `--from-pr` で受け付ける。
- **`CLAUDE_CODE_HIDE_CWD` 環境変数**: 起動ロゴから作業ディレクトリを隠せる（スクリーン共有・配信向け）。
- **`--print` モードがエージェント frontmatter の `tools:` / `disallowedTools:` を尊重**: インタラクティブ実行時と同じ権限境界を非対話モードでも適用。
- **PowerShell の auto-approve**: 権限モードで PowerShell コマンドを Bash と同じく自動承認可能に。
- **Hooks の機能強化**: `PostToolUse` / `PostToolUseFailure` の入力に `duration_ms`（権限プロンプトや PreToolUse を除いたツール実行時間）を追加。
- **OpenTelemetry の拡張**: `tool_result` / `tool_decision` に `tool_use_id` を追加。`tool_result` には `tool_input_size_bytes` も。`status line` の stdin JSON に `effort.level` と `thinking.enabled` を追加。

### 2.1.118

- **Vim ビジュアルモード対応**: `v`（visual）/ `V`（visual-line）モードを追加し、選択・オペレータ・視覚的フィードバックをサポート。
- **`/usage` コマンド**: `/cost` と `/stats` を統合。`/cost` / `/stats` は引き続きショートカットとして動作。
- **カスタムテーマ機能**: `/theme` から名前付きテーマを作成・切り替え可能。`~/.claude/themes/` 配下の JSON を直接編集することもでき、プラグインも `themes/` ディレクトリでテーマを配布できる。
- **MCP ツールを Hooks から直接呼び出し**: `type: "mcp_tool"` で hooks から MCP を起動できるようになり、外部システム連携の柔軟性が向上。
- **`DISABLE_UPDATES` 環境変数**: `claude update` の手動実行を含むすべての更新経路を完全にブロックする厳格モード。`DISABLE_AUTOUPDATER` より強い。
- **`claude plugin tag` コマンド**: バージョン検証付きでプラグインのリリース git タグを作成。

### 2.1.117

- **`/model` 選択の永続化**: 再起動を跨いでもユーザーの選択が維持され、プロジェクト pin との関係が起動ヘッダーに表示されるように。
- **`/resume` の自動サマリ提案**: 古く・大きいセッションを再オープンする前に要約するか確認するフローを追加。
- **MCP サーバー並列接続**: ローカルと claude.ai 両方の MCP サーバーが設定されている場合の起動時間を短縮。
- **ネイティブビルドでの検索高速化**: macOS / Linux のネイティブビルドで `Glob` / `Grep` ツールが組み込みの `bfs` / `ugrep` 経由で動作し、別ツールラウンドトリップ無しで高速化。
- **デフォルトの reasoning effort 変更**: Pro/Max サブスクライバの Opus 4.6 / Sonnet 4.6 のデフォルトが `medium` → `high` に。

### 2.1.116

- **`/resume` の高速化**: 40MB 超のセッションで最大 67% 高速化。
- **`/terminal-setup` でのエディタスクロール感度設定**: VS Code / Cursor / Windsurf のターミナルでフルスクリーンスクロールが滑らかに。
- **思考表示のインライン化**: スピナーが "still thinking" / "thinking more" / "almost done thinking" と進行を表示。
- **セキュリティ修正**: sandbox auto-allow が `rm` / `rmdir` の `/`、`$HOME` などへの実行で安全性チェックをバイパスしないように修正。
- **配布元 URL の変更**: Claude Code 本体およびインストーラの配布元が `https://downloads.claude.ai/claude-code-releases` に変更。

### 開発者への影響

- 設定の永続化と環境変数の整理により、CI/配信・エンタープライズ環境での運用設計が大幅にしやすくなった。
- `prUrlTemplate` と `--from-pr` の拡張で、GitHub Enterprise / GitLab / Bitbucket を主に使うチームでも Claude Code のレビューフロー連携が現実的に。
- Vim ビジュアルモード、カスタムテーマ、MCP ツールフックなどエディタ体験の改良が多数。
- `tool_use_id` を含む OpenTelemetry 強化により、ツール実行のトレース・分析が大幅に容易に。

---

## 3. cursor (Cursor) `Cursor 3.2` (2026-04-24)

- Webサイト: https://cursor.com
- Changelog: https://cursor.com/changelog
- 公開日: 2026-04-24

### 主な新機能

- **`/multitask` コマンド（async subagents）**: リクエストをキューに積むのではなく、並列で実行できる subagent を起動。重い調査と軽い修正を同時並行で動かせるようになった。
- **強化された Worktrees**: 並行作業時の作業ツリー管理が改善され、subagent との組み合わせで複数タスクを物理的に分離して進められる。
- **Multi-root Workspaces 対応**: 「フロントエンド／バックエンド／共有ライブラリ」などをまたぐ変更を、1 つのワークスペース内で扱えるようになった。クロスリポジトリの修正を伴う作業でフリクションが減少。

### 開発者への影響

- 並列 subagent と multi-root workspace により、モノレポ・マルチレポ双方の大規模リファクタリングや横断調査の効率が向上。
- `/multitask` は「重い調査タスクをバックグラウンドで走らせつつ、別の小さな修正を進める」ようなインタラクティブな使い方が現実的に。

---

## 4. microsoft/vscode `1.117.0` (2026-04-22)

- リポジトリ: https://github.com/microsoft/vscode
- リリース: https://github.com/microsoft/vscode/releases/tag/1.117.0
- 公開日: 2026-04-22

> **注**: 本リリースの全体ノートのうち、AI / GitHub Copilot 関連のみを抜粋。

### 主な AI 関連機能

- **BYOK (Bring Your Own Key) for Copilot Business / Enterprise**: VS Code Chat から OpenRouter / Ollama / Google / OpenAI などの API キーを直接接続可能に。管理者はポリシー設定で利用可否を制御できる。
- **インクリメンタルなチャットレンダリング（実験的）**: チャット応答がブロック単位でストリーミングされ、fade / rise / blur / scale / slide / reveal のアニメーションを選択可能。
- **Agent Sessions ビューのソート機能**: 作成日時または最終更新時刻でセッションをソートでき、過去作業の再開が容易に。
- **バックグラウンドターミナルコマンドのシステム通知**: エージェントが実行する長時間ターミナルコマンドが、チャット応答内のシステム通知として表示される。
- **VS Code Agents App (Insiders)**: サブセッションの作成、インライン diff 描画の改善、テーミング強化、UX 全般のリファイン。
- **Copilot CLI ターミナルプロファイル拡張**: Copilot CLI をカスタムターミナルプロファイルから起動可能に。Copilot CLI / Claude Code / Gemini CLI などのエージェント CLI が、適切なターミナルタイトルを表示するように。

### 開発者への影響

- BYOK 対応により、ローカル LLM（Ollama）や OpenRouter 経由の好みのモデルを Copilot Chat の UI 経由で使えるようになり、ベンダーロックインを避けつつ Copilot の UX を享受できる。
- エージェント CLI の統合改善で、VS Code を「Copilot CLI / Claude Code / Gemini CLI」のハブとして使うワークフローが現実的に。

---

## 5. cline/cline `v3.81.0` (2026-04-24)

- リポジトリ: https://github.com/cline/cline
- リリース: https://github.com/cline/cline/releases/tag/v3.81.0
- 公開日: 2026-04-24

### 主な変更

- **追加**: OpenAI Codex サブスクライバ向けに **GPT-5.5 モデル**のサポートを追加。
- **修正**: webview の "What's New" のハードコードされたフォールバックを削除。リモート設定された welcome バナーのみを表示するように。
- **変更**: `cline-core` のメモリ診断を改善。
  - heap-limit 近接時の heap snapshot を有効化。
  - 定期的なメモリ使用量ロギングを追加。
  - 異常終了時に検出済みの heap snapshot をログ出力（OOM デバッグの助けに）。

### 開発者への影響

- GPT-5.5 サポートにより、Codex サブスクリプションを利用しているユーザーが Cline 内で最新モデルを選択できる。
- OOM 起因のクラッシュ調査が、メモリスナップショットとログの組み合わせで大幅に容易になる。

---

## 6. openai/codex `0.125.0` (2026-04-24)

- リポジトリ: https://github.com/openai/codex
- リリース: https://github.com/openai/codex/releases/tag/rust-v0.125.0
- 公開日: 2026-04-24

### 主な新機能

- **App-server Integrations 拡張**:
  - **Unix ソケットトランスポート**サポートの追加（PR #18255）。
  - ページネーションフレンドリーな resume / fork。
  - sticky environments とリモートスレッドの config / store 配管。
- **App-server プラグイン管理**: リモートプラグインのインストール、設定済みマーケットプレイスのアップグレードに対応（#18917、#19074）。
- **Permission Profiles の往復対応**: TUI セッション、ユーザーターン、MCP サンドボックス状態、シェルエスカレーション、app-server API すべてで permission profile が一貫してやり取りされるように（#18284〜#18287、#19231）。
- **モデルプロバイダーがモデル発見を所有**: AWS / Bedrock のアカウント状態を app クライアントに公開（#18950、#19048）。
- **`codex exec --json` で reasoning トークンの利用量を返す**: プログラムからの利用に向けた強化（#19308）。
- **Rollout Tracing 強化**: ツール／コードモード／セッション／マルチエージェントの関係をトレースに記録し、デバッグ用 reducer コマンドを追加（#18878〜#18880）。

### 主な修正

- `/review` 中断と TUI 終了の wedge を修正（#18921）。
- exec-server がプロセス終了後にバッファされた出力を取りこぼさないように修正（#18946、#19130）。
- WebSocket app-server クライアントが、ターン／ツール出力の通知バーストで切断されにくく（#19246）。
- Windows サンドボックスの起動が複数 CLI バージョンとインストールディレクトリに対応、Start-Process の PowerShell ウィンドウを非表示に（#19044、#19180、#19214）。

### 開発者への影響

- Permission profile が複数のレイヤーで一貫してやり取りされるようになり、エンタープライズでのアクセス制御設計が一段とやりやすくなった。
- App-server の Unix ソケット対応で、ローカルの IDE / カスタムフロントエンドとの統合がよりセキュアかつ低レイテンシになる。
- `codex exec --json` の reasoning トークン情報は、コスト集計や使用量モニタリングを内製している組織に直接効果がある。

---

## 7. github/copilot-cli `v1.0.36` (2026-04-24)

- リポジトリ: https://github.com/github/copilot-cli
- リリース: https://github.com/github/copilot-cli/releases/tag/v1.0.36
- 公開日: 2026-04-24

### 主な変更

- **`/keep-alive` の正式提供**: 実験モードを有効にしなくても、Copilot CLI 動作中はシステムスリープを抑止できる。
- **`/remote` コマンド**: 現在のリモートコントロールステータスを表示し、`/remote on` / `/remote off` でトグル可能に。
- **statusline トグル `changes`**: 現セッションでの追加／削除行数をステータスラインに表示。
- **サブコマンドピッカーに選択インジケータ**: ハイライト中の項目に `❯` を表示。
- **`preToolUse.matcher` の動作修正**: アップグレード後は、フックの `matcher` がツール名と完全に正規表現マッチした場合のみ動作する（破壊的変更に近い注意点）。
- **二重 Esc で in-flight ワークをキャンセル**: 誤って中断するのを防ぐ仕様に。
- **`.gitignore` 配下のカスタム命令ファイル**: `.github/instructions/` のようなパスでも正しくロードされるように。
- **`~/.claude/` の資産を読み込まない**: カスタムエージェント／スキル／コマンドが Claude 用と混在しないよう、Copilot CLI 側では読み込まないように。
- **複数 Copilot ライセンス検出時のエラーメッセージ改善**: 直接的なリンクを含む明確なメッセージに。
- **Claude Opus 4.6 のデフォルト reasoning effort**: `medium` に設定。
- **無効化されたスキル**: スラッシュコマンド一覧に表示されないように。
- **デバッグログ／フィードバックバンドル保存**: 既存アーカイブを上書きしないように修正。

### 開発者への影響

- `preToolUse.matcher` の挙動変更は、Copilot CLI のフックを既に運用しているプロジェクトでは影響が出るため、アップグレード前に正規表現を見直すのが安全。
- `/remote` のトグル UI 化と `/keep-alive` の通常提供化で、長時間ジョブを伴う実行がより扱いやすくなった。
- `~/.claude/` を共有資産として使っていたユーザーは、Copilot CLI と Claude Code で資産分離を意識する必要がある。

---

## 注記: kiro

`https://kiro.dev/changelog/` の確認では、最近 7 日以内の更新が検出されたものの内容が「Claude Code (CLI 2.1) の変更点」「Claude Opus 4.7 の利用可能化（4/17）」を整理した記事であり、**kiro 製品自体の独自リリースではない**ため、本レポートでは独立した項目として掲載していない。
