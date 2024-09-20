#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/.env


azureaduser=$(az ad user list --filter "userPrincipalName eq '$DB_ACCESS_USER_MAIL'" --query [].id --output tsv)

if [ -z "$azureaduser" ]; then
  echo "ユーザを作成します"
  # サーバーの Active Directory 管理者として割り当てるための Microsoft Entra ユーザー を作成
  az ad user create --display-name $DB_ACCESS_USER_NAME --password $DB_ACCESS_USER_PW --user-principal-name $DB_ACCESS_USER_MAIL
fi

# この Microsoft Entra ユーザーを Active Directory 管理者として追加
az sql server ad-admin create --resource-group $DB_RESOURCE_GROUP_NAME --server-name $DB_SERVER_NAME --display-name ADMIN --object-id $azureaduser

# この後、作成したユーザでデータベースに接続する。接続方法は「Microsoft Entra Pawword」User Nameは $DB_ACCESS_USER_MAIL Passwordは $DB_ACCESS_USER_PW を指定する。
# CREATE USER "functionsの名前" FROM EXTERNAL PROVIDER;
# ALTER ROLE db_datareader ADD MEMBER "functionsの名前";
# ALTER ROLE db_datawriter ADD MEMBER "functionsの名前";
# ユーザの場合は functionsの名前の代わりに、az ad signed-in-user show で確認できる userPrincipalName を指定
