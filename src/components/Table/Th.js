import styled, { css } from "styled-components";
import { colors } from '../../utils/colors';
import { maxPhone, maxTablet } from "../../utils/media";

const Th = styled.th`
    text-align: left;
    font-size: 12px;
    color: ${colors.darkBlue};
    font-weight: 900;
    text-transform: uppercase;
    padding: 20px 20px;
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
    }
    .trns & {
        &:nth-child(2) {
            ${maxTablet(css`
                text-align: center;
            `)};
        }
    }
`;

export default Th;