#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/common.bash

cd $BICEP_DIR && az deployment group create \
  --name functionsDeployment \
  --template-file main.bicep \
  --parameters main.bicepparam \
  --parameters \
    allowedOrigin=$WSA_ORIGIN \
    keyVaultName=$KEY_VAULT_NAME \
  -g $RESOURCE_GROUP_NAME


