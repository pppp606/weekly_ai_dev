## 今週のAI論文トレンド

1. **タイトル:** Idea2Story: An Automated Pipeline for Transforming Research Concepts into Complete Scientific Narratives
   **著者:** Tengyue Xu, Zhuoyang Qian, Gaoge Liu, Li Ling, Zhentao Zhang, Biao Wu, Shuo Zhang, Ke Lu, Wei Shi, Ziqi Wang, Zheng Feng, Yan Luo, Shu Xu, Yongjin Chen, Zhibo Feng, Zhuo Chen, Bruce Yuan, Harry Wang, Kris Chen
   **概要:** 本論文は、研究コンセプトから完全な科学的論文を自動生成するための事前計算駆動型フレームワークを提案している。従来のLLMベースのエージェントが抱えるコンテキストウィンドウの制約やオンライン推論の計算コストの問題に対処するため、査読済み論文とそのレビューフィードバックを継続的に収集し、コア手法ユニットを抽出して構造化された知識グラフを構築するアプローチを採用している。実行時には研究目標を確立されたパラダイムにマッチングさせ、検証済みの研究パターンを効率的に検索する。これにより知識構築をオフラインフェーズに移行し、リアルタイムの文献推論への依存を排除している。著者らは、このシステムが一貫性のある方法論的に健全な研究パターンを生成し、エンドツーエンドの研究デモンストレーションを産出できることを実証した。科学的発見の自動化における新たなパラダイムを示す研究として注目される。
   **arXiv:** https://arxiv.org/abs/2601.20833

2. **タイトル:** Everything in Its Place: Benchmarking Spatial Intelligence of Text-to-Image Models
   **著者:** Zengbin Wang, Xuecai Hu, Yong Wang, Feng Xiong, Man Zhang, Xiangxiang Chu
   **概要:** 現在のテキストから画像を生成するモデルが複雑な空間関係の処理に苦慮しているという課題に取り組んだ研究である。著者らは空間知能を体系的に評価するための新しいベンチマーク「SpatialGenEval」を導入した。このベンチマークは25の実世界シーン、10の空間サブドメインにわたる1,230の詳細なプロンプトと、オブジェクト配置から因果関係までをカバーする質問・回答ペアで構成される。21の主要モデルの評価を行った結果、高次の空間推論が依然として主要なボトルネックであることが明らかになった。さらに、15,400のテキスト・画像ペアからなるデータセット「SpatialT2I」を作成し、Stable Diffusion-XL、Uniworld-V1、OmniGen2などの基盤モデルをファインチューニングしたところ、それぞれ+4.2%、+5.7%、+4.4%の一貫した性能向上を達成した。データ中心のパラダイムが画像生成の空間理解を強化できることを示した意義ある成果である。
   **arXiv:** https://arxiv.org/abs/2601.20354

3. **タイトル:** Scaling Embeddings Outperforms Scaling Experts in Language Models
   **著者:** Hong Liu, Jiaqi Zhang, Chao Wang, Xing Hu, Linkun Lyu, Jiaqi Sun, Xurui Yang, Bo Wang, Fengcun Li, Yulei Qian, Lingtong Si, Yerui Sun, Rumei Li, Peng Pei, Yuchen Xie, Xunliang Cai
   **概要:** 本研究は、スパースモデルのスケーリングにおいて、Mixture-of-Experts（MoE）アプローチの代替として埋め込みスケーリングの有効性を調査している。分析の結果、埋め込みスケーリングがエキスパートスケーリングよりも優れた性能トレードオフを提供するシナリオを特定した。パラメータ配分、モデル次元、コンポーネント間の相互作用効果などの主要なアーキテクチャ上の考慮事項を検討している。著者らは、685億パラメータ（活性化パラメータ約30億）のモデル「LongCat-Flash-Lite」を提案し、300億以上のパラメータを埋め込みに充てている。このモデルは同規模の代替モデルと比較して競争力のある性能を示し、特にエージェント系タスクやコーディング領域で優れた結果を達成した。投機的デコーディングなどのシステム最適化により、理論的なスパース性の利点を実際の推論速度向上に変換することにも成功している。
   **arXiv:** https://arxiv.org/abs/2601.21204
