# リリース情報 (2025-07-06)

## google-gemini/gemini-cli

**Version:** v0.1.9-nightly.250704.23eea823  
**Release Date:** 2025-07-04  
**Repository:** https://github.com/google-gemini/gemini-cli  
**Release URL:** https://github.com/google-gemini/gemini-cli/releases/tag/v0.1.9-nightly.250704.23eea823

### 主な変更点
- チャット機能の改善: `/chat`でタグが必須に
- ヒストリー圧縮のしきい値を削減してパフォーマンスを向上
- ヘルプにShift+Tabのヒントを追加
- 小さい画面向けのASCIIアート更新
- 自動化されたPRトリアージワークフローの追加
- デバッグコンソール展開用のCtrl+Sショートカット表示の修正
- GitHub ActionsとTaggingを利用したリリースプロセスの実装
- 多数のバグ修正とタイポ修正

## anthropics/claude-code

**Last Updated:** 2025-07-03  
**Repository:** https://github.com/anthropics/claude-code  
**CHANGELOG URL:** https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### 最新バージョン (1.0.43)
- テーマセレクターが過度に保存される問題を修正

### Version 1.0.42
- `/add-dir`コマンドにチルダ(`~`)展開サポートを追加

### Version 1.0.41
- フック: StopフックトリガーをStopとSubagentStopに分割
- フック: 各コマンドのオプションタイムアウト設定を有効化
- フック: "hook_event_name"をフック入力に追加
- MCPツールがツールリストに2回表示される問題を修正
- `tool_decision`イベントのBashツール用の新しいツールパラメータJSON

### Version 1.0.40
- `NODE_EXTRA_CA_CERTS`が設定されている場合のUNABLE_TO_GET_ISSUER_CERT_LOCALLYによるAPI接続エラーを修正

## cursor/cursor

**Version:** 1.2  
**Release Date:** 2025-07-03  
**Website:** https://cursor.com  
**Changelog URL:** https://cursor.com/changelog

### 主な新機能
- **Agent To-dos**: エージェントが複雑なタスクのための構造化されたTo-doリストを作成
- **Queued Messages**: AIエージェントへのフォローアップメッセージをキューに入れる機能
- **PR Indexing & Search**: プルリクエストのセマンティック検索の改善
- **Memories機能がGA (Generally Available) に**
- **高速化されたTabコンプリート** (~100ms高速化)
- **エージェントによるマージコンフリクト解決支援**

## windsurf (Windsurf Editor)

### Version 1.10.7
**Release Date:** 2025-07-03  
**Website:** https://windsurf.com  
**Changelog URL:** https://windsurf.com/changelog

**変更内容:** Cascadeの信頼性向上

### Version 1.10.6
**Release Date:** 2025-07-02

**変更内容:** 軽微な改善とバグ修正

## cline/cline

### Version 3.18.3
**Release Date:** 2025-07-03  
**Repository:** https://github.com/cline/cline  
**Release URL:** https://github.com/cline/cline/releases/tag/v3.18.3

**主な変更点:**
- プラン/アクトモデル設定をグローバルストレージに移動
- Cerebras推論モデル入力から思考トークンを削除
- Claude Codeハンドリングの改善
- ログ + 実行オプションの追加

### Version 3.18.2
**Release Date:** 2025-07-03  
**Release URL:** https://github.com/cline/cline/releases/tag/v3.18.2

**主な変更点:**
- SAP AI CoreプロバイダーにClaude 4モデルを追加
- ChatViewをモジュラーファイルに分割
- LiteLLMで複数のリクエストを単一セッションにグループ化
- Claude Codeの思考予算カスタマイズを導入
- ターミナル問題のトラブルシューティングガイドを追加
- Claude 4をベストモデルとして設定

### Version 3.18.1
**Release Date:** 2025-06-29  
**Release URL:** https://github.com/cline/cline/releases/tag/v3.18.1

**主な変更点:**
- SAP AI CoreプロバイダーでClaude 4 Sonnetのサポートを追加
- Claude Codeプロバイダーで長い会話履歴使用時のENAMETOOLONGエラーを修正
- Googleのリクエストに応じてGemini CLIプロバイダーを削除
- "Delete All Tasks"機能のバグを修正