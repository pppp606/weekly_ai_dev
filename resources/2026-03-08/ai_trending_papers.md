## 今週のAI論文トレンド

1. **タイトル:** MOOSE-Star: Unlocking Tractable Training for Scientific Discovery by Breaking the Complexity Barrier
   **著者:** Zonglin Yang, Lidong Bing
   **概要:** 大規模言語モデル（LLM）を科学的発見に活用する際の根本的な課題に取り組んだ研究である。背景知識から仮説を直接生成するようにモデルを訓練する場合、組み合わせ的な計算複雑度がO(N^k)に達し、数学的に扱いにくくなることを著者らは示した。この障壁を打破するために提案されたMOOSE-Starフレームワークは、3つの主要な仕組みによって複雑度を指数的レベルから対数的レベル（O(log N)）に削減する。具体的には、(1)確率方程式から導出された分解サブタスクでの訓練、(2)動機付けガイド付き階層的探索による効率的な検索、(3)ノイズ耐性のための制約付き合成である。また、108,717件の分解論文を含むTOMATO-Starデータセットも公開されている。従来のアプローチが複雑度の壁に直面する中、本手法はテスト時にも継続的なスケーリング改善を示しており、科学的発見の自動化における大きな前進といえる。
   **arXiv:** https://arxiv.org/abs/2603.03756

2. **タイトル:** SkillNet: Create, Evaluate, and Connect AI Skills
   **著者:** Yuan Liang, Ruobin Zhong, Haoming Xu, Chen Jiang, Yi Zhong, Runnan Fang, Jia-Chen Gu, Shumin Deng, Yunzhi Yao, Mengru Wang, Shuofei Qiao, Xin Xu, Tongtong Wu, Kun Wang, Yang Liu, Zhen Bi, Jungang Lou, Yuchen Eleanor Jiang, Hangcheng Zhu, Gang Yu, Haiwen Hong, Longtao Huang, Hui Xue, Chenxi Wang, Yijun Wang, Zifei Shan, Xi Chen, Zhaopeng Tu, Feiyu Xiong, Xin Xie, Peng Zhang, Zhengke Gui, Lei Liang, Jun Zhou, Chiyu Wu, Jin Shang, Yu Gong, Junyu Lin, Changliang Xu, Hongjie Deng, Wen Zhang, Keyan Ding, Qiang Zhang, Fei Huang, Ningyu Zhang, Jeff Z. Pan, Guilin Qi, Haofen Wang, Huajun Chen
   **概要:** 現在のAIエージェントは、タスク間で蓄積されたスキルの再利用が困難であり、過去の解決策を活用せず、孤立したコンテキストで繰り返し問題を解決しているという課題がある。SkillNetは、AIの能力をスケーラブルに作成・評価・組織化するためのオープンプラットフォームを提供する。多様なソースからのスキル作成、関係マッピング、および安全性・完全性・実行可能性・保守性・コスト意識の5次元にわたる評価を統合的にサポートするフレームワークを採用している。200,000以上のスキルとインタラクティブツール、Pythonリソースを備え、ALFWorld、WebShop、ScienceWorldベンチマークにおいて複数のエージェントモデルで平均報酬が40%向上し、実行ステップが30%削減されるという大幅な改善を実証した。スキルを「進化し、組み合わせ可能な資産」として扱うことで、一時的な解決策から持続的な専門性への発展を可能にするインフラストラクチャとして注目される。
   **arXiv:** https://arxiv.org/abs/2603.04448

3. **タイトル:** DARE: Aligning LLM Agents with the R Statistical Ecosystem via Distribution-Aware Retrieval
   **著者:** Maojun Sun, Yue Wu, Yifei Xie, Ruijian Han, Binyan Jiang, Defeng Sun, Yancheng Yuan, Jian Huang
   **概要:** 言語モデルエージェントがR言語の統計的機能をより効果的に活用するための手法を提案した研究である。従来の検索手法は、タスクに関数をマッチングする際にデータの分布パターンを見落としているという問題がある。DAREは、分布特性と関数メタデータを組み合わせた検索システムを導入し、この課題に取り組んでいる。主な貢献として、8,191のCRANパッケージから構築されたRパッケージ知識ベース、埋め込みモデル、およびコード生成と統計分析評価のためのRCodingAgentが含まれる。実験の結果、10件の検索結果で約93%のランキング性能を達成し、競合するオープンソースモデルを最大17パーセントポイント上回りながら、必要な計算リソースが少ないことが示された。統計分析の成熟したR言語エコシステムとLLMの自動化をより効果的に統合する取り組みとして意義がある。
   **arXiv:** https://arxiv.org/abs/2603.04743
