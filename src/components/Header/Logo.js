import styled, { css } from "styled-components";
import { maxTablet, tablet } from "../../utils/media";

import StyledLink from "./Link";

const Brand = styled(StyledLink)`
  margin-right: auto;
  padding: 11px 14px 11px 0;
  text-decoration: none;
  ${tablet(css`
    padding: 0 14px;
  `)};

  img {
    max-width: 100px;
    ${tablet(css`
      vertical-align: middle;
    `)};
  }
  span {
    display: inline-block;
    vertical-align: top;
    font-weight: 300;
    font-size: 14px;
    color: #515151;
    margin-top: 17px;
    margin-left: 4px;
    ${maxTablet(css`
      display: none;
    `)};
  }
`;

export default Brand;
