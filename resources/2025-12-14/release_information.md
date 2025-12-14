# リリース情報（2025-12-14）

過去7日間（2025-12-07〜2025-12-14）の主要なAI開発ツールのリリース情報をまとめました。

---

## Google Gemini CLI v0.21.0-nightly.20251213.977248e09（プレリリース）

**リリース日**: 2025-12-13  
**リポジトリ**: https://github.com/google-gemini/gemini-cli  
**リリースページ**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.21.0-nightly.20251213.977248e09

### 主な変更点
- 設定スキーマのバリデーションを追加し、設定ミスを早期検知
- a2aサーバー向けの `/init` コマンドを導入し初期セットアップを簡素化
- 画像のドラッグ＆ドロップが複数ファイルに対応
- Always Allowポリシーの永続化とシェル/MCPの粒度設定を強化
- VS Code/IDE連携のポートファイル名を整理し、文字インデックスを1始まりに修正
- Read-onlyポリシーで `codebase_investigator` を許可し、コマンドの安全性チェックを改善

---

## Claude Code v2.0.69 / v2.0.68

**リリース日**: 2025-12-13  
**リポジトリ**: https://github.com/anthropics/claude-code  
**CHANGELOG**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### 主な変更点（v2.0.68中心）
- IME入力（中/日/韓など）のキャレット位置ずれを修正し、非ラテン文字の単語移動も改善
- 非許可MCPツールが表示される問題を修正し、ステアリングメッセージの欠落を防止
- Planモード終了時のUXを改善（空プラン時に簡易Yes/Noダイアログ）
- `/permissions` に検索ショートカット（`/`）を追加し、ルール検索を高速化
- エンタープライズマネージド設定を追加（アカウントチーム有効化が必要）
- v2.0.69はマイナーなバグ修正リリース

---

## Cursor v2.2

**リリース日**: 2025-12-10  
**サイト**: https://cursor.sh  
**CHANGELOG**: https://cursor.sh/changelog

### 主な変更点
- **Debug Mode**: アプリを計測しランタイムログで根本原因を特定
- **ブラウザレイアウト＋スタイルエディタ**: サイドバーとコンポーネントツリーでUIを操作し、即コードに反映
- Planモードの改善、複数エージェントのジャッジ機能、チャット固定（Pinned Chats）を追加

---

## Visual Studio Code 1.107.0（November 2025）

**リリース日**: 2025-12-10  
**リポジトリ**: https://github.com/microsoft/vscode  
**リリースページ**: https://github.com/microsoft/vscode/releases/tag/1.107.0

### AI関連のハイライト
- **Agent HQ** を中心に、GitHub Copilotと複数エージェントを並行活用可能
- **バックグラウンドエージェント**: 隔離ワークスペースでタスクを並行処理
- **組織向けカスタムエージェント**: チーム共有の専用エージェントを配布

---

## Cline v3.42.0

**リリース日**: 2025-12-12  
**リポジトリ**: https://github.com/cline/cline  
**リリースページ**: https://github.com/cline/cline/releases/tag/v3.42.0

### 主な変更点
- ターミナルモジュールをリファクタし安定性を向上
- コアに `getAvailableSlashCommands` RPCを追加し、UIや拡張から利用可能なコマンド列挙を容易に
- 新バナーAPIに対応し、拡張側のルール評価を維持
- UIアクセシビリティ改善（展開/折りたたみ操作のキーボード対応、スラッシュ＆コンテキストメニューのスクリーンリーダー対応）
- OpenRouterモデルフィルタリングを更新し最新IDに追随

---

## OpenAI Codex v0.73.0-alpha.1（プレリリース）

**リリース日**: 2025-12-13  
**リポジトリ**: https://github.com/openai/codex  
**リリースページ**: https://github.com/openai/codex/releases/tag/rust-v0.73.0-alpha.1

### 主な変更点
- Rust版バイナリと各プラットフォーム向けビルドを更新（CLI/SDK/レスポンスAPIプロキシのパッケージを同梱）
- 早期アクセス版のためAPI仕様は変動の可能性あり

---

## GitHub Copilot CLI v0.0.370-0（プレリリース）

**リリース日**: 2025-12-12  
**リポジトリ**: https://github.com/github/copilot-cli  
**リリースページ**: https://github.com/github/copilot-cli/releases/tag/v0.0.370-0

### 主な変更点
- 各OS向けビルドを更新したプレリリース（機能差分は軽微）

---

## Kiro（複数更新）

**公式サイト**: https://kiro.dev  
**CHANGELOG**: https://kiro.dev/changelog/

### 2025-12-12: Claude Opus 4.5対応拡大
- AWS IAM Identity Centerユーザーがus-east-1 / eu-central-1でClaude Opus 4.5を利用可能に（IDE/CLI両方で有効）

### 2025-12-11: Code Intelligence & Knowledge Index（v1.22.0 CLI）
- LSP連携によるコードインテリジェンスを追加し解析精度を向上
- ナレッジインデックスとエージェントスキーマ設定でプロジェクト知識を明示管理
- オートコンパクションを強化し長文チャットのメモリ管理を改善
- ファイル読み込みのガードレールを強化し安全性を向上

---

## まとめ

- エージェント機能が各所で強化（VS CodeのAgent HQ、Cursorのマルチエージェント判定、ClineのRPC拡張、Gemini CLIのa2a `/init` など）。
- インプット体験とアクセシビリティ改善が目立ち、IME対応（Claude Code）やスクリーンリーダー対応（Cline）が進展。
- インフラ／モデル面ではClaude Opus 4.5や最新Codexアルファが利用範囲を拡大中。
