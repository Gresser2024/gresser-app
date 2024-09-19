const jobReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_JOB':
      const newJob = action.payload;
      console.log('new job', newJob);
      return newJob;

    case 'SET_PROJECTS_WITH_EMPLOYEES':
      console.log('SET_PROJECTS_WITH_EMPLOYEES', action.payload);
      return action.payload;

    case 'MOVE_EMPLOYEE':
      const { employeeId, sourceId, targetId, sourceType, targetType, employeeName } = action.payload;
      
      if (targetType === 'job') {
        // Add employee to the target job
        return state.map(job => 
          job.id === targetId 
            ? { 
                ...job, 
                employees: [...job.employees, { id: employeeId, first_name: employeeName.split(' ')[0], last_name: employeeName.split(' ')[1] }]
              }
            : job
        );
      } else if (sourceType === 'job') {
        // Remove employee from the source job
        return state.map(job => 
          job.id === sourceId 
            ? { 
                ...job, 
                employees: job.employees.filter(emp => emp.id !== employeeId)
              }
            : job
        );
      }
      return state;

    default:
      return state;
  }
};

export default jobReducer;