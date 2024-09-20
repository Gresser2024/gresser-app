const jobReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_JOB':
    case 'SET_PROJECTS_WITH_EMPLOYEES':
      console.log(`${action.type}:`, action.payload);
      return action.payload;

    case 'MOVE_EMPLOYEE':
      const { employeeId, sourceProjectId, targetProjectId } = action.payload;

      return state.map(job => {
        // Remove employee from the source job
        if (job.id === sourceProjectId) {
          return {
            ...job,
            employees: job.employees.filter(emp => emp.id !== employeeId)
          };
        }
        
        // Add employee to the target job
        if (job.id === targetProjectId) {
          // Check if we're moving from a union, not a job
          const movedEmployee = action.payload.employee || 
            state.find(j => j.id === sourceProjectId)?.employees.find(emp => emp.id === employeeId);

          if (movedEmployee) {
            return {
              ...job,
              employees: [...job.employees, movedEmployee]
            };
          }
        }

        return job;
      });

    default:
      return state;
  }
};

export default jobReducer;
