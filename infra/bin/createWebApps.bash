#!/bin/bash

source common.bash

cd $BICEP_DIR && az deployment group create \
  --name frontendDeployment \
  --template-file staticWebApp.bicep \
  --parameters staticSitesRepositoryUrl=$PL_APP_REPO \
  -g $RESOURCE_GROUP_NAME

