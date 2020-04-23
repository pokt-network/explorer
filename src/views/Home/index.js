import React from 'react';
import EmptyWrapper from '../../components/EmptyWrapper';
import HomeContent from './Home';
import Search from '../../components/Search';
import TwoTables from '../../components/TwoTables';

function Home (){
    return (
        <HomeContent>
            <Search />
            <div className="two-tables-container">
                <TwoTables />
            </div>
            <EmptyWrapper>
                <h1>Home</h1>
            </EmptyWrapper>
        </HomeContent>
    );
}

export default Home;