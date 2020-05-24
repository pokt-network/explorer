import React from 'react';
import DetailsContent from './Details';
import Details from '../../../components/Details';
import {DataSource} from "../../../datasource";

class BlockDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = { blockId: 0, blockHash: "", time: "", network: ""}
        this.dataSource = DataSource.instance
        this.height = this.props.location.pathname.replace("/block/", "")
    }

    componentWillMount() {
        this.dataSource.getBlock(this.height).then(block => {
            if(block !== undefined)
                this.setState({ blockId: block.id, blockHash: block.number, time: block.timestamp, network: "POCKET TESTNET"})
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
                    />
                </div>
            </DetailsContent>
        );
    }
}

export default BlockDetails;