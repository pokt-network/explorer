import styled, { css } from "styled-components";
import { tablet } from "../../utils/media";
import { colors } from '../../utils/colors';

const StyledLink = styled.a`
  font-size: 18px;
  font-weight: 300;
  color: ${colors.black};
  text-decoration: none;

  ${tablet(css`
    &:hover {
      color: ${colors.black};
    }`)};
  
  &:last-of-type{
    padding-right: 0;
    vertical-align: middle;
  }
  .sub_menu & {
    font-weight: 700;
    color: ${colors.blue};
    img {
      width: 8px;
      transform: rotate(90deg);
      margin-left: 8px;
    }
  }
`;

export default StyledLink;