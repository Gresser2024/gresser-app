const unionBoxReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EMPLOYEE_WITH_UNION':
        return action.payload;
  
      case 'REMOVE_EMPLOYEE_FROM_UNION': {
        const { employeeId } = action.payload;
        return state.map(union => ({
          ...union,
          employees: union.employees.filter(emp => emp.id !== employeeId)
        }));
      }
  
      default:
        return state;
    }
  };
  
  export default unionBoxReducer;
  