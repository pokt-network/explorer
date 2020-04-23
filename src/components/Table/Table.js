import styled, { css } from "styled-components";
import { colors } from '../../utils/colors';
import { maxPhone, tablet, maxTablet, tabletLandscape, desktop } from "../../utils/media";

const T = styled.table`
    border-collapse: collapse;
    border-radius: 12px;
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
        margin-top: 50px;
    }
    .two-tables-container &,
    .one-table-container & {
        @media only screen and (min-width: 1024px) and (max-width: 1199px) {
            &:last-child {
                margin-top: 50px;
            }
        }
        ${maxTablet(css`
            margin-top: 30px;
        `)};
    }
`;


export default T;