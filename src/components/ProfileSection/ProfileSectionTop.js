import React from 'react';
import { Row, VerticalContainer, Button } from '../common';
import './profilesection.css';

export const ProfileSectionTop = (props) => {

    let image = require('../../images/student/mortarboard.png');
    if (props.instructor) {
        image = require('../../images/staff/professor.png');
    }
    
    return (
        <Row>
            <VerticalContainer style={{ flex: 4 }}>
                <img alt='' className='studentImage' src={image} />
            </VerticalContainer>
            <VerticalContainer style={{ flex: 7, alignItems: 'flex-start' }}>
                <p className='nameText'>{props.api_user.name}</p>
                <Button image={require('../../images/logout_white.png')} onClick={props.logOut}>Log out</Button>
            </VerticalContainer>
        </Row>
    );
}