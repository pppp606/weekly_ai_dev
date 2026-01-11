# AIトレンドリポジトリ - 2026-01-11

ソース: https://github.com/trending?since=weekly

---

## [obra/superpowers](https://github.com/obra/superpowers)

### 概要

Claude CodeやCodex、OpenCodeといったコーディングエージェントを使っていると、「とりあえずコードを書き始めてしまう」という問題に直面することがある。要件を詰めないまま実装に入り、後から大幅な手戻りが発生する。Superpowersは、この問題をワークフローの強制という形で解決しようとするスキルライブラリだ。

面白いのは、このツールが「提案」ではなく「強制」として機能する点。エージェントがコードを書こうとすると、まず「brainstorming」スキルが発動して設計の対話が始まる。設計が固まるまでコードは一行も書かれない。設計承認後は「writing-plans」で実装計画が作成され、各タスクは2〜5分で完了できる粒度に分解される。そして「subagent-driven-development」で、各タスクを専門のサブエージェントが実行し、二段階のレビュー（仕様準拠チェック、コード品質チェック）を経て次に進む。

### 主な機能

- **brainstorming**: コーディング前に自動発動。設計を対話形式で詰め、承認されるまでコードを書かせない
- **using-git-worktrees**: 設計承認後に隔離されたワークスペースを作成し、クリーンなテスト環境を確保
- **writing-plans**: 実装計画を2〜5分単位のタスクに分解。各タスクには正確なファイルパス、完全なコード、検証ステップを含む
- **subagent-driven-development**: タスクごとに新しいサブエージェントを起動し、仕様準拠→コード品質の二段階レビューを実施
- **test-driven-development**: RED-GREEN-REFACTORサイクルを強制。テストより先にコードを書いたら削除される
- **finishing-a-development-branch**: タスク完了時にマージ/PR/継続/破棄の選択肢を提示し、ワークツリーをクリーンアップ

### 注目される理由

コーディングエージェントの生産性を語るとき、「いかに速くコードを書くか」に注目しがちだが、実際のプロジェクトでは「いかに手戻りを減らすか」の方が重要だ。Superpowersが提案するのは、エージェントに「急いでコードを書く」ことを許さず、設計→計画→実装→レビューという人間のソフトウェア開発のベストプラクティスを強制する仕組みだ。

特に効果的なのは、サブエージェント駆動開発のアプローチだろう。各タスクを独立したサブエージェントに割り当てることで、コンテキストの汚染を防ぎ、一つのタスクの失敗が他に波及しない設計になっている。作者によれば、Claudeが数時間にわたって計画通りに自律動作することも珍しくないという。

Claude Codeのプラグインマーケットプレースから`/plugin install superpowers@superpowers-marketplace`で導入でき、CodexやOpenCodeにも対応している。16,500以上のスターを獲得しており、「エージェントを賢く使う」ためのメタツールとして定着しつつある。

**リンク**:
- リポジトリ: https://github.com/obra/superpowers
- マーケットプレース: https://github.com/obra/superpowers-marketplace
- ブログ記事: https://blog.fsck.com/2025/10/09/superpowers/

---

## [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)

### 概要

AIコーディングエージェントがブラウザを操作できるようになってきたが、「デバッグ」となると話は別だった。ページを開いてスクリーンショットを撮ることはできても、ネットワークリクエストを検査したり、パフォーマンスボトルネックを特定したりするには、人間が手動でDevToolsを開く必要があった。Chrome DevTools MCPは、この壁を取り払うMCPサーバーだ。

このツールは、Chrome DevToolsのフルパワーをAIエージェントに開放する。Puppeteerでブラウザを制御しながら、パフォーマンストレースの記録と分析、ネットワークリクエストの検査、コンソールメッセージの取得、JavaScriptの評価まで、開発者がDevToolsで行う操作のほとんどをエージェントが実行できるようになる。

### 主な機能

**入力自動化（8ツール）**
- click, drag, fill, fill_form, handle_dialog, hover, press_key, upload_file

**ナビゲーション（6ツール）**
- close_page, list_pages, navigate_page, new_page, select_page, wait_for

**エミュレーション（2ツール）**
- emulate, resize_page（デバイスエミュレーションとビューポート調整）

**パフォーマンス（3ツール）**
- performance_start_trace, performance_stop_trace, performance_analyze_insight

**ネットワーク（2ツール）**
- list_network_requests, get_network_request

**デバッグ（5ツール）**
- evaluate_script, list_console_messages, get_console_message, take_screenshot, take_snapshot

### 注目される理由

AIエージェントによるWeb開発支援は、これまで「コードを書く」フェーズに集中していた。しかし実際の開発では、パフォーマンス最適化やバグ調査に多くの時間を費やす。Chrome DevTools MCPは、エージェントの活躍の場を「実装」から「デバッグ・最適化」へと広げる重要なピースだ。

実用的なのは、既存のMCPクライアントとの統合の容易さだ。Gemini CLI、Claude Code、Cursor、Copilot、VS Codeなど、主要なツールに対応しており、JSON設定ファイルに数行追加するだけで利用できる。「Check the performance of https://example.com」と指示すれば、エージェントがブラウザを開き、パフォーマンストレースを記録し、ボトルネックを特定してレポートしてくれる。

Chrome公式（ChromeDevTools org）からのリリースという信頼性も見逃せない。Apache 2.0ライセンスで公開されており、20,000以上のスターを獲得。コーディングエージェントのツールセットとして、事実上の標準になりつつある。

**リンク**:
- リポジトリ: https://github.com/ChromeDevTools/chrome-devtools-mcp
- npm: https://npmjs.org/package/chrome-devtools-mcp
- ツールリファレンス: https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md

---

## その他の注目リポジトリ

今週のTrendingでは、以下のAI関連リポジトリも注目を集めていた。

| リポジトリ | 概要 |
|-----------|------|
| [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) | Claude Codeの自律開発ループを実現するツール。インテリジェントな終了検出とレート制限で、エージェントが目標達成まで自動的に反復実行 |
| [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | アナリスト、クオンツ、AIエージェント向けの金融データプラットフォーム。58,000スター超の人気プロジェクト |

---

*Source: [GitHub Trending (Weekly)](https://github.com/trending?since=weekly)*
