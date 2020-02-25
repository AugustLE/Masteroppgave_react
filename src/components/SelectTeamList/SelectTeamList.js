import React from 'react';
import { VerticalContainer, Text } from '../common';
import { TeamRow } from './TeamRow';
import { baseSort } from '../../GlobalMethods';
import './selectteamlist.css';


export const SelectTeamList = (props) => {

    function nameSort(a, b) {
        return baseSort(b.team_number, a.team_number);
    }

    const List = () => {
        const team_list_copy = [].concat(props.teams);
        const team_list_sorted = team_list_copy.sort(nameSort);

        return team_list_sorted.map(team => (
            <TeamRow key={team.pk} onClickTeam={() => props.onClickTeam(team)} team={team} />
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