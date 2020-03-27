import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line as BarLine } from 'recharts';
import { Redirect } from 'react-router';
import { NavBar } from '../../components/NavBar/NavBar';
import { VerticalContainer, Text, Row, Line, Button, Box } from '../../components/common';
import { getTeamInfo, getTeamHistory, setStaffField } from '../../actions/StaffActions';
import { getApiUser } from '../../actions/AccountActions';
import { setAccessToken } from '../../actions/MainActions';
import { clientJSO } from '../../GlobalVars';
import { getAccessToken } from '../../GlobalMethods';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { TeamHistoryList } from '../../components/TeamHistoryList/TeamHistoryList';
import { PermissionCheck } from '../../components/PermissionCheck/PermissionCheck';

const TeamDetail = (props) => {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        clientJSO.getToken();
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.getApiUser(token);
                props.setAccessToken(token);
                props.getTeamInfo(token, props.match.params.id)
                props.getTeamHistory(token, props.match.params.id);
                handleResize();
            }
        });
        
    }, [])

    console.log(props.team_history);
    const getTeamData = () => {
        const team_data = [];
        props.team_history.forEach(obj => {
            const data_obj = {
                'date': 'Week ' + obj.week_number,
                'Team average rating': obj.average,
            }
            team_data.push(data_obj);
        })
        team_data.reverse();
        return team_data;
    }

    function handleResize() {
        if (window.innerWidth > 800) {
            setWidth(800)
        } else {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
    }

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
                    <Text size='12px' bold style={{ flex: 1 }}>No ratings</Text>
                )}
            </Row>
        ));

        return (
            <VerticalContainer style={{ alignItems: 'flex-start', width: '100%' }}>
                <Text style={{ marginTop: '10px' }} size='16px' bold>Team members average rating</Text>
                {list}
                <Line style={{ width: '100%', marginTop: '10px' }} />
                <Text style={{ marginTop: '10px', marginBottom: '5px' }} size='16px' bold>Responsible for this team</Text>
                <Text>{props.modal_responsible.name}</Text>
                <Text>{props.modal_responsible.email}</Text>
            </VerticalContainer>
        );
    }

    return (
        <VerticalContainer>
            <NavBar />
            {props.error_redirect && (
                <Redirect to='/'/>
            )}
            {props.api_user && (
                <PermissionCheck data_check student api_user={props.api_user} history={props.history}/>
            )}
            {(props.api_user && (props.api_user.role !== 'TA' && props.api_user.role !== 'IN')) && (
                <Redirect to='/student/status/' />
            )}
            <VerticalContainer style={{ 
                maxWidth: '800px', 
                marginTop: '20px', 
                marginBottom: '40px', 
                width: '95%',
                }}>
                <VerticalContainer style={{ width: '100%', alignItems: 'flex-start' }}>
                    <Button 
                        style={{ fontSize: '14px' }} 
                        secondary
                        onClick={() => {
                            if (props.back_path_details) {
                                props.history.push(props.back_path_details);
                            } else {
                                props.history.push('/staff/overview/');
                            }
                            props.setStaffField({ prop: 'team_history', value: null });
                        }}>
                        {'<- Go back'}
                    </Button>
                </VerticalContainer>
                {(!props.modal_loading && props.modal_team && !props.loading_action) ? (
                    <VerticalContainer style={{ width: '100%' }}>
                        <Text bold size='20px'>{props.modal_team.name}</Text>
                        <VerticalContainer style={{ alignItems: 'flex-start', width: '100%' }}>
                            <Text style={{ marginTop: '10px', marginBottom: '5px' }} bold size='16px'>Average rating</Text>
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
                {props.team_history && (
                    <VerticalContainer style={{ width: '100%' }}>
                        <Line style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
                        <TeamHistoryList onClickTeam={(id) => console.log(id)} team_history={props.team_history} />
                    </VerticalContainer>
                )}
                {props.loading_fetch ? (
                    <Loader />
                ): (
                    <VerticalContainer>
                        <VerticalContainer style={{ marginTop: '25px', width: '100%', alignItems: 'flex-start' }}>
                            {props.team_history && (
                                <BarChart 
                                    width={width - 30} 
                                    height={230} 
                                    data={getTeamData()} 
                                    maxBarSize={35}
                                    margin={{ left: -40 }}
                                >   
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date">
                                        {/*<Label value="Week number" offset={-10} position="insideBottomLeft" />*/}
                                    </XAxis>
                                    <YAxis type='number' domain={[0, 5]} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Team average rating" fill="#82ca9d" />
                                </BarChart>
                            )}
                        </VerticalContainer>
                        <VerticalContainer style={{ marginTop: '25px', width: '100%', alignItems: 'flex-start' }}>
                            {props.team_history && (
                                <LineChart width={width - 30} height={230} data={getTeamData()}
                                margin={{ left: -40 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis domain={[0, 5]}/>
                                    <Tooltip />
                                    <Legend />
                                    <BarLine type="monotone" dataKey="Team average rating" stroke="#8884d8" />
                                </LineChart>
                            )}
                        </VerticalContainer>
                    </VerticalContainer>
                )}
                
            </VerticalContainer>
        </VerticalContainer>
    )
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const {  
        loading_fetch, 
        subject, 
        modal_responsible, 
        modal_team_members,
        modal_team,
        modal_loading,
        loading_action,
        team_history,
        back_path_details
    } = state.staff;

    const { api_user, error_redirect } = state.account;

    return { 
        access_token, 
        loading_fetch, 
        subject, 
        modal_responsible, 
        modal_team_members, 
        modal_team,
        modal_loading,
        api_user,
        loading_action,
        team_history,
        error_redirect,
        back_path_details
    };
}

const mapDispatchToProps = {
    getApiUser,
    setAccessToken,
    getTeamInfo,
    getTeamHistory,
    setStaffField
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail);

