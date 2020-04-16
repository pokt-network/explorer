import styled, { css } from "styled-components";
import { desktop } from "../../utils/media";

const StyledLink = styled.a`
  font-size: 16px;
  font-weight: 300;
  color: #fff;
  display: inline-block;
  text-align: center;
  padding: 15px 25px 15px 25px;
  text-decoration: none;

  ${desktop(css`
    &:hover {
      color: #ccc;
    }`)};
  
  &:last-of-type{
    padding-right: 0;
    vertical-align: middle;
  }
`;

export default StyledLink;