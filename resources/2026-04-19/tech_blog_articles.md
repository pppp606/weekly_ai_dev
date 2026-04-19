# Japanese Tech Blog Articles - 2026-04-19

## Featured Articles

### 1. [設計書・コード・テストを全部AIに書かせて半年間開発してみたよ](https://zenn.dev/nttdata_tech/articles/8a010aff542625)
- **著者**: moros (NTTデータ Tech Blog)
- **プラットフォーム**: Zenn
- **公開日**: 2026-04-17
- **いいね数**: 209
- **概要**: NTTデータのエンジニアが、設計書からコード、テストまでを半年間すべてAI（GitHub Copilot主体）に書かせて本番プロジェクトを回してみた実践記。AI任せにしたときに起きた品質低下や、人間がどこまでレビューに関与すべきかという境界を具体的に整理している。
- **開発者向けポイント**: 「全部AIに書かせる」は現実的だが、設計レビューと結合テストの要件定義までAI任せにすると破綻する。AI駆動開発でスケールさせるには、Spec-Driven Development（仕様書を人間が磨く）と自動テストの先行投資が不可欠。
- **実装例**: 設計書テンプレート、Copilotへのコンテキスト注入の実例、半年後のコードベースで起きた「AI一貫性の崩壊」事例。

### 2. [gh skillが登場。GitHub公式のスキル管理ツールにnpx skillsから乗り換えた](https://zenn.dev/ubie_dev/articles/gh-skill-install-agent-skills)
- **著者**: tonkotsuboy_com (Ubie Dev)
- **プラットフォーム**: Zenn
- **公開日**: 2026-04-17
- **いいね数**: 192
- **概要**: GitHubが公式リリースした`gh skill`コマンドの使い方を、既存のnpx skillsからの乗り換え視点で解説。Claude CodeやCopilot CLIで使うAgent Skillsを、個人／Orgレベルで一元管理できるようになった経緯と導入手順。
- **開発者向けポイント**: Agent Skillsエコシステムが急速に整備されており、チーム配布が`gh skill install`で標準化されつつある。スキル（手順書）の共有がGitリポジトリ単位から組織単位へ進化。
- **実装例**: `gh skill install <repo>` / `gh skill list` の実行例、既存npx skillsからの移行スクリプト、CI連携サンプル。

### 3. [Claudeに原始時代に行ってもらっては困る話](https://zenn.dev/holy_fox/articles/e0c0bf75fba9e6)
- **著者**: holy_fox
- **プラットフォーム**: Zenn
- **公開日**: 2026-04-17
- **いいね数**: 166
- **概要**: Claude Codeが古い学習データをベースに「10年前の書き方」に回帰してしまう現象（いわゆる"原始時代化"）を取り上げ、context engineeringで最新仕様やコーディング規約をどう注入するかを論じた実践エッセイ。
- **開発者向けポイント**: LLMは最新ライブラリや新しいAPIに対しては指示がないと古い書き方に戻る。CLAUDE.mdや`.cursor/rules`で明示的に「使ってよいAPI」「使用禁止のパターン」を書き下すことが品質維持の鍵。
- **実装例**: 「React 19を前提にする」「fetchではなくservice layer経由」などの規約ファイル例。

### 4. [プロンプトの再現性をAIに自動チューニングさせる方法 ~ 暗黙知を排除する](https://zenn.dev/mizchi/articles/empirical-prompt-tuning)
- **著者**: mizchi
- **プラットフォーム**: Zenn
- **公開日**: 2026-04-19
- **いいね数**: 48
- **概要**: プロンプトを「手作業で磨く」時代を終わらせるため、評価データセットとメトリクスを使って経験的にプロンプトをチューニングするワークフローを提案。DSPy的なアプローチを、Claude CodeとカスタムスクリプトだけでLightに実現する。
- **開発者向けポイント**: プロンプトは属人的な暗黙知になりやすいが、評価ハーネスを先に作れば「バージョン管理できるプロンプト」に変わる。RAGやエージェント運用で再現性が欲しい場面に有効。
- **実装例**: 評価データセットの作り方、メトリクス自動算出スクリプト、プロンプト世代管理のディレクトリ構成。

### 5. [Claude in Chromeが便利すぎて不満だったので、自分専用のChrome拡張を作った](https://zenn.dev/sonicmoov/articles/d7703ab8c16515)
- **著者**: takemo101 (sonicmoov)
- **プラットフォーム**: Zenn
- **公開日**: 2026-04-16
- **いいね数**: 74
- **概要**: Anthropicの「Claude in Chrome」で足りなかった機能（ページコンテキストの取り回し、ショートカット、プロンプトテンプレート）を、自作Chrome拡張で補完した実装記。Claude APIとの接続方法、拡張の構成も公開。
- **開発者向けポイント**: ブラウザコンテキストでのLLM連携は、MCPがない環境でも`chrome.scripting`＋APIで実装できる。公式拡張の欠けを自分で埋めるのが2026年のスタイル。
- **実装例**: manifest v3構成、選択テキスト→Claude APIの橋渡し、プロンプトテンプレート管理UI。

### 6. [2026年、もはやClaude Codeはエンジニア以外も全員が使うべきツールになった](https://note.com/kajiken0630/n/nc0cb92bc080f)
- **著者**: 梶谷健人
- **プラットフォーム**: note
- **公開日**: 2026年2月（継続更新、直近週でのリアクション多数）
- **いいね数**: 2,201
- **概要**: 非エンジニアもClaude Codeを「業務自動化ツール」として使う時代になったという主張をもとに、マーケターや企画職の実運用例、CLAUDE.mdでのルール設定、ノンエンジニア向け導入手順を有料パートで展開。
- **開発者向けポイント**: エンジニアが書いたCLAUDE.mdを社内配布することで、非エンジニアが即Claude Codeを使える環境を作れる。社内AI民主化のテンプレートとして参考になる。
- **実装例**: 非エンジニア向けCLAUDE.mdテンプレート、業務SOPをSkill化するレシピ。

### 7. [【有料級】Claude Codeで1人マーケ部門を作った全記録](https://note.com/kawaidesign/n/n229818b75aa1)
- **著者**: KAWAI
- **プラットフォーム**: note
- **公開日**: 2026-04-14 (5日前)
- **いいね数**: 358
- **概要**: Claude Codeを「マーケアシスタント」として運用し、1人でコンテンツ生成・分析・配信まで回した半年の記録。Skills、Subagents、外部API連携を組み合わせてマーケ業務を体系化した具体レシピ。
- **開発者向けポイント**: コード生成の文脈を超えて、Claude Codeがビジネスオペレーション自動化ハブとして使える実例。ツール呼び出し（検索、SNS投稿、分析）をSkillsに閉じ込める設計が参考になる。
- **実装例**: マーケKPI自動集計Skill、記事下書き→校正→投稿までのサブエージェント連鎖、Looker/BigQuery接続の実装。

### 8. [AI駆動PMの最適解〜ClaudeCodeで推進する仕組み〜](https://note.com/suh_sunaneko/n/na8643d5ed6ee)
- **著者**: すぅ | AI駆動PM
- **プラットフォーム**: note
- **公開日**: 2026-04-18 (1日前)
- **いいね数**: 111
- **概要**: プロダクトマネージャーの業務（要求定義、ロードマップ整備、議事録要約、仕様書生成）をClaude Codeに乗せて効率化するプレイブック。PMがどのタスクをAIに渡し、どこで人間判断を差し込むべきかの線引きが明確。
- **開発者向けポイント**: エンジニアがPMと協業する際、双方が同じCLAUDE.mdとSkillsを共有することでコミュニケーションロスが減る。エンジニア向けの仕様書生成フローとしても転用可能。
- **実装例**: 要求ヒアリングをスキル化するテンプレ、PRD生成プロンプト、Jira/Notion連携。

### 9. [OCI Enterprise AIで作るRAGアプリ入門 〜 Object Storage / Vector Store / file searchを試してみた](https://qiita.com/shirok/items/42817c3ca57404911d2b)
- **著者**: shirok
- **プラットフォーム**: Qiita
- **公開日**: 2026-04-15
- **いいね数**: 15
- **概要**: Oracle Cloud Infrastructure (OCI)のEnterprise AIで、Object Storageをデータソースにしたvector storeとfile search APIを使って、RAGアプリを最小構成で立ち上げるハンズオン。AWS/GCP以外の選択肢として貴重。
- **開発者向けポイント**: エンタープライズ用途ではマルチクラウド対応が求められる。OCIの料金体系と精度トレードオフ、既存Oracle DBとの親和性を把握しておくと提案の幅が広がる。
- **実装例**: Terraformでのvector store作成、file search API呼び出しサンプル、Bedrock/Vertex AIとの機能比較表。

### 10. [Claude Codeのトークン消費が$40/日から1週間でも余裕になった全手法](https://zenn.dev/okamyuji/articles/claude-code-max-x20-token-savings)
- **著者**: okamyuji
- **プラットフォーム**: Zenn
- **公開日**: 2026-04-16
- **いいね数**: 16
- **概要**: Claude Code Max x20プランでも1日で$40相当のトークンを焼いていた筆者が、プロンプト圧縮・サブエージェント分割・キャッシュ活用・ファイル読み込み最適化でコストを20分の1にした実践テクニック集。
- **開発者向けポイント**: Claude Opus 4.7時代のコスト管理は必須スキル。`/compact`タイミング、Skill粒度、CLAUDE.mdの分割設計で体感コストは劇的に変わる。
- **実装例**: プロンプトプリセットの最小化、コンテキスト注入を"必要なときだけ"に絞るフック、トークン計測用の自作ラッパー。

## Trending Topics

- **Agent Skills / Spec-Driven Development**: Claude CodeのSkillsとCLAUDE.mdを使った「仕様書ファースト」開発が主流化。`gh skill`のリリースで組織展開が標準化された。
- **Claude Code × 非エンジニア**: ノンエンジニアがClaude Codeを日常業務に組み込む事例が急増。マーケ、PM、経理まで業務自動化の文脈で語られ始めた。
- **コンテキストエンジニアリング**: 単発プロンプトから「プロジェクト規模のcontext設計」へ関心がシフト。CLAUDE.md肥大化問題（1000行超で性能劣化）も議論されている。
- **ツール選定の成熟**: Cursor 3 Agent Window、Claude Code Desktop、GitHub Copilot CLIなど選択肢が増え、ツール比較記事が多数。単機能比較ではなく「チーム規模と作業スタイル」での選定が焦点に。
- **トークンコスト最適化**: Opus 4.7時代の実務で「プロンプト圧縮」「サブエージェント設計」がコスト削減の主戦場に。
- **RAGの実運用**: 企業ナレッジの書き直し、OCI/AWSなどクラウド別RAG実装のハンズオンが増加。

## Recommended Reading Order

1. **全体像をつかむ**: [設計書・コード・テストを全部AIに書かせて半年間開発してみたよ](https://zenn.dev/nttdata_tech/articles/8a010aff542625) でAI駆動開発の実態を把握する
2. **実装に落とす**: [gh skillが登場。GitHub公式のスキル管理ツールにnpx skillsから乗り換えた](https://zenn.dev/ubie_dev/articles/gh-skill-install-agent-skills) と [Claude in Chrome拡張自作](https://zenn.dev/sonicmoov/articles/d7703ab8c16515) で日々の開発環境を強化する
3. **応用・運用**: [Claudeに原始時代に行ってもらっては困る話](https://zenn.dev/holy_fox/articles/e0c0bf75fba9e6) と [プロンプトの自動チューニング](https://zenn.dev/mizchi/articles/empirical-prompt-tuning) で品質・再現性を担保する
4. **ビジネス応用**: [Claude Codeで1人マーケ部門](https://note.com/kawaidesign/n/n229818b75aa1) と [AI駆動PM](https://note.com/suh_sunaneko/n/na8643d5ed6ee) で組織展開のヒントを得る
5. **コスト最適化**: [Claude Codeトークン消費削減](https://zenn.dev/okamyuji/articles/claude-code-max-x20-token-savings) で実運用の費用感をつかむ
