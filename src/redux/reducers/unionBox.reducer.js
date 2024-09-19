const unionBoxReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE_WITH_UNION':
            return action.payload;
        
        case 'MOVE_EMPLOYEE':
            const { employeeId, sourceId, targetId, sourceType, targetType } = action.payload;
            
            if (targetType === 'union') {
                // Add employee to the target union
                return state.map(union => 
                    union.id === targetId 
                        ? { 
                            ...union, 
                            employees: [...union.employees, { id: employeeId, name: action.payload.employeeName }]
                          }
                        : union
                );
            } else if (sourceType === 'union') {
                // Remove employee from the source union when moved to a job or another union
                return state.map(union => 
                    union.id === sourceId 
                        ? { 
                            ...union, 
                            employees: union.employees.filter(emp => emp.id !== employeeId)
                          }
                        : union
                );
            }
            return state;

        case 'REMOVE_EMPLOYEE_FROM_UNION':
            // Remove employee from their current union
            return state.map(union => {
                if (union.employees.some(emp => emp.id === action.payload.employeeId)) {
                    return {
                        ...union,
                        employees: union.employees.filter(emp => emp.id !== action.payload.employeeId)
                    };
                }
                return union;
            });

        case 'UPDATE_JOB_EMPLOYEES':
            // If we're updating job employees, we should also remove the employee from any union
            return state.map(union => ({
                ...union,
                employees: union.employees.filter(emp => emp.id !== action.payload.employeeId)
            }));

        default:
            return state;
    }
};

export default unionBoxReducer;