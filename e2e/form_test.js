テストの大枠を定義してやろう('Yahoo!きっず')

テストケースを定義してやろう('検索のテスト', async ({I}) => {
  const 我が名は神龍 = I;
  const さがす = locate('button').withText('さがす').as('さがす')

  我が名は神龍.URLにアクセスしてやろう('/')
  我が名は神龍.フィールドに入力してやろう('気になることを調べよう', 'ねこ')
  我が名は神龍.クリックしてやろう(さがす)
  我が名は神龍.テキストがあるか確認してやろう('ネコ - Wikipedia')
  我が名は神龍.入力フィールドに文字を追加してやろう('気になることを調べよう', '　買い方')
  我が名は神龍.クリックしてやろう(さがす)
  我が名は神龍.テキストがあるか確認してやろう('さがしているのは')
  我が名は神龍.クリックしてやろう('猫の飼い方')
  我が名は神龍.入力フィールドに文字が入っているか確認してやろう('気になることを調べよう', '猫の飼い方')
  我が名は神龍.フィールドに入力してやろう('気になることを調べよう', '不倫')
  我が名は神龍.クリックしてやろう(さがす)
  我が名は神龍.テキストがあるか確認してやろう('このページは表示できません。')
})