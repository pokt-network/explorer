import styled, {css} from "styled-components";
import {maxPhone, tablet, desktop} from "../../utils/media";
import { colors } from '../../utils/colors';
import close from "../../utils/images/close.png"

const HomeContent = styled.main`
  position: relative;
  
    .container { 
        position: relative; 
        margin-top: 50px;
    }
    
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        
        .right {
            margin-right: 5px;
        }
        
        .left {
            margin-left: 5px;
        }
        
        button {
            width: 180px;
            background-color: ${colors.darkGray};
            color: ${colors.white};
            margin: 0;
            padding: 10px 27px;
            position: relative;
            border-radius: 25px;
            display: inline-block;
            text-transform: initial;
            font-size: 12px;
            font-weight: 500;
            line-height: 1;
            height: auto;
            overflow: visible;
            text-decoration: none;
            transition: all .3s ease-in-out;
            border: none;
            &:hover {
                background-color: ${colors.blue};
            }
        }
    }
   
   .next-image-button {
        background-color: Transparent;
        background-repeat:no-repeat;
        border: none;
        cursor:pointer;
        overflow: hidden;
        outline:none;
        img {
            max-width: 8px;
        }
   }
  
  .alert {
      position: relative;
      max-width: 1050px;
      margin: 20px auto 40px auto;
      background-color: #07212f;
      border-radius: 10px;
      box-shadow: 0 6px 25px -8px rgba(6, 32, 46, 0.1);
      .cont-alert {
        padding: 0px 20px 30px 40px;
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
           top: 10px;
           left: 96%;
           ${maxPhone(css`
              top: 34px;
           `)};
           
           span {
              color: #ffffff;
           }
           
           img {
                position: sticky;
                max-width: 10px;
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