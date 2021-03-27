import Axios from "axios";

class AxiosProvider {
     constructor(baseUrl) {
          this.caller = Axios.create({
               baseURL,
               timeout: 20000,
          });
     }
}

class PocketNetworkCtrl {
     provider = null;

     queries = {
               getHeight: {
                    url: '/v1/query/height',
                    method: "POST",
               }
          },

          query = {
               getHeight: this.getHeight;
          }

     use(provider) {
          this.provider = provider;
          return this;
     }

     getHeight = () => this
          .provider
          .request(
               this.queries.getHeight,
          )
}

class GatewayClient {
     constructor(httpProvider, requestsController) {
          this.http = httpProvider;
          this.controller = requestsController;
     }

     /**
      * @returns {BigInt}
      */
     async getHeight() {
          const heightResponseOrError = await this
               .controller
               .use(this.provider)
               .query
               .getHeight();

          return heightResponseOrError.data;
     }
}

const getGatewayClient = (baseUrl) => {
     const httpProvider = new AxiosProvider(baseUrl);
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