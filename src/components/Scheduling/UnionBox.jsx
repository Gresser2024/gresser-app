import React from 'react';
import { useDrop } from 'react-dnd';
import Employee from '../Scheduling/Employee';  // Adjust this import path as necessary
import '../Trades/Box.css'

const UnionBox = ({ id, union_name, employees, moveEmployee }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'EMPLOYEE',
    drop: (item) => moveEmployee(item.id, item.sourceId, id, item.sourceType, 'union'),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Ensure employees is an array, if not, default to an empty array
  const safeEmployees = Array.isArray(employees) ? employees : [];

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
      <h4 className='unionboxname'>{union_name}</h4>
      <hr className='namelinebreak'/>
      {safeEmployees.length === 0 ? (
        <p>No employees assigned</p>
      ) : (
        safeEmployees.map(employee => (
          <Employee
            key={employee.id}
            id={employee.id}
            name={`${employee.first_name} ${employee.last_name}`}
            sourceType="union"
            sourceId={id}
          />
        ))
      )}
      <hr className='breakline'/>
      <h6 className='employee-count'>Employees: {safeEmployees.length}</h6>
    </div>
  );
};

export default UnionBox;