import React, { Component } from "react";

import Wrapper from '../wrapper';
import T from '../table/table';
import TTitle from '../table/ttitle';
import Th from '../table/th';
import Td from '../table/td';
import Tr from '../table/tr';
import THead from '../table/thead';
import TBody from '../table/tbody';
import { TxMessage } from "../../models/message";

class TransactionMessage extends Component {
    constructor(props) {
      super(props);
      const message = new TxMessage(props.msg);
      this.state = {
        message: message.renderedMessage,
      }
    }

    render () {
        return (
            <Wrapper className="t-wrapper">
                <T>
                    <TTitle>
                       MESSAGE
                    </TTitle>
                    <THead className="latest-blks">
                      <Tr>
                        <Th>TYPE</Th>
                        <Th>{this.state.message.action}</Th>
                      </Tr>
                    </THead>
                    <TBody>
                      {
                        Object.keys(this.state.message).map((msgKey) => {
                          return msgKey === "action" ? null : (
                            <Tr>
                              <Td>
                                  {this.state.message[msgKey].name}
                              </Td>
                              <Td>
                                  {this.state.message[msgKey].value}
                              </Td>
                            </Tr>
                          )
                        })
                      }
                    </TBody>
                </T>
            </Wrapper>
        );
    }
}

export default TransactionMessage;

