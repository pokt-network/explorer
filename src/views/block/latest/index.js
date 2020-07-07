import React from 'react';
import LatestContent from './latest';
import OneTable from '../../../components/one-table';
import {DataSource} from "../../../datasource";

class BlockLatest extends React.Component {

    constructor(props) {
        super(props)

        this.state = { blocks: [] }
        this.dataSource = DataSource.instance
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
                        link={"block"}
                        data={this.state.blocks}
                    />
                </div>
            </LatestContent>
        );
    }
}

export default BlockLatest;