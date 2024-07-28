

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


## 参考
[我が名は神龍……どんなテストもひとつだけ自動化してやろう](https://qiita.com/tsuemura/items/56ba9942565963858d8f)  
[QuickStart](https://codecept.io/quickstart/)  
[ja-JP.js](https://github.com/codeceptjs/CodeceptJS/blob/3.x/translations/ja-JP.js)
