/* global BigInt */

import {
    Pocket,
    PocketRpcProvider,
    HttpRpcProvider,
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

const CONFIGURATION = new Configuration(
    config.MAX_DISPATCHERS,
    1000,
    0,
    20000,
    undefined,
    undefined,
    Number(config.BLOCK_TIME),
    undefined,
    false,
    false
);

/**
 * Retrieve a list of URL's from the configuration for the dispatchers
 *
 * @returns {URL[]} Dispatcher urls.
 */
function getPocketDispatchers() {
    const dispatchersStr = config.DISPATCHERS || "";

    if (dispatchersStr === "") {
        return [];
    }

    return dispatchersStr.split(",").map(function (dispatcherURLStr) {
        return new URL(dispatcherURLStr);
    });
}

/**
 * @returns {HttpRpcProvider | PocketRpcProvider} RPC Provider.
 */
async function getRPCProvider() {
    const providerType = config.PROVIDER_TYPE;

    if (providerType.toLowerCase() === "http") {
        return getHttpRPCProvider();
    } else if (providerType.toLowerCase() === "pocket") {
        return await getPocketRPCProvider();
    } else {
        // Default to HTTP RPC Provider
        return getHttpRPCProvider();
    }
}

/**
 * @returns {HttpRpcProvider} HTTP RPC Provider.
 */
function getHttpRPCProvider() {
    const node = config.HTTP_PROVIDER;

    if (!node || node === "") {
        throw new Error(`Invalid HTTP Provider node: ${node}`);
    }

    return new HttpRpcProvider(new URL(node));
}

/**
 * @returns {PocketRpcProvider} Pocket RPC Provider.
 */
async function getPocketRPCProvider() {    
    const clientPrivateKey = config.CLIENT_PRIVATE_KEY;
    const clientPassphrase = config.CLIENT_PASSPHRASE;
    const leifAppPublicKey = config.WALLET_APP_PUBLIC_KEY;
    const leifAppAATSignature = config.WALLET_APP_AAT_SIGNATURE;
    const blockchain = config.CHAIN;

    if (
        clientPrivateKey &&
        clientPassphrase &&
        leifAppPublicKey &&
        leifAppAATSignature &&
        blockchain
    ) {
        // Dispatcher
        const dispatchers = getPocketDispatchers();

        if (!dispatchers || dispatchers.length === 0) {
            throw new Error(`Failed to retrieve a list of dispatcher for the PocketRpcProvider: ${dispatchers}`);
        }

        // Pocket instance
        const pocket = new Pocket(dispatchers, undefined, CONFIGURATION);

        // Import client Account
        const clientAccountOrError = await pocket.keybase.importAccount(
            Buffer.from(clientPrivateKey, "hex"),
            clientPassphrase
        );

        if (typeGuard(clientAccountOrError, Error)) {
            throw clientAccountOrError;
        };
        
        const clientPubKeyHex = clientAccountOrError.publicKey.toString("hex");

        // Unlock the client account
        const unlockOrError = await pocket.keybase.unlockAccount(
            clientAccountOrError.addressHex,
            clientPassphrase,
            0
        );

        if (typeGuard(unlockOrError, Error)) {
            throw clientAccountOrError;
        };
        
        // Generate the AAT
        const aat = new PocketAAT(
            config.AAT_VERSION,
            clientPubKeyHex,
            leifAppPublicKey,
            leifAppAATSignature
        );

        // Pocket Rpc Instance
        return new PocketRpcProvider(
            pocket,
            aat,
            blockchain,
            true
        );
    } else {
        throw new Error(
            `One of the environment variables are missing: CLIENT_PRIVATE_KEY=${config.CLIENT_PRIVATE_KEY}, CLIENT_PASSPHRASE=${config.CLIENT_PASSPHRASE}, WALLET_APP_PUBLIC_KEY=${config.WALLET_APP_PUBLIC_KEY}, WALLET_APP_AAT_SIGNATURE=${config.WALLET_APP_AAT_SIGNATURE}, CHAIN=${config.CHAIN}`
        );
    }
}

export class DataSource {

    constructor() {
        this.dispatchers = getPocketDispatchers();

        if (!this.dispatchers || this.dispatchers.length === 0) {
            throw new Error(
                `Failed to retrieve a list of dispatchers to instantiate Pocket: ${this.dispatchers}`
            );
        }

        this.__pocket = new Pocket(this.dispatchers, undefined, CONFIGURATION);
    }

    /**
     * @returns {BigInt}
     */
    async getHeight() {
        const provider = await getRPCProvider();

        const heightResponseOrError = await this.__pocket.rpc(provider).query.getHeight()
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
        const provider = await getRPCProvider();

        const accountOrError = await this.__pocket.rpc(provider).query.getAccount(id)
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
            OCAlert.alertError(firstPageAppsResponseOrError.message, { timeOut: 3000 });
            return 0
        } else {
            return firstPageAppsResponseOrError.totalPages
        }
    }

    async getStakedSupply() {
        const provider = await getRPCProvider();
        const totalSupplyOrError = await this.__pocket.rpc(provider).query.getSupply()
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
        const provider = await getRPCProvider();
        const validatorsResponseOrError = await this.__pocket.rpc(provider).query.getNodes(StakingStatus.Staked, JailedStatus.Unjailed, undefined, undefined, 1, 1)
        if (typeGuard(validatorsResponseOrError, RpcError)) {
            OCAlert.alertError(validatorsResponseOrError.message, { timeOut: 3000 });
            return 0
        } else {
            return validatorsResponseOrError.totalPages
        }
    }
}