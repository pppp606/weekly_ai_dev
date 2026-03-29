## 今週のAI論文トレンド

1. **タイトル:** MinerU-Diffusion: Rethinking Document OCR as Inverse Rendering via Diffusion Decoding
   **著者:** Hejun Dong, Junbo Niu, Bin Wang, Weijun Zeng, Wentao Zhang, Conghui He
   **概要:** 従来の文書OCRは自己回帰的なデコーディングに依存しており、長文書での逐次処理による遅延やエラー伝播の問題を抱えていた。本研究では、文書OCRを「逆レンダリング」の観点から再考し、左から右への因果的生成はタスク固有の性質ではなく直列化の産物に過ぎないと主張する。この知見に基づき、自己回帰的な逐次デコーディングを視覚条件付き並列拡散ノイズ除去に置き換える統合的な拡散ベースフレームワーク「MinerU-Diffusion」を提案している。ブロック単位の拡散デコーダと不確実性駆動型カリキュラム学習戦略を採用し、安定した学習と効率的な長系列推論を実現する。実験では、自己回帰ベースラインと比較して最大3.2倍の高速デコーディングを達成しつつ、ロバスト性も一貫して向上することが示された。提案されたSemantic Shuffleベンチマークでの評価により、言語的事前知識への依存が低減され、より強力な視覚OCR能力が確認されている。文書解析における拡散モデルの新たな可能性を示す重要な研究である。
   **arXiv:** https://arxiv.org/abs/2603.22458

2. **タイトル:** Omni-WorldBench: Towards a Comprehensive Interaction-Centric Evaluation for World Models
   **著者:** Meiqi Wu, Zhixin Cai, Fufangchen Zhao, Xiaokun Feng, Rujing Dang, Bingze Song, Ruitian Tian, Jiashu Zhu, Jiachen Lei, Hao Dou, Jing Tang, Lei Sun, Jiahong Wu, Xiangxiang Chu, Zeming Liu, Kaiqi Huang
   **概要:** ビデオベースの世界モデルは動画生成と3D再構成の2つの主要パラダイムに沿って発展してきたが、既存のベンチマークは生成モデルの視覚的忠実度やテキスト-動画整合性に限定されるか、時間的ダイナミクスを無視した静的な3D再構成指標に依存している。本研究では、世界モデリングの未来は空間構造と時間的変化を同時にモデル化する4D生成にあると主張し、その中核能力として「インタラクティブ応答」、すなわちインタラクション行動が時空間にわたる状態遷移をいかに忠実に反映するかを重視する。この重要な次元を体系的に評価するため、4D設定における世界モデルのインタラクティブ応答能力を評価する包括的ベンチマーク「Omni-WorldBench」を提案している。多様なインタラクションレベルとシーンタイプにまたがる体系的プロンプトスイート「Omni-WorldSuite」と、エージェントベースの評価フレームワーク「Omni-Metrics」の2つの主要コンポーネントから構成される。18の代表的な世界モデルの広範な評価により、現行モデルのインタラクティブ応答における重大な限界が明らかにされ、今後の研究への具体的な知見が提供されている。
   **arXiv:** https://arxiv.org/abs/2603.22212

3. **タイトル:** Speed by Simplicity: A Single-Stream Architecture for Fast Audio-Video Generative Foundation Model
   **著者:** SII-GAIR, Sand.ai: Ethan Chern, Hansi Teng, Hanwen Sun, Hao Wang, Hong Pan, Hongyu Jia, Jiadi Su, Jin Li, Junjie Yu, Lijie Liu, Lingzhi Li, Lyumanshan Ye, Min Hu, Qiangang Wang, Quanwei Qi, Steffi Chern, Tao Bu, Taoran Wang, Teren Xu, Tianning Zhang, Tiantian Mi, Weixian Xu, Wenqiang Zhang, Wentai Zhang, Xianping Yi, Xiaojie Cai, Xiaoyang Kang, Yan Ma, Yixiu Liu, Yunbo Zhang, Yunpeng Huang, Yutong Lin, Zewei Tao, Zhaoliang Liu, Zheng Zhang, Zhiyao Cen, Zhixuan Yu, Zhongshu Wang, Zhulin Hu, Zijin Zhou, Zinan Guo, Yue Cao, Pengfei Liu
   **概要:** 本研究では、人間中心の生成に特化したオープンソースの音声-映像生成基盤モデル「daVinci-MagiHuman」を提案している。テキスト・映像・音声を統一トークン系列として自己注意のみで処理するシングルストリームTransformerにより、同期された映像と音声を同時生成する。このシングルストリーム設計は、マルチストリームやクロスアテンション型アーキテクチャの複雑さを回避しつつ、標準的な学習・推論基盤で容易に最適化できる利点を持つ。表情豊かな顔のパフォーマンス、自然な発話-表情の連動、リアルな身体動作、精密な音声-映像同期を実現し、中国語（普通語・広東語）、英語、日本語、韓国語、ドイツ語、フランス語の多言語音声生成に対応する。モデル蒸留、潜在空間超解像、Turbo VAEデコーダを組み合わせた効率的な推論により、単一H100 GPU上で5秒間の256p動画を2秒で生成可能である。自動評価では主要オープンモデル中最高の視覚品質とテキスト整合性、最低の単語誤り率（14.60%）を達成し、人間評価でもOvi 1.1に対して80.0%、LTX 2.3に対して60.9%の勝率を記録している。
   **arXiv:** https://arxiv.org/abs/2603.21986
