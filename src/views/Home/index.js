import React from "react"
import HomeContent from "./home-content"
import Search from "../../components/Search"
import Statistics from "../../components/statistics"
import HomeTables from "../../components/home-tables"
import { DataSource } from "../../datasource"

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = { latestBlocks: [], latestTransactions: [] }
        this.dataSource = new DataSource(undefined, [new URL("http://localhost:8081")])
        this.refresh()
    }

    async refresh() {
        this.state.latestBlocks = []
        this.state.latestTransactions = []
        const height = await this.dataSource.getHeight()
        debugger
        //this.state.latestBlocks = await this.dataSource.getLatestBlocks(10)
        //this.state.latestTransactions = await this.dataSource.getLatestTransactions()
    }

    render() {
        return (
            <HomeContent>
                <Search />
                <Statistics
                    totalStakedNodes={100}
                    totalStaked={200}
                    totalStakedApps={100}
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
