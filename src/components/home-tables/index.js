import React, { Component } from "react"
import { Link } from 'react-router-dom';

import Wrapper from "../Wrapper"
import T from "../Table/Table"
import TTitle from "../Table/TTitle"
import Th from "../Table/Th"
import Td from "../Table/Td"
import Tr from "../Table/Tr"
import THead from "../Table/THead"
import TBody from "../Table/TBody"
import TFooter from "../Table/TFooter"

class HomeTables extends Component {
    render() {
        return (
            <Wrapper className="t-wrapper">
                <T>
                    <TTitle>LATEST BLOCKS</TTitle>
                    <THead className="blk">
                        <Tr>
                            <Th>BLOCK #</Th>
                            <Th>HASH</Th>
                            <Th>TIMESTAMP</Th>
                            <Th> </Th>
                        </Tr>
                    </THead>
                    <TBody className="blocks">
                        {this.props.blocks.map((block) => {
                            const blockHeightStr = block.number.toString()
                            const blockLink = `block/${blockHeightStr}`
                            const blockID = block.id
                            return (
                                <Tr>
                                    <Td>
                                        <Link to={{pathname: `${blockLink}`, query: {blockHeightStr}}}>{blockHeightStr}</Link>
                                    </Td>
                                    <Td>
                                        <Link to={{pathname: `${blockLink}`, query: {blockHeightStr}}}>{blockID}</Link>
                                    </Td>
                                    <Td>34 sec ago</Td>
                                    <Td>
                                        <Link to={{pathname: `${blockLink}`, query: {blockHeightStr}}}>POKT</Link>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </TBody>
                    <TFooter>
                        <Tr>
                            <Td colSpan={4}>
                                <Link to={"/latest/block"} className="button button-1">
                                    View all Blocks
                                </Link>
                            </Td>
                        </Tr>
                    </TFooter>
                </T>
                <T>
                    <TTitle>LATEST TRANSACTIONS</TTitle>
                    <THead className="trns">
                        <Tr>
                            <Th> TX HASH</Th>
                            <Th>TIMESTAMP</Th>
                            <Th> </Th>
                        </Tr>
                    </THead>
                    <TBody className="transactions">
                        {this.props.transactions.map((transaction) => {
                            const transactionID = transaction.id
                            const transactionLink = `tx/${transactionID}`
                            const transactionTimestamp = transaction.timestamp
                            return (
                                <Tr>
                                    <Td>
                                        <Link to={{pathname: `${transactionLink}`, query: {transactionID}}}>{transactionID}</Link>
                                    </Td>
                                    <Td>{transactionTimestamp}</Td>
                                    <Td>
                                        <Link to={{pathname: `${transactionLink}`, query: {transactionID}}}>POKT</Link>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </TBody>
                    <TFooter>
                        <Tr>
                            <Td colSpan={4}>
                                <Link to={"/latest/tx"} className="button button-1">
                                    View all Blocks
                                </Link>
                            </Td>
                        </Tr>
                    </TFooter>
                </T>
            </Wrapper>
        )
    }
}

export default HomeTables
