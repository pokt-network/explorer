import React from 'react';
import DetailsContent from './details';
import Details from '../../../components/details';
import {DataSource} from "../../../datasource";
import EventTable from "../../../components/events";
import config from "../../../config/config.json";

const dataSource = new DataSource();

class TxDetails extends React.Component {

    constructor() {
        super();

        this.state = { 
            txId: 0, 
            txHash: "", 
            time: "", 
            network: "",
            data: { 
                tx_result: { 
                    events: [] 
                } 
            }, 
            showMessage: false
        };

        this.hash = this.props.location.pathname.replace("/tx/", "");
    }

    componentWillMount() {
        dataSource.getTransaction(this.hash).then(tx => {
            if(tx !== undefined) {
                this.setState({
                    txId: tx.id,
                    txHash: tx.height.toString(),
                    time: tx.data.index,
                    network: config.CHAIN_ID.toUpperCase(),
                    data: tx.data
                })
            } else {
                this.setState({showMessage: true})
            }
        })
    }

    render() {
        const { txId, txHash, time, network, data } = this.state;

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
                        line1Data={txId}
                        line2Data={txHash}
                        line3Data={time}
                        line4Data={network}
                        renderAdditional={false}
                    />
                </div>

                <div className="one-table-container white" style={{marginTop: "70px"}}>
                    <EventTable
                        events={data.tx_result.events}
                    />
                </div>
            </DetailsContent>
        );
    }
}

export default TxDetails;