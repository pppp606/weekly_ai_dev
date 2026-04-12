## 今週のAI論文トレンド

1. **タイトル:** Adam's Law: Textual Frequency Law on Large Language Models
   **著者:** Hongyuan Adam Lu, Z.L., Victor Wei, Zefan Zhang, Zhao Hong, Qiqi Xiang, Bowen Cao, Wai Lam
   **概要:** 本研究は、人間の読解に影響を与えることが知られているテキスト頻度（Textual Frequency）が大規模言語モデル（LLM）にどのように関係するかを調査したものである。提案フレームワークは3つの要素で構成される。第一に「テキスト頻度法則」として、高頻度で出現するテキストがプロンプティングとファインチューニングの両方に有益であることを示す。第二に「テキスト頻度蒸留」として、LLMが生成したストーリー補完を用いて頻度推定を精緻化する手法を提案する。第三に「カリキュラムテキスト頻度トレーニング」として、文の出現頻度の昇順に基づくファインチューニングアプローチを導入する。数学的推論、機械翻訳、常識推論、エージェントツール呼び出しなど多様なタスクで有効性が実証され、新たに構築されたペアデータセットを用いた評価において一貫した性能向上が確認された。テキスト頻度という言語学的知見をLLMの学習に応用する新しい視点を提供する研究である。
   **arXiv:** https://arxiv.org/abs/2604.02176

2. **タイトル:** GrandCode: Achieving Grandmaster Level in Competitive Programming via Agentic Reinforcement Learning
   **著者:** Xiaoya Li, Xiaofei Sun, Guoyin Wang, Songqiao Su, Chris Shum, Jiwei Li (DeepReinforce Team)
   **概要:** 競技プログラミングは、AIが人間に対して依然として優位性を確立できていない最後の領域の一つである。従来の最先端手法であるGoogleのGemini 3 Deep Thinkでさえ、評価環境において8位にとどまっていた。本研究では、マルチエージェント強化学習フレームワーク「GrandCode」を提案する。このシステムは、仮説生成・問題解決・テスト作成・要約といった多様なエージェントモジュールを統合し、事後学習とオンラインテスト時強化学習を通じてそれらを共同で改善する。さらに、多段階エージェントロールアウトにおける遅延報酬やオフポリシードリフトの課題に対処するため、Agentic GRPOという新手法を導入する。GrandCodeは2026年3月のCodeforces連続3大会（Round 1087-1089）において全参加者中1位を獲得し、伝説的なグランドマスターレベルのプログラマーを含む全人間参加者を上回った。AIが競技プログラミングにおいてエリート人間の能力を超えたことを実証する画期的な成果である。
   **arXiv:** https://arxiv.org/abs/2604.02721

3. **タイトル:** Rethinking Generalization in Reasoning SFT: A Conditional Analysis on Optimization, Data, and Model Capability
   **著者:** Qihan Ren, Peng Wang, Ruikun Cai, Shuai Shao, Dadi Guo, Yuejin Xie, Yafu Li, Quanshi Zhang, Xia Hu, Jing Shao, Dongrui Liu
   **概要:** 本研究は「教師ありファインチューニング（SFT）は記憶するだけで、強化学習（RL）こそが汎化する」という従来の通念に異議を唱えるものである。拡張された思考連鎖（Chain-of-Thought）による推論SFTを詳細に調査した結果、ドメイン間汎化は存在するが、3つの重要な条件に依存することが明らかになった。第一に、一部の汎化失敗は訓練不足に起因し、性能は「低下と回復パターン」を示すため、初期チェックポイントでは真の汎化能力が過小評価される。第二に、データ特性が汎化に大きく影響し、低品質な解は広範に悪影響を及ぼす一方、検証済みの長いCoTトレースはドメイン間性能を一貫して改善する。第三に、モデルの基礎能力が本質的に重要であり、高能力モデルは単純な訓練タスクから転移可能な手続き的パターンを抽出できるが、弱いモデルは表層的な冗長性を模倣するにとどまる。推論能力と安全性のトレードオフも明らかにし、汎化を絶対的な可否ではなく条件付きの現象として再定義した重要な研究である。
   **arXiv:** https://arxiv.org/abs/2604.06628
