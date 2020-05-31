import React, { Component } from "react";

import Wrapper from '../wrapper';
import T from '../table/table';
import TTitle from '../table/ttitle';
import Th from '../table/th';
import Td from '../table/td';
import Tr from '../table/tr';
import TBody from '../table/tbody';

class Details extends Component {
  render () {
    return (
      <Wrapper className="details-wr">
        <T>
          <TTitle className="bd">{this.props.header}</TTitle>
          <TBody className="details-t">
            <Tr>
              <Th>{this.props.line1Header}</Th>
              <Td> {this.props.line1Data} </Td>
            </Tr>
            <Tr>
              <Th>{this.props.line2Header}</Th>
              <Td> {this.props.line2Data} </Td>
            </Tr>
            <Tr>
              <Th>{this.props.line3Header}</Th>
              <Td>{this.props.line3Data}</Td>
            </Tr>
            <Tr>
              <Th>{this.props.line4Header}</Th>
              <Td>{this.props.line4Data}</Td>
            </Tr>
          </TBody>
        </T>
        <T>
          <TTitle>ADDITIONAL INFORMATION</TTitle>
          <TBody className="additional-i">
            <Tr>
              <Th>BLOCK #</Th>
              <Td> 36792 </Td>
            </Tr>
            <Tr>
              <Th>BLOCK HASH</Th>
              <Td> a969144c864bd87abd87a9974f187a9974f1 </Td>
            </Tr>
            <Tr>
              <Th>TIMESTAMP</Th>
              <Td>34 sec ago</Td>
            </Tr>
            <Tr>
              <Th>NETWORK</Th>
              <Td>POCKET TESTNET</Td>
            </Tr>
          </TBody>
        </T>
      </Wrapper>
    );
  }
}

export default Details;