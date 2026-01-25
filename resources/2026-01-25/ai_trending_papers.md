## 今週のAI論文トレンド

1. **タイトル:** EvoCUA: Evolving Computer Use Agents via Learning from Scalable Synthetic Experience
   **著者:** Taofeng Xue, Chong Peng, Mianqiu Huang, Linsen Guo, Tiancheng Han, Haozhe Wang, Jianing Wang, Xiaocheng Zhang, Xin Yang, Dengchang Zhao, Jinrui Ding, Xiandi Ma, Yuchen Xie, Peng Pei, Xunliang Cai, Xipeng Qiu
   **概要:** 本研究は、ネイティブなコンピュータ使用エージェント（CUA）の開発における静的データスケーリングの制約を克服するため、EvoCUAという進化的アプローチを提案している。従来の手法は静的データセットの受動的な模倣に依存しており、長期的なコンピュータタスクに内在する複雑な因果関係を捕捉することが困難であった。EvoCUAはデータ生成とポリシー最適化を自己持続的な進化サイクルに統合し、検証可能な合成エンジンを用いて多様なタスクを自律的に生成する。数万の非同期サンドボックスロールアウトを調整するスケーラブルなインフラストラクチャを設計し、反復的進化学習戦略によって能力境界を特定しながら、失敗軌跡をエラー分析と自己修正を通じて豊富な監督信号へと変換する。OSWorldベンチマークで56.7%の成功率を達成し、オープンソースの新たな最先端記録を樹立。OpenCUA-72B（45.0%）を大幅に上回り、UI-TARS-2（53.1%）などのクローズドウェイトモデルも凌駕している。
   **arXiv:** https://arxiv.org/abs/2601.15876

2. **タイトル:** HERMES: KV Cache as Hierarchical Memory for Efficient Streaming Video Understanding
   **著者:** Haowei Zhang, Shudong Yang, Jinlan Fu, See-Kiong Ng, Xipeng Qiu
   **概要:** 近年のマルチモーダル大規模言語モデル（MLLM）はオフラインでの動画理解において顕著な進歩を遂げているが、ストリーミング動画入力への拡張は依然として課題である。既存モデルは安定した理解性能、リアルタイム応答、低GPUメモリオーバーヘッドを同時に維持することが困難である。本研究では、この課題に対処するため、HERMESというトレーニング不要のアーキテクチャを提案する。メカニスティックなアテンション調査に基づき、KVキャッシュを複数の粒度にわたって動画情報をカプセル化する階層的メモリフレームワークとして概念化している。推論時にHERMESはコンパクトなKVキャッシュを再利用し、リソース制約下での効率的なストリーミング理解を可能にする。ユーザークエリ到着時に補助的な計算が不要であり、連続的な動画ストリームインタラクションに対してリアルタイム応答を保証する。従来のSOTAと比較してTTFT（Time To First Token）が10倍高速化され、一様サンプリングと比較して動画トークンを最大68%削減しながらも、全ベンチマークで同等以上の精度を達成し、ストリーミングデータセットでは最大11.4%の性能向上を示している。
   **arXiv:** https://arxiv.org/abs/2601.14724

3. **タイトル:** LLM-in-Sandbox Elicits General Agentic Intelligence
   **著者:** Daixuan Cheng, Shaohan Huang, Yuxian Gu, Huatong Song, Guoxin Chen, Li Dong, Wayne Xin Zhao, Ji-Rong Wen, Furu Wei
   **概要:** 本研究では、LLMがコードサンドボックス（仮想コンピュータ）内で探索することで、非コード領域における汎用知能を引き出すLLM-in-Sandboxを提案している。まず、追加のトレーニングなしに、強力なLLMが非コードタスクにおいてコードサンドボックスを活用する汎化能力を示すことを実証している。例えば、LLMは自発的に外部リソースにアクセスして新しい知識を獲得し、ファイルシステムを活用して長いコンテキストを処理し、フォーマット要件を満たすためにスクリプトを実行する。さらに、LLM-in-Sandbox強化学習（LLM-in-Sandbox-RL）によって、非エージェント的なデータのみを使用してモデルをサンドボックス探索用にトレーニングすることで、これらのエージェント能力を向上させられることを示している。実験により、トレーニング不要設定と事後トレーニング設定の両方において、数学、物理、化学、生物医学、長文脈理解、指示追従にわたる堅牢な汎化を達成していることが実証されている。最後に、計算とシステムの観点からLLM-in-Sandboxの効率性を分析し、実世界での展開を促進するためにPythonパッケージとしてオープンソース化している。
   **arXiv:** https://arxiv.org/abs/2601.16206
