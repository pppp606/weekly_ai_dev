# AIトレンドリポジトリ - 2026-01-04

ソース: https://github.com/trending?since=weekly

---

## [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban)

### 概要

Claude CodeやGemini CLI、Codexといったコーディングエージェントを日常的に使っている開発者なら、「複数のタスクを並行して進めたい」「エージェントの作業状況をまとめて把握したい」と感じたことがあるはずだ。Vibe Kanbanは、まさにその課題を解決するタスクオーケストレーションプラットフォームとして登場した。

このツールの発想はシンプルだ。コーディングエージェントは優秀だが、1つのタスクにしか集中できない。人間の開発者は複数のタスクを切り替えながら作業するのに、エージェントにはその柔軟性がない。Vibe Kanbanは、カンバンボード形式のUIでエージェントへのタスク割り当てを可視化し、複数エージェントの並列実行や逐次実行を制御できる管理レイヤーを提供する。

### 主な機能

- **マルチエージェント対応**: Claude Code、Gemini CLI、Codex、Ampなど、複数のコーディングエージェントをシームレスに切り替え可能
- **並列・逐次実行**: タスクの依存関係に応じて、エージェントを並列実行するか逐次実行するかを選択
- **リアルタイムモニタリング**: 各タスクの進捗状況をカンバンボード上でリアルタイムに確認
- **MCP設定の一元管理**: Model Context Protocolの設定を集約し、エージェント間で共有
- **リモートSSH対応**: リモートサーバー上のプロジェクトをSSH経由で開いて作業可能

### 注目される理由

コーディングエージェントの普及によって、開発者の生産性は確実に向上した。しかし、エージェントを「より賢く使う」ためのツールはまだ発展途上だった。Vibe Kanbanが今週だけで5,000近いスターを獲得したのは、この「メタレベルの課題」に正面から取り組んでいるからだろう。

特に実用的なのは、開発サーバーの起動やコードレビューまでをワークフローに組み込める点だ。エージェントにコードを書かせて、その結果を確認して、次のタスクを割り当てる、という一連の流れをVibe Kanban上で完結できる。単なるタスク管理ツールではなく、AIコーディングの「コックピット」として機能する設計になっている。

`npx vibe-kanban`の一発コマンドで起動でき、導入障壁が低いのも魅力だ。RustとTypeScriptで構築された堅牢なアーキテクチャで、Apache 2.0ライセンスのオープンソースとして公開されている。コーディングエージェントを複数プロジェクトで活用している開発者にとって、作業効率を大きく改善する可能性を持つツールだ。

**リンク**:
- リポジトリ: https://github.com/BloopAI/vibe-kanban
- ドキュメント: https://vibekanban.com/docs

---

## [google-gemini/computer-use-preview](https://github.com/google-gemini/computer-use-preview)

### 概要

Anthropicがcomputer useを発表して以来、「AIがコンピュータを直接操作する」というコンセプトが注目を集めている。GoogleがGemini向けに公開したcomputer-use-previewは、その流れを汲んだブラウザ自動化ツールだ。自然言語で指示を出すと、GeminiがWebブラウザを操作してタスクを実行してくれる。

仕組みとしては、Playwrightを使ってブラウザを制御し、スクリーンショットをGeminiに送信して次のアクションを判断させるエージェントループを構成している。「Googleで『Hello World』を検索して」といった指示を`--query`パラメータで渡すだけで、ブラウザが自動的に操作される。

### 主な機能

- **デュアルAPI対応**: Gemini Developer APIとVertex AIの両方で利用可能
- **ローカル・クラウド両対応**: ローカルのPlaywright実装に加え、Browserbaseクラウドブラウザもサポート
- **視覚フィードバック**: マウスカーソルのハイライト機能でデバッグを容易に
- **マルチステップ実行**: 複数のステップを伴う複雑なタスクも自然言語で指示可能

### 注目される理由

computer useの領域では、Anthropicのアプローチが先行していたが、Googleがオープンソースで公開したことで、開発者が実験しやすい環境が整った。特に、既にGemini APIを利用している開発者にとっては、追加のAPI契約なしでcomputer use機能を試せる点が魅力だ。

技術的には、まだプレビュー段階であり、ネイティブの`<select>`要素の操作など、OS依存の挙動で課題が残っている部分もある。しかし、AIがブラウザを「目で見て」操作するというパラダイムは、従来のDOM依存の自動化とは根本的に異なるアプローチだ。Web UIの構造が変わっても動作し続ける可能性があり、RPA的な用途での活用が期待される。

**リンク**:
- リポジトリ: https://github.com/google-gemini/computer-use-preview

---

## その他の注目リポジトリ

今週のTrendingでは、以下のAI関連リポジトリも注目を集めていた。

| リポジトリ | 概要 |
|-----------|------|
| [danielmiessler/Personal_AI_Infrastructure](https://github.com/danielmiessler/Personal_AI_Infrastructure) | 個人向けAI基盤を構築するためのフレームワーク。Claude CodeやOpenCodeなど複数のエージェントに対応した「PAI Packs」システムを提供 |
| [harvard-edge/cs249r_book](https://github.com/harvard-edge/cs249r_book) | ハーバード大学の機械学習システム入門教科書。TinyMLからエッジAIまでをカバーする包括的な教材 |

---

*Source: [GitHub Trending (Weekly)](https://github.com/trending?since=weekly)*
