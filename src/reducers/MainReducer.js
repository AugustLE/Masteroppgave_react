import { SET_ACCESS_TOKEN, SET_ACTIVE_TAB } from '../actions/types';

const INITIAL_STATE = {
    error: false,
    access_token: null,
    active_tab: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case SET_ACCESS_TOKEN:
            return { ...state, access_token: action.payload }
        
        case SET_ACTIVE_TAB:
            return { ...state, active_tab: action.payload }
         
        default:
            return state;
    }
}