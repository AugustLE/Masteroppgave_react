import React from 'react';
import { Text } from '../common';
import './selectteamlist.css';

export const TeamRow = (props) => {

    const responsibleString = (responsible) => {
        if (responsible) {
            return responsible.split(' ')[0];
        }
        return '--';
    }

    return ( 
        <div onClick={props.onClickTeam} className='teamRow'>
            <Text style={{ paddingLeft: '8px', width: '100px' }}>{props.team.name}</Text>
            <Text style={{ paddingLeft: '65px' }}>{responsibleString(props.team.responsible)}</Text>
        </div>
    );
}