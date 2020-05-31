import React from 'react';
import DetailsContent from './details';
import Details from '../../../components/details';
import {DataSource} from "../../../datasource";

class TxDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = { txId: 0, txHash: "", time: "", network: ""}
        this.dataSource = DataSource.instance
        this.hash = this.props.location.pathname.replace("/tx/", "")
    }

    componentWillMount() {
        this.dataSource.getTransaction(this.hash).then(tx => {
            if(tx !== undefined)
                this.setState({ txId: tx.id, txHash: tx.height.toString, time: tx.timestamp, network: "POCKET TESTNET"})
        })
    }

    render() {
        return (
            <DetailsContent>
                <div className="details">
                    <Details
                        header={"TRANSACTION  DETAIL"}
                        line1Header={"TRANSACTION HASH"}
                        line2Header={"BLOCK #"}
                        line3Header={"TIMESTAMP"}
                        line4Header={"NETWORK"}
                        line1Data={this.state.txId}
                        line2Data={this.state.txHash}
                        line3Data={this.state.time}
                        line4Data={this.state.network}
                    />
                </div>
            </DetailsContent>
        );
    }
}

export default TxDetails;