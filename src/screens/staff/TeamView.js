import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { VerticalContainer, Text, Box, Input } from '../../components/common';
import TabBarStaff from '../../components/TabBarStaff/TabBarStaff';
import { NavBar } from '../../components/NavBar/NavBar';
import { getTeamList, getTeamInfo, pinTeam, unpinTeam, getTeamHistory, setStaffField } from '../../actions/StaffActions';
import { getApiUser } from '../../actions/AccountActions';
import { setAccessToken, setActiveTab } from '../../actions/MainActions';
import { getAccessToken } from '../../GlobalMethods';
import { TeamList } from '../../components/TeamList/TeamList';
import { TeamModal } from '../..//components/TeamModal/TeamModal';
import { clientJSO } from '../../GlobalVars';
import { Redirect } from 'react-router';

 
const TeamView = (props) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [teamId, setSelectedTeamId] = useState(null);
    const [searchValue, setSearchValue] = useState('');
 

    useEffect(() => {
        clientJSO.getToken();
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.getApiUser(token);
                props.setAccessToken(token);
                props.getTeamList(token);
            }
            
        });
        if (props.active_tab !== 1) {
            props.setActiveTab(1);
        }
    }, [])

    const onTeamClick = (team_id) => {
        setSelectedTeamId(team_id);
        setModalOpen(true);
        props.getTeamInfo(props.access_token, team_id);
    }

    const searchList = () => {
        if (props.staff_team_list && searchValue !== '') {
            let team_list = [].concat(props.staff_team_list);
        
            const searched_list = team_list.filter(
                team => team.name && team.responsible && (team.name.toLowerCase().includes(searchValue.toLowerCase())
                || team.responsible.toLowerCase().includes(searchValue.toLowerCase()))
            );
            return searched_list;
    
        }
        return props.staff_team_list;
    }


    return (
        <VerticalContainer>
            {(props.api_user && (props.api_user.role !== 'TA' && props.api_user.role !== 'IN')) && (
                <Redirect to='/student/status/' />
            )}
            <NavBar />
            {props.subject && (
                <Text bold size='22px' style={{ margin: '15px' }}>{props.subject.code} - Overview</Text>
            )}
             
            {(!props.loading_fetch && props.staff_team_list) ?  (
                <Box style={{ width: '100%' }}>
                    <Input 
                        placeholder="Search" 
                        onChangeValue={e => setSearchValue(e.target.value)} 
                        value={searchValue}
                        style={{ width: '90%' }}
                    />
                    <TeamList 
                        onClick={(team_id) => onTeamClick(team_id)} 
                        teams={searchList()} 
                        sortVal={1}
                    />
                </Box>
            ): (
                <Loader />
            )}
            <TeamModal 
                modal_team_members={props.modal_team_members}
                modal_responsible={props.modal_responsible}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
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
            <TabBarStaff history={props.history}/>
        </VerticalContainer>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { 
        staff_team_list, 
        loading_fetch, 
        subject, 
        modal_responsible, 
        modal_team_members,
        modal_team,
        modal_loading,
        loading_action,
        team_history
    } = state.staff;

    const { api_user } = state.account;

    return { 
        access_token, 
        staff_team_list, 
        loading_fetch, 
        subject, 
        modal_responsible, 
        modal_team_members, 
        modal_team,
        modal_loading,
        api_user,
        loading_action,
        team_history
    };
}

const mapDispatchToProps = {
    getTeamList,
    setAccessToken,
    setActiveTab,
    getTeamInfo,
    getApiUser,
    pinTeam,
    unpinTeam,
    getTeamHistory,
    setStaffField
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamView);