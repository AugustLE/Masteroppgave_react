import React from 'react';
import { Row, VerticalContainer, ImageButton, Line, Button } from '../common';
import { LIST_LOGIN } from '../../GlobalVars';
import './profilesection.css';

export const ProfileSectionBottom = (props) => {
  
    return (
        <VerticalContainer style={{ alignItems: 'flex-start', width: '100%' }}>
            <Row style={{ marginLeft: '20px' }}>
                <p className='profileInfoLabel'>Current subject: </p>
                <p className='profileInfoText'>{props.subject.code} - {props.subject.name}</p>
            </Row>
            {props.team && (
                <Row style={{ marginLeft: '20px' }}>
                    <p className='profileInfoLabel'>Your team: </p>
                    <p className='profileInfoText'>{props.team.name}</p>
                </Row>
            )}
            {(props.student && !LIST_LOGIN) && (
                <Button onClick={props.onChangeTeam} secondary style={{ marginLeft: '27px', marginTop: '10px' }}>Change team</Button>
            )}
            {
            <ImageButton 
                onClick={props.onChangeSubject} 
                image={require('../../images/book.png')}
                style={{ marginLeft: '20px', marginTop: '20px', paddingLeft: '15px', paddingRight: '15px', fontSize: '14px' }}>
                Change subject
            </ImageButton>
            }

            <Line style={{ width: '100%', marginTop: '20px' }} />
            
        </VerticalContainer>
    );
}