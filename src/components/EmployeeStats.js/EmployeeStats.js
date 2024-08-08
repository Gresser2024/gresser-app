

import React from 'react';

const EmployeeStats = ({ totalEmployees, totalHoursWorked, totalEstimatedHours }) => {
  return (
    <div>
      <h4>Employee Statistics</h4>
      <p>Total number of employees: {totalEmployees}</p>
      <p>Total Hours Worked: {totalHoursWorked}</p>
      <p>Total Estimated Hours: {totalEstimatedHours}</p>
    </div>
  );
};

export default EmployeeStats;