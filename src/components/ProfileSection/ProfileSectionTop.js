import React from 'react';
import { Row, VerticalContainer, Button } from '../common';
import './profilesection.css';
import { URLS } from '../../GlobalVars';

export const ProfileSectionTop = (props) => {

    let image = require('../../images/student/mortarboard.png');
    if (props.instructor) {
        image = require('../../images/staff/professor.png');
    }
    
    return (
        <Row style={{ justifyContent: 'flex-start' }}>
            <VerticalContainer style={{ flex: 4, justifyContent: 'flex-start' }}>
                <img alt='' className='studentImage' src={image} />
            </VerticalContainer>
            <VerticalContainer style={{ flex: 7, alignItems: 'flex-start' }}>
                <p className='nameText'>{props.api_user.name}</p>
                <Row>
                    <a className='logoutLink' onClick={props.logOut} href={URLS.end_session}>
                        <Button image={require('../../images/logout_white.png')}>Log out</Button>
                    </a>
                </Row>
            </VerticalContainer>
        </Row>
    );
}