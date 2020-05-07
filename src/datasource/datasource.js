import {
    Pocket,
    HttpRpcProvider,
    typeGuard,
    RpcError,
    BigInt
} from "@pokt-network/pocket-js"
import { Account, Transaction, Block } from "../models"
 
export class DataSource {
    constructor(pocketAAT, dispatchers) {
        this.pocketAAT = pocketAAT
        this.dispatchers = dispatchers
        this.pocket = new Pocket(this.dispatchers, new HttpRpcProvider(new URL("http://localhost:8081")))
    }

    /**
     * @returns {BigInt}
     */
    async getHeight() {
        const heightResponseOrError = this.pocket.rpc.query.getHeight()
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
        const accountOrError = this.pocket.rpc.query.getAccount(id)
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
        const txResponseOrError = this.pocket.rpc.query.getTransaction(id)
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
        const blockResponseOrError = this.pocket.rpc.query.getBlock(new BigInt(height))
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

    async getLatestBlocks(count) {
        if (count === 0 || count === undefined) {
            return []
        }
        const height = this.getHeight()
        if (height === undefined) {
            return []
        }
        let currHeight = height
        const result = []
        for (let index = count; index > 0; --index) {
            const block = this.getBlock(currHeight)
            result.push(block)
            currHeight = currHeight - 1
        }
        return result
    }

    async getLatestTransactions(height, page, perPage) {
        const result = []
        return result
    }
}
