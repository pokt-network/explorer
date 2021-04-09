import { DataSource } from "./datasource";

const testConfig = {
  "gatewayUrl": "http://localhost:3000/v1/60676c9f7cbbfe002f0b9cbe",
  // "gatewayUrl": "https://mainnet.gateway.pokt.network/v1/60676c9f7cbbfe002f0b9cbe",
  "http": {
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Blockchain-Subdomain": "mainnet",
    }
  },
}

describe('DataSource', () => {
  const context = {
    datasource: null,
    args: {
      getAccount: [
        "04c56dfc51c3ec68d90a08a2efaa4b9d3db32b3b",
      ],
      getTransaction: [
        "E4A3EDE68171473996E68549C5CFC3C06B4865C35D194B8BDDA08908B4D394A6",
      ],
      getBlock: [22788],
      getLatestBlock: [],
      getLatestTransactions: [1, 1, 22788],
      getTotalStakedApps: [],
      getStakedSupply: [],
      getNodes: []
    }
  };

  beforeAll(
    () => {
      jest.setTimeout(100000);
    }
  )

  test('it instantiates properly', () => {
    expect(
      () => {
        context.datasource = new DataSource(testConfig);
      }
    ).not.toThrow();
  })

  describe('DataSource#getHeight', () => {
    test('responds with a number as height', async () => {
      const height = await context.datasource.getHeight();

      expect(height).toBeDefined();
    })

    test.todo('responds with undefined on error')
  })

  describe('DataSource#getAccount', () => {
    test('responds with an account object', async () => {
      const account = await context
        .datasource
        .getAccount(...context.args.getAccount);

      expect(account).toHaveProperty('id');
      expect(account).toHaveProperty('balance');
      expect(account).toHaveProperty('data');
    })

    test.todo('responds with undefined on error')
    test.todo('responds with null on non-existant account')
  })

  describe('DataSource#getTransaction', () => {
    test('responds with a transaction object', async () => {
      const tx = await context
        .datasource
        .getTransaction(...context.args.getTransaction);

      expect(tx).toHaveProperty('id');
      expect(tx).toHaveProperty('height');
      expect(tx).toHaveProperty('timestamp');
      expect(tx).toHaveProperty('data');
    })

    test.todo('responds with undefined on error')
  })

  describe('DataSource#getBlock', () => {
    test('responds with a block object', async () => {
      const block = await context
        .datasource
        .getBlock(...context.args.getBlock);

      expect(block).toHaveProperty('id');
      expect(block).toHaveProperty('number');
      expect(block).toHaveProperty('timestamp');
      expect(block).toHaveProperty('data');
    })

    test.todo('responds with undefined on error')
  })

  describe('DataSource#getLatestBlock', () => {
    test('responds with the latest block as object', async () => {
      const block = await context
        .datasource
        .getLatestBlock(...context.args.getLatestBlock);

      expect(block).toHaveProperty('id');
      expect(block).toHaveProperty('number');
      expect(block).toHaveProperty('timestamp');
      expect(block).toHaveProperty('data');
    })

    test.todo('responds with undefined on error')
  })

  describe('DataSource#getLatestTransactions', () => {
    test('responds with the latest transactions as array', async () => {
      const txs = await context
        .datasource
        .getLatestTransactions(...context.args.getLatestTransactions);

      expect(Array.isArray(txs)).toBe(true);

      expect(txs[0]).toHaveProperty('id');
      expect(txs[0]).toHaveProperty('height');
      expect(txs[0]).toHaveProperty('timestamp');
      expect(txs[0]).toHaveProperty('data');
    })

    test.todo('responds with empty array on error')
  })

  describe('DataSource#getTotalStakedApps', () => {
    test('responds with the total number of staked apps', async () => {
      const total = await context
        .datasource
        .getTotalStakedApps(...context.args.getTotalStakedApps);

      expect(total).toBeDefined();
    })

    test.todo('responds with 0 on error')
  })

  describe('DataSource#getStakedSupply', () => {
    test('responds with the total staked POKT', async () => {
      const total = await context
        .datasource
        .getStakedSupply(...context.args.getStakedSupply);

      expect(typeof total).toBe('string');
    })

    test.todo('responds with 0 on error')
  })

  describe('DataSource#getNodes', () => {
    test('responds with an account object', async () => {
      const total = await context
        .datasource
        .getNodes(...context.args.getNodes);

      expect(total).toBeDefined();
    })

    test.todo('responds with 0 on error')
  })
});
