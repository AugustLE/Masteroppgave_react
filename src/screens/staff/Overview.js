import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { VerticalContainer, Box, Text, Row, Button, Image, Line } from '../../components/common';
import { getOverviewStatistics, getTeamInfo, pinTeam, unpinTeam, getTeamHistory, setStaffField } from '../../actions/StaffActions';
import { getApiUser } from '../../actions/AccountActions';
import TabBarStaff from '../../components/TabBarStaff/TabBarStaff';
import { NavBar } from '../../components/NavBar/NavBar';
import { getAccessToken } from '../../GlobalMethods';
import { setAccessToken, setActiveTab } from '../../actions/MainActions';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { PermissionCheck } from '../../components/PermissionCheck/PermissionCheck';
import { TeamList } from '../../components/TeamList/TeamList';
import { TeamModal } from '../../components/TeamModal/TeamModal';
import { clientJSO } from '../../GlobalVars';
 

const OverView = (props) => {

    const [teamsBelow, setTeamsBelow] = useState(false);
    const [teamsResponsible, setTeamsResponsible] = useState(false);
    const [teamModal, setTeamModal] = useState(false);

    useEffect(() => {
        ////
        clientJSO.getToken();
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {

                props.setAccessToken(token);
                props.getOverviewStatistics(token);
                props.getApiUser(token);
            }
        });
        if (props.active_tab !== 0) {
            props.setActiveTab(0);
        }
    }, [])

    const onTeamClick = (team_id) => {
        setTeamModal(true);
        props.getTeamInfo(props.access_token, team_id);
    }

    const ResponsibleList = () => {
        let responsible_string = '';
        if (props.responsible_teams) {
            props.responsible_teams.forEach(team => {
                responsible_string += team.name + ', ';
            });
        }
        responsible_string = responsible_string.substring(0, responsible_string.length - 2);
        
        if (props.responsible_teams) {
            /*const team_list = props.responsible_teams.map((team) => (
                <Text key={team.pk}>{team.name}, </Text>  
            ));*/
            return (
                <Row style={{ flexWrap: 'wrap' }}>
                    <Text>{responsible_string}</Text>
                </Row>
            );
        }
        return <div />;
    }
    
    const OverviewSection = () => {
        if (props.loading_fetch) {
            return <Loader />;
        }
        let other_opacity = 1.0;
        let teams_below_opacity = 1.0;
        let teams_resp_opacity = 1.0;
        if (teamsBelow || teamsResponsible) {
            other_opacity = 0.5;
        }
        if (teamsBelow && !teamsResponsible) {
            teams_resp_opacity = 0.5;
        }
        if (!teamsBelow && teamsResponsible) {
            teams_below_opacity = 0.5;
        }
        
        if (props.total_average && props.subject) {
            return (
                <VerticalContainer style={{ width: '95%', maxWidth: '500px', marginBottom: '100px' }}>
                    <Text bold size='22px' style={{ margin: '20px' }}>{props.subject.code} - Overview</Text>
                    <Box shadow style={{ padding: '10px', paddingBottom: '15px', width: '92%', opacity: other_opacity }}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Overall score of all teams</Text>
                        <ProgressBar big score={props.total_average} />
                        <Row style={{ marginTop: '15px', alignItems: 'flex-end' }}>
                            <Text bold size='20px'>{props.total_average}</Text>
                            <Text bold size='13px' style={{ marginBottom: '3px', marginLeft: '5px' }}>out of 5</Text>
                        </Row>
                    </Box>
                    <Box shadow style={{ padding: '10px', paddingBottom: '15px', width: '92%', marginTop: '10px', opacity: other_opacity }}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Total number of teams</Text>
                        <Text bold size='20px'>{props.number_of_teams}</Text>
                    </Box>
                   
                    <Box 
                        shadow 
                        clickable
                        style={{ padding: '10px', paddingBottom: '15px', marginTop: '10px', width: '92%', opacity: teams_below_opacity }}
                        onClick={() => setTeamsBelow(!teamsBelow)}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Teams below score 2.5</Text>
                        <Text bold size='20px'>{props.number_teams_below}</Text>
                    </Box>
                    
                    {(teamsBelow && props.teams_below) && (
                        <Box style={{ width: '100%' }}>
                            <Image 
                                style={{ width: '20px', marginTop: '20px', opacity: 0.5 }} 
                                src={require('../../images/arrow_down.png')} />
                            <TeamList 
                                onClick={(team_id) => onTeamClick(team_id)} 
                                teams={props.teams_below}
                                style={{ marginBottom: '15px', marginTop: '10px' }} 
                            />
                            <Line style={{ width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: '#9e9e9e' }} />
                        </Box>  
                    )}
             
                    <Box 
                        shadow 
                        clickable
                        style={{ padding: '10px', paddingBottom: '15px', width: '92%', marginTop: '10px', opacity: teams_resp_opacity }}
                        onClick={() => setTeamsResponsible(!teamsResponsible)}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Teams you are responsible for</Text>
                        <ResponsibleList />
                    </Box>
                    {(teamsResponsible && props.responsible_teams) && (
                        <Box style={{ width: '100%' }}>
                            <Image 
                                style={{ width: '20px', marginTop: '20px', opacity: 0.5 }} 
                                src={require('../../images/arrow_down.png')} />
                            <TeamList 
                                onClick={(team_id) => onTeamClick(team_id)} 
                                teams={props.responsible_teams}
                                style={{ marginBottom: '15px', marginTop: '10px' }} 
                            />
                        </Box>
                    )}
                </VerticalContainer>
            );
        }
        return <div />;
    }

    return (
        <VerticalContainer>
            <NavBar />
            <OverviewSection />
            {props.api_user && props.api_user.role === 'IN' && (
                <Button 
                    style={{ marginTop: '30px', marginBottom: '100px' }}
                    onClick={() => props.history.push('/admin/uploader')}>
                    Manage course
                </Button>
            )}
            <TabBarStaff history={props.history}/>
            {props.api_user && (
                <PermissionCheck data_check student api_user={props.api_user} history={props.history}/>
            )}
            <TeamModal 
                modal_team_members={props.modal_team_members}
                modal_responsible={props.modal_responsible}
                modalOpen={teamModal}
                setModalOpen={setTeamModal}
                modal_loading={props.modal_loading}
                modal_team={props.modal_team}
                loading_action={props.loading_action}
                pinTeam={props.pinTeam}
                unpinTeam={props.unpinTeam}
                access_token={props.access_token}
                api_user={props.api_user}  
                getTeamHistory={() => props.getTeamHistory(props.access_token, props.modal_team.pk)} 
                team_history={props.team_history}     
                setStaffField={() => props.setStaffField({ prop: 'team_history', value: null })}          
            />
        </VerticalContainer>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { api_user } = state.account;
    const { 
        total_average, 
        number_teams_below, 
        responsible_teams, 
        loading_fetch, subject, 
        number_of_teams,
        teams_below,
        modal_responsible, 
        modal_team_members,
        modal_team,
        modal_loading,
        loading_action,
        team_history 
    } = state.staff;
    return { 
        access_token, 
        total_average, 
        number_teams_below, 
        responsible_teams, 
        subject, 
        loading_fetch, 
        number_of_teams,
        api_user,
        teams_below,
        modal_responsible, 
        modal_team_members,
        modal_team,
        modal_loading,
        loading_action,
        team_history
    };
}

export default connect(mapStateToProps, 
    { 
        getOverviewStatistics, 
        setAccessToken, 
        setActiveTab,
        getApiUser,
        getTeamInfo,
        pinTeam, 
        unpinTeam,
        getTeamHistory,
        setStaffField 
    })(OverView);