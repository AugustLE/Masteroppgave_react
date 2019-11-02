import { FETCH_TEAM_LIST, FETCH_LOADING } from '../actions/types';

const INITIAL_STATE = {
    team_list: null,
    loading_fetch: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case FETCH_TEAM_LIST:
            return { ...state, team_list: action.payload, loading_fetch: false };
        
        case FETCH_LOADING:
            return { ...state, loading_fetch: action.payload };
         
        default:
            return state;
    }
}