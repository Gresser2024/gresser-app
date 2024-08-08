

const editJobReducer = (state = [], action) => {


    if(action.type === "SET_JOB"){
        return action.payload
    } else if (action.type === "EDIT_ONCHANGE"){
        return{
            ...state,
            [action.payload.property]: action.payload.value
       }
    } else if(action.type === "EDIT_CLEAR"){
        return {job_name:""}
    }
        return state;
    }
    export default editJobReducer