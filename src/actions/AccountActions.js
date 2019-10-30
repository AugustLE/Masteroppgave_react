import axios from 'axios';
import { 
    CHANGE_ROLE,
    EDIT_PROFILE_LOADING
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