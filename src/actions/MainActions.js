import { SET_ACCESS_TOKEN } from './types';

export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function errorAfterFiveSeconds() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(itemsHasErrored(true));
        }, 5000);
    };
}

export const setAccessToken = (token) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: token
    }
}