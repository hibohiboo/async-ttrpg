param staticSites_pl_static_web_app_name string = 'pl-web-app'
param staticSitesLocation string = 'eastasia'
param staticSitesRepositoryUrl string

resource staticSites_my_first_static_web_app_name_resource 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticSites_pl_static_web_app_name
  location: staticSitesLocation
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: staticSitesRepositoryUrl
    branch: 'main'
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'DevOps'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

resource staticSites_my_first_static_web_app_name_default 'Microsoft.Web/staticSites/basicAuth@2023-01-01' = {
  parent: staticSites_my_first_static_web_app_name_resource
  name: 'default'
  properties: {
    applicableEnvironmentsMode: 'SpecifiedEnvironments'
  }
}
