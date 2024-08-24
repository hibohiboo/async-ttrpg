param applicationInsightsName string
param location string

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: applicationInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Request_Source: 'rest'
  }
}
output applicationInsightsInstrumentationKey string = applicationInsights.properties.InstrumentationKey
