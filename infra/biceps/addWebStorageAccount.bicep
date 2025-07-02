@description('デプロイ先のリージョン')
param location string = resourceGroup().location
@description('許可するIPアドレスのリスト')
param allowedIpAddresses array = []
@description('許可する仮想ネットワークサブネットのリスト')
param allowedSubnetIds array = []

var storageAccountName = 'st${uniqueString(resourceGroup().id)}'

// 現在のパブリックIPアドレスを取得する
resource getCurrentIpScript 'Microsoft.Resources/deploymentScripts@2023-08-01' = {
  name: 'getCurrentIpScript'
  location: location
  kind: 'AzurePowerShell'
  properties: {
    azPowerShellVersion: '13.0'
    scriptContent: '''
      $ip = Invoke-RestMethod -Uri 'https://api.ipify.org?format=json' | Select-Object -ExpandProperty ip
      $DeploymentScriptOutputs = @{}
      $DeploymentScriptOutputs['currentIp'] = $ip
    '''
    cleanupPreference: 'OnSuccess'
    retentionInterval: 'PT1H'
  }
}

// パラメータのIPアドレスをipRules形式に変換
var parameterIpRules = [for ipAddress in allowedIpAddresses: {
  value: ipAddress
  action: 'Allow'
}]

// 現在のIPアドレスのルール
var currentIpRule = {
  value: getCurrentIpScript.properties.outputs.currentIp
  action: 'Allow'
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2024-01-01' = {
  name: storageAccountName
  location: location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    publicNetworkAccess: 'Enabled'
    networkAcls: {
      defaultAction: 'Deny'
      bypass: 'AzureServices'
      virtualNetworkRules: [for subnetId in allowedSubnetIds: {
        id: subnetId
        action: 'Allow'
      }]
      // for式はデプロイ開始時に値が確定している必要があるので、動的に取得した値を使う場合はconcatで追加する
      ipRules: concat(parameterIpRules, [currentIpRule])
    }
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
