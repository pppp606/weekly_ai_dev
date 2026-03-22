## 今週のAI論文トレンド

1. **タイトル:** Demystifying Video Reasoning
   **著者:** Ruisi Wang, Zhongang Cai, Fanyi Pu, Junxiang Xu, Wanqi Yin, Maijunxian Wang, Ran Ji, Chenyang Gu, Bo Li, Ziqi Huang, Hokin Deng, Dahua Lin, Ziwei Liu, Lei Yang
   **概要:** 拡散ベースの動画生成モデルが非自明な推論能力を持つことが近年明らかになっている。従来の研究では、これをChain-of-Frames（CoF）メカニズム、すなわちフレーム間で逐次的に推論が展開される仕組みとして説明してきた。本研究では、この仮説に異議を唱え、推論が主にデノイジングステップに沿って生じるという根本的に異なるメカニズムを明らかにした。定性的分析と標的を絞った探索実験を通じて、モデルが初期のデノイジングステップで複数の候補解を探索し、最終的な回答に段階的に収束するプロセス、すなわちChain-of-Steps（CoS）を発見した。さらに、モデル性能に不可欠な創発的推論挙動として、ワーキングメモリ、自己修正・強化、知覚先行行動の3つを特定した。Diffusion Transformerの内部では、初期層が知覚構造をエンコードし、中間層が推論を実行し、後半層が潜在表現を統合するという機能的特殊化が自律的に発生していることも解明した。これらの知見に基づき、異なるランダムシードから得られた潜在軌跡をアンサンブルすることで推論性能を向上させるトレーニング不要の手法を概念実証として提示している。
   **arXiv:** https://arxiv.org/abs/2603.16870

2. **タイトル:** AI Can Learn Scientific Taste
   **著者:** Jingqi Tong, Mingzhe Li, Hangcheng Li, Yongzhuo Yang, Yurong Mou, Weijie Ma, Zhiheng Xi, Hongji Chen, Xiaoran Liu, Qinyuan Cheng, Ming Zhang, Qiguang Chen, Weifeng Ge, Qipeng Guo, Tianlei Ying, Tianxiang Sun, Yining Zheng, Xinchi Chen, Jun Zhao, Ning Ding, Xuanjing Huang, Yugang Jiang, Xipeng Qiu
   **概要:** 優れた科学者は高い判断力と先見性を持ち、それは「科学的センス（scientific taste）」と呼ばれる能力に密接に関連している。本研究では、科学的センスを「高いインパクトを持つ研究アイデアを評価・提案する能力」と定義し、AIにこの能力を学習させるための新しいパラダイムを提案する。具体的には、大規模なコミュニティシグナルを教師信号として活用するReinforcement Learning from Community Feedback（RLCF）を導入し、科学的センスの学習を選好モデリングとアラインメントの問題として定式化した。選好モデリングでは、70万件の分野・時期を揃えた高被引用論文と低被引用論文のペアで「Scientific Judge」を訓練し、アラインメントでは報酬モデルとしてのScientific Judgeを用いてポリシーモデル「Scientific Thinker」を訓練した。実験の結果、Scientific JudgeはGPT-5.2やGemini 3 Proなどの最先端LLMを上回る性能を示し、将来年度のテスト、未知の分野、査読選好への汎化性能も確認された。AIが科学的センスを獲得できることを示す本成果は、人間レベルのAI科学者に向けた重要な一歩となる。
   **arXiv:** https://arxiv.org/abs/2603.14473

3. **タイトル:** InCoder-32B: Code Foundation Model for Industrial Scenarios
   **著者:** Jian Yang, Wei Zhang, Jiajun Wu, Junhang Cheng, Shawn Guo, Haowen Wang, Weicheng Gu, Yaxin Du, Joseph Li, Fanglin Xu, Yizhi Li, Lin Jing, Yuanbo Wang, Yuhan Gao, Ruihao Gong, Chuan Hao, Ran Tao, Aishan Liu, Tuney Zheng, Ganqu Cui, Zhoujun Li, Mingjie Tang, Chenghua Lin, Wayne Xin Zhao, Xianglong Liu, Ming Zhou, Bryan Dai, Weifeng Lv
   **概要:** 近年のコード大規模言語モデルは汎用プログラミングタスクで目覚ましい進歩を遂げているが、ハードウェアセマンティクスの理解、特殊な言語構文への対応、厳格なリソース制約が求められる産業シナリオでは性能が大幅に低下する。この課題に対処するため、本研究ではInCoder-32B（Industrial-Coder-32B）を提案する。これは、チップ設計、GPUカーネル最適化、組み込みシステム、コンパイラ最適化、3Dモデリングにわたるコードインテリジェンスを統合した初の320億パラメータのコード基盤モデルである。効率的なアーキテクチャを採用し、汎用コードの事前学習、キュレーションされた産業コードのアニーリング、合成産業推論データを用いたコンテキスト長8Kから128Kへの段階的拡張による中間学習、実行に基づく検証を用いた後学習の4段階で訓練された。14の主要な汎用コードベンチマークと4つの専門ドメインにまたがる9つの産業ベンチマークで広範な評価を実施した結果、InCoder-32Bは汎用タスクで高い競争力を維持しつつ、産業ドメインにおいて強力なオープンソースベースラインを確立した。
   **arXiv:** https://arxiv.org/abs/2603.16790
