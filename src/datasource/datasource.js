/* global BigInt */

import JSBI from 'jsbi'
import numeral from 'numeral'
import { StakingStatus, JailedStatus } from "@pokt-network/pocket-js"
import {
  Account,
  Transaction,
  Block
} from "../models"
import {
  OCAlert
} from '@opuscapita/react-alerts'
import {
  getGatewayClient
} from "./gateway";
import Errors from "./errors";

export class DataSource {
  constructor(config) {
    const gatewayUrl = config ? (config.gatewayUrl || "") : "";
    const httpConfig = config ? (config.http || {}) : {};
    
    if (gatewayUrl === "") {
      throw Errors.ConfigErrors.RequiredParam('gatewayUrl');
    }

    if (Object.keys(httpConfig).length === 0) {
      console.warn(
        Errors.ConfigErrors.RequiredParam('http')
      );
    }

    this.gwClient = getGatewayClient(gatewayUrl, httpConfig);
  }

  /**
   * @returns {BigInt}
   */
  async getHeight() {
    let hReponse;

    try {
      hReponse = await this.gwClient.getHeight();
    } catch (error) {
      OCAlert.alertError(error.message, {
        timeOut: 3000
      });
      return undefined
    }

    return hReponse.height
  }

  /**
   *
   * @param {string} id
   * @returns {Account}
   */
  async getAccount(id) {
    let accResponse;
    
    try {
      accResponse = await this.gwClient.getAccount(id)
      
      if (accResponse !== null) {
        return new Account(
          accResponse.address,
          (accResponse.balance / 1000000) + " POKT",
          accResponse,
        )
      }
    } catch (err) {
      return undefined;
    }

    return null;
  }

  /**
   *
   * @param {string} id
   */
  async getTransaction(id) {
    let txResponse;
    
    try {
      txResponse = await this.gwClient.getTransaction(id)
    } catch (error) {
      OCAlert.alertError(error.message, { timeOut: 3000 });
      return undefined
    }

    return new Transaction(
      txResponse.hash,
      txResponse.height,
      undefined,
      txResponse,
    )
  }

  /**
   *
   * @param {string} id
   * @returns {Block}
   */
  async getBlock(height) {
    let blockResponse;
    
    try {
      blockResponse = await this.gwClient.getBlock(height);
    } catch (error) {
      return undefined;
    }

    const block = blockResponse.block;
    const blockMeta = blockResponse.block_id;

    return new Block(
      blockMeta.hash,
      block.header.height.toString(),
      block.header.time,
      blockResponse,
    )
  }

  /**
   * 
   * @returns 
   */
  async getLatestBlock() {
    const { height } = await this.gwClient.getHeight();

    if (height === undefined) {
      return undefined
    }

    let blockResponse;
    try {
      blockResponse = await this.gwClient.getBlock(height);
    } catch (error) {
      OCAlert.alertError(error.message, { timeOut: 3000 });
      return undefined
    }

    const block = blockResponse.block
    const blockMeta = blockResponse.block_id

    return new Block(
      blockMeta.hash,
      block.header.height.toString(),
      block.header.time,
      blockResponse,
    )
  }

  /**
   *
   * @param {BigInt} height of the block to get the transactions from
   * @param {number} page
   * @param {number} perPage
   */
  async getLatestTransactions(page, perPage, height=0) {
    const txs = [];
    let bTxsResponse;

    try {
      bTxsResponse = await this.gwClient.getBlockTxs(
        Number(height),
        false,
        page,
        perPage
      );
    } catch (error) {
      OCAlert.alertError(error.message, { timeOut: 3000 });
      return [];
    }

    bTxsResponse.txs.forEach(element => {
      txs.push(
        new Transaction(
          element.hash,
          element.height,
          undefined,
          element,
        )
      )
    });

    return txs;
  }

  /**
   * 
   * @returns 
   */
  async getTotalStakedApps() {
    let firstPageAppsResponse;

    try {
      firstPageAppsResponse = await this.gwClient.getApps(StakingStatus.Staked, undefined, undefined, 1, 1);
    } catch (error) {
      OCAlert.alertError(error.message, {
        timeOut: 3000
      });
      return 0;
    }

    return firstPageAppsResponse.total_pages
  }

  /**
   * 
   * @returns 
   */
  async getStakedSupply() {
    let totalSupply;

    try {
      totalSupply = await this.gwClient.getSupply(0);
    } catch (error) {
      OCAlert.alertError(error.message, {
        timeOut: 3000
      });
      return 0;
    }
   
    const totalstaked = Number(totalSupply.app_staked) + Number(totalSupply.node_staked);
    const totalSupplyPOKT = totalstaked/1000000;
    
    return numeral(totalSupplyPOKT.toString()).format('(0.00 a)');
  }

  /**
   * 
   * @returns 
   */
  async getNodes() {
    let validatorsResponse;
    
    try {
      validatorsResponse = await this.gwClient.getNodes(StakingStatus.Staked, JailedStatus.Unjailed, undefined, undefined, 1, 1);
    } catch (error) {
      OCAlert.alertError(error.message, {
        timeOut: 3000
      });
      return 0;
    }
    
    return validatorsResponse.total_pages;
  }
}