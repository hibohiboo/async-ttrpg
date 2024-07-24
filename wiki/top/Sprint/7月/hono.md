
[[_TOC_]]
## 気になる点
[zure Functions](https://hono.dev/docs/getting-started/azure-functions)で紹介されている[@marplex/hono-azurefunc-adapter](https://github.com/Marplex/hono-azurefunc-adapter)だと、azure functionsのcontextを捨てている。

```ts
export function azureHonoHandler(fetch: FetchCallback) {
  return async (request: HttpRequest, _context: InvocationContext) =>
    newAzureFunctionsResponse(
      await fetch(newRequestFromAzureFunctions(request), process.env)
    );
}
```

[Functionsのドキュメント - ログの記録](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-reference-node?tabs=javascript%2Cwindows%2Cazure-cli&pivots=nodejs-model-v4#logging)によると、`context.log`を使うと関数に紐づけられるので強くお勧めするとある。

Honoを使おうとすると、関数は１つに固定される。context.logで関連付ける必要はないのかもしれない。

```ts
app.http('httpTrigger', {
  methods: [
    //Add all your supported HTTP methods here
    'GET',
    'POST',
    'DELETE',
    'PUT',
  ],
  authLevel: 'anonymous',
  route: '{*proxy}',
  handler: azureHonoHandler(honoApp.fetch),
})
```

## RPC
[Current Status of Hono](https://yusukebe.com/posts/2023/current-status-of-hono/)を読むと、tRPCに似たクライアントとバックエンドで同じ型を使える機能がtRPCより手軽に使えるとある。

[公式](https://hono.dev/docs/guides/rpc)

[見よ、これがHonoのRPCだ](https://zenn.dev/yusukebe/articles/a00721f8b3b92e)を見ると、サーバーのrouteから型をexportして、clientで使う仕組みの模様。



## 読んだ
[HonoのNode.jsランタイムにマージされた神PRを見てみる](https://www.okb-shelf.work/entry/hono_god_pr)  
[今ホットなHonoを使ってNext.jsのRoute Handlersをハイジャックする](https://zenn.dev/chot/articles/e109287414eb8c)  
[Hono - Getting Started](https://hono.dev/docs/getting-started/basic)  
[Hono + Cloudflare Workers で REST API を作ってみよう](https://zenn.dev/azukiazusa/articles/hono-cloudflare-workers-rest-api#hello-world)  
[Current Status of Hono](https://yusukebe.com/posts/2023/current-status-of-hono/)
[見よ、これがHonoのRPCだ](https://zenn.dev/yusukebe/articles/a00721f8b3b92e)

## 書いた

[Hono RPC + Azure Functionsを試したら型エラーでハマったメモ](https://qiita.com/hibohiboo/items/cdc189fe93cf63ef353d)
