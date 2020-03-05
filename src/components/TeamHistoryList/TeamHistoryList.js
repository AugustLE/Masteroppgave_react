import React from 'react';
import { TeamHistoryRow } from './TeamHistoryRow';
import { VerticalContainer, Text } from '../../components/common';
import './teamhistorylist.css';


export const TeamHistoryList = (props) => {

    const List = () => {
        
        return props.team_history.map(history_obj => (
            <TeamHistoryRow 
                key={history_obj.week} 
                onClickTeam={() => props.onClickTeam(history_obj)} 
                history_obj={history_obj} 
            />
        ));
    }

    return (
        <VerticalContainer style={{ width: '100%' }}>
            <Text bold size='16px' style={{ width: '100%', marginBottom: '8px' }}>History</Text>
            <div className='teamHistoryListHeader'>
                <Text bold style={{ paddingLeft: '8px', width: '100px' }}>Week</Text>
                <Text bold style={{ paddingLeft: '63px' }}>Average score</Text>
            </div>
            <List />
        </VerticalContainer>
    )
}