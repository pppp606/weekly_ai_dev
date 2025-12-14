## 🧠 今週のAI論文トレンド

1. **タイトル:** Wan-Move: Motion-controllable Video Generation via Latent Trajectory Guidance  
   **著者:** Ruihang Chu, Yefei He, Zhekai Chen, Shiwei Zhang, Xiaogang Xu ほか  
   **概要:** 画像→動画生成モデルにモーション制御を直接組み込むため、物体の動きを密な点群軌跡として表現し、特徴を時空間的に伝播させることで動きに整合した潜在表現を生成する手法。外部のモーションエンコーダを排し、既存モデル（Wan-I2V-14B）にそのまま統合できるためスケールしやすい。5秒・480pの動画でKling 1.5 ProのMotion Brushに迫る制御品質をユーザ評価で示し、MoveBenchという新ベンチマークも整備。高品質なモーション注釈付きデータで一貫して優れた結果を報告している。  
   **arXiv:** https://arxiv.org/abs/2512.08765

2. **タイトル:** T-pro 2.0: An Efficient Russian Hybrid-Reasoning Model and Playground  
   **著者:** Dmitrii Stoianov, Danil Taranets, Olga Tsymboi, Ramil Latypov ほか  
   **概要:** ロシア語に最適化したハイブリッド推論LLM。キリル文字に密なトークナイザとEAGLE方式のスペキュレーティブデコーディングを組み合わせ、推論トレース生成と直接回答の両モードで遅延を削減。学習コーパス（T-Wix 500k）、推論ベンチマーク（T-Math）、モデル・EAGLE重みをすべて公開し、再現性と拡張性を重視。Webデモでモード別の速度と精度を提示し、ロシア語圏の実用LLM開発基盤として位置づけている。  
   **arXiv:** https://arxiv.org/abs/2512.10430

3. **タイトル:** Visionary: The World Model Carrier Built on WebGPU-Powered Gaussian Splatting Platform  
   **著者:** Yuning Gong, Yifei Liu, Yifan Zhan, Muyao Niu ほか  
   **概要:** WebGPU上でリアルタイムに3D Gaussian Splatting（3DGS）やメッシュを描画するオープンなブラウザプラットフォーム。フレームごとにONNX推論を実行しつつ軽量な「クリックして即動く」体験を提供し、標準化されたGaussian Generator契約で各種3DGS/4DGS・ニューラルアバター・スタイル変換などをプラグイン的に差し替え可能。GPUベースのプリミティブソートで既存Webビューアより高効率を示し、再現・比較・配布の摩擦を大幅に低減する「World Model Carrier」として設計されている。  
   **arXiv:** https://arxiv.org/abs/2512.08478
