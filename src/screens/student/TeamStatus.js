import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import Slider from 'rc-slider';
import Modal from 'react-modal';
import 'rc-slider/assets/index.css';
import { setActiveTab, setAccessToken } from '../../actions/MainActions';
import { getApiUser } from '../../actions/AccountActions';
import { clientJSO } from '../../GlobalVars';
import { getTeamStatus, registerScore, getHistoryScores } from '../../actions/StudentActions';
import TabBarStudent from '../../components/TabBarStudent/TabBarStudent';
import { NavBar } from '../../components/NavBar/NavBar';
import { VerticalContainer, Row, ImageButton, Line, Text, Button, Form } from '../../components/common';
import { ScoreView } from '../../components/ScoreView/ScoreView';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { getAccessToken } from '../../GlobalMethods';
import { Redirect } from 'react-router-dom';
import { ScoreList } from '../../components/ScoreList/ScoreList';
import './team_status.css';


const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: '80%',
      border: 'none',
      boxShadow: '1px 1px 2px 2px #d5d5d5',
      maxWidth: '500px'

    }
  };

const TeamStatus = (props) => {

    const [score, setScore] = useState(2);
    const [modalOpen, setModalOpen] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        clientJSO.getToken();
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.setAccessToken(token);
                props.getTeamStatus(token);
                props.getApiUser(token);
                
            }
        });
        if (props.active_tab !== 0) {
            props.setActiveTab(0);
        }
    }, []);

    const onSliderChange = (value) => {
        setScore(value);
    }

    const TeamMemberList = () => {
        const list = props.team_members.map((member) => (
            <Row style={{ width: '100%', marginTop: '5px' }} key={member}>
                <Text style={{ flex: 3 }}>{member}</Text>
            </Row>
        ));

        return (
            <VerticalContainer style={{ alignItems: 'flex-start', width: '90%' }}>
                <Text style={{ marginTop: '10px' }} size='16px' bold>Team members</Text>
                {list}
                <Line style={{ width: '100%', marginTop: '10px' }} />
                <Text style={{ marginTop: '10px', marginBottom: '5px' }} size='16px' bold>Responsible for this team</Text>
                <Text>{props.team_responsible}</Text>
            </VerticalContainer>
        );
    }

    const TeamInfoModal = () => {
        return (
            <Modal 
                isOpen={modalOpen}
                style={modalStyles}
                ariaHideApp={false}>

                {props.team && (
                    <VerticalContainer>
                        <Text bold size='20px'>{props.team.name}</Text>
                        <VerticalContainer style={{ alignItems: 'flex-start', width: '90%' }}>
                            <Text style={{ marginTop: '10px', marginBottom: '5px' }} bold size='16px'>Average rating</Text>
                            {props.team.diverse_scores ? (
                                <Row style={{ jusifyContent: 'flex-start' }}>
                                    <Text style={{ marginRight: '5px' }} bold>{props.team.last_average_score}</Text>
                                    <ProgressBar score={props.team.last_average_score} />
                                </Row>
                            ): (
                                <Row style={{ jusifyContent: 'flex-start' }}>
                                    <Text style={{ marginRight: '5px' }} bold>No/too few ratings</Text>
                                </Row>
                            )}
                        </VerticalContainer>
                        <Line style={{ width: '90%', marginTop: '10px' }} />
                        <TeamMemberList />
                    </VerticalContainer>
                )}
                
                <VerticalContainer>
                    <Button style={{ marginTop: '25px' }} secondary onClick={() => setModalOpen(false)}>
                        Close
                    </Button>
                </VerticalContainer>
                
            </Modal>
        );
    }

    const ScorePage = () => {
        if (props.loading_fetch || props.loading_action) {
            return (<Loader />);
        }

        if (props.subject && props.team) {
            if (props.has_rated_this_week) {
                return (
                    <VerticalContainer style={{ marginBottom: '100px', width: '95%' }}>
                        <h2 style={{ marginBottom: '1px' }}>Team status</h2>
                        <p className='teamNameText'>{props.team.name}</p>
                        <div className='topSectionAfter'>
                            <div className='topSectionPartAfter'>
                                <p className='topSectionAfterHeader'>Average rating</p>
                                {props.team.diverse_scores ? (
                                    <Row style={{ marginTop: '10px' }}>
                                        <p className='topSectionAfterText' style={{ marginRight: '5px' }}>
                                            {props.team.last_average_score}
                                        </p>
                                        <ProgressBar score={props.team.last_average_score} />
                                    </Row>
                                ): (
                                    <Row style={{ marginTop: '10px' }}>
                                        <p className='topSectionAfterText' style={{ marginRight: '5px' }}>
                                            No/too few ratings
                                        </p>
                                    </Row>
                                )}
                            </div>
                            <div className='middleLineAfter' />
                            <div className='topSectionPartAfter'>
                                <p className='topSectionAfterHeader'>Subject</p>
                                <p className='topSectionAfterText' style={{ marginTop: '10px' }}>
                                    {props.subject.code} - {props.subject.name}
                                </p>
                            </div>
                        </div>
                        <div className='midSectionAfter'>
                            {/*}<ImageButton image={require('../../images/student/meeting.png')}>
                                Request assistance
                            </ImageButton>*/}
                            <ImageButton onClick={() => setModalOpen(true)} horizontal image={require('../../images/student/info_button.png')}>
                                Team info
                            </ImageButton>
                        </div>
                        <Line style={{ width: '90%', marginTop: '15px', marginBottom: '10px' }} />
                        <VerticalContainer>
                            <p className='afterRateText'>Your rating this week</p>
                            <ScoreView 
                                small 
                                text
                                score={props.last_score - 1} 
                            />
                        </VerticalContainer>
                        {(props.history_scores && showHistory) ? (  
                            <VerticalContainer style={{ width: '100%' }}>
                                <Line style={{ width: '90%', marginTop: '15px' }} />  
                                <ScoreList history_scores={props.history_scores} />
                                <Button 
                                    style={{ marginTop: '10px' }} 
                                    secondary
                                    onClick={() => setShowHistory(false)}>
                                        Hide
                                </Button>
                            </VerticalContainer> 
                        ): (
                            <Button onClick={() => {
                                    props.getHistoryScores(props.access_token);
                                    setShowHistory(true);
                                }} 
                                style={{ marginTop: '25px' }}>
                                View previous ratings
                            </Button>
                        )}
                        <Text style={{ marginTop: '20px' }}>You can vote again next week</Text>
                    </VerticalContainer>
                )
            } else {
                return (
                    <VerticalContainer style={{ marginBottom: '100px', width: '95%' }}>
                            <div className='topSection'>
                                <div className='topSectionPart' style={{ flex: 2, marginLeft: '10px' }}>
                                    <p className='infoTextBold'>{props.team.name}</p>
                                </div>
                                <div className='middleLine' />
                                <div className='topSectionPart' style={{ flex: 3, marginRight: '10px' }}>
                                    <p className='infoTextBold'>{props.subject.code} -</p>
                                    <p className='infoTextBold'>{props.subject.name}</p>
                                </div>
                            </div>

                            <p className='questionText'>How happy are you with your team this week?</p>

                            <ScoreView score={score} />

                            <Slider 
                                min={0}
                                max={4}
                                className='slider'
                                dots={true}
                                marks={{ '0': '1', '1': '2', '2': '3', '3': '4', '4': '5' }}
                                onChange={(value) => onSliderChange(value)}
                                value={score}
                                
                            />

                            <Form onSubmit={() => props.registerScore(props.access_token, props.team.pk, score + 1)}>
                                <input className='submitScoreButton' type='submit' value='Submit' />
                            </Form>
                        </VerticalContainer>
                );
            }
        }
        return <div />
      
    }
    return (
        <VerticalContainer style={{ alignItems: 'center' }}>
            <VerticalContainer style={{ maxWidth: '500px', width: '100%' }}>
                <NavBar />
                <ScorePage />
                <TeamInfoModal />
                <TabBarStudent history={props.history} />
                {(props.api_user && (props.api_user.role === 'IN' || props.api_user.role === 'TA')) && (
                    <Redirect to={'/staff/overview/'} />
                )}

                {(props.api_user && props.api_user.selected_subject_id === null) && (
                    <Redirect to='/selectsubject'/>
                )}
                
                {props.error_redirect && (
                    <Redirect to='/' />
                )}

            </VerticalContainer>
        </VerticalContainer>
    );
};

const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    const { 
        team, 
        last_score, 
        loading_fetch, 
        loading_action, 
        has_rated_this_week,
        team_responsible,
        team_members,
        history_scores
    } = state.student;
    const { subject, api_user, error_redirect } = state.account;
    return { 
        access_token, 
        active_tab,  
        last_score, 
        team, 
        subject, 
        has_rated_this_week,
        loading_fetch,
        loading_action,
        team_responsible,
        team_members,
        api_user,
        history_scores,
        error_redirect
    };
};

const mapDispatchToProps = {
    setActiveTab, 
    getTeamStatus, 
    registerScore, 
    setAccessToken,
    getApiUser,
    getHistoryScores 
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamStatus);