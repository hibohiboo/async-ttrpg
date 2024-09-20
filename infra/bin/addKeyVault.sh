#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
source $BIN_DIR/common.bash

keyVaultName=$KEY_VAULT_NAME
keyVaultSecretName=$KEY_VAULT_SECRET_NAME
subscriptions=$(az account show | jq -r '.id')
userObjectId=$(az ad signed-in-user show | jq -r '.id')

if az keyvault list --query "[?contains(name, '$keyVaultName')].name" -o tsv | grep -q "$keyVaultName"; then
  echo "Key Vault '$keyVaultName' が既に存在します。キー コンテナーのリソース ID を表示します。"
  az keyvault show --name $keyVaultName --query id --output tsv
  exit 0
fi

az keyvault create --name $keyVaultName --location $LOCATION --enabled-for-template-deployment true --resource-group $RESOURCE_GROUP_NAME

# Key Vaultが作成されるまで待機
echo "Waiting for Key Vault to be available..."
while true; do
  kv=$(az keyvault show --name $keyVaultName --resource-group $RESOURCE_GROUP_NAME --query "properties.provisioningState" -o tsv)
  if [ "$kv" == "Succeeded" ]; then
    echo "Key Vault is available."
    break
  fi
  echo "Key Vault is not yet available. Waiting..."
  sleep 5
done

az role assignment create --role "Key Vault Secrets Officer" --assignee $userObjectId --scope /subscriptions/$subscriptions/resourceGroups/$RESOURCE_GROUP_NAME/providers/Microsoft.KeyVault/vaults/$keyVaultName
az keyvault secret set --vault-name $keyVaultName --name $keyVaultSecretName --value $DATABASE_URL --output none
