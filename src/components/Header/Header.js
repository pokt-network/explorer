import styled, { css } from "styled-components";
import { desktop, maxTablet } from "../../utils/media";

const HeaderContainer = styled.header`
  ${desktop(css`
    background-color: #ccc;
    height: 150px;
  `)};
  ${maxTablet(css`
    background-color: #000;
    height: initial;
  `)};
  position: relative;
  width: 100%;
`;

export default HeaderContainer;