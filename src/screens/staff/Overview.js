import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { VerticalContainer, Box, Text, Row, Button, Image } from '../../components/common';
import { getOverviewStatistics, getTeamInfo, pinTeam, unpinTeam } from '../../actions/StaffActions';
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
        if (props.responsible_teams) {
            const team_list = props.responsible_teams.map((team) => (
                <Text key={team.pk}>{team.name}, </Text>  
            ));
            return (
                <Row style={{ flexWrap: 'wrap' }}>{team_list}</Row>
            );
        }
        return <div />;
    }
    
    const OverviewSection = () => {
        if (props.loading_fetch) {
            return <Loader />;
        }
        if (props.total_average && props.subject) {
            return (
                <VerticalContainer style={{ width: '95%', maxWidth: '500px' }}>
                    <Text bold size='22px' style={{ margin: '20px' }}>{props.subject.code} - Overview</Text>
                    <Box shadow style={{ padding: '10px', paddingBottom: '15px', width: '92%' }}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Overall score of all teams</Text>
                        <ProgressBar big score={props.total_average} />
                        <Row style={{ marginTop: '15px', alignItems: 'flex-end' }}>
                            <Text bold size='20px'>{props.total_average}</Text>
                            <Text bold size='13px' style={{ marginBottom: '3px', marginLeft: '5px' }}>out of 5</Text>
                        </Row>
                    </Box>
                    <Box shadow style={{ padding: '10px', paddingBottom: '15px', width: '92%', marginTop: '10px' }}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Total number of teams</Text>
                        <Text bold size='20px'>{props.number_of_teams}</Text>
                    </Box>
                    {console.log(props.teams_below)}
                    <Box 
                        shadow 
                        clickable
                        style={{ padding: '10px', paddingBottom: '15px', marginTop: '10px', width: '92%' }}
                        onClick={() => setTeamsBelow(!teamsBelow)}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Teams below score 2.5</Text>
                        <Text bold size='20px'>{props.number_teams_below}</Text>
                    </Box>
                    
                    {teamsBelow && (
                        <Box style={{ width: '100%' }}>
                            <Image 
                                style={{ width: '20px', marginTop: '20px', opacity: 0.5 }} 
                                src={require('../../images/arrow_down.png')} />
                            <TeamList 
                                onClick={(team_id) => onTeamClick(team_id)} 
                                teams={props.teams_below}
                                style={{ marginBottom: '15px', marginTop: '10px' }} 
                            />
                        </Box>  
                    )}
             
                    <Box 
                        shadow 
                        clickable
                        style={{ padding: '10px', paddingBottom: '15px', width: '92%', marginTop: '10px' }}
                        onClick={() => setTeamsResponsible(!teamsResponsible)}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Teams you are responsible for</Text>
                        <ResponsibleList />
                    </Box>
                    {teamsResponsible && (
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
                <PermissionCheck api_user={props.api_user} history={props.history}/>
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
        loading_action 
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
        loading_action
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
        unpinTeam 
    })(OverView);