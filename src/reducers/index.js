import { combineReducers } from 'redux';
import MainReducer from './MainReducer';
import AccountReducer from './AccountReducer';

export default combineReducers({
    main: MainReducer,
    account: AccountReducer
})