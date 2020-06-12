import React, {useState} from "react"
import HomeContent from "./home-content"
import Search from "../../components/search"
import Statistics from "../../components/statistics"
import HomeTables from "../../components/home-tables"
import altertT from '../../utils/images/alert.png'
import { DataSource } from "../../datasource"
import OneTable from "../../components/one-table";
import {Alert} from "react-bootstrap";
import Details from "../../components/details";
import DetailsContent from "../block/details/details";
import {LatestInfo} from "../../models/latestInfo";

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = { latestBlocks: [], latestTransactions: [], totalApps: 0, totalNodes: 0, totalTokens: 0, showMessage: false, transactions: [], blockId: 0, blockHash: "", time: "", network: "", data: {block: { header: {chain_id: "", consensus_hash: "", num_txs: 0, total_txs: 0}}}}
        this.dataSource = DataSource.instance
        this.hideMessage = this.hideMessage.bind(this)
        this.showMessage = this.showMessage.bind(this)
    }

    componentWillMount() {
        this.dataSource.getTotalStakedApps().then(totalApps => {
            this.setState({totalApps: totalApps})
        })

        this.dataSource.getBalance().then(totalTokens => {
            this.setState({totalTokens: totalTokens})
        })

        this.dataSource.getLatestBlock().then(block => {
            if(block !== undefined) {
                this.setState({
                    blockId: block.id,
                    blockHash: block.number,
                    time: block.timestamp,
                    network: "TESTNET",
                    data: block.data
                })

                this.dataSource.getLatestTransactions(1, 100, block.number).then(txs => {
                    if(txs.length !== 0) {
                        const latestArray = []
                        txs.forEach(tx => {
                            const latest = new LatestInfo(
                                tx.height.toString(),
                                tx.id,
                                undefined,
                                "TESTNET",
                                tx.data.index,
                                tx.data
                            )

                            latestArray.push(latest)
                        })
                        this.setState({transactions: latestArray})
                    }
                })

            } else {
                this.setState({showMessage: true})
            }
        })

        this.dataSource.getNodes().then(nodes => {
            this.setState({totalNodes: nodes})
        })

    }

    hideMessage() {
        this.setState({showMessage: false})
    }

    showMessage() {
        this.setState({showMessage: true})
    }

    render() {

        return (
            <HomeContent>
                <Search handler = {this.showMessage}/>

                <Statistics
                    totalStakedNodes={this.state.totalNodes}
                    totalStaked={this.state.totalTokens}
                    totalStakedApps={this.state.totalApps}
                />
                <div className="alert" style={this.state.showMessage ? {} : { display: 'none' }}>
                    <img src={altertT} alt="alert" />
                    <div className="cont-alert">
                        <div className="title">
                            <h3>NO RESULT FOR THIS SEARCH!</h3>
                        </div>
                        <p>
                            Try searching by transaction hash, block number or account address
                        </p>
                        <button onClick={this.hideMessage}>
                            <span id="close">X</span>
                        </button>
                    </div>
                </div>
                <DetailsContent>
                    <div className="details">
                        <Details
                            className={"bd"}
                            header={"BLOCK DETAIL"}
                            line1Header={"BLOCK #"}
                            line2Header={"BLOCK HASH"}
                            line3Header={"TIMESTAMP"}
                            line4Header={"NETWORK"}
                            line1Data={this.state.blockId}
                            line2Data={this.state.blockHash}
                            line3Data={this.state.time}
                            line4Data={this.state.network}
                        />
                    </div>

                    <div className="one-table-container" style={{marginTop: "70px"}}>
                        <OneTable
                            header={"TRANSACTIONS"}
                            className={"l-transactions"}
                            columnOne={"TRANSACTION HASH"}
                            columnTwo={"BLOCK #"}
                            columnThree={"INDEX"}
                            link={"tx"}
                            data={this.state.transactions}
                        />
                    </div>
                </DetailsContent>
            </HomeContent>
        )
    }
}

export default Home
