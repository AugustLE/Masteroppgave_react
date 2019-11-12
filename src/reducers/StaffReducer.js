import { 
    FETCH_STAFF_SUBJECTS, 
    STAFF_FETCH_LOADING,
    STAFF_OVERVIEW,
    STAFF_FETCH_TEAMS,
    GET_TEAM_INFO,
    MODAL_LOADER
} from '../actions/types';

const INITIAL_STATE = {
    staff_subjects: null,
    loading_fetch: false,
    total_average: null,
    number_teams_below: null,
    responsible_teams: null,
    staff_team_list: null,
    subject: null,
    modal_responsible: null,
    modal_team_members: null,
    modal_team: null,
    modal_loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case FETCH_STAFF_SUBJECTS:
            return { ...state, staff_subjects: action.payload, loading_fetch: false }
        
        case STAFF_FETCH_LOADING:
            return { ...state, loading_fetch: action.payload }

        case STAFF_OVERVIEW:
            return { 
                ...state,  
                total_average: action.payload.total_average,
                number_teams_below: action.payload.number_teams_below,
                responsible_teams: action.payload.responsible_teams,
                subject: action.payload.subject,
                loading_fetch: false
            }
        
        case STAFF_FETCH_TEAMS:
            return {
                ...state,
                staff_team_list: action.payload.teams,
                subject: action.payload.subject,
                loading_fetch: false
            }
        
        case MODAL_LOADER:
            return {
                ...state,
                modal_loading: action.payload
            }
        
        case GET_TEAM_INFO:
            return {
                ...state,
                modal_responsible: action.payload.responsible,
                modal_team_members: action.payload.members,
                modal_team: action.payload.team,
                modal_loading: false
            }
         
        default:
            return state;
    }
}