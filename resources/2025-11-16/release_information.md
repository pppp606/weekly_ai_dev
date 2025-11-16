# リリース情報（2025年11月9日～2025年11月16日）

## 主要なリリース

### [google-gemini/gemini-cli v0.17.0-nightly.20251116](https://github.com/google-gemini/gemini-cli/releases/tag/v0.17.0-nightly.20251116.e650a4ee5)
**リリース日**: 2025-11-16

#### 主な変更点
- **履歴でのモデル表示**: `gemini`コマンドの履歴でどのモデルを使用したかが表示されるようになりました
- **APIキーユーザー向けの圧縮設定**: デフォルトの圧縮閾値を0.7に変更し、API使用量を最適化
- **認証機能の強化**: メタデータサーバーのアプリケーションデフォルト認証情報にプロジェクトオーバーライドなしのオプションを追加
- **権限管理の改善**:
  - ディレクトリ追加前にフォルダの信頼性をチェック
  - `permissions`コマンドで他ユーザーの信頼を変更できるように更新
- **UI/UX改善**:
  - マウスダウン時のみマウス移動について警告を表示
  - ペーストタイムアウトを増やし、警告を追加
  - セレクションモード移行のガイダンスを改善
- **ドキュメント更新**: 非推奨フラグ（`--checkpointing`, `--sandbox-image`）への言及を削除
- **テストカバレッジ向上**: cli/command/extensionsパッケージのテストコードカバレッジを改善

**リンク**:
- リポジトリ: https://github.com/google-gemini/gemini-cli
- リリース: https://github.com/google-gemini/gemini-cli/releases/tag/v0.17.0-nightly.20251116.e650a4ee5

---

### [anthropics/claude-code v2.0.42](https://github.com/anthropics/claude-code)
**更新日**: 2025-11-15

#### 主な新機能と変更点

**最新版 v2.0.42**:
- **サブエージェントフック拡張**: `SubagentStop`フックに`agent_id`と`agent_transcript_path`フィールドを追加し、サブエージェントの実行をより詳細に追跡可能に

**v2.0.41**:
- **プロンプトベースの停止フック**: `model`パラメータを追加し、フック評価にカスタムモデルを指定可能
- **スラッシュコマンド修正**: 重複読み込みとラベリングの問題を修正
- **Bedrock互換性向上**: Haikuモデル使用時の重複Opus表示を解消
- **UI/UX改善**: Escキーでdiffモーダルを閉じた際にモデルが中断されない問題を修正
- **セキュリティドキュメント**: 信頼ダイアログとオンボーディングのリンクを修正

**v2.0.37**:
- **通知システム改善**: アイドル状態の計算を改善し、より正確な通知を実現
- **フックマッチャー**: Notificationフックイベント用のマッチャー値を追加
- **出力スタイル**: frontmatterに`keep-coding-instructions`オプションを追加

**v2.0.36以前の重要な更新**:
- **自動更新制御**: `DISABLE_AUTOUPDATER`環境変数がパッケージマネージャーの更新通知を正しく無効化
- **ファジー検索改善**: コマンド検索時の結果を改善
- **VS Code拡張**: `chat.fontSize`と`chat.fontFamily`設定を尊重し、即座に反映
- **SDKモード**: `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY`環境変数で自動終了をサポート
- **ネイティブファイル検索**: Rust実装のファジーファインダーでパフォーマンス向上
- **プラグインシステム**: カスタムコマンド、エージェント、フック、MCPサーバーで拡張可能に

**開発者への影響**:
- サブエージェント実行の詳細な追跡により、複雑なワークフローのデバッグが容易に
- カスタムモデルを使用したフック評価で、コスト効率とパフォーマンスの最適化が可能
- VS Code統合の改善により、エディタ内での開発体験が向上

**リンク**:
- リポジトリ: https://github.com/anthropics/claude-code
- CHANGELOG: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

---

### [microsoft/vscode 1.106.0（October 2025）](https://github.com/microsoft/vscode/releases/tag/1.106.0)
**リリース日**: 2025-11-12

#### AI関連の主な機能

**プランエージェントとエージェントセッション管理**:
- 複雑なコーディングタスクを計画できる新しいプランエージェントを導入
- バックグラウンドエージェント全体でエージェントセッションを監視できる機能を追加
- エージェントベースの開発ワークフローをより効率的に管理可能

**インラインサジェストのオープンソース化**:
- VS Codeのインラインサジェスト機能がオープンソースになり、コミュニティによるカスタマイズと拡張が可能に
- AI支援コード補完の透明性と柔軟性が向上

**MCP（Model Context Protocol）サーバー管理**:
- カスタムMCPレジストリでMCPサーバーアクセスを組織レベルで管理できるようになりました
- エンタープライズ環境でのAIツール統合をより安全に制御可能

**その他のAI関連改善**:
- 削除されたコードからのテキスト選択がdiffエディタで可能に
- モダンなプロダクトアイコンで視覚的体験を向上
- LinuxデバイスでのJSONポリシー管理をサポート

**開発者への影響**:
- エージェント駆動開発の採用により、複雑なタスクの自動化と効率化が促進
- オープンソース化されたインラインサジェストにより、カスタムAI補完ロジックの実装が容易に
- 組織レベルでのMCP管理により、エンタープライズでのAIツール展開がより安全に

**リンク**:
- リポジトリ: https://github.com/microsoft/vscode
- リリース: https://github.com/microsoft/vscode/releases/tag/1.106.0
- 詳細な更新情報: https://code.visualstudio.com/updates/v1_106

---

### [cline/cline v3.37.1](https://github.com/cline/cline/releases/tag/v3.37.1)
**リリース日**: 2025-11-14

#### 主な変更点

**PreToolUseフックの修正**:
- **承認後の実行**: `PreToolUse`フックが承認後にのみ実行されるように修正され、ツール実行前の制御フローが改善
- **attempt_completion保護**: `PreToolUse`フックが`attempt_completion`ツール実行前に動作しないように修正し、タスク完了時の意図しない介入を防止

**モデルサポートの拡張**:
- **Minimax M2モデル追加**: 無料の`minimax/mimax-m2`モデルをモデルピッカーに追加し、ユーザーの選択肢を拡大

**開発者への影響**:
- PreToolUseフックの動作が予測可能になり、カスタムワークフローの設計が容易に
- タスク完了時のフック干渉がなくなり、より信頼性の高い自動化が実現
- 新しいモデルオプションにより、コスト効率の良いAI支援開発が可能に

**リンク**:
- リポジトリ: https://github.com/cline/cline
- リリース: https://github.com/cline/cline/releases/tag/v3.37.1

---

### [github/copilot-cli v0.0.358](https://github.com/github/copilot-cli/releases/tag/v0.0.358)
**リリース日**: 2025-11-14

#### 主な変更点

**GPTモデル可用性の復旧**:
このリリースは、以下のGPTモデルの可用性を修正するためのリカバリーリリースです：
- **GPT-5.1**: 最新のフラッグシップモデル
- **GPT-5.1-Codex**: コード生成とコーディング支援に最適化されたモデル
- **GPT-5.1-Codex-Mini**: 軽量版のCodexモデル

**開発者への影響**:
- 最新のGPT-5.1シリーズモデルへのアクセスが復旧し、高度なコーディング支援機能が再び利用可能に
- コード生成、デバッグ、ドキュメント作成などのタスクで最新モデルの性能を活用できます
- Codex-Miniモデルにより、リソース効率の良いコード支援が可能に

**使用方法**:
```bash
# GitHub Copilot CLIを最新版に更新
gh extension upgrade copilot

# 特定のモデルを使用してコード提案を取得
gh copilot suggest --model gpt-5.1-codex "関数の実装方法"
```

**リンク**:
- リポジトリ: https://github.com/github/copilot-cli
- リリース: https://github.com/github/copilot-cli/releases/tag/v0.0.358

---

## ツール・ライブラリ

### [openai/codex rust-v0.59.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.59.0-alpha.5)
**リリース日**: 2025-11-15
**ステータス**: プレリリース（アルファ版）

#### 概要
OpenAI Codexのプレリリース版で、複数プラットフォームに対応したバイナリとNPMパッケージが提供されています。

**対応プラットフォーム**:
- macOS (Apple Silicon / Intel)
- Windows (ARM64 / x64)
- Linux (GNU / musl)

**主要コンポーネント**:
- `codex`: メインバイナリ
- `codex-responses-api-proxy`: APIプロキシサーバー
- NPMパッケージ（SDK含む）

**開発者への影響**:
- アルファ版のため、実験的機能や変更が含まれる可能性があります
- マルチプラットフォーム対応により、さまざまな開発環境で試用可能
- APIプロキシ機能により、Codexとの統合が容易に

**リンク**:
- リポジトリ: https://github.com/openai/codex
- リリース: https://github.com/openai/codex/releases/tag/rust-v0.59.0-alpha.5

---

## Web-based Changelog（手動確認済み）

### [Cursor v2.0（2025年10月29日）](https://cursor.com/changelog)

**注**: このリリースは10月29日のもので、7日以内のリリースではありませんが、参考情報として記載します。

#### 主な機能
- **マルチエージェント**: 最大8つのエージェントを並列実行（gitワークツリーまたはリモートマシンを使用）
- **Composer**: 同等の知能モデルの4倍高速なフロンティアモデル
- **ブラウザ（GA）**: エディタ内埋め込みと要素選択ツールの強化
- **サンドボックス化ターミナル（GA）**: macOSでワークスペースの読み書きアクセスを持つ安全なコマンド実行
- **ボイスモード**: 音声入力によるエージェント制御
- **チームコマンド**: ダッシュボード経由でカスタムコマンドとルールを一元管理
- **パフォーマンス改善**: 大規模プロジェクトでのLSP読み込みとメモリ管理を大幅に改善

**リンク**:
- ウェブサイト: https://cursor.sh
- Changelog: https://cursor.com/changelog

---

### [Kiro v0.5.0（2025年10月31日）](https://kiro.dev/changelog/)

**注**: このリリースは10月31日のもので、7日以内のリリースではありませんが、参考情報として記載します。

#### 主な機能
- **リモートMCPサポート**: インターネット上のMCPサーバーにStreamable HTTP経由で接続可能
- **グローバルステアリングルール**: 全ワークスペースに適用される一貫したエージェント動作の定義
- **AGENTS.md サポート**: ガイドラインとアーキテクチャパターンの定義に対応
- **ワンクリックMCPインストール**: MCPサーバーの自動インストールで簡単セットアップ
- **環境変数展開**: MCPサーバー設定で環境変数を使用可能
- **ターゲットファイルコンテキスト**: 特定の行範囲を参照可能（例: `#[[file:src/utils/helper.ts:10-25]]`）

#### その他の改善
- シーケンシャルフック実行でより柔軟な自動化
- パターンベースの信頼による簡素化
- 強化されたMCPデバッグとエラーハンドリング
- パッチ（0.5.9）で大規模リポジトリでのパフォーマンス問題を解決

**リンク**:
- ウェブサイト: https://kiro.dev
- Changelog: https://kiro.dev/changelog/
