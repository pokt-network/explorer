export class LatestInfo {

    /**
     * @param {string} firstColumn
     * @param {string} secondColumn
     * @param {Date} timestamp
     * @param {string} network
     * @param {object} data
     */
    constructor(firstColumn, secondColumn, timestamp, network, data) {
        this.firstColumn = firstColumn
        this.secondColumn = secondColumn
        this.timestamp = timestamp
        this.network = network
        this.data = data === undefined ? {} : data
    }
}