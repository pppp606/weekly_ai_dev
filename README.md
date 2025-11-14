# Weekly AI Development Digest

週刊AI駆動開発投稿用プロジェクトです

## 概要

このプロジェクトは以下のソースから情報を自動収集し、週次レポートを生成します：

- GitHub リリース・チェンジログ
- AI関連ニュース
- AI関連のトレンドリポジトリ
- AI論文トレンド（Hugging Face週次トレンド）
- AI開発イベント（Connpass）
- Hacker News & Reddit のディスカッション
- 日本のテックブログ（Zenn、Qiita、note）

## 特徴

- **自動情報収集**: 複数のソースから最新のAI開発情報を自動収集
- **高品質な記事生成**: textlintを使用した日本語AI文章の品質チェック
- **包括的なテスト**: Promptfooによる品質・安全性テスト
- **柔軟な実行方式**: 対話モード・非対話モードでの実行が可能

## セットアップ

### 必要な依存関係のインストール

```bash
# npm依存関係をインストール
npm install

# textlintの設定確認
npx textlint --version
```

### textlintの使用方法

記事の品質チェックを手動で実行する場合：

```bash
# npmスクリプトを使用した方法（推奨）
npm run lint          # 記事をチェック
npm run lint:fix      # 自動修正可能な問題を修正
npm run lint:check    # textlint設定を確認

# 直接textlintを使用する方法
npx textlint articles/*.md                    # 記事をチェック
npx textlint --fix articles/*.md              # 自動修正
npx textlint articles/weekly-ai-digest-YYYYMMDD.md  # 特定ファイル
```

## 利用方法

### 対話モードでの実行
対話モードでは、下記コマンドを実行することができます。
全体のパイプラインまたは個別のコマンドを実行してください。

### 利用可能なコマンド一覧
- `/weekly_digest_pipeline` 情報の取得、記事の生成、コミットまでの一連の作業を行うパイプライン
- `/generate_weekly_article` 既存データから最終記事を生成（`resources/YYYY-MM-DD/`から）
- `/vibecoding_release_digest` GitHubリリースとチェンジログの更新をチェック
- `/ai_news_digest` 最新のAI関連ニュースと発表を収集
- `/ai_trending_repositories_digest` GitHubのトレンドAI関連リポジトリを分析
- `/ai_trending_papers_digest` Hugging Faceから週次トレンドAI論文トップ3を取得し、詳細な日本語要約を生成
- `/ai_events_digest` Connpassで今後のAI開発イベントを検索
- `/hacker_news_reddit_digest` HNとRedditのトレンドAI開発ディスカッションを収集
- `/ai_tec_blog_digest` Zenn、Qiita、noteでAI開発記事を検索


## 非対話モードでの実行
dangerously-skip-permissionsで実行をします。
dangerously-skip-permissionsである事に注意し、必ずコンテナ内などで実行してください

```bash
claude -p "$(cat .claude/commands/weekly_digest_pipeline.md)" --dangerously-skip-permissions
```

## テスト

このプロジェクトでは、複数のテスト手法を使用して品質と安全性を確保しています：

- **Promptfoo**: AIコマンドの品質と安全性をテスト
- **textlint**: 生成される記事の文章品質をチェック

### Promptfooテストのセットアップ

```bash
cd tests/promptfoo
npm install
```

### Promptfooテストの実行

```bash
# すべてのテストを実行
npm test

# 特定のテストスイートを実行
npm run test:guardrails  # 記事のガードレールをテスト
npm run test:commands    # コマンドの機能をテスト

# テストレポートを生成
npm run test:report
```

### textlintテスト

```bash
# 記事の品質チェック
npm run lint

# 自動修正とチェック
npm run lint:fix

# textlint設定の確認
npm run lint:check
```

### CI/CD

テストは以下のタイミングで自動的に実行されます：
- mainブランチへのプッシュ時
- プルリクエスト作成時
- 手動でのワークフロー実行時

詳細なドキュメント：
- [セットアップガイド](tests/promptfoo/docs/setup-guide.md)
- [テスト作成ガイド](tests/promptfoo/docs/test-writing-guide.md)
- [トラブルシューティング](tests/promptfoo/docs/troubleshooting.md)
