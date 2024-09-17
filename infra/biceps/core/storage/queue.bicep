param location string
param storageAccountName string
var storageAccountSku = 'Standard_LRS'

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: '${storageAccountName}storage'
  location: location
  sku: {
    name: storageAccountSku
  }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: false
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_0'
    publicNetworkAccess: 'Disabled'
  }
}
resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccount
  name: 'default'
}
resource blobContainerForQueue 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: blobService
  name: 'storage-container-with-queue'
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
  name: 'storage-queue-main'
}
