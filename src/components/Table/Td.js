import styled, { css } from "styled-components";
import { colors } from '../../utils/colors';
import block from '../../utils/images/block.png';
import transaction from '../../utils/images/transaction.png';
import { maxPhone, tablet, maxTablet } from "../../utils/media";

const Td = styled.td`
    text-align: left;
    color: ${colors.darkBlue};
    font-weight: 700;
    font-size: 12px;
    padding: 15px 20px;
    ${maxPhone(css`
        font-size: 14px;
        padding: 15px 10px;
    `)};
    .blocks & {
        &:first-child {
            padding-left: 42px;
            background-image: url(${block});
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 15px 10px;
        }
        &:nth-of-type(2) {
            color: ${colors.blueLink};
            font-weight: 300;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        &:nth-of-type(3) {
            color: ${colors.gray};
            font-weight: 300;
            ${tablet(css`
                text-align: center;
            `)};
            ${maxPhone(css`
                text-align: center;
            `)};
        }
        &:last-child {
            padding: 15px 19px;
            a {
                color: ${colors.blueLink};
                font-weight: 900;
                font-size: 11px;
            }
            ${maxPhone(css`
                display: none;
            `)};
            ${tablet(css`
                text-align: center;
            `)};
        }
        a {
            color: ${colors.blueLink};
            text-decoration: none;
            font-weight: 300;
        }
    }
    .transactions & {
        &:first-child {
            color: ${colors.blueLink};
            font-weight: 300;
            padding-left: 42px;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            background-image: url(${transaction});
            background-repeat: no-repeat;
            background-size: 20px 18px;
            background-position: 15px 9px;
        }
        &:nth-of-type(2) {
            color: ${colors.gray};
            font-weight: 300;
            ${tablet(css`
                text-align: center;
            `)};
            ${maxPhone(css`
                text-align: center;
            `)};
        }
        &:last-child {
            padding: 15px 19px;
            a {
                color: ${colors.blueLink};
                font-weight: 900;
                font-size: 11px;
            }
            ${maxPhone(css`
                display: none;
            `)};
            ${tablet(css`
                text-align: center;
            `)};
        }
        a {
            color: ${colors.blueLink};
            text-decoration: none;
            font-weight: 300;
        }
    }
    .l-blocks & {
        &:first-child {
            padding-left: 42px;
            background-image: url(${block});
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 15px 10px;
        }
        &:nth-of-type(2) {
            color: ${colors.blueLink};
            font-weight: 300;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        &:nth-of-type(3) {
            color: ${colors.gray};
            font-weight: 300;
            ${tablet(css`
                text-align: center;
            `)};
            ${maxPhone(css`
                text-align: center;
            `)};
        }
        &:nth-child(4) {
            padding: 15px 19px;
            a {
                color: ${colors.blueLink};
                font-weight: 900;
                font-size: 11px;
            }
            ${maxPhone(css`
                display: none;
            `)};
            ${tablet(css`
                text-align: center;
            `)};
        }
        &:nth-child(5) {
            max-width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: ${colors.blueLink};
        }
        &:nth-child(5),
        &:nth-child(6) {
            ${maxTablet(css`
                display: none;
            `)};
        }
        a {
            color: ${colors.blueLink};
            text-decoration: none;
            font-weight: 300;
        }
        img {
            max-width: 10px;
        }
    }
`;

export default Td;