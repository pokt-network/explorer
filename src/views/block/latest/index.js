import React from 'react';
import LatestContent from './latest';
import OneTable from '../../../components/one-table';
import {DataSource} from "../../../datasource";
import {LatestInfo} from "../../../models/latestInfo";

class BlockLatest extends React.Component {

    constructor(props) {
        super(props)

        this.state = { blocks: [] }
        this.dataSource = DataSource.instance
    }

    componentWillMount() {
        this.dataSource.getLatestBlocks(10).then(blocks => {
            if(blocks.length !== 0) {
                const latestArray = []
                blocks.forEach(block => {
                    const latest = new LatestInfo(
                        block.id,
                        block.number,
                        block.timestamp,
                        "POCKET TESTNET",
                        block.data
                    )

                    latestArray.push(latest)
                })
                this.setState({blocks: latestArray})
            }
        })
    }

    render() {
        return (
            <LatestContent>
                <div className="one-table-container">
                    <OneTable
                        header={"LATEST BLOCKS"}
                        className={"l-blocks"}
                        columnOne={"BLOCK #"}
                        columnTwo={"HASH"}
                        data={this.state.blocks}
                    />
                </div>
            </LatestContent>
        );
    }
}

export default BlockLatest;