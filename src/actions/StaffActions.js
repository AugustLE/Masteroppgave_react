import axios from 'axios';

import { 
    FETCH_STAFF_SUBJECTS,
    STAFF_FETCH_LOADING,
    STAFF_OVERVIEW,
    STAFF_FETCH_TEAMS,
    GET_TEAM_INFO,
    MODAL_LOADER,
    ADMIN_ACTION_LOADING,
    TEAM_UPLOAD_SUCCESS,
    SET_STAFF_FIELD
} from './types';
import { URLS } from '../GlobalVars';


export const getStaffSubjects = (access_token) => {

    const url = URLS.api_url + '/staff/subjects/';

    return (dispatch) => {
        dispatch({ type: STAFF_FETCH_LOADING, payload: true });

        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            }
        }).then(response => {
            dispatch({ type: FETCH_STAFF_SUBJECTS, payload: response.data });
        }).catch(error => {
            console.log(error);
            dispatch({ type: STAFF_FETCH_LOADING, payload: false });
        })
    }

}

export const getOverviewStatistics = (access_token) => {
    const url = URLS.api_url + '/staff/overview/';

    return (dispatch) => {
        dispatch({ type: STAFF_FETCH_LOADING, payload: true });
        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            }
        }).then(response => {
            dispatch({ type: STAFF_OVERVIEW, payload: response.data });
        }).catch(error => {
            console.log(error);
            dispatch({ type: STAFF_FETCH_LOADING, payload: false });
        });
    }
}

export const getTeamList = (access_token) => {
    const url = URLS.api_url + '/staff/teams/';

    return (dispatch) => {
        dispatch({ type: STAFF_FETCH_LOADING, payload: true });
        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            }
        }).then(response => {
            dispatch({ type: STAFF_FETCH_TEAMS, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: STAFF_FETCH_LOADING, payload: false });
        })
    }
} 

export const getTeamInfo = (access_token, team_id) => {
    const url = URLS.api_url + `/staff/teams/${team_id}/`;

    return dispatch => {
        dispatch({ type: MODAL_LOADER, payload: true });

        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            }
        }).then(response => {
            dispatch({ type: GET_TEAM_INFO, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: MODAL_LOADER, payload: false });
        })
    }
}

export const uploadTeamList = (access_token, teamJson) => {
    const url = URLS.api_url + '/staff/teams/upload/';

    return dispatch => {
        dispatch({ type: ADMIN_ACTION_LOADING, payload: true });

        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            },
            data: {
                team_json: teamJson
            }
        }).then(() => {
            dispatch({ type: TEAM_UPLOAD_SUCCESS, payload: false });
        }).catch(err => {
            dispatch({ type: ADMIN_ACTION_LOADING, payload: false });
            console.log(err);
        })
    }
}

export const setStaffField = ({ prop, value }) => {
    console.log(prop);
    console.log(value);
    return {
        type: SET_STAFF_FIELD,
        payload: { prop, value }
    };
};