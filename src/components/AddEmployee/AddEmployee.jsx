import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AddEmployee.css';
import ToggleEmployee from './ToggleEmployee';

const AddEmployee = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.addEmployeeReducer);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [unionId, setUnionId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_EMPLOYEE_INFO' });
    }, [dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEmployee = {
            first_name: firstName,
            last_name: lastName,
            employee_number: employeeNumber,
            union_id: unionId,
            phone_number: phoneNumber,
            email,
            address
        };
        dispatch({ type: 'ADD_EMPLOYEE_INFO', payload: newEmployee });

        setFirstName('');
        setLastName('');
        setEmployeeNumber('');
        setUnionId('');
        setPhoneNumber('');
        setEmail('');
        setAddress('');
    };

    const handleEditClick = (emp) => {
        dispatch({ type: 'SET_EDIT_EMPLOYEE', payload: emp });
        history.push('/editemployee');
    };

    const fillDummyDataAndSubmit = () => {
        const dummyData = {
            firstName: 'Emily',
            lastName: 'Smith',
            employeeNumber: 'A12345',
            unionId: '21',
            phoneNumber: '(555) 678-1234',
            email: 'emily.smith@company.com',
            address: '456 Elm Street, Springfield, IL'
        };

        setFirstName(dummyData.firstName);
        setLastName(dummyData.lastName);
        setEmployeeNumber(dummyData.employeeNumber);
        setUnionId(dummyData.unionId);
        setPhoneNumber(dummyData.phoneNumber);
        setEmail(dummyData.email);
        setAddress(dummyData.address);

        dispatch({
            type: 'ADD_EMPLOYEE_INFO',
            payload: {
                first_name: dummyData.firstName,
                last_name: dummyData.lastName,
                employee_number: dummyData.employeeNumber,
                union_id: dummyData.unionId,
                phone_number: dummyData.phoneNumber,
                email: dummyData.email,
                address: dummyData.address
            }
        });
    };

    return (
        <>
            <h2 className='employee-title' onClick={fillDummyDataAndSubmit}>Add Employee</h2>

            <form className='employee-inputs' onSubmit={handleSubmit}>
                <div>
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <input
                    type="text"
                    name="employee_number"
                    placeholder="Employee Number"
                    value={employeeNumber}
                    onChange={(event) => setEmployeeNumber(event.target.value)}
                />
                <select
                    id="union_id"
                    name="union_id"
                    value={unionId}
                    onChange={(event) => setUnionId(event.target.value)}
                >
                    <option value="" disabled>Select a union</option>
                    <option value="21">21 - Bricklayers</option>
                    <option value="22">22 - Cement Masons/Finishers</option>
                    <option value="23">23 - Laborers</option>
                    <option value="24">24 - Operators</option>
                    <option value="25">25 - Carpenters</option>
                </select>
                </div>
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <button className="employee-button" type="submit">Add Employee</button>
            </form>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Employee Number</th>
                        <th>Union</th>
                        <th>Status</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.last_name}</td>
                            <td>{emp.first_name}</td>
                            <td>{emp.employee_number}</td>
                            <td>{emp.union_name}</td>
                            <td>
                                <ToggleEmployee emp={emp} />
                            </td>
                            <td>{emp.phone_number}</td>
                            <td>{emp.email}</td>
                            <td>{emp.address}</td>
                            <td><button className='employee-editbtn' onClick={() => handleEditClick(emp)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AddEmployee;