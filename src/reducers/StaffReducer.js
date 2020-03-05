import { 
    FETCH_STAFF_SUBJECTS, 
    STAFF_FETCH_LOADING,
    STAFF_OVERVIEW,
    STAFF_FETCH_TEAMS,
    GET_TEAM_INFO,
    MODAL_LOADER,
    TEAM_UPLOAD_SUCCESS,
    ADMIN_ACTION_LOADING,
    SET_STAFF_FIELD,
    GET_AUTH,
    PIN_TEAM,
    STAFF_ACTION_LOADING,
} from '../actions/types';

import { boolSort } from '../GlobalMethods';

const INITIAL_STATE = {
    staff_subjects: null,
    loading_fetch: false,
    loading_action: false,
    total_average: null,
    number_teams_below: null,
    responsible_teams: null,
    number_of_teams: null,
    staff_team_list: null,
    subject: null,
    modal_responsible: null,
    modal_team_members: null,
    modal_team: null,
    modal_loading: false,
    team_upload_success: false,
    admin_loading: false,
    authorized_staff: null,
    teams_below: null
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
                teams_below: action.payload.teams_below,
                responsible_teams: action.payload.responsible_teams,
                subject: action.payload.subject,
                number_of_teams: action.payload.number_of_teams,
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

        case TEAM_UPLOAD_SUCCESS:
            return {
                ...state,
                team_upload_success: true,
                admin_loading: false,
            }
        case ADMIN_ACTION_LOADING:
            return {
                ...state,
                admin_loading: action.payload
            }

        case SET_STAFF_FIELD:
            return {
                ...state,
                [action.payload.prop]: action.payload.value 
            }
         
        case GET_AUTH:
            return {
                ...state,
                authorized_staff: action.payload,
                loading_fetch: false
            }

        case PIN_TEAM:

            const team = action.payload.team
            let team_list = null;
            function pinSort(a, b) {
                return boolSort(b.pinned, a.pinned);
            }
            if (state.staff_team_list) {
                const foundindex = state.staff_team_list.findIndex(team_old => team_old.pk === team.pk)
                state.staff_team_list[foundindex] = team;
                const team_list_copy = [].concat(state.staff_team_list);
                team_list_copy[foundindex] = team
                team_list = team_list_copy.sort(pinSort);
            }
            
            return {
                ...state,
                loading_action: false,
                staff_team_list: team_list,
                modal_team: team,
                teams_below: action.payload.teams_below
            }
        
        case STAFF_ACTION_LOADING:

            return {
                ...state,
                loading_action: true
            }
        
        default:
            return state;
    }
}