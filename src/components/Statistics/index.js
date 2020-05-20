import React, { Component } from "react"

import Wrapper from "../Wrapper"
import StatisticsWrapper from "./statistics-wrapper"
import Statistic from "./statistic"
import Number from "./number"
import Description from "./description"

class Statistics extends Component {
    render() {
        return (
            <Wrapper>
                <StatisticsWrapper>
                    <Statistic>
                        <Number>{this.props.totalStakedNodes} POKT</Number>
                        <Description>Nodes Total Stake</Description>
                    </Statistic>
                    <Statistic>
                        <Number>{this.props.totalStaked} POKT</Number>
                        <Description>Total Staked</Description>
                    </Statistic>
                    <Statistic>
                        <Number>{this.props.totalStakedApps} POKT</Number>
                        <Description>Apps Total Stake</Description>
                    </Statistic>
                </StatisticsWrapper>
            </Wrapper>
        )
    }
}

export default Statistics
