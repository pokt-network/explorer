import React from 'react';
import DetailsContent from './details';
import Details from '../../../components/details';
import EventTable from "../../../components/events";
import TransactionMessage from "../../../components/transaction-message";
import config from "../../../config/config";

import { getDataSource } from "../../../datasource";

const dataSource = getDataSource();

class TxDetails extends React.Component {

    constructor(props) {
        super(props);

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
            msg: {},
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
                    data: tx.data,
                    msg: tx.data.stdTx.msg
                })
            } else {
                this.setState({showMessage: true})
            }
        })
    }

    render() {
        const { txId, txHash, time, network, data, msg } = this.state;

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
                  {
                    data.tx_result.events === null && <TransactionMessage msg={msg} />
                  }
                  {
                    data.tx_result.events !== null && <EventTable events={data.tx_result.events} />
                  }
                </div>
            </DetailsContent>
        );
    }
}

export default TxDetails;
