#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/common.bash

cd $BICEP_DIR && az deployment group create \
  --name storageAccountForWebDeployment \
  --template-file addWebStorageAccount.bicep \
  -g $RESOURCE_GROUP_NAME


