import styled, { css } from "styled-components";
import { colors } from '../../utils/colors';

const TTitle = styled.caption`
    color: ${colors.blue};
    font-size: 21px;
    font-weight: 900;
    text-transform: uppercase;
    background-image: linear-gradient(to bottom, #fbfbfb, #f5f5f5);
    padding: 25px 20px;
    text-align: left;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

export default TTitle;