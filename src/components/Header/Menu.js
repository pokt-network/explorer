import React from "react";
import styled, { css } from "styled-components";
import { desktop, maxTablet } from "../../utils/media";

import StyledLink from "./Link";

const MenuWrapper = styled.div`
  overflow: hidden;
  display: none;

  ${desktop(css`
    display:block;
    text-align: right;
  `)};

  ${props =>
    maxTablet(
      props.isHidden ||
        css`
        display:block;
        width: 100%;
        top: 70px;
        position: absolute;
        left: 0;
      `
    )};
`;

const MenuItem = styled(StyledLink)`
  ${props =>
    maxTablet(
      props.isHidden ||
        css`
      float: none;
      display:block;
      text-align: left;
      letter-spacing: 1px;
      border-bottom: 1px solid #fff;
      font-size: 18px;
      color: #fff;
      background-color: #000;

      &:active {
        background-color: #e6e6e6;
        font-weight: bold;
      }
    `
    )};
`;

function Menu(props) {
  const children = props.children;

  return (
    <MenuWrapper isHidden={props.isHidden}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { isHidden: props.isHidden })
      )}
    </MenuWrapper>
  );
}

export default Menu;
export { MenuItem };