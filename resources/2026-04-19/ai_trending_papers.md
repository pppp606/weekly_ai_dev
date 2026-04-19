## 今週のAI論文トレンド

1. **タイトル:** WildDet3D: Scaling Promptable 3D Detection in the Wild
   **著者:** Weikai Huang, Jieyu Zhang, Sijun Li, Taoyang Jia, Jiafei Duan, Yunqian Cheng, Jaemin Cho, Mattew Wallingford, Rustin Soraki, Chris Dongjoo Kim, Donovan Clay, Taira Anderson, Winson Han, Ali Farhadi, Bharath Hariharan, Zhongzheng Ren, Ranjay Krishna (Ai2)
   **概要:** 単一のRGB画像から物体の寸法・位置・姿勢を推定する単眼3D物体検出は空間理解の中核であるが、既存手法は単一種類のプロンプトしか扱えず、幾何情報の活用も不十分で、データセットも狭い環境に限定されていた。本論文では、テキスト・点・バウンディングボックスという複数のプロンプトを受け付け、推論時に深度情報を追加入力として統合できる統一的かつジオメトリ対応のアーキテクチャ「WildDet3D」を提案している。あわせて、2Dアノテーションから3Dボックス候補を生成し人手で検証することで、13.5Kカテゴリ・100万枚超に及ぶ史上最大級のオープン3D検出データセット「WildDet3D-Data」を構築した。新設のWildDet3D-Benchではテキスト/ボックスプロンプトで22.6/24.8 AP3D、Omni3Dでは34.2/36.4 AP3D、Argoverse 2およびScanNetにおけるゼロショット評価では40.3/48.9 ODSを達成し、幅広いベンチマークで最新性能を更新した。さらに推論時に深度キューを追加すると平均+20.7 APと大幅に精度が向上し、ロボティクスやAR、自動運転など現実環境で動作する3D知覚システムへの応用可能性を大きく広げる成果である。
   **arXiv:** https://arxiv.org/abs/2604.08626

2. **タイトル:** Seedance 2.0: Advancing Video Generation for World Complexity
   **著者:** Team Seedance, De Chen, Liyang Chen, Xin Chen, Ying Chen, Zhuo Chen, Zhuowei Chen, Feng Cheng, Tianheng Cheng, Yufeng Cheng ほか多数 (ByteDance Seed)
   **概要:** テキストから動画を生成する従来モデルは音声と映像を別個に扱うことが多く、世界の複雑さを反映した長尺かつ高品質な音声付き動画の生成は依然として課題であった。ByteDance Seedが公開した「Seedance 2.0」は、テキスト・画像・音声・動画の4モダリティを入力として受け取り、音声と映像を共同で生成するネイティブマルチモーダルモデルであり、前世代のSeedance 1.0および1.5 Proを上回る統一的かつ大規模な学習アーキテクチャを採用している。最長15秒・解像度480pまたは720pでの音声付き動画の直接生成が可能で、参照入力として動画3本・画像9枚・音声3本までを同時に扱える点が特徴である。専門家評価と一般ユーザーテストの双方で業界トップレベルの性能を示し、映像生成および音声生成の各サブ次元で総合的な品質改善が報告されている。さらに低遅延シナリオ向けに高速化した「Seedance 2.0 Fast」も提供されており、クリエイティブ用途における実用性が大きく向上する成果といえる。
   **arXiv:** https://arxiv.org/abs/2604.14148

3. **タイトル:** ClawGUI: A Unified Framework for Training, Evaluating, and Deploying GUI Agents
   **著者:** Fei Tang, Zhiqiong Lu, Boxuan Zhang, Weiming Lu, Jun Xiao, Yueting Zhuang, Yongliang Shen (Zhejiang University)
   **概要:** GUIエージェントはAPIを介さずに視覚インターフェースを直接操作することで、CLIベースのエージェントでは到達できない幅広いアプリケーションを扱えるが、研究の進展はモデリング能力よりも一貫したフルスタック基盤の欠如によって制約されていた。本論文では、オンライン強化学習の不安定性、評価プロトコルの不統一、学習済みエージェントの実機展開の困難さという3つの課題を単一のフレームワークで解決する「ClawGUI」を提案している。ClawGUI-RLは並列仮想環境と実機の両方をサポートする初のオープンソースGUIエージェントRL基盤で、GiGPOとプロセス報酬モデル(PRM)を組み合わせた密なステップレベル監督を実現する。ClawGUI-Evalは6つのベンチマークと11以上のモデルにわたる完全標準化された評価パイプラインを提供し、公式ベースラインに対して95.8%の再現率を達成した。ClawGUI-AgentはAndroid・HarmonyOS・iOSに加え12以上のチャットプラットフォームへの展開を可能にし、CLI-GUIハイブリッド制御と永続的なパーソナライズメモリを備える。エンドツーエンド学習された小型の「ClawGUI-2B」はMobileWorld GUI-Onlyで17.1%の成功率を達成し、同規模のMAI-UI-2Bを6.0ポイント上回った点で、実用的なモバイルエージェント開発の基盤となる重要な貢献である。
   **arXiv:** https://arxiv.org/abs/2604.11784
