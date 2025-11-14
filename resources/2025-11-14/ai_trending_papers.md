## 🧠 今週のAI論文トレンド

1. **タイトル:** Grounding Computer Use Agents on Human Demonstrations
   **著者:** Aarash Feizi, Shravan Nayak, Xiangru Jian, Kevin Qinghong Lin, Kaixin Li, Rabiul Awal, Xing Han Lù, Johan Obando-Ceron, Juan A. Rodriguez, Nicolas Chapados, David Vazquez, Adriana Romero-Soriano, Reihaneh Rabbany, Perouz Taslakian, Christopher Pal, Spandana Gella, Sai Rajeswar
   **概要:** 信頼性の高いコンピュータ利用エージェントを構築するには、自然言語の指示を画面上の正しい要素に正確に接続する「グラウンディング」が不可欠ですが、デスクトップ環境向けの高品質なリソースは限られていました。本研究では、専門家の人間によるデモンストレーションから構築された大規模デスクトップグラウンディングデータセット「GroundCUA」を提案しています。このデータセットは12カテゴリにわたる87のアプリケーションをカバーし、56,000枚のスクリーンショットに対して総計356万件以上の人間検証済みアノテーションを含んでいます。GroundCUAを用いて開発されたGroundNextモデル(3Bおよび7Bスケール)は、従来手法の10分の1未満の学習データで5つのベンチマークにおいて最先端の性能を達成しました。さらに強化学習による後処理により性能が向上し、OSWorldベンチマークでのエージェント評価では、大幅に多くのデータで学習されたモデルと同等以上の結果を示しています。この研究は、高品質な専門家主導のデータセットが汎用コンピュータ利用エージェントの進歩において重要な役割を果たすことを実証しました。
   **arXiv:** https://arxiv.org/abs/2511.07332

2. **タイトル:** MemOS: A Memory OS for AI System
   **著者:** Zhiyu Li, Shichao Song, Chenyang Xi, Hanyu Wang, Chen Tang, Simin Niu, Ding Chen, Jiawei Yang, Chunyu Li, Qingchen Yu, Jihao Zhao, Yezhaohui Wang, Peng Liu, Zehao Lin, Pengyuan Wang, Jiahao Huo, Tianyi Chen, Kai Chen, Kehang Li, Zhen Tao, Huayi Lai, Hao Wu, Bo Tang, Zhenren Wang, Zhaoxin Fan, Ningyu Zhang, Linfeng Zhang, Junchi Yan, Mingchuan Yang, Tong Xu, Wei Xu, Huajun Chen, Haofen Wang, Hongkang Yang, Wentao Zhang, Zhi-Qin John Xu, Siheng Chen, Feiyu Xiong
   **概要:** 大規模言語モデル(LLM)は汎用人工知能(AGI)の重要なインフラとなっていますが、明確に定義されたメモリ管理システムの欠如により、長文脈推論、継続的なパーソナライゼーション、知識の一貫性の発展が妨げられています。RAG(検索拡張生成)は外部知識をプレーンテキストで導入しますが、ライフサイクル制御や永続的な表現との統合がないステートレスな回避策に留まっています。本研究では、メモリを管理可能なシステムリソースとして扱い、プレーンテキスト、活性化ベース、パラメータレベルのメモリの表現・スケジューリング・進化を統一する「MemOS」というメモリオペレーティングシステムを提案しています。基本単位となるMemCubeは、メモリコンテンツと来歴やバージョン管理などのメタデータをカプセル化し、時間とともに構成、移行、融合が可能で、メモリタイプ間の柔軟な移行と検索とパラメータベース学習の橋渡しを実現します。MemOSは、LLMに制御性、可塑性、進化性をもたらすメモリ中心のシステムフレームワークを確立し、継続学習とパーソナライズされたモデリングの基盤を築きました。
   **arXiv:** https://arxiv.org/abs/2507.03724

3. **タイトル:** Tiny Model, Big Logic: Diversity-Driven Optimization Elicits Large-Model Reasoning Ability in VibeThinker-1.5B
   **著者:** Sen Xu, Yi Zhou, Wei Wang, Jixin Min, Zhibin Yin, Yingwei Dai, Shixi Liu, Lianyu Pang, Yirong Chen, Junlin Zhang
   **概要:** 小規模モデルには堅牢な推論能力が欠けているという通念に挑戦し、わずか15億パラメータのVibeThinker-1.5Bモデルを開発しました。Spectrum-to-Signal Principle(SSP)フレームワークを採用し、2段階の多様性探索蒸留(SFT)で幅広い解の範囲を生成した後、MaxEntガイド付き方策最適化(RL)を実施しています。総学習コストはわずか7,800ドルで、MagistralやClaude Opus 4などのクローズドソースモデルを上回る推論能力を示しました。特筆すべきは、400倍以上大きいDeepSeek R1を、AIME24(80.3 vs. 79.8)、AIME25(74.4 vs. 70.0)、HMMT25(50.4 vs. 41.7)という3つの高難度数学ベンチマークすべてで上回ったことです。これは、適切な多様性駆動最適化により、小規模モデルでも大規模モデルに匹敵する推論能力を引き出せることを実証しており、コスト効率の高いAI開発の新たな可能性を示しています。モデルはMITライセンスでGitHubとHugging Faceにてオープンソース公開されています。
   **arXiv:** https://arxiv.org/abs/2511.06221
