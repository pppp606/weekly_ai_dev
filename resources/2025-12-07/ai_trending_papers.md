## 今週のAI論文トレンド

1. **タイトル:** From Code Foundation Models to Agents and Applications: A Comprehensive Survey and Practical Guide to Code Intelligence
   **著者:** Jian Yang, Xianglong Liu, Weifeng Lv, Ken Deng, Shawn Guo, Lin Jing, Yizhi Li, Shark Liu 他多数（Beihang University）
   **概要:** 本論文は、コードLLMの発展を包括的にまとめた実践的ガイドである。GitHub CopilotやCursor、Claude Codeなどの商用ツールが自動ソフトウェア開発を変革している中、本サーベイはデータキュレーションからポストトレーニングまでのモデルライフサイクル全体を体系的に分析している。GPT-4やClaude、LLaMAなどの汎用LLMと、StarCoderやDeepSeek-Coderなどのコード特化LLMの技術・設計判断・トレードオフを比較検証。さらに、学術研究と実世界デプロイメントのギャップ（コード正確性、セキュリティ、大規模コードベースへのコンテキスト認識など）を明らかにし、有望な研究方向を実用ニーズにマッピングしている。スケーリング則、フレームワーク選択、ハイパーパラメータ感度などの詳細な実験分析も含む。
   **arXiv:** https://arxiv.org/abs/2511.18538

2. **タイトル:** DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models
   **著者:** DeepSeek-AI, Aixin Liu, Aoxue Mei, Bangcai Lin, Bing Xue 他多数
   **概要:** 本論文では、高い計算効率と優れた推論・エージェント性能を両立したDeepSeek-V3.2を発表している。主要な技術的ブレークスルーとして、(1) DeepSeek Sparse Attention (DSA)：長文脈シナリオでモデル性能を維持しながら計算複雑度を大幅に削減する効率的アテンション機構、(2) スケーラブル強化学習フレームワーク：堅牢な強化学習プロトコルとポストトレーニング計算のスケーリングにより、GPT-5と同等の性能を達成。高計算バリアントのDeepSeek-V3.2-SpecialeはGPT-5を超え、Gemini-3.0-Proと同等の推論能力を発揮し、2025年国際数学オリンピック(IMO)と国際情報オリンピック(IOI)で金メダル相当の成績を達成、(3) 大規模エージェントタスク合成パイプライン：ツール使用シナリオに推論を統合するため、スケーラブルなエージェント的ポストトレーニングを実現する新規合成パイプラインを開発している。
   **arXiv:** https://arxiv.org/abs/2512.02556

3. **タイトル:** LongVT: Incentivizing "Thinking with Long Videos" via Native Tool Calling
   **著者:** Zuhao Yang, Sudong Wang, Kaichen Zhang, Keming Wu, Sicong Leng, Yifan Zhang, Bo Li, Chengwei Qin, Shijian Lu, Xingxuan Li, Lidong Bing（LMMs-Lab）
   **概要:** 大規模マルチモーダルモデル(LMM)はテキストChain-of-Thoughtによる動画推論で優れた能力を示すが、特に証拠が疎らで時間的に分散している長尺動画処理ではハルシネーションに脆弱である。本研究では、人間が長い動画を理解する際にまずグローバルにスキミングし、次に関連クリップを詳細に検討するプロセスに着想を得て、LongVTを提案している。これはインターリーブされたマルチモーダルChain-of-Tool-Thoughtにより「長い動画で思考する」ことを可能にするエンドツーエンドのエージェントフレームワークである。LMMの時間的グラウンディング能力をネイティブなビデオクロッピングツールとして活用し、特定のビデオクリップにズームインしてより細かいフレームをリサンプリングする。このグローバルからローカルへの推論ループは、回答が視覚的証拠に基づくまで継続される。また、訓練と評価のためのデータスイートVideoSIAHを公開予定。
   **arXiv:** https://arxiv.org/abs/2511.20785
