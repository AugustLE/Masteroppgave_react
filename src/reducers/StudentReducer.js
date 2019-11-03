import { 
    FETCH_TEAM_LIST, 
    FETCH_LOADING,
    STUDENT_ACTION_LOADING,
    SELECT_TEAM_OK,
    WRONG_PASSWORD 
} from '../actions/types';

const INITIAL_STATE = {
    team_list: null,
    loading_fetch: false,
    loading_action: false,
    team: null,
    error_message: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case FETCH_TEAM_LIST:
            return { ...state, team_list: action.payload.teams, team: action.payload.team, loading_fetch: false };
        
        case FETCH_LOADING:
            return { ...state, loading_fetch: action.payload };

        case STUDENT_ACTION_LOADING: 
            return { ...state, loading_action: true };

        case SELECT_TEAM_OK:
            return { ...state, team: action.payload, loading_action: false, error_message: null };

        case WRONG_PASSWORD:
            return { ...state, error_message: action.payload, loading_action: false };
         
        default:
            return state;
    }
}