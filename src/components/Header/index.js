import React, { Component } from "react";

import Wrapper from '.././Wrapper';
import Menu, { MenuItem } from "./Menu";
import MobileButton from "./MobileButton";
import Logo from "./Logo";
import HeaderContainer from "./Header";

class NavBar extends Component {
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
          <Logo href="/">Block Explorer</Logo>
          <Menu isHidden={this.state.isMenuHidden}>
            <MenuItem href="/latest">Latest</MenuItem>
            <MenuItem href="/detail">Detail</MenuItem>
          </Menu>
          <MobileButton onClick={this.onToggleMenu} />
        </Wrapper>
      </HeaderContainer>
    );
  }
}

export default NavBar;
