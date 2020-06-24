import styled, {css} from "styled-components";
import {maxPhone, maxTablet, maxTabletLandscape} from "../utils/media";
import { colors } from '../utils/colors';

const Wrapper = styled.div`
  width: 100%;
  max-width: 96%;
  margin: 0 auto;
  display: flex;
  ${maxTabletLandscape(css`
    &.t-wrapper {
        display: block;
    }
  `)};
  &.details-wr {
    display: block;
  }
  ${maxPhone(css`
    &.footer-w {
      display: block;
   }
  `)};
  
  .no-background-button {
      background-color: ${colors.white};
      color: ${colors.blue};
      margin: 0;
      padding: 10px 27px;
      display: inline-block;
      text-transform: initial;
      font-size: 15px;
      font-family: Lato;
      font-weight: normal;
      line-height: 1;
      height: auto;
      overflow: visible;
      text-decoration: none;
      border: none;
      outline:none;
      &:hover {
        background-color: ${colors.white};
        color: ${colors.darkGray};
        .right-img {
          background: white url("right-arrow-hover.png") no-repeat;
        }
        .left-img {
          background: white url("left-arrow-hover.png") no-repeat;
        }
      }
      .right-img {
          background: white url("right-arrow.png") no-repeat;
          background-repeat: no-repeat;
          width: 8px;
          height: 14px;
      }
      
      .left-img {
          background: white url("left-arrow.png") no-repeat;
          background-repeat: no-repeat;
          width: 8px;
          height: 14px;
      }
  }
      
  }
  .right {
    left: 100%;
    position: sticky;
  }
  @media (min-width: 900px) {
    max-width: 870px;
  }
  @media (min-width: 1200px) {
    max-width: 1100px;
  }
  &.header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    ${maxTablet(css`
      height: 70px;
      grid-template-columns: 0.5fr 1.5fr;
  `)};
  }
`;

export default Wrapper;
