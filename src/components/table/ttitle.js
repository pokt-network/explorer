import styled from "styled-components";
import { colors } from '../../utils/colors';
import blockW from '../../utils/images/block-w.png';

const TTitle = styled.caption`
    font-family: 'Open Sans', sans-serif;
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
    .details & {
        &.bd {
            background-image: url(${blockW}), linear-gradient(95deg, ${colors.blue} 28%, ${colors.darkBlue} 113%);
            background-repeat: no-repeat, no-repeat;
            background-size: 20px, cover;
            background-position: 20px 27px, center;
            color: ${colors.white};
            padding: 25px 20px 25px 50px;
        }
    }
`;

export default TTitle;