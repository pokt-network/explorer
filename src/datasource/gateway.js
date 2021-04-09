import {
  JailedStatus
} from "@pokt-network/pocket-js";
import Axios from "axios";
import Errors from "./errors";

/**
 * Http Adapter.
 * Configure your headers and what not in here.
 * Interceptors and Network Layer middlewares should come in here.
 */
class AxiosProvider {
  constructor(baseURL, config) {
    this.http = Axios.create({
      baseURL,
      timeout: config.timeout || 100000,
      headers: config.headers,
    });
  }
}

/**
 * Http Control Layer.
 * Throw your http control logic in here, i.e: if error, if data, if 201.
 */
class PocketQueriesController {
  provider = null;

  requests = {
    getHeight: {
      url: '/v1/query/height',
      method: "post",
      data: {},
    },
    getAccount: (id) => ({
      url: '/v1/query/account',
      method: "post",
      data: {
        address: id,
      },
    }),
    getTransaction: (id) => ({
      url: '/v1/query/tx',
      method: 'post',
      data: {
        hash: id,
      }
    }),
    getBlock: (height) => ({
      url: '/v1/query/block',
      method: 'post',
      data: {
        height,
      }
    }),
    getBlockTxs: (height, prove, page, per_page) => ({
      url: '/v1/query/blocktxs',
      method: 'post',
      data: {
        height,
        page,
        per_page,
        prove,
      }
    }),
    getApps: (staking_status, height, blockchain, page, per_page) => ({
      url: '/v1/query/apps',
      method: 'post',
      data: {
        staking_status,
        height,
        blockchain,
        page,
        per_page,
      }
    }),
    getSupply: (height) => ({
      url: '/v1/query/supply',
      method: 'post',
      data: {
        height,
      }
    }),
    getNodes: (staking_status, jailed_status, height, blockchain, page, per_page) => ({
      url: '/v1/query/nodes',
      method: 'post',
      data: {
        height,
        staking_status,
        jailed_status,
        blockchain,
        page,
        per_page,
      }
    }),
  }

  use(provider) {
    this.provider = provider;
    return this;
  }

  parseSuccessfulResponse = (response) => response.data;

  parseErrorResponse = (error) => {
    throw error.response.data;
  }

  perform = async (requestName, ...args) => {
    const reqConfig = typeof this.requests[requestName] === 'function' ?
      this.requests[requestName](...args) :
      this.requests[requestName];

    const response = await this
      .provider
      .http
      .request(reqConfig)
      .then(this.parseSuccessfulResponse)
      .catch(this.parseErrorResponse);

    return response;
  }

  // does not really need to be bound to `this`, but keeping it for semantics' sake.
  // arguments explicit forward for clear signature lookup, avoid using `...args` 
  _getHeight = this.perform.bind(this, 'getHeight');
  _getAccount = (id) => this.perform.call(this, 'getAccount', id);
  _getTransaction = (id) => this.perform.call(this, 'getTransaction', id);
  _getBlock = (height) => this.perform.call(this, 'getBlock', height);
  _getBlockTxs = (height, prove, page, per_page) => this.perform.call(this, 'getBlockTxs', height, prove, page, per_page);
  _getApps = (staking_status, height, blockchain, page, per_page) => this.perform.call(this, 'getApps', staking_status, height, blockchain, page, per_page);
  _getSupply = this.perform.bind(this, 'getSupply');
  _getNodes = (staking_status, jailed_status, height, blockchain, page, per_page) => this.perform.call(this, 'getNodes', staking_status, jailed_status, height, blockchain, page, per_page);

  // For semantic separation, and for "ease of middlewaring" when necessary.
  query = {
    getHeight: this._getHeight,
    getAccount: this._getAccount,
    getTransaction: this._getTransaction,
    getBlock: this._getBlock,
    getBlockTxs: this._getBlockTxs,
    getApps: this._getApps,
    getSupply: this._getSupply,
    getNodes: this._getNodes,
  }
}

/**
 * Exposes registered/allowed gateway queries.
 * This layer is added for gateway level logic control.
 */
class GatewayClient {
  constructor(httpProvider, requestsController, config) {
    this.controller = requestsController.use(httpProvider)
    this.config     = config;
  }

  queries = [
    'getHeight',
    'getAccount',
    'getTransaction',
    'getBlock',
    'getBlockTxs',
    'getApps',
    'getSupply',
    'getNodes',
  ]

  /**
   * @returns {BigInt}
   */
  async makeQuery(queryName, ...args) {
    if (!(this.queries.includes(queryName) > -1)) {
      throw Errors
    }
    return await this
      .controller
      .query[queryName](...args);
  }

  getHeight = this.makeQuery.bind(this, 'getHeight');
  getAccount = this.makeQuery.bind(this, 'getAccount');
  getTransaction = this.makeQuery.bind(this, 'getTransaction');
  getBlock = this.makeQuery.bind(this, 'getBlock');
  getBlockTxs = this.makeQuery.bind(this, 'getBlockTxs');
  getApps = this.makeQuery.bind(this, 'getApps');
  getSupply = this.makeQuery.bind(this, 'getSupply');
  getNodes = this.makeQuery.bind(this, 'getNodes');

  getLatestBlock = async () => {
    const height = await this.getHeight();
    const latestBlock = await this.getBlock(height);

    return latestBlock;
  }

  getLatestTransactions = (height, page, perPage) => this
    .getBlockTxs(
      height,
      false,
      1,
      undefined
    );

  getTotalStakedApps = () => this
    .getApps(
      StakingStatus.Staked,
      undefined,
      undefined,
      1,
      1
    );

  getStakedSupply = () => this.getSupply();
  
  getGreenNodes = () => this
    .getNodes(
      StakingStatus.Staked,
      JailedStatus.Unjailed,
      undefined,
      undefined,
      1,
      1
    );
}

const getGatewayClient = (baseUrl, config) => {
  const httpProvider = new AxiosProvider(baseUrl, config);
  const requestsCtrl = new PocketQueriesController();
  const gwClient = new GatewayClient(httpProvider, requestsCtrl, { baseUrl, ...config });

  return gwClient;
}

export {
  AxiosProvider,
  PocketQueriesController,
  GatewayClient,
  getGatewayClient,
}