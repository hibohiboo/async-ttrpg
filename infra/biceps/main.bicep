param location string = resourceGroup().location
param keyVaultName string
@description('The runtime version of the Azure Functions app.')
param functionsRuntime object
param functionEnvironments array 
param staticSites_pl_static_web_app_name string

var storageAccountName = '${uniqueString(resourceGroup().id)}azfunctions'
var applicationInsightsName = '${uniqueString(resourceGroup().id)}applicationinsights'
var logAnalyticsName = '${uniqueString(resourceGroup().id)}logAnalytics'
var queueAndContainerStorageAccountName = '${uniqueString(resourceGroup().id)}azstorage'

resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' existing = {
  name: keyVaultName
}

module myFunctionsApplicationInsights 'core/host/applications.bicep' = {
  name: 'myFunctionsApplicationInsights'
  params: {
    location: location
    applicationInsightsName: applicationInsightsName
    logAnalyticsName: logAnalyticsName
  }
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
    staticSites_pl_static_web_app_name: staticSites_pl_static_web_app_name
    databaseUrl: keyVault.getSecret('AsyncTrpgDatabaseURL')
    storageAccountName: storageAccountName
    kind: functionsRuntime.kind
    runtime: functionsRuntime.runtime
    linuxFxVersion: functionsRuntime.linuxFxVersion
    applicationInsightsInstrumentationKey: myFunctionsApplicationInsights.outputs.applicationInsightsInstrumentationKey
    extensionVersion: functionsRuntime.extensionVersion
    connectionString: keyVault.getSecret('AsyncTrpgConnectionString')
    functionEnvironments: functionEnvironments
    queueAndContainerStorageAccountName:queueAndContainerStorageAccountName
  }
}

output appServiceAppHostName string = myFunctions.outputs.appServiceAppHostName

module myStorageBlobContainerAndQueue 'core/storage/blobContainerAndQueue.bicep' = {
  name: 'myStorageBlobContainerAndQueue'
  params: {
    location: location
    storageAccountName: queueAndContainerStorageAccountName
  }
}
// 組み込みロール: https://learn.microsoft.com/ja-jp/azure/role-based-access-control/built-in-roles
var storageRoleDefinitionId= 'ba92f5b4-2d11-453d-a403-e96b0029c9fe' // ストレージ BLOB データ共同作成者
var queueRoleDefinitionId= '974c5e8b-45b9-4653-ba55-5f855dd0fb88' // ストレージ キュー データ共同作成者
var principalId = myFunctions.outputs.principalId
module myStorageRole 'core/rbac/role.bicep' = {
  name: 'myStorageRole'
  params: {
    queueAndContainerStorageAccountName: queueAndContainerStorageAccountName
    principalId: principalId
    roleDefinitionId: storageRoleDefinitionId
  }
}
module myQueueRole 'core/rbac/role.bicep' = {
  name: 'myQueueRole'
  params: {
    queueAndContainerStorageAccountName: queueAndContainerStorageAccountName
    principalId: principalId
    roleDefinitionId: queueRoleDefinitionId
  }
}
