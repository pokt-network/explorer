import styled, { css } from "styled-components";
import { maxPhone, tablet, desktop } from "../../utils/media";

const Statistic = styled.div`
  margin: 0 0 25px 0;
  padding: 30px 0;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 6px 25px -8px rgba(0, 0, 0, 0.23);

  &:first-of-type {
    ${maxPhone(css`
      width: 100%; 
      margin-bottom: 25px;
    `)};
  }
  &:nth-of-type(2),
  &:nth-of-type(3) {
    ${maxPhone(css`
      flex-basis: calc(50% - 12.5px);
      flex-grow: 0;
      flex-shrink: 0;
      width: calc(50% - 12.5px); 
    `)};
  }
  ${maxPhone(css`
    &:nth-of-type(2) {
      margin: 0 25px 50px 0;
  	}
  `)};

  ${tablet(css`
    flex: 0 0 calc(33.33% - 20px);
    width: calc(33.33% - 20px); 
  `)};
  ${desktop(css`
    flex: 0 0 calc(33.33% - 33.33px);
    width: calc(33.33% - 33.33px); 
  `)};

  ${tablet(css`
    margin: 0 30px 30px 0;
  `)};
  ${desktop(css`
    margin: 0 50px 50px 0;
  `)};
  
  &:nth-child(3n + 3) {
    margin: 0 0 50px;
    ${tablet(css`
      margin: 0 0 30px;
    `)};
    ${desktop(css`
      margin: 0 0 50px;
  `)};
  } /* &:last-child */

`;

export default Statistic;