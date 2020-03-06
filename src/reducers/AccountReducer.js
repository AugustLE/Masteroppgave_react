import { 
    LOGIN_LOADING, 
    LOGIN_SUCCESS, 
    FETCH_FEIDE_USER_SUCCESS,
    CHANGE_ROLE,
    ACCOUNT_LOADING,
    SUBJECT_LIST, 
    CHANGE_SUBJECT,
    LOGOUT,
    GET_USER,
    FETCH_TEAM_STATUS,
    ROLE_ERROR,
    PRIVACY_CONSENT_RETURN,
    PRIVACY_CONSENT_LOADING,
    DELETE_USER,
    UNSELECT_SUBJECT
} from '../actions/types';

const INITIAL_STATE = {
    feide_user: null,
    api_user: null,
    account_loading: false,
    subject_list: null,
    subject: null,
    role_error: null,
    privacy_consent: null,
    loading_privacy_consent: false,
    user_deleted: false
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
            return { ...state, api_user: action.payload, account_loading: false, role_error: null };
        
        case ACCOUNT_LOADING:
            return { ...state, account_loading: action.payload };

        case SUBJECT_LIST:
            return { ...state, subject_list: action.payload, account_loading: false };

        case CHANGE_SUBJECT:
                return { ...state, api_user: action.payload, account_loading: false };

        case GET_USER:
            return { 
                ...state, 
                api_user: action.payload.api_user, 
                subject: action.payload.subject,
                account_loading: false 
            };
        
        case FETCH_TEAM_STATUS:
            return {
                ...state,
                subject: action.payload.subject
            };

        case ROLE_ERROR:
            return {
                ...state,
                role_error: action.payload,
                account_loading: false
            };

        case LOGOUT:
            return INITIAL_STATE;

        case PRIVACY_CONSENT_RETURN:
            return {
                ...state,
                privacy_consent: action.payload,
                loading_privacy_consent: false
            }

        case PRIVACY_CONSENT_LOADING:
            return {
                ...state,
                loading_privacy_consent: action.payload
            }
              
        case DELETE_USER:
            return {
                ...state,
                user_deleted: action.payload
            }

        case UNSELECT_SUBJECT:
            return {
                ...state,
                api_user: action.payload, 
                account_loading: false,
                subject: null
            }

        default:
            return state;
    }
}