const unionBoxReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE_WITH_UNION':
            return action.payload;
        default:
            return state;
    }
};

export default unionBoxReducer;