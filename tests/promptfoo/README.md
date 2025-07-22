# Article Guardrail Review Testing

このディレクトリは **article_guardrail_review.mdコマンド専用** のテストシステムです。

## 概要

article_guardrail_review.mdは生成済みの記事をレビューし、ガードレール違反を検出してAPPROVED/BLOCKEDの判定を行うコマンドです。

## テスト対象

- **入力**: 生成済みの記事ファイル（markdown形式）
- **出力**: APPROVED/BLOCKED判定と理由
- **検証項目**: 
  - 9カテゴリのガードレール違反検出精度
  - 出力形式の適合性
  - エラーハンドリング

## ディレクトリ構造

```
tests/promptfoo/
├── configs/           # テスト設定ファイル
├── evaluators/        # カスタム評価関数
├── mocks/articles/    # テスト用記事（違反パターン含む）
├── providers/         # article_guardrail_review専用プロバイダー
└── scripts/           # 検証スクリプト
```

## 実行方法

```bash
# 基本テスト
npm test

# ガードレール違反検出テスト
npm run test:guardrails

# エッジケーステスト
npm run test:edge-cases
```

## テストケース

- **基本機能**: 正常な記事のAPPROVED判定
- **違反検出**: 9カテゴリの違反パターン
- **エッジケース**: 空ファイル、破損ファイル等の処理