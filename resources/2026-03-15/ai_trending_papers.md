## 今週のAI論文トレンド

1. **タイトル:** Bootstrapping Exploration with Group-Level Natural Language Feedback in Reinforcement Learning
   **著者:** Lei Huang, Xiang Cheng, Chenxiao Zhao, Guobin Shen, Junjie Yang, Xiaocheng Feng, Yuxuan Gu, Xing Yu, Bing Qin
   **概要:** 大規模言語モデル（LLM）は環境との対話を通じて多様な自然言語フィードバックを受け取るが、従来の強化学習（RL）アルゴリズムはスカラー報酬のみに依存しており、自然言語フィードバックに含まれる豊富な情報が十分に活用されていなかった。本研究では、グループレベルの言語フィードバックを明示的に活用し、実行可能な改善提案を通じて的を絞った探索を導くRLフレームワーク「GOLF」を提案する。GOLFは、エラーを特定し修正案を提示する外部批評と、代替的な部分解や多様な失敗パターンを提供するグループ内試行という2つの相補的なフィードバック源を統合する。これらのグループレベルフィードバックを集約して高品質な改善案を生成し、スパース報酬領域での的を絞ったガイダンスとしてオフポリシーの足場として適応的に注入する。さらに、GOLFは統一されたRLループ内で生成と改善を同時に最適化し、両方の能力を継続的に向上させる好循環を実現する。検証可能・検証不可能な両ベンチマークでの実験により、スカラー報酬のみで学習するRL手法と比較してサンプル効率が2.2倍向上することが示された。
   **arXiv:** https://arxiv.org/abs/2603.04597

2. **タイトル:** Geometry-Guided Reinforcement Learning for Multi-view Consistent 3D Scene Editing
   **著者:** Jiyuan Wang, Chunyu Lin, Lei Sun, Zhi Cao, Yuyang Yin, Lang Nie, Zhenlong Yuan, Xiangxiang Chu, Yunchao Wei, Kang Liao, Guosheng Lin
   **概要:** 2D拡散モデルの事前知識を3D編集に活用するアプローチは有望なパラダイムとして注目されているが、編集結果の多視点整合性の維持は依然として大きな課題であり、3D整合性のある編集ペアデータの極端な希少性により、教師あり微調整（SFT）は実質的に不可能であった。本研究では、多視点整合性のある3Dコンテンツの生成は極めて困難であるが、3D整合性の検証は比較的容易であるという観察に基づき、強化学習（RL）を自然な解決策として活用する。具体的には、3D基盤モデルVGGTから導出された新しい報酬を用いたRL最適化によるシングルパスフレームワーク「RL3DEdit」を提案する。VGGTが大規模実世界データから学習した頑健な事前知識を活用し、編集画像を入力として、出力される信頼度マップとポーズ推定誤差を報酬信号として使用することで、2D編集の事前知識をRL経由で3D整合性のある多様体に効果的に定着させる。広範な実験により、RL3DEditは安定した多視点整合性を達成し、最先端手法を編集品質と効率の両面で上回ることが実証された。
   **arXiv:** https://arxiv.org/abs/2603.03143

3. **タイトル:** Penguin-VL: Exploring the Efficiency Limits of VLM with LLM-based Vision Encoders
   **著者:** Boqiang Zhang, Lei Ke, Ruihan Yang, Qi Gao, Tianyuan Qu, Rossell Chen, Dong Yu, Leoweiliang
   **概要:** Vision Language Model（VLM）の開発はモデルサイズのスケーリングに大きく依存してきたが、これはスマートフォンやロボットなどの計算資源が制約されたデバイスへの展開を妨げている。本研究では、コンパクトな（2Bおよび8B）VLMの性能限界を探索する。最先端VLMがCLIP/SigLIPなどの大規模対照学習で事前学習されたビジョンエンコーダに依存するという通説に挑戦し、対照学習が識別に最適化されることで、密なキャプション生成や複雑なVLM推論に必要な細粒度の視覚的手がかりを抑制する目的関数のミスマッチを特定した。この問題に対処するため、テキストのみのLLMから初期化されたビジョンエンコーダを持つ「Penguin-VL」を提案する。実験により、Penguin-Encoderは従来の対照学習事前学習に代わる優れた選択肢として、マルチモーダル理解のための視覚的忠実度とデータ効率の両方を向上させることが示された。各種画像・動画ベンチマークにおいて、Penguin-VLはQwen3-VLなどの主要VLMと数学推論で同等の性能を達成し、文書理解・視覚知識・多視点動画理解などのタスクでは上回る結果を示した。これらの成果は軽量アーキテクチャで達成されており、モデルスケーリングではなく視覚表現の改善が性能向上の主要因であることを実証している。
   **arXiv:** https://arxiv.org/abs/2603.06569
