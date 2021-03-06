import axios from 'axios';

import { 
    STAFF_FETCH_LOADING,
    STAFF_OVERVIEW,
    STAFF_FETCH_TEAMS,
    GET_TEAM_INFO,
    MODAL_LOADER,
    ADMIN_ACTION_LOADING,
    TEAM_UPLOAD_SUCCESS,
    SET_STAFF_FIELD,
    GET_AUTH,
    STAFF_ACTION_LOADING,
    PIN_TEAM,
    TEAM_HISTORY
} from './types';
import { URLS } from '../GlobalVars';


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
    return {
        type: SET_STAFF_FIELD,
        payload: { prop, value }
    };
};

export const requestAuthority = (access_token) => {

    const url = URLS.api_url + '/staff/requestauth/';

    return dispatch => {
        dispatch({ type: STAFF_FETCH_LOADING, payload: true });
        
        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            }
        }).then(response => {
            dispatch({ type: GET_AUTH, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: STAFF_FETCH_LOADING, payload: false });
        });
    }
}

export const getRequestedAuthority = (access_token) => {

    const url = URLS.api_url + '/staff/getauth/';

    return dispatch => {
        dispatch({ type: STAFF_FETCH_LOADING, payload: true });

        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            }
        }).then(response => {
            dispatch({ type: GET_AUTH, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: STAFF_FETCH_LOADING, payload: false });
        });
    }
}

export const pinTeam = (access_token, team_id) => {

    const url = URLS.api_url + '/staff/pinteam/';

    return dispatch => {
        dispatch({ type: STAFF_ACTION_LOADING, payload: true });

        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            },
            data: {
                team_id
            }
        }).then(response => {
            dispatch({ type: PIN_TEAM, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: STAFF_ACTION_LOADING, payload: false });
        })
    }
}

export const unpinTeam = (access_token, team_id) => {

    const url = URLS.api_url + '/staff/unpinteam/';

    return dispatch => {
        dispatch({ type: STAFF_ACTION_LOADING, payload: true });

        axios({
            method: 'delete',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            },
            data: {
                team_id
            }
        }).then(response => {
            dispatch({ type: PIN_TEAM, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: STAFF_ACTION_LOADING, payload: false });
        })
    }
}

export const getTeamHistory = (access_token, team_id) => {

    const url = URLS.api_url + `/staff/teamhistory/${team_id}/`;
    console.log(url);
    console.log('TOKEN TOKEN TOKEN TOKEN');
    console.log(access_token);
    return dispatch => {
        dispatch({ type: STAFF_FETCH_LOADING, payload: true });

        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            },
        }).then(response => {
            console.log('RESPONSE RESPONSE');
            console.log(response);
            dispatch({ type: TEAM_HISTORY, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: STAFF_FETCH_LOADING, payload: false });
        })
    }

    /*var obj = {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: 'Token ' + access_token
        }
        
    }

    return dispatch => {
        dispatch({ type: STAFF_FETCH_LOADING, payload: true });
        fetch(url, obj).then(res => res.json()).then((result) => {
            console.log('RESULT RESULT RESULT');
            console.log(result);
            dispatch({ type: TEAM_HISTORY, payload: result });
        }).catch(err => {
            console.log(err);
            dispatch({ type: STAFF_FETCH_LOADING, payload: false });
        })
    }*/
}
