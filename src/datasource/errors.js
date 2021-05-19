const ConfigErrors = {
  RequiredParam: (paramName) => new Error(`DataSourceConfigError: ${paramName} is required, but none was configured`),
}

const GatewayClientErrors = {
  UnregistredQuery: (queryName) => new Error(`GatewayClientError: ${queryName} query is not registered`),
}

export default {
  ConfigErrors,
  GatewayClientErrors,
}
