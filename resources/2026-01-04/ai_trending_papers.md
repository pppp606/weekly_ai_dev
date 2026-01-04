## 今週のAI論文トレンド

1. **タイトル:** Improving Multi-step RAG with Hypergraph-based Memory for Long-Context Complex Relational Modeling
   **著者:** Chulun Zhou, Chunkang Zhang, Guoxin Yu, Fandong Meng, Jie Zhou, Wai Lam, Mo Yu
   **概要:** 本論文は、大規模言語モデル（LLM）における複雑な推論タスクを強化するための新しいハイパーグラフベースのメモリ機構「HGMem」を提案している。従来のRAG（Retrieval-Augmented Generation）システムでは、作業メモリが単なる事実の蓄積に留まり、事実間の高次相関関係を見落としていた。HGMemは、メモリをハイパーグラフとして表現し、ハイパーエッジが個別のメモリユニットに対応することで、メモリ内での高次相互作用の漸進的形成を可能にする。この動的かつ表現力豊かな構造により、焦点となる問題周辺の事実と思考を結びつけ、より深い推論のための統合された知識構造へと進化する。実験結果では、HGMemがマルチステップRAGを一貫して改善し、多様なタスクにおいて強力なベースラインシステムを大幅に上回ることが示された。
   **arXiv:** https://arxiv.org/abs/2512.23959

2. **タイトル:** Dynamic Large Concept Models: Latent Reasoning in an Adaptive Semantic Space
   **著者:** Xingwei Qu, Shaowen Wang, Zihao Huang, Kai Hua, Fan Yin, Rui-Jie Zhu, Jundong Zhou, Qiyang Min, Zihao Wang, Yizhi Li, Tianyu Zhang, He Xing, Zheng Zhang, Yuxuan Song, Tianyu Zheng, Zhiyuan Zeng, Chenghua Lin, Ge Zhang, Wenhao Huang
   **概要:** 本論文は、言語の非均一な情報密度に対応するための新しい階層的言語モデリングフレームワーク「Dynamic Large Concept Models（DLCM）」を提案している。従来のLLMは全てのトークンに均一な計算を適用するが、これは局所的に予測可能なスパンに容量を浪費し、意味的に重要な遷移には計算リソースが不足する問題があった。DLCMは潜在表現から意味境界を学習し、計算をトークンから圧縮されたコンセプト空間へとシフトさせる。事前定義された言語単位に依存せず、可変長のコンセプトをエンドツーエンドで発見する。圧縮認識スケーリング則を導入し、トークンレベル容量、コンセプトレベル推論容量、圧縮率を分離することで、固定FLOPsの下での原理的な計算配分を可能にした。実験では、12のゼロショットベンチマークで平均+2.69%の改善を達成した。
   **arXiv:** https://arxiv.org/abs/2512.24617

3. **タイトル:** DiffThinker: Towards Generative Multimodal Reasoning with Diffusion Models
   **著者:** Zefeng He, Xiaoye Qu, Yafu Li, Tong Zhu, Siyuan Huang, Yu Cheng
   **概要:** 本論文は、マルチモーダル推論のための新しいパラダイム「生成的マルチモーダル推論」を確立し、拡散モデルベースの推論フレームワーク「DiffThinker」を提案している。現在のMLLM（Multimodal Large Language Models）は推論プロセスがテキスト中心であり、複雑な長期視覚中心タスクでは最適な性能を発揮できない問題があった。DiffThinkerはマルチモーダル推論をネイティブな画像から画像への生成タスクとして再定式化し、視覚中心タスクにおいて優れた論理的一貫性と空間精度を実現する。効率性、制御可能性、ネイティブな並列性、協調性という4つの核心的特性を明らかにした。シーケンシャルプランニング、組合せ最適化、制約充足、空間構成の4つのドメインにおける実験で、GPT-5（+314.2%）、Gemini-3-Flash（+111.6%）、ファインチューニングされたQwen3-VL-32Bベースライン（+39.0%）を大幅に上回る性能を示した。
   **arXiv:** https://arxiv.org/abs/2512.24165
