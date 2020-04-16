import React from 'react';
import EmptyWrapper from '../../components/EmptyWrapper';
import HomeContent from './Home';
import Search from '../../components/Search';

function Home (){
    return (
        <HomeContent>
            <Search />
            <EmptyWrapper>
                <h1>Home</h1>
            </EmptyWrapper>
        </HomeContent>
    );
}

export default Home;