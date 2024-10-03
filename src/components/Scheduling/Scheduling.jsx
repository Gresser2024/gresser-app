import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectBox from './ProjectBox';
import './EmployeeStyles.css';
import './Scheduling.css';

const Scheduling = () => {
  const dispatch = useDispatch();
  const jobsBox = useSelector((state) => state.jobReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECTS_WITH_EMPLOYEES' });
  }, [dispatch]);

  const moveEmployee = (employeeId, targetProjectId) => {
    dispatch({ type: 'MOVE_EMPLOYEE', payload: { employeeId, targetProjectId } });
  };

  const assignedWorkers = useMemo(() => {
    return jobsBox.reduce((total, job) => total + (job.employees?.length || 0), 0);
  }, [jobsBox]);

  return (
    <div className="scheduling-container">
      <div className="employee-summary">
        <h2>Workers Assigned to Jobs: {assignedWorkers}</h2>
      </div>
      
      <div className="jobs-container">
        {!jobsBox || jobsBox.length === 0 || !Array.isArray(jobsBox) ? (
          <table className="no-jobs-table">
            <tbody>
              <tr>
                <td colSpan="7">YOU HAVE NO JOBS</td>
              </tr>
            </tbody>
          </table>
        ) : (
          jobsBox.map((job) => (
            <div key={job.id} className="job-box">
              <ProjectBox
                id={job.id}
                job_name={job.job_name}
                employees={job.employees}
                moveEmployee={moveEmployee}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Scheduling;