import React from 'react';
import LatestContent from './Latest';
import OneTable from '../../../components/OneTable';
import {DataSource} from "../../../datasource";
import {LatestInfo} from "../../../models/latestInfo";

class TxLatest extends React.Component {

    constructor(props) {
        super(props)

        this.state.transactions = []
        this.dataSource = DataSource.instance
    }

    componentWillMount() {
        this.dataSource.getLatestTransactions(1, 100).then(txs => {
            if(txs.length !== 0) {
                const latestArray = []
                txs.forEach(tx => {
                    const latest = new LatestInfo(
                        tx.hash,
                        tx.height.toString(),
                        undefined,
                        "POCKET TESTNET",
                        tx.data
                    )

                    latestArray.push(latest)
                })
                this.setState({transactions: latestArray})
            }
        })
    }

    render() {
        return (
            <LatestContent>
                <div className="one-table-container">
                    <OneTable

                        header={"LATEST TRANSACTIONS"}
                        className={"l-transactions"}
                        columnOne={"TRANSACTION HASH"}
                        columnTwo={"BLOCK #"}
                        data={this.state.transactions}
                    />
                </div>
            </LatestContent>
        );
    }
}

export default TxLatest;