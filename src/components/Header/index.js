import React, { Component } from "react";

import Wrapper from '.././Wrapper';
import Menu, { MenuItem } from "./Menu";
import MobileButton from "./MobileButton";
import Logo from "./Logo";
import StyledUl from "./Ul";
import StyledLi from "./Li";
import HeaderContainer from "./Header";
import logo from '../../utils/images/pocket-logo.png';

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
              <StyledLi className="submenu">
                <MenuItem href="/">POKT-T</MenuItem>
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
