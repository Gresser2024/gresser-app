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
        
        
        const notAssigned = req.query === "true";
        console.log(`Filter for employees without jobs: ${req.query.notAssigned}`);
        //if notAssigned is true       
        if (notAssigned){
            // sql query to select employee
        const sqlText =
        `
            SELECT "id", "first_name", "last_name", "email", "address", "phone_number"
            FROM "add_employee"
            ORDER BY "last_name" ASC, "first_name" ASC;
        `;
        console.log("updating status with value", notAssigned);
        try {
            await pool.query(sqlText);
            res.sendStatus(204);
        } catch (error) {
            console.log("Error updating employee status", error);
            res.sendStatus(500);
        }
        // if notAssigned is not true, 
        } else {
            // query to select  employees who do not have an assigned job
            const queryText = `
            SELECT "id", "first_name", "last_name", "email", "address", "phone_number"
            FROM "add_employee"
            WHERE "job_id" IS NULL
            ORDER BY "last_name" ASC, "first_name" ASC;
        `;
        
        console.log(`Executing SQL query: ${queryText}`);
        try {
            const result = await pool.query(queryText);
            console.log(`GET EmployeeCard from database`, result.rows);
            res.send(result.rows);
        } catch (error) {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        }
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

//Get endpt to to get unions and employees
router.get('/withunions', async (req, res) => {
    try {
        // query to select union details and employee information within union
        const sqlText = `
            SELECT 
                unions.id AS union_id,
                unions.union_name AS union_name,
                add_employee.id AS employee_id,
                add_employee.first_name AS employee_first_name,
                add_employee.last_name AS employee_last_name
            FROM unions
            LEFT JOIN add_employee ON unions.id = add_employee.union_id
            ORDER BY unions.union_name, add_employee.id;
        `;
        
        const result = await pool.query(sqlText);
        // created a variable to store an object for the unions and thir employees
        const unions = {};
        
        //Iterate over each row 
        result.rows.forEach(row => {
          //check if the union already exist in the unions object.
            if (!unions[row.union_id]) {
                // if not, create a new entry for the union.
                unions[row.union_id] = {
                    // store the union id, union name and created an empty array for employees 
                    id: row.union_id,
                    union_name: row.union_name,
                    employees: []
                };
            }
            
            // if the row contains an employee ID, add employee details 
            if (row.employee_id) {
                unions[row.union_id].employees.push({
                    id: row.employee_id,
                    first_name: row.employee_first_name,
                    last_name: row.employee_last_name
                });
            }
        });
        
       // send the result as an array of unions with employees to the client 
        res.send(Object.values(unions));
    } catch (error) {
        console.error('Error fetching unions with employees:', error);
        res.status(500).send('Error fetching unions with employees');
    }
});

// poset endpoint- allows users to create new union and employee history
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('User is authenticated?:', req.isAuthenticated());
    console.log('Current user is:', req.user.username);
    console.log('Current request body is:', req.body);

    // destructuring request body
    const { first_name, last_name, employee_number, union_name, employee_status, phone_number, email, address, job_id } = req.body;

    try {
        // query to insert a new union into the unions table
        const insertUnionQuery = `
            INSERT INTO "unions" ("union_name")
            VALUES ($1)
            RETURNING "id"
        `;
        const unionValues = [union_name];
        const unionResult = await pool.query(insertUnionQuery, unionValues);
        const unionId = unionResult.rows[0].id;

      //query inserts a new employee into the ass_employee table
        const insertEmployeeQuery = `
            INSERT INTO "add_employee" (
                "first_name", "last_name", "employee_number", "employee_status", "phone_number", "email", "address", "job_id", "union_id"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING "id"
        `;
        const employeeValues = [first_name, last_name, employee_number, employee_status, phone_number, email, address, job_id, unionId];
        await pool.query(insertEmployeeQuery, employeeValues);

        res.status(201).send({ message: 'Employee and union record created successfully' });
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
