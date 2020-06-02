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
              <Th> </Th>
            </Tr>
          </THead>
          <TBody className={this.props.className}>
            {this.props.data.map((tableData) => {
              const idInfo = tableData.secondColumn
              const hash = tableData.firstColumn
              const timestamp = tableData.timestamp
              const network = tableData.network
              const blockHeightStr = idInfo.toString()
              const blockLink = `../block/${blockHeightStr}`
              return (
                  <Tr>
                    <Td>
                      <Link to={{pathname: `${blockLink}`, query: {blockHeightStr}}}>{idInfo}</Link>
                    </Td>
                    <Td>
                      <Link to={{pathname: `${blockLink}`, query: {blockHeightStr}}}>{hash}</Link>
                    </Td>
                    <Td>{timestamp}</Td>
                    <Td>{network}</Td>
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