import React from 'react';
import { useDrag } from 'react-dnd';

const EmployeeUnion = ({ id, name, unionName }) => {
  console.log('Employee ID:', id); 
  console.log('Employee Name:', name);
  console.log('Union Name:', unionName);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EMPLOYEE_UNION',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '4px',
        border: '1px solid white',
        cursor: 'move',
        backgroundColor: 'white',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <div>{name}</div>
      <div style={{ fontSize: '12px', color: 'gray' }}>{unionName}</div>
    </div>
  );
};

export default EmployeeUnion;