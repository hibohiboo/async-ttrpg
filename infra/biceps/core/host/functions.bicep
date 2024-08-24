param storageAccountName string
param location string
param allowedOrigin string
param kind string
param linuxFxVersion string
param extensionVersion string
param applicationInsightsInstrumentationKey string
@secure()
param databaseUrl string
@secure()
param connectionString string

var functionAppName = '${uniqueString(resourceGroup().id)}azfunctionsapp'

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' existing = {
  name: storageAccountName
}

resource functionApp 'Microsoft.Web/sites@2022-09-01' = {
  name: functionAppName
  location: location
  kind: kind
  properties: {
    reserved: true
    siteConfig: {
      cors: {
        allowedOrigins: [allowedOrigin]
      }
      linuxFxVersion: linuxFxVersion
      appSettings: [
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccountName};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'WEBSITE_CONTENTAZUREFILECONNECTIONSTRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccountName};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'WEBSITE_CONTENTSHARE'
          value: toLower(functionAppName)
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: extensionVersion
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'node'
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: applicationInsightsInstrumentationKey
        }
        {
          name: 'DATABASE_URL'
          value: databaseUrl
        }
        {
          name:'CONNECTION_STRING'
          value: connectionString
        }
      ]
    }
  }
}

output appServiceAppHostName string = functionApp.properties.defaultHostName
