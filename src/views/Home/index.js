import React from "react"
import HomeContent from "./home-content"
import Search from "../../components/Search"
import Statistics from "../../components/Statistics"
import HomeTables from "../../components/home-tables"
import { DataSource } from "../../datasource"

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = { latestBlocks: [], latestTransactions: [], totalApps: 0, totalNodes: 0, totalTokens: 0}
        this.dataSource = DataSource.instance
        this.block = this.props.location.search.replace("?block=", "")

        if(this.block !== "") {
            if(!isNaN(this.block)){
                window.open(`/block/${this.block}`, '_self');
            } else {
                window.open(`/tx/${this.block}`, '_self');
            }
        }

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
