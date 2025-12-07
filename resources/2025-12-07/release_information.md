# リリース情報（2025-12-07）

過去7日間（2025-11-30〜2025-12-07）の主要なAI開発ツールのリリース情報をまとめました。

---

## Claude Code v2.0.60

**リリース日**: 2025-12-06
**リポジトリ**: https://github.com/anthropics/claude-code
**CHANGELOG**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### 主な変更点

#### バックグラウンドエージェントサポート
- エージェントをバックグラウンドで実行しながら作業を継続可能に
- 開発者は複数のタスクを並行して処理できるように

#### 新機能
- `--disable-slash-commands` CLIフラグ追加：すべてのスラッシュコマンドを無効化
- コミットメッセージの「Co-Authored-By」にモデル名を表示
- `/mcp enable [server-name]` または `/mcp disable [server-name]` でMCPサーバーを素早く切り替え可能
- 事前承認されたウェブサイトではFetch時の要約をスキップ
- VSCode: 複数のターミナルクライアントが同時にIDEサーバーに接続可能に

### 過去1週間のハイライト

- **v2.0.59**: `--agent` CLIフラグと `agent` 設定を追加
- **v2.0.58**: ProユーザーがOpus 4.5にアクセス可能に
- **v2.0.57**: プラン拒否時のフィードバック入力機能追加
- **v2.0.56**: ターミナルプログレスバーの設定、VSCodeセカンダリサイドバー対応

---

## Cline v3.40.1 / v3.40.0

**リリース日**: v3.40.1 (2025-12-06) / v3.40.0 (2025-12-04)
**リポジトリ**: https://github.com/cline/cline
**リリースページ**: https://github.com/cline/cline/releases/tag/v3.40.1

### v3.40.0の主な変更点

#### 新機能・改善
- **Atomic File Write**: ファイル書き込みの原子性を確保
- **Gemini 3 Pro モデル対応**: デフォルトの思考レベルを設定
- **apply_patch 自動承認**: パッチ適用の自動承認機能
- **タスク履歴の自動リカバリ**: 破損したタスク履歴状態を自動回復

#### バグ修正
- OpenAI Response API メッセージフォーマットの修正
- コンテキスト書き換えのための新旧ツール呼び出しフォーマット対応
- 連続エラー再試行メッセージのUI統合

### v3.39.2の変更点
- Cerebras統合ヘッダーの追加
- マイクロウェーブモデルでのreasoning_detailsスキップ

---

## GitHub Copilot CLI v0.0.367

**リリース日**: 2025-12-05
**リポジトリ**: https://github.com/github/copilot-cli
**リリースページ**: https://github.com/github/copilot-cli/releases/tag/v0.0.367

### 主な変更点

#### GPT-5.1-Codex-Max 対応
- GitHub Copilot CLIでGPT-5.1-Codex-Maxが利用可能に
- 最新のOpenAIモデルによるコマンドライン支援の強化

---

## Google Gemini CLI v0.19.4

**リリース日**: 2025-12-05
**リポジトリ**: https://github.com/google-gemini/gemini-cli
**リリースページ**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.19.4

### 主な変更点

- パッチリリース（v0.19.3からの修正）
- 安定性向上のためのバグ修正

---

## Kiro v0.7

**リリース日**: 2025-12-03
**公式サイト**: https://kiro.dev
**CHANGELOG**: https://kiro.dev/changelog/

### 主な新機能

#### Powers（パワーズ）
- 動的なMCPツールローディング機能
- 会話コンテキストに基づいてオンデマンドでツールをアクティブ化
- ウィンドウの初期負荷を軽減

#### Conversation Summarization（会話要約）
- コンテキスト容量が80%に達すると自動要約がトリガー
- 長い会話を効率的に管理

#### Slash Commands（スラッシュコマンド）
- 「/」入力でフックやステアリングファイルへのクイックアクセス
- テストの実行やガイダンスの参照をオンデマンドで実行

---

## 今週リリースなし

以下のツールは過去7日間に新しいリリースはありませんでした：

- **Microsoft VS Code**: 最新リリース 1.106.3 (2025-11-26) - 7日以上前
- **Cursor**: 最新リリース v2.1 (2025-11-21) - 7日以上前
- **OpenAI Codex**: 安定版リリースなし（アルファ版のみ）

---

## まとめ

今週は**Claude Code**と**Cline**が活発にアップデートされ、特にClaude Codeのバックグラウンドエージェント機能と、ClineのGemini 3 Pro対応が注目ポイントです。また、GitHub Copilot CLIがGPT-5.1-Codex-Maxに対応し、コマンドラインでの開発支援がさらに強化されました。

Kiroも新機能「Powers」を導入し、MCPツールの動的ローディングによるユーザー体験の向上を図っています。
