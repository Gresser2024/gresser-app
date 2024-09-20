import { all, takeLatest } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import jobSaga from './job.saga';
import {
  fetchEmployeeInfo,
  addEmployeeInfo,
  fetchEmployeeCard,
  fetchProjectsWithEmployees,
  handleMoveEmployee,
  statusToggle,
  fetchEmployeeUnion,
  fetchUnionsWithEmployees,
  removeEmployeeFromUnion
} from './employee.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    jobSaga(),
    takeLatest('FETCH_EMPLOYEE_INFO', fetchEmployeeInfo),
    takeLatest('ADD_EMPLOYEE_INFO', addEmployeeInfo),
    takeLatest('FETCH_EMPLOYEE_CARD', fetchEmployeeCard),
    takeLatest('FETCH_PROJECTS_WITH_EMPLOYEES', fetchProjectsWithEmployees),
    takeLatest('MOVE_EMPLOYEE', handleMoveEmployee),
    takeLatest('EMPLOYEE_TOGGLE_STATUS', statusToggle),
    takeLatest('FETCH_EMPLOYEE_UNION', fetchEmployeeUnion),
    takeLatest('FETCH_UNIONS_WITH_EMPLOYEES', fetchUnionsWithEmployees),
    takeLatest('REMOVE_EMPLOYEE_FROM_UNION', removeEmployeeFromUnion),
  ]);
}