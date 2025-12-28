# リリース情報 (2025-12-28)

今週（2025-12-21〜2025-12-28）のAI開発ツールのリリース情報をまとめました。

---

## Claude Code

### v2.0.74 (2025-12-19)

**主要な新機能・改善:**

- **LSP（Language Server Protocol）ツールの追加**: go-to-definition、参照検索、ホバードキュメンテーションなどのコードインテリジェンス機能が利用可能に
- **ターミナルセットアップの拡充**: Kitty、Alacritty、Zed、Warpターミナルのサポートを追加（`/terminal-setup`）
- **テーマ機能の強化**:
  - `ctrl+t`ショートカットでシンタックスハイライトのオン/オフ切り替え
  - テーマピッカーにシンタックスハイライト情報を表示
- **macOSキーボード表示の改善**: 'alt'の代わりに'opt'と表示するように修正

**バグ修正:**
- スキルの`allowed-tools`が正しく適用されない問題を修正
- Opus 4.5使用時のヒント表示に関する問題を修正
- シンタックスハイライト未初期化時のクラッシュを修正
- `/plugins discover`でリスト選択インジケーターが表示される問題を修正
- Windowsでのレンダリング問題を修正

**`/context`コマンドの改善:**
スキルとエージェントをソース別にグループ化し、スラッシュコマンドを表示、トークン数でソート

**リンク:**
- リポジトリ: https://github.com/anthropics/claude-code
- CHANGELOG: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

---

## Google Gemini CLI

### v0.22.4 (2025-12-27)

**変更内容:**
- v0.22.3のパッチリリース（cherry-pick修正）

**リンク:**
- リポジトリ: https://github.com/google-gemini/gemini-cli
- リリース: https://github.com/google-gemini/gemini-cli/releases/tag/v0.22.4

---

## Cursor

### v2.3 (2025-12-22)

**安定性向上とバグ修正に焦点を当てたホリデーリリース:**

**コアシステム:**
- ユーザーインストール拡張機能とビルトインCursor拡張機能（コードベースインデックスなど）のプロセス分離

**エージェント改善:**
- auto-run設定周りの安定性向上
- 並列エージェントの問題を修正
- worktree機能の改善

**レイアウト機能:**
- 4つのデフォルトレイアウト（agent、editor、zen、browser）が利用可能
- `⌘+⌥+⇥`でレイアウト切り替えが可能

**バグ修正:**
- チャット読み込みの問題を修正
- 統合ブラウザタブのサポート
- Plan Modeのフォーカス問題を修正

**リンク:**
- ウェブサイト: https://cursor.com
- Changelog: https://cursor.com/changelog

---

## Cline

### v3.46.0 / v3.46.1 (2025-12-22)

**v3.46.0の新機能:**

- **GLM 4.7モデルの追加**: 新しいAIモデルをサポート
- **バックグラウンドターミナル実行の強化**:
  - コマンド追跡機能
  - ログファイル出力
  - ゾンビプロセス防止（10分タイムアウト）
  - UIでクリック可能なログパス
- **Apply Patchツール**: GPT-5以降のモデル向け（既存のdiff editツールを置き換え）

**修正:**
- Parallel Tool Calling未有効時のDiff Editツールでのストリーミングエラー重複
- バナーカルーセルのスタイリングとdismiss機能
- Geminiシステムプロンプトオーバーライドのタイポ
- OpenRouter/Vercel AI Gatewayプロバイダーのモデルピッカー問題

**v3.46.1の修正:**
- GLM 4.6を無料モデルから削除

**リンク:**
- リポジトリ: https://github.com/cline/cline
- リリース: https://github.com/cline/cline/releases/tag/v3.46.1

---

## OpenAI Codex

### v0.77.0 (2025-12-21)

**新機能:**

- **TUI2スクロール正規化**: ターミナル間でのマウスホイール・トラックパッドスクロールを統一、`tui.scroll_*`設定を追加
- **サンドボックスモード制約**: `requirements.toml`に`allowed_sandbox_modes`を追加し、許可されるサンドボックスモードを制限可能に
- **MCP OAuth改善**: ストリーマブルHTTP MCPサーバーのOAuthログインで`rmcp_client`機能フラグが不要に
- **ファジー検索の改善**: `codex-file-search`でファイル名導出を一元化し、表示と一貫性を向上
- **モデルメタデータ更新**: `models.json`の更新

**バグ修正:**
- `/undo`コマンドがgit staging/ghost commitsと破壊的に相互作用する問題を修正
- TUI2でトランスクリプトスクロール時の冗長な再描画を削減

**リンク:**
- リポジトリ: https://github.com/openai/codex
- リリース: https://github.com/openai/codex/releases/tag/rust-v0.77.0

---

## GitHub Copilot CLI

### v0.0.372 (2025-12-19)

**新機能:**

- **モデルの直接有効化**: 無効化されたモデルをCLIで選択または指定時に直接有効化可能
- **`/context`コマンド**: トークン使用量を可視化する新コマンド
- **`--resume`フラグ**: リモートセッションをローカルで続行可能に
- **URL権限コントロール**: ウェブにアクセスする一般的なシェルコマンドに影響するURL権限制御を追加
- **長いコマンドの表示改善**: ラップ時に意図ヘッダーが重複表示される問題を解消

**リンク:**
- リポジトリ: https://github.com/github/copilot-cli
- リリース: https://github.com/github/copilot-cli/releases/tag/v0.0.372

---

## Kiro

### v0.8.0 IDE / v1.23.0 CLI (2025-12-18)

**主要な新機能:**

- **Webツール**: IDEにインターネット検索とコンテンツ取得機能を追加。チャットから直接ドキュメントやライブラリバージョンを確認可能
- **サブエージェント**: 両バージョンで並列タスク実行を導入。各エージェントが独立したコンテキストウィンドウを持ち、メインエージェントのコンテキスト汚染を防止
- **Planエージェント（CLI）**: 要件を構造化された実装計画に変換する新しい専門エージェント。ガイド付き質問とコードベース分析を経て実行エージェントに引き継ぎ
- **ファイルツール強化（CLI）**: `.gitignore`パターンを尊重したgrepとglobユーティリティを追加
- **Supervised Mode改善（IDE）**: ファイル単位の細かいコードレビューが可能に。マルチファイル変更の選択的な承認/拒否をサポート
- **セッション管理（CLI）**: インタラクティブなセッションピッカーで複数のチャットセッション間をシームレスに移動、自動保存機能付き

**リンク:**
- ウェブサイト: https://kiro.dev
- Changelog: https://kiro.dev/changelog/

---

## まとめ

今週は各ツールで重要なアップデートがありました：

1. **Claude Code**: LSPツールの追加により、コードインテリジェンス機能が大幅に強化
2. **Cursor**: 安定性向上とレイアウト機能の追加
3. **Cline**: GLM 4.7対応とバックグラウンドターミナル実行の強化
4. **OpenAI Codex**: TUIスクロールの正規化とサンドボックス制約機能
5. **GitHub Copilot CLI**: トークン可視化とセッション継続機能
6. **Kiro**: サブエージェントとPlanエージェントによる並列処理能力の向上
