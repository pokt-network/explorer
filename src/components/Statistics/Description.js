import styled, { css } from 'styled-components';
import { colors } from '../../utils/colors';
import { maxPhone } from "../../utils/media";

const Description = styled.div`
  font-size: 14px;
  line-height: 1em;
  color: ${colors.gray};
  font-weight: 300;
  ${maxPhone(css`
    font-size: 16px;
  `)};
`;

export default Description;