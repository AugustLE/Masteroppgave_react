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

    const [showHistory, setShowHistory] = useState(false);

    const TeamMemberList = () => {
        const list = props.modal_team_members.map((member) => (
            <Row style={{ width: '100%', marginTop: '5px' }} key={member.name}>
                <Text style={{ flex: 3 }}>{member.name}</Text>
                {member.average_score ? (
                    <Row style={{ flex: 1 }}>
                        <Text bold style={{ flex: 1 }}>{member.average_score}</Text>
                        <Box style={{ flex: 1, marginLeft: '5px' }}>
                            <ProgressBar score={member.average_score} />
                        </Box>
                    </Row>
                ): (
                    <Text size='12px' bold style={{ flex: 1 }}>No scores</Text>
                )}
            </Row>
        ));

        return (
            <VerticalContainer style={{ alignItems: 'flex-start', width: '100%' }}>
                <Text style={{ marginTop: '10px' }} size='16px' bold>Team members average score</Text>
                {list}
                <Line style={{ width: '100%', marginTop: '10px' }} />
                <Text style={{ marginTop: '10px', marginBottom: '5px' }} size='16px' bold>Responsible for this team</Text>
                <Text>{props.modal_responsible.name}</Text>
                <Text>{props.modal_responsible.email}</Text>
            </VerticalContainer>
        );
    }

    return (
        <Modal 
            isOpen={props.modalOpen}
            style={modalStyles}
            ariaHideApp={false}
            >

            {(!props.modal_loading && props.modal_team && !props.loading_action) ? (
                <VerticalContainer style={{ width: '100%' }}>
                    <Text bold size='20px'>{props.modal_team.name}</Text>
                    <VerticalContainer style={{ alignItems: 'flex-start', width: '100%' }}>
                        <Text style={{ marginTop: '10px', marginBottom: '5px' }} bold size='16px'>Average score</Text>
                        <Row style={{ jusifyContent: 'flex-start' }}>
                            <Text style={{ marginRight: '5px' }} bold>{props.modal_team.last_average_score}</Text>
                            <ProgressBar score={props.modal_team.last_average_score} />
                        </Row>
                    </VerticalContainer>
                    <Line style={{ width: '100%', marginTop: '10px' }} />
                    <TeamMemberList />
                </VerticalContainer>
            ): (
                <Loader />
            )}
            {props.team_history && showHistory && (
                <VerticalContainer style={{ width: '100%' }}>
                    <Line style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
                    <TeamHistoryList onClickTeam={(id) => console.log(id)} team_history={props.team_history} />
                </VerticalContainer>
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
                    {props.modal_team && !props.loading_action && showHistory && (
                        <Button 
                            style={{ height: '40px', marginLeft: '10px', fontSize: '14px' }} 
                            secondary
                            onClick={() => setShowHistory(false)}>
                            Hide history
                        </Button>
                    )}
                    <Button 
                        style={{ height: '40px', marginLeft: '10px', fontSize: '14px' }} 
                        onClick={() => {
                            props.setModalOpen(false);
                            setShowHistory(false);
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
<Modal 
                isOpen={modalOpen}
                style={modalStyles}
                ariaHideApp={false}>

                {(!props.modal_loading && props.modal_team && !props.loading_action) ? (
                    <VerticalContainer>
                        <Text bold size='20px'>{props.modal_team.name}</Text>
                        <VerticalContainer style={{ alignItems: 'flex-start', width: '90%' }}>
                            <Text style={{ marginTop: '10px', marginBottom: '5px' }} bold size='16px'>Average score</Text>
                            <Row style={{ jusifyContent: 'flex-start' }}>
                                <Text style={{ marginRight: '5px' }} bold>{props.modal_team.last_average_score}</Text>
                                <ProgressBar score={props.modal_team.last_average_score} />
                            </Row>
                        </VerticalContainer>
                        <Line style={{ width: '90%', marginTop: '10px' }} />
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
                        <Button 
                            style={{ height: '40px', marginLeft: '10px', fontSize: '14px' }} 
                            onClick={() => setModalOpen(false)}>
                            Close
                        </Button>
                    </Row>
                </VerticalContainer>
                
            </Modal>

*/