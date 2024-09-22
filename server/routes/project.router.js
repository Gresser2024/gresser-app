const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// Route to fetch jobs along with their employees
router.get('/withEmployees', async (req, res) => {
    try {
      // query to select jobs and their employees
      const sqlText = `
        SELECT 
          jobs.job_id AS job_id, 
          jobs.job_name AS job_name, 
          add_employee.id AS employee_id, 
          add_employee.first_name AS employee_first_name,
          add_employee.last_name AS employee_last_name
        FROM jobs
        LEFT JOIN add_employee ON jobs.job_id = add_employee.job_id
        ORDER BY jobs.job_id, add_employee.id;
      `;
      
      const result = await pool.query(sqlText);
      // created an object for jobs and their employees
      const jobs = {};
      
      // iterate over each row in the result set
      result.rows.forEach(row => {
        // If the job doenst exist in the jobs object create it 
        if (!jobs[row.job_id]) {
          jobs[row.job_id] = {
            id: row.job_id,
            job_name: row.job_name,
            employees: []
          };
        }
       // If there's an employee associated with the job, add them to the employees array

        if (row.employee_id) {
          jobs[row.job_id].employees.push({
            id: row.employee_id,
            first_name: row.employee_first_name,
            last_name: row.employee_last_name
          });
        }
      });
      // send the jobs object as a reponse 
      res.send(Object.values(jobs));
    } catch (error) {
      console.error('Error fetching jobs with employees:', error);
      res.status(500).send('Error fetching jobs with employees');
    }
  });
  
  


module.exports = router;