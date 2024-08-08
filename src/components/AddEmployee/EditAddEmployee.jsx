import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditEmployee() {
    const dispatch = useDispatch();
    const history = useHistory();
    const editEmployee = useSelector((store) => store.editEmployeeReducer);

    useEffect(() => {
        dispatch({ type: "FETCH_EMPLOYEE" });
    }, [dispatch]);

    const handleChange = (event, property) => {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: { property: property, value: event.target.value }
        });
    };

    const handleUnionID = (event) => {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {property:'unionName',value:event.target}
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`/api/addemployee/${editEmployee.id}`, editEmployee)
            .then(response => {
                dispatch({ type: 'EDIT_CLEAR' });
                history.push('/addEmployee');
            })
            .catch(error => {
                console.log('Error on PUT: ', error);
            });
    };

    return (
        <div>
            <h2 className='Edit-title'> Edit Employee</h2>

            <form className='employee-edit' onSubmit={handleSubmit}>
            <p className='employee-toedit'>About to edit: {editEmployee.last_name} {editEmployee.first_name} </p>

                <div>
                    <label>
                        Last Name
                        <input
                        className='l-name'
                            type="text"
                            name="last_name"
                            value={editEmployee.last_name}
                            onChange={(event) => handleChange(event, 'last_name')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        First Name
                        <input
                        className='f-name'
                            type="text"
                            name="first_name"
                            value={editEmployee.first_name}
                            onChange={(event) => handleChange(event, 'first_name')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Employee Number
                        <input
                        className='employee-num'
                            type="text"
                            name="employee_number"
                            value={editEmployee.employee_number}
                            onChange={(event) => handleChange(event, 'employee_number')}
                        />
                    </label>
                </div>
                {/* <div>
                    <label>
                        Union ID
                        <input
                        className='union-id'
                            type="text"
                            name="union_id"
                            value={editEmployee.union_id}
                            onChange={(event) => handleChange(event, 'union_id')}
                        />
                    </label>
                </div> */}
                <div>
                <select
                id="union_name"
                name="union_name"
                value={editEmployee.unionName}
                onChange={(event) => handleUnionID(event.target)}
            >
                <option value="" disabled>Select a union</option>
                <option value="21 - Bricklayers">21 - Bricklayers</option>
                <option value="22 - Cement Masons/Finishers">22 - Cement Masons/Finishers</option>
                <option value="23 - Laborers">23 - Laborers</option>
                <option value="24 - Operators">24 - Operators</option>
                <option value="25 - Carpenters">25 - Carpenters</option>
            </select>
                </div>
                <div>
                    <label>
                        Phone Number
                        <input
                         className='phone-input'
                            type="text"
                            name="phone_number"
                            value={editEmployee.phone_number}
                            onChange={(event) => handleChange(event, 'phone_number')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email
                        <input
                        className='email-input'
                            type="text"
                            name="email"
                            value={editEmployee.email}
                            onChange={(event) => handleChange(event, 'email')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Address
                        <input
                         className='adress-input'
                            type="text"
                            name="address"
                            value={editEmployee.address}
                            onChange={(event) => handleChange(event, 'address')}
                        />
                    </label>
                </div>
                <button className='submit-employee-edit' type="submit">Update Employee</button>
            </form>
        </div>
    );
}

export default EditEmployee;