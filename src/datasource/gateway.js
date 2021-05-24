import {
  JailedStatus,
  StakingStatus,
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
      timeout: config.timeout,
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
        height,
        opts: {
          staking_status,
          blockchain,
          page,
          per_page,
        }
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
        opts: {
          staking_status,
          jailed_status,
          blockchain,
          page,
          per_page,
        }
      }
    }),
  }

  use(provider) {
    this.provider = provider;
    return this;
  }

  // looks ugly with the ifs
  // but the gateway constantly responds with 200
  // and responds with errors in response.data
  // in a non-consistent form.
  parseSuccessfulResponse = (response) => {

    if (typeof response.data === 'string' && response.data.indexOf('Method Not Allowed') > -1) {
      throw new Error('Method Not Allowed')
    }

    if (response.data.code && response.data.code !== 200) {
      throw response.data;
    }

    return response.data;
  }

  parseErrorResponse = (error) => {
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error;
    }

    if (typeof error === 'string') {
      throw new Error(error) 
    }

    throw error;

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

  /**
   * Http Gateway Queries
   */
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
   *  This concerns the calls that are aliased with names but used
   *  queries with specific params.
   * */
  aliasedQueries = [
    'getLatestBlock',
    'getLatestTransactions',
    'getTotalStakedApps',
    'getStakedSupply',
    'getGreenNodes',
  ];

  /**
   *
   * Query pre and post processors
   * */
  processors = {
    getTransaction: {
      processRequest: (...args) => args,
      processResponse: (response) => {
        const base64ToStr = (v) => Buffer.from(v, "base64").toString();
        const kvToStr = (kvObj) => ({
          key: base64ToStr(kvObj.key),
          value: base64ToStr(kvObj.value),
        });

        const mapEvents = (events) => events.map(
          (e) => ({ ...e, attributes: e.attributes.map(kvToStr) })
        )

        return {
          ...response,
          tx_result: {
            ...response.tx_result,
            events: mapEvents(response.tx_result.events),
          }
        }
      }


    }
  }

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

  /**
   * Execute an HTTP Gateway Query
   */
   async makeQuery(queryName, ...args) {
    let queryFn = null;

    if (this.aliasedQueries.includes(queryName)) {
      queryFn = this[queryName];
    }

    if (this.queries.includes(queryName)) {
      queryFn = this
          .controller
          .query[queryName];
    }


    if (!queryFn) {
      throw Errors.GatewayClientErrors.UnregistredQuery(queryName);
    }

    const queryHasProcessor = Object.keys(this.processors).includes(queryName)

    if (!queryHasProcessor) {
       return queryFn(...args);
    }

    const request = this.processors[queryName].processRequest(...args);
    const rawResponse = await queryFn(...request);
    const response = this.processors[queryName].processResponse(rawResponse);

    return response;
  }
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
