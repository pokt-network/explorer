import React from "react";
import styled, { css } from "styled-components";
import { desktop, maxTablet } from "../../utils/media";

import StyledLink from "./Link";

const MenuButton = styled(StyledLink).attrs({
  height: null,
  width: null
})`
  height: 16px;
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  line-height: 14px;
  cursor: pointer;

  ${desktop(css`
    display: none;
  `)};
  ${maxTablet(css`
    font-size: 36px;
    right: 5%;
    top: 13px;
  `)};
`;

export default props => <MenuButton {...props}>&#9776;</MenuButton>;
