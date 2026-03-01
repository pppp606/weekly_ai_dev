## 今週のAI論文トレンド

1. **タイトル:** A Very Big Video Reasoning Suite
   **著者:** Maijunxian Wang, Ruisi Wang, Juyi Lin, Ran Ji, Thaddäus Wiedemer, Qingying Gao, Dezhi Luo, Yaoyao Qian, Lianyu Huang, Zelong Hong, Jiahui Ge, Qianli Ma, Hang He, Yifan Zhou, Lingzi Guo, Lantao Mei, Jiachen Li, Hanwen Xing, Tianqi Zhao, Fengyuan Yu, Weihang Xiao, Yizheng Jiao, Jianheng Hou, Danyang Zhang, Pengcheng Xu, Boyang Zhong, Zehong Zhao, Gaoyun Fang, John Kitaoka, Yile Xu, Hua Xu, Kenton Blacutt, Tin Nguyen, Siyuan Song, Haoran Sun, Shaoyue Wen, Linyang He, Runming Wang, Yanzhi Wang, Mengyue Yang, Ziqiao Ma, Raphaël Millière, Freda Shi, Nuno Vasconcelos, Daniel Khashabi, Alan Yuille, Yilun Du, Ziming Liu, Bo Li, Dahua Lin, Ziwei Liu, Vikash Kumar, Yijiang Li, Lei Yang, Zhongang Cai, Hokin Deng
   **概要:** 動画推論（ビデオリーズニング）に関する大規模データセットおよびベンチマークを提案した研究である。従来、動画の推論能力を学習・評価するための訓練データが著しく不足しており、この分野の進展が制限されていた。本研究では、体系的な分類体系に基づいて設計された200の推論タスクと、100万本を超える動画クリップからなるVBVRデータセットを構築した。このデータセットは、既存のデータセットと比較して約1000倍の規模を持つ。評価フレームワークとしてVBVR-Benchを提案し、モデルベースの評価ではなくルールベースかつ人間の判断に整合したスコアラーを採用することで、より信頼性の高い評価を実現している。スケーリング実験を通じて、未知の推論タスクへの汎化が初期段階で現れる兆候を確認しており、動画推論研究の基盤となる重要な貢献を示している。
   **arXiv:** https://arxiv.org/abs/2602.20159

2. **タイトル:** Does Your Reasoning Model Implicitly Know When to Stop Thinking?
   **著者:** Zixuan Huang, Xin Xia, Yuxi Ren, Jianbin Zheng, Xuanda Wang, Zhixia Zhang, Hongyan Xie, Songshi Liang, Zehao Chen, Xuefeng Xiao, Fuzhen Zhuang, Jianxin Li, Yikun Ban, Deqing Wang
   **概要:** 大規模推論モデルが過度に長い思考連鎖（Chain-of-Thought）を生成する非効率性に取り組んだ研究である。現在の推論モデルは必要以上に長い推論プロセスを経由する傾向があり、計算コストの増大を招いている。本研究では、これらのモデルが推論を終了すべきタイミングを暗黙的に認識する能力を潜在的に備えていることを発見した。しかし、従来のサンプリング手法ではこの能力が発揮されていなかった。そこで、SAGE（Self-Aware Guided Efficient Reasoning）という新しいサンプリング手法を提案し、この潜在的な能力を引き出すことに成功した。さらに、SAGEを強化学習に統合したSAGE-RLを開発し、効率的な推論パターンを通常の推論プロセスに組み込むことで、難解な数学ベンチマークにおいて精度と速度の両方を向上させた。推論の効率化という実用的に重要な課題に対する有効なアプローチを示している。
   **arXiv:** https://arxiv.org/abs/2602.08354

3. **タイトル:** VESPO: Variational Sequence-Level Soft Policy Optimization for Stable Off-Policy LLM Training
   **著者:** Guobin Shen, Chenxiao Zhao, Xiang Cheng, Lei Huang, Xing Yu
   **概要:** 大規模言語モデル（LLM）の強化学習における訓練安定性の課題に取り組んだ研究である。オフポリシー訓練では、ポリシーの陳腐化、非同期訓練、訓練と推論エンジン間の不一致といった問題が行動の乖離を引き起こし、学習の崩壊リスクをもたらす。重要度サンプリングによる分布シフトの補正は可能であるが、既存のトークンレベルおよびシーケンスレベルのアプローチには統一的な理論的基盤が欠けていた。本研究では、VESPOという手法を提案し、長さ正規化を必要とせずにシーケンスレベルの重要度重みに直接作用する閉形式の再形成カーネルを導出した。実験では、大きなポリシーの陳腐化条件や非同期実行環境下でも安定した訓練を維持できることを実証し、異なるモデルアーキテクチャにわたって性能改善を確認した。実装コードも公開されており、再現性と実用性に優れた研究である。
   **arXiv:** https://arxiv.org/abs/2602.10693
