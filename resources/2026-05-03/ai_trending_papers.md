## 今週のAI論文トレンド

1. **タイトル:** Recursive Multi-Agent Systems
   **著者:** Xiyuan Yang, Jiaru Zou, Rui Pan, Ruizhong Qiu, Pan Lu, Shizhe Diao, Jindong Jiang, Hanghang Tong, Tong Zhang, Markus J. Buehler, Jingrui He, James Zou
   **概要:** 単一モデルにおける再帰的(ループ型)言語モデルが推論深化のための新しいスケーリング軸として注目される中、本研究はこの原理をマルチエージェントシステム全体へと拡張し、「エージェント協調そのものを再帰によってスケールできるか」という問いに取り組んでいる。提案手法のRecursiveMASは、システム全体を統一的な潜在空間上の再帰計算として定式化し、軽量なRecursiveLinkモジュールを介して異種エージェントを協調ループとして接続することで、潜在空間内での思考生成とエージェント間の潜在状態転送を実現する。学習にはinner-outerループ方式を採用し、再帰ラウンドをまたぐ勾配ベースのクレジット割当によりシステム全体を共最適化する仕組みを備える。理論面ではテキストベース手法より計算効率に優れ、再帰学習中も勾配が安定することが示されている。実験では4種類のエージェント協調パターンと数学・科学・医療・検索・コード生成にまたがる9ベンチマークで評価し、既存の単一/マルチエージェントおよび再帰計算ベースラインに対し平均8.3%の精度向上、1.2〜2.4倍の推論高速化、34.6〜75.6%のトークン削減を同時に達成した点に意義がある。
   **arXiv:** https://arxiv.org/abs/2604.25917

2. **タイトル:** Agentic World Modeling: Foundations, Capabilities, Laws, and Beyond
   **著者:** Meng Chu, Xuan Billy Zhang, Kevin Qinghong Lin, Lingdong Kong, Jize Zhang, Teng Tu, Weijian Ma, Ziqi Huang, Senqiao Yang, Wei Huang, Yeying Jin, Zhefan Rao, Jinhui Ye, Xinyu Lin, Xichen Zhang, Qisheng Hu, Shuai Yang, Leyang Shen, Wei Chow, Yifei Dong, Fengyi Wu, Quanyu Long, Bin Xia, Shaozuo Yu, Mingkang Zhu, Wenhu Zhang, Jiehui Huang, Haokun Gui, Haoxuan Che, Long Chen, Qifeng Chen, Wenxuan Zhang, Wenya Wang, Xiaojuan Qi, Yang Deng, Yanwei Li, Mike Zheng Shou, Zhi-Qi Cheng, See-Kiong Ng, Ziwei Liu, Philip Torr, Jiaya Jia
   **概要:** AIシステムがテキスト生成から持続的相互作用による目標達成へと移行する中で、環境ダイナミクスのモデル化が中心的なボトルネックになっているという問題意識のもと、コミュニティ間で意味が異なる「ワールドモデル」概念を整理する研究である。本論文は能力レベル(L1 Predictor:1ステップ局所遷移、L2 Simulator:行動条件付きの多段ロールアウト、L3 Evolver:予測失敗時に自己モデルを修正)と支配法則の領域(物理・デジタル・社会・科学)からなる「levels x laws」分類体系を提示する。この枠組みを用いてモデルベース強化学習、動画生成、Web/GUIエージェント、マルチエージェント社会シミュレーション、AI駆動の科学的発見など400件超の研究と100以上の代表システムを統合的に整理している。各レベル・領域組み合わせに対する評価手法や典型的な失敗モードを分析し、意思決定中心の評価原則と最小再現可能な評価パッケージ、アーキテクチャ指針、未解決課題、ガバナンス上の論点を提示する。受動的な次状態予測から、エージェントが活動する環境を能動的にシミュレート・改変できるワールドモデルへ向けたロードマップを示した点で意義が大きい。
   **arXiv:** https://arxiv.org/abs/2604.22748

3. **タイトル:** Heterogeneous Scientific Foundation Model Collaboration
   **著者:** Zihao Li, Jiaru Zou, Feihao Fang, Xuying Ning, Mengting Ai, Tianxin Wei, Sirui Chen, Xiyuan Yang, Jingrui He
   **概要:** エージェント型LLMシステムは強力な能力を示す一方、言語を普遍的なインターフェイスとする前提により、自然言語を超えた専門タスク向けの基盤モデルが多数存在する科学領域への適用が制限されてきた。本研究はこの制約を克服するため、言語中心のエージェントシステムを多様な科学基盤モデルへ拡張する異種エージェントフレームワーク「Eywa」を提案する。Eywaは言語モデルベースの推論インターフェイスを領域固有の基盤モデルに付与し、非言語データモダリティに対する推論を言語モデルが誘導することで、専門化された予測モデルを高次推論や意思決定プロセスに参加させる。実装は単一エージェント置換型のEywaAgent、既存マルチエージェント系へ専門エージェントとして組み込むEywaMAS、プランナーが伝統的エージェントとEywaエージェントを動的に調整するEywaOrchestraの3形態をカバーする。物理科学・生命科学・社会科学にまたがる多様なタスクで評価した結果、構造化データや領域固有データを含むタスクで性能が向上し、専門基盤モデルとの効果的協調により言語ベース推論への依存度を下げることに成功した点が示されている。
   **arXiv:** https://arxiv.org/abs/2604.27351
