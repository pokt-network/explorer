import React from 'react';
import EmptyWrapper from '../../components/EmptyWrapper';
import HomeContent from './Home';
import Search from '../../components/Search';
import Statistics from '../../components/Statistics';
import TwoTables from '../../components/TwoTables';

function Home (){
    return (
        <HomeContent>
            <Search />
            <Statistics />
            <div className="two-tables-container">
                <TwoTables />
            </div>
        </HomeContent>
    );
}

export default Home;