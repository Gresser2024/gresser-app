import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchEmployeeInfo() {
  try {
    const response = yield call(axios.get, '/api/addemployee');
    yield put({ type: 'SET_EMPLOYEE_INFO', payload: response.data });
  } catch (error) {
    console.error('Error fetching employee information:', error);
  }
}

export function* addEmployeeInfo(action) {
  try {
    yield call(axios.post, '/api/addemployee', action.payload);
    yield put({ type: 'FETCH_EMPLOYEE_INFO' });
  } catch (error) {
    console.error('Error adding employee information:', error);
  }
}

export function* fetchEmployeeCard() {
  try {
    const response = yield call(axios.get, '/api/addemployee/employeecard');
    yield put({ type: 'SET_EMPLOYEE_CARD', payload: response.data });
  } catch (error) {
    console.error('Error fetching employee card:', error);
  }
}

export function* fetchProjectsWithEmployees() {
  try {
    const response = yield call(axios.get, '/api/project/withEmployees');
    yield put({ type: 'SET_PROJECTS_WITH_EMPLOYEES', payload: response.data });
  } catch (error) {
    console.error('Error fetching projects with employees:', error);
  }
}

export function* handleMoveEmployee(action) {
  try {
    const { employeeId, targetProjectId, sourceProjectId, sourceUnionId } = action.payload;
    
    // Make the API call to move the employee
    yield call(axios.post, '/api/moveEmployee', { employeeId, targetProjectId, sourceProjectId, sourceUnionId });

    // Update Redux store directly
    yield put({ 
      type: 'UPDATE_EMPLOYEE_POSITION', 
      payload: { employeeId, targetProjectId, sourceProjectId, sourceUnionId } 
    });

    // We don't need to fetch all data again, as we've already updated the store
    // If you want to ensure data consistency, you can keep these, but they might not be necessary
    // yield put({ type: 'FETCH_PROJECTS_WITH_EMPLOYEES' });
    // yield put({ type: 'FETCH_UNIONS_WITH_EMPLOYEES' });
  } catch (error) {
    console.error('Error moving employee:', error);
    yield put({ type: 'MOVE_EMPLOYEE_FAILURE', error }); 
  }
}

export function* statusToggle(action) {
  try {
    const { id, employee_status } = action.payload;
    yield call(axios.put, `/api/addemployee/${id}`, { employee_status });
    yield put({ type: 'FETCH_EMPLOYEE_INFO' });
  } catch (error) {
    console.error('Error toggling employee status:', error);
  }
}

export function* fetchEmployeeUnion() {
  try {
    const response = yield call(axios.get, '/api/addemployee/union');
    yield put({ type: 'SET_EMPLOYEE_UNION', payload: response.data });
  } catch (error) {
    console.error('Error fetching employee union:', error);
  }
}

export function* fetchUnionsWithEmployees() {
  try {
    const response = yield call(axios.get, '/api/addemployee/withunions');
    yield put({ type: 'SET_EMPLOYEE_WITH_UNION', payload: response.data });
  } catch (error) {
    console.error('Error fetching unions with employees:', error);
  }
}

export function* removeEmployeeFromUnion(action) {
  try {
    const { employeeId, unionId } = action.payload;
    yield call(axios.put, `/api/addemployee/${employeeId}/removeFromUnion`, { unionId });
    yield put({ type: 'FETCH_UNIONS_WITH_EMPLOYEES' });
  } catch (error) {
    console.error('Error removing employee from union:', error);
  }
}