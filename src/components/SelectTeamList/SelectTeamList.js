import React from 'react';
import { VerticalContainer, Text } from '../common';
import { TeamRow } from './TeamRow';
import './selectteamlist.css';


export const SelectTeamList = (props) => {

    const List = () => {
        return props.teams.map(team => (
            <TeamRow onClickTeam={() => props.onClickTeam(team.pk)} team={team} />
        ));
    }

    return (
        <VerticalContainer style={{ width: '100%' }}>
            <div className='teamListHeader'>
            
                <Text bold style={{ paddingLeft: '8px', width: '100px' }}>Team</Text>
                <Text bold style={{ paddingLeft: '63px' }}>Team responsible</Text>
            </div>
            <List />
        </VerticalContainer>
    )
}