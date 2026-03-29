# AI News Summary - 2026-03-29

## Major Announcements

### OpenAI
- **Title**: ChatGPT での商品探し機能の強化 (Powering Product Discovery in ChatGPT)
- **Date**: 2026-03-24
- **Source**: https://openai.com/index/powering-product-discovery-in-chatgpt/
- **Summary**: OpenAI は ChatGPT のショッピング体験を大幅に強化し、Agentic Commerce Protocol（ACP）を拡張して商品探索に対応した。Salesforce や Stripe などのサードパーティ連携を含む販売者向けプロトコルを提供し、Target、Sephora、Nordstrom、Best Buy などの大手小売企業が参加。Shopify Catalog との統合も実現している。
- **開発者への影響**: ACP は開発者がコマース体験を AI ネイティブに構築するための新しいプロトコルとなる。Shopify 連携では販売者側の追加対応が不要で、ChatGPT アプリ開発を通じた高度な連携も可能。Walmart は ChatGPT 内で直接利用できるアプリ体験を導入した。

### OpenAI
- **Title**: OpenAI Safety Bug Bounty プログラムの開始
- **Date**: 2026-03-25
- **Source**: https://openai.com/index/safety-bug-bounty/
- **Summary**: OpenAI は AI の悪用・安全性リスクに焦点を当てた公開 Safety Bug Bounty プログラムを開始した。従来の Security Bug Bounty を補完するもので、エージェント型リスク（MCP を含むサードパーティプロンプトインジェクション、データ流出）、OpenAI 固有情報の漏洩、アカウント/プラットフォームの整合性に関する脆弱性が対象。
- **開発者への影響**: MCP 連携やエージェント型製品（Browser、ChatGPT Agent）のセキュリティリスクが公式に認識された形となり、開発者はエージェント型アプリケーション構築時のセキュリティ設計をより意識する必要がある。研究者は Bugcrowd 経由でプログラムに参加可能。

### OpenAI
- **Title**: Inside our approach to the Model Spec
- **Date**: 2026-03-25
- **Source**: https://openai.com/index/our-approach-to-the-model-spec/
- **Summary**: OpenAI は Model Spec（モデル行動の公式フレームワーク）の設計思想と運用方法を詳細に公開した。Model Spec はモデルの指示遵守、競合解決、ユーザーの自由の尊重、安全な振る舞いを定義する文書であり、開発者、研究者、政策立案者が検証・議論できる形式で提供される。
- **開発者への影響**: OpenAI のモデル動作の設計原則が透明化されたことで、API を利用する開発者はモデルの振る舞いの理由をより深く理解でき、アプリケーション設計の参考になる。

### Google DeepMind
- **Title**: Gemini 3.1 Flash Live: Making audio AI more natural and reliable
- **Date**: 2026-03-26
- **Source**: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-live/
- **Summary**: Google は Gemini 3.1 Flash Live を発表し、リアルタイム音声 AI の自然さと信頼性を向上させた。Google の製品エコシステム全体で利用可能となり、音声対話のユーザー体験が大幅に改善される。
- **開発者への影響**: リアルタイム音声アプリケーション開発者にとって、Gemini 3.1 Flash Live はより自然な会話型 AI 体験を構築するための新たなモデルオプションとなる。

### Google Research
- **Title**: Vibe Coding XR: Accelerating AI + XR Prototyping with XR Blocks and Gemini
- **Date**: 2026-03-25
- **Source**: https://research.google/blog/vibe-coding-xr-accelerating-ai-xr-prototyping-with-xr-blocks-and-gemini/
- **Summary**: Google は XR Blocks と Gemini を組み合わせた「Vibe Coding XR」を発表した。自然言語プロンプトから60秒以内で物理演算対応の WebXR アプリケーションを生成でき、深度センシング、ハンドトラッキング、物理シミュレーションなどをサポートする。オープンソースとして GitHub で公開。
- **開発者への影響**: 自然言語だけで XR アプリのプロトタイピングが可能になり、AI 駆動開発の新領域を開拓。WebXR、three.js、LiteRT.js ベースで、デスクトップシミュレーションと Android XR 実機の両方でテスト可能。GitHub リポジトリ: github.com/google/xrblocks

### Google Research
- **Title**: TurboQuant: Redefining AI Efficiency with Extreme Compression
- **Date**: 2026-03-24
- **Source**: https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/
- **Summary**: Google Research は LLM およびベクトル検索エンジンの量子化アルゴリズム「TurboQuant」を発表した。PolarQuant 圧縮と QJL エラー補正の2段階で、KV キャッシュを3ビットに圧縮しつつ精度を維持。H100 GPU 上で最大8倍の性能向上を達成。
- **開発者への影響**: トレーニング不要のデータ非依存アプローチにより、開発者はより大きなモデルをより少ないメモリで実行可能になる。KV キャッシュメモリを6倍以上削減でき、長コンテキスト LLM やセマンティック検索の実用的なデプロイが容易になる。

### Meta AI
- **Title**: SAM 3.1: Faster and More Accessible Real-Time Video Detection and Tracking
- **Date**: 2026-03-27
- **Source**: https://ai.meta.com/blog/segment-anything-model-3/
- **Summary**: Meta は Segment Anything Model の最新版 SAM 3.1 を発表した。リアルタイム動画のセグメンテーション・追跡性能が向上し、マルチプレキシングとグローバルリーズニング機能により、より高速でアクセスしやすくなった。
- **開発者への影響**: コンピュータビジョンアプリケーション開発者にとって、リアルタイム映像解析や物体追跡機能の構築がより容易になる。

### Hugging Face
- **Title**: Liberate your OpenClaw - オープンソースモデルへの移行ガイド
- **Date**: 2026-03-27
- **Source**: https://huggingface.co/blog/liberate-your-openclaw
- **Summary**: Hugging Face は、OpenClaw エージェントプラットフォームのユーザー向けにオープンソースモデルへの移行ガイドを公開した。Hugging Face Inference Providers（クラウド）と llama.cpp（ローカル）の2つの移行パスを提供。推奨モデルとして GLM-5（クラウド）と Qwen3.5-35B-A3B（ローカル、32GB RAM で動作）を紹介している。
- **開発者への影響**: クローズドモデルに依存しないエージェント開発のための実践的なガイドとなる。Hugging Face PRO の月額 $2 無料クレジットを活用したコスト効率の高い開発や、llama.cpp によるプライバシー重視のローカル開発が可能。

### Hugging Face / ServiceNow
- **Title**: A New Framework for Evaluating Voice Agents (EVA)
- **Date**: 2026-03-24
- **Source**: https://huggingface.co/blog/ServiceNow-AI/eva
- **Summary**: ServiceNow は音声エージェントのエンドツーエンド評価フレームワーク「EVA」を発表した。タスク精度とユーザー体験の両方を同時に評価する初のフレームワークで、bot-to-bot 音声アーキテクチャを使用。Pipecat（オープンソース Python フレームワーク）上で構築され、20種のシステム（プロプライエタリ・オープンソース）を評価済み。
- **開発者への影響**: 音声エージェント開発者がタスク完了率とユーザー体験のトレードオフを定量的に評価できるようになる。GitHub（github.com/ServiceNow/eva）でコード公開済みで、HuggingFace 上にデータセットも提供。

## Other Notable Updates

### Microsoft Research
- **Title**: Systematic Debugging for AI Agents: Introducing the AgentRx Framework
- **Date**: 2026-03-12（期間外だが参考情報として記載）
- **Source**: https://www.microsoft.com/en-us/research/blog/systematic-debugging-for-ai-agents-introducing-the-agentrx-framework/
- **Summary**: AI エージェントのデバッグツール AgentRx を発表。クラウドインシデント処理や API ワークフロー管理における自律型 AI システムの透明性課題に対応する。

### Microsoft Research
- **Title**: AsgardBench / GroundedPlanBench
- **Date**: 2026-03-26
- **Source**: https://www.microsoft.com/en-us/research/blog/asgardbench-a-benchmark-for-visually-grounded-interactive-planning/
- **Summary**: ロボティクス向けのベンチマーク2件を発表。シミュレーション環境での AI エージェントの視覚的理解・計画立案能力を評価する。主にロボティクス分野向けで、AI 駆動開発への直接的な影響は限定的。

## Source References
- OpenAI Blog: https://openai.com/news/
- Google AI Blog: https://blog.research.google/
- Google Research Blog: https://research.google/blog/
- Anthropic News: https://www.anthropic.com/news
- Meta AI Blog: https://ai.meta.com/blog/
- Microsoft Research Blog: https://www.microsoft.com/en-us/research/blog/
- DeepMind Blog: https://deepmind.google/discover/blog/
- Hugging Face Blog: https://huggingface.co/blog
