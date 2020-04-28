import styled, { css } from "styled-components";
import { desktop } from "../../utils/media";
import { colors } from '../../utils/colors';

const StyledLink = styled.a`
  font-size: 18px;
  font-weight: 300;
  color: ${colors.black};
  text-decoration: none;

  ${desktop(css`
    &:hover {
      color: ${colors.black};
    }`)};
  
  &:last-of-type{
    padding-right: 0;
    vertical-align: middle;
  }
  .submenu & {
    font-weight: 700;
    color: ${colors.blue};
  }
`;

export default StyledLink;