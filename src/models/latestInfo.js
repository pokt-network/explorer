export class LatestInfo {

    /**
     * @param {string} firstColumn
     * @param {string} secondColumn
     * @param {Date} timestamp
     * @param {string} network
     * * @param {string} extraInfo
     * @param {object} data
     */
    constructor(firstColumn, secondColumn, timestamp, network, extraInfo, data) {
        this.firstColumn = firstColumn
        this.secondColumn = secondColumn
        this.timestamp = timestamp
        this.network = network
        this.extraInfo = extraInfo
        this.data = data === undefined ? {} : data
    }
}