import React from 'react';
import LatestContent from './latest';
import OneTable from '../../../components/one-table';
import {DataSource} from "../../../datasource";
import {LatestInfo} from "../../../models/latestInfo";
import config from "../../../config/config.json";

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
                        config.CHAINID.toUpperCase(),
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
                        link={"tx"}
                        data={this.state.transactions}
                    />
                </div>
            </LatestContent>
        );
    }
}

export default TxLatest;