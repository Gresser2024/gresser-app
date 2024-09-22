const unionReducer = (state = [], action) => {
    // Switch statement to handle different action types
    switch (action.type) {
        // if the action type iss "SET_EMPLOYEE_UNION"
        case 'SET_EMPLOYEE_UNION':
            //Return the payload from the action as the new state
            return action.payload;

            // if the action type does not match any cases
        default:
            // Return the current state unchanged. 
            return state;
    }
};

export default unionReducer;

// const unionReducer = (state = [], action) => {
//     // Switch statement to handle different action types
//     switch (action.type) {
//         // if the action type iss "SET_EMPLOYEE_UNION"
//         case 'SET_EMPLOYEE_UNION':
//             //Return the payload from the action as the new state
//             return action.payload;

//             case 'REMOVE_EMPLOYEE_FROM_UNION': {
//                 const { employeeId } = action.payload;
//                 // Return a new state without the removed employee
//                 return state.filter(emp => emp.id !== employeeId);
//               } 

//             // if the action type does not match any cases
//         default:
//             // Return the current state unchanged. 
//             return state;
//     }
// };

// export default unionReducer;
