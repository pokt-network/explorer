import {
  getGatewayClient
} from "./gateway";
import config from '../config/config';

const testConfig = {
  "gatewayUrl": config.NODE_ENV === 'test' ? config.GATEWAY_BASE_URL : "http://localhost:3000/v1/60676c9f7cbbfe002f0b9cbe",
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

  const variables = {
    height: 22788,
    address: "04c56dfc51c3ec68d90a08a2efaa4b9d3db32b3b",
    txHash: "E4A3EDE68171473996E68549C5CFC3C06B4865C35D194B8BDDA08908B4D394A6",
    page: 1,
    per_page: 1,
    prove: false,
    blockchain: "",
    stakingStatus: 2,
    jailingStatus: 2,
  }

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

  const testCases = [
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
      args: [variables.address]
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
      args: [variables.txHash]
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
      args: [variables.height]
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
      args: [variables.height, variables.prove, variables.page, variables.per_page] 
    },
    {
      queryName: 'getApps',
      responseProperties: {
        onSuccess: [
          'page',
          // this means that we are expecting
          // an object like this: { result: [ { address, chains, jailed, ..}] }
          ['result', 'address', 'chains', 'jailed', 'max_relays', 'public_key', 'staked_tokens', 'status', 'unstaking_time'],
          'total_pages',
        ],
        onFailure: [],
      },
      args: [variables.stakingStatus, variables.height, variables.blockchain, variables.page, variables.per_page]
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
      args: [variables.height]
    },
    {
      queryName: 'getNodes',
      responseProperties: {
        onSuccess: [
          'page',
          ['result', 'address', 'chains', 'jailed', 'public_key', 'service_url', 'status', 'tokens', 'unstaking_time'],
          'total_pages',
        ],
        onFailure: [],
      },
      args: [variables.stakingStatus, variables.jailingStatus, variables.height, variables.blockchain, variables.page, variables.per_page]
    },
  ]

  const whitelistedTestCases = [
    'getHeight',
    'getAccount',
    'getTransaction',
    'getBlock',
    'getBlockTxs',
    'getApps',
    'getSupply',
    'getNodes',
  ];

  const runWhitelistedOnly = (queryAnnotation) => whitelistedTestCases.includes(queryAnnotation.queryName)

  testCases
  .filter(runWhitelistedOnly)
  .forEach(
    ({ queryName, responseProperties, args }) => {

      describe(`GatewayClient.${queryName}`, () => {

        test('is functional', async () => {
          await expect(context.client.makeQuery(queryName, ...args)).resolves.not.toThrow();
        })

        test('returns proper response format on success', async () => {
          const response = await context.client.makeQuery(queryName, ...args);

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

        test.skip('returns proper response format on error', async () => {
          const response = await context.client.makeQuery(queryName);
          responseProperties.onFailure.forEach(
            (prop) => {
              expect(response).toHaveProperty(prop);
            }
          )
        })
      })
    }
  )
})
