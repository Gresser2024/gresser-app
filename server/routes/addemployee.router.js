const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Route to get all employees and unions
router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        console.log('User is authenticated?:', req.isAuthenticated());
        console.log("Current user is: ", req.user.username);

        // sql query to fetch all employees and their union information
        const sqlText = `
            SELECT ae.*, u.union_name 
            FROM "add_employee" ae
            LEFT JOIN "unions" u ON ae."union_id" = u."id"
            ORDER BY ae."last_name" ASC, ae."first_name" ASC;
        `;
        
        try {
            const result = await pool.query(sqlText);
            console.log(`GET from database`, result);
            res.send(result.rows);
        } catch (error) {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }
});


router.get('/employeecard', async (req, res) => {
    if (req.isAuthenticated()) {
        console.log('User is authenticated?:', req.isAuthenticated());
        console.log("Current user is: ", req.user.username);
        
        
            // sql query to select employee
        const sqlText =
        `
            SELECT "id", "first_name", "last_name", "email", "address", "phone_number"
            FROM "add_employee"
            ORDER BY "last_name" ASC, "first_name" ASC;
        `;
        try {
            await pool.query(sqlText);
            res.sendStatus(204);
        } catch (error) {
            console.log("Error updating employee status", error);
            res.sendStatus(500);
        }
        
    }
});

router.get('/union', async (req, res) => {
    if (req.isAuthenticated()) {
        console.log('User is authenticated?:', req.isAuthenticated());
        console.log("Current user is: ", req.user.username);

        const sqlText = `
            SELECT "id", "union_name"
            FROM "unions"
            ORDER BY "union_name" ASC;
        `; 

        try {
            const result = await pool.query(sqlText);
            console.log(`GET from database`, result);
            res.send(result.rows);
        } catch (error) {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }
});

router.get('/withunions', async (req, res) => {
    try {
        // Query to select union details and employee information within the union
        const sqlText = `
            SELECT 
                unions.id AS union_id,
                unions.union_name AS union_name,
                add_employee.id AS employee_id,
                add_employee.first_name AS employee_first_name,
                add_employee.last_name AS employee_last_name,
                add_employee.phone_number AS employee_phone_number,
                add_employee.email AS employee_email,
                add_employee.address AS employee_address
            FROM unions
            LEFT JOIN add_employee ON unions.id = add_employee.union_id
            ORDER BY unions.union_name, add_employee.id;
        `;
        
        const result = await pool.query(sqlText);
        // Create a variable to store an object for the unions and their employees
        const unions = {};
        
        // Iterate over each row 
        result.rows.forEach(row => {
            // Check if the union already exists in the unions object.
            if (!unions[row.union_name]) {
                // If not, create a new entry for the union.
                unions[row.union_id] = {
                    id: row.union_id,
                    union_name: row.union_name,
                    employees: []
                };
            }
            
            // If the row contains an employee ID, add employee details 
            if (row.employee_id) {
                unions[row.union_id].employees.push({
                    id: row.employee_id,
                    first_name: row.employee_first_name,
                    last_name: row.employee_last_name,
                    phone_number: row.employee_phone_number,
                    email: row.employee_email,
                    address: row.employee_address
                });
            }
        });
        
        // Send the result as an array of unions with employees to the client 
        res.json(Object.values(unions));
    } catch (error) {
        console.error('Error fetching unions with employees:', error);
        res.status(500).send('Error fetching unions with employees');
    }
});

router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('User is authenticated?:', req.isAuthenticated());
    console.log('Current user is:', req.user.username);
    console.log('Current request body is:', req.body);

    // Destructuring request body
    const { first_name, last_name, employee_number, union_name, employee_status, phone_number, email, address, job_id } = req.body;

    try {
        // Query to insert a new union into the unions table
        const insertUnionQuery = `
            INSERT INTO "unions" ("union_name")
            VALUES ($1)
            RETURNING "id"
        `;
        const unionValues = [union_name]; // Use union_name here
        const unionResult = await pool.query(insertUnionQuery, unionValues);
        const unionId = unionResult.rows[0].id;

        // Query to insert a new employee into the add_employee table
        const insertEmployeeQuery = `
            INSERT INTO "add_employee" (
                "first_name", "last_name", "employee_number", "employee_status", "phone_number", "email", "address", "job_id", "union_id"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING "id"
        `;
        const employeeValues = [first_name, last_name, employee_number, employee_status, phone_number, email, address, job_id, unionId];
        const employeeResult = await pool.query(insertEmployeeQuery, employeeValues);
        const employeeId = employeeResult.rows[0].id;

        res.status(201).send({
            message: 'Employee and union record created successfully',
            unionId,
            employeeId
        });
    } catch (error) {
        console.error('Error making POST insert for add_employee and unions:', error);
        res.sendStatus(500);
    }
});


// PUT endpt to update an employees details
router.put('/:id', async (req, res) => {
    const employeeId = req.params.id;
    console.log("employee id", employeeId);
    const {
        first_name,
        last_name,
        employee_number,
        employee_status,
        phone_number,
        email,
        address,
        job_id,
        union_id
    } = req.body;

    if (employee_status !== undefined &&
        !first_name &&
        !last_name &&
        !employee_number &&
        !phone_number &&
        !email &&
        !address &&
        !job_id &&
        !union_id) {
        // update employee status only
        const queryText = `
            UPDATE "add_employee"
            SET "employee_status" = $1
            WHERE "id" = $2;
        `;
        console.log("updating status with value", employee_status);
        try {
            await pool.query(queryText, [employee_status, employeeId]);
            res.sendStatus(204);
        } catch (error) {
            console.log("Error updating employee status", error);
            res.sendStatus(500);
        }
    } else {
        // update all employee details
        const values = [
            first_name,
            last_name,
            employee_number,
            employee_status,
            phone_number,
            email,
            address,
            job_id,
            union_id,
            employeeId
        ];
        const query = `
            UPDATE "add_employee"
            SET
                "first_name" = $1,
                "last_name" = $2,
                "employee_number" = $3,
                "employee_status" = $4,
                "phone_number" = $5,
                "email" = $6,
                "address" = $7,
                "job_id" = $8,
                "union_id" = $9
            WHERE "id" = $10;
        `;
        try {
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});



module.exports = router;
