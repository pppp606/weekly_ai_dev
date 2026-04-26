## 今週のAI論文トレンド

1. **タイトル:** Tstars-Tryon 1.0: Robust and Realistic Virtual Try-On for Diverse Fashion Items
   **著者:** Mengting Chen, Zhengrui Chen, Yongchao Du, Zuan Gao, Taihang Hu, Jinsong Lan, Chao Lin, Yefeng Shen, Xingjian Wang, Zhao Wang, Zhengtao Wu, Xiaoli Xu, Zhengze Xu, Hao Yan, Mingzhou Zhang, Jun Zheng, Qinye Zhou, Xiaoyong Zhu, Bo Zheng (Alibaba Inc.)
   **概要:** 画像生成・編集技術の進展によりバーチャル試着の応用範囲が広がる一方、実運用環境では極端なポーズや照明変化、動きによるブレなどに耐えられないケースが多いという課題があった。本論文では、商用規模で堅牢かつ写実的、多用途、高効率を兼ね備えた試着システムTstars-Tryon 1.0を提案する。エンドツーエンドのモデル設計、スケーラブルなデータエンジン、堅牢なインフラ、多段階の学習パラダイムを統合することで、衣服のテクスチャや素材、構造特性を忠実に保持しつつAI生成特有のアーティファクトを抑制する。さらに最大6枚の参照画像から8カテゴリにわたる多画像合成、人物アイデンティティと背景の一体的制御、ニアリアルタイム推論を実現した。Taobaoアプリで産業規模に展開され、数百万のユーザーと数千万件のリクエストを処理しており、商用ECにおける生成AI活用の到達点を示している。
   **arXiv:** https://arxiv.org/abs/2604.19748

2. **タイトル:** LLaDA2.0-Uni: Unifying Multimodal Understanding and Generation with Diffusion Large Language Model
   **著者:** Inclusion AI, Tiwei Bie, Haoxing Chen, Tieyuan Chen, Zhenglin Cheng, Long Cui, Kai Gan, Zhicheng Huang, Zhenzhong Lan, Haoquan Li, Jianguo Li, Tao Lin, Qi Qin, Hongjun Wang, Xiaomei Wang, Haoyuan Wu, Yi Xin, Junbo Zhao (inclusionAI)
   **概要:** 従来は理解と生成、テキストと画像でアーキテクチャや学習パイプラインが分離されていたが、本研究はこれらをネイティブ統合するための離散拡散LLM「LLaDA2.0-Uni」を提案する。完全意味論的な離散トークナイザ、MoEベースのdLLMバックボーン、拡散デコーダを組み合わせ、SigLIP-VQで連続視覚入力を離散化することで、テキストと画像の両方をブロック単位のマスク拡散で扱える。推論効率はバックボーンのプレフィックス対応最適化とデコーダの少ステップ蒸留により並列デコードを超えて向上した。大規模かつ精緻にキュレーションされたデータと多段階学習により、専用VLMに匹敵するマルチモーダル理解性能と高品質な画像生成・編集性能を両立し、インタリーブ生成と推論をネイティブに支える次世代の統合基盤モデルへの拡張可能なパラダイムを示している。コードとモデルはGitHubで公開済みで、拡散ベースのマルチモーダルLLMの実用化に向けた重要なマイルストーンと位置付けられる。
   **arXiv:** https://arxiv.org/abs/2604.20796

3. **タイトル:** AgentSPEX: An Agent SPecification and EXecution Language
   **著者:** Pengcheng Wang, Jerry Huang, Jiarui Yao, Rui Pan, Peizhi Niu, Yaowenqi Liu, Ruida Wang, Renhao Lu, Yuwei Guo, Tong Zhang (UIUC ScaleML Lab)
   **概要:** 既存のLLMエージェントは単一プロンプトによる反応的な制御に頼ることが多く、制御フローや中間状態が暗黙的になり挙動の制御や保守が難しい。一方でLangGraph、DSPy、CrewAIなどのオーケストレーションフレームワークはワークフローをPythonコードに密結合させてしまい、変更や再利用のコストが大きいという課題があった。本論文ではエージェントのワークフローを明示的な制御フローとモジュール構造で記述するためのドメイン固有言語AgentSPEXと、カスタマイズ可能なエージェントハーネスを提案する。型付きステップ、分岐とループ、並列実行、再利用可能なサブモジュール、明示的な状態管理を備え、ツールアクセス、サンドボックス仮想環境、チェックポイント、検証、ロギングをハーネス側で提供する。さらにグラフ表示とワークフロー表示を同期させたビジュアルエディタや、ディープリサーチや科学研究向けの即利用可能なエージェントも同梱される。7つのベンチマークでの評価とユーザースタディを通じて、既存フレームワークと比較して解釈性とアクセシビリティに優れたワークフロー記述パラダイムを提供することを示している。
   **arXiv:** https://arxiv.org/abs/2604.13346
