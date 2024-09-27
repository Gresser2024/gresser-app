import React from 'react';
import { useDrop } from 'react-dnd';
import Employee from './Employee';
import { useDispatch } from 'react-redux';
import '../Trades/Box.css';

const ProjectBox = ({ id, employees, job_name }) => {
  const dispatch = useDispatch(); // Get the dispatch function

  const moveEmployee = (employeeId, targetProjectId, targetUnionId) => ({
    type: 'MOVE_EMPLOYEE',
    payload: { employeeId, targetProjectId, targetUnionId }
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'EMPLOYEE',
    drop: (item) => {
      console.log('Dropped item:', item);

    
      // Dispatch the moveEmployee action when an employee is dropped
      dispatch(moveEmployee(item.id, id, null)); // Sending targetProjectId and null for targetUnionId
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const employeeCount = employees.length;

  return (
    <div
      ref={drop}
      style={{
        border: '1px solid gray',
        width: '170px',
        minHeight: '100px',
        margin: '-5px',
        padding: '5px',
        backgroundColor: isOver ? 'lightgray' : 'white',
      }}
    >
      <h4 className='projectboxname'>{job_name}</h4>
      <hr className='namelinebreak'/>
      {employees.length === 0 ? (
        <p>No employees assigned</p>
      ) : (
        employees.map(employee => (
          <Employee
            key={employee.id}
            id={employee.id}
            name={`${employee.first_name} ${employee.last_name}`}
            number={`${employee.phone_number}`}
            email={`${employee.email}`}
            address={`${employee.address}`} />
        ))
      )}
      <hr className='breakline'/>
      <h6 className='employee-count'>Employees: {employeeCount}</h6>
    </div>
  );
};

export default ProjectBox;
