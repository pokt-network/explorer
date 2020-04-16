import styled, { css } from "styled-components";
import { desktop, maxTablet } from "../../utils/media";

const HeaderContainer = styled.header`
  ${desktop(css`
    background-image: linear-gradient(0,rgba(51,51,51,0) 0%,rgba(51,51,51,0.52941) 46%,rgba(51,51,51,0.8) 100%);
    height: 150px;
  `)};
  ${maxTablet(css`
    background-color: #000;
    height: initial;
  `)};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

export default HeaderContainer;