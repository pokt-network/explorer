import React from 'react';
import LatestContent from './latest';
import OneTable from '../../../components/one-table';

class BlockLatest extends React.Component {

    constructor() {
        super();

        this.state = { 
            blocks: [] 
        };
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