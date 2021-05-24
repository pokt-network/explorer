import React from 'react';
import LatestContent from './latest';
import OneTable from '../../../components/one-table';
import { getDataSource  } from "../../../datasource";
import { LatestInfo } from "../../../models/latestInfo";
import config from "../../../config/config";

const dataSource = getDataSource();

class BlockLatest extends React.Component {

    constructor() {
        super();

        this.state = { 
            blocks: [] 
        };
    }

    componentWillMount() {
        dataSource.getLatestBlock().then(block => {
            if (block) {
                const latest = new LatestInfo(
                        block.id,
                        block.number,
                        block.timestamp,
                        config.CHAIN_ID.toUpperCase(), //network
                        block.data.index,
                        undefined, 
                    )
              this.setState({ blocks: [latest] });
            }
        })
    }

    render() {
        const { blocks } = this.state;

        return (
            <LatestContent>
                <div className="one-table-container">
                    <OneTable
                        header={"LATEST BLOCKS"}
                        className={"l-blocks"}
                        columnOne={"BLOCK #"}
                        columnTwo={"HASH"}
                        link={"block"}
                        data={blocks}
                    />
                </div>
            </LatestContent>
        );
    }
}

export default BlockLatest;
