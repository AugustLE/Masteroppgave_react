import axios from 'axios';

import { 
    FETCH_STAFF_SUBJECTS,
    STAFF_FETCH_LOADING,
    STAFF_OVERVIEW
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