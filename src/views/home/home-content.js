import styled, { css } from "styled-components";
import { maxPhone, tablet, desktop } from "../../utils/media";
import close from "../../utils/images/close.png"

const HomeContent = styled.main`
  position: relative;
  
  .alert {
      position: relative;
      max-width: 1050px;
      margin: 20px auto 40px auto;
      background-color: #07212f;
      border-radius: 10px;
      box-shadow: 0 6px 25px -8px rgba(6, 32, 46, 0.1);
      .cont-alert {
        padding: 5px 20px 30px 60px;
        text-align: left;
        .title {
          h3 {
            margin-top: 0;
            text-transform: uppercase;
            color: #ffbf02;
            font-size: 18px;
            font-weight: 800;
          }
        }
        p {
          color: #ffffff;
          font-size: 14px;
          margin-bottom: 0;
        }
        button {
           position: absolute;
           width: 30px;
           height: 30px;
           background-color: #FF000000;
           background-repeat:no-repeat;
           border: none;
           cursor:pointer;
           overflow: hidden;
           outline:none;
           top: 26px;
           left: 96%;
           ${maxPhone(css`
              top: 34px;
           `)};
           
           span {
              color: #ffffff;
           }
        }
      }
      img {
        position: absolute;
        max-width: 36px;
        left: 15px;
        top: 26px;
        ${maxPhone(css`
          top: 34px;
        `)};
      }
    }
`;

export default HomeContent;