/* global BigInt */

import {
    Pocket,
    PocketRpcProvider,
    Configuration,
    typeGuard,
    RpcError,
    PocketAAT,
    StakingStatus,
    JailedStatus
} from "@pokt-network/pocket-js/dist/web.js"
import { Account, Transaction, Block } from "../models"
import { OCAlert } from '@opuscapita/react-alerts'
import config from "../config/config.json"
import JSBI from 'jsbi'
import numeral from 'numeral'

export class DataSource {
    static instance = DataSource.instance || new DataSource(config.DISPATCHERS);
    static AATVersion = "0.0.1"

    constructor(dispatchers) {
        let dispatchersURL = [];
        const dispatchersList = dispatchers.split(",");

        if (dispatchersList.length > 0) {
            dispatchersList.forEach(dispatcher => {
                dispatchersURL.push(new URL(dispatcher));
            });
        }
        
        this.dispatchers = dispatchersURL;
    }

    async getPocketInstance() {
        if (!this.pocket || !this.pocket.rpc()) {
            // Configuration
            const configuration = new Configuration(0, 1000, 5, 40000, true, undefined, config.BLOCK_TIME, undefined, undefined, false);

            // Load AAT constants
            const clientPassphrase = config.CLIENT_PASSPHRASE;
            const clientPrivateKey = config.CLIENT_PRIVATE_KEY;
            const leifAppPublicKey = config.LEIF_APP_PUBLIC_KEY;
            const leifAppAATSignature = config.LEIF_APP_AAT_SIGNATURE;

            if (clientPassphrase && clientPrivateKey && leifAppPublicKey && leifAppAATSignature) {
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

                // Set RPC Provider
                this.pocket = new Pocket(this.dispatchers, pocketRpcProvider)
            } else {
                throw new Error(`One of the environment variables are missing: CLIENT_PASSPHRASE=${config.CLIENT_PASSPHRASE}, CLIENT_PRIVATE_KEY=${config.CLIENT_PRIVATE_KEY}, LEIF_APP_PUBLIC_KEY=${config.LEIF_APP_PUBLIC_KEY}, LEIF_APP_AAT_SIGNATURE=${config.LEIF_APP_AAT_SIGNATURE}`);
            }
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
        const firstPageAppsResponseOrError = await pocket.rpc().query.getApps(StakingStatus.Staked, undefined, undefined, 1, 1)
        if (typeGuard(firstPageAppsResponseOrError, RpcError)) {
            OCAlert.alertError(firstPageAppsResponseOrError.message, { timeOut: 3000 });
            return 0
        } else {
            return firstPageAppsResponseOrError.totalPages
        }
    }

    async getStakedSupply() {
        const pocket = await this.getPocketInstance()
        const totalSupplyOrError = await pocket.rpc().query.getSupply()
        if (typeGuard(totalSupplyOrError, RpcError)) {
            OCAlert.alertError(totalSupplyOrError.message, { timeOut: 3000 });
            return 0
        } else {
            const totalSupply = totalSupplyOrError
            debugger
            const totalstaked = JSBI.add(totalSupply.appStaked, totalSupply.nodeStaked)
            const totalSupplyPOKT = JSBI.divide(totalstaked, new BigInt(1000000))
            return numeral(totalSupplyPOKT.toString()).format('(0.00 a)');
        }
    }

    async getNodes() {
        const pocket = await this.getPocketInstance()
        const validatorsResponseOrError = await pocket.rpc().query.getNodes(StakingStatus.Staked, JailedStatus.Unjailed, undefined, undefined, 1, 1)
        if (typeGuard(validatorsResponseOrError, RpcError)) {
            OCAlert.alertError(validatorsResponseOrError.message, { timeOut: 3000 });
            return 0
        } else {
            return validatorsResponseOrError.totalPages
        }
    }
}