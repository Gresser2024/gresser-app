const unionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_UNIONS_WITH_EMPLOYEES':
            return action.payload;
        case 'ADD_EMPLOYEE_TO_UNION':
            const { unionId, employee } = action.payload;
            return {
                ...state,
                [unionId]: {
                    ...state[unionId],
                    employees: [...(state[unionId]?.employees || []), employee]
                }
            };
        case 'REMOVE_EMPLOYEE_FROM_UNION':
            const { unionId: removeUnionId, employeeId } = action.payload;
            return {
                ...state,
                [removeUnionId]: {
                    ...state[removeUnionId],
                    employees: state[removeUnionId].employees.filter(emp => emp.id !== employeeId)
                }
            };
        default:
            return state;
    }
};

export default unionReducer;