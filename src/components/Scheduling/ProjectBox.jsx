import React from 'react';
import { useDrop } from 'react-dnd';
import Employee from './Employee';
import '../Trades/Box.css'

const ProjectBox = ({ id, employees, moveEmployee, job_name }) => {
  console.log('ProjectBox rendered with id:', id);
  console.log("Employees in ProjectBox:", employees);
  console.log("job_name:", job_name);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'EMPLOYEE',
    drop: (item, monitor) => {
      console.log('Item dropped:', item);
      console.log('Drop result:', monitor.getDropResult());
      console.log('Is over current:', monitor.isOver({ shallow: true }));
      moveEmployee(item.id, id, item.sourceProjectId, item.unionId);
    },
    hover: (item, monitor) => {
      console.log('Hover detected:', item);
      console.log('Is over current:', monitor.isOver({ shallow: true }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [id, moveEmployee]);

  console.log('Is over:', isOver);

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
            address={`${employee.address}`}
            nameColor={employee.nameColor}
            unionId={employee.union_id}
            sourceProjectId={id}
          />
        ))
      )}
      <hr className='breakline'/>
      <h6 className='employee-count'>Employees: {employees.length}</h6>
    </div>
  );
};

export default ProjectBox;