---
allowed-tools: Write, Read, LS
description: 新しいcustom slash commandを作成するためのコマンド
---

## Custom Slash Commandとは

Custom Slash Commandは、Claude Codeで使用できるカスタムコマンドです：

- **形式**: `/command-name`
- **場所**: `<Project Root>/.claude/commands/`
- **ファイル**: Markdownファイル（`.md`）で定義
- **機能**: 複雑なタスクを再利用可能なコマンドとして定義
- **引数**: `$ARGUMENTS` でコマンド実行時の引数を受け取り可能
- **制御**: YAMLフロントマターで使用可能ツールや説明を設定

新しいcustom slash command「$ARGUMENTS」を作成します。

以下の手順で進めてください：

1. **コマンド名の確認**: 引数で指定されたコマンド名が適切かチェック
   - 既存のコマンドと重複していないか `.claude/commands/` を確認
   - 命名規則に従っているか確認

2. **コマンドの詳細をユーザーに質問**:
   - コマンドの目的・機能
   - 使用する引数の形式（$ARGUMENTSの使い方）
   - 必要なツール（allowed-tools）
   - 実行手順の詳細

3. **YAMLフロントマターの作成**:
   ```yaml
   ---
   allowed-tools: [ユーザーが指定したツール]
   description: [コマンドの簡潔な説明]
   ---
   ```

4. **コマンド本文の作成**:
   - 引数の使い方（$ARGUMENTS）
   - 実行手順の詳細
   - エラーハンドリング
   - 完了時の処理

5. **ファイル作成**: `.claude/commands/$ARGUMENTS.md` にコマンドファイルを作成

6. **確認**: 作成したコマンドファイルの内容を確認し、ユーザーに説明

作成したコマンドは `/$ARGUMENTS` として利用可能になります。
