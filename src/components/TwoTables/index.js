import React, { Component } from "react";

import Wrapper from '../../components/Wrapper';
import T from './Table';
import TTitle from './TTitle';
import Th from './Th';
import Td from './Td';
import Tr from './Tr';
import THead from './THead';
import TBody from './TBody';
import TFooter from './TFooter';

class TwoTables extends Component {
  render () {
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
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">36792</a> </Td>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
          </TBody>
          <TFooter>
            <Tr>
              <Td colSpan={4}> 
                <a href="#" target="_blank" className="button button-1"> View all Blocks </a> 
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
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
            <Tr>
              <Td> <a href="http://example.com">a969144c864bd87abd87a9974f187a9974f1</a> </Td>
              <Td>34 sec ago</Td>
              <Td> <a href="http://example.com">POKT- T</a> </Td>
            </Tr>
          </TBody>
          <TFooter>
            <Tr>
              <Td colSpan={4}> 
                <a href="#" target="_blank" className="button button-1"> View all Blocks </a> 
              </Td>
            </Tr>
          </TFooter>
        </T>
      </Wrapper>
    );
  }
}

export default TwoTables;