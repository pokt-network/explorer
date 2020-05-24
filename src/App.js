import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { createGlobalStyle } from 'styled-components';

import Home from './views/Home';
import BlockDetails from './views/Block/Details'
import TxDetails from './views/Tx/Details'
import BlockLatest from './views/Block/Latest';
import TxLatest from './views/Tx/Latest';
// import Detail from './views/Detail/index';
// import PocketTestnet from './views/PocketTestnet/index';
// import PocketCore from './views/PocketCore/index';
// import AddNetwork from './views/AddNetwork/index';
import Header from "./components/Header";
import Footer from "./components/Footer";

import './normalize.css';

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700,900');
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');
    font-family: 'Lato', sans-serif;
  }
`

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <GlobalStyles />
          <Header />
          <Route exact path='/' component={Home}/>
          <Route path='/block/:id' component={BlockDetails}/>
          <Route path='/tx/:id' component={TxDetails}/>
          <Route exact path='/latest/block' component={BlockLatest}/>
          <Route exact path='/latest/tx' component={TxLatest}/>
          {/* <Route exact path='/latest' component={Latest}></Route>
          <Route exact path='/detail' component={Detail}></Route>
          <Route exact path='/pockettestnet' component={PocketTestnet}></Route>
          <Route exact path='/pocketcore' component={PocketCore}></Route>
          <Route exact path='/addnetwork' component={AddNetwork}></Route> */}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;