import React from 'react';
import EmptyWrapper from '../../components/EmptyWrapper';
import DetailsContent from './Details';
import Details from '../../components/Details';

function Detail (){
    return (
        <DetailsContent>
            <div className="details">
                <Details />
            </div>
        </DetailsContent>
    );
}

export default Detail;