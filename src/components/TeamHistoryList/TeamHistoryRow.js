import React, { useState } from 'react';
import { Text, Row, VerticalContainer, Box, Image } from '../common';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { COLORS } from '../../GlobalStyles';
import './teamhistorylist.css';

export const TeamHistoryRow = (props) => {

    const [openRow, setOpenRow] = useState(false);

    const arrow = () => {
        if (openRow) {
            return require('../../images/arrow_up.png');
        }
        return require('../../images/arrow_down.png');
    }

    const backgroundColor = () => {
        if (openRow) {
            return COLORS.grey;
        }
        return 'white';
    }

    const TeamMemberRow = ({ member }) => {
        return (
            <Row style={{ width: '100%', marginTop: '5px' }} key={member.user.name}>
                <Text style={{ flex: 3 }}>{member.user.name}</Text>
                {member.score ? (
                    <Row style={{ flex: 1 }}>
                        <Text bold>{member.score}</Text>
                        <Box style={{  marginLeft: '5px' }}>
                            <ProgressBar score={member.score} />
                        </Box>
                    </Row>
                ): (
                    <Text size='11px' bold style={{ flex: 1 }}>No scores</Text>
                )}
                {member.score && (
                    <Text bold center style={{ flex: 1 }}>{member.score_date}</Text>
                )}
            </Row>
        );
    }

    const TeamMemberList = () => {
        const list = props.history_obj.users.map((member) => (
            <TeamMemberRow member={member} />
        ));

        return (
            <VerticalContainer 
                style={{ 
                    alignItems: 'flex-start', 
                    width: '100%', 
                    marginTop: '10px', 
                    marginBottom: '10px',
                    padding: '5px' 
                }}>
                <Text style={{ marginTop: '10px' }} size='16px' bold>Scores from {props.history_obj.week}, {props.history_obj.year}</Text>
                <Row style={{ width: '100%', marginTop: '5px', backgroundColor: COLORS.theme, padding: '2px'}}>
                    <Text size='14px' bold style={{ flex: 3 }}>User</Text>
                    <Text center style={{ flex: 1 }} bold>Score</Text>
                    <Text bold center style={{ flex: 1 }}>Date</Text>
                </Row>
                {list}
            </VerticalContainer>
        );
    }

    return ( 
        <VerticalContainer style={{ width: '100%' }}>
            <div onClick={() => setOpenRow(!openRow)} className='teamHistoryRow' style={{ backgroundColor: backgroundColor() }}>
                <Text style={{ paddingLeft: '8px', width: '100px' }}>{props.history_obj.week}</Text>
                <Row>
                    <Text style={{ paddingLeft: '65px', marginRight: '5px', width: '30px' }}>{props.history_obj.average}</Text>
                    <ProgressBar style={{ flex: 2 }} score={props.history_obj.average}/>
                </Row>
                <Image 
                    style={{ width: '12px', position: 'absolute', right: '8px', top: '8px' }} 
                    src={arrow()} 
                />
            </div>
            {openRow && (
                <VerticalContainer style={{ width: '100%' }}>
                   <TeamMemberList />
                </VerticalContainer>
            )}
        </VerticalContainer>
    );
}