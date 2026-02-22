## 今週のAI論文トレンド

1. **タイトル:** SpargeAttention2: Trainable Sparse Attention via Hybrid Top-k+Top-p Masking and Distillation Fine-Tuning
   **著者:** Jintao Zhang, Kai Jiang, Chendong Xiang, Weiqi Feng, Yuezhou Hu, Haocheng Xi, Jianfei Chen, Jun Zhu
   **概要:** 本論文は、拡散モデル（Diffusion Model）の推論を大幅に高速化する学習可能なスパースアテンション手法「SpargeAttention2」を提案している。従来のトレーニング不要なスパースアテンション手法は推論の加速に有効であったが、学習可能にすることでさらなるスパース性の向上が期待されていた。著者らは、Top-kとTop-pという2つの一般的なマスキングルールの失敗モードを分析し、それぞれの弱点を補完するハイブリッドマスキング手法を考案した。さらに、拡散損失によるファインチューニングの限界を指摘し、蒸留に基づくファインチューニング目的関数を導入することで、スパースアテンション適用時の生成品質を維持する方法を提案している。動画拡散モデルにおける実験では、アテンションスパース性95%、アテンション処理の16.2倍の高速化を達成しつつ、生成品質を維持することに成功した。この成果は、大規模拡散モデルの実用的なデプロイメントにおいて、計算コストの大幅な削減を可能にする点で重要な貢献である。
   **arXiv:** https://arxiv.org/abs/2602.13515

2. **タイトル:** Mobile-Agent-v3.5: Multi-platform Fundamental GUI Agents
   **著者:** Haiyang Xu, Xi Zhang, Haowei Liu, Junyang Wang, Zhaozai Zhu, Shengjie Zhou, Xuhao Hu, Feiyu Gao, Junjie Cao, Zihua Wang, Zhiyuan Chen, Jitong Liao, Qi Zheng, Jiahui Zeng, Ze Xu, Shuai Bai, Junyang Lin, Jingren Zhou, Ming Yan
   **概要:** 本論文は、デスクトップ、モバイル、ブラウザなど複数のプラットフォームに対応したGUIエージェントモデル「GUI-Owl-1.5」を提案している。2Bから235Bまでの複数サイズで提供され、クラウドとエッジの協調動作やリアルタイムインタラクションを実現する。20以上のGUIベンチマークにおいてオープンソースモデルの中で最高水準の性能を達成し、OSWorldで56.5、AndroidWorldで71.6、WebArenaで48.4、ScreenSpotProで80.3のスコアを記録した。技術的には、シミュレーション環境とクラウドサンドボックスを組み合わせたハイブリッドデータフライホイール、ツール/MCP利用・メモリ・マルチエージェント適応を含む統一的なエージェント能力強化パイプライン、およびマルチプラットフォーム間の競合と長期タスクの低訓練効率に対処する新しい環境強化学習アルゴリズム「MRPO」を導入している。GUIエージェントの汎用性と実用性を大幅に向上させた成果であり、実世界でのAIエージェント展開に向けた重要な進展である。
   **arXiv:** https://arxiv.org/abs/2602.16855

3. **タイトル:** Unified Latents (UL): How to train your latents
   **著者:** Jonathan Heek, Emiel Hoogeboom, Thomas Mensink, Tim Salimans
   **概要:** 本論文は、拡散事前分布（Diffusion Prior）による正則化と拡散モデルによるデコーディングを統合した潜在表現学習フレームワーク「Unified Latents（UL）」を提案している。エンコーダの出力ノイズと事前分布の最小ノイズレベルを関連付けることで、潜在ビットレートの厳密な上界を与えるシンプルな訓練目的関数を導出した。ImageNet-512において、Stable Diffusionの潜在表現を用いたモデルよりも少ない訓練FLOPsで、FID 1.4という競争力のある画像生成品質と高い再構成品質（PSNR）を達成している。さらに、動画生成の分野でもKinetics-600データセットにおいてFVD 1.3という新たな最高水準を記録した。潜在表現の学習方法を根本から見直すアプローチであり、画像・動画生成モデルの効率性と品質の両立に向けた重要な理論的・実践的貢献を示している。
   **arXiv:** https://arxiv.org/abs/2602.17270
