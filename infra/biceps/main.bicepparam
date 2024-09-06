using 'main.bicep'

param functionsRuntime = {
  runtime: 'node'
  linuxFxVersion: 'Node|20'
  kind: 'functionapp,linux'
  extensionVersion: '~4'
}
param staticSites_pl_static_web_app_name = readEnvironmentVariable('PL_STATIC_WEB_APP_NAME','')
param keyVaultName = readEnvironmentVariable('KEY_VAULT_NAME','')
param functionEnvironments = [
  {
    name: 'HOGE'
    value: 'hoge'
  }
]
