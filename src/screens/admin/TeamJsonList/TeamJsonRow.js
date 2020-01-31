import React, { useState } from 'react';
import { VerticalContainer, Text, Row } from '../../../components/common';
import './teamjsonlist.css'

export const TeamJsonRow = (props) => {

    const [showMembers, setShowMembers] = useState(false);

    return (
        <VerticalContainer style={{ width: '100%' }}>        
            <div onClick={() => setShowMembers(!showMembers)} className="teamJsonRowContainer">
                <Text style={{ marginRight: '20px', width: '80px' }}>{props.team.name}</Text>
                <Text>{props.team.responsible}</Text>
            </div>
            {showMembers && (
                <VerticalContainer style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}>
                    <Text style={{ width: '90%' }} size='18px' bold>Team members</Text>
                    {props.team.members.map((member) => (
                        <Text style={{ width: '90%' }} key={member}>{member}</Text>
                    ))}
                </VerticalContainer>
            )}
        </VerticalContainer>
    )
}