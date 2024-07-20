#!/bin/bash

# 変数設定
LOCATION=japaneast

# ディレクトリパス取得
BIN_DIR=$(cd $(dirname $0) && pwd)
BICEP_DIR=$(cd $BIN_DIR/../biceps && pwd)

# 環境変数読み込み
source $BIN_DIR/.env
