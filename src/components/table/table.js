import styled, { css } from "styled-components";
import { colors } from '../../utils/colors';
import { maxPhone, tablet, tabletLandscape, desktop } from "../../utils/media";

const T = styled.table`
    position: relative;
    border-collapse: collapse;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    box-shadow: 0 6px 25px -8px rgba(0, 0, 0, 0.23);
    background-color: ${colors.white};
    .one-table-container & {
        width: 100%;
    }
    .two-tables-container & {
        ${maxPhone(css`
            width: 100%;
        `)};
        ${tablet(css`
            width: 100%;
        `)};
        ${tabletLandscape(css`
            width: 100%;
        `)};
        ${desktop(css`
            flex-basis: calc(50% - 10px);
            flex-grow: 0;
            flex-shrink: 0;
            width: calc(50% - 10px); 
        `)};
        &:nth-child(odd) {
            ${desktop(css`
                margin: 0 30px 0 0;
            `)};
        }
    }

    .one-table-container & {
        ${maxPhone(css`
            margin-top: 20px;
        `)};
    }
    .details & {
        width: 100%;
        border-top: 12px solid transparent;
        border-bottom: 13px solid transparent;
        &:first-of-type {
            margin-top: 50px;
        }
        &:last-of-type {
            margin-top: 60px;
        }
    }
`;


export default T;