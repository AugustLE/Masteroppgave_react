import { 
    FETCH_STAFF_SUBJECTS, 
    STAFF_FETCH_LOADING,
    STAFF_OVERVIEW
} from '../actions/types';

const INITIAL_STATE = {
    staff_subjects: null,
    loading_fetch: false,
    total_average: null,
    number_teams_below: null,
    responsible_teams: null
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
                loading_fetch: false
            }
         
        default:
            return state;
    }
}