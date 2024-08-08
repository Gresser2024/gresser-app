
// const jobReducer = (state = [], action) => {
//     if (action.type === "SET_JOB") {
//         const newJob = action.payload
//         console.log("new job", newJob)
//         return newJob
//     }
//     return state;

// }

// export default jobReducer;

const jobReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_JOB':
        const newJob = action.payload;
        console.log('new job', newJob);
        return newJob;
  
      case 'SET_PROJECTS_WITH_EMPLOYEES':
        console.log('SET_PROJECTS_WITH_EMPLOYEES', action.payload);
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default jobReducer;
  