param location string
param storageAccountName string
param principalId string
var storageAccountSku = 'Standard_LRS'

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  sku: { name: storageAccountSku }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: true
    minimumTlsVersion: 'TLS1_2'
    publicNetworkAccess: 'Enabled'
  }
}
resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccount
  name: 'default'
}
resource blobContainerForQueue 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: blobService
  name: 'character-container'
  properties: {
    publicAccess: 'None'
  }
}
resource queueServices 'Microsoft.Storage/storageAccounts/queueServices@2023-01-01' = {
  parent: storageAccount
  name: 'default'
}
resource storageQueueMain 'Microsoft.Storage/storageAccounts/queueServices/queues@2023-01-01' = {
  parent: queueServices
  name: 'character-queue'
}

// 組み込みロール: https://learn.microsoft.com/ja-jp/azure/role-based-access-control/built-in-roles
var roleDefinitionId= 'ba92f5b4-2d11-453d-a403-e96b0029c9fe' // ストレージ BLOB データ共同作成者
resource roleStorageAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: storageAccount
  name: guid(storageAccount.id, principalId, roleDefinitionId)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', roleDefinitionId)
    principalId: principalId
    principalType: 'ServicePrincipal'
  }
}
var roleDefinitionQueueId= '974c5e8b-45b9-4653-ba55-5f855dd0fb88' // ストレージ キュー データ共同作成者
resource roleQueueAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: storageAccount
  name: guid(storageAccount.id, principalId, roleDefinitionQueueId)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', roleDefinitionQueueId)
    principalId: principalId
    principalType: 'ServicePrincipal'
  }
}
