import { 
    LOGIN_LOADING, 
    LOGIN_SUCCESS, 
    FETCH_FEIDE_USER_SUCCESS,
    CHANGE_ROLE,
    EDIT_PROFILE_LOADING 
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    feide_user: null,
    api_user: null,
    edit_account_loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case LOGIN_LOADING:
            return { ...state, loading: action.payload };
        
        case FETCH_FEIDE_USER_SUCCESS:
            return { ...state, feide_user: action.payload };
        
        case LOGIN_SUCCESS:
            return { ...state, api_user: action.payload };
        
        case CHANGE_ROLE:
            return { ...state, api_user: action.payload };
        
        case EDIT_PROFILE_LOADING:
            return { ...state, edit_account_loading: action.payload };
         
        default:
            return state;
    }
}