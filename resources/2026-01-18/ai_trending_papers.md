## 今週のAI論文トレンド

1. **タイトル:** Watching, Reasoning, and Searching: A Video Deep Research Benchmark on Open Web for Agentic Video Reasoning
   **著者:** Chengwen Liu, Xiaomin Yu, Zhuoyue Chang, Zhe Huang, Shuo Zhang, Heng Lian, Kunyi Wang, Rui Xu, Sen Hu, Jianheng Hou, Hao Peng, Chengwei Qin, Xiaobin Hu, Hong Peng, Ronghao Chen, Huacan Wang
   **概要:** 本研究は、動画質問応答（Video QA）における重要な課題に取り組んでいる。従来の動画理解タスクでは、動画内の視覚的手がかりのみに基づいて回答を生成していたが、実世界では検証可能な回答がオープンウェブ上に分散して存在することが多い。研究チームは「VideoDR」という新しいベンチマークを提案し、モデルがクロスフレーム視覚分析、ウェブ検索、そして動画とウェブの両方の証拠に基づくマルチホップ推論を6つの意味領域にわたって実行することを要求する。マルチモーダル言語モデルの評価結果から、エージェント型アプローチがワークフロー型よりも常に優れているわけではなく、その効果はモデルが長い検索チェーン全体で初期の動画アンカーを維持できるかどうかに依存することが明らかになった。主な課題として、目標のドリフトと長期的な一貫性の維持が特定され、これらは次世代動画研究エージェントの開発における核心的な制限となっている。
   **arXiv:** https://arxiv.org/abs/2601.06943

2. **タイトル:** BabyVision: Visual Reasoning Beyond Language
   **著者:** Liang Chen, Weichu Xie, Yiyan Liang, Hongfeng He, Hans Zhao, Zhibo Yang, Zhiqi Huang, Haoning Wu, Haoyu Lu, Y. Charles, Yiping Bao, Yuantao Fan, Guopeng Li, Haiyang Shen, Xuanzhong Chen, Wendong Xu, Shuzheng Si, Zefan Cai, Wenhao Chai, Ziqi Huang, Fangfu Liu, Tianyu Liu, Baobao Chang, Xiaobo Hu, Kaiyuan Chen, Yixin Ren, Yang Liu, Yuan Gong, Kuan Li
   **概要:** 人間の乳児は言語を習得する前にコアな視覚能力を発達させるが、現在のマルチモーダル言語モデル（MLLM）は弱い視覚認識を補うために言語フレームワークに過度に依存していることが本研究で明らかになった。研究チームは、主要なMLLMが幼い子供でも容易にこなせる基本的な視覚タスクで苦戦していることを発見した。これを評価するため、言語に依存しない視覚推論を測定する「BabyVision」ベンチマークを開発した。このベンチマークは4つのドメインと22のサブカテゴリにわたる388項目で構成されている。評価結果は顕著なパフォーマンスギャップを示し、Gemini-3-Pro-Previewは49.7%の正答率で、典型的な6歳児のパフォーマンスを下回った。一方、人間の成人は平均94.1%を達成した。この研究は、これらのモデルが知識集約的な評価では強みを発揮するものの、基礎的な視覚プリミティブが欠如していることを示している。チームは自動評価機能を備えたBabyVision-Genも導入し、リソースを公開している。
   **arXiv:** https://arxiv.org/abs/2601.06521

3. **タイトル:** Thinking with Map: Reinforced Parallel Map-Augmented Agent for Geolocalization
   **著者:** Yuxiang Ji, Yong Wang, Ziyu Ma, Yiming Hu, Hailang Huang, Xuecai Hu, Guanhua Chen, Liaoni Wu, Xiangxiang Chu
   **概要:** 本研究は画像の地理的位置特定（ジオローカライゼーション）という課題に取り組み、モデルが「地図を使って推論する」ことを可能にする新しいアプローチを提案している。研究チームは、エージェント・イン・ザ・マップというフレームワークを設計し、2つの最適化フェーズを導入した。第一に、強化学習を用いてモデルの推論能力を強化し、第二に、並列テスト時スケーリングで複数の候補パスを探索することを可能にした。評価のため、実世界の画像を特徴とする「MAPBench」というベンチマークデータセットを導入した。実験結果は既存システムに対する大幅な改善を示し、500メートル精度で22.1%の正答率を達成した。これは比較対象モデルの8.0%と比較して約2.8倍の性能向上であり、世界中で写真が撮影された場所を予測する技術において重要な進歩を表している。この研究は、地図情報を活用した推論がジオローカライゼーションタスクに有効であることを実証した。
   **arXiv:** https://arxiv.org/abs/2601.05432
