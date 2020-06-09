import React from "react"
import HomeContent from "./home-content"
import Search from "../../components/search"
import Statistics from "../../components/statistics"
import HomeTables from "../../components/home-tables"
import { DataSource } from "../../datasource"
import OneTable from "../../components/one-table";

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = { latestBlocks: [], latestTransactions: [], totalApps: 0, totalNodes: 0, totalTokens: 0}
        this.dataSource = DataSource.instance
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

    render() {
        return (
            <HomeContent>
                <Search />
                <Statistics
                    totalStakedNodes={this.state.totalNodes}
                    totalStaked={this.state.totalTokens}
                    totalStakedApps={this.state.totalApps}
                />
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
