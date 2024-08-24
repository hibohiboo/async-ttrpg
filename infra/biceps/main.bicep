param location string = resourceGroup().location
param allowedOrigin string
param keyVaultName string
@description('The runtime version of the Azure Functions app.')
param functionsRuntime object

var storageAccountName = '${uniqueString(resourceGroup().id)}azfunctions'
var applicationInsightsName = '${uniqueString(resourceGroup().id)}applicationinsights'
var logAnalyticsName = '${uniqueString(resourceGroup().id)}logAnalytics'


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
    allowedOrigin: allowedOrigin
    databaseUrl: keyVault.getSecret('AsyncTrpgDatabaseURL')
    storageAccountName: storageAccountName
    kind: functionsRuntime.kind
    linuxFxVersion: functionsRuntime.linuxFxVersion
    applicationInsightsInstrumentationKey: myFunctionsApplicationInsights.outputs.applicationInsightsInstrumentationKey
    extensionVersion: functionsRuntime.extensionVersion
    connectionString: keyVault.getSecret('AsyncTrpgConnectionString')
  }
}

output appServiceAppHostName string = myFunctions.outputs.appServiceAppHostName
