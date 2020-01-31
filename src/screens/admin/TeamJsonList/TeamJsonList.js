import React from 'react';
import { VerticalContainer, Text } from '../../../components/common';
import { TeamJsonRow } from './TeamJsonRow';
import './teamjsonlist.css'

export const TeamJsonList = (props) => {

    const JsonList = () => {
        const json_list = props.jsonTeams.map((team) => (
            <TeamJsonRow key={team.name} team={team}  />
        ))

        return (
            <div className="teamJsonListContainer">
                {json_list}
            </div>
        )
    }

    return (
        <VerticalContainer style={{ width: '100%' }}>
            <div className="teamJsonHeaderContainer">
                <Text bold style={{ marginRight: '20px', width: '80px', color: 'white' }}>Team name</Text>
                <Text bold style={{ color: 'white' }}>Team responsible</Text>
            </div>
            <JsonList />
        </VerticalContainer>
    );
}

