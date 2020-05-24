import React, { Component } from "react"

import Wrapper from "../Wrapper"
import StatisticsWrapper from "./statistics-wrapper"
import Statistic from "./Statistic"
import Number from "./Number"
import Description from "./Description"

class Statistics extends Component {
    render() {
        return (
            <Wrapper>
                <StatisticsWrapper>
                    <Statistic>
                        <Number>{this.props.totalStakedNodes}</Number>
                        <Description>Total Staked Nodes</Description>
                    </Statistic>
                    <Statistic>
                        <Number>{this.props.totalStaked} POKT</Number>
                        <Description>Total Staked</Description>
                    </Statistic>
                    <Statistic>
                        <Number>{this.props.totalStakedApps}</Number>
                        <Description>Total Staked Apps</Description>
                    </Statistic>
                </StatisticsWrapper>
            </Wrapper>
        )
    }
}

export default Statistics
