/* global BigInt */

import {
    Pocket,
    PocketRpcProvider,
    Configuration,
    typeGuard,
    RpcError,
    PocketAAT,
    StakingStatus
} from "@pokt-network/pocket-js/dist/web.js"
import { Account, Transaction, Block } from "../models"
import { OCAlert } from '@opuscapita/react-alerts';
import config from "../config/config.json"

export class DataSource {
    static instance = DataSource.instance || new DataSource([new URL(config.BASEURL)])
    static AATVersion = "0.0.1"

    constructor(dispatchers) {
        this.dispatchers = dispatchers
    }

    async getPocketInstance() {
        if (!this.pocket || !this.pocket.rpc()) {
            // Load AAT constants
            const clientPassphrase = config.CLIENTPASSPHRASE
            const clientPrivateKey = config.CLIENTPRIVATEKEY
            const leifAppPublicKey = config.LEIFAPPPUBLICKEY
            const leifAppAATSignature = config.LEIFAPPAATSIGNATURE

            const configuration = new Configuration(5, 1000, 5, 40000, true, undefined, config.BLOCKTIME, undefined, undefined, false)

            // Create pocket instance
            const pocketLocal = new Pocket(this.dispatchers, undefined, configuration)

            // Import client account
            const clientAccountOrError = await pocketLocal.keybase.importAccount(Buffer.from(clientPrivateKey, "hex"), clientPassphrase)
            if (typeGuard(clientAccountOrError, Error)) {
                throw clientAccountOrError
            }
            const clientAccount = clientAccountOrError
            await pocketLocal.keybase.unlockAccount(clientAccount.addressHex, clientPassphrase, 0)

            // Create AAT
            const aat = new PocketAAT(
                DataSource.AATVersion,
                clientAccount.publicKey.toString("hex"),
                leifAppPublicKey,
                leifAppAATSignature
            )

			// Create Pocket RPC Provider
            const blockchain = config.CHAIN
            const pocketRpcProvider = new PocketRpcProvider(pocketLocal, aat, blockchain, false)
            //const pocketRpcProvider = new HttpRpcProvider(this.dispatchers)

            // Set RPC Provider
            //this.pocket.rpc(pocketRpcProvider)
            this.pocket = new Pocket(this.dispatchers, pocketRpcProvider)
        }
        return this.pocket
    }

    /**
     * @returns {BigInt}
     */
    async getHeight() {
        const pocket = await this.getPocketInstance()
        const heightResponseOrError = await pocket.rpc().query.getHeight()
        if (typeGuard(heightResponseOrError, RpcError)) {
            OCAlert.alertError(heightResponseOrError.message, { timeOut: 3000 });
            return undefined
        } else {
            return heightResponseOrError.height
        }
    }

    /**
     *
     * @param {string} id
     * @returns {Account}
     */
    async getAccount(id) {
        const pocket = await this.getPocketInstance()
        const accountOrError = await pocket.rpc().query.getAccount(id)
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
        const pocket = await this.getPocketInstance()
        const txResponseOrError = await pocket.rpc().query.getTX(id)
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
        const pocket = await this.getPocketInstance()
        const blockResponseOrError = await pocket.rpc().query.getBlock(BigInt(height))
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

        const pocket = await this.getPocketInstance()
        const blockResponseOrError = await pocket.rpc().query.getBlock(height)
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
        const pocket = await this.getPocketInstance()
        const result = []

        const blockTxsResponseOrError = await pocket.rpc().query.getBlockTxs(
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
        const pocket = await this.getPocketInstance()
        const height = await this.getHeight()
        if (height === undefined) {
            return []
        }
        const appsResponseOrError = await pocket.rpc().query.getApps(StakingStatus.Staked, height, this.blockchain, 1, 10)
        if (typeGuard(appsResponseOrError, RpcError)) {
            OCAlert.alertError(appsResponseOrError.message, { timeOut: 3000 });
            return 0
        } else {
            return appsResponseOrError.applications.length
        }
    }

    async getBalance() {
        const pocket = await this.getPocketInstance()
        const pocketAddress = config.ADDRESS;
        const queryBalanceResponseOrError = await pocket.rpc().query.getBalance(pocketAddress)
        if (typeGuard(queryBalanceResponseOrError, RpcError)) {
            return 0
        } else {
            const uPOKT = Number(queryBalanceResponseOrError.balance.toString())
            return uPOKT / 1000000
        }
    }

    async getNodes() {
        const pocket = await this.getPocketInstance()
        const validatorsResponseOrError = await pocket.rpc().query.getNodes(StakingStatus.Staked)
        if (typeGuard(validatorsResponseOrError, RpcError)) {
            OCAlert.alertError(validatorsResponseOrError.message, { timeOut: 3000 });
            return 0
        } else {
            return validatorsResponseOrError.nodes.length
        }
    }
}