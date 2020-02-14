import axios from 'axios';
import { clientJSO } from '../GlobalVars';
import { 
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    FETCH_FEIDE_USER_SUCCESS,
    LOGOUT ,
    PRIVACY_CONSENT_RETURN,
    PRIVACY_CONSENT_LOADING
} from './types';
import { URLS } from '../GlobalVars';
import { getSubjectList, getApiUser } from './AccountActions';

const TEMP_PASSWORD = '094huersgifu3h';
const SECRET_KEY = '!hi%8z+!0sd*ijv9a__nx*+dm)f0b86h&!(49cbq*x)oq&^$b#';

export const getPrivacyConsent = (feide_username) => {

    const url = URLS.api_url + `/privacyconsent/${feide_username}/`;

    return (dispatch) => {
        dispatch({ type: PRIVACY_CONSENT_LOADING, payload: true });

        axios({
            method: 'get',
            url: url,
        }).then(response => {
            dispatch({ type: PRIVACY_CONSENT_RETURN, payload: response.data });
        }).catch(err => {
            console.log(err);
            dispatch({ type: PRIVACY_CONSENT_LOADING, payload: false });
        })
        
    }
}

export const acceptPrivacyConsent = (feide_user, token, with_subjects=false) => {

    const url = URLS.api_url + '/privacyconsent/';
    const username = feide_user.userid_sec[0].split(':')[1].split('@')[0];
    console.log(username);
    return (dispatch) => {
        dispatch({ type: PRIVACY_CONSENT_LOADING, payload: true });

        axios({
            method: 'post',
            url: url,
            data: {
                feide_username: username,
                has_accepted: true,
            }
        }).then((response) => {
            dispatch({ type: PRIVACY_CONSENT_RETURN, payload: response.data });
            dispatch(loginAndCreateUserIfNecessary(feide_user, token, with_subjects));
        }).catch(err => {
            dispatch({ type: PRIVACY_CONSENT_LOADING, payload: false });
            console.log(err);
        })
    }
}

export const getUserFeide = (token, withPrivacyConsent=false) => {
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
            if (withPrivacyConsent) {
                const username = response.data.user.userid_sec[0].split(':')[1].split('@')[0];
                dispatch(getPrivacyConsent(username));
            } else {
                dispatch(loginAndCreateUserIfNecessary(response.data.user, token));
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

export const loginAndCreateUserIfNecessary = (user, token, with_subjects=false) => {
    const url = URLS.api_url + '/user/feidelogin/';
    const username = user.userid_sec[0].split(':')[1].split('@')[0];
    return (dispatch) => {
        dispatch({ type: LOGIN_LOADING, payload: true });
        axios({
            method: 'post',
            url: url,
            data: {
                userid: user.userid,
                name: user.name,
                auth_token: token,
                username: username
            }
        }).then(response => {
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            // dispatch(getApiUser(token));
            if (with_subjects) {
                dispatch(getSubjectList(token));
            }
        }).catch(error => {
            console.log(error);
            dispatch({ type: LOGIN_LOADING, payload: false });
        });
    }

}

export const updateToken = (token, with_subjects=false) => {

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
            const user = response.data.user;
            dispatch(loginAndCreateUserIfNecessary(user, token, with_subjects));
        }).catch(error => {
            console.log(error);
            dispatch({ type: LOGIN_LOADING, payload: false });
        });
    }
}


export const logout = () => {
    clientJSO.wipeTokens();
    localStorage.clear();
    return {
        type: LOGOUT,
        payload: null
    }
}