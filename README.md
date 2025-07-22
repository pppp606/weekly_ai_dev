# Weekly AI Development Digest

週刊AI駆動開発投稿用プロジェクトです

## 概要

このプロジェクトは以下のソースから情報を自動収集し、週次レポートを生成します：

- GitHub リリース・チェンジログ
- AI関連ニュース
- AI関連のトレンドリポジトリ
- AI開発イベント（Connpass）
- Hacker News & Reddit のディスカッション
- 日本のテックブログ（Zenn、Qiita、note）

## 利用方法

## 対話モードでの実行
対話モードでは、下記コマンドを実行することができます。
全体のパイプラインまたは個別のコマンドを実行してください。

### 利用可能なコマンド一覧
- `/weekly_digest_pipeline` 情報の取得、記事の生成、コミットまでの一連の作業を行うパイプライン
- `/generate_weekly_article` 既存データから最終記事を生成（`resources/YYYY-MM-DD/`から）
- `/vibecoding_release_digest` GitHubリリースとチェンジログの更新をチェック
- `/ai_news_digest` 最新のAI関連ニュースと発表を収集
- `/ai_trending_repositories_digest` GitHubのトレンドAI関連リポジトリを分析
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

このプロジェクトでは、Promptfooを使用してAIコマンドの品質と安全性をテストしています。

### テストのセットアップ

```bash
cd tests/promptfoo
npm install
```

### テストの実行

```bash
# すべてのテストを実行
npm test

# 特定のテストスイートを実行
npm run test:guardrails  # 記事のガードレールをテスト
npm run test:commands    # コマンドの機能をテスト

# テストレポートを生成
npm run test:report
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
