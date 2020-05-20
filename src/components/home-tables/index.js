import React, { Component } from "react"

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
                            const blockLink = `${window.location}/block/${blockHeightStr}`
                            const blockID = block.id
                            return (
                                <Tr>
                                    <Td>
                                        <a href={blockLink}>{blockHeightStr}</a>
                                    </Td>
                                    <Td>
                                        <a href={blockLink}>{blockID}</a>
                                    </Td>
                                    <Td>34 sec ago</Td>
                                    <Td>
                                        <a href={blockLink}>POKT</a>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </TBody>
                    {/* <TFooter>
                        <Tr>
                            <Td colSpan={4}>
                                <a
                                    href="http://example.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button button-1"
                                >
                                    {" "}
                                    View all Blocks{" "}
                                </a>
                            </Td>
                        </Tr>
                    </TFooter> */}
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
                            const transactionLink = `${window.location}/transaction/${transactionID}`
                            const transactionTimestamp = transaction.timestamp
                            return (
                                <Tr>
                                    <Td>
                                        <a href={transactionLink}>
                                            {transactionID}
                                        </a>
                                    </Td>
                                    <Td>{transactionTimestamp}</Td>
                                    <Td>
                                        <a href={transactionLink}>POKT</a>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </TBody>
                    <TFooter>
                        {/* <Tr>
                            <Td colSpan={4}>
                                <a
                                    href="http://example.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button button-1"
                                >
                                    {" "}
                                    View all Blocks{" "}
                                </a>
                            </Td>
                        </Tr> */}
                    </TFooter>
                </T>
            </Wrapper>
        )
    }
}

export default HomeTables
