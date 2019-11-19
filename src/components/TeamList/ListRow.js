import React from 'react';
import { Row, Text } from '../common';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import './teamlist.css';


export const ListRow = (props) => {

    const responsibleString = (responsible) => {
        if (responsible) {
            return responsible.split(' ')[0];
        }
        return '--';
    }

    return ( 
        <div onClick={props.onClick} className='listRowContainer'>
            
            <Text style={{ width: '80px' }}>{props.team.name}</Text>
            
            <Row style={{ width: '100px', height: '30px', justifyContent: 'flex-start' }}>
                <Text style={{ marginRight: '10px', width: '22px' }}>{props.team.last_average_score}</Text>
                <ProgressBar score={props.team.last_average_score} />
            </Row>
            
            <Text style={{ width: '100px', marginLeft: '35px' }}>{responsibleString(props.team.responsible)}</Text>
            
        </div>
    );
}