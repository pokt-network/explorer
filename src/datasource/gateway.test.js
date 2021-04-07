import {
  getGatewayClient
} from "./gateway";

const testConfig = {
  // "gatewayUrl": "http://localhost:3000/v1/60676c9f7cbbfe002f0b9cbe",
  "gatewayUrl": "https://mainnet.gateway.pokt.network/v1/60676c9f7cbbfe002f0b9cbe",
  "http": {
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Blockchain-Subdomain": "mainnet",
    }
  },
}

describe("GatewayClient", () => {
  const context = {
    client: null,
  };

  beforeAll(
    () => {
      jest.setTimeout(100000);
    }
  )
  
  test('instantiates properly', () => {
    expect(
      () => {
        context.client = getGatewayClient(
          testConfig.gatewayUrl,
          testConfig.http
        );    
      }
    ).not.toThrow();

    expect(
      context
        .client
        .config
        .baseUrl
    )
      .toEqual(
        testConfig.gatewayUrl
      );

    expect(
      context
        .client
        .config
        .headers
    )
      .toEqual(
        testConfig
          .http
          .headers
      );
  });

  [
    {
      queryName: 'getHeight',
      responseProperties: {
        onSuccess: ['height'],
        onFailure: ['message'],
      },
      args: []
    },
    {
      queryName: 'getAccount',
      responseProperties: {
        onSuccess: [
          'address',
          'public_key',
          'coins',
        ],
        onFailure: [],
      },
      args: ["04c56dfc51c3ec68d90a08a2efaa4b9d3db32b3b"]
    },
    {
      queryName: 'getTransaction',
      responseProperties: {
        onSuccess: [
          'hash',
          'height',
          'index',
          'proof',
          'tx',
          'tx_result',
        ],
        onFailure: [],
      },
      args: ["E4A3EDE68171473996E68549C5CFC3C06B4865C35D194B8BDDA08908B4D394A6"]
    },
    {
      queryName: 'getBlock',
      responseProperties: {
        onSuccess: [
          "block",
          "block_id"
        ],
        onFailure: [],
      },
      args: [22788]
    },
    {
      queryName: 'getBlockTxs',
      responseProperties: {
        onSuccess: [
          'total_count',
          'txs'
        ],
        onFailure: [],
      },
      args: [22788, false, 1, 1] 
    },
    {
      queryName: 'getApps',
      responseProperties: {
        onSuccess: [
          'page',
          // this means that we are expecting
          // an object like this: { result: [ { address, chains, jailed, ..}] }
          ['result', 'address', 'chains', 'jailed', 'max_relays', 'public_key', 'staked_tokens', 'status', 'unstaking_time']
        ],
        onFailure: [],
      },
      args: [2, 22788, 0, 1, 1]
    },
    {
      queryName: 'getSupply',
      responseProperties: {
        onSuccess: [
          'app_staked',
          'dao',
          'total_unstaked',
          'node_staked',
          'total',
          'total_staked',
        ],
        onFailure: [],
      },
      args: [22788]
    },
    {
      queryName: 'getNodes',
      responseProperties: {
        onSuccess: [
          'page',
          ['result', 'address', 'chains', 'jailed', 'public_key', 'service_url', 'status', 'tokens', 'unstaking_time']
        ],
        onFailure: [],
      },
      args: [2, 2, 22788, "0001", 1, 1]
    },
  ]
  .filter(
    (queryAnnotation) => [
      'getHeight',
      'getAccount',
      'getTransaction',
      'getBlock',
      'getBlockTxs',
      'getApps',
      'getSupply',
      'getNodes',
    ].includes(queryAnnotation.queryName)
  )
  .forEach(
    ({ queryName, responseProperties, args }) => {
      describe(`GatewayClient.${queryName}`, () => {
        test('is functional', async () => {
          await expect(context.client[queryName](...args)).resolves.not.toThrow();
        })
    
        test('returns proper response format on success', async () => {
          const response = await context.client[queryName](...args);

          responseProperties.onSuccess.forEach(
            (prop) => {
              if (typeof prop === 'string') {
                expect(response).toHaveProperty(prop);
              } else if (Array.isArray(prop)) {

                const parentProp = prop.shift();
                const nestedProps = prop;

                expect(response)
                  .toHaveProperty(parentProp)
                
                nestedProps.forEach(
                  (nestedProp) => {
                    expect(response[parentProp][0]).toHaveProperty(nestedProp)
                  }
                )

              }
            }
          )
        })
    
        // test('returns proper response format on error', async () => {
        //   const response = await context.client[queryName]();
        //   responseProperties.onFailure.forEach(
        //     (prop) => {
        //       expect(response).toHaveProperty(prop);
        //     }
        //   )
        // })
      })
    }
  )
})
