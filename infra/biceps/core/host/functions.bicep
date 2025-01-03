param storageAccountName string
param location string
param runtime string
param kind string
param linuxFxVersion string
param extensionVersion string
param applicationInsightsName string
@secure()
param databaseUrl string
param functionEnvironments array 
param staticSites_pl_static_web_app_name string
param queueAndContainerStorageAccountName string

var functionAppName = '${uniqueString(resourceGroup().id)}azfunctionsapp'
resource appInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}
var environments = [
  {
    name: 'DATABASE_URL'
    value: databaseUrl
  }
  {
    name: 'BLOB_QUEUE_STORAGE_ACCOUNT__accountName'
    value: queueAndContainerStorageAccountName
  }
  {
    name: 'BLOB_QUEUE_STORAGE_ACCOUNT__queueServiceUri'
    value: 'https://${queueAndContainerStorageAccountName}.queue.core.windows.net'
  }
  ...functionEnvironments
]
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' existing = {
  name: storageAccountName
}
resource staticSites_my_first_static_web_app_name_resource 'Microsoft.Web/staticSites@2023-01-01' existing = {
  name: staticSites_pl_static_web_app_name
}

resource functionApp 'Microsoft.Web/sites@2022-09-01' = {
  name: functionAppName
  location: location
  kind: kind
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    reserved: true
    siteConfig: {
      cors: {
        allowedOrigins: [staticSites_my_first_static_web_app_name_resource.properties.defaultHostname]
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
          value: runtime
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
        ...environments
      ]
    }
  }
}

output appServiceAppHostName string = functionApp.properties.defaultHostName
output principalId string = functionApp.identity.principalId
