import styled, { css } from "styled-components";
import { colors } from '../../utils/colors';
import block from '../../utils/images/block.png';
import blockG from '../../utils/images/block-g.png';
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
    a {
        color: ${colors.blueLink};
        text-decoration: none;
        font-weight: 300;
    }
    .blocks & {
        &:first-child {
            padding-left: 50px;
            background-image: url(${blockG});
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 20px 10px;
            ${maxPhone(css`
                background-position: 10px 13px;
                padding-left: 40px;
            `)};
        }
        &:nth-of-type(2) {
            color: ${colors.blueLink};
            font-weight: 300;
            max-width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            ${maxPhone(css`
                max-width: 120px;
            `)};
        }
        &:nth-of-type(3) {
            color: ${colors.gray};
            font-weight: 300;
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
    }
    .transactions & {
        &:first-child {
            color: ${colors.blueLink};
            font-weight: 300;
            padding-left: 50px;
            max-width: 220px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            background-image: url(${transaction});
            background-repeat: no-repeat;
            background-size: 20px 18px;
            background-position: 20px 12px;
            ${maxPhone(css`
                max-width: 120px;
                background-position: 10px 13px;
                padding-left: 40px;
            `)};
        }
        &:nth-of-type(2) {
            color: ${colors.gray};
            font-weight: 300;
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
    }
    .l-blocks & {
        &:first-child {
            padding-left: 50px;
            background-image: url(${block});
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: 20px 12px;
            ${maxPhone(css`
                max-width: 120px;
                background-position: 10px 13px;
                padding-left: 40px;
            `)};
        }
        &:nth-of-type(2) {
            color: ${colors.blueLink};
            font-weight: 300;
            max-width: 170px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            ${maxPhone(css`
                max-width: 90px;
            `)};
        }
        &:nth-of-type(3) {
            color: ${colors.gray};
            font-weight: 300;
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
        img {
            max-width: 8px;
        }
    }
    .details & {
        padding: 13px 20px;
    }
    tr:first-of-type & {
        .details & {
            font-size: 12px;
            color: ${colors.darkBlue};
            font-weight: 900;
            text-transform: uppercase;
        }
    }
    tr:nth-of-type(2) & {
        .details & {
            color: ${colors.gray};
            font-weight: 300;
            ${maxPhone(css`
                max-width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            `)};
        }
    }
    tr:nth-of-type(3) & {
        .details & {
            color: ${colors.gray};
            font-weight: 300;
        }
    }
    tr:nth-of-type(4) & {
        .details & {
            color: ${colors.blueLink};
            font-weight: 900;
            font-size: 11px;
        }
    }
`;

export default Td;