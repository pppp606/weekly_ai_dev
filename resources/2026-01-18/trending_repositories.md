# AIトレンドリポジトリ - 2026-01-18

ソース: https://github.com/trending?since=weekly

---

## [bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop)

### 概要

「画面を見て操作する」というアプローチでGUI自動化を実現するAIエージェントが、ByteDanceから登場した。UI-TARS-desktopは、Vision-Language Model（VLM）を使ってスクリーンショットを解析し、マウスクリックやキーボード入力を実行するマルチモーダルAIエージェントスタックだ。

従来のブラウザ自動化ツールはDOMセレクタやXPathに依存していたため、Webサイトの構造が変わるたびにスクリプトの修正が必要だった。UI-TARSは人間と同じように「画面を見て」操作するため、UIの見た目が変わらない限り動作し続ける。この「視覚ベース」のアプローチは、Anthropicのcomputer useと同じ発想だが、ByteDanceは独自のUI-TARS VLMモデルを開発し、GUIエージェントに特化した精度を追求している。

### 主な機能

- **Agent TARS**: CLIとWeb UIの両方で動作する汎用マルチモーダルエージェント。ブラウザ操作、ターミナル実行、ファイル操作を統合
- **UI-TARS Desktop**: ローカルPCのGUIを直接操作するネイティブアプリ。Windows、macOS、ブラウザに対応
- **ハイブリッドブラウザ制御**: VLMによるGUI操作とDOM操作を状況に応じて使い分け、精度と速度を両立
- **MCP統合**: Model Context Protocolに対応し、外部ツールとの連携が可能
- **リモート操作**: ローカルだけでなく、リモートPCやブラウザの操作にも対応

### 注目される理由

GUIエージェントの分野は、2025年後半から急速に熱を帯びてきた。Anthropicのcomputer use、Googleのcomputer-use-previewに続き、ByteDanceがUI-TARSで参入したことで、選択肢が一気に広がった。

UI-TARSの強みは、独自開発のVLMモデル（UI-TARS-1.5/1.6）にある。一般的なVLMではなく、GUIのスクリーンショット解析に特化したモデルを訓練しているため、ボタンやテキストフィールドの認識精度が高い。arxivで公開された論文によると、WebArenaやOSWorldといったベンチマークで競合を上回る精度を達成している。

実用面では、旅行サイトでのフライト予約、GitHubのissue操作、VS Codeの設定変更といった複雑なタスクをデモで披露している。`npx @agent-tars/cli@latest`の一発コマンドで試せる手軽さもあり、24,000以上のスターを獲得して急上昇中だ。

**リンク**:
- リポジトリ: https://github.com/bytedance/UI-TARS-desktop
- 公式サイト: https://agent-tars.com
- 論文: https://arxiv.org/abs/2501.12326
- モデル: HuggingFace、ModelScopeで公開

---

## [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code)

### 概要

Claude Codeを使った開発で、「もう少し自律的に動いてほしい」と感じたことはないだろうか。Ralphは、Claude Codeに自律開発ループを実装するためのフレームワークだ。一度タスクを与えれば、完了するまでClaude Codeが繰り返し実行を続ける。

仕組みは意外とシンプルだ。PROMPT.mdにプロジェクト要件を書いておくと、RalphがClaude Codeを起動し、タスクリストの進捗を追跡し、完了シグナルを検出するまでループを回す。ポイントは「完了の判定」で、セマンティックな完了インジケーターとClaude自身が出力するEXIT_SIGNALの両方が揃わないと終了しない二重ゲート方式を採用している。これにより、「まだ作業中なのに途中で止まってしまう」という問題を回避している。

### 主な機能

- **自律開発ループ**: PROMPT.mdの要件に基づき、Claude Codeが目標達成まで自動的に反復実行
- **インテリジェント終了検出**: 二重条件ゲートで早期終了を防止。作業が本当に完了したときだけ停止
- **セッション継続性**: ループ間でコンテキストを保持。24時間有効（設定可能）
- **レート制限**: APIの使いすぎを防ぐ組み込みの呼び出し制限（デフォルト100回/時間）
- **サーキットブレーカー**: エラー検出と自動リカバリー機能。無限ループに陥らない安全設計
- **5時間API制限対応**: Claudeの利用上限に到達した際の待機/終了プロンプトを自動表示
- **tmuxモニタリング**: リアルタイムダッシュボードでループの状態と進捗を監視

### 注目される理由

Claude Codeは対話的に使うツールとして設計されているが、実際の開発では「要件を渡して放置したい」場面も多い。機能実装やバグ修正など、明確なゴールがあるタスクなら、人間が逐一確認しなくてもエージェントに任せられるはずだ。

Ralphが解決しているのは、まさにこの「放置して大丈夫か」という不安だ。レート制限、サーキットブレーカー、二重ゲート終了検出といった安全機構により、APIを使い切ったり無限ループに陥ったりするリスクを軽減している。

名前の由来となったGeoffrey Huntley氏の手法をベースに、v0.9.9まで着実にアップデートを重ねており、テストカバレッジは308テストで100%を達成。v1.0のリリースも間近とされている。Claude Codeのパワーユーザーにとって、作業効率を大きく改善するツールとなりそうだ。

**リンク**:
- リポジトリ: https://github.com/frankbria/ralph-claude-code
- ライセンス: MIT

---

## その他の注目リポジトリ

今週のTrendingでは、以下のAI関連リポジトリも注目を集めていた。

| リポジトリ | 概要 |
|-----------|------|
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | オープンソースのAIコーディングエージェント。75,000以上のスターを獲得し、活発な開発が続いている |
| [OpenBMB/ChatDev](https://github.com/OpenBMB/ChatDev) | LLMパワードのマルチエージェント協調による開発フレームワーク。ChatDev 2.0として進化中 |

---

*Source: [GitHub Trending (Weekly)](https://github.com/trending?since=weekly)*
