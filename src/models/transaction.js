// Represents a transaction in a blockchain
export class Transaction {
    /**
     * @param {string} id 
     * @param {BigInt} height
     * @param {Date} timestamp 
     * @param {object} data 
     */
    constructor(id, height, timestamp, data) {
        this.id = id
        this.height = height
        this.timestamp = timestamp
        this.data = data === undefined ? {} : data
    }
}
