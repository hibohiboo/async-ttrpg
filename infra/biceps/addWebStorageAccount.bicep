@description('デプロイ先のリージョン')
param location string = resourceGroup().location

var storageAccountName = 'st${uniqueString(resourceGroup().id)}'

resource storageAccount 'Microsoft.Storage/storageAccounts@2024-01-01' = {
  name: storageAccountName
  location: location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    publicNetworkAccess: 'Enabled'
  }
}

resource staticWebsite 'Microsoft.Storage/storageAccounts/blobServices/containers@2024-01-01' = {
  name: '${storageAccount.name}/default/$web'
  properties: {
    publicAccess: 'None'
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2024-01-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    deleteRetentionPolicy: { enabled: false }
  }
}


resource customScript 'Microsoft.Resources/deploymentScripts@2023-08-01' = {
  name: 'enableStaticWebsiteScript'
  location: location
  kind: 'AzurePowerShell'
  properties: {
    azPowerShellVersion: '13.0'
    environmentVariables: [
      {
        name: 'storageAccountKey'
        value: storageAccount.listKeys().keys[0].value
      }
    ]
    arguments: '-storageAccountName ${storageAccount.name}'
    scriptContent: '''
      param(
        [string] $storageAccountName
      )

      $context = New-AzStorageContext -StorageAccountName $storageAccountName -StorageAccountKey $env:storageAccountKey
      Enable-AzStorageStaticWebsite -Context $context -IndexDocument "index.html" -ErrorDocument404Path "404.html"
    '''
    cleanupPreference: 'OnSuccess'
    retentionInterval: 'PT1H'
  }
}

output staticWebsiteUrl string = 'https://${storageAccount.name}.z11.web.${environment().suffixes.storage}/'
