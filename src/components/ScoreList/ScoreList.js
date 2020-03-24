import React from 'react';
import { ScoreRow } from './ScoreRow';
import { VerticalContainer, Text } from '../common';
import '../SelectTeamList/selectteamlist.css';


export const ScoreList = (props) => {

    const List = () => {
        const score_list_copy = [].concat(props.history_scores);
        
        return score_list_copy.map(score => (
            <ScoreRow key={score.pk} score={score} />
        ));
    }

    return (
        <VerticalContainer style={{ width: '95%', marginTop: '20px' }}>
            <Text style={{ textAlign: 'left', width: '100%', paddingLeft: '10px' }} bold size='18px'>
                Previous ratings
            </Text>
            <div className='teamListHeader'>
                <Text bold style={{ paddingLeft: '8px', width: '100px' }}>Score</Text>
                <Text bold style={{ paddingLeft: '25px' }}>Date registered</Text>
            </div>
            <List />
        </VerticalContainer>
    )
}
