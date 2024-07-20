#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/common.bash

cd $BICEP_DIR && az deployment sub create \
  --name rgSubDeployment \
  --location $LOCATION \
  --template-file resourceGroup.bicep \
  --parameters resourceGroupName=$RESOURCE_GROUP_NAME resourceGroupLocation=$LOCATION
