## 🧠 今週のAI論文トレンド

1. **タイトル:** Kandinsky 5.0: A Family of Foundation Models for Image and Video Generation
   **著者:** Vladimir Arkhipkin, Vladimir Korviakov, Nikolai Gerasimenko, Denis Parkhomenko, Viacheslav Vasilev, Alexey Letunovskiy 他25名
   **概要:** 本研究は、画像・動画生成のための基盤モデルファミリー「Kandinsky 5.0」を提案している。60億パラメータの画像生成モデル（Image Lite）、20億パラメータの動画合成モデル（Video Lite）、190億パラメータの高解像度動画モデル（Video Pro）の3つのバリアントで構成される。データキュレーションと多段階学習パイプラインを詳述し、教師ありファインチューニングと強化学習を用いた品質向上手法を導入。新しいアーキテクチャ、学習、推論の最適化により、高速な生成と最先端の性能を実現した。オープンソースでコードとチェックポイントが公開されており、研究コミュニティでの活用が期待される。
   **arXiv:** https://arxiv.org/abs/2511.14993

2. **タイトル:** MiroThinker: Pushing the Performance Boundaries of Open-Source Research Agents via Model, Context, and Interactive Scaling
   **著者:** MiroMind Team, Song Bai, Lidong Bing, Carson Chen, Guanzheng Chen, Yuntao Chen 他54名
   **概要:** 本論文は、モデルサイズとコンテキスト長に加え「インタラクティブスケーリング」という新たな性能向上次元を導入したオープンソースのリサーチエージェントを提案する。72Bモデルが256Kコンテキストウィンドウ内で1タスクあたり約600回のツール呼び出しを処理できるよう強化学習で訓練された。GAIA、HLE、BrowseComp、BrowseComp-ZHベンチマークで最大81.9%の精度を達成し、商用システムに迫る性能を示した。インタラクティブスケーリングは環境フィードバックと外部情報取得を活用してエラーを修正し、孤立したテスト時スケーリング手法に伴う性能劣化リスクを回避する点が特徴である。
   **arXiv:** https://arxiv.org/abs/2511.11793

3. **タイトル:** P1: Mastering Physics Olympiads with Reinforcement Learning
   **著者:** Jiacheng Chen, Qianjia Cheng, Fangchen Yu, Haiyuan Wan, Yuchen Zhang 他28名
   **概要:** 本研究は、強化学習を用いて物理推論に特化した大規模言語モデル「P1」ファミリーを開発した。フラッグシップモデルP1-235B-A22Bは、最新の国際物理オリンピック（IPhO 2025）で金メダル相当の性能を達成した初のオープンソースモデルであり、2024/2025年の13の国際・地域物理競技会で12個の金メダルを獲得した。小型バリアントP1-30B-A3BもIPhO 2025で銀メダル相当の成績を収めている。エージェント型フレームワーク「PhysicsMinions」と統合することで、IPhO 2025で総合1位を達成。物理以外にも数学やコーディングタスクで強力な能力を示している。
   **arXiv:** https://arxiv.org/abs/2511.13612
