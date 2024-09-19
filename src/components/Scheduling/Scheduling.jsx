import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectBox from './ProjectBox';
import Employee from './Employee';
import './EmployeeStyles.css';
import './Scheduling.css';

const getEmployeeColor = (unionName) => {
  if (!unionName) return 'inherit';
  
  const colorMap = {
    'Carpenters': 'blue',
    'Bricklayers': 'red',
    'Cement Masons': 'green',
    'Laborers': 'black',
    'Operators': 'purple',
    'Superintendents': 'pink',
    'Shop/Trucking': 'orange'
  };

  const lowerUnionName = unionName.toLowerCase();
  for (const [key, value] of Object.entries(colorMap)) {
    if (lowerUnionName.includes(key.toLowerCase())) {
      return value;
    }
  }

  return 'inherit';
};

const Scheduling = () => {
  const dispatch = useDispatch();
  const employeeCard = useSelector((state) => state.cardReducer);
  const jobsBox = useSelector((state) => state.jobReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_EMPLOYEE_CARD' });
    dispatch({ type: 'FETCH_PROJECTS_WITH_EMPLOYEES' });
  }, [dispatch]);

  const moveEmployee = (employeeId, targetProjectId) => {
    dispatch({ type: 'MOVE_EMPLOYEE', payload: { employeeId, targetProjectId } });
  };

  return (
    <div className="scheduling-container">
      <div>
        <h3>Jobs</h3>
        {!jobsBox || jobsBox.length === 0 || !Array.isArray(jobsBox) ? (
          <div className="no-jobs-message">YOU HAVE NO JOBS</div>
        ) : (
          <div className="jobs-container">
            {jobsBox.map((job) => (
              <div key={job.id} className="job-box">
                <ProjectBox
                  id={job.id}
                  job_name={job.job_name}
                  employees={job.employees.map(employee => ({
                    ...employee,
                    nameColor: getEmployeeColor(employee.union_name)
                  }))}
                  moveEmployee={moveEmployee}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scheduling;