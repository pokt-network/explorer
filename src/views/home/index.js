import React from "react"
import HomeContent from "./home-content"
import Search from "../../components/search"
import Statistics from "../../components/statistics"
import HomeTables from "../../components/home-tables"
import { DataSource } from "../../datasource"

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

        this.dataSource.getLatestBlocks(10).then(latestBlocks => {
            this.setState({latestBlocks: latestBlocks})
        })

        this.dataSource.getLatestTransactions(1, 100).then(latestTransactions => {
            this.setState({latestTransactions: latestTransactions})
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
                <div className="two-tables-container">
                    <HomeTables
                        blocks={this.state.latestBlocks}
                        transactions={this.state.latestTransactions}
                    />
                </div>
            </HomeContent>
        )
    }
}

export default Home
