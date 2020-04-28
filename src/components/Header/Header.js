import styled, { css } from "styled-components";
import { desktop, maxTablet } from "../../utils/media";
import { colors } from '../../utils/colors';

const HeaderContainer = styled.header`
  ${desktop(css`
    background-color: ${colors.white};
    height: 120px;
  `)};
  ${maxTablet(css`
    background-color: #000;
    height: initial;
  `)};
  position: relative;
  width: 100%;
`;

export default HeaderContainer;