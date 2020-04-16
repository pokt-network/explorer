import styled, { css } from "styled-components";
import { maxTablet } from "../utils/media";

const Wrapper = styled.div`
  width: 100%;
  max-width: 96%;
  margin: 0 auto;
  display: flex;
  @media (min-width: 900px) {
    max-width: 870px;
  }
  @media (min-width: 1100px) {
    max-width: 1024px;
  }
  &.header {
    height: 100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    ${maxTablet(css`
      height: 70px;
  `)};
  }
`;

export default Wrapper;
