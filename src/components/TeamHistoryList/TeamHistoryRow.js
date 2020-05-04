import React, { useState } from 'react';
import { Text, Row, VerticalContainer, Box, Image } from '../common';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { COLORS } from '../../GlobalStyles';
import './teamhistorylist.css';

export const TeamHistoryRow = (props) => {

    const init_state = props.isOpen ? props.isOpen : false;

    const [openRow, setOpenRow] = useState(init_state);

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

    const onClickRow = () => {
        setOpenRow(!openRow);
        props.onClickRow(!openRow, props.history_obj);
    }

    const roundToOne = (num) => {
        if (num && num > 0) {
            return Math.round(num * 10) / 10;
        }
        return 0;
    }

    const TeamMemberRow = ({ member }) => {
        return (
            <Row style={{ width: '100%', marginTop: '5px' }}>
                <Text style={{ flex: 3 }}>{member.user.name}</Text>
                {member.score ? (
                    <Row style={{ flex: 1 }}>
                        <Text bold>{member.score}</Text>
                        <Box style={{  marginLeft: '5px' }}>
                            <ProgressBar score={member.score} />
                        </Box>
                    </Row>
                ): (
                    <Text size='11px' bold style={{ flex: 1 }}>No ratings</Text>
                )}
                {member.score && (
                    <Text bold center style={{ flex: 1 }}>{member.score_date}</Text>
                )}
            </Row>
        );
    }

    const TeamMemberList = () => {
        const list = props.history_obj.users.map((member) => (
            <TeamMemberRow key={member.user.name} member={member} />
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
                <Text style={{ marginTop: '10px' }} size='16px' bold>Ratings from {props.history_obj.week}, {props.history_obj.year}</Text>
                <Row style={{ width: '100%', marginTop: '5px', backgroundColor: COLORS.theme, padding: '2px'}}>
                    <Text size='14px' bold style={{ flex: 3 }}>User</Text>
                    <Text center style={{ flex: 1 }} bold>Rating</Text>
                    <Text bold center style={{ flex: 1 }}>Date</Text>
                </Row>
                {list}
            </VerticalContainer>
        );
    }

    return ( 
        <VerticalContainer style={{ width: '100%' }}>
            <div onClick={() => onClickRow()} className='teamHistoryRow' style={{ backgroundColor: backgroundColor() }}>
                <Text bold style={{ paddingLeft: '8px', width: '90px' }}>{props.history_obj.week_number}</Text>
                <Text style={{ paddingLeft: '8px', width: '90px' }}>{props.history_obj.week}</Text>
                <Row style={{ marginRight: '25px' }}>
                    <Text style={{ paddingLeft: '50px', marginRight: '5px', width: '30px' }}>{roundToOne(props.history_obj.average)}</Text>
                    <ProgressBar style={{ flex: 2 }} score={roundToOne(props.history_obj.average)}/>
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