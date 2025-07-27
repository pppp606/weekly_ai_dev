# 📦 開発ツール・リリース情報（2025年7月20日～2025年7月27日）

## Google Gemini CLI v0.1.13-nightly.250727.3e81359c
**リリース日**: 2025年7月27日  
**リポジトリ**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)  
**リリースURL**: [v0.1.13-nightly.250727.3e81359c](https://github.com/google-gemini/gemini-cli/releases/tag/v0.1.13-nightly.250727.3e81359c)

### 主な変更点
- `/chat`コマンドでタグ指定が必須に変更
- 履歴圧縮のしきい値を削減し、パフォーマンスを向上
- ヘルプ機能にShift+Tabのヒントを追加
- 通知テンプレートの更新とPRトリアージの自動化機能を追加
- ANSIテーマでAccentBlue設定を改善
- デバッグコンソール拡張のCtrl+Sショートカット表示を修正
- 小さなスクリーン向けASCIIアートの更新
- 設定からのモデル取得機能をflashFallbackHandlerに追加
- Tagging機能とGitHub Actionsを使用したリリース処理の改善
- Node.js最小バージョンを20以上に更新
- MCPサーバーの設定とツール管理機能の強化

## Anthropics Claude Code 1.0.61
**更新日**: 2025年7月25日  
**リポジトリ**: [anthropics/claude-code](https://github.com/anthropics/claude-code)  
**CHANGELOG**: [CHANGELOG.md](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)

### 主な変更点
- JSONファイルから設定を読み込むための`--settings`フラグを追加
- v1.0.60では専門タスク用のカスタムサブエージェント作成機能を追加（`/agents`コマンドで開始）
- v1.0.59では環境変数名を`CLAUDE_CODE_BASH_PREFIX`から`CLAUDE_CODE_SHELL_PREFIX`に変更
- SDK: `canUseTool`コールバックによるツール確認サポートを追加
- SDK: スポーンプロセス用の環境指定をサポート
- Hooks: PermissionDecisionをフック（"ask"を含む）に公開
- Hooks: UserPromptSubmitで高度なJSON出力での追加コンテキストをサポート
- Opusを指定したMaxユーザーがSonnetにフォールバックする問題を修正

## Microsoft VS Code 1.102.2（June 2025 Recovery 2）
**リリース日**: 2025年7月23日  
**リポジトリ**: [microsoft/vscode](https://github.com/microsoft/vscode)  
**リリースURL**: [1.102.2](https://github.com/microsoft/vscode/releases/tag/1.102.2)

### AI関連の変更点
このリリースは主にバグ修正版で、[June 2025 Recovery 2](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+milestone%3A%22June+2025+Recovery+2%22+is%3Aclosed+)のイシューに対応していますが、AI機能やGitHub Copilot統合に関する具体的な変更は記載されていません。完全なリリースノートは[Updates](https://code.visualstudio.com/updates/v1_102)で確認できます。

## Cline v3.20.2
**リリース日**: 2025年7月26日  
**リポジトリ**: [cline/cline](https://github.com/cline/cline)  
**リリースURL**: [v3.20.2](https://github.com/cline/cline/releases/tag/v3.20.2)

### 主な変更点
- WindowsでのGitBashターミナルサポートを追加し、Windows端末問題の解決に向けたドキュメントを提供
- SAP AI Coreでの初回認証情報入力に影響する問題を修正
- `CLAUDE_CODE_MAX_OUTPUT_TOKENS`の変更
- 開いているタブと表示されているタブの取得を抽象化（Hostbridgeによる）
- アカウント切り替え時の組織状態リセット問題を修正
- diffビューアのスクロール機能をホストブリッジにRPCとして追加
- vscode show message API呼び出しをホストブリッジで置き換え
- Qwen API オプションの不整合を修正
- プロトコルディレクトリ構造をパッケージ名に合わせるリファクタリング
- チェックポイント機能がUIをブロックする問題を修正
- ファイル復元後のカーソル状態を無効化するよう修正

## Windsurf Editor 1.11.1
**リリース日**: 2025年7月23日  
**ウェブサイト**: [windsurf.com](https://windsurf.com)  
**CHANGELOG**: [windsurf.com/changelog](https://windsurf.com/changelog)

### 主な変更点
- Kimi K2モデルのサポートを追加（プロンプトあたり0.5クレジット）

---

## 📊 今週のリリース概況

- **Google Gemini CLI**: 大幅な機能追加とUX改善。特にNode.js要件の更新やMCPサーバー強化が注目
- **Anthropics Claude Code**: 設定管理の改善とサブエージェント機能の追加で開発効率が向上
- **VS Code**: 安定性向上のためのバグ修正リリース
- **Cline**: Windows環境での使いやすさ向上とAPI整合性の改善
- **Windsurf Editor**: 新しいAIモデル（Kimi K2）サポートを追加