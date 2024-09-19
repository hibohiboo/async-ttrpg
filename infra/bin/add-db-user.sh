#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/.env

# サーバーの Active Directory 管理者として割り当てるための Microsoft Entra ユーザー を作成
az ad user create --display-name $DB_ACCESS_USER_NAME --password $DB_ACCESS_USER_PW --user-principal-name $DB_ACCESS_USER_MAIL

