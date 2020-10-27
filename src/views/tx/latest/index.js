import React from 'react';
import LatestContent from './latest';
import OneTable from '../../../components/one-table';
import {DataSource} from "../../../datasource";
import {LatestInfo} from "../../../models/latestInfo";
import config from "../../../config/config.json";

const dataSource = new DataSource();

class TxLatest extends React.Component {

    constructor() {
        super();

        this.state.transactions = [];
    }

    componentWillMount() {
        dataSource.getLatestTransactions(1, 100).then(txs => {
            if(txs.length !== 0) {
                const latestArray = []
                txs.forEach(tx => {
                    const latest = new LatestInfo(
                        tx.hash,
                        tx.height.toString(),
                        undefined,
                        config.CHAIN_ID.toUpperCase(),
                        tx.data
                    )

                    latestArray.push(latest)
                })
                this.setState({transactions: latestArray});
            }
        })
    }

    render() {
        const {transactions} = this.state;

        return (
            <LatestContent>
                <div className="one-table-container">
                    <OneTable
                        header={"LATEST TRANSACTIONS"}
                        className={"l-transactions"}
                        columnOne={"TRANSACTION HASH"}
                        columnTwo={"BLOCK #"}
                        link={"tx"}
                        data={transactions}
                    />
                </div>
            </LatestContent>
        );
    }
}

export default TxLatest;