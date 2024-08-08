const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', async (req, res) => {
  try {
    const filterDate = req.query.filterDate;

    let jobsQuery = 'SELECT * FROM "jobs"';
    let queryParams = '';

    if (filterDate) {
      queryParams = ` WHERE '${filterDate}' BETWEEN "start_date" AND "end_date"`;
    }

    jobsQuery += queryParams;
    jobsQuery += ' ORDER BY "job_id"';

    const jobsResult = await pool.query(jobsQuery);
    const jobs = jobsResult.rows;

    for (let job of jobs) {
      const employeesQuery = `SELECT * FROM "user" WHERE "location" = '${job.location}'`;
      const employeesResult = await pool.query(employeesQuery);
      job.employees = employeesResult.rows;

      const rainDaysQuery = `SELECT date FROM "rain_days" WHERE "job_id" = $1 ORDER BY date`;
      const rainDaysResult = await pool.query(rainDaysQuery, [job.job_id]);
      job.rain_days = rainDaysResult.rows;
    }

    res.json(jobs);
  } catch (error) {
    console.error('Error from jobshistory.router.js', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/rainday', async (req, res) => {
  try {
    const { jobId, date } = req.body;

    const checkQuery = 'SELECT * FROM "rain_days" WHERE "job_id" = $1 AND "date" = $2';
    const checkResult = await pool.query(checkQuery, [jobId, date]);

    if (checkResult.rows.length > 0) {
      const deleteQuery = 'DELETE FROM "rain_days" WHERE "job_id" = $1 AND "date" = $2';
      await pool.query(deleteQuery, [jobId, date]);
    } else {
      const insertQuery = 'INSERT INTO "rain_days" ("job_id", "date") VALUES ($1, $2)';
      await pool.query(insertQuery, [jobId, date]);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error setting/deleting rain day from jobshistory.router:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;