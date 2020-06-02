import React from 'react';
import DetailsContent from './details';
import Details from '../../../components/details';
import {DataSource} from "../../../datasource";

class BlockDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = { blockId: 0, blockHash: "", time: "", network: "", data: {block: { header: {chain_id: "", consensus_hash: "", num_txs: 0, total_txs: 0}}}}
        this.dataSource = DataSource.instance
        this.height = this.props.location.pathname.replace("/block/", "")
    }

    componentWillMount() {
        console.log(this.height)
        this.dataSource.getBlock(this.height).then(block => {
            if(block !== undefined)
                this.setState({ blockId: block.id, blockHash: block.number, time: block.timestamp, network: "POCKET TESTNET", data: block.data})
        })
    }

    render() {
        return (
            <DetailsContent>
                <div className="details">
                    <Details
                        header={"BLOCK DETAIL"}
                        line1Header={"BLOCK #"}
                        line2Header={"BLOCK HASH"}
                        line3Header={"TIMESTAMP"}
                        line4Header={"NETWORK"}
                        line1Data={this.state.blockId}
                        line2Data={this.state.blockHash}
                        line3Data={this.state.time}
                        line4Data={this.state.network}
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
            </DetailsContent>
        );
    }
}

export default BlockDetails;