const unionReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE_UNION':
            return action.payload;
        default:
            return state;
    }
};

export default unionReducer;