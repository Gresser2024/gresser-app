const initialState = {
    unionEmployees: [], // Employees in the union box
    projectEmployees: [] // Employees in the project box
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE_CARD':
            return { ...state, unionEmployees: action.payload }; // Set union employees

        case 'MOVE_EMPLOYEE':
            const { employeeId, targetProjectId } = action.payload;

            // Find the employee being moved
            const movingEmployee = state.unionEmployees.find(emp => emp.id === employeeId);

            return {
                ...state,
                unionEmployees: state.unionEmployees.filter(emp => emp.id !== employeeId),
                projectEmployees: targetProjectId 
                    ? [...state.projectEmployees, movingEmployee] // Add to project if specified
                    : state.projectEmployees
            };
        
        default:
            return state;
    }
};

export default employeeReducer;
