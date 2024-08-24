param location string = resourceGroup().location
param allowedOrigin string
param keyVaultName string
// テスト用にシークレットにパラメータファイルを使う方法と、keyVault.getSecret()を使う方法の両方を示す
@secure()
param sqlServerConnectionString string
@description('The runtime version of the Azure Functions app.')
param functionsRuntime object

var storageAccountName = '${uniqueString(resourceGroup().id)}azfunctions'

resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' existing = {
  name: keyVaultName
}

module myFunctionsStorage 'core/storage/storage-account.bicep' = {
  name: 'myFunctionsStorage'
  params: {
    location: location
    storageAccountName: storageAccountName
  }
}

module myFunctions 'core/host/functions.bicep' = {
  name: 'myFunctions'
  params: {
    location: location
    allowedOrigin: allowedOrigin
    databaseUrl: keyVault.getSecret('AsyncTrpgDatabaseURL')
    storageAccountName: storageAccountName
    kind: functionsRuntime.kind
    linuxFxVersion: functionsRuntime.linuxFxVersion
    extensionVersion: functionsRuntime.extensionVersion
    connectionString: sqlServerConnectionString
  }
}

output appServiceAppHostName string = myFunctions.outputs.appServiceAppHostName
