import axios from 'axios';
import { 
    FETCH_TEAM_LIST,
    FETCH_LOADING,
    STUDENT_ACTION_LOADING,
    SELECT_TEAM_OK,
    WRONG_PASSWORD,
    FETCH_TEAM_STATUS,
    REGISTER_SCORE,
    CHANGE_SUBJECT,
    SELECT_SUBJECTS_WITH_TEAMS,
    FETCH_TEAM,
    CONTACT_INFO
} from './types';
import { URLS } from '../GlobalVars';


export const fetchTeamList = (access_token) => {
    const url = URLS.api_url + `/subject/teams/`;
    return (dispatch) => {

        dispatch({ type: FETCH_LOADING, payload: true });

        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            }
        }).then(response => {
            console.log(response.data);
            dispatch({ type: FETCH_TEAM_LIST, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: FETCH_LOADING, payload: false });
        });
    }
}

export const selectTeam = (access_token, team_id) => {

    const url = URLS.api_url + '/subject/selectteam/';

    return (dispatch) => {

        dispatch({ type: STUDENT_ACTION_LOADING, payload: true });
        
        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            },
            data: {
                team_id,
            }
        }).then(response => {
            
            if (response.data.message === 'wrong_password') {
                dispatch({ type: WRONG_PASSWORD, payload: 'Wrong team password!' });
            } else {
                dispatch({ type: SELECT_TEAM_OK, payload: response.data });
            }
        }).catch(err => {
            console.log(err.data);
            dispatch({ type: STUDENT_ACTION_LOADING, payload: false });
        })
    }
}

export const getTeamStatus = (access_token) => {

    const url = URLS.api_url + '/team/status/';

    return (dispatch) => {
        
        dispatch({ type: FETCH_LOADING, payload: true });

        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            }
        }).then(response => {
            dispatch({ type: FETCH_TEAM_STATUS, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: FETCH_LOADING, payload: false });
        })
    }
}

export const registerScore = (access_token, team_id, score_value) => {

    const url = URLS.api_url + '/team/registerscore/';
    return (dispatch) => {

        dispatch({ type: STUDENT_ACTION_LOADING, payload: true });

        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            },
            data: {
                team_id,
                score_value
            }
        }).then(response => {
            dispatch({ type: REGISTER_SCORE, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: STUDENT_ACTION_LOADING, payload: true });
        })
    }
}

export const selectSubjectWithTeams = (auth_token, subject_id) => {
    const url = URLS.api_url + '/selectsubjectwithteams/';

    return (dispatch) => {
        dispatch({ type: STUDENT_ACTION_LOADING, payload: true });
        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + auth_token
            },
            data: {
                subject_id
            }
        }).then(response => {
            dispatch({ type: CHANGE_SUBJECT, payload: response.data.user });
            dispatch({ type: SELECT_SUBJECTS_WITH_TEAMS, payload: response.data.teams });
        }).catch(error => {
            console.log(error);
            dispatch({ type: STUDENT_ACTION_LOADING, payload: false });
        })
    }
}

export const getTeamsForSubject = (auth_token) => {

    const url = URLS.api_url + '/teamlist/';

    return (dispatch) => {
        dispatch({ type: FETCH_LOADING, payload: true });
        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + auth_token
            }
        }).then(response => {
            dispatch({ type: FETCH_TEAM_LIST, payload: response.data });
        }).catch(error => {
            console.log(error);
            dispatch({ type: FETCH_LOADING, payload: false });
        })
    }
}

export const unregisterFromTeam = (auth_token) => {

    const url = URLS.api_url + '/team/unregister/';
    
    return dispatch => {
        dispatch({ type: STUDENT_ACTION_LOADING, payload: true });
        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + auth_token
            }
        }).then(response => {
            dispatch({ type: FETCH_TEAM, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: STUDENT_ACTION_LOADING, payload: false });
        })
    }
}

export const getContactInfo = (auth_token) => {
    const url = URLS.api_url + '/team/contactinfo/';

    return dispatch => {
        dispatch({ type: FETCH_LOADING, payload: true });
        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + auth_token
            }
        }).then(response => {
            dispatch({ type: CONTACT_INFO, payload: response.data });
        }).catch(err => {
            dispatch({ type: FETCH_LOADING, payload: false });
            console.log(err);
        })
    }
}