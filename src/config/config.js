module.exports = {
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
