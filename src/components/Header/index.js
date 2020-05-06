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
    this.setState((prevState) => {
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
                <NavLink exact activeClassName="active" to="/" onClick={this.onToggleMenu}>Home</NavLink>
              </StyledLi>
              <StyledLi>
                <NavLink activeClassName="active" to="/latest" onClick={this.onToggleMenu}>Latest</NavLink>
              </StyledLi>
              <StyledLi>
                <NavLink activeClassName="active" to="/detail" onClick={this.onToggleMenu}>Detail</NavLink>
              </StyledLi>
              <StyledLi className="sub_menu">
                <a href={hrefLink}> POKT-T <img src={arrow} alt="greater than" /> </a>
                <ul>
                  <li><NavLink activeClassName="active" to="/pockettestnet" onClick={this.onToggleMenu}>Pocket Testnet</NavLink></li>
                  <li><NavLink activeClassName="active" to="/pocketcore" onClick={this.onToggleMenu}>Pocket Core</NavLink></li>
                  <li><NavLink activeClassName="active" to="/addnetwork" onClick={this.onToggleMenu}>Add Network</NavLink></li>
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
