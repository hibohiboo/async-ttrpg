テストの大枠を定義してやろう('キャラクターのCRUD');
テストの準備をしてやろう(() => {
  const exec = require('child_process').exec;
  // Character テーブルのデータをすべて消してやろう
  exec(
    'docker exec -d mssql /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P MyPassword@123 -C -d test -Q "TRUNCATE TABLE atrpg.Character;"',
  );
});
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
