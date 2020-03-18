import React, { useState } from 'react';
import { VerticalContainer, Text, Row, Image } from '../common';

const styles = {
    width: '100%', 
    alignItems: 'flex-start', 
    marginLeft: '20px',
    marginTop: '15px',
    cursor: 'pointer'
}

export const DropdownMenu = (props) => {

    const init_open = props.initOpen ? props.initOpen: false;
    const [isOpen, setIsOpen] = useState(init_open);

    const image = () => {
        if (isOpen) {
            return require('../../images/arrow_up.png');
        }
        return require('../../images/arrow_down.png')
    }

    return (
        <VerticalContainer style={{ width: '100%' }}>
            <VerticalContainer style={styles} onClick={() => setIsOpen(!isOpen)}>
                <Row>
                    <Text>More info</Text>
                    <Image  
                        src={image()} 
                        style={{ width: 15, marginLeft: '5px', marginTop: '3px' }}
                    />
                </Row>
            </VerticalContainer>
            {isOpen && (
                <VerticalContainer>
                    {props.children}
                </VerticalContainer>
            )}
        </VerticalContainer>
    );
}