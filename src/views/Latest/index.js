import React from 'react';
import EmptyWrapper from '../../components/EmptyWrapper';
import LatestContent from './Latest';
import OneTable from '../../components/OneTable';

function Latest (){
    return (
        <LatestContent>
            <div className="one-table-container">
                <OneTable />
            </div>
            <EmptyWrapper>
                <h1>Latest</h1>
            </EmptyWrapper>
        </LatestContent>
    );
}

export default Latest;