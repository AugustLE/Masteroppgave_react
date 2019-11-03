import axios from 'axios';
import { 
    FETCH_TEAM_LIST,
    FETCH_LOADING,
    STUDENT_ACTION_LOADING,
    SELECT_TEAM_OK,
    WRONG_PASSWORD
} from './types';
import { URLS } from '../GlobalVars';


export const fetchTeamList = (access_token, subject_id) => {
    const url = URLS.api_url + `/subject/${subject_id}/teams`;
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

export const selectTeam = (access_token, team_id, team_password) => {

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
                team_password
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