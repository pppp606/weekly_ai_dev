## 今週のAI論文トレンド

1. **タイトル:** Wan-Move: Motion-controllable Video Generation via Latent Trajectory Guidance
   **著者:** Ruihang Chu, Yefei He, Zhekai Chen, Shiwei Zhang, Xiaogang Xu, Bin Xia, Dingdong Wang, Hongwei Yi, Xihui Liu, Hengshuang Zhao, Yu Liu, Yingya Zhang, Yujiu Yang
   **概要:** 本研究は、動画生成モデルにおけるモーション制御の精度を飛躍的に向上させるフレームワーク「Wan-Move」を提案している。従来の動画生成では、生成される動きを細かく制御することが困難であったが、本手法では密な点軌跡（Dense Point Trajectories）を用いてオブジェクトの動きを表現する。これらの軌跡を潜在空間に変換し、最初のフレームの特徴を各軌跡パスに沿って伝播させることで、時空間的に整合した特徴マップを生成する。既存のImage-to-Videoモデルにアーキテクチャの変更なしで統合可能という点が実用的であり、5秒・480pの動画生成において、商用サービスKling 1.5 ProのMotion Brushに匹敵するモーション制御性能を達成した。また、多様なコンテンツと検証済みモーションアノテーションを含む評価ベンチマーク「MoveBench」も公開されており、この分野の研究促進に貢献している。
   **arXiv:** https://arxiv.org/abs/2512.08765

2. **タイトル:** T-pro 2.0: An Efficient Russian Hybrid-Reasoning Model and Playground
   **著者:** Dmitrii Stoianov, Danil Taranets, Olga Tsymboi, Ramil Latypov, Almaz Dautov, Vladislav Kruglikov, Nikita Surkov, German Abramov, Pavel Gein, Dmitry Abulkhanov, Mikhail Gashkov, Viktor Zelenkovskiy, Artem Batalov, Aleksandr Medvedev, Anatolii Potapov
   **概要:** T-pro 2.0は、ロシア語に特化したオープンウェイトの大規模言語モデルであり、ハイブリッド推論と効率的な推論処理を実現している。本モデルの特徴は、直接回答と推論トレース生成の両方を処理できる点にあり、専用のトークナイザーと修正された推論パイプラインによってこれを実現している。研究チームは、モデルの重み、50万件のインストラクションデータセット、推論ベンチマーク、および関連する推論コンポーネントをHugging Faceで公開している。英語以外の言語（特にロシア語）における推論能力の向上は、グローバルなAI研究の多様性を高める重要な取り組みであり、再現可能な研究とロシア語推論タスクのカスタマイズを可能にするリソースとして注目されている。
   **arXiv:** https://arxiv.org/abs/2512.10430

3. **タイトル:** Visionary: The World Model Carrier Built on WebGPU-Powered Gaussian Splatting Platform
   **著者:** Yuning Gong, Yifei Liu, Yifan Zhan, Muyao Niu, Xueying Li, Yuanjun Liao, Jiaming Chen, Yuanyuan Gao, Jiaqi Chen, Minming Chen, Li Zhou, Yuning Zhang, Wei Wang, Xiaoqing Hou, Huaxi Huang, Shixiang Tang, Le Ma, Dingwen Zhang, Xue Yang, Junchi Yan, Yanchi Zhang, Yinqiang Zheng, Xiao Sun, Zhihang Zhong
   **概要:** Visionaryは、3D Gaussian SplattingとメッシュコンテンツをWebブラウザ上でリアルタイムレンダリングするためのプラットフォームである。WebGPU技術とフレームごとのONNX推論を活用し、軽量でアクセスしやすいインターフェースを通じて動的なニューラル処理を実現している。本システムの核となる「Gaussian Generator Contract」は標準化されており、MLPベースの3DGS、4DGS、ニューラルアバター、エンハンスメントネットワークなど、さまざまな実装をサポートする。ブラウザ内で推論とレンダリングを組み合わせることで、再構成や生成アプリケーションにおける手法の再現、比較、デプロイの障壁を大幅に下げることを目指している。3D生成・レンダリング技術の民主化という観点で意義深い研究である。
   **arXiv:** https://arxiv.org/abs/2512.08478
