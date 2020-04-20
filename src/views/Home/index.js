import React from 'react';
import EmptyWrapper from '../../components/EmptyWrapper';
import HomeContent from './Home';
import Search from '../../components/Search';
import Statistics from '../../components/Statistics';

function Home (){
    return (
        <HomeContent>
            <Search />
            <Statistics />
            <EmptyWrapper>
                <h1>Home</h1>
            </EmptyWrapper>
        </HomeContent>
    );
}

export default Home;