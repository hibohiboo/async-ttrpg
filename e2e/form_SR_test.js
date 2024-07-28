テストの大枠を定義してやろう('キャラクターのCRUD');

テストケースを定義してやろう('キャラクターの追加',  ({I}) => {
  const 我が名は神龍 = I;
  const 追加 = locate('a').withText('キャラクターを追加').as('追加')
  const Save = locate('button').withText('Save').as('Save')

  我が名は神龍.URLにアクセスしてやろう('/')
  我が名は神龍.クリックしてやろう(追加)
  我が名は神龍.フィールドに入力してやろう('CharacterName', 'ぱんてぃ')
  我が名は神龍.入力フィールドに文字が入っているか確認してやろう('CharacterName', 'ぱんてぃ')
  我が名は神龍.クリックしてやろう(Save)
  我が名は神龍.テキストが表示されるまで待ってやろう('キャラクターを追加')
  我が名は神龍.テキストがあるか確認してやろう('ぱんてぃ')
});
