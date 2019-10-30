import { combineReducers } from 'redux';
import MainReducer from './MainReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    main: MainReducer,
    auth: AuthReducer
})