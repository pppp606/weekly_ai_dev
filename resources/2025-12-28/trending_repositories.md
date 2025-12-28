# AIトレンドリポジトリ - 2025-12-28

ソース: https://github.com/trending?since=weekly

---

## [anthropics/skills](https://github.com/anthropics/skills)

### 概要

Anthropicが公開した「Agent Skills」は、Claude CodeやClaude.aiでのAIエージェントの動作を拡張するための公式フレームワークだ。今週だけで5,000以上のスターを獲得し、28.1kスターに到達している。

Skillsは単なるプロンプトテンプレートではない。Claudeが特定のタスクを繰り返し実行する方法を「教える」ための指示、スクリプト、リソースを組み合わせたフォルダ構造だ。会社のブランドガイドラインに沿ったドキュメント作成から、組織固有のワークフローに基づいたデータ分析まで、様々な場面で活用できる。

### 主な機能

- **即座に使えるドキュメントスキル**: Word、PDF、PowerPoint、Excelの作成・編集が可能なビルトインスキルを提供
- **シンプルなスキル定義**: `SKILL.md`ファイル1つからスキルを作成でき、YAML frontmatterで名前と説明を定義するだけで動作
- **複数プラットフォーム対応**: Claude Code、Claude.ai、Claude APIのすべてで利用可能
- **プラグインマーケットプレース統合**: Claude Codeから`/plugin marketplace add anthropics/skills`で簡単にインストール

### 注目される理由

AIエージェントを実務で使うとき、「このタスクはこう処理してほしい」という細かい要求が出てくる。従来はその都度プロンプトを書き直す必要があったが、Skillsならそれを再利用可能な形で定義できる。

特に実用的なのはドキュメントスキルだ。Word、PDF、PowerPointの生成・編集が可能で、企業のブランドガイドラインに沿った文書を一貫して作成できる。これまでAIでドキュメント生成すると「毎回微妙にフォーマットが違う」という問題があったが、Skillsで解決できる。

Apache 2.0ライセンスでオープンソース化されており、カスタムスキルの作成も容易だ。クリエイティブ、開発、エンタープライズ向けのサンプルスキルも提供されているので、自分のワークフローに合わせたスキルを作る際の参考になる。Claude Codeを日常的に使っている開発者にとって、作業の標準化と効率化を実現する重要なツールとなるだろう。

---

## [google/langextract](https://github.com/google/langextract)

### 概要

Googleが公開した「LangExtract」は、LLMを使って非構造化テキストから構造化データを抽出するPythonライブラリだ。19.6kスターを獲得しており、今週のトレンドで注目を集めている。

単にテキストから情報を抽出するだけでなく、「どのテキスト部分から抽出したか」を正確に追跡できるSource Grounding機能が特徴だ。臨床報告書や技術文書の処理において、抽出結果の検証可能性が求められる場面で威力を発揮する。

### 主な機能

- **Source Grounding**: 抽出したデータがテキストのどの部分に基づいているかを正確にマッピング
- **長文ドキュメント対応**: チャンキング、並列処理、複数パスでの抽出により大規模ファイルを効率的に処理
- **インタラクティブ可視化**: 数千のエンティティを文脈付きで表示するスタンドアロンHTMLを自動生成
- **複数LLMサポート**: Gemini、OpenAIのクラウドモデルに加え、Ollamaでのローカル実行にも対応
- **Few-shot学習**: ファインチューニング不要で、少数の例示だけで様々なドメインに対応

### 注目される理由

LLMを使った情報抽出は以前から可能だったが、「この結果は本当に正しいのか」を検証する手段がなかった。LangExtractのSource Grounding機能は、抽出結果と原文テキストの対応を明確にすることで、この問題に対処している。

医療記録、法律文書、技術レポートなど、正確性が求められる場面での活用が期待できる。実際にREADMEでは「Romeo and Juliet」の全文（147,843文字）から登場人物、感情、関係性を抽出するデモや、放射線レポートの構造化（RadExtract）が紹介されている。

APIは直感的で、`lx.extract()`関数にテキスト、プロンプト、Few-shot例を渡すだけで動作する。既存の情報抽出パイプラインにLLMの能力を組み込みたい開発者にとって、実践的な選択肢となるだろう。Apache 2.0ライセンスで、PyPIからインストール可能だ。

---

## その他の注目リポジトリ

今週のTrendingでは、以下のAI関連リポジトリも注目を集めていた。

| リポジトリ | 概要 |
|-----------|------|
| [exo-explore/exo](https://github.com/exo-explore/exo) | 日常のデバイスを組み合わせて自宅でAIクラスタを構築。Thunderbolt RDMAで99%の遅延削減を実現 |
| [sgl-project/mini-sglang](https://github.com/sgl-project/mini-sglang) | SGLangのコンパクト実装（5,000行）。LLMサービングシステムの学習教材として有用 |
| [danielmiessler/Fabric](https://github.com/danielmiessler/Fabric) | 再利用可能なAIプロンプト「Patterns」を管理するフレームワーク。37kスター |
| [resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox) | 高品質オープンソースText-to-Speech。感情表現やリズム制御に対応 |

---

*Source: [GitHub Trending (Weekly)](https://github.com/trending?since=weekly)*
