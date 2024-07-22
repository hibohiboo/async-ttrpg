#!/bin/bash
BUILD_DIR=build
rimraf $BUILD_DIR
mkdir $BUILD_DIR
cp -r dist $BUILD_DIR
cp host.json $BUILD_DIR
cp local.settings.json $BUILD_DIR
# package.json から devDependencies を削除して、本番環境用の node_modules を作成 (@async-ttrpg/typescript-configなどmonorepoの機能で参照しているパッケージがエラーを引き起こすため)
jq 'del(.devDependencies)' package.json > temp.json && mv temp.json $BUILD_DIR/package.json

cd $BUILD_DIR && npm install --omit=dev \
   && func azure functionapp publish $APP_NAME --subscription $AZURE_SUBSCRIPTION_ID

