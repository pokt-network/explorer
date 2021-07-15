import React, { Component } from "react"

import Wrapper from "../wrapper"
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
                        <Number>5000&plus;</Number>
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
