import React from 'react';
import { Text } from '../common';
import './teamhistorylist.css';

export const TeamHistoryRow = (props) => {

    return ( 
        <div onClick={props.onClickTeam} className='teamHistoryRow'>
            <Text style={{ paddingLeft: '8px', width: '100px' }}>{props.history_obj.week}</Text>
            <Text style={{ paddingLeft: '65px' }}>{props.history_obj.average}</Text>
        </div>
    );
}