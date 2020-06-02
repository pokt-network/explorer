import styled, { css } from "styled-components";
import { colors } from '../../utils/colors';
import search from '../../utils/images/search.png';
import searchW from '../../utils/images/search-w.png'
import { phone } from "../../utils/media";

const SearchContent = styled.section`
  background-image: linear-gradient(97deg, #27a9e0 28%, #06202e 79%);
  padding: 40px 0;
  ${phone(css`
    padding: 20px 0;
  `)};
  form {
    position: relative;
    width: 100%;
    input[type="text"] {
      width: calc(100% - 60px);
      border-radius: 25px;
      border: none;
      background-color: ${colors.white};
      box-shadow: none;
      padding: 12px 20px 12px 40px;
      background-image: url(${search});
      background-repeat: no-repeat;
      background-size: 13px;
      background-position: 22px 15px;
      ${phone(css`
        background-image: none;
        padding: 12px 20px;
        width: calc(100% - 40px);
      `)};
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: ${colors.lightGray};
        opacity: 1;
        font-size: 12px;
      }
    }
    input[type="button"] {
      background-color: ${colors.blue};
      color: ${colors.white};
      font-size: 12px;
      border-radius: 25px;
      padding: 10.5px 26.5px;
      position: absolute;
      right: 10px;
      top: 4px;
      border: none;
      ${phone(css`
        right: 0;
        top: 0;
        padding: 14.5px 24px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        text-indent: -9999px;
        background-image: url(${searchW});
        background-repeat: no-repeat;
        background-size: 14px;
        background-position: 16px 14px;
      `)};
      &:focus {
          color: #fff;
      }
      &:hover {
          background-color: ${colors.darkGray};
          cursor: pointer;
      }
    }
  }
`;

export default SearchContent;