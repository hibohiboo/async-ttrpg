#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/common.bash

cd $BICEP_DIR && az deployment group create \
  --name functionsDeployment \
  --template-file functions.bicep \
  -g $RESOURCE_GROUP_NAME


