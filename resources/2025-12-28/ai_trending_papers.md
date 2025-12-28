## 今週のAI論文トレンド

1. **タイトル:** DataFlow: An LLM-Driven Framework for Unified Data Preparation and Workflow Automation in the Era of Data-Centric AI
   **著者:** Hao Liang, Xiaochen Ma, Zhou Liu, Zhen Hao Wong, Zhengyang Zhao, Zimo Meng, Runming He, Chengyu Shen, Qifeng Cai, Zhaoyang Han, Meiyi Qiang, Yalin Feng, Tianyi Bai, Zewei Pan, Ziyi Guo, Yizhen Jiang, Jingwen Deng, Qijie You, Peichao Lai, Tianyu Guo, Chi Hsu Tsai, Hengyi Feng +13 authors
   **概要:** 本論文では、大規模言語モデル（LLM）の高品質データに対する需要の急増に対応するため、統一的かつ拡張可能なデータ準備フレームワーク「DataFlow」を提案しています。従来のアドホックなスクリプトやワークフローの課題（再現性の欠如、抽象化の不足、モデル連携の制限）を解決するため、PyTorchスタイルのパイプライン構築APIを提供し、約200の再利用可能なオペレーターと6つのドメイン汎用パイプラインを実装しています。さらに、自然言語仕様から実行可能なパイプラインを自動生成する「DataFlow-Agent」も導入。テキスト、数学的推論、コード、Text-to-SQL、エージェント型RAG、大規模知識抽出など幅広いタスクで、既存のベースラインを上回る性能を達成しました。特に、DataFlowで生成した10Kサンプルのデータセットにより、100万件のInfinity-Instructデータで訓練したモデルを超える性能を実現しています。
   **arXiv:** https://arxiv.org/abs/2512.16676

2. **タイトル:** Probing Scientific General Intelligence of LLMs with Scientist-Aligned Workflows
   **著者:** Wanghan Xu, Yuhao Zhou, Yifan Zhou, Qinglong Cao, Shuo Li, Jia Bu, Bo Liu, Yixin Chen, Xuming He, Xiangyu Zhao, Xiang Zhuang, Fengxiang Wang, Zhiwang Zhou, Qiantai Feng, Wenxuan Huang, Jiaqi Wei, Hao Wu, Yuejin Yang, Guangshuai Wang, Sheng Xu, Ziyan Huang, Xinyao Liu +85 authors
   **概要:** 本論文では、科学的汎用知能（Scientific General Intelligence: SGI）の概念を定義し、その評価フレームワークを提案しています。SGIとは、科学的探究の全サイクル（熟考、構想、行動、認識）を自律的に遂行できるAIシステムの能力を指します。実践的探究モデル（PIM）に基づき、深層研究、アイデア生成、ドライ/ウェット実験、実験的推論という4つの科学者に沿ったタスクを設定。Science誌の125の重要な問いに触発された1,000以上の専門家監修サンプルからなる「SGI-Bench」を構築しました。最先端LLMの評価結果では、深層研究での低い完全一致率（10-20%）、アイデアの実現可能性や詳細さの不足、ドライ実験でのコード実行可能性は高いものの結果精度が低い点など、多くの課題が明らかになりました。また、推論時に検索強化された新規性報酬を最適化する「テスト時強化学習（TTRL）」も導入し、仮説の新規性向上を実現しています。
   **arXiv:** https://arxiv.org/abs/2512.16969

3. **タイトル:** SemanticGen: Video Generation in Semantic Space
   **著者:** Jianhong Bai, Xiaoshi Wu, Xintao Wang, Fu Xiao, Yuanxing Zhang, Qinghe Wang, Xiaoyu Shi, Menghan Xia, Zuozhu Liu, Haoji Hu, Pengfei Wan, Kun Gai
   **概要:** 本論文では、動画生成における収束の遅さと計算コストの課題を解決する新しいアプローチ「SemanticGen」を提案しています。従来のVAE潜在空間での動画生成は高品質な結果を得られる一方、長時間動画生成時に計算負荷が高くなります。SemanticGenの核心的な洞察は、動画の固有の冗長性を活かし、まずコンパクトで高レベルな意味空間でグローバルな計画を行い、その後に高周波の詳細を追加するという2段階プロセスにあります。第1段階では、拡散モデルがコンパクトな意味的動画特徴を生成し、動画のグローバルレイアウトを定義。第2段階では、別の拡散モデルがこれらの意味的特徴を条件としてVAE潜在変数を生成し、最終出力を生成します。意味空間での生成はVAE潜在空間よりも高速に収束し、長時間動画生成においても効率的です。広範な実験により、SemanticGenが高品質な動画を生成し、最先端のアプローチを上回ることが実証されています。
   **arXiv:** https://arxiv.org/abs/2512.20619
