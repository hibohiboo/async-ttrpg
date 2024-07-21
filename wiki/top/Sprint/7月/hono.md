
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





## 読んだ
[HonoのNode.jsランタイムにマージされた神PRを見てみる](https://www.okb-shelf.work/entry/hono_god_pr)  
[今ホットなHonoを使ってNext.jsのRoute Handlersをハイジャックする](https://zenn.dev/chot/articles/e109287414eb8c)  
[Hono - Getting Started](https://hono.dev/docs/getting-started/basic)  
