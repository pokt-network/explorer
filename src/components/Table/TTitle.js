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
    .one-table-container & {
        color: ${colors.white};
        background-image: linear-gradient(95deg, ${colors.blue} 28%, ${colors.darkBlue} 113%);
    }
`;

export default TTitle;