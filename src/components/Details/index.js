import React, { Component } from "react";

import Wrapper from '../../components/Wrapper';
import T from './../Table/Table';
import TTitle from './../Table/TTitle';
import Th from './../Table/Th';
import Td from './../Table/Td';
import Tr from './../Table/Tr';
import TBody from './../Table/TBody';
/* import moreThan from '../../utils/images/right arrow.png'; */

class Details extends Component {
  render () {
    return (
      <Wrapper className="details-wr">
        <T>
          <TTitle className="bd">BLOCK  DETAIL</TTitle>
          <TBody className="details-t">
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