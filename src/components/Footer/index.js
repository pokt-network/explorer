import React, { Component } from "react";

import FooterContent from './Footer';
import Wrapper from '.././Wrapper';
import fb from '../../utils/images/home/facebook.png';
import tw from '../../utils/images/home/twitter.png';

class Footer extends Component {
  
  render () {
    return (
      <Wrapper> 
        <FooterContent >
            <ul className="nav-f">
              <span>Follow Us</span>
              <a href="http://example.com" rel="noopener noreferrer" target="_blank"><img className="nav__link right icon-social" alt="social" src={fb}/></a>
              <a href="http://example.com" rel="noopener noreferrer" target="_blank"><img className="nav__link right icon-social" alt="social" src={tw}/></a>
            </ul>
            <ul className="nav-f">
              <a href="http://example.com" className="nav-f">PRODUCT</a>
              <a href="http://example.com" className="nav-f">RESOURCES</a>
              <a href="http://example.com" className="nav-f">COMUNITY</a>
            </ul>
        </FooterContent>
      </Wrapper> 
    )
  }

}

export default Footer;