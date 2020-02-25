import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader';
import { Box } from '../../components/common';
import { clientJSO, LIST_LOGIN } from '../../GlobalVars';
import { getAccessToken } from '../../GlobalMethods';
import { updateToken } from '../../actions/AuthActions';
import { getApiUser } from '../../actions/AccountActions';
import { setAccessToken } from '../../actions/MainActions';
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
    
    return (
        <Box>
            {props.team && (
                <Redirect to={'/student/status/'}/>
            )}
            {(props.api_user && (props.api_user.role === 'IN' || props.api_user.role === 'TA')) && (
                <Redirect to={'/staff/overview/'} />
            )}
            <TopbarLogin />
            {props.team_list && (
                <SelectTeamList 
                    onClickTeam={team => selectTeam(team)} 
                    teams={props.team_list}
                />
            )}
            <BasicModal 
                modalOpen={modalOpen} 
                setModalOpen={() => setModalOpen(!modalOpen)} 
                buttonText={'Select team'}
                text={'Do you want to register on this team? (Make sure it is the correct team)'}
                onActionClick={() => registerOnTeam()}
                team={selectedTeam}
            />
        </Box>
    )
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { team_list, team } = state.student;
    const { api_user, account_loading } = state.account;

    return { access_token, team_list, team, api_user, account_loading };
}

export default connect(mapStateToProps, 
    { 
        updateToken, 
        setAccessToken,
        getTeamsForSubject,
        selectTeam,
        getTeamStatus,
        getApiUser,
    })(SelectTeam);
