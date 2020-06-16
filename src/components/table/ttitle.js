import styled from "styled-components";
import { colors } from '../../utils/colors';
import blockW from '../../utils/images/block-w.png';
import tx from '../../utils/images/transaction.png';
import acc from '../../utils/images/account.png';

const TTitle = styled.caption`
    font-family: 'Open Sans', sans-serif;
    color: ${colors.blue};
    font-size: 21px;
    font-weight: 900;
    text-transform: uppercase;
    background-image: linear-gradient(to bottom, #fbfbfb, #f5f5f5);
    padding: 25px 20px;
    text-align: left;
    position: relative;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    .one-table-container & {
        color: ${colors.white};
        background-image: linear-gradient(95deg, ${colors.blue} 28%, ${colors.darkBlue} 113%);
    }
    .white & {
        color: ${colors.blue} !important;
        background-image: linear-gradient(to bottom, #fbfbfb, #f5f5f5) !important;
    }
    .right-container {
        position: sticky;
        left: 100%;
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
        
        &.tx {
            background-image: url(${tx}), linear-gradient(95deg, ${colors.blue} 28%, ${colors.darkBlue} 113%);
            background-repeat: no-repeat, no-repeat;
            background-size: 20px, cover;
            background-position: 20px 27px, center;
            color: ${colors.white};
            padding: 25px 20px 25px 50px;
        }
        
        &.acc {
            background-image: url(${acc}), linear-gradient(95deg, ${colors.blue} 28%, ${colors.darkBlue} 113%);
            background-repeat: no-repeat, no-repeat;
            background-size: 20px, cover;
            background-position: 20px 27px, center;
            color: ${colors.white};
            padding: 25px 20px 25px 50px;
        }
        
        &.events {
            background-image: linear-gradient(95deg, ${colors.gray} 28%, ${colors.darkGray} 113%);
            background-repeat: no-repeat, no-repeat;
            background-size: 20px, cover;
            background-position: 20px 27px, center;
            color: ${colors.white};
            padding: 25px 20px 25px 50px;
        }
    }
`;

export default TTitle;