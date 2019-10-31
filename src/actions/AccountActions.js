import axios from 'axios';
import { 
    CHANGE_ROLE,
    EDIT_PROFILE_LOADING,
    SUBJECT_LIST
} from './types';
import { URLS } from '../GlobalVars';

export const changeRole = (auth_token, role) => {
    const url = URLS.api_url + '/user/changerole/';

    return (dispatch) => {
        dispatch({ type: EDIT_PROFILE_LOADING, payload: true });

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
        })
    }
}

export const getEnrolledSubjects = (auth_token) => {
    const url = URLS.api_url + '/enrollment/';

    return (dispatch) => {
        dispatch({ type: EDIT_PROFILE_LOADING, payload: true});

        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: 'Token ' + auth_token
            },
        }).then(response => {
            dispatch({ type: SUBJECT_LIST, payload: response.data });
        });
    }
}