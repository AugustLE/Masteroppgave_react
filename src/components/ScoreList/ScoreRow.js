import React from 'react';
import { Text } from '../common';
import { formatDateTime } from '../../GlobalMethods';
import '../SelectTeamList/selectteamlist.css';

export const ScoreRow = (props) => {

    

    return ( 
        <div onClick={props.onClickTeam} className='teamRow'>
            <Text style={{ paddingLeft: '8px', width: '100px' }}>{props.score.score}</Text>
            <Text style={{ paddingLeft: '45px' }}>{formatDateTime(props.score.date_registered)}</Text>
        </div>
    );
}