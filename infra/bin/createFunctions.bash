#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/common.bash

cd $BICEP_DIR && az deployment group create \
  --name functionsDeployment \
  --template-file main.bicep \
  --parameters main.bicepparam \
  --parameters \
    keyVaultName=$KEY_VAULT_NAME \
    staticSites_pl_static_web_app_name=$PL_STATIC_WEB_APP_NAME \
  -g $RESOURCE_GROUP_NAME


