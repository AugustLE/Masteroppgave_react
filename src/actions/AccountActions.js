import axios from 'axios';
import { 
    CHANGE_ROLE,
    SUBJECT_LIST,
    CHANGE_SUBJECT,
    ACCOUNT_LOADING
} from './types';
import { URLS } from '../GlobalVars';
import { fetchTeamList } from './StudentActions';


export const changeRole = (auth_token, role) => {
    const url = URLS.api_url + '/user/changerole/';

    return (dispatch) => {
        dispatch({ type: ACCOUNT_LOADING, payload: true });

        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + auth_token,
            },
            data: {
                role
            }
        }).then(response => {
            dispatch({ type: CHANGE_ROLE, payload: response.data });
        }).catch(error => {
            console.log(error);
            dispatch({ type: ACCOUNT_LOADING, payload: false });
        })
    }
}

export const getEnrolledSubjects = (auth_token) => {
    const url = URLS.api_url + '/enrollment/';

    return (dispatch) => {
        dispatch({ type: ACCOUNT_LOADING, payload: true });

        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + auth_token
            },
        }).then(response => {
            dispatch({ type: SUBJECT_LIST, payload: response.data });
        }).catch(error => {
            dispatch({ type: ACCOUNT_LOADING, payload: false });
        });
    }
}

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
            dispatch(fetchTeamList(auth_token, response.data.selected_subject_id));
        }).catch(error => {
            console.log(error);
            dispatch({ type: ACCOUNT_LOADING, payload: false });
        })
    }
}