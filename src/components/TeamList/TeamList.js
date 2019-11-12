import React from 'react';
import { VerticalContainer } from '../common';
import { ListRow } from './ListRow';
import { ListHeader } from './ListHeader';
import './teamlist.css';


export const TeamList = (props) => {

    const List = () => {
        const team_list = props.teams.map((team) => (
            <ListRow onClick={() => props.onClick(team.pk)} key={team.pk} team={team} />
        ));
        return (
            <div className='listContainer'>
                <ListHeader />
                {team_list}
            </div>
        );
    }

    return (
        <VerticalContainer style={{ width: '100%' }}>
            <List />
        </VerticalContainer>
    );
}