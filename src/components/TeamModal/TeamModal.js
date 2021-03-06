import React, { useState } from 'react';
import Modal from 'react-modal';
import Loader from 'react-loader';
import { VerticalContainer, Text, Row, Line, Box, Form, Button } from '../../components/common';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { TeamHistoryList } from '../../components/TeamHistoryList/TeamHistoryList';


const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: '85%',
      border: 'none',
      boxShadow: '1px 1px 2px 2px #d5d5d5',
      maxWidth: '500px'

    }
  };

export const TeamModal = (props) => {

    // const [showHistory, setShowHistory] = useState(false);

    const roundedRating = (num) => {
        if (num && num > 0) {
            return Math.round(num * 10) / 10;
        }
        return 0;
    }

    const TeamMemberList = () => {

        const list = props.modal_team_members.map((member) => (
            <Row style={{ width: '100%', marginTop: '5px' }} key={member.name}>
                <Text style={{ flex: 3 }}>{member.name}</Text>
                {member.average_score ? (
                    <Row style={{ flex: 1 }}>
                        <Text bold style={{ flex: 1 }}>{roundedRating(member.average_score)}</Text>
                        <Box style={{ flex: 1, marginLeft: '5px' }}>
                            <ProgressBar score={roundedRating(member.average_score)} />
                        </Box>
                    </Row>
                ): (
                    <Text size='12px' bold style={{ flex: 1 }}>No ratings</Text>
                )}
            </Row>
        ));

        return (
            <VerticalContainer style={{ alignItems: 'flex-start', width: '100%' }}>
                <Text style={{ marginTop: '10px' }} size='16px' bold>Team members average rating</Text>
                {props.modal_team_members.length === 0 && (
                    <Text>No members registered yet</Text>
                )}
                {list}
                <Line style={{ width: '100%', marginTop: '10px' }} />
                <Text style={{ marginTop: '10px', marginBottom: '5px' }} size='16px' bold>Responsible for this team</Text>
                {(props.modal_responsible.name || props.modal_responsible.email) ? (
                    <VerticalContainer style={{  width: '100%', alignItems: 'flex-start' }}>
                        <Text>{props.modal_responsible.name}</Text>
                        <Text>{props.modal_responsible.email}</Text>
                    </VerticalContainer>
                ): (
                    <Text>Not registered yet</Text>
                )}
            </VerticalContainer>
        );
    }

    return (
        <Modal 
            isOpen={props.modalOpen}
            style={modalStyles}
            ariaHideApp={false}
            history={props.history}
            >

            {(!props.modal_loading && props.modal_team && !props.loading_action) ? (
                <VerticalContainer style={{ width: '100%' }}>
                    <Text bold size='20px'>{props.modal_team.name}</Text>
                    <VerticalContainer style={{ alignItems: 'flex-start', width: '100%' }}>
                        <Text style={{ marginTop: '10px', marginBottom: '5px' }} bold size='16px'>Average rating</Text>
                        {(props.modal_team.last_average_score === 0 || props.modal_team.last_average_score === null) ? (
                            <Text>No rating to show yet</Text>
                        ): (
                            <Row style={{ jusifyContent: 'flex-start' }}>
                                <Text style={{ marginRight: '5px' }} bold>{props.modal_team.last_average_score}</Text>
                                <ProgressBar score={props.modal_team.last_average_score} />
                            </Row>
                        )}
                    </VerticalContainer>
                    <Line style={{ width: '100%', marginTop: '10px' }} />
                    <TeamMemberList />
                </VerticalContainer>
            ): (
                <Loader />
            )}
            <VerticalContainer>
                <Row style={{ marginTop: '25px' }}>
                    {(props.modal_team && !props.modal_team.pinned && !props.loading_action) && (
                        <Form onSubmit={() => props.pinTeam(props.access_token, props.modal_team.pk)}>
                            {props.modal_team.responsible === props.api_user.name ? (
                                <div />
                            ): (
                                <Button 
                                    secondary 
                                    image={require('../../images/student/pin.png')}
                                    style={{ fontSize: '14px' }}>
                                    Pin
                                </Button>
                            )}
                        </Form>
                    )}
                    {(props.modal_team && props.modal_team.pinned && !props.loading_action) && (
                        <Form onSubmit={() => props.unpinTeam(props.access_token, props.modal_team.pk)}>
                            <Button 
                                secondary 
                                image={require('../../images/cross.png')}
                                style={{ fontSize: '14px' }}>
                                Unpin
                            </Button>
                        </Form>
                    )}
                
                    {props.modal_team && !props.loading_action && (
                        <Button 
                            style={{ height: '40px', marginLeft: '10px', fontSize: '14px' }} 
                            secondary
                            onClick={() => {
                                props.setStaffFieldBack(props.back_path);
                                props.history.push(`/staff/teamdetails/${props.modal_team.pk}`)
                                //props.getTeamHistory();
                                //setShowHistory(true)
                            }}>
                            More details
                        </Button>
                    )}
                    
                    <Button 
                        style={{ height: '40px', marginLeft: '10px', fontSize: '14px' }} 
                        onClick={() => {
                            props.setModalOpen(false);
                            // setShowHistory(false);
                            props.setStaffField();
                        }}>
                        Close
                    </Button>
                </Row>
            </VerticalContainer>
            
        </Modal>
    )
}


/*

/*props.team_history && showHistory && (
                <VerticalContainer style={{ width: '100%' }}>
                    <Line style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
                    <TeamHistoryList onClickTeam={(id) => console.log(id)} team_history={props.team_history} />
                </VerticalContainer>
            ) */

/*props.modal_team && !props.loading_action && showHistory && (
    <Button 
        style={{ height: '40px', marginLeft: '10px', fontSize: '14px' }} 
        secondary
        onClick={() => setShowHistory(false)}>
        Hide history
    </Button>
)*
{props.modal_team && !props.loading_action && !showHistory && (
    <Button 
        style={{ height: '40px', marginLeft: '10px', fontSize: '14px' }} 
        secondary
        onClick={() => {
            props.getTeamHistory();
            setShowHistory(true)
        }}>
        History 
    </Button>
)}

*/
