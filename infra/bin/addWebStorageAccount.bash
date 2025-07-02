#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/common.bash

# for式はデプロイ開始時に値が確定している必要があるので、パラメータとして現在のIPアドレスを取得
# 現在のパブリックIPアドレスを取得
CURRENT_IP=$(curl -s https://api.ipify.org)
echo "Current IP Address: $CURRENT_IP"

cd $BICEP_DIR && az deployment group create \
  --name storageAccountForWebDeployment \
  --template-file addWebStorageAccount.bicep \
  --parameters allowedIpAddresses="[\"$CURRENT_IP\"]" \
  -g $RESOURCE_GROUP_NAME


