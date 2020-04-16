import styled, { css } from "styled-components";
import { maxTablet } from "../../utils/media";

import StyledLink from "./Link";

const Brand = styled(StyledLink)`
  margin-right: auto;
  font-size: 32px;
  font-weight: 400;
  padding: 11px 14px 11px 0;
  ${maxTablet(css`
    font-size: 23px;
    padding: 0 14px;
  `)};

  &:hover {
    color: #ccc;
  }
`;

export default Brand;
