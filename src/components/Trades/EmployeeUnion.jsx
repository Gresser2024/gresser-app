// import React from 'react';
// import { useDrag } from 'react-dnd';

// const EmployeeUnion = ({ id, name, unionName }) => {
//   console.log('Employee ID:', id); 
//   console.log('Employee Name:', name);
//   console.log('Union Name:', unionName);

//   // useDrag hook to enable drag and drop functionality
//   const [{ isDragging }, drag] = useDrag(() => ({
//     // type of item being dragged
//     type: 'EMPLOYEE_UNION',
//     // Data about the item( in this case, just the employee ID)
//     item: { id },
//     collect: (monitor) => ({
//       // collecting the dragging state
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={drag}
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         padding: '8px',
//         margin: '4px',
//         border: '1px solid white',
//         cursor: 'move',
//         backgroundColor: 'white',
//         borderRadius: '4px',
//         whiteSpace: 'nowrap',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//       }}
//     >
//       <div>{name}</div>
//       <div style={{ fontSize: '12px', color: 'gray' }}>{unionName}</div>
//     </div>
//   );
// };

// export default EmployeeUnion;