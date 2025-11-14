## 🧠 今週のAI論文トレンド

1. **タイトル:** LoopTool: Closing the Data-Training Loop for Robust LLM Tool Calls
   **著者:** Kangning Zhang, Wenxiang Jiao, Kounianhua Du, Yuan Lu, Weiwen Liu, Weinan Zhang, Lei Zhang, Yong Yu
   **概要:** LLMのツール使用能力を向上させる完全自動化されたデータ進化フレームワークです。
モデルの弱点を診断し、アノテーションエラーを修正し、新しい挑戦的なサンプルを生成することで、データ合成とモデル訓練を緊密に統合します。
8Bスケールのモデルで、BFCL-v3やACEBenchなどのベンチマークで最高の結果を達成しています。
   **arXiv:** https://arxiv.org/abs/2511.09148

2. **タイトル:** RAG-Anything: All-in-One RAG Framework
   **著者:** Zirui Guo, Xubin Ren, Lingrui Xu, Jiahao Zhang, Chao Huang
   **概要:** すべてのモダリティにわたる包括的な知識検索を可能にする統一フレームワークです。
マルチモーダルコンテンツを相互接続された知識エンティティとして再概念化し、クロスモーダル関係とテキストセマンティクスの両方を捉えるデュアルグラフ構築を導入しています。
従来のアプローチが失敗する長文ドキュメントにおいて、特に顕著な性能向上を示しています。
   **arXiv:** https://arxiv.org/abs/2510.12323

3. **タイトル:** Time-to-Move: Training-Free Motion Controlled Video Generation via Dual-Clock Denoising
   **著者:** Authors from various institutions
   **概要:** 画像から動画への拡散モデルを使用した、訓練不要のモーション・外観制御動画生成フレームワークです。
デュアルクロック デノイジング戦略により、モーション指定領域での強い整合性と他の領域での柔軟性をバランスさせます。
テキストプロンプトのみでは実現できない、ピクセルレベルでの正確な外観制御を可能にします。
   **arXiv:** https://arxiv.org/abs/2511.08633

4. **タイトル:** Diffusion Language Models are Super Data Learners
   **著者:** Authors from various research institutions
   **概要:** 限られたユニークデータで訓練する場合、拡散言語モデルが自己回帰モデルを一貫して上回ることを示す研究です。
拡散モデルは自己回帰モデルの3倍以上の効果的なデータ効率を示し、0.5Bトークンで訓練されたDLMが1.5Bトークンで訓練されたARモデルと同等の性能を達成します。
自己回帰モデルが飽和・過学習する一方で、拡散モデルは計算量の増加とともに改善し続け、過学習の兆候を示しません。
   **arXiv:** https://arxiv.org/abs/2511.03276

5. **タイトル:** PaddleOCR-VL: Boosting Multilingual Document Parsing via a 0.9B Ultra-Compact Vision-Language Model
   **著者:** Cheng Cui, Ting Sun, and 16+ other authors from Baidu
   **概要:** 109言語をサポートする0.9Bパラメータの超コンパクトなビジョン・言語モデルです。
NaViTスタイルの動的解像度ビジュアルエンコーダとERNIE-4.5-0.3B言語モデルを統合し、テキスト・表・数式・チャートなどの複雑な要素を認識します。
最小限のリソース消費で、ページレベルおよび要素レベルのドキュメント解析において最先端の性能を達成しています。
   **arXiv:** https://arxiv.org/abs/2510.14528

6. **タイトル:** FilmAgent: A Multi-Agent Framework for End-to-End Film Automation in Virtual 3D Spaces
   **著者:** Authors from Harbin Institute of Technology
   **概要:** 仮想3D空間でのエンドツーエンドの映画制作を自動化するLLMベースのマルチエージェントフレームワークです。
監督・脚本家・俳優・撮影監督などの役割をシミュレートし、アイデア開発・脚本作成・撮影という3つの段階をカバーします。
人間による評価では、すべての側面で全てのベースラインを上回り、平均5点満点中3.98点を獲得しています。
   **arXiv:** https://arxiv.org/abs/2501.12909

7. **タイトル:** Continuous Autoregressive Language Models
   **著者:** Chenze Shao, Darren Li, Fandong Meng, Jie Zhou
   **概要:** 離散的な次トークン予測から連続的な次ベクトル予測へのパラダイムシフトを導入する言語モデルです。
Kトークンを1つの連続ベクトルに圧縮し99.9%以上の精度で再構築できる高忠実度オートエンコーダを使用します。
生成ステップ数をK分の1に削減し、計算コストを大幅に削減しながら強力なベースラインの性能を達成します。
   **arXiv:** https://arxiv.org/abs/2510.27688

8. **タイトル:** RLinf-VLA: A Unified and Efficient Framework for VLA+RL Training
   **著者:** Various authors
   **概要:** ビジョン・言語・アクションモデルの強化学習訓練のための統一的で効率的なフレームワークです。
ManiSkillやLIBEROなどの異なるシミュレータを統合し、PPOとGRPOの両方のアルゴリズムをサポートします。
130のLIBEROタスクで98.11%、25のManiSkillタスクで97.66%の成功率を達成し、実機ロボットでの強い汎化性能を示しています。
   **arXiv:** https://arxiv.org/abs/2510.06710

9. **タイトル:** Scaling Latent Reasoning via Looped Language Models
   **著者:** ByteDance researchers
   **概要:** 事前学習フェーズに推論を組み込んだループ型言語モデル（LoopLM）のファミリーです。
潜在空間での反復計算とエントロピー正則化された目標により、1.4Bおよび2.6BモデルがSOTA 12BのLLMに匹敵する性能を発揮します。
知識容量の増加ではなく、優れた知識操作能力によってこの優位性を達成し、明示的なCoTよりも因果的に忠実な推論プロセスを生成します。
   **arXiv:** https://arxiv.org/abs/2510.25741

10. **タイトル:** Do Not Step Into the Same River Twice: Learning to Reason from Trial and Error
   **著者:** Researchers from Peking University and Tencent
   **概要:** 外部の専門家ガイダンスを必要とせず、LLM自身が生成した誤答から学習する強化学習アプローチです。
モデル自身の試行錯誤の履歴を使用して学習を導くことで、強化学習における探索の停滞に対処します。
Qwen3-4B-Baseで6つの数学ベンチマークにおいて、通常のGRPOをPass@1で平均6.38、Pass@kで9.00上回ります。
   **arXiv:** https://arxiv.org/abs/2510.26109
