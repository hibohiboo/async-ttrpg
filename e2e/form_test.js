Feature('作成のテスト');

Scenario('test something',  ({I}) => {
  const 追加 = locate('a').withText('キャラクターを追加').as('追加')
  const Save = locate('button').withText('Save').as('Save')

  I.amOnPage('/')
  I.click(追加)
  I.fillField('CharacterName', 'ぱんてぃ')
  I.seeInField('CharacterName', 'ぱんてぃ')
  I.click(Save)
  I.waitForText('キャラクターを追加')
  I.see('ぱんてぃ')
});
