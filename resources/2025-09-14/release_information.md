# リリース情報 (2025-09-14)

## Google Gemini CLI

**バージョン:** v0.5.0-preview-2  
**リリース日:** 2025年9月12日  
**リポジトリ:** https://github.com/google-gemini/gemini-cli  
**リリース詳細:** https://github.com/google-gemini/gemini-cli/releases/tag/v0.5.0-preview-2

### 概要
Gemini CLI v0.5.0-preview-2がリリースされました。このプレビューバージョンでは、機能の改善とバグ修正が含まれています。

### 主な変更点
- 詳細な変更履歴は[Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.5.0-preview.1...v0.5.0-preview-2)で確認可能

---

## Anthropic Claude Code

**バージョン:** 1.0.113  
**更新日:** 2025年9月13日  
**リポジトリ:** https://github.com/anthropics/claude-code  
**変更履歴:** https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### 概要
Claude Codeの最新バージョン1.0.113では、インタラクティブモードでのパイプ入力機能が非推奨となり、新しいキーバインドが導入されました。

### 主な変更点
- **非推奨化:** インタラクティブモードでのパイプ入力機能を非推奨に
- **キーバインド変更:** トランスクリプトモード切り替えをCtrl+RからCtrl+Oに変更

### 開発者への影響
この変更により、Claude Codeのユーザーインターフェースが改善され、より一貫性のある操作体験が提供されます。パイプ入力を使用していたユーザーは、代替手段への移行が推奨されます。

---

## Windsurf Editor

**バージョン:** 1.12.5  
**リリース日:** 2025年9月9日  
**ウェブサイト:** https://windsurf.com  
**変更履歴:** https://windsurf.com/changelog

### 概要
Windsurf Editor 1.12.5では、マイナーな改善とバグ修正が実施されました。

### 主な変更点
- マイナーな改善とバグ修正

---

## Microsoft Visual Studio Code

**バージョン:** 1.104.0 (August 2025)  
**リリース日:** 2025年9月11日  
**リポジトリ:** https://github.com/microsoft/vscode  
**リリース詳細:** https://github.com/microsoft/vscode/releases/tag/1.104.0

### 概要
Visual Studio Code 1.104.0では、AI機能とGitHub Copilot統合に関する重要な改善が実装されました。

### 主な変更点（AI関連）
- **自動モデル選択（プレビュー）:** VS Codeが最適なモデルを自動選択する機能
- **拡張機能によるモデル提供:** VS Code拡張機能を通じたモデル提供のAPIサポート
- **機密ファイルの編集確認:** 機密ファイル編集時の確認機能追加
- **ターミナルコマンドの安全実行:** エージェントがターミナルコマンドを安全に実行できる機能
- **AGENTS.mdファイルサポート（実験的）:** チャットコンテキスト追加用のAGENTS.mdファイル対応

### 開発者への影響
これらの機能により、AI支援開発における柔軟性とセキュリティが大幅に向上しました。特に自動モデル選択機能は、開発者が適切なAIモデルを手動で選択する負担を軽減します。

---

## Cline

**バージョン:** v3.28.3  
**リリース日:** 2025年9月13日  
**リポジトリ:** https://github.com/cline/cline  
**リリース詳細:** https://github.com/cline/cline/releases/tag/v3.28.3

### 概要
Cline v3.28.3では、UI機能とGit統合の改善が実装されました。

### 主な変更点
- **新規タスクボタンの修正:** スタート新規タスクボタンの問題を解決
- **コミットメッセージ生成機能:** ステージされた変更に対するコミットメッセージ自動生成機能を追加（未ステージ変更をフォールバックとして使用）

### 開発者への影響
コミットメッセージ生成機能により、開発者はより効率的にGitワークフローを管理できるようになりました。この機能は特にコード変更の意図を適切に表現するコミットメッセージの作成を支援します。

---

## OpenAI Codex

**バージョン:** 0.35.0-alpha.7 (Pre-release)  
**リリース日:** 2025年9月12日  
**リポジトリ:** https://github.com/openai/codex  
**リリース詳細:** https://github.com/openai/codex/releases/tag/rust-v0.35.0-alpha.7

### 概要
OpenAI Codexの最新アルファバージョン0.35.0-alpha.7がリリースされました。このプレリリースバージョンでは、複数プラットフォーム対応のバイナリが提供されています。

### 主な特徴
- **マルチプラットフォーム対応:** macOS、Windows、Linux（GNU/musl）向けのバイナリ提供
- **アーキテクチャサポート:** x86_64およびAarch64アーキテクチャに対応
- **NPMパッケージ提供:** Node.js環境での利用が可能

### 開発者への影響
この幅広いプラットフォーム対応により、様々な開発環境でCodexを利用できるようになりました。ただし、アルファバージョンのため、本番環境での使用には注意が必要です。