import React from 'react';
import EmptyWrapper from '../../components/empty-wrapper';
import LatestContent from './latest';
import OneTable from '../../components/one-table';

function Latest (){
    return (
        <LatestContent>
            <div className="one-table-container">
                <OneTable />
            </div>
        </LatestContent>
    );
}

export default Latest;