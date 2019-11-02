import { combineReducers } from 'redux';
import MainReducer from './MainReducer';
import AccountReducer from './AccountReducer';
import StudentReducer from './StudentReducer';

export default combineReducers({
    main: MainReducer,
    account: AccountReducer,
    student: StudentReducer
})