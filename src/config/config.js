const validators = {
  GATEWAY_BASE_URL: (value) => {
    const isEmpty = value === "";

    if (isEmpty) {
      throw new Error("Required configuration environment variable GATEWAY_BASE_URL, received none");
    }

    const isLocalhostUrl = value.includes("localhost");

    if (isLocalhostUrl) {
      return value;
    }

    const isOfficialDomainUrl = value.includes("gateway.pokt.network");
    const hasChainIdSubdomain = !value.includes("http://gateway.pokt") && !value.includes("https://gateway.pokt");

    if (isOfficialDomainUrl && !hasChainIdSubdomain) {
      console.warn("Expecting configuration environment variable GATEWAY_BASE_URL to respect the following format: `https://{CHAIN_ID}.{GATEWAY_DOMAIN}`, but received invalid URL");
      console.warn("Constructing proper URL...");

      const gatewayDomainUrl = value.split("://")[1];
      const constructedGatewayUrl = `https://${process.env.CHAIN_ID}.${gatewayDomainUrl}`;

      return constructedGatewayUrl;
    }

    return value;
  },
  CHAIN_ID: (value) => {
    const isEmpty = value === "";

    if (isEmpty) {
      throw new Error("Required configuration environment variable CHAIN_ID, received none");
    }

    return value;
  }
}

const loadConfigFromEnv = () => {

  const configObj =  {
    "GATEWAY_BASE_URL": process.env.GATEWAY_BASE_URL || "http://localhost:3000/v1/60676c9f7cbbfe002f0b9cbe",
    "HTTP_CONFIG": {
      "timeout": process.env.HTTP_TIMEOUT || 0,
      "headers": JSON.parse(process.env.HTTP_HEADERS || '{"Content-Type": "application/json", "Blockchain-Subdomain": "mainnet"}')
    },
    "CHAIN_ID": process.env.CHAIN_ID || "mainnet",
    "WALLET_BASE_URL": process.env.WALLET_BASE_URL,
    "DASHBOARD_BASE_URL": process.env.DASHBOARD_BASE_URL,
    "NODE_ENV": process.env.NODE_ENV
  }

  // order of values matters!
  const validatedEnvVars = ['CHAIN_ID', 'GATEWAY_BASE_URL']

  validatedEnvVars.forEach(
    (envVarKey) => {
      const v = validators[envVarKey](configObj[envVarKey]); // as long as it does not through we are good
      configObj[envVarKey] = v;
    }
  );

  return configObj;
}

const config = loadConfigFromEnv();

export default config;

