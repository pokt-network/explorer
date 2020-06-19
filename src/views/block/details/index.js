import React from 'react';
import DetailsContent from './details';
import Details from '../../../components/details';
import {DataSource} from "../../../datasource";
import OneTable from "../../../components/one-table";
import {LatestInfo} from "../../../models/latestInfo";

class BlockDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = { transactions: [], blockId: 0, blockHash: "", time: "", network: "", data: {block: { header: {chain_id: "", consensus_hash: "", num_txs: 0, total_txs: 0}}}, showMessage: false }
        this.dataSource = DataSource.instance
        this.height = this.props.location.pathname.replace("/block/", "")
    }

    componentWillMount() {
        this.dataSource.getBlock(this.height).then(block => {
            if(block !== undefined) {
                this.setState({
                    blockId: block.id,
                    blockHash: block.number,
                    time: block.timestamp,
                    network: "TESTNET",
                    data: block.data
                })
            } else {
                this.setState({showMessage: true})
            }
        })

        this.dataSource.getLatestTransactions(1, 100, this.height).then(txs => {
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
    }

    render() {
        return (
            <DetailsContent>
                <div className="details">
                    <Details
                        className={"bd"}
                        header={"BLOCK DETAIL"}
                        line1Header={"BLOCK #"}
                        line2Header={"BLOCK HASH"}
                        line3Header={"TIMESTAMP"}
                        line4Header={"NETWORK"}
                        line1Data={this.state.blockHash}
                        line2Data={this.state.blockId}
                        line3Data={this.state.time}
                        line4Data={this.state.network}
                        renderAdditional={true}
                        data1Header={"CHAIN ID"}
                        data2Header={"CONSENSUS HASH"}
                        data3Header={"TX NUMBER"}
                        data4Header={"TOTAL TXS"}
                        data1={this.state.data.block.header.chain_id}
                        data2={this.state.data.block.header.consensus_hash}
                        data3={this.state.data.block.header.num_txs}
                        data4={this.state.data.block.header.total_txs}
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
        );
    }
}

export default BlockDetails;