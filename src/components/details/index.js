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
          <TTitle className={this.props.className}>{this.props.header}</TTitle>
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
        {this.props.data1Header !== undefined ?
          <T>
            <TTitle>ADDITIONAL INFORMATION</TTitle>
            <TBody className="additional-i">
              <Tr>
                <Th>{this.props.data1Header}</Th>
                <Td> {this.props.data1} </Td>
              </Tr>
              <Tr>
                <Th>{this.props.data2Header}</Th>
                <Td> {this.props.data2} </Td>
              </Tr>
              <Tr>
                <Th>{this.props.data3Header}</Th>
                <Td> {this.props.data3} </Td>
              </Tr>
              <Tr>
                <Th>{this.props.data4Header}</Th>
                <Td> {this.props.data4} </Td>
              </Tr>
            </TBody>
          </T>
        : ""}
      </Wrapper>
    );
  }
}

export default Details;