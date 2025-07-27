# Claude Code + promptfoo + モック環境 連携テストシステム

**article_guardrail_review.mdコマンド**の統合テストシステムです。

## 🎯 テスト連携の仕組み

```
promptfoo → Claude Code Provider → `claude -p` → article_guardrail_review.md → モック記事
```

### 連携の特徴

1. **Claude Code実行**: `claude -p .claude/commands/article_guardrail_review.md`でローカル実行
2. **promptfoo評価**: カスタムエバリュエーターで精度測定
3. **モック環境**: テスト用記事でガードレール違反検出テスト

## 📁 構成

```
tests/promptfoo/
├── providers/claude-code-provider.ts     # Claude Code (`claude -p`) 実行プロバイダー
├── evaluators/                          # promptfoo カスタム評価関数
├── mocks/articles/                      # ガードレール違反テスト用記事
└── configs/                             # テスト設定
```

## 🚀 実行方法

### 前提条件
- Claude Code CLI (`claude`) がインストール済み
- プロジェクトルートに `.claude/commands/article_guardrail_review.md` が存在

### テスト実行
```bash
cd tests/promptfoo

# 基本機能テスト（APPROVED判定確認）
npm test

# ガードレール違反検出テスト
npm run test:guardrails

# エッジケース・エラーハンドリングテスト  
npm run test:edge-cases
```

## 🔍 テスト内容

### 基本テスト
- 正常記事 → **APPROVED** 判定
- 出力形式適合性チェック

### ガードレール違反検出（9カテゴリ）
- 機密情報、個人情報、セキュリティ脆弱性
- 悪意コード、不適切コンテンツ、ヘイトスピーチ
- 政治偏見、医療アドバイス、虚偽情報

### エッジケース
- 空ファイル、破損ファイル、特殊文字等

## ⚙️ モック環境

`mocks/articles/` 配下のテスト記事：
- `weekly-ai-digest-20250721.md` - 正常記事
- `violations/*.md` - 各種違反パターン記事  
- `edge-cases/*.md` - エラーケース記事

## 📊 評価システム

- **承認判定精度**: APPROVED/BLOCKED判定の正確性
- **違反検出精度**: precision/recall/F1スコア
- **出力品質**: 説明の明確性・根拠性評価

## 🎯 目標指標

- テスト実行時間: 30秒以内
- 判定成功率: 90%以上  
- 違反検出精度: 80%以上