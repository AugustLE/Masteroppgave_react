import axios from 'axios';
import { 
    SUBJECT_LIST,
    CHANGE_SUBJECT,
    ACCOUNT_LOADING,
    GET_USER,
    FETCH_LOADING,
    DELETE_USER,
    UNSELECT_SUBJECT,
    ERROR_REDIRECT
} from './types';
import { URLS, LIST_LOGIN } from '../GlobalVars';
import { fetchTeamList } from './StudentActions';



export const selectSubject = (auth_token, subject_id) => {

    const url = URLS.api_url + '/selectsubject/';
    return (dispatch) => {
        dispatch({ type: ACCOUNT_LOADING, payload: true });
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
            dispatch({ type: CHANGE_SUBJECT, payload: response.data });
            if (!LIST_LOGIN) {
                dispatch(fetchTeamList(auth_token, response.data.selected_subject_id));
            }
        }).catch(error => {
            console.log(error);
            dispatch({ type: ACCOUNT_LOADING, payload: false });
        })
    }
}

export const getSubjectList = (auth_token) => {

    const url = URLS.api_url + '/subjectlist/';

    return (dispatch) => {
        dispatch({ type: ACCOUNT_LOADING, payload: true });

        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + auth_token
            }
        }).then(response => {
            dispatch({ type: SUBJECT_LIST, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: ACCOUNT_LOADING, payload: false });
        })
    }
}

export const getApiUser = (auth_token, start=false) => {
    const url = URLS.api_url + '/user/';

    return (dispatch) => {
        dispatch({ type: ACCOUNT_LOADING, payload: true });
        dispatch({ type: FETCH_LOADING, payload: true });
        dispatch({ type: ERROR_REDIRECT, payload: false });
        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: 'Token ' + auth_token
            },
        }).then(response => {
            dispatch({ type: GET_USER, payload: response.data });
            
            if(start){    
                dispatch(getSubjectList(auth_token));
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: ERROR_REDIRECT, payload: true });
            dispatch({ type: ACCOUNT_LOADING, payload: false });
            dispatch({ type: FETCH_LOADING, payload: false });
        })
    }
}

export const deleteApiUser = (auth_token) => {

    const url = URLS.api_url + '/user/delete/';

    return dispatch => {
        dispatch({ type: ACCOUNT_LOADING, payload: true });

        axios({
            method: 'delete',
            url: url,
            headers: {
                Authorization: 'Token ' + auth_token
            }
        }).then(response => {
            dispatch({ type: DELETE_USER, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: ACCOUNT_LOADING, payload: false });
        })
    }
}

export const unselectSubject = (access_token) => {
    const url = URLS.api_url + '/unselectsubject/';
    return (dispatch) => {
        dispatch({ type: ACCOUNT_LOADING, payload: true });
        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + access_token
            }
        }).then(response => {
            dispatch({ type: UNSELECT_SUBJECT, payload: response.data });
        }).catch(error => {
            console.log(error);
            dispatch({ type: ACCOUNT_LOADING, payload: false });
        })
    }
}

export const setRedirectError = (value) => {
    return {
        type: ERROR_REDIRECT,
        payload: value
    };
};