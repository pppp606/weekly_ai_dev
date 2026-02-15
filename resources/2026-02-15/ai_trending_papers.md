## 今週のAI論文トレンド

1. **タイトル:** Step 3.5 Flash: Open Frontier-Level Intelligence with 11B Active Parameters
   **著者:** Ailin Huang, Ang Li, Aobo Kong, Bin Wang, Binxing Jiao, Bo Dong, et al. (StepFun, 214+ authors)
   **概要:** 本論文では、フロンティアレベルのエージェント知能と計算効率を両立するスパースMixture-of-Experts（MoE）モデル「Step 3.5 Flash」を提案している。モデルは196Bパラメータの基盤に11Bのアクティブパラメータを組み合わせ、効率的な推論を実現している。
   技術的には、3:1のスライディングウィンドウ/フルアテンションのインターリーブ構造とMulti-Token Prediction（MTP-3）を採用し、マルチラウンドのエージェント対話におけるレイテンシとコストを削減している。さらに、検証可能なシグナルと嗜好フィードバックを統合するスケーラブルな強化学習フレームワークを設計し、数学・コード・ツール使用の各領域で安定した自己改善を実現している。
   ベンチマーク評価では、IMO-AnswerBenchで85.4%、LiveCodeBench-v6で86.4%、tau2-Benchで88.2%、BrowseCompで69.0%、Terminal-Bench 2.0で51.0%を達成し、GPT-5.2 xHighやGemini 3.0 Proといったフロンティアモデルに匹敵する性能を示している。
   11Bのアクティブパラメータという効率的な構成でフロンティアレベルの性能を達成した点は、実世界の産業環境における高度なAIエージェントの実用的な展開に大きく貢献する成果である。
   **arXiv:** https://arxiv.org/abs/2602.10604

2. **タイトル:** InternAgent-1.5: A Unified Agentic Framework for Long-Horizon Autonomous Scientific Discovery
   **著者:** Shiyang Feng, Runmin Ma, Xiangchao Yan, Yue Fan, Yusong Hu, Songtao Huang, Shuaiyu Zhang, Zongsheng Cao, Tianshuo Peng, Jiakang Yuan, Zijie Guo, Zhijie Zhong, Shangheng Du, Weida Wang, Jinxin Shi, Yuhao Zhou, Xiaohan He, Zhiyin Yu, Fangchen Yu, Qihao Zheng, Jiamin Wu, Mianxin Liu, Chi Zhang, Shaowei Hou, Shuya Li, Yankai Jiang, Wenjie Lou, Lilong Wang, Zifu Wang, Jiong Wang, Wanghan Xu, Yue Deng, Dongrui Liu, Yiheng Wang, Wenlong Zhang, Fenghua Ling, Shufei Zhang, Xiaosong Wang, Shuangjia Zheng, Xun Huang, Siqi Sun, Shuyue Hu, Peng Ye, Chunfeng Song, Bin Wang, Conghui He, Yihao Liu, Xin Li, Qibin Hou, Tao Chen, Xiangyu Yue, Bin Wang, Liang He, Dahua Lin, Bowen Zhou, Bo Zhang, Lei Bai
   **概要:** 本論文では、計算的・実験的領域を横断するエンドツーエンドの科学的発見を目的とした統合型エージェントシステム「InternAgent-1.5」を提案している。システムは生成・検証・進化の3つのサブシステムから構成され、深層調査、解決策の最適化、長期記憶の管理を可能にしている。
   技術的な特徴として、長期間にわたる発見サイクルにおける連続的な運用が可能であり、自律的な科学研究プロセスを実現している。これにより、従来の人間主導の研究プロセスでは困難だった大規模かつ長期的な科学的探索が可能になる。
   評価では、GAIA、HLE、GPQA、FrontierScienceなどのベンチマークで性能を測定し、アルゴリズム設計や地球科学・生命科学・生物科学・物理科学にわたる実証的発見への応用を実証している。
   科学的発見の全プロセスを自律的に実行できる統合フレームワークとして、AI駆動の科学研究の新たな可能性を示す重要な研究である。特に複数の科学分野への汎用性と長期的な自律運用能力は、今後の科学的発見の加速に大きく寄与すると期待される。
   **arXiv:** https://arxiv.org/abs/2602.08990

3. **タイトル:** UI-Venus-1.5 Technical Report
   **著者:** Venus-Team: Changlong Gao, Zhangxuan Gu, Yulin Liu, Xinyu Qiu, Shuheng Shen, Yue Wen, Tianyu Xia, Zhenyu Xu, Zhengwen Zeng, Beitong Zhou, Xingran Zhou, Weizhi Chen, Sunhao Dai, Jingya Dou, Yichen Gong, Yuan Guo, Zhenlin Guo, Feng Li, Qian Li, Jinzhen Lin, Yuqi Zhou, Linchao Zhu, Liang Chen, Zhenyu Guo, Changhua Meng, Weiqiang Wang
   **概要:** 本論文では、デジタル環境における操作の自動化に向けた統合型エンドツーエンドGUIエージェント「UI-Venus-1.5」を提案している。モデルファミリーは2Bおよび8Bの密なモデルと30B-A3BのMoEモデルで構成され、さまざまな下流タスクに対応可能な設計となっている。
   技術的には3つの重要な進歩がある。第一に、10億トークン・30以上のデータセットを活用した包括的な中間トレーニング段階により、GUIの基礎的な意味理解を確立している。第二に、フルトラジェクトリのロールアウトを用いたオンライン強化学習により、大規模環境での長期的な動的ナビゲーションとトレーニング目標の整合を実現している。第三に、モデルマージングによる統合GUIエージェントの構築で、グラウンディング・Web・モバイルの各ドメイン特化モデルを一つの統合チェックポイントに統合している。
   ベンチマーク評価では、ScreenSpot-Proで69.6%、VenusBench-GDで75.0%、AndroidWorldで77.6%を達成し、従来の強力なベースラインを大幅に上回る最先端の性能を示している。加えて、中国語モバイルアプリにおける堅牢なナビゲーション能力も実証されており、実世界シナリオでのユーザー指示の実行能力が確認されている。
   **arXiv:** https://arxiv.org/abs/2602.09082
