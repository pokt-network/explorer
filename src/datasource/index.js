import config from "../config/config";

import { DataSource } from "./datasource"

export const getDataSource = () => new DataSource({
  gatewayUrl: config.GATEWAY_BASE_URL,
  http: config.HTTP_CONFIG,
});
