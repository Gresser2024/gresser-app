// const cardReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_EMPLOYEE_INFO':
//             return action.payload;
//         default:
//             return state;
//     }
// };

// export default cardReducer;

// const cardReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'MOVE_EMPLOYEE':
//             return state.map(employee =>
//                 employee.id === action.payload.id
//                     ? { ...employee, location: action.payload.newLocation }
//                     : employee
//             );
//         case 'SET_EMPLOYEES':
//             return action.payload;
//         default:
//             return state;
//     }
// };


// export default cardReducer;

const cardReducer = (state = [], action) => {
//  const employeeReducer = (state = [], action) => {
    switch (action.type) {
        case 'MOVE_EMPLOYEE':
            return state.map(employee =>
                employee.id === action.payload.id
                    ? { ...employee, location: action.payload.newLocation }
                    : employee
            );
        case 'SET_EMPLOYEES':
            return action.payload;
        default:
            return state;
    }
};

export default cardReducer;