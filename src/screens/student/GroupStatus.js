import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { setActiveTab } from '../../actions/MainActions';
import { getTeamStatus, registerScore } from '../../actions/StudentActions';
import { setAccessToken } from '../../actions/MainActions';
import TabBarStudent from '../../components/TabBarStudent/TabBarStudent';
import { NavBar } from '../../components/NavBar/NavBar';
import { VerticalContainer, Row, ImageButton, Line } from '../../components/common';
import { ScoreView } from '../../components/ScoreView/ScoreView';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { getAccessToken } from '../../GlobalMethods';
import './group_status.css';


const GroupStatus = (props) => {

    const [score, setScore] = useState(2);

    useEffect(() => {
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.setAccessToken(token);
                props.getTeamStatus(token);
            }
        });
        if (props.active_tab !== 0) {
            props.setActiveTab(0);
        }
    }, []);

    const onSliderChange = (value) => {
        setScore(value);
    }

    const onSubmitScore = (event) => {
        event.preventDefault();
        props.registerScore(props.access_token, props.team.pk, score + 1);
    }

    const ScorePage = () => {
        if (props.loading_fetch || props.loading_action) {
            return (<Loader />);
        }

        if (props.subject && props.team) {
            if (props.has_rated_this_week) {
                return (
                    <VerticalContainer>
                        <h2 style={{ marginBottom: '1px' }}>Group status</h2>
                        <p className='teamNameText'>{props.team.name}</p>
                        <div className='topSectionAfter'>
                            <div className='topSectionPartAfter'>
                                <p className='topSectionAfterHeader'>Average score</p>
                                <Row style={{ marginTop: '10px' }}>
                                    <p className='topSectionAfterText' style={{ marginRight: '5px' }}>
                                        {props.team.last_average_score}
                                    </p>
                                    <ProgressBar score={props.team.last_average_score} />
                                </Row>
                                
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
                            <ImageButton image={require('../../images/student/meeting.png')}>
                                Request assistance
                            </ImageButton>
                            <ImageButton horizontal image={require('../../images/student/info_button.png')}>
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
                    </VerticalContainer>
                )
            } else {
                return (
                    <VerticalContainer>
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

                            <p className='questionText'>How happy are you with your group this week?</p>

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

                            <form onSubmit={onSubmitScore}>
                                <input className='submitScoreButton' type='submit' value='Submit' />
                            </form>
                        </VerticalContainer>
                );
            }
        }
        return <div />
      
    }

    return (
        <div>
            <NavBar />
            <ScorePage />
            <TabBarStudent history={props.history} />
        </div>
    );
};

const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    const { team, last_score, loading_fetch, loading_action, has_rated_this_week } = state.student;
    const { subject } = state.account;
    return { 
        access_token, 
        active_tab,  
        last_score, 
        team, 
        subject, 
        has_rated_this_week,
        loading_fetch,
        loading_action 
    };
};

export default connect(mapStateToProps, { 
    setActiveTab, 
    getTeamStatus, 
    registerScore, 
    setAccessToken 
})(GroupStatus);