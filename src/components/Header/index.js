import React, { Component } from "react";

import Wrapper from '.././Wrapper';
import Menu, { MenuItem } from "./Menu";
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

  onToggleMenu = () => {
    this.setState((prevState, props) => {
      return { isMenuHidden: !prevState.isMenuHidden };
    });
  };

  render() {
    return (
      <HeaderContainer>
        <Wrapper className="header">
          <Logo href="/"> <img src={logo} alt="logo pocket" /> <span>/ &nbsp; BLOCK EXPLORER</span> </Logo>
          <Menu isHidden={this.state.isMenuHidden}>
            <StyledUl>
              <StyledLi>
                <MenuItem href="/">Home</MenuItem>
              </StyledLi>
              <StyledLi>
                <MenuItem href="/latest">Latest</MenuItem>
              </StyledLi>
              <StyledLi>
                <MenuItem href="/detail">Detail</MenuItem>
              </StyledLi>
              <StyledLi className="sub_menu">
                <MenuItem href="/"> POKT-T <img src={arrow} alt="greater than" /> </MenuItem>
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
