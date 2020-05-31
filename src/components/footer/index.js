import React, { Component } from "react";

import FooterContent from './footer';
import Wrapper from '../wrapper';
import HalfColumn from './half-column';
import tw from '../../utils/images/twitter.png';
import github from '../../utils/images/github.png';
import discord from '../../utils/images/discord.png';
import telegram from '../../utils/images/telegram.png';
import cent from '../../utils/images/cent.png';

class Footer extends Component {
  
  render () {
    return (
      <FooterContent >
        <Wrapper className="footer-w"> 
            
          <HalfColumn>
            <div className="social-ch">
              <div className="title">
                <h3>POCKET NETWORK</h3>
              </div>
              <div className="description">
                <p>Come and help us grow the POKT community alongside the protocol. Join our social media cannels.</p>
              </div>
            </div>
            <div className="tech-logos">
              <a href="http://bit.ly/PocketDiscordInvite" target="_blank" rel="noopener noreferrer">
                <img src={discord} alt="tech logo" /> 
              </a>
              <a href="https://github.com/pokt-network" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="tech logo" /> 
              </a>
							<a href="https://t.me/POKTnetwork" target="_blank" rel="noopener noreferrer">
								<img src={telegram} alt="tech logo" /> 
							</a>
							<a href="https://twitter.com/POKTnetwork" target="_blank" rel="noopener noreferrer">
								<img src={tw} alt="tech logo" /> 
							</a>
							<a href="https://beta.cent.co/@POKTnetwork" target="_blank" rel="noopener noreferrer">
								<img src={cent} alt="tech logo" /> 
							</a>
            </div>	
          </HalfColumn>

          <HalfColumn>
            <nav className="footer-nav">
              <ul className="menu-footer">
                <li className="mainli"> 
                  <div className="title-sm">PRODUCT</div>
                  <ul className="sub-menu">
                    <li className="menu-item"><a href="http://example.com">Why use POKT</a></li>
                    <li className="menu-item"><a href="http://example.com">Road Map?</a></li>
                    <li className="menu-item"><a href="http://example.com">Tutorials</a></li>
                  </ul>
                </li>
                <li className="mainli">
                  <div className="title-sm">RESOURCES</div>
                  <ul className="sub-menu">
                    <li className="menu-item"><a href="http://example.com">WhitePaper</a></li>
                    <li className="menu-item"><a href="http://example.com">Economic One Pager</a></li>
                    <li className="menu-item"><a href="http://example.com">iOS SDK</a></li>
                    <li className="menu-item"><a href="http://example.com">Android SDK</a></li>
                    <li className="menu-item"><a href="http://example.com">JS SDK</a></li>
                    <li className="menu-item"><a href="http://example.com">Press kit</a></li>
                  </ul>
                </li>
                <li className="mainli">
                  <div className="title-sm">COMMUNITY</div>
                  <ul className="sub-menu">
                    <li className="menu-item"><a href="http://example.com">Blog</a></li>
                    <li className="menu-item"><a href="http://example.com">Forum</a></li>
                    <li className="menu-item"><a href="http://example.com">Contact</a></li>
                    <li className="menu-item"><a href="http://example.com">FAQ// DEV PORTAL</a></li>
                    <li className="menu-item"><a href="http://example.com">Join Discord</a></li>
                  </ul>
                </li>
              </ul>				
            </nav>
          </HalfColumn>

        </Wrapper> 
      </FooterContent>
    )
  }

}

export default Footer;