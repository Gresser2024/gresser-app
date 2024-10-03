import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectBox from './ProjectBox';
import './EmployeeStyles.css';
import './Scheduling.css';

const Scheduling = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const jobsBox = useSelector((state) => state.jobReducer);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch({ type: 'FETCH_PROJECTS_WITH_EMPLOYEES' });
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const moveEmployee = (employeeId, targetProjectId) => {
    dispatch({ type: 'MOVE_EMPLOYEE', payload: { employeeId, targetProjectId } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="scheduling-container">
      <div>
        {!jobsBox || jobsBox.length === 0 || !Array.isArray(jobsBox) ? (
          <table className="no-jobs-table">
            <tbody>
              <tr>
                <td colSpan="7">YOU HAVE NO JOBS</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="jobs-container">
            {jobsBox.map((job) => (
              <div key={job.id} className="job-box">
                <ProjectBox
                  id={job.id}
                  job_name={job.job_name}
                  employees={job.employees || []}
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