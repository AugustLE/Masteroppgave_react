import { combineReducers } from 'redux';
import MainReducer from './MainReducer';
import AccountReducer from './AccountReducer';
import StudentReducer from './StudentReducer';
import StaffReducer from './StaffReducer';

export default combineReducers({
    main: MainReducer,
    account: AccountReducer,
    student: StudentReducer,
    staff: StaffReducer
})