# AI開発ツール リリース情報 (2025-11-17 〜 2025-11-23)

## 🔥 Claude Code 2.0.50
**リリース日**: 2025-11-21

Claude CodeのCHANGELOGが更新され、複数の機能改善とバグ修正が含まれています。

### 主な変更点 (2.0.45〜2.0.50)

#### 新機能
- **Microsoft Foundry対応**: Azure AI Foundryとの統合をサポート
  - 詳細: https://code.claude.com/docs/en/azure-ai-foundry
- **PermissionRequestフック**: カスタムロジックでツール権限リクエストを自動承認/拒否
- **Webからのバックグラウンドタスク**: メッセージを`&`で始めることでバックグラウンドタスクとして送信可能
- **カスタムエージェントのpermissionModeフィールド**: エージェントごとの権限モード設定
- **スキルフロントマター**: サブエージェント用の自動読み込みスキル宣言
- **SubagentStartフック**: サブエージェント開始時のフックイベント

#### 改善
- ultrathinkテキスト表示の改善
- 5時間セッション制限の警告メッセージの明確化
- readline形式のctrl-yでの削除テキスト貼り付け対応
- サブエージェント権限のハンドリング改善

#### バグ修正
- ネストされた参照を持つMCPツール呼び出しのバグ修正
- アップグレード時のノイズエラーの抑制
- Vertex AI設定がsettings.jsonから適用されない問題の修正

**リンク**:
- 📦 [GitHub Repository](https://github.com/anthropics/claude-code)
- 📝 [CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)

---

## 🔥 Cursor 2.1
**リリース日**: 2025-11-21

### 主な新機能

#### Plan Mode の改善
- プラン作成時に品質向上のための明確化質問を提示
- インタラクティブなUIで回答可能
- 生成されたプラン内を⌘+Fで検索可能

#### AI Code Reviews（新機能）
- AIコードレビュー機能でバグを直接発見・修正
- 変更を分析しサイドパネルに問題を表示
- 既存のBugbot機能を補完

#### Instant Grep（Beta）
- エージェントが実行する全grepコマンドが即時実行
- 全モデルでサポート
- サイドバーからの手動コードベース検索にも適用
- 正規表現とワード境界マッチングに対応

**リンク**:
- 🌐 [Cursor Website](https://cursor.com)
- 📝 [Changelog](https://cursor.com/changelog)

---

## 🔥 Kiro v0.6
**リリース日**: 2025-11-17

### 主な新機能

#### Property-Based Testing
- 仕様の正確性をプロパティベーステストで検証
- ランダム入力で数百回実行しエッジケースを検出

#### Enterprise Support
- プロファイル選択、ダッシュボードアクセス
- 使用量計測、ガバナンスコントロール

#### Kiro CLI（新機能）
- Autoエージェントを活用したコマンドラインインターフェース
- 異なるエージェントモード、MCP、カスタムエージェントをサポート
- macOSとLinuxでインストール可能

#### Multi-Root Workspaces
- 単一ワークスペースで複数のルートフォルダを含むことが可能
- 例: `/users/bob/my-project`と`/shared/utils/auth`

#### Checkpointing
- 以前の会話結果に戻る機能
- 変更の可視性を持つワークスペース状態のロールバック

**リンク**:
- 🌐 [Kiro Website](https://kiro.dev)
- 📝 [Changelog](https://kiro.dev/changelog/)

---

## 🔧 Cline v3.38.1 / v3.38.0
**リリース日**: 2025-11-18

### v3.38.0 主な変更点

#### 新機能
- **Gemini 3.0サポート**: Gemini 3.0モデルを追加
  - Gemini 3.0 Proをオンボーディングリストに追加
  - プロンプト/ツールの変更対応
  - Thought signature サポート
- **Bedrock**: コンテキストウィンドウエラー検出とリトライハンドリング
- **SAP AI SDK**: メジャーバージョンアップグレード

#### 改善・修正
- UIコンポーネントのリファクタリング（shadcn Switchコンポーネント）
- Firebase認証の廃止
- Windowsでのダブルクォートエスケープ問題の解決
- バックグラウンドターミナルコマンドのキャンセル修正
- フック機能の改善（PreToolUse表示順、キャンセル処理）

**リンク**:
- 📦 [GitHub Repository](https://github.com/cline/cline)
- 📝 [v3.38.1 Release](https://github.com/cline/cline/releases/tag/v3.38.1)
- 📝 [v3.38.0 Release](https://github.com/cline/cline/releases/tag/v3.38.0)

---

## 🔧 GitHub Copilot CLI v0.0.362
**リリース日**: 2025-11-20

### 主な変更点
- **画像ドラッグ&ドロップ修正**: Windows環境での問題を修正
- **シェルコマンド履歴**: BashとPowerShellの履歴ファイルにシェルコマンドを含めないように変更
- **クリップボード画像貼り付け**: クリップボードから直接画像データを貼り付け可能に
- **プロンプト・ツール指示の更新**: よりスムーズな動作のためのクリーンアップと更新

**リンク**:
- 📦 [GitHub Repository](https://github.com/github/copilot-cli)
- 📝 [Release Notes](https://github.com/github/copilot-cli/releases/tag/v0.0.362)

---

## 🔧 Google Gemini CLI v0.17.1
**リリース日**: 2025-11-22

### 変更点
- バグ修正のパッチリリース（cherry-pick 5e218a5）

**リンク**:
- 📦 [GitHub Repository](https://github.com/google-gemini/gemini-cli)
- 📝 [Release Notes](https://github.com/google-gemini/gemini-cli/releases/tag/v0.17.1)

---

## 🔧 VS Code 1.106.2 / 1.106.1
**リリース日**: 2025-11-17〜19

October 2025リカバリーリリース。詳細なリリースノートは公式サイトを参照。

**リンク**:
- 📦 [GitHub Repository](https://github.com/microsoft/vscode)
- 📝 [v1.106.2 Release](https://github.com/microsoft/vscode/releases/tag/1.106.2)
- 🌐 [Release Notes](https://code.visualstudio.com/updates/v1_106)

---

## 🔧 OpenAI Codex v0.64.0-alpha.5（プレリリース）
**リリース日**: 2025-11-22

アルファ版リリース。複数プラットフォーム向けのバイナリとSDKが利用可能。
- codex-responses-api-proxy の各種プラットフォーム対応
- codex-shell-tool-mcp NPMパッケージ

**リンク**:
- 📦 [GitHub Repository](https://github.com/openai/codex)
- 📝 [Release Notes](https://github.com/openai/codex/releases/tag/rust-v0.64.0-alpha.5)
