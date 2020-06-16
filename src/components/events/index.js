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

class EventTable extends Component {
    render () {
        return (
            <Wrapper className="t-wrapper">
                <T>
                    <TTitle>
                        EVENTS
                    </TTitle>
                    <THead className="latest-blks">

                            {this.props.events.map((event) => {
                                const eventName = event.type
                                return (
                                    <Tr>
                                        <Th>TYPE</Th>
                                        <Th>{eventName}</Th>
                                    </Tr>
                                )
                            })}
                    </THead>
                    <TBody>
                        {this.props.events.map((event) => {
                            const attributes = event.attributes.map((attribute) => {
                                return (
                                    <Tr>
                                        <Td>
                                            {attribute.key.toUpperCase()}
                                        </Td>
                                        <Td>
                                            {attribute.value}
                                        </Td>
                                    </Tr>
                                )
                            })

                            return (
                                <Tr>
                                    <Th>ATTRIBUTES</Th>
                                    {attributes}
                                </Tr>
                            )
                        })}

                    </TBody>
                </T>
            </Wrapper>
        );
    }
}

export default EventTable;

