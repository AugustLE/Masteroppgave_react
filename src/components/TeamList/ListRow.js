import React from 'react';
import { Row, Text, Image } from '../common';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import './teamlist.css';


export const ListRow = (props) => {

    const responsibleString = (responsible) => {
        if (responsible) {
            return responsible.split(' ')[0];
        }
        return 'Not registered';
    }

    const respSize = (responsible) => {
        if (!responsible) {
            return '12px';
        } else {
            return '14px';
        }
    }

    const displayName = (name) => {
        let new_name = name;
        if (name.length > 10) {
            let spl_name = name.split(' ');
            if (spl_name.length >= 2) {
                new_name = name[0] + name[1] + '.gr ' + spl_name[spl_name.length - 1];
            }
        }
        return new_name;
    }

    return ( 
        <div onClick={props.onClick} className='listRowContainer'>
            
            <Text style={{ width: '80px' }}>{displayName(props.team.name)}</Text>
            
            <Row style={{ width: '100px', height: '30px', justifyContent: 'flex-start' }}>
                {(props.team.number_of_scores > 0) ? (
                    <Row>
                        <Text style={{ marginRight: '10px', width: '22px' }}>{props.team.last_average_score}</Text>
                        <ProgressBar score={props.team.last_average_score} />
                    </Row>
                ): (
                    <Text>No ratings</Text>
                )}

            </Row>
            
            <Text size={respSize(props.team.responsible)} style={{ marginLeft: '35px' }}>{responsibleString(props.team.responsible)}</Text>
            {props.team.pinned && (
                <Image 
                    src={require('../../images/student/pin.png')}
                    style={{ width: '15px', height: '15px', position: 'absolute', top: '5px', right: '5px' }} 
                />
            )}
            
        </div>
    );
}