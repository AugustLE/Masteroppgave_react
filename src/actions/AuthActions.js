import axios from 'axios';
import { 
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    FETCH_FEIDE_USER_SUCCESS 
} from './types';
import { URLS } from '../GlobalVars';

const TEMP_PASSWORD = '094huersgifu3h';

export const getUserFeide = (token) => {
    const url = URLS.feide_profile_info;

    return (dispatch) => {
        dispatch({ type: LOGIN_LOADING, payload: true });
        const access_token = 'Bearer ' + token;

        axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: access_token,
            }
        }).then(response => {
            dispatch({ type: FETCH_FEIDE_USER_SUCCESS, payload: response.data.user });
            dispatch(loginAndCreateUserIfNecessary(response.data.user, token));
        })
    }
}

export const loginAndCreateUserIfNecessary = (user, token) => {
    const url = URLS.api_url + '/user/feidelogin/';
    return (dispatch) => {
        dispatch({ type: LOGIN_LOADING, payload: true });
        axios({
            method: 'post',
            url: url,
            data: {
                userid: user.userid,
                name: user.name,
                auth_token: token,
                password: TEMP_PASSWORD,
            }
        }).then(response => {
            dispatch({ type: LOGIN_LOADING, payload: false });
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

}