

## 『我が名は神龍……どんなテストもひとつだけ自動化してやろう』
じゃ、じゃあCRUDのブラウザテストの自動化をお願いします。

* Chromeで対象ページにアクセスして
* 「キャラクターを追加」ボタンをクリックして
* 「ぱんてぃ」と入力して
* 「Save」ボタンをクリックして
* 一覧に「ぱんてぃ」が追加されていることを確認

## 『よかろう……たやすい願いだ』
### まずはライブラリのインストールと初期設定をしてやろう……

```
mkdir e2e
cd e2e
npx create-codeceptjs .
```

## さあ　おまちかねのテストコードだ

## 『願いはかなった　さらばだ』
まってください！！ブラウザが開かずテスト結果だけ出てきても本当にテストされたのかわからないです！
結果が見えるようにしてもらえませんか！？！？！？？！？！？？！？！？

## 『いいだろう　たやすい願いだ』
### PlayWright実行中にブラウザが開くようにしてやろう
起動オプションを `show: true` にするだけで良い

## 『願いはかなった　さらばだ』
待って下さい！！！！！！！！
クライアントに提出するスクリーンショットが必要なんです！！お願いします！！！！！！！！！！！！！
## 『いいだろう　たやすい願いだ』
### スクリーンショットが自動で撮影されるようにしてやろう
```diff
import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: 'form_SR_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost:5173',
      show: true,
    },
  },
  translation: './ja-SR.js',
+  plugins: {
+    stepByStepReport: {
+      enabled: true,
+      deleteSuccessful: false,
+    },
+  },
  include: {
    I: './steps_file',
  },
  name: 'e2e',
};
```

## 『願いはかなった　さらばだ』

## 参考
[我が名は神龍……どんなテストもひとつだけ自動化してやろう](https://qiita.com/tsuemura/items/56ba9942565963858d8f)  
[QuickStart](https://codecept.io/quickstart/)  
[ja-JP.js](https://github.com/codeceptjs/CodeceptJS/blob/3.x/translations/ja-JP.js)
[translation](https://codecept.io/translation/#how-it-works)
