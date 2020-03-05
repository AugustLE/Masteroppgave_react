import React from 'react';
import { VerticalContainer, Text, Row } from '../common';

export const AppInfo = () => {

    return (
        <VerticalContainer style={{ width: '100%', alignItems: 'flex-start' }}>
        
            <Text size='16px' style={{ marginLeft: '15px', marginBottom: '10px' }}>
                For more information about the application, bugs discovered or GDPR requests, please contact: 
            </Text>
            <Row>
                <Text style={{ marginLeft: '15px' }}>Developer: </Text>
                <Text bold style={{ marginLeft: '5px' }}>augustle.lund@gmail.com</Text>
            </Row>
            <Text bold style={{ marginLeft: '15px' }}>OR: </Text>
            <Row>
                <Text style={{ marginLeft: '15px' }}>Project supervisor: </Text>
                <Text bold style={{ marginLeft: '5px' }}>stoica@ntnu.no</Text>
            </Row>
            
        </VerticalContainer>
    )
}