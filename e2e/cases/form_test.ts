Feature('キャラクターのCRUD');

Before(() => {
  const exec = require('child_process').exec;
  exec(
    'docker exec -d mssql /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P MyPassword@123 -C -d test -Q "TRUNCATE TABLE atrpg.Character;"',
  );
});

Scenario('キャラクターの追加', ({ I }) => {
  const 追加 = locate('a').withText('キャラクターを追加').as('追加');
  const Save = locate('button').withText('Save').as('Save');

  I.amOnPage('/');
  I.click(追加);
  I.fillField('CharacterName', 'ぱんてぃ');
  I.seeInField('CharacterName', 'ぱんてぃ');
  I.click(Save);
  I.waitForText('キャラクターを追加');
  I.see('ぱんてぃ');
});
