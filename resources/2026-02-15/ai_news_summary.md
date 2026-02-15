# AI News Summary - 2026-02-15

## Major Announcements

### OpenAI
- **Title**: GPT-5.3-Codex-Spark リリース（リアルタイムコーディングモデル）
- **Date**: 2026-02-12
- **Source**: https://openai.com/index/introducing-gpt-5-3-codex-spark/
- **Summary**: OpenAIがリアルタイムコーディング向けに最適化された新モデル「GPT-5.3-Codex-Spark」のリサーチプレビューを公開。Cerebras Wafer Scale Engine 3上で動作し、1000トークン/秒以上の超低レイテンシ推論を実現。SWE-Bench ProやTerminal-Bench 2.0でGPT-5.3-Codexに匹敵する性能を、大幅に短い処理時間で達成する。
- **開発者への影響**: コーディングエージェントの応答速度が劇的に向上し、リアルタイムのペアプログラミング体験が実用レベルに到達。ChatGPT Proユーザー向けにリサーチプレビューとして提供開始。Cerebrasチップでの推論はOpenAI初のNvidia以外での本番稼働となる。

### OpenAI
- **Title**: Beyond Rate Limits: CodexとSoraへのアクセス拡大（クレジットシステム導入）
- **Date**: 2026-02-13
- **Source**: https://openai.com/index/beyond-rate-limits/
- **Summary**: OpenAIがCodexとSoraにハイブリッドアクセスシステムを導入。従来のレート制限に加え、リアルタイムのクレジット購入により、レート制限到達後も継続利用が可能に。レート制限、フリーティア、クレジット、プロモーション、エンタープライズ権限を統合した階層型の意思決定ウォーターフォールとして設計されている。
- **開発者への影響**: Codexのヘビーユーザーが利用制限に達した際の中断がなくなり、開発フローの継続性が大幅に改善。ペイアズユーゴー方式での柔軟な利用が可能に。

### OpenAI
- **Title**: Harness Engineering: エージェントファーストの世界でのCodex活用
- **Date**: 2026-02-11
- **Source**: https://openai.com/index/harness-engineering/
- **Summary**: OpenAI社内チームが5ヶ月間、手書きコード0行でソフトウェア製品を構築・出荷した実験の詳細を公開。アプリケーションロジック、テスト、CI設定、ドキュメント、内部ツールまで全てCodexが生成。手動実装の約1/10の時間で完成したと報告している。
- **開発者への影響**: 「人間が舵を取り、エージェントが実行する」というエージェントファーストの開発パラダイムの具体的な実践例を提示。コンテキスト管理やタスク分割のベストプラクティスが参考になる。

### OpenAI
- **Title**: ChatGPTにLockdown Modeとリスクラベルを導入
- **Date**: 2026-02-13
- **Source**: https://openai.com/index/introducing-lockdown-mode-and-elevated-risk-labels-in-chatgpt/
- **Summary**: OpenAIがプロンプトインジェクション攻撃に対抗する2つのセキュリティ機能を発表。Lockdown Modeは外部システムとの通信を厳格に制限し、データ流出リスクを低減する上級セキュリティ設定。Elevated Riskラベルは追加リスクのある機能を識別する。Enterprise、Edu、Healthcare版で利用可能。
- **開発者への影響**: エンタープライズ環境でのAI活用におけるセキュリティ強化。特にCodexやAtlas連携時のプロンプトインジェクション対策として重要。

### Anthropic
- **Title**: Anthropic、Series Gで300億ドルを調達（評価額3800億ドル）
- **Date**: 2026-02-12
- **Source**: https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation
- **Summary**: AnthropicがGICとCoatue主導のSeries Gラウンドで300億ドルを調達、ポストマネー評価額は3800億ドル。前回Series Fの1830億ドルから倍増以上。年間経常収益は140億ドルで、過去3年間それぞれ10倍以上の成長を記録。Fortune 10の8社がClaudeの顧客。
- **開発者への影響**: 大規模な資金調達により、フロンティア研究、製品開発、インフラ拡張が加速。Claude APIの安定性・スケーラビリティ向上やエンタープライズ向け機能の充実が見込まれる。

### Anthropic
- **Title**: AnthropicとCodePathが提携、米最大のCS教育プログラムにClaudeを導入
- **Date**: 2026-02-13
- **Source**: https://www.anthropic.com/news/anthropic-codepath-partnership
- **Summary**: Anthropicが米国最大のCS教育プログラムCodePathと提携し、ClaudeとClaude Codeをカリキュラムの中核に据える。コミュニティカレッジ、州立大学、HBCUsの20,000人以上の学生がフロンティアAIツールにアクセス可能に。実際のオープンソースプロジェクトへの貢献も含む実践的な教育を提供。
- **開発者への影響**: AI駆動開発スキルを持つ次世代エンジニアの育成を加速。Claude CodeやAgent SDKを活用した開発が教育現場で標準化される動き。

### Google / DeepMind
- **Title**: Gemini 2.5 Computer Use Model の一般提供拡大
- **Date**: 2026-02-12
- **Source**: https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-computer-use-model/
- **Summary**: Google DeepMindがGemini 2.5 Computer Use Modelの利用範囲を拡大。UIを直接操作できるAIエージェント構築を可能にする専用モデルで、Gemini APIおよびVertex AIから利用可能。フォーム入力、ドロップダウン操作、ログイン後の画面操作など、構造化APIを介したソフトウェア操作に対応。Google社内ではUIテスト自動化に実稼働導入済み。
- **開発者への影響**: AIエージェントによるUI操作の自動化が実用段階に。Firebase Testing Agent、Project Mariner等との連携により、テスト自動化やブラウザ操作の効率化が進む。

## Other Notable Updates

### OpenAI
- **Title**: ChatGPTでの広告テスト開始
- **Date**: 2026-02-09
- **Source**: https://openai.com/index/testing-ads-in-chatgpt/
- **Summary**: OpenAIがChatGPT内での広告表示テストを開始したことを発表。AI駆動開発への直接的な影響は限定的だが、OpenAIのビジネスモデル変化として注目される。

### OpenAI
- **Title**: GPT-5.2が理論物理学で新しい結果を導出
- **Date**: 2026-02-13
- **Source**: https://openai.com/index/new-result-theoretical-physics/
- **Summary**: GPT-5.2が理論物理学分野で新しい研究成果を導出したことを報告。AIモデルの科学的推論能力の進展を示す事例。

### Microsoft
- **Title**: AI Recommendation Poisoning（AIメモリ汚染攻撃）に関する調査報告
- **Date**: 2026-02-10
- **Source**: https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/
- **Summary**: Microsoftセキュリティチームが、AIシステムのメモリを操作して不正な推薦を行わせる「AI Recommendation Poisoning」攻撃の増加傾向を報告。LLMベースのアプリケーション開発者にとって重要なセキュリティ知見。
- **開発者への影響**: RAGやメモリ付きAIエージェント開発時のセキュリティ設計において、入力データの検証とメモリ汚染対策の重要性が増す。

### Microsoft
- **Title**: プロンプト攻撃によるLLMセーフティアライメント破壊
- **Date**: 2026-02-09
- **Source**: https://www.microsoft.com/en-us/security/blog/2026/02/09/prompt-attack-breaks-llm-safety/
- **Summary**: Microsoftの研究チームが、最小限のファインチューニングでもLLMのセーフガードが弱体化する可能性を示す研究結果を公開。1つのプロンプトでセーフティアライメントを破壊できるケースを報告。
- **開発者への影響**: LLMを組み込んだアプリケーション開発において、ファインチューニング後のセーフティ再評価の必要性を示唆。

### Google
- **Title**: Google Workspace AI Expanded Accessアドオン提供開始
- **Date**: 2026-02-05（継続的に展開中）
- **Source**: https://workspaceupdates.googleblog.com/2026/02/google-workspace-ai-expanded-access.html
- **Summary**: Google WorkspaceにAI Expanded Accessアドオンが登場。Geminiアプリ、NotebookLM、FlowなどのAI機能の利用上限を引き上げ可能に。Business Standard/Plus、Enterprise Standard/Plusプランで購入可能、3月1日からはプロモーション期間が終了し有料アドオンに完全移行。
- **開発者への影響**: Workspace連携のAI開発において、API利用枠の拡大がビジネスユースケースの実装を加速。NotebookLMやFlowを活用したワークフロー自動化の本格運用が容易に。

## Source References
- OpenAI Blog: https://openai.com/blog
- Google AI Blog: https://ai.googleblog.com/
- Anthropic News: https://www.anthropic.com/news
- Meta AI Blog: https://ai.meta.com/blog/
- Microsoft Research Blog: https://www.microsoft.com/en-us/research/blog/
- DeepMind Blog: https://deepmind.google/discover/blog/
- Hugging Face Blog: https://huggingface.co/blog
