/* global BigInt */

import JSBI from 'jsbi'
import numeral from 'numeral'
import {
  Pocket,
  typeGuard,
  RpcError,
  StakingStatus,
  JailedStatus
} from "@pokt-network/pocket-js/dist/web.js"
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

    let heightResponseOrError;

    try {
      heightResponseOrError = await this.gwClient.getHeight();
    } catch (err) {
      OCAlert.alertError(heightResponseOrError.message, {
        timeOut: 3000
      });
      return undefined
    }

    return heightResponseOrError.height
  }

  /**
   *
   * @param {string} id
   * @returns {Account}
   */
  async getAccount(id) {
    const accountOrError = await this.gwClient.getAccount(id)

    if (typeGuard(accountOrError, RpcError)) {
      return undefined
    } else {
      return new Account(accountOrError.address, (accountOrError.balance / 1000000) + " POKT", accountOrError.toJSON())
    }
  }

  /**
   *
   * @param {string} id
   */
  async getTransaction(id) {
    const provider = await getRPCProvider();
    const txResponseOrError = await this.__pocket.rpc(provider).query.getTX(id)
    if (typeGuard(txResponseOrError, RpcError)) {
      //OCAlert.alertError(txResponseOrError.message, { timeOut: 3000 });
      return undefined
    } else {
      const pocketTx = txResponseOrError.transaction
      return new Transaction(
        pocketTx.hash,
        pocketTx.height,
        undefined,
        pocketTx.toJSON()
      )
    }
  }

  /**
   *
   * @param {string} id
   * @returns {Block}
   */
  async getBlock(height) {
    const provider = await getRPCProvider();
    const blockResponseOrError = await this.__pocket.rpc(provider).query.getBlock(BigInt(height))
    if (typeGuard(blockResponseOrError, RpcError)) {
      return undefined
    } else {
      const block = blockResponseOrError.block
      const blockMeta = blockResponseOrError.blockMeta
      return new Block(
        blockMeta.blockID.hash,
        block.header.height.toString(),
        block.header.time,
        blockResponseOrError.toJSON()
      )
    }
  }

  async getLatestBlock() {
    const height = await this.getHeight()
    if (height === undefined) {
      return undefined
    }

    const provider = await getRPCProvider();
    const blockResponseOrError = await this.__pocket.rpc(provider).query.getBlock(height)
    if (typeGuard(blockResponseOrError, RpcError)) {
      //OCAlert.alertError(blockResponseOrError.message, { timeOut: 3000 });
      return undefined
    } else {
      const block = blockResponseOrError.block
      const blockMeta = blockResponseOrError.blockMeta
      return new Block(
        blockMeta.blockID.hash,
        block.header.height.toString(),
        block.header.time,
        blockResponseOrError.toJSON()
      )
    }

  }

  /**
   *
   * @param {BigInt} height of the block to get the transactions from
   * @param {number} page
   * @param {number} perPage
   */
  async getLatestTransactions(page, perPage, height) {
    const provider = await getRPCProvider();
    const result = []

    const blockTxsResponseOrError = await this.__pocket.rpc(provider).query.getBlockTxs(
      height,
      false,
      page,
      perPage
    )
    if (typeGuard(blockTxsResponseOrError, RpcError)) {
      return []
    }
    blockTxsResponseOrError.resultTx.forEach(element => {
      result.push(
        new Transaction(
          element.hash,
          element.height,
          undefined,
          element.toJSON()
        )
      )
    })
    return result
  }

  async getTotalStakedApps() {
    const provider = await getRPCProvider();
    const firstPageAppsResponseOrError = await this.__pocket.rpc(provider).query.getApps(StakingStatus.Staked, undefined, undefined, 1, 1)
    if (typeGuard(firstPageAppsResponseOrError, RpcError)) {
      OCAlert.alertError(firstPageAppsResponseOrError.message, {
        timeOut: 3000
      });
      return 0
    } else {
      return firstPageAppsResponseOrError.totalPages
    }
  }

  async getStakedSupply() {
    const provider = await getRPCProvider();
    const totalSupplyOrError = await this.__pocket.rpc(provider).query.getSupply()
    if (typeGuard(totalSupplyOrError, RpcError)) {
      OCAlert.alertError(totalSupplyOrError.message, {
        timeOut: 3000
      });
      return 0
    } else {
      const totalSupply = totalSupplyOrError

      const totalstaked = JSBI.add(totalSupply.appStaked, totalSupply.nodeStaked)
      const totalSupplyPOKT = JSBI.divide(totalstaked, new BigInt(1000000))
      return numeral(totalSupplyPOKT.toString()).format('(0.00 a)');
    }
  }

  async getNodes() {
    const provider = await getRPCProvider();
    const validatorsResponseOrError = await this.__pocket.rpc(provider).query.getNodes(StakingStatus.Staked, JailedStatus.Unjailed, undefined, undefined, 1, 1)
    if (typeGuard(validatorsResponseOrError, RpcError)) {
      OCAlert.alertError(validatorsResponseOrError.message, {
        timeOut: 3000
      });
      return 0
    } else {
      return validatorsResponseOrError.totalPages
    }
  }
}