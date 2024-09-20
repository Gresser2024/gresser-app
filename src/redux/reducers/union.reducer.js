const unionReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_UNIONS_WITH_EMPLOYEES':
        return action.payload;
  
      case 'ADD_EMPLOYEE_TO_UNION': {
        const { unionId, employee } = action.payload;
        return {
          ...state,
          [unionId]: {
            ...state[unionId],
            employees: [...(state[unionId]?.employees || []), employee]
          }
        };
      }
  
      case 'REMOVE_EMPLOYEE_FROM_UNION': {
        const { unionId: removeUnionId, employeeId } = action.payload;
        return {
          ...state,
          [removeUnionId]: {
            ...state[removeUnionId],
            employees: state[removeUnionId].employees.filter(emp => emp.id !== employeeId)
          }
        };
      }
  
      case 'MOVE_EMPLOYEE': {
        const { employeeId, sourceUnionId, targetUnionId, employee } = action.payload;
  
        let newState = { ...state };
  
        // Remove from source union
        if (sourceUnionId) {
          newState = {
            ...newState,
            [sourceUnionId]: {
              ...newState[sourceUnionId],
              employees: newState[sourceUnionId]?.employees.filter(emp => emp.id !== employeeId) || []
            }
          };
        }
  
        // Add to target union (if moving into a union)
        if (targetUnionId) {
          newState = {
            ...newState,
            [targetUnionId]: {
              ...newState[targetUnionId],
              employees: [...(newState[targetUnionId]?.employees || []), employee]
            }
          };
        }
  
        return newState;
      }
  
      default:
        return state;
    }
  };
  
  export default unionReducer;
  