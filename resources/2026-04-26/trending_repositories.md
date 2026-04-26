# GitHub Trending リポジトリ（週間）

*ソース: [GitHub Trending (Weekly)](https://github.com/trending?since=weekly)*

今週のトレンドは、コーディングエージェントを「より賢く」「より安く」使うためのインフラ系ツールが目立った週だった。すでにここ数週間で何度も特集している「スキル系」（karpathy-skills, agent-skills, GenericAgent など）は引き続き上位に並んでいるが、新顔として注目したいのが、コードベースの巨大な文脈をエージェントに食わせるためのコード検索 MCP と、Claude Code を「自分の好きなモデル」で動かしてしまう透過プロキシだ。どちらも、AI 駆動開発における二大ボトルネック――「文脈の精度」と「API コスト」――を真正面から殴りに来ているプロジェクトとして取り上げる。

## zilliztech/claude-context — エージェントの「コードベース全体を読んだ風」を支える検索 MCP

**GitHub**: https://github.com/zilliztech/claude-context

### どんなプロジェクトか

claude-context は、Milvus を作っている Zilliz のチームが手掛ける、コーディングエージェント向けのセマンティックコード検索 MCP サーバーである。Claude Code はもちろん、Cursor、Windsurf、Cline、Roo Code、Gemini CLI、Qwen Code、VS Code、LangChain/LangGraph まで、現在主流のエージェント環境のほぼ全てに差し込めるよう設計されている。

仕組みとしては、リポジトリを AST ベースでチャンキングし、Milvus / Zilliz Cloud に格納したうえで、BM25 と密ベクトルのハイブリッド検索でクエリに応える。再インデックスは Merkle ツリーで差分検出して変更されたファイルだけを処理するため、巨大なモノレポでも実用的に運用できるようになっている。エンベディングは OpenAI、VoyageAI、Gemini、Ollama から選べる構成で、ベンダーを固定しない設計だ。

### 何が従来の RAG やコード検索と違うのか

エージェント界隈で「コードベースを丸ごとコンテキストに突っ込めるか」という話題は何度も繰り返されてきた。1M トークンの登場で「もう全部入れればいいのでは」という空気もあったが、実運用ではコストとレイテンシ、そして「無関係なファイルが多いほど精度が下がる」という現実がすぐに足を引っ張る。

claude-context は「全部入れる」ではなく「必要な部分だけ正確に取り出す」方向に振り切っている。AST ベースのチャンキングで、関数やクラスの境界を意識した単位で切り出すため、汎用的な文字数ベースのチャンキングよりも文脈が壊れにくい。さらに BM25 の正確な記号マッチと密ベクトルの意味検索を組み合わせるハイブリッド検索によって、`useState` のような識別子マッチも、「認証エラーのリトライ処理」のような自然言語クエリも同じインターフェイスで返してくる。

公式が掲げている数字は **約 40% のトークン削減**。同じ精度の検索結果を、丸ごと放り込む方式の 6 割のトークンで実現できるという主張で、リポジトリの `/evaluation` ディレクトリに評価方法が公開されている。エージェントを長時間動かす開発フローでは、このオーダーの差は月のクラウド請求書に直結する。

### なぜ今、これが伸びているのか

ここ数週間、本ダイジェストでも[andrewyng/context-hub](https://github.com/andrewyng/context-hub)（コーディングエージェント向けのドキュメント基盤）や[volcengine/OpenViking](https://github.com/volcengine/OpenViking)（エージェントの記憶と知識を統一管理するコンテキスト DB）といった「エージェントに何を食わせるか」を扱うプロジェクトを取り上げてきた。claude-context もこの流れの中にある。

違いがあるとすれば、claude-context は「コード」という単一ドメインに特化していて、しかも MCP として既存のエージェントにそのまま差し込める点だ。新しいフレームワークを学ぶ必要がなく、Claude Code や Cursor の使い慣れた環境のまま、`search_code` ツールが一つ増えるだけで済む。導入コストの低さと、Zilliz / Milvus という実績のあるベクトル DB スタックが裏で支えていることが、9.5k スターという数字に表れている。

「エージェントの IQ を上げるには、賢いモデルに乗り換えるよりも、賢い検索を与えたほうが効く」という古典的な RAG の教えを、コーディングエージェント文脈で最も丁寧に実装したプロジェクトの一つと言っていい。

---

## Alishahryar1/free-claude-code — Claude Code を「好きなモデル」で動かす透過プロキシ

**GitHub**: https://github.com/Alishahryar1/free-claude-code

### どんなプロジェクトか

free-claude-code は、Claude Code CLI と VSCode 拡張を、Anthropic の API キーなしで動かすための透過プロキシだ。Claude Code が送信する Anthropic 形式のリクエストを途中でフックし、NVIDIA NIM、OpenRouter、DeepSeek といった OpenAI 互換 API、あるいは LM Studio・Ollama・llama.cpp などのローカル推論エンジンに変換して中継する。クライアント側から見れば、`ANTHROPIC_BASE_URL` を一行書き換えるだけで Claude Code がそのまま動く。

公式が「無料」と言い切れる根拠は、NVIDIA NIM の 40 リクエスト/分の無料枠と、ローカル推論の組み合わせにある。手元の GPU で GLM-4.7 や DeepSeek-R1 を動かしておけば、原理的には API 代をゼロにして Claude Code のワークフローを使える。

### 単なる「API 切り替え」ではない作り込み

このプロジェクトが面白いのは、単に Anthropic と OpenAI のスキーマ変換をしているだけではない点だ。

ティアごとの細かいルーティングが効くようになっていて、Opus 系のリクエストは Kimi-K2.5 に、Sonnet は DeepSeek-R1 に、Haiku はローカルの LM Studio に、といった指定が `MODEL_OPUS` `MODEL_SONNET` `MODEL_HAIKU` の環境変数だけで書ける。Claude Code が内部で発する「タイトル生成」「クォータ確認」「ファイルパス推定」のような瑣末なリクエストは、プロキシ側でローカルに即答してしまい、貴重な無料枠を消費しない仕掛けも入っている。

さらに、ローカル LLM が「テキストとしてツール呼び出しを書いてしまう」問題にも対応していて、ヒューリスティックなパーサーで構造化されたツールコールに自動整形する。`<think>` タグは Claude のネイティブな思考ブロックに変換されるし、Task ツールの `run_in_background=False` を強制してサブエージェントの暴走を防ぐ実装まである。Discord ボット、Telegram ボット、VSCode、ターミナルすべての入り口が用意されているのも、単なる遊びプロジェクトの域を超えている。

### なぜ今、これが急伸しているのか

このプロジェクトが今週だけで約 8.7k スターを集め、累計 12.4k スターに達した背景には、Claude Code というツール体験そのものへの強い需要がある。Anthropic の月額 100 ドル / 200 ドルクラスのプランが出てもなお、「もう少し気軽に試したい」「ローカルで完結させたい」「自前で持っているオープンソース LLM の品質も上がってきたから、それを Claude Code から使いたい」という層は厚い。

技術的には、Claude Code 自身がモデル提供 API を環境変数で差し替えられるよう設計されている（公式に Bedrock や Vertex AI 経由のサポートがある）ことを利用した、極めて素直な実装だ。一方で、Anthropic の利用規約上の扱いについて README が触れていない点には注意が必要で、業務利用を考えるなら自社のコンプライアンス担当に確認すべきプロジェクトだろう。

それでも、「Claude Code というインターフェイスは継続したまま、裏側のモデルだけを自由に挿げ替える」というアイデア自体は、AI 駆動開発の選択肢を広げる方向に確実に効いている。Karpathy も繰り返し言っているように、モデル本体の進化が落ち着けば、勝負は「ツールチェーンとワークフロー」に移る。free-claude-code はその移行を現場レベルで先取りしている存在と言える。

---

## その他の注目リポジトリ

| リポジトリ | 概要 |
|-----------|------|
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | 自前のインフラで動かせるオープンソースの AI SRE エージェント基盤。ログ・メトリクス・トレースを横断相関させて根本原因を提示し、既存の Runbook を読み込んで自動適用する。Anthropic、OpenAI、Ollama、Gemini に対応し、観測・インシデント管理ツール 60 種以上と連携 |
| [HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything) | LightRAG ベースの「全部入り」マルチモーダル RAG フレームワーク。PDF、Office 文書、画像、表、数式までを単一パイプラインで処理し、テキストと視覚要素をまたぐ知識グラフを構築する。香港科技大の研究グループ HKUDS が開発 |
| [thunderbird/thunderbolt](https://github.com/thunderbird/thunderbolt) | Thunderbird チームが開発するベンダーロックインフリーの AI クライアント。OpenAI 互換プロバイダや Ollama / llama.cpp などのローカル推論にも対応し、Web・モバイル・デスクトップを横断する。MPL 2.0 ライセンス |
| [mattpocock/skills](https://github.com/mattpocock/skills) | TypeScript 教育で知られる Matt Pocock 氏の個人 Claude Code スキル集。著名エンジニアの「実際の `.claude` ディレクトリ」を覗ける形になっており、スキル設計の生きたサンプルとして人気 |

*Source: [GitHub Trending (Weekly)](https://github.com/trending?since=weekly)*
