#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/common.bash

# # ローカルでログイン中のユーザのIDを取得
PRINCIPAL_ID=$(az ad signed-in-user show --query id -o tsv)

# 組み込みロール
# https://learn.microsoft.com/ja-jp/azure/role-based-access-control/built-in-roles

# ストレージ BLOB データ共同作成者 のロールを割り当てる
cd $BICEP_DIR && az deployment group create \
  --name frontendDeployment \
  --template-file rbac.bicep \
  --parameters roleDefinitionID=ba92f5b4-2d11-453d-a403-e96b0029c9fe \
  principalId=$PRINCIPAL_ID \
  -g $RESOURCE_GROUP_NAME

# ストレージ キュー データ共同作成者 のロールを割り当てる
cd $BICEP_DIR && az deployment group create \
  --name frontendDeployment \
  --template-file rbac.bicep \
  --parameters roleDefinitionID=974c5e8b-45b9-4653-ba55-5f855dd0fb88 \
  principalId=$PRINCIPAL_ID \
  -g $RESOURCE_GROUP_NAME
