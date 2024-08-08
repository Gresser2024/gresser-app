const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.post('/', rejectUnauthenticated, async (req, res) => {
    const { employeeId, targetProjectId } = req.body;
    console.log('Request Body:', req.body); 

    try {
        await pool.query('BEGIN');

        const result = await pool.query(
            'UPDATE "add_employee" SET "job_id" = $1 WHERE "id" = $2',
            [targetProjectId, employeeId]
        );

        if (result.rowCount === 0) {
            throw new Error('Employee not found');
        }

        await pool.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error moving employee:', error);
        res.status(500).send(`Error moving employee: ${error.message}`);
    }
});

module.exports = router;