using 'main.bicep'

param functionsRuntime = {
  runtime: 'node'
  linuxFxVersion: 'Node|20'
  kind: 'functionapp,linux'
  extensionVersion: '~4'
}
param allowedOrigin = readEnvironmentVariable('WSA_ORIGIN','')
param keyVaultName = readEnvironmentVariable('KEY_VAULT_NAME','')
param functionEnvironments = [
  {
    name: 'HOGE'
    value: 'hoge'
  }
]
