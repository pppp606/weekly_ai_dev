# リリース情報 (2025-09-28 - 2025-10-05)

## 主要なリリース

### 🤖 Claude Code 2.0.8
**リリース日**: 2025-10-04
**リポジトリ**: [anthropics/claude-code](https://github.com/anthropics/claude-code)
**CHANGELOG**: [CHANGELOG.md](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)

#### 主な変更点:
- **Bedrock Sonnet 4.5対応**: BedrockのデフォルトSonnetモデルを`global.anthropic.claude-sonnet-4-5-20250929-v1:0`にアップデート
- **IDE機能強化**: ファイルとフォルダーのドラッグ&ドロップ対応をチャットに追加
- **UI/UX改善**:
  - `/context`コマンドでthinkingブロックのカウント修正
  - ライトテーマのメッセージレンダリング改善(ダークターミナル環境向け)
- **設定の整理**: 非推奨の`.claude.json`設定オプション(allowedTools, ignorePatterns, env, todoFeatureEnabled)を削除。今後は`settings.json`で設定

#### 開発者への影響:
- Bedrockユーザーは最新のSonnet 4.5モデルの性能向上を自動的に享受できる
- IDE統合のワークフローがドラッグ&ドロップで効率化
- 設定ファイルの移行が必要(`.claude.json` → `settings.json`)

---

### 🎯 Cursor 1.7
**リリース日**: 2025-09-29
**ウェブサイト**: [cursor.com](https://cursor.com)
**Changelog**: [cursor.com/changelog](https://cursor.com/changelog)

#### 主な新機能:
1. **ブラウザコントロール**: Agentがスクリーンショット撮影、UI改善、クライアント問題のデバッグが可能に
2. **Agent Autocomplete**: 最近の変更に基づいてサジェスチョンを自動表示
3. **Hooks (ベータ版)**: Agentループの観察、制御、拡張が可能
4. **チームルール**: グローバルルールの定義と共有機能
5. **サンドボックスターミナル**: コマンドが安全な環境で実行
6. **Bugbot PRサマリー**: GitHubで変更の自動要約
7. **メニューバーからのAgent監視**
8. **画像ファイル対応**: Agentがワークスペースから画像ファイルを直接読み取り可能

#### 開発者への影響:
- Agentの自律性と制御性が大幅に向上
- チーム開発でのルール共有により、コーディング規約の統一が容易に
- セキュリティ向上(サンドボックス実行)

---

### 🌊 Windsurf Editor 1.12.12 & 1.12.11
**リリース日**: 2025-09-29 (1.12.12), 2025-09-26 (1.12.11)
**ウェブサイト**: [windsurf.com](https://windsurf.com)
**Changelog**: [windsurf.com/changelog](https://windsurf.com/changelog)

#### Version 1.12.12 (2025-09-29):
- **Claude Sonnet 4.5対応**: Claude Sonnet 4.5モデルが利用可能に

#### Version 1.12.11 (2025-09-26):
- **MCP tools修正**: 特定モデルでのMCPツール使用の問題を修正
- **Windows対応改善**: Windowsでのターミナル関連問題を修正

#### 開発者への影響:
- 最新のClaude Sonnet 4.5モデルでより高度なAIアシスタンス
- WindowsユーザーのDX(Developer Experience)改善

---

### 🎨 Kiro 0.3.9 & 0.3.0
**リリース日**: 2025-10-02 (0.3.9), 2025-09-29 (0.3.0)
**ウェブサイト**: [kiro.dev](https://kiro.dev)
**Changelog**: [kiro.dev/changelog](https://kiro.dev/changelog/)

#### Version 0.3.9 (2025-10-02):
- **信頼性向上**: 長いファイルの作成・上書き時のAgent信頼性を改善
- **バグ修正**: Agent回復を妨げるバグを修正し、全体的な安定性を向上

#### Version 0.3.0 (2025-09-29):
**新機能**:
- **Sonnet 4.5サポート** (実験的)
- **Specタスク管理**: オプションのタスクマーキング機能付きMVP
- **診断ツール**: Agentの精度向上のための診断機能
- **Gitコミットメッセージ生成**: AI駆動のコミットメッセージ自動生成
- **反復ツール使用検出**: 無駄な反復を検出

**UX改善**:
- 長時間実行コマンドの処理強化
- 使用量メーターとクレジット追跡の改善

#### 開発者への影響:
- タスク管理とコードの診断機能でAI駆動開発がより実用的に
- Gitワークフローの効率化(AI生成コミットメッセージ)

---

### 🔧 Cline 3.32.6
**リリース日**: 2025-10-01
**リポジトリ**: [cline/cline](https://github.com/cline/cline)
**リリースURL**: [v3.32.6](https://github.com/cline/cline/releases/tag/v3.32.6)

#### 主な変更点:
1. **Claude Sonnet 4.5対応**: Claude Code向けにClaude Sonnet 4.5を追加
2. **テレメトリー機能強化**:
   - @メンション使用状況のテレメトリー追加
   - マルチルートワークスペースのテレメトリー追加
3. **マルチルートワークスペース対応改善**:
   - ワークスペースヒントのパース問題を修正
   - マルチルート環境でのモデル環境詳細を改善
4. **Git機能向上**: コミットメッセージジェネレーターの改善
5. **新モデル対応**: GLM-4.6のサポート追加
6. **UI/UX改善**:
   - チャット入力でのファジー検索を維持(Add File/...選択後)
   - 削除されたファイルを環境詳細から除外
7. **その他**:
   - Tailwind CSS v4互換性のためのCSS @import順序問題を解決
   - Cline-coreがクライアントタイプを取得する方法を追加

#### 開発者への影響:
- モノレポ/マルチルートプロジェクトでの精度向上
- 最新のClaude Sonnet 4.5とGLM-4.6モデルへのアクセス

---

### ⚙️ OpenAI Codex 0.44.0
**リリース日**: 2025-10-03
**リポジトリ**: [openai/codex](https://github.com/openai/codex)
**リリースURL**: [rust-v0.44.0](https://github.com/openai/codex/releases/tag/rust-v0.44.0)

#### ハイライト:
1. **UI刷新**:
   - 新しいチャットコンポーザー、ボトムペイン、モデルピッカー、アップグレード通知
2. **カスタムプロンプト機能強化**:
   - 名前付き引数と位置引数のサポート
   - カスタムプロンプトが`/prompts:`で始まるように変更
3. **MCP機能拡張**:
   - ストリーマブルHTTP MCPサーバーのサポート追加
   - MCP JSONスキーマの`additionalProperties`対応
4. **実験的機能**:
   - Windows向けの読み取り専用コマンドの繰り返し承認削減(experimental)
   - `codex cloud`でクラウドタスクの管理(very experimental)
5. **その他の改善**:
   - OpenTelemetryイベント対応
   - タスク実行中のコンテキストウィンドウ使用状況表示
   - エージェントメッセージの用語統一

#### 開発者への影響:
- より直感的なUI/UXでの開発体験
- カスタムプロンプトの柔軟性向上
- MCPサーバーとの統合強化

---

## ツール・ライブラリ

### 💎 Google Gemini CLI v0.9.0-nightly.20251002
**リリース日**: 2025-10-02
**リポジトリ**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
**リリースURL**: [v0.9.0-nightly.20251002.0f465e88](https://github.com/google-gemini/gemini-cli/releases/tag/v0.9.0-nightly.20251002.0f465e88)

#### 主な変更点:
1. **GitHub連携改善**:
   - 末尾にスラッシュが付いたGitHubリポジトリURLのサポート
2. **統合テスト強化**:
   - リリース検証テストに`npx run`テストを追加
3. **Windows対応改善**:
   - winpty向けのシェル指定を追加(統合修正)
   - Zed統合のストリームパース修正
4. **Agent機能追加**:
   - agent完了用の`submit_final_output`ツールを実装
5. **IDE拡張機能**:
   - デバッグロギングの導入
   - 管理されたIDEでの更新・インストールメッセージを抑制
6. **その他**:
   - tool_output_truncatedイベント名の定数使用
   - CI/CDの改善

#### 開発者への影響:
- GitHub統合のスムーズな利用
- Windows/Zedユーザーの体験向上
- より堅牢なCIパイプライン
