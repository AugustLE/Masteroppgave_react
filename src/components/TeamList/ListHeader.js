import React from 'react';
import { Text, Row } from '../common';


export const ListHeader = () => {

 return ( 
        <div className='listRowHeader'>
            
            <Text bold style={{ width: '80px' }}>Team</Text>
            
            <Row style={{ width: '100px', height: '30px', justifyContent: 'flex-start' }}>
                <Text bold style={{ marginRight: '10px' }}>Status(1-5)</Text>
            </Row>
            
            <Text bold style={{ width: '100px', marginLeft: '35px' }}>Responsible</Text>
        </div>
    );
}