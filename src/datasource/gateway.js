import Axios from "axios";

class AxiosProvider {
  constructor(baseURL, config) {
    this.http = Axios.create({
      baseURL,
      timeout: config.timeout || 100000,
      headers: config.headers,
    });
  }
}

class PocketNetworkCtrl {
  provider = null;

  requests = {
    getHeight: {
      url: '/v1/query/height',
      method: "post",
      data: {},
    }
  }

  use(provider) {
    this.provider = provider;
    return this;
  }

  parseSuccessfulResponse = (response) => response.data;

  parseErrorResponse = (error) => {
    throw error.response.data;
  }

  perform = async (requestName) => {
    const config = this.requests[requestName];

    const response = await this
      .provider
      .http
      .request(config)
      .then(this.parseSuccessfulResponse)
      .catch(this.parseErrorResponse);

    return response;
  }

  getHeight = this.perform.bind(this, 'getHeight');

  query = {
    getHeight: this.getHeight,
  }
}

class GatewayClient {
  constructor(httpProvider, requestsController) {
    this.controller = requestsController.use(httpProvider)
  }

  /**
   * @returns {BigInt}
   */
  async getHeight() {
    const heightResponse = await this
      .controller
      .query
      .getHeight();

    return heightResponse;
  }
}

const getGatewayClient = (baseUrl, config) => {
  const httpProvider = new AxiosProvider(baseUrl, config);
  const requestsCtrl = new PocketNetworkCtrl();
  const gwClient = new GatewayClient(httpProvider, requestsCtrl);

  return gwClient;
}

export {
  AxiosProvider,
  PocketNetworkCtrl,
  GatewayClient,
  getGatewayClient,
}
