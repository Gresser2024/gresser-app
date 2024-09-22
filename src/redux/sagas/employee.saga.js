import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

// saga to fetch employee info
function* fetchEmployeeInfo() {
  try {
    //Make an API call to fetch employee info
    const response = yield call(axios.get, '/api/addemployee');
    //Dispatch action to store the dteched data in the redux store
    yield put({ type: 'SET_EMPLOYEE_INFO', payload: response.data });
  } catch (error) {
    console.error('Error fetching employee information:', error);
  }
}

// saga to add new employee info
function* addEmployeeInfo(action) {
  try {
    // Make an API call to add a new employee
    yield call(axios.post, '/api/addemployee', action.payload);
    //Fetch updated employee info after adding the new employees
    yield put({ type: 'FETCH_EMPLOYEE_INFO' });
  } catch (error) {
    console.error('Error adding employee information:', error);
  }
}

// Saga to fetch employee card info
function* fetchEmployeeCard() {
  try {
    // Make an API call to fetch employee card details
    const response = yield call(axios.get, '/api/addemployee/employeecard');
    // Dispatch action to store the fetched card data in the redux store
    console.log("employee card data ",response.data)
    yield put({ type: 'SET_EMPLOYEE_CARD', payload: response.data });
    console.log("employee card data ",response.data)

  } catch (error) {
    console.error('Error fetching employee information:', error);
  }
}



// saga to fetch projects along with their associated employees
function* fetchProjectsWithEmployees() {
  try {
    // Make an API call to fetch projects with employees
    const response = yield call(axios.get, '/api/project/withEmployees');
    console.log("Response for fetchProjectsWithEmployees", response.data)
    // Dispatch action to store the fetched project data in the Redux store
    yield put({ type: 'SET_PROJECTS_WITH_EMPLOYEES', payload: response.data });
  } catch (error) {
    console.error('Error fetching projects with employees:', error);
  }
}

// Saga to handle movng an employee to a different project
function* handleMoveEmployee(action) {
  try {
    const { employeeId, targetProjectId } = action.payload;
    // Make an API call to move the employee
    yield call(axios.post, '/api/moveEmployee', { employeeId, targetProjectId });
   //Fetch updated projects and employee card information 
    yield put({ type: 'FETCH_PROJECTS_WITH_EMPLOYEES' });
    yield put({ type: 'FETCH_EMPLOYEE_CARD' });
  } catch (error) {
    // Dispatch a failure action if the move operation fails
    yield put({ type: 'MOVE_EMPLOYEE_FAILURE', error }); 
  }
}

// Saga to toggle the status of an employee
function* statusToggle(action) {
  try {
    console.log("action.payload", action.payload)
    const { id, employee_status } = action.payload;
    console.log("Toggling employee status:", employee_status, "for employee ID:", id);
    //Make an API call to update the emplyees status
    yield call(axios.put, `/api/addemployee/${id}`, { employee_status });
    // Fetch updated employee information 
    yield put({ type: 'FETCH_EMPLOYEE_INFO' });
  } catch (error) {
    console.error("Error toggling employee status:", error);
  }
}

// Saga to fetch employee union information 
function* fetchEmployeeUnion() {
  try {
    // Make an API call to fetch employee union information
    const response = yield call(axios.get, '/api/addemployee/union');
    // Dispatch action to store the fetched union data in the Redux store
    yield put({ type: 'SET_EMPLOYEE_UNION', payload: response.data });
    // Fetch unions with employees after fetching the union info
    yield put ({type: 'FETCH_UNIONS_WITH_EMPLOYEES'})
  } catch (error) {
    console.error('Error fetching employee union information:', error);
  }
}

// Saga to fetch unions that have employees
function* fetchUnionsWithEmployees() {
  try {
    // Make an API call to fetch unions with their employees
    const response = yield call(axios.get, '/api/addemployee/withunions');
    console.log("Response for fetchUnionsWithEmployees", response.data)
    // Dispatch action to store the fetched unions with employees in the Redux store 
    yield put({ type: 'SET_EMPLOYEE_WITH_UNION', payload: response.data });
  } catch (error) {
    console.error('Error fetching unions with employees:', error);
  }
}


export default function* rootSaga() {
  yield takeLatest('FETCH_EMPLOYEE_INFO', fetchEmployeeInfo);
  yield takeLatest('ADD_EMPLOYEE_INFO', addEmployeeInfo);
  yield takeLatest('FETCH_EMPLOYEE_CARD', fetchEmployeeCard);
  yield takeLatest('FETCH_PROJECTS_WITH_EMPLOYEES', fetchProjectsWithEmployees);
  yield takeLatest('MOVE_EMPLOYEE', handleMoveEmployee);
  yield takeLatest('EMPLOYEE_TOGGLE_STATUS', statusToggle);
  yield takeLatest('FETCH_EMPLOYEE_UNION', fetchEmployeeUnion);
  yield takeLatest('FETCH_UNIONS_WITH_EMPLOYEES', fetchUnionsWithEmployees);
}
