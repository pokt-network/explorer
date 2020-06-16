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
          <TTitle>
            {this.props.header}
            {this.props.rightComponent}
          </TTitle>
          <THead className="latest-blks">
            <Tr>
              <Th>{this.props.columnOne}</Th>
              <Th>{this.props.columnTwo}</Th>
              <Th>TIMESTAMP</Th>
              <Th>{this.props.columnThree}</Th>
              <Th> </Th>
            </Tr>
          </THead>
          <TBody className={this.props.className}>
            {this.props.data.map((tableData) => {
              const idInfo = tableData.secondColumn
              const hash = tableData.firstColumn
              const timestamp = tableData.timestamp
              const network = tableData.extraInfo
              const blockHeightStr = idInfo.toString()
              const blockLink = `../${this.props.link}/${blockHeightStr}`
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
                    <Td>
                      <Link to={{pathname: `${blockLink}`, query: {blockHeightStr}}}> <img src={moreThan} alt="greater than" /> </Link>
                    </Td>
                  </Tr>
              )
            })}
          </TBody>
          <TFooter>

          </TFooter>
        </T>
      </Wrapper>
    );
  }
}

export default OneTable;