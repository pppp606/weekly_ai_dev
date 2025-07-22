# Mock Articles for Article Guardrail Review Testing

このディレクトリには、article_guardrail_review.mdコマンドをテストするための **生成済み記事のモック** が含まれています。

## ディレクトリ構造

```
mocks/articles/
├── weekly-ai-digest-20250721.md           # 正常な記事（APPROVED期待）
├── weekly-ai-digest-20250721-guardrail-fail.md  # 複数違反記事（BLOCKED期待）
├── weekly-ai-digest-20250721-empty.md     # 空記事（BLOCKED期待）
├── weekly-ai-digest-minimal.md            # 最小限記事（境界テスト）
├── violations/                            # 特定違反パターンの記事
│   ├── confidential-info.md              # 機密情報違反
│   ├── personal-info.md                  # 個人情報違反
│   ├── security-exploits.md              # セキュリティ脆弱性
│   ├── malicious-code.md                 # 悪意のあるコード
│   ├── inappropriate-content.md          # 不適切なコンテンツ
│   ├── hate-speech.md                    # ヘイトスピーチ
│   ├── political-bias.md                 # 政治的偏見
│   ├── medical-advice.md                 # 医療アドバイス
│   └── false-info.md                     # 虚偽情報
└── edge-cases/                           # エッジケース
    ├── metadata-only.md                  # メタデータのみ
    ├── corrupted-file.md                 # 破損ファイル
    ├── legitimate-security.md            # 正当なセキュリティ情報
    ├── unicode-special-chars.md          # Unicode特殊文字
    └── broken-links.md                   # 壊れたリンク
```

## 記事の種類

### 正常記事
- **weekly-ai-digest-20250721.md**: 全てのガードレールチェックをパスする記事

### 違反記事
- **weekly-ai-digest-20250721-guardrail-fail.md**: 複数の違反を含む記事
- **violations/*.md**: 特定の違反カテゴリに特化した記事

### エッジケース
- **edge-cases/*.md**: ファイル破損、特殊文字等の境界条件テスト

## 注意

- これらは **テスト用の記事モック** であり、実際のコンテンツではありません
- 違反パターンは検出テストのために意図的に作成されています
- **記事生成用リソースファイルは削除済み** - article_guardrail_review.mdは生成済み記事のみをレビューするため不要