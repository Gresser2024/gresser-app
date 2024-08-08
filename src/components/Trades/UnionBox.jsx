import React from 'react';
import { useDrop } from 'react-dnd';
import Employee from '../Scheduling/Employee';
import './Box.css';

const UnionBox = ({ id, employees, moveEmployee, union_name, color }) => {
  console.log('NAME in union box:', union_name);
  console.log('id in union box', id);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'EMPLOYEE',
    drop: (item) => {
      console.log('Dropped item:', item);
      moveEmployee(item.id, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        border: '1px solid gray',
        width: '190px',
        minHeight: '150px',
        margin: '1px',
        padding: '1px',
        backgroundColor: isOver ? '#f0f0f0' : '#fff',
      }}
    >
      <h4 className='small-text' style={{ color }}>{union_name}</h4>
      <div className="separator"></div>
      {employees.length === 0 ? (
        <p>No employees assigned</p>
      ) : (
        employees.map(employee => (
          <Employee
            key={employee.id}
            id={employee.id}
            name={`${employee.first_name} ${employee.last_name}`}
          />
        ))
      )}
    </div>
  );
};

export default UnionBox;


