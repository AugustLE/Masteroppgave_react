import { 
    SET_ACCESS_TOKEN,
    SET_ACTIVE_TAB 
} from './types';

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

export const setActiveTab = (active_tab) => {
    return {
        type: SET_ACTIVE_TAB,
        payload: active_tab
    }
}