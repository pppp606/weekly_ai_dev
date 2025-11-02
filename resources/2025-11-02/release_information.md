# リリース情報（2025-10-26 〜 2025-11-02）

## 主要なリリース

### Cursor 2.0（2025-10-29）

Cursorの大型アップデート「2.0」がリリースされました。新しいエージェント型コーディングモデル「Composer」が導入され、同等の知能を持つモデルと比較して4倍高速な動作を実現しています。

**主な新機能：**
- **Composer**: 新しいエージェント型コーディングモデル（同等モデルの4倍高速）
- **マルチエージェントサポート**: 最大8つの並列エージェントを同時実行可能
- **ブラウザ機能**: 一般提供開始（GA）
- **サンドボックス化されたターミナル**: macOS向けに提供
- **音声制御**: 音声入力による操作が可能に
- **コードレビュー改善**: 複数ファイルにまたがるレビューが可能
- **エンタープライズ機能**: 管理者コントロールと監査ログ機能を追加

**リンク：**
- Website: https://cursor.com
- Changelog: https://cursor.com/changelog

---

### Claude Code 2.0.31（2025-11-01）

Anthropic Claude Codeの最新バージョンがリリースされ、複数の機能追加とバグ修正が行われました。

**主な変更点：**
- **Windows**: ネイティブインストールでモード切替のショートカットがshift+tabに変更（従来のalt+mから）
- **Vertex**: Web Search機能が対応モデルでサポート
- **VSCode**: `.gitignore`されたファイルをファイル検索に含めるかどうかの設定`respectGitIgnore`を追加（デフォルトはtrue）
- **バグ修正**:
  - サブエージェントとMCPサーバーに関する「Tool names must be unique」エラーを修正
  - `/compact`コマンドが`prompt_too_long`で失敗する問題を修正
  - プラグインのアンインストールが正しく動作しない問題を修正

**前バージョン（2.0.30）の主な機能：**
- **Plan mode**: 新しいPlanサブエージェントを導入
- **サブエージェント**: Claudeがサブエージェントを再開可能に
- **SDK**: `--max-budget-usd`フラグを追加
- **Haiku 4.5**: Proユーザー向けにHaiku 4.5モデルオプションを追加
- **Explore subagent**: Haikuを活用した効率的なコードベース検索エージェント

**実用例：**
```bash
# .gitignoreされたファイルも検索に含める
"respectGitIgnore": false

# サブエージェントの再開
claude --resume <subagent-id>
```

**リンク：**
- Repository: https://github.com/anthropics/claude-code
- CHANGELOG: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

---

### Cline v3.35.0（2025-10-31）

ClineのバージョンがリリースされUIコンポーネントの改善、新モデルサポート、MCPサーバー機能の拡張が行われました。

**主な新機能：**
- **GLM 4.6モデルサポート**: Cerebras GLM 4.6モデルをサポート、デフォルトとして設定
- **Native tool calling**: ネイティブツール呼び出し機能を追加
- **Think タグサポート**: `<think>`タグのサポート追加
- **GPT-5対応**: GPT-5向けにdiff編集ツールを使用
- **MCP設定**: リモート設定にMCP設定を追加
- **OTEL設定**: リモートOTEL設定にヘッダー追加機能
- **Requesty OAuth**: カスタムベースURLサポート追加

**UI/UX改善：**
- HeroUI Tooltipをshadcnに置き換え
- HeroUI AlertをshadcnAlertコンポーネントに置き換え
- モデル説明マークダウンをTailwind CSSに移行
- タスクヘッダーボタンのクリック時のイベント伝播を停止
- Auto-approveメニューデザインの改善

**バグ修正：**
- CheckpointErrorのレイアウト改善
- ツールチップの矢印を非表示化
- BrowserSessionRowのURL bar間隔を更新

**リンク：**
- Repository: https://github.com/cline/cline
- Release: https://github.com/cline/cline/releases/tag/v3.35.0

---

### GitHub Copilot CLI v0.0.353（2025-10-28）

GitHub Copilot CLIの最新バージョンがリリースされ、カスタムエージェント機能と非同期タスク委譲機能が追加されました。

**主な新機能：**
- **カスタムエージェントサポート**: カスタムエージェント定義をサポート
  - `~/.copilot/agents`
  - `.github/agents`（リポジトリ内）
  - 組織の`.github`リポジトリ
- **エージェント呼び出し**:
  - インタラクティブ: `/agent`スラッシュコマンド
  - 非インタラクティブ: `--agent <agent>`オプション
  - モデルがタスク完了時にツールとして呼び出し可能
- **/delegateコマンド**: Copilotコーディングエージェントにタスクを非同期委譲
  - ステージングされていない変更を新しいブランチにコミット
  - GitHub リポジトリでPRを開く
  - Copilotがバックグラウンドで作業を完了

**実用例：**
```bash
# カスタムエージェントを呼び出す
copilot /agent my-custom-agent

# タスクを非同期で委譲
copilot /delegate "fix authentication bug"
```

**開発者への影響：**
- チーム固有のエージェントをカスタマイズ可能
- バックグラウンドタスク実行による生産性向上
- エージェントベースのワークフロー自動化が可能に

**リンク：**
- Repository: https://github.com/github/copilot-cli
- Release: https://github.com/github/copilot-cli/releases/tag/v0.0.353

---

### Kiro 0.5.0（2025-10-30）

Kiroの最新バージョンがリリースされ、リモートMCP、グローバルステアリング、シーケンシャルフック機能が追加されました。

**主な新機能：**
- **リモートMCPサーバーサポート**: ワンクリックインストール機能を含む
- **グローバルステアリングルール**: プロジェクト固有のエージェント設定
- **AGENTS.mdサポート**: プロジェクト固有のエージェント設定ファイル
- **シーケンシャルフック実行**: エージェントワークフローの改善
- **簡略化された信頼コマンドパターン**: コマンド承認の簡素化
- **ファイルコンテキストの行範囲参照**: `#[[file:src/utils/helper.ts:10-25]]`のような記法でファイルの特定範囲を参照

**追加改善：**
- MCPデバッグ機能の強化（自動エラーログオープン）
- 監視モードでのファイル管理を修正
- ターミナル統合の信頼性向上
- コード追加後のチャット入力応答性の問題を解決

**リンク：**
- Website: https://kiro.dev
- Changelog: https://kiro.dev/changelog/

---

## ツール・ライブラリ

### Google Gemini CLI v0.13.0-nightly.20251101（2025-11-01）

Gemini CLIの最新ナイトリービルドがリリースされ、多数の改善とバグ修正が含まれています。

**主な変更点：**
- **テレメトリ機能拡張**:
  - ToolCallEventテレメトリに拡張機能名を追加
  - GCPログエクスポーターの重複session_idを削除
  - スローレンダリングのメトリクスとロギングを追加
- **ワークフロー改善**:
  - パッチリリースワークフローに動的run-namesを追加
  - release-patch-1-create-prワークフローのサイレント失敗に対処
- **UI/UX改善**:
  - Ink 6.4.0への対応
  - `--model`フラグが起動時のモデル選択用であることを明確化
  - Kittyの機能キーサポートを追加
- **ポリシーエンジン**:
  - ポリシーエンジンのドキュメント追加
  - 信頼されていないフォルダーの拡張インストールおよびリンク処理
- **バグ修正**:
  - ループ検出がセッション無効化フラグを尊重するように修正
  - モデルルーターが明示的なモデル選択を上書きしないように修正
  - Daily quota エラーメッセージを簡素化

**開発者向け改善：**
- リリースチャネル検出機能を導入
- 自動化された問題トリアージワークフローの全面刷新
- デバッグロガーへのconsole.error移行

**リンク：**
- Repository: https://github.com/google-gemini/gemini-cli
- Release: https://github.com/google-gemini/gemini-cli/releases/tag/v0.13.0-nightly.20251101.caf2ca14

---

### OpenAI Codex rust-v0.54.0-alpha.1（2025-10-31）

OpenAI Codexの新しいアルファバージョンがリリースされました（詳細な変更内容は記載なし）。

**リンク：**
- Repository: https://github.com/openai/codex
- Release: https://github.com/openai/codex/releases/tag/rust-v0.54.0-alpha.1

---

## まとめ

今週は、AIコーディング支援ツールの分野で大きな進展がありました：

- **Cursor 2.0**の登場により、マルチエージェント機能と高速なComposerモデルが利用可能に
- **Claude Code**がサブエージェント機能やHaiku 4.5サポートを強化
- **GitHub Copilot CLI**がカスタムエージェントと非同期タスク委譲をサポート
- **Cline**がネイティブツール呼び出しとGLM 4.6モデルをサポート
- **Kiro**がリモートMCPとグローバルステアリングルールを追加

これらのアップデートにより、開発者の生産性向上とワークフローの自動化がさらに進化しています。
