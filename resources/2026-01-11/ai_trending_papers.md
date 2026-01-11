## 今週のAI論文トレンド

1. **タイトル:** GDPO: Group reward-Decoupled Normalization Policy Optimization for Multi-reward RL Optimization
   **著者:** Shih-Yang Liu, Xin Dong, Ximing Lu, Shizhe Diao, Peter Belcak, Mingjie Liu, Min-Hung Chen, Hongxu Yin, Yu-Chiang Frank Wang, Kwang-Ting Cheng, Yejin Choi, Jan Kautz, Pavlo Molchanov
   **概要:** 大規模言語モデル（LLM）の訓練において、複数の報酬シグナルを同時に最適化する新しいアプローチを提案しています。従来のGRPO（Group Relative Policy Optimization）をマルチ報酬環境に適用すると、異なるロールアウト報酬の組み合わせが同一のアドバンテージ値に収束してしまい、訓練信号の解像度が低下する問題がありました。本研究ではGDPO（Group reward-Decoupled Normalization Policy Optimization）を導入し、各報酬の正規化を分離することで相対的な差異をより忠実に保存し、より正確なマルチ報酬最適化と訓練の安定性向上を実現しました。ツール呼び出し、数学的推論、コーディング推論の3つのタスクで評価を行い、正確性指標と制約遵守指標の両方でGRPOを一貫して上回る性能を示しました。
   **arXiv:** https://arxiv.org/abs/2601.05242

2. **タイトル:** Learnable Multipliers: Freeing the Scale of Language Model Matrix Layers
   **著者:** Maksim Velikanov, Ilyas Chahed, Jingwei Zuo, Dhia Eddine Rhaiem, Younes Belkada, Hakim Hacid
   **概要:** 大規模言語モデルの事前学習において標準的に使用される重み減衰（weight decay）に関する新たな知見を提示しています。確率的勾配ノイズがブラウン運動的な重み行列の膨張を引き起こし、重み減衰によってそれが抑制されるという従来の理解に対し、本研究では平衡ノルムを訓練手順の有害なアーティファクトとして捉え、学習可能な乗数を導入することで最適なスケールを学習します。個別の行・列乗数を追加することで、muP（Maximal Update Parameterization）乗数のより表現力の高い一般化を実現し、AdamおよびMuonオプティマイザの両方で改善を検証しました。結果として、最適化されたmuPベースラインを上回り、乗数チューニングの計算オーバーヘッドを削減することに成功しています。
   **arXiv:** https://arxiv.org/abs/2601.04890

3. **タイトル:** RL-AWB: Deep Reinforcement Learning for Auto White Balance Correction in Low-Light Night-time Scenes
   **著者:** Yuan-Kang Lee, Kuan-Lin Chen, Chia-Che Chang, Yu-Lun Liu
   **概要:** 夜間の低照度環境における色恒常性（カラーコンスタンシー）の問題に取り組む新しいフレームワークを提案しています。従来の夜間ホワイトバランスは、低照度ノイズと複雑な照明条件により困難でしたが、本研究では統計的手法と深層強化学習を組み合わせたRL-AWBを開発しました。まず夜間シーンに特化した統計的アルゴリズムを設計し、顕著なグレーピクセル検出と新しい照明推定を統合。次に、このアルゴリズムをコアとして活用する初の深層強化学習アプローチを構築し、プロのAWBチューニング専門家を模倣して各画像に対するパラメータを動的に最適化します。また、クロスセンサー評価を可能にする初のマルチセンサー夜間データセットも公開し、低照度・高照度画像の両方で優れた汎化性能を達成しました。
   **arXiv:** https://arxiv.org/abs/2601.05249
