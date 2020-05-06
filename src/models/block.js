// Represents a block in a blockchain
export class Block {

    /**
     * @param {string} id 
     * @param {string} number 
     * @param {Date} timestamp 
     * @param {object} data 
     */
    constructor(id, number, timestamp, data) {
        this.id = id
        this.number = number
        this.timestamp = timestamp
        this.data = data === undefined ? {} : data
    }
}
