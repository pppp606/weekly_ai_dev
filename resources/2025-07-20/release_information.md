# Release Information (2025-07-20)

## google-gemini/gemini-cli v0.1.13 (2025-07-19)

**Repository:** https://github.com/google-gemini/gemini-cli  
**Release URL:** https://github.com/google-gemini/gemini-cli/releases/tag/v0.1.13

### 主な変更点

**新機能**
- hideBanner設定追加: 起動時のバナーを非表示にする設定を追加
- VSCode連携拡張機能の導入: IDEとの統合機能を強化
- IDE統合のフィーチャーフラグ追加
- ループ検出サービス: シンプルなループを破壊する機能を実装
- プロキシオプションの明示的追加: CLIでプロキシ設定が可能に
- 選択リストへの番号追加: UIの使いやすさを向上

**改善点**
- MCPコード: 再利用性とテスト性を向上させるためのリファクタリング
- MCP OAuth認証インフラの実装（パート1）
- バックグラウンドエージェントのデモ機能追加
- /background コマンドの追加（バックグラウンドエージェント設定時）
- 非対話環境の自動検出と手動認証フローへのフォールバック
- Zed IDE統合のサポート追加

**バグ修正**
- MakefileのビルドターゲットでヘルプテキストのJupyternotebook重複修正
- MCPサーバーからのstderr出力をデバッグモードで表示
- Markdownの見出しレベル問題の修正
- 非圧縮履歴が関数レスポンスで始まらないよう修正
- チェックポイント機能の静かな失敗を防止し、非Gitプロジェクトでも有効化
- JSONシリアライゼーションの循環参照エラーを修正
- セッションイベント開始時のsurfaceフィールドロギング
- Node 20未満の警告機能の追加と復元
- OAuth コールバックの Docker サポート強化

**パフォーマンス改善**
- モデル可用性チェックをバックグラウンドで実行し起動時間を短縮
- デフォルトヘッダーにAPIキーを含めるよう変更（URLではなく）

## anthropics/claude-code v1.0.54 (2025-07-19)

**Repository:** https://github.com/anthropics/claude-code  
**CHANGELOG URL:** https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### 主な変更点

- **Hooks機能の拡張**: UserPromptSubmitフックを追加し、フック入力に現在の作業ディレクトリを追加
- **カスタムスラッシュコマンド**: フロントマターにargument-hintを追加
- **Windows対応改善**: 
  - OAuthがポート45454を使用し、適切にブラウザURLを構築
  - モード切替がalt + mを使用、プランモードが正しくレンダリング
- **シェル**: ファイル関連エラーを修正するためインメモリシェルスナップショットに切り替え

### v1.0.53の変更点
- @メンションファイルの切り詰めを100行から2000行に更新
- AWSトークンリフレッシュ用のヘルパースクリプト設定を追加: awsAuthRefreshとawsCredentialExport

### v1.0.52の変更点
- MCPサーバーインストラクションのサポートを追加

## cursor v1.2 (2025-07-03)

**Website URL:** https://cursor.sh  
**Changelog URL:** https://cursor.sh/changelog

### Agent Planning, Better Context & Faster Tab

**新機能**

1. **Agent To-dos**
   - エージェントが構造化されたTo-doリストで事前に計画を立てる機能
   - 長期的なタスクの理解と追跡が容易に
   - 依存関係のあるタスクを分解し、チャットとSlackに表示
   - 作業の進行に応じてリストを更新可能

2. **Queued messages**
   - エージェントの現在のタスク完了後にフォローアップメッセージをキューに追加可能
   - キュー内のタスクの並び替えと実行が可能

3. **Memories (GA版)**
   - メモリ生成の品質向上
   - エディタ内UIの改善
   - バックグラウンド生成メモリのユーザー承認機能

4. **PR indexing & search**
   - PRのインデックス化と要約機能
   - 古いPRの意味的検索やPR、issue、commit、branchの明示的な取得が可能
   - GitHubコメント、BugBotレビュー、Slackエージェントサポートを含む

5. **Improved embeddings for semantic search**
   - 新しい埋め込みモデルによりコードベース検索の精度が大幅に向上

6. **Faster Tab**
   - Tab補完が約100ms高速化
   - TTFTが30%削減

7. **Let Agent resolve merge conflicts**
   - マージコンフリクト発生時、エージェントが解決を試みることが可能

8. **Background Agent improvements**
   - PRがチームのテンプレートに従う
   - エージェントブランチへの変更が自動的にプルされる
   - コンフリクトがアクション可能なフォローアップとして表示
   - サイドバーから直接コミット可能

## cline v3.19.7 (2025-07-18)

**Repository:** https://github.com/cline/cline  
**Release URL:** https://github.com/cline/cline/releases/tag/v3.19.7

### 主な変更点

- Claude Codeエラーの改善とドキュメント作成
- 未使用のvscodeインポートの削除
- バックエンドの環境詳細設定をシンプルな構成に移行
- diffエディタウィンドウのスクロールロジックをプラットフォーム固有のクラスに移動
- スタンドアロンTerminal Managerの実装
- すべての拡張ウィンドウでの認証状態変更の処理
- エラーハンドリングと表示ロジックの統一
- **新しいプロバイダー**: Hugging Faceプロバイダーを追加

## windsurf v1.11.0 (2025-07-17)

**Website URL:** https://www.codeium.com  
**Changelog URL:** https://www.codeium.com/changelog

### 主な新機能

1. **Speak to Cascade**
   - 音声入力機能: チャットにタイプする代わりに音声で話しかけることが可能に

2. **@-mentioning conversations**
   - 最初の会話を@メンションすることで、Cascadeがテストを書く際に完全なコンテキストを持つことが可能

3. **Deeper Browser integration**
   - ブラウザで開いているタブについて@メンションを使用してCascadeとチャット可能

4. **JetBrains improvements**
   - Planning Mode、Workflows、ファイルベースのRulesがJetBrains上のCascadeで利用可能に

5. **改善点**
   - Cascadeでterminalを@メンション可能に
   - Auto-Continue設定: Cascadeが制限に達した場合、自動的に応答を継続
   - より多くのMCPサーバーのサポート（Streamable HTTPトランスポートとMCP認証）
   - エンタープライズ向け: ~/.codeium/フォルダに.codeiumignoreを配置することで、すべてのリポジトリでignoreルールを強制可能

## kiro v0.1.x Preview (2025-07-14)

**Website URL:** https://kiro.dev  
**Changelog URL:** https://kiro.dev/changelog/

### Preview release - 新しいエージェント型IDE

**主な機能**

1. **Specs**
   - アプリケーションの複雑な機能の開発プロセスを形式化する構造化アーティファクト
   - 仕様駆動開発のサポート

2. **Hooks**
   - ファイル保存などのイベントで、ドキュメントの更新やテストの生成などのイベント駆動型自動化を設定

3. **Steering**
   - エージェントの動作を導くステアリングファイルの定義

4. **Agentic chat**
   - チャットから機能を構築
   - 手放し実行のためのAutopilotモード、または各変更を手動で承認

5. **MCP**
   - お気に入りのツールやサービスとの統合

## microsoft/vscode 1.102.1 (2025-07-16)

**Repository:** https://github.com/microsoft/vscode  
**Release URL:** https://github.com/microsoft/vscode/releases/tag/1.102.1

### June 2025 Recovery 1

このリリースはリカバリーリリースで、特定の問題の修正に焦点を当てています。AI関連の具体的な変更は記載されていませんでした。

完全なリリースノートは[Updates](https://code.visualstudio.com/updates/v1_102)で確認できます。