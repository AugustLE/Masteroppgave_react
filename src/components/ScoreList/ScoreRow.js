import React from 'react';
import { Text, Row } from '../common';
import { formatDateTime } from '../../GlobalMethods';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import '../SelectTeamList/selectteamlist.css';

export const ScoreRow = (props) => {

    

    return ( 
        <div onClick={props.onClickTeam} className='teamRow'>
            <Row>
                <Text style={{ paddingLeft: '8px', width: '15px' }}>{props.score.score}</Text>
                <ProgressBar style={{ marginTop: '2px' }} score={props.score.score}/>
            </Row>
            <Text style={{ paddingLeft: '62px' }}>{formatDateTime(props.score.date_registered)}</Text>
        </div>
    );
}