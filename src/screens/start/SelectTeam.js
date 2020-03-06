import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader';
import { Box, Text, Button, Form, Line } from '../../components/common';
import { clientJSO, LIST_LOGIN } from '../../GlobalVars';
import { getAccessToken } from '../../GlobalMethods';
import { updateToken } from '../../actions/AuthActions';
import { getApiUser } from '../../actions/AccountActions';
import { setAccessToken } from '../../actions/MainActions';
import { requestAuthority, getRequestedAuthority } from '../../actions/StaffActions';
import { getTeamsForSubject, selectTeam, getTeamStatus } from '../../actions/StudentActions';
import { SelectTeamList } from '../../components/SelectTeamList/SelectTeamList';
import { BasicModal } from '../../components/BasicModal/BasicModal';


const SelectTeam = (props) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {

        clientJSO.getToken();

        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/');
            } else { 
                props.getTeamsForSubject(token);
                props.getApiUser(token);
                props.getRequestedAuthority(token);
                //props.getTeamStatus(token);
                props.setAccessToken(token);
            }
        });
    }, [])

    const selectTeam = (team_id) => {
        setModalOpen(true);
        setSelectedTeam(team_id);
    }
    if (props.account_loading) {
        return <Loader />
    }

    const registerOnTeam = () => {
        props.selectTeam(props.access_token, selectedTeam.pk);
        setModalOpen(false);
    }

    const RequestSection = () => {
        if (props.loading_fetch) {
            return <Loader />
        }
        if (props.authorized_staff === false) {
            return (
                <Text 
                    style={{ marginTop: '10px', marginBottom: '10px' }}>
                        Staff access requested <span aria-label='hidden' role='img'>✔️</span> Waiting for approval..
                </Text>
            );
        } else if (props.authorized_staff === true) {
            return (
                <Redirect to='/staff/overview/' />
            );
        } else {
            return (
                <Box style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}>
                    <Text bold size='16px'>Are you instructor or TA?</Text>
                    <Form onSubmit={() => props.requestAuthority(props.access_token)}>
                        <Button style={{ marginTop: '10px' }} secondary>Request access</Button>
                    </Form>
                    <Line style={{ width: '85%', marginTop: '15px' }} />
                </Box>  
            );  
        }
    }
    
    return (
        <Box>
            {props.team && (
                <Redirect to={'/student/status/'}/>
            )}
            {(props.api_user && (props.api_user.role === 'IN' || props.api_user.role === 'TA')) && (
                <Redirect to={'/staff/overview/'} />
            )}
            <TopbarLogin />
            {RequestSection()}
            
            {props.team_list && (
                <Box style={{ width: '95%' }}>
                    <Text bold size='16px' style={{ marginBottom: '10px' }}>
                        If student, select your team
                    </Text>
                    <SelectTeamList 
                        onClickTeam={team => selectTeam(team)} 
                        teams={props.team_list}
                    />
                </Box>
            )}
            <BasicModal 
                modalOpen={modalOpen} 
                setModalOpen={() => setModalOpen(!modalOpen)} 
                buttonText={'Select team'}
                title={selectTeam.name}
                text={'Do you want to register on this team? (Make sure it is the correct team)'}
                onActionClick={() => registerOnTeam()}
            />
        </Box>
    )
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { team_list, team } = state.student;
    const { api_user, account_loading } = state.account;
    const { authorized_staff, loading_fetch } = state.staff;

    return { 
        access_token, 
        team_list, 
        team, 
        api_user, 
        account_loading, 
        authorized_staff,
        loading_fetch 
    };
}

export default connect(mapStateToProps, 
    { 
        updateToken, 
        setAccessToken,
        getTeamsForSubject,
        selectTeam,
        getTeamStatus,
        getApiUser,
        requestAuthority,
        getRequestedAuthority
    })(SelectTeam);
