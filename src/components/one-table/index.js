import React, { Component } from "react";

import Wrapper from '../wrapper';
import T from '../table/table';
import TTitle from '../table/ttitle';
import Th from '../table/th';
import Td from '../table/td';
import Tr from '../table/tr';
import THead from '../table/thead';
import TBody from '../table/tbody';
import TFooter from '../table/tfooter';
import moreThan from '../../utils/images/right-arrow.png';
import {Link} from "react-router-dom";

class OneTable extends Component {
  render () {
    return (
      <Wrapper className="t-wrapper">
        <T>
          <TTitle>{this.props.header}</TTitle>
          <THead className="latest-blks">
            <Tr>
              <Th>{this.props.columnOne}</Th>
              <Th>{this.props.columnTwo}</Th>
              <Th>TIMESTAMP</Th>
              <Th>NETWORK</Th>
              <Th>LOREM</Th>
              <Th> </Th>
            </Tr>
          </THead>
          <TBody className={this.props.className}>
            {this.props.data.map((tableData) => {
              const idInfo = tableData.firstColumn
              const hash = tableData.secondColumn
              const timestamp = tableData.timestamp
              const network = tableData.network
              return (
                  <Tr>
                    <Td> <a href="http://example.com">{idInfo}</a> </Td>
                    <Td> <a href="http://example.com">{hash}</a> </Td>
                    <Td>{timestamp}</Td>
                    <Td> <a href="http://example.com"> {network} </a> </Td>
                    <Td> <a href="http://example.com"> 94691343T5cbd87abd8864bd87abd87a9974f1R34 </a> </Td>
                    <Td> <a href="http://example.com"> <img src={moreThan} alt="greater than" /> </a> </Td>
                  </Tr>
              )
            })}
          </TBody>
          <TFooter>
            <Tr>
              <Td colSpan={6}> 
                <a href="http://example.com" target="_blank" rel="noopener noreferrer" className="button button-1"> Load More </a> 
              </Td>
            </Tr>
          </TFooter>
        </T>
      </Wrapper>
    );
  }
}

export default OneTable;