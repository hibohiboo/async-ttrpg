[[_TOC_]]
## 知っておくべき実践的な主流レポモデル より

- リポジトリはソースコードの保存場所
  - デプロイメントチェーン、モデルの分岐、依存関係の管理、レビュー、コミュニケーションプロセスではない
- 選択したリポジトリモデルは、開発プロセスに密接に統合されるように構成
- 集中型と分散型の大きな2方針がある
- Googleはmonorepo,Netflixはmulti-repoでそれぞれ効率的。唯一の魔法の回答はない


モデル|説明
--|--
single repository|単一リポジトリ。変更のたびにプロジェクト全体をコンパイルする必要があるということではない。
multi-repo|複数リポジトリ。ローカルに最適化される傾向がある。
repo-hybrid|リポジトリハイブリッド。混合使用
split-repo|分割リポジトリ。モノレポ モデルを好みながらも、テクノロジーによってデプロイメントを分離することを強く要求する組織によってよく選択される

## Google のモノレポの仕組みより

[Google のモノレポの仕組み](https://qeunit.com/blog/how-google-does-monorepo/)  


### モノレポの典型的な問題点

- リポジトリのダウンロードに時間がかかる
- ファイルを検索したり見つけたりするのに時間がかかり、イライラする
- コードの適切なモジュール化にあまり重点を置いていない
- 循環的になり得る依存関係の管理
- ビルドプロセスを調整することの難しさ 
- これらの他の要因によってテストサイクルはより複雑になる

### Googleリポジトリのブランチモデル
Google は、トランクベースの開発モデルを大規模に使用して成功を収めていることでも知られています。

![image.png](/.attachments/image-abf42b50-0659-4006-82fb-a306c2387164.png)

## npm workspacesとモノレポ探検記 より
[npm workspacesとモノレポ探検記](https://zenn.dev/suin/scraps/20896e54419069)

### ワークスペース (workspaces)

モノレポにおけるNPMで配布するパッケージ。通常、/packagesディレクトリにワークスペースごとのディレクトリを作る。

モノレポには複数のワークスペースが存在しうる。

### 巻き上げ
Nodeのモジュール解決で、自分のnode_modulesにモジュールが無いとき、親のnode_modules、その親のnode_modulesへとディレクトリをさかのぼってモジュールを探す仕組みがある。

たとえば、/a/b/c/index.jsでrequire("x")したとき、次の順でモジュールが見つかるまで探す。

/a/b/c/node_modules/x
/a/b/node_modules/x
/a/node_modules/x
/node_modules/x
この仕組みをモノレポでは活用することがある。

たとえば、packages/aとpackages/bどちらもjestを使いたいとき、それぞれにjestをインストールするのではなく、ルートパッケージにjestをひとつだけ入れておけばいい。

### パッケージマネージャをnpmに限定する

npmに限定するには、ルートパッケージのNPMスクリプトにonly-allowを追加します。

 "preinstall": "npx only-allow npm



## 読んだ記事
[Azure 関数 API を Node.js v3 から v4 プログラミング モデルに移行する](https://learn.microsoft.com/ja-jp/azure/developer/javascript/end-to-end/contoso-real-estate-serverless-api-migration)  
[モノレポのAzure Functions (Node Typescript) のtsconfigにpathsのエイリアス設定を行ったメモ](https://qiita.com/hibohiboo/items/9fa5257ba706e71512a4)  
[Google のモノレポの仕組み](https://qeunit.com/blog/how-google-does-monorepo/)  
[知っておくべき実践的な主流レポモデル](https://qeunit.com/blog/the-hands-on-mainstream-repo-models-you-need-to-know/)  
[npm workspacesとモノレポ探検記](https://zenn.dev/suin/scraps/20896e54419069)  
[npm workspace の使い方](https://qiita.com/frozenbonito/items/8230d4a3cb5ea1b32802)  
[今モノレポを使うなら](https://qiita.com/john-Q/items/ef7c433a5f441ff89ffb)  


