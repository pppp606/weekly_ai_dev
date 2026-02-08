## 今週のAI論文トレンド

1. **タイトル:** ERNIE 5.0 Technical Report
   **著者:** Haifeng Wang, Hua Wu, Tian Wu, Yu Sun, Jing Liu, Dianhai Yu, Yanjun Ma, Jingzhou He, Zhongjun He, Dou Hong, Qiwen Liu, Shuohuan Wang, Junyuan Shang, Zhenyu Zhang, Yuchen Ding 他多数（338名以上）
   **概要:** ERNIE 5.0は、テキスト・画像・動画・音声を統一的に理解・生成するために設計されたネイティブ自己回帰型基盤モデルである。すべてのモダリティを「次のトークングループ予測」という統一目標のもとでゼロから学習し、モダリティに依存しないエキスパートルーティングを備えた超スパースMixture-of-Experts（MoE）アーキテクチャを採用している。多様なリソース制約下での大規模デプロイメントの課題に対応するため、弾力的学習パラダイムを導入し、単一の事前学習内で深さ・エキスパート容量・ルーティングスパース性の異なるサブモデル群を同時に学習する。これにより、メモリやレイテンシの制約に応じた性能・モデルサイズ・推論速度の柔軟なトレードオフが可能となる。さらに、統一基盤モデルへの強化学習スケーリングの課題に体系的に取り組み、超スパースMoEアーキテクチャおよび多様なマルチモーダル設定下での効率的かつ安定的なポストトレーニングを実現している。公開モデルとしては初となる、兆パラメータ規模のマルチモーダル理解・生成を同時にサポートする統一自己回帰モデルの実用化事例であり、AI基盤モデルの新たな方向性を示す重要な研究成果である。
   **arXiv:** https://arxiv.org/abs/2602.04705

2. **タイトル:** FASA: Frequency-aware Sparse Attention
   **著者:** Yifei Wang, Yueqi Wang, Zhenrui Yue, Huimin Zeng, Yong Wang, Ismini Lourentzou, Zhengzhong Tu, Xiangxiang Chu, Julian McAuley
   **概要:** 大規模言語モデル（LLM）の長文入力処理において、Key-Value（KV）キャッシュの膨大なメモリ消費が深刻なボトルネックとなっている。本研究では、RoPE（回転位置埋め込み）における周波数チャンク（FC）レベルの機能的スパース性という新たな知見を発見し、これを活用したトークン選別フレームワーク「FASA」を提案する。少数の「支配的」周波数チャンクが完全なアテンションヘッドと高い文脈的一致を示すことを明らかにし、この特性を重要トークンの識別に利用する。FASAはまず支配的FCを用いて重要トークン集合を特定し、その縮小された集合に対してのみアテンション計算を実行する。LongBench-V1ではわずか256トークンの保持で完全KV性能のほぼ100%を達成し、AIME24ではキャッシュの18.9%のみで2.56倍の高速化を実現した。ICLR 2026に採択されており、長文コンテキスト処理の効率化に大きく貢献する研究である。
   **arXiv:** https://arxiv.org/abs/2602.03152

3. **タイトル:** WideSeek-R1: Exploring Width Scaling for Broad Information Seeking via Multi-Agent Reinforcement Learning
   **著者:** Zelai Xu, Zhexuan Xu, Ruize Zhang, Chunyang Zhu, Shi Yu, Weilin Liu, Quanlu Zhang, Wenbo Ding, Chao Yu, Yu Wang
   **概要:** 近年のLLM研究は単一エージェントによる深さ方向のスケーリングに注力してきたが、より広範なタスクでは個人の能力よりも組織的な協調能力が求められる。本研究では、マルチエージェント強化学習によって訓練されたリードエージェント・サブエージェントフレームワーク「WideSeek-R1」を提案する。共有LLMを用いつつも、各エージェントは独立したコンテキストと専門ツールを持ち、スケーラブルなオーケストレーションと並列実行を可能にする。2万件の広範な情報探索タスクで最適化した結果、WideSeek-R1-4BはWideSearchベンチマークにおいて40.0%のアイテムF1スコアを達成し、単一エージェントのDeepSeek-R1-671Bに匹敵する性能を示した。並列サブエージェント数の増加に伴い性能が一貫して向上することも確認され、幅方向スケーリングの有効性を実証している。小規模モデルによるマルチエージェント協調が巨大単一モデルに匹敵し得ることを示す画期的な研究であり、今後のエージェント設計に重要な示唆を与える。
   **arXiv:** https://arxiv.org/abs/2602.04634
