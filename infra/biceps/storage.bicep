param location string = resourceGroup().location
var storageAccountName = '${uniqueString(resourceGroup().id)}az'

module myStorageBlobContainerAndQueue 'core/storage/queue.bicep' = {
  name: 'myStorageBlobContainerAndQueue'
  params: {
    location: location
    storageAccountName: storageAccountName
  }
}
