#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/common.bash

# 組み込みロール
# https://learn.microsoft.com/ja-jp/azure/role-based-access-control/built-in-roles

# Reader ( 閲覧者 ) のロールを割り当てる
cd $BICEP_DIR && az deployment group create \
  --name frontendDeployment \
  --template-file rbacToFunction.bicep \
  --parameters roleDefinitionID=acdd72a7-3385-48ef-bd42-f606fba81ae7 \
  functionAppName=$APP_NAME \
  -g $RESOURCE_GROUP_NAME

