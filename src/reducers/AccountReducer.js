import { 
    LOGIN_LOADING, 
    LOGIN_SUCCESS, 
    FETCH_FEIDE_USER_SUCCESS,
    CHANGE_ROLE,
    ACCOUNT_LOADING,
    SUBJECT_LIST, 
    CHANGE_SUBJECT,
    LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
    feide_user: null,
    api_user: null,
    account_loading: false,
    enrolled_subjects: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case LOGIN_LOADING:
            return { ...state, account_loading: action.payload };
        
        case FETCH_FEIDE_USER_SUCCESS:
            return { ...state, feide_user: action.payload };
        
        case LOGIN_SUCCESS:
            return { ...state, api_user: action.payload, account_loading: false };
        
        case CHANGE_ROLE:
            return { ...state, api_user: action.payload, account_loading: false  };
        
        case ACCOUNT_LOADING:
            return { ...state, account_loading: action.payload };

        case SUBJECT_LIST:
            return { ...state, enrolled_subjects: action.payload, account_loading: false };

        case CHANGE_SUBJECT:
                return { ...state, api_user: action.payload, account_loading: false };
        
        case LOGOUT:
            return INITIAL_STATE;
              
        default:
            return state;
    }
}