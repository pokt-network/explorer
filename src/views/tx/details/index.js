import React from 'react';
import DetailsContent from './details';
import Details from '../../../components/details';
import {DataSource} from "../../../datasource";
import {Alert} from "react-bootstrap";

class TxDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = { txId: 0, txHash: "", time: "", network: "", data: { proof: {root_hash: "", proof: {index: 0, total: 0, leaf_hash: ""} } }, showMessage: false}
        this.dataSource = DataSource.instance
        this.hash = this.props.location.pathname.replace("/tx/", "")
    }

    componentWillMount() {
        this.dataSource.getTransaction(this.hash).then(tx => {
            if(tx !== undefined) {
                this.setState({
                    txId: tx.id,
                    txHash: tx.height.toString(),
                    time: tx.data.index,
                    network: "TESTNET",
                    data: tx.data
                })
            } else {
                this.setState({showMessage: true})
            }
        })
    }

    render() {

        return (
            <DetailsContent>


                <div className="details">
                    <Details
                        className={"tx"}
                        header={"TRANSACTION  DETAIL"}
                        line1Header={"TRANSACTION HASH"}
                        line2Header={"BLOCK #"}
                        line3Header={"INDEX"}
                        line4Header={"NETWORK"}
                        line1Data={this.state.txId}
                        line2Data={this.state.txHash}
                        line3Data={this.state.time}
                        line4Data={this.state.network}
                        data1Header={"ROOT HASH"}
                        data2Header={"INDEX"}
                        data3Header={"LEAF HASH"}
                        data4Header={"TOTAL"}
                        data1={this.state.data.proof.root_hash}
                        data2={this.state.data.proof.proof.index}
                        data3={this.state.data.proof.proof.leaf_hash}
                        data4={this.state.data.proof.proof.total}
                    />
                </div>
            </DetailsContent>
        );
    }
}

export default TxDetails;