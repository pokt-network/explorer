import styled, { css } from "styled-components";
import { tablet, maxPhone } from "../../utils/media";
import { colors } from '../../utils/colors';

const HeaderContainer = styled.header`
  ${tablet(css`
    background-color: ${colors.white};
    height: 100px;
    padding-top: 8px;
  `)};
  ${maxPhone(css`
    background-color: #fff;
    height: initial;
  `)};
  position: relative;
  width: 100%;
`;

export default HeaderContainer;