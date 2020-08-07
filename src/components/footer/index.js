import React, { Component } from "react";

import FooterContent from './footer';
import Wrapper from '../wrapper';
import HalfColumn from './half-column';
import tw from '../../utils/images/twitter.png';
import github from '../../utils/images/github.png';
import discord from '../../utils/images/discord.png';
import telegram from '../../utils/images/telegram.png';
import cent from '../../utils/images/cent.png';
import config from "../../config/config.json";

class Footer extends Component {
  
  render () {
    return (
      <FooterContent >
        <Wrapper className="footer-w"> 
            
          <HalfColumn>
            <div className="social-ch" style={{marginTop: "-15px"}}>
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
                    <li className="menu-item"><a href="https://docs.pokt.network/docs/what-is-pocket-network">What is Pocket Network?</a></li>
                    <li className="menu-item"><a href="https://www.pokt.network/">Website</a></li>
                    <li className="menu-item"><a href={config.WALLET_BASE_URL}>Wallet</a></li>
                  </ul>
                </li>
                <li className="mainli">
                  <div className="title-sm">RESOURCES</div>
                  <ul className="sub-menu">
                    <li className="menu-item"><a href="https://pocket-network-assets.s3-us-west-2.amazonaws.com/pdfs/Pocket-Network-Whitepaper-v0.3.0.pdf">White Paper</a></li>
                    <li className="menu-item"><a href="https://pocket-network-assets.s3-us-west-2.amazonaws.com/pdfs/Pocket-Network-Economic-Paper-v1.0.2.pdf">Economic One Pager</a></li>
                    <li className="menu-item"><a href="https://docs.pokt.network/">Dev portal</a></li>
                    <li className="menu-item"><a href="https://pokt.network/site-terms-of-use/">Site Terms Of Use</a></li>
                    <li className="menu-item"><a href="https://pokt.network/privacy-policy/">Privacy Policy</a></li>
                  </ul>
                </li>
                <li className="mainli">
                  <div className="title-sm">COMMUNITY</div>
                  <ul className="sub-menu">
                    <li className="menu-item"><a href="https://pokt.network/contact/">Contact Us</a></li>
                    <li className="menu-item"><a href="https://pokt.network/blog/">Blog</a></li>
                    <li className="menu-item"><a href="https://forum.pokt.network/">Forum</a></li>
                    <li className="menu-item"><a href="https://discord.com/invite/WRh7fMJ">Join Discord</a></li>
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