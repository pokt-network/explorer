import styled, { css } from "styled-components";
import { colors } from '../../utils/colors';
import { maxPhone, maxTablet } from "../../utils/media";

const Th = styled.th`
    font-family: 'Open Sans', sans-serif;
    text-align: left;
    font-size: 12px;
    color: ${colors.darkBlue};
    font-weight: 900;
    text-transform: uppercase;
    padding: 25px 20px 15px 21px;
    ${maxPhone(css`
        padding: 15px 10px;
    `)};
    &:last-child {
        ${maxPhone(css`
            display: none;
        `)};
    }
    .blk & {
        &:nth-child(3) {
            ${maxTablet(css`
                text-align: center;
            `)};
            ${maxPhone(css`
                text-align: center;
            `)};
        }
        &:nth-child(3) {
            text-align: left;
        }
    }
    .trns & {
        &:nth-child(2) {
            ${maxTablet(css`
                text-align: center;
            `)};
            text-align: left;
        }
    }
    .latest-blks & {
        &:nth-child(4) {
            ${maxPhone(css`
                display: none;
            `)};
        }
        &:nth-child(5),
        &:nth-child(6) {
            ${maxTablet(css`
                display: none;
            `)};
        }
    }
    .details-t & {
        max-width: 100px;
        width: 100px;
        word-wrap: break-word;
        padding: 13px 20px;
    }
    .additional-i & {
        max-width: 180px;
        width: 180px;
        word-wrap: break-word;
        padding: 13px 20px;
        ${maxPhone(css`
            max-width: 100px;
            width: 100px;
        `)};
    }
    .details-t &,
    .additional-i & {
        ${maxPhone(css`
            padding: 13px 9px !important;
        `)};
        ${maxTablet(css`
            padding: 13px 20px;
        `)};
    }
`;

export default Th;