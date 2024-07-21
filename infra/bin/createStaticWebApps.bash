#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/common.bash

cd $BICEP_DIR && az deployment group create \
  --name frontendDeployment \
  --template-file staticWebApp.bicep \
  --parameters staticSitesRepositoryUrl=$PL_APP_REPO \
  -g $RESOURCE_GROUP_NAME

