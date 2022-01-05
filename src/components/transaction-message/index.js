import React, { Component } from "react";

import Wrapper from "../wrapper";
import T from "../table/table";
import TTitle from "../table/ttitle";
import Th from "../table/th";
import Td from "../table/td";
import Tr from "../table/tr";
import THead from "../table/thead";
import TBody from "../table/tbody";
import { TxMessage } from "../../models/message";

class TransactionMessage extends Component {
  constructor(props) {
    super(props);
    const message = new TxMessage(props.msg);
    this.state = {
      message: message.rendered,
    };
  }

  render() {
    return (
      <Wrapper className="t-wrapper">
        <T>
          <TTitle>MESSAGE</TTitle>
          <THead className="latest-blks">
            <Tr>
              <Th>TYPE</Th>
              <Th
                style={{
                  display: "block",
                }}
              >
                {this.state.message.action}
              </Th>
            </Tr>
          </THead>
          <TBody>
            {Object.keys(this.state.message).map((msgKey) => {
              return msgKey === "action" ? null : (
                <Tr key={this.state.message[msgKey].name}>
                  <Td>{this.state.message[msgKey].name}</Td>
                  {this.state.message[msgKey].name === "Result Code" ? (
                    <Td
                      style={
                        this.state.message[msgKey].value !== "OK"
                          ? {
                              color: "#F93232",
                            }
                          : {
                              color: "#1D6D42",
                            }
                      }
                    >
                      {this.state.message[msgKey].value}
                    </Td>
                  ) : (
                    <Td>{this.state.message[msgKey].value}</Td>
                  )}
                </Tr>
              );
            })}
          </TBody>
        </T>
      </Wrapper>
    );
  }
}

export default TransactionMessage;
