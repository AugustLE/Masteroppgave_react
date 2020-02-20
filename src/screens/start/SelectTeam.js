import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Redirect } from 'react-router-dom';
import { Box, VerticalContainer, Text } from '../../components/common';
import { clientJSO, LIST_LOGIN } from '../../GlobalVars';
import { setAccessTokenPersistent, getAccessToken } from '../../GlobalMethods';
import { updateToken } from '../../actions/AuthActions';
import { setAccessToken } from '../../actions/MainActions';
import { getTeamsForSubject, selectTeam, getTeamStatus } from '../../actions/StudentActions';
import { SelectTeamList } from '../../components/SelectTeamList/SelectTeamList';


const SelectTeam = (props) => {

    useEffect(() => {

        clientJSO.getToken();

        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/');
            } else { 
                props.getTeamsForSubject(token);
                //props.getTeamStatus(token);
                props.setAccessToken(token);
            }
        });
    }, [])

    
    
    return (
        <Box>
            {props.team && (
                <Redirect to={'/student/status/'}/>
            )}
            <TopbarLogin />
            {props.team_list && (
                <SelectTeamList 
                    onClickTeam={team_id => props.selectTeam(props.access_token, team_id)} 
                    teams={props.team_list}
                />
            )}
        </Box>
    )
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { team_list, team } = state.student;

    return { access_token, team_list, team };
}

export default connect(mapStateToProps, 
    { 
        updateToken, 
        setAccessToken,
        getTeamsForSubject,
        selectTeam,
        getTeamStatus
    })(SelectTeam);
