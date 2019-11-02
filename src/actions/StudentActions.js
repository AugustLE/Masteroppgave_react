import axios from 'axios';
import { 
    FETCH_TEAM_LIST,
    FETCH_LOADING
} from './types';
import { URLS } from '../GlobalVars';


export const fetchTeamList = (access_token, subject_id) => {
    const url = URLS.api_url + `/subject/${subject_id}/teams`;
    console.log('TEAMLIST');
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