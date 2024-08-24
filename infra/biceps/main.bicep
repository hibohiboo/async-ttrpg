param location string = resourceGroup().location
param allowedOrigin string
param databaseUrl string

var storageAccountName = '${uniqueString(resourceGroup().id)}azfunctions'

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
    databaseUrl: databaseUrl
    storageAccountName: storageAccountName
  }
}

output appServiceAppHostName string = myFunctions.outputs.appServiceAppHostName
