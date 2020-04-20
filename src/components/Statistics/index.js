import React, { Component } from "react";

import Wrapper from '../../components/Wrapper';
import StatisticsWrapper from './StatisticsWrapper';
import Statistic from './Statistic';
import Number from './Number';
import Description from './Description';

class Statistics extends Component {
  render () {
    return (
      <Wrapper>
        <StatisticsWrapper>
          <Statistic>
            <Number>
              4961
            </Number>
            <Description>
              Total Staked Nodes
            </Description>
          </Statistic>
          <Statistic>
            <Number>
              265
            </Number>
            <Description>
              Total Staked
            </Description>
          </Statistic>
          <Statistic>
            <Number>
              47534 POKT  
            </Number>
            <Description>
              Total Staked  
            </Description>
          </Statistic>
        </StatisticsWrapper>
      </Wrapper>
    );
  }
}

export default Statistics;