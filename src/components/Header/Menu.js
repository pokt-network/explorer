import React from "react";
import styled, { css } from "styled-components";
import { tablet, maxPhone } from "../../utils/media";
import { colors } from '../../utils/colors';

const MenuWrapper = styled.nav`
  overflow: hidden;
  display: none;
  ${maxPhone(css`
    background-color: ${colors.blue};
    padding-bottom: 30px;
  `)};

  ${tablet(css`
    display:block;
    text-align: right;
    overflow: visible;
  `)};

  ${props =>
    maxPhone(
      props.isHidden ||
        css`
        display:block;
        width: 100%;
        top: 70px;
        position: absolute;
        left: 0;
        z-index: 9999;
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