import styled, { css } from "styled-components";
import { maxTablet, phone } from "../../utils/media";

const FooterContent = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  background-image: linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%);
  background-position: top;
  background-size: 5px 1px;
  background-repeat: repeat-x;
  ${phone(css`
    padding-bottom: 35px;
    .nav-f.left {
      padding-bottom: 20px;
    }
    .nav-f.right {
      padding-left: 0;
      padding-top: 10px;
    }
  `)};
  @media (max-width: 500px)  and (orientation: portrait){
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }
  .nav-f {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    &.left {
      padding-left: 0;
    }
    a.nav-f {
      cursor: pointer;
      font-size: 12px;
      margin-right: 25px;
      text-decoration: none;
      color: #333;
      font-weight: 300;
      ${maxTablet(css`
        font-size: 13px;
        &:last-of-type {
          margin-right: 0;
        }
      `)};
    }
    span {
      margin-left: 30px;
      font-size: 12px;
      font-weight: 300;
      color: #666666;
    }
    .icon-social {
      height: 25px;
      width: auto;
      padding-left: 23px;
    }
  }
`;

export default FooterContent;