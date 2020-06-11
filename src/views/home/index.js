import React, {useState} from "react"
import HomeContent from "./home-content"
import Search from "../../components/search"
import Statistics from "../../components/statistics"
import HomeTables from "../../components/home-tables"
import altertT from '../../utils/images/alert.png'
import { DataSource } from "../../datasource"
import OneTable from "../../components/one-table";
import {Alert} from "react-bootstrap";

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = { latestBlocks: [], latestTransactions: [], totalApps: 0, totalNodes: 0, totalTokens: 0, showMessage: false}
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

        this.dataSource.getLatestBlocks(100).then(latestBlocks => {
            this.setState({latestBlocks: latestBlocks})
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
                <div className="one-table-container">
                    <OneTable
                        header={"LATEST BLOCKS"}
                        className={"l-blocks"}
                        columnOne={"BLOCK #"}
                        columnTwo={"HASH"}
                        columnThree={"NUMBER OF TXS"}
                        link={'block'}
                        data={this.state.latestBlocks}
                    />
                </div>
            </HomeContent>
        )
    }
}

export default Home
