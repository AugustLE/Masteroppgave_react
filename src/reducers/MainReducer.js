import { SET_ACCESS_TOKEN } from '../actions/types';

const INITIAL_STATE = {
    error: false,
    access_token: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGGED_IN_SUCCESS':
            return { ...state, error: true };
        
        case SET_ACCESS_TOKEN:
            return { ...state, access_token: action.payload }
         
        default:
            return state;
    }
}