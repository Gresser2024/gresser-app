const initialState = {
    first_name: '',
    last_name: '',
    employee_number: '',
    union_id: '',
    employee_status: 0,
    phone_number: '',
    email: '',
    address: ''
};

const editEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EDIT_EMPLOYEE':
            return action.payload;
        case 'EDIT_ONCHANGE':
            return {
                ...state,
                [action.payload.property]: action.payload.value
            };
        case 'EDIT_CLEAR':
            return initialState;
        default:
            return state;
    }
};

export default editEmployeeReducer;
