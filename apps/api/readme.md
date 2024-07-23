
## ライブラリ

項目|ライブラリ|ライセンス|選定理由
--|--|--|--
型スキーマ|[zod](https://github.com/colinhacks/zod)|MIT|☆32k
SQLクライアント|[mssql](https://github.com/tediousjs/node-mssql)|MIT|公式サンプル
Webアプリフレームワーク|[Hono](https://github.com/honojs/hono)|MIT|速い, 軽い, Web標準.RPCのために導入
日付ライブラリ|[date-fns](https://github.com/date-fns/date-fns)|MIT|dayjsに比べてDate型をそのまま利用できる
エイリアスの設定|[tsc-alias](https://github.com/justkey007/tsc-alias)|MIT|相対パスによる分かりにくさを解消するため
ディレクトリ削除|[rimraf](https://github.com/isaacs/rimraf)|ISC|Windows Linuxの環境差異をなくすため
環境変数|[dotenv-cli](https://github.com/entropitor/dotenv-cli)|MIT|npm script内で環境変数を読み込むため

## host.json
https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-host-json


JsonPath|設定値|説明|参考
--|--|--|--
extension.http.routePrefix|空文字|関数ルートのapiを削除|[*](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cfunctionsv2&pivots=programming-language-typescript#customize-the-http-endpoint)

