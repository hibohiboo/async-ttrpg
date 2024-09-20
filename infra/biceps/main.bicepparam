using 'main.bicep'

param functionsRuntime = {
  runtime: 'node'
  linuxFxVersion: 'Node|20'
  kind: 'functionapp,linux'
  extensionVersion: '~4'
}

// staticSites_pl_static_web_app_nameとkeyVaultNameは実行時のパラメータ指定で上書きされる実験
param staticSites_pl_static_web_app_name = ''
param keyVaultName = ''
param functionEnvironments = [
  {
    name: 'SQLSERVER_NAME'
    value: '${readEnvironmentVariable('DB_SERVER_NAME','')}.database.windows.net'
  }
  {
    name: 'SQLSERVER_DB_NAME'
    value: readEnvironmentVariable('SQLSERVER_DB_NAME','')
  }
]
