// Represents an account in a blockchain
export class Account {

    /**
     * @param {string} id 
     * @param {object} data 
     */
    constructor(id, balance, data) {
        this.id = id
        this.balance = balance
        this.data = data === undefined ? {} : data
    }

}