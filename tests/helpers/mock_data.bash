#!/bin/bash

# Mock data and responses for testing

# Mock AI tech blog articles data
get_mock_ai_blog_data() {
    cat << 'EOF'
# AI技術ブログ記事まとめ

## Zenn記事
- [LLMの最新動向について](https://zenn.dev/example/articles/llm-trends) - author1
- [Transformerアーキテクチャの進化](https://zenn.dev/example/articles/transformer-evolution) - author2

## Qiita記事
- [機械学習パイプラインの構築](https://qiita.com/example/items/ml-pipeline) - developer1
- [深層学習の最適化手法](https://qiita.com/example/items/dl-optimization) - developer2

## note記事
- [AI開発の現場から](https://note.com/example/n/ai-development) - writer1
- [ChatGPTの活用事例](https://note.com/example/n/chatgpt-use-cases) - writer2
EOF
}

# Mock Hacker News & Reddit data
get_mock_hn_reddit_data() {
    cat << 'EOF'
# コミュニティディスカッション

## Hacker News
- [新しいAIフレームワークがリリース](https://news.ycombinator.com/item?id=123456) - 150 points
- [LLMの推論速度向上について](https://news.ycombinator.com/item?id=123457) - 98 points

## Reddit r/MachineLearning
- [SOTA達成の新論文](https://reddit.com/r/MachineLearning/comments/example1) - 45 upvotes
- [実用的なMLOpsツール](https://reddit.com/r/MachineLearning/comments/example2) - 32 upvotes

## Reddit r/LocalLLaMA
- [ローカルLLMの性能比較](https://reddit.com/r/LocalLLaMA/comments/example3) - 67 upvotes
- [量子化技術の最新動向](https://reddit.com/r/LocalLLaMA/comments/example4) - 28 upvotes
EOF
}

# Mock AI news data
get_mock_ai_news_data() {
    cat << 'EOF'
# AI関連ニュース

## 企業動向
- OpenAI、新しいGPTモデルを発表
- Google、Geminiの性能向上を報告
- Anthropic、Claude 3の新機能をリリース

## 技術動向
- Transformer以降の新アーキテクチャが登場
- マルチモーダルAIの精度が大幅向上
- エッジデバイス向けAI推論の高速化技術

## 業界動向
- AI規制法案の議論が活発化
- 企業でのAI導入事例が急増
- AI人材の需要が過去最高に
EOF
}

# Mock trending repositories data
get_mock_trending_repos_data() {
    cat << 'EOF'
# AIトレンドリポジトリ - 2025-07-20

## [ollama/ollama](https://github.com/ollama/ollama)

### 概要
Ollamaは、ローカル環境で大規模言語モデル（LLM）を簡単に実行できるツールです。開発者がクラウドAPIに依存せず、自分のマシンでLLMを活用できるようになります。

### 主な機能
- ワンコマンドでのモデルインストール
- 複数のLLMモデルをサポート
- RESTful API提供
- GPUアクセラレーション対応

### 注目される理由
プライバシーを重視する開発者や、オフライン環境でのAI開発のニーズが高まる中、ローカルでLLMを動かせるツールとして注目を集めています。

## [microsoft/autogen](https://github.com/microsoft/autogen)

### 概要
AutoGenは、複数のAIエージェントが協調して動作するフレームワークで、複雑なタスクを自動化できます。

### 主な機能
- マルチエージェント会話システム
- 自動コード生成と実行
- カスタマイズ可能なエージェント設計
- LLM統合サポート

### 注目される理由
AIエージェントの実用化が進む中、実際のビジネスタスクに適用できる実装として開発者から高い評価を得ています。
EOF
}

# Mock events data
get_mock_events_data() {
    cat << 'EOF'
# AI開発イベント - 2025-07-20

## Upcoming Events (Next 7 Days)

### Event 1: [Claude API ハンズオンワークショップ](https://connpass.com/event/123456/)
- **主催者**: Anthropic Japan
- **日時**: 2025-07-21 19:00
- **形式**: Online
- **参加費**: Free
- **概要**: Claude APIを使った実践的な開発手法を学ぶハンズオンセッション
- **開発者向けポイント**: 実際にコードを書きながらClaude APIの使い方を習得できる

### Event 2: [LangChain実装入門](https://connpass.com/event/123457/)
- **主催者**: AI Dev Community
- **日時**: 2025-07-23 14:00
- **形式**: Offline (東京・渋谷)
- **参加費**: ¥3,000
- **概要**: LangChainを使ったAIアプリケーション開発の基礎を学ぶ
- **開発者向けポイント**: RAGシステムの実装方法やベストプラクティスを学べる

### Event 3: [Cursor/Windsurf比較セミナー](https://connpass.com/event/123458/)
- **主催者**: Developer Tools Japan
- **日時**: 2025-07-25 18:30
- **形式**: Online
- **参加費**: Free
- **概要**: 最新のAIコーディングアシスタントの比較と活用方法
- **開発者向けポイント**: 実際の開発フローでの使い分けや効果的な利用方法を学べる
EOF
}

# Mock release information data
get_mock_release_data() {
    cat << 'EOF'
# リリース情報 - 2025-07-20

## 主要なリリース

### ツール・ライブラリ

## google-gemini/gemini-cli v0.2.0
- **Release Date**: 2025-07-19
- **Repository**: https://github.com/google-gemini/gemini-cli
- **Release**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.2.0

### Key Changes:
- Added support for Gemini 1.5 Pro
- Improved streaming response handling
- Fixed memory leak in long conversations
- Added --model flag for model selection

## anthropics/claude-code v1.5.0
- **Release Date**: 2025-07-18
- **Repository**: https://github.com/anthropics/claude-code
- **Changelog**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### Key Changes:
- Introduced Claude 3 Opus support
- Enhanced code completion accuracy
- Added workspace-aware context management
- Performance improvements for large codebases

## cursor/cursor v0.30.0
- **Release Date**: 2025-07-17
- **Website**: https://cursor.sh
- **Changelog**: https://cursor.sh/changelog

### Key Changes:
- New AI-powered refactoring tools
- Improved multi-file context understanding
- Added support for custom prompt templates
- Enhanced integration with local LLMs

## cline/cline v2.1.0
- **Release Date**: 2025-07-16
- **Repository**: https://github.com/cline/cline
- **Release**: https://github.com/cline/cline/releases/tag/v2.1.0

### Key Changes:
- Added autonomous debugging capabilities
- Improved file navigation and search
- New terminal integration features
- Enhanced error handling and recovery
EOF
}

# Create mock resource files
create_mock_resources() {
    local test_date="$1"
    local resource_dir="resources/${test_date}"
    
    mkdir -p "$resource_dir"
    
    get_mock_ai_blog_data > "${resource_dir}/tech_blog_articles.md"
    get_mock_hn_reddit_data > "${resource_dir}/community_discussions.md"
    get_mock_ai_news_data > "${resource_dir}/ai_news_summary.md"
    get_mock_trending_repos_data > "${resource_dir}/trending_repositories.md"
    get_mock_events_data > "${resource_dir}/events.md"
    get_mock_release_data > "${resource_dir}/release_information.md"
}