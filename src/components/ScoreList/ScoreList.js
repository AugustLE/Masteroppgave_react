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
        <VerticalContainer style={{ width: '90%', marginTop: '20px' }}>
            <div className='teamListHeader'>
                <Text bold style={{ paddingLeft: '8px', width: '100px' }}>Score</Text>
                <Text bold style={{ paddingLeft: '43px' }}>Date registered</Text>
            </div>
            <List />
        </VerticalContainer>
    )
}
