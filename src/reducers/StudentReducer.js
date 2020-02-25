import { 
    FETCH_TEAM_LIST, 
    FETCH_LOADING,
    STUDENT_ACTION_LOADING,
    SELECT_TEAM_OK,
    WRONG_PASSWORD,
    FETCH_TEAM_STATUS,
    REGISTER_SCORE,
    GET_USER,
    SELECT_SUBJECTS_WITH_TEAMS,
    FETCH_TEAM,
    CONTACT_INFO
} from '../actions/types';

const INITIAL_STATE = {
    team_list: null,
    loading_fetch: false,
    loading_action: false,
    team: null,
    error_message: null,
    last_score: null,
    has_rated_this_week: false,
    team_responsible: null,
    team_members: null,
    contact_info_responsible: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case FETCH_TEAM_LIST:
            return { ...state, team_list: action.payload, loading_fetch: false };
        
        case FETCH_LOADING:
            return { ...state, loading_fetch: action.payload };

        case STUDENT_ACTION_LOADING: 
            return { ...state, loading_action: true };

        case SELECT_TEAM_OK:
            return { ...state, team: action.payload, loading_action: false, error_message: null };

        case WRONG_PASSWORD:
            return { ...state, error_message: action.payload, loading_action: false };
        
        case FETCH_TEAM_STATUS:
            return { 
                ...state, 
                team: action.payload.team, 
                last_score: action.payload.last_score, 
                has_rated_this_week: action.payload.has_rated_this_week,
                team_responsible: action.payload.team_responsible,
                team_members: action.payload.team_members,
                loading_fetch: false  
            }
        
        case REGISTER_SCORE:
            
            return { 
                ...state, 
                team: action.payload.team, 
                last_score: action.payload.last_score, 
                has_rated_this_week: action.payload.has_rated_this_week,
                loading_action: false 
            };

        case GET_USER:
            return {
                ...state,
                team: action.payload.team,
                loading_fetch: false
            }

        case SELECT_SUBJECTS_WITH_TEAMS:
            return {
                ...state,
                team_list: action.payload
            }

        case FETCH_TEAM:
            return {
                ...state,
                team: action.payload
            }

        case CONTACT_INFO:
            return {
                ...state,
                contact_info_responsible: action.payload,
                loading_fetch: false
            }

        default:
            return state;
    }
}