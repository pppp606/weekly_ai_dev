## 今週のAI論文トレンド

1. **タイトル:** DataFlex: A Unified Framework for Data-Centric Dynamic Training of Large Language Models
   **著者:** Hao Liang, Zhengyang Zhao, Meiyi Qiang, Mingrui Chen, Lu Ma, Rongyi Yu, Hengyi Feng, Shixuan Sun, Zimo Meng, Xiaochen Ma, Xuanlin Yang, Qifeng Cai, Ruichuan An, Bohan Zeng, Zhen Hao Wong, Chengyu Shen, Runming He, Zhaoyang Han, Yaowei Zheng, Fangcheng Fu, Conghui He, Bin Cui, Zhiyu Li, Weinan E, Wentao Zhang
   **概要:** 大規模言語モデル（LLM）の学習において、モデルパラメータだけでなく、学習データの選択・構成・重み付けを最適化する「データ中心型学習」が注目を集めている。しかし、既存のデータ選択・データ混合最適化・データ再重み付けの手法は、個別のコードベースで開発されており、再現性や公正な比較が困難であった。本論文では、LLaMA-Factory上に構築された統一的なデータ中心型動的学習フレームワーク「DataFlex」を提案する。DataFlexは、サンプル選択、ドメイン混合調整、サンプル再重み付けの3つの主要パラダイムを統合的にサポートし、DeepSpeed ZeRO-3を含む大規模環境にも対応する。実験では、動的データ選択がMistral-7BおよびLlama-3.2-3Bにおいて静的な全データ学習をMMLUスコアで一貫して上回り、DoReMiやODMによるデータ混合最適化もQwen2.5-1.5Bの事前学習でMMLU精度とパープレキシティの双方を改善した。DataFlexは、LLMのデータ中心型学習における効果的・効率的・再現可能な研究基盤として有用性を示している。
   **arXiv:** https://arxiv.org/abs/2603.26164

2. **タイトル:** The Latent Space: Foundation, Evolution, Mechanism, Ability, and Outlook
   **著者:** Xinlei Yu, Zhangquan Chen, Yongbo He, Tianyu Fu, Cheng Yang, Chengming Xu, Yue Ma, Xiaobin Hu, Zhe Cao, Jie Xu, Guibin Zhang, Jiale Tao, Jiayi Zhang, Siyuan Ma, Kaituo Feng, Haojie Huang, Youxing Li, Ronghao Chen, Huacan Wang, Chenglin Wu, Zikun Su, Xiaogang Xu, Kelu Yao, Kun Wang, Chen Gao, Yue Liao, Ruqi Huang, Tao Jin, Cheng Tan, Jiangning Zhang, Wenqi Ren, Yanwei Fu, Yong Liu, Yu Wang, Xiangyu Yue, Yu-Gang Jiang, Shuicheng Yan
   **概要:** 潜在空間（Latent Space）は、言語ベースモデルにおけるネイティブな計算基盤として急速に注目を集めている。現代のシステムはトークンレベルの明示的な生成を通じて理解されることが多いが、多くの重要な内部処理は人間が読める言語的痕跡よりも連続的な潜在空間でより自然に実行されることが明らかになりつつある。この変化は、言語的冗長性、離散化のボトルネック、逐次処理の非効率性、意味的損失といった明示的空間計算の構造的限界に起因する。本サーベイは、基盤・進化・メカニズム・能力・展望の5つの視点から潜在空間の統一的かつ最新の全体像を提供する。メカニズムの観点からはアーキテクチャ・表現・計算・最適化の4つの技術軸を、能力の観点からは推論・計画・モデリング・知覚・記憶・協調・身体性にわたる幅広い能力スペクトラムを整理している。次世代知能に向けた汎用的な計算・システムパラダイムとしての潜在空間の理解を促進する包括的な参考文献となることを目指した重要な論文である。
   **arXiv:** https://arxiv.org/abs/2604.02029

3. **タイトル:** Generative World Renderer
   **著者:** Zheng-Hui Huang, Zhixiang Wang, Jiaming Tan, Ruihan Yu, Yidan Zhang, Bo Zheng, Yu-Lun Liu, Yung-Yu Chuang, Kaipeng Zhang
   **概要:** 生成的な逆レンダリングおよび順レンダリングを実世界シナリオに拡張する際、既存の合成データセットのリアリズムと時間的整合性の不足が大きなボトルネックとなっている。このドメインギャップを解消するため、視覚的に複雑なAAAゲームから収集した大規模動的データセットを提案する。独自のデュアルスクリーンスティッチキャプチャ手法により、多様なシーン・視覚効果・環境（悪天候やモーションブラーを含む）にわたる400万フレーム（720p/30FPS）の同期されたRGBおよび5チャンネルのG-bufferデータを抽出した。本データセットは双方向レンダリングの発展に貢献し、実環境下での頑健なジオメトリ・マテリアル分解と、高品質なG-bufferガイド付きビデオ生成を可能にする。さらに、グラウンドトゥルースなしでの逆レンダリング性能を評価するためのVLMベースの新しい評価プロトコルも提案している。本データセットでファインチューニングされた逆レンダラーは優れたデータセット横断的汎化性能を達成し、テキストプロンプトによるAAAゲームのスタイル編集を実現している。
   **arXiv:** https://arxiv.org/abs/2604.02329
