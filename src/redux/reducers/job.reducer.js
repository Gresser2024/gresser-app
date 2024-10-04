
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
      return action.payload;

    case 'SET_PROJECTS_WITH_EMPLOYEES':
      return action.payload.map(project => ({
        ...project,
        employees: project.employees || []
      }));

    default:
      return state;
  }
};

export default jobReducer;
  