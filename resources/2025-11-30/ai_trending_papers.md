## 🧠 今週のAI論文トレンド

1. **タイトル:** ROOT: Robust Orthogonalized Optimizer for Neural Network Training
   **著者:** Wei He, Kai Han, Hang Zhou, Hanting Chen, Zhicheng Liu, Xinghao Chen, Yunhe Wang (Huawei Noah's Ark Lab)
   **概要:** 大規模言語モデル（LLM）の学習において、既存のモメンタムベースの最適化手法が抱える脆弱性を解決する新しいオプティマイザROOTを提案。従来のMuonやAdamベースのオプティマイザでは、勾配のノイズや非凸最適化問題において安定性が低下する課題があった。ROOTは、行列サイズに応じて細かく調整された適応的ニュートン反復法を用いた「次元ロバスト直交化スキーム」と、外れ値ノイズを抑制しつつ意味のある勾配方向を保持する「最適化ロバストフレームワーク」を導入。これらの組み合わせにより、ノイズの多い環境や非凸問題においても安定した収束と最終性能の向上を実現。LLMの大規模学習における実用的な改善が期待される。
   **arXiv:** https://arxiv.org/abs/2511.20626

2. **タイトル:** General Agentic Memory Via Deep Research
   **著者:** B.Y. Yan, Chaofan Li, Hongjin Qian, Shuqi Lu, Zheng Liu (Beijing Academy of Artificial Intelligence)
   **概要:** AIエージェントの長期記憶システムにおける情報損失問題を解決する「General Agentic Memory（GAM）」フレームワークを提案。従来の静的なメモリシステムでは、重要な履歴情報の取捨選択が困難で、タスク遂行時に必要な情報が失われることが課題だった。GAMは「Just-in-Time Compilation（JIT）」の原理に基づき、オフライン時は軽量なメモリを維持しつつ、実行時に最適化されたコンテキストを動的に構築する。システムは「Memorizer」と「Researcher」の2つのコンポーネントで構成され、前者が重要な履歴情報をハイライトしながら完全な情報をページストアに保持し、後者が事前構築されたメモリをガイドとして必要な情報を検索・統合する。強化学習によるエンドツーエンド最適化も可能で、様々なメモリベースのタスクで既存システムを大幅に上回る性能を達成。
   **arXiv:** https://arxiv.org/abs/2511.18423

3. **タイトル:** GigaEvo: An Open Source Optimization Framework Powered By LLMs And Evolution Algorithms
   **著者:** Valentin Khrulkov, Andrey Galichin, Denis Bashkirov, Dmitry Vinichenko, Oleg Travkin, Roman Alferov, Andrey Kuznetsov, Ivan Oseledets (AIRI)
   **概要:** LLMと進化的計算を組み合わせたハイブリッドアプローチを実装するオープンソースフレームワークGigaEvoを発表。LLMガイド進化研究分野における再現性の課題を解決することを目的として開発された。主要コンポーネントとして、MAP-Elites品質多様性アルゴリズム、非同期DAGベースの評価パイプライン、インサイト生成と双方向系譜追跡を備えたLLM駆動変異オペレータ、柔軟なマルチアイランド進化戦略を実装。モジュラー設計により、設定ベースのセットアップで迅速な実験が可能。Heilbronn三角形配置、正方形への円詰め、高次元キッシング数などの最適化課題で検証を行い、コードと実験資料を公開。LLMを活用した進化的最適化研究のベースラインとして活用が期待される。
   **arXiv:** https://arxiv.org/abs/2511.17592
