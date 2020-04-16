import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { createGlobalStyle } from 'styled-components'

import Home from './views/Home/index';
import Latest from './views/Latest/index';
import Detail from './views/Detail/index';
import Header from "./components/Header";
import Footer from "./components/Footer";

import './normalize.css';

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700,900');
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
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/latest' component={Latest}></Route>
          <Route exact path='/detail' component={Detail}></Route>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;