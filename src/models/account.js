// Represents an account in a blockchain
export class Account {

    /**
     * @param {string} id 
     * @param {object} data 
     */
    constructor(id, data) {
        this.id = id
        this.data = data === undefined ? {} : data
    }

}