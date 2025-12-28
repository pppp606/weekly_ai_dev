## 🧠 今週のAI論文トレンド

1. **タイトル:** DataFlow: An LLM-Driven Framework for Unified Data Preparation and Workflow Automation in the Era of Data-Centric AI
   **著者:** Hao Liang, Xiaochen Ma, Zhou Liu, Zhen Hao Wong, Zhengyang Zhao, Zimo Meng, Runming He, Chengyu Shen, Qifeng Cai, Zhaoyang Han, Meiyi Qiang, Yalin Feng, Tianyi Bai, Zewei Pan, Ziyi Guo, Yizhen Jiang, Jingwen Deng, Qijie You, Peichao Lai, Tianyu Guo, Chi Hsu Tsai, Hengyi Feng, Rui Hu, Wenkai Yu, Junbo Niu, Bohan Zeng, Ruichuan An, Lu Ma, Jihao Huang, Yaowei Zheng, Conghui He, Linpeng Tang, Bin Cui, Weinan E, Wentao Zhang (Peking University)
   **概要:** 大規模言語モデル（LLM）の学習に必要な高品質データの準備は、現在多くの場合アドホックなアプローチに依存しており、再利用性やスケーラビリティに課題がある。本研究では、モジュール化・再利用可能・組み合わせ可能なデータ変換を実現するシステムレベルの抽象化を導入した統一フレームワーク「DataFlow」を提案している。約200の再利用可能なオペレーターと、テキスト・数学的推論・コード・Text-to-SQL・エージェント型RAG・知識抽出の6つの汎用パイプラインを提供する。AIエージェントコンポーネントにより、自然言語の仕様から実行可能なワークフローへの自動変換も可能となっている。評価実験では、Text-to-SQLタスクで+3%、コードベンチマークで+7%の改善を達成し、データ中心AI開発のシステム基盤としての有効性を実証した。
   **arXiv:** https://arxiv.org/abs/2512.16676

2. **タイトル:** Probing Scientific General Intelligence of LLMs with Scientist-Aligned Workflows
   **著者:** Wanghan Xu 他106名
   **概要:** 科学的汎用知能（Scientific General Intelligence: SGI）は、科学分野を横断して自律的に構想・調査・推論する能力として定義されるが、これを評価する統一的なフレームワークは存在していなかった。本研究では、Practical Inquiry Modelに基づき、深層リサーチ、アイデア生成、ドライ/ウェット実験における推論という4つの科学者整合型タスクを設定し、Science誌の125の大問に基づく1,000以上の専門家キュレーションサンプルからなる「SGI-Bench」を構築した。既存LLMの評価では、深層リサーチの完全一致率10-20%、アイデアの実現可能性の欠如、マルチモーダル推論の困難さなど、大きな性能ギャップが明らかになった。また、推論時に検索拡張された新規性報酬を用いる「Test-Time Reinforcement Learning（TTRL）」を導入し、仮説の新規性向上を実現している。
   **arXiv:** https://arxiv.org/abs/2512.16969

3. **タイトル:** SemanticGen: Video Generation in Semantic Space
   **著者:** Jianhong Bai, Xiaoshi Wu, Xintao Wang, Xiao Fu, Yuanxing Zhang, Qinghe Wang, Xiaoyu Shi, Menghan Xia, Zuozhu Liu, Haoji Hu, Pengfei Wan, Kun Gai (Kling Team)
   **概要:** 現在の動画生成モデルは、VAE空間で潜在表現の分布を学習してからピクセルにデコードするアプローチを採用しているが、収束の遅さや長時間動画での計算コストに課題がある。本研究では、より高次の意味空間（Semantic Space）で生成を行う新しいアプローチ「SemanticGen」を提案する。2段階プロセスを採用し、第1段階では拡散モデルが動画全体の構造を規定するコンパクトな意味的特徴を生成し、第2段階では別の拡散モデルがその意味特徴を条件としてVAE潜在表現を生成する。この意味空間アプローチにより、VAE潜在空間と比較して高速な収束を実現し、より長いシーケンスへの効率的なスケーリングが可能となった。実験結果は、既存の最先端手法を上回る動画品質を達成したことを示している。
   **arXiv:** https://arxiv.org/abs/2512.20619
