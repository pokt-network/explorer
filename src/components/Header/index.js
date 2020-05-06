import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import Wrapper from '.././Wrapper';
import Menu from "./Menu";
import MobileButton from "./MobileButton";
import Logo from "./Logo";
import StyledUl from "./Ul";
import StyledLi from "./Li";
import HeaderContainer from "./Header";
import logo from '../../utils/images/pocket-logo.png';
import arrow from '../../utils/images/right-arrow.png';

class Header extends Component {
  state = {
    isMenuHidden: true
  };

  constructor(props) {
    super(props);
  }

  onToggleMenu = () => {
    this.setState((prevState, props) => {
      return { isMenuHidden: !prevState.isMenuHidden };
    });
  };

  render() {
    let hrefLink = '#';
    return (
      <HeaderContainer>
        <Wrapper className="header">
          <Logo href="/"> <img src={logo} alt="logo pocket" /> <span>/ &nbsp; BLOCK EXPLORER</span> </Logo>
          <Menu isHidden={this.state.isMenuHidden}>
            <StyledUl>
              <StyledLi>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
              </StyledLi>
              <StyledLi>
                <NavLink activeClassName="active" to="/latest">Latest</NavLink>
              </StyledLi>
              <StyledLi>
                <NavLink activeClassName="active" to="/detail">Detail</NavLink>
              </StyledLi>
              <StyledLi className="sub_menu">
                <a href={hrefLink}> POKT-T <img src={arrow} alt="greater than" /> </a>
                <ul>
                  <li><a href="http://example.com">Pocket Testnet</a></li>
                  <li><a href="http://example.com">Pocket Core</a></li>
                  <li><a href="http://example.com"><span>+</span>Add Network</a></li>
              </ul>
              </StyledLi>
            </StyledUl>
          </Menu>
          <MobileButton onClick={this.onToggleMenu} />
        </Wrapper>
      </HeaderContainer>
    );
  }
}

export default Header;
