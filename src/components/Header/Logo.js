import styled, { css } from "styled-components";
import { maxTablet } from "../../utils/media";

import StyledLink from "./Link";

const Brand = styled(StyledLink)`
  margin-right: auto;
  padding: 11px 14px 11px 0;
  ${maxTablet(css`
    padding: 0 14px;
  `)};

  img {
    max-width: 100px;
  }
  span {
    display: inline-block;
    vertical-align: top;
    font-weight: 300;
    font-size: 14px;
    color: #515151;
    margin-top: 17px;
    margin-left: 4px;
  }
`;

export default Brand;
