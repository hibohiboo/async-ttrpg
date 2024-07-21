## 最初にやること

```
npm install
```

## このリポジトリは？
最近気になった技術をまとめて試したい
- [x] monorepo
- [z] bulletproof-react
- [ ] zustand
- [x] hono
- [ ] react-form

題材として、非同期TRPGを作りたい。
非同期TRPGについては[Wiki](./wiki/top/非同期TRPGとは.md)に記載。


## フロントエンドアーキテクチャ
Reactのベストプラクティスである[bulletproof-react](https://github.com/alan2207/bulletproof-react)をベースに開発する。

## monorepo
プロジェクトはmonorepoで管理する

項目|ライブラリ|バージョン|ライセンス|選定理由
--|--|--|--|--
パッケージマネージャ|[npm](https://github.com/npm/cli)|10.8.2|Artistic License 2.0|Nodeインストール時にインストールされ余分なインストールが不要のため
モノレポビルドシステム|[Turborepo](https://github.com/vercel/turbo)|2.0.9|MIT|後発でシンプル。



```
- readme.md               ... 本ファイル
- apps/pl-app             ... プレイヤー用のフロントエンド
- apps/gm-app             ... ゲームマスター用のフロントエンド
- apps/api                ... フロントエンド共通のバックエンド
- packages/tsconfig       ... TypeScript設定
- packages/eslint-config  ... Lint設定
- .vscode/tasks.json      ... VSCode拡張のFunctionsのデプロイ設定
- .vscode/extensions.json ... 本プロジェクトで利用しているVSCode拡張
- .vscode/settings.json   ... LintなどEditor設定
+ wiki                    ... 作業中のメモなど
+ document                ... 本プロジェクトに関する資料
+ .husky                  ... huskyによるGit Hooks
+ infra                   ... IaC
```

## npmスクリプト

スクリプト|説明
--|--
prepare|npm install 時に実行。git hooksのディレクトリを変更

## githooks

項目|ライブラリ|バージョン|ライセンス|選定理由
--|--|--|--|--
ネイティブ Git フック|[husky](https://github.com/typicode/husky)|9.1.1|MIT|高速で利用例が多い

## commit message 
### Issue番号
huskyとブランチ名ルールにより自動付与。

id/{issue番号}/hoge のルールで#{issue番号} がコミットメッセージ末尾に付与される

### prefix
コミット時には下記ルールにのっとり頭にprefixを付ける

prefix|説明
--|--
feat|新しい機能
fix|バグの修正
docs|ドキュメントのみの変更
style|空白、フォーマット、セミコロン追加など
refactor|仕様に影響がないコード改善(リファクタ)
perf|パフォーマンス向上関連
test|テスト関連
chore| ビルド、補助ツール、ライブラリ関連

## インフラ

ツール|バージョン
--|--
az bicep|0.29.45

スクリプト|説明
--|--
createResourceGropu.bash|リソースグループの作成
createFunctions.bash|Azure Functionsの作成
createWebApps.bash|Azure Static Web Apps

の作成
