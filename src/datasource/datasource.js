import {
    Pocket,
    PocketRpcProvider,
    typeGuard,
    RpcError,
    PocketAAT,
    BigInt
} from "@pokt-network/pocket-js/dist/web.js"
import { Account, Transaction, Block } from "../models"

export class DataSource {
    constructor(pocketAAT, dispatchers) {
        this.pocketAAT = pocketAAT
        this.dispatchers = dispatchers
    }

    async getPocketInstance() {
        if (!this.pocket) {
            const rpcProviderPocket = new Pocket(this.dispatchers)
            const clientPubKeyHex =
                "86ae55f4ea5e8344903346261946939c7638fc63ddb3fd99d3fb5d17b3e20e25"
            const appPubKeyHex =
                "da121ff5477ffcc130d1eaa475f02ecefabce0b664c7216c8d67b34962ecb065"
            const appPrivateKey =
                "ad73ea70255d140ca0a654fe40eb1b8bb6aaf43cbe037dc6e58594db311cba6fda121ff5477ffcc130d1eaa475f02ecefabce0b664c7216c8d67b34962ecb065"
            const aat = await PocketAAT.from(
                "0.0.1",
                clientPubKeyHex,
                appPubKeyHex,
                appPrivateKey
            )
            const blockchain = "0001"
            const pocketRpcProvider = new PocketRpcProvider(
                rpcProviderPocket,
                aat,
                blockchain
            )
            this.pocket = new Pocket(this.dispatchers, pocketRpcProvider)
        }
        return this.pocket
    }

    /**
     * @returns {BigInt}
     */
    async getHeight() {
        debugger
        const pocket = await this.getPocketInstance()
        const heightResponseOrError = await pocket.rpc().query.getHeight()
        if (typeGuard(heightResponseOrError, RpcError)) {
            return 0
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
        const accountOrError = await this.pocket.rpc().query.getAccount(id)
        if (typeGuard(accountOrError, RpcError)) {
            return undefined
        } else {
            return new Account(accountOrError.address, accountOrError.toJSON())
        }
    }

    /**
     *
     * @param {string} id
     */
    async getTransaction(id) {
        const txResponseOrError = await this.pocket.rpc().query.getTransaction(id)
        if (typeGuard(txResponseOrError, RpcError)) {
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
        debugger
        // const blockResponseOrError = await this.pocket.rpc().query.getBlock(
        //     BigInt(height)
        // )
        // if (typeGuard(blockResponseOrError, RpcError)) {
        //     return undefined
        // } else {
        //     const block = blockResponseOrError.block
        //     const blockMeta = blockResponseOrError.blockMeta
        //     return new Block(
        //         blockMeta.blockID.hash,
        //         block.header.height.toString(),
        //         block.header.time,
        //         blockResponseOrError.toJSON()
        //     )
        // }
        return undefined
    }

    /**
     *
     * @param {number} count How many blocks to fetch
     */
    async getLatestBlocks(count) {
        if (count === 0 || count === undefined) {
            return []
        }
        const height = await this.getHeight()
        if (height === undefined) {
            return []
        }
        let currHeight = height
        const result = []
        for (let index = count; index > 0; --index) {
            const block = await this.getBlock(currHeight)
            result.push(block)
            currHeight = currHeight - 1
        }
        return result
    }

    /**
     *
     * @param {BigInt} height of the block to get the transactions from
     * @param {number} page
     * @param {number} perPage
     */
    async getLatestTransactions(height, page, perPage) {
        // const result = []
        // if (!height || height === new BigInt(0)) {
        //     height = await this.getHeight()
        // }
        // const blockTxsResponseOrError = await this.pocket.rpc.query.getBlockTxs(
        //     height,
        //     false,
        //     page,
        //     perPage
        // )
        // if (typeGuard(blockTxsResponseOrError(blockTxsResponseOrError, RpcError))) {
        //     return result
        // }
        
        // return result
        return []
    }
}
