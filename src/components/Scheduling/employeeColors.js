// File: src/components/Scheduling/employeeColors.js

export const getEmployeeColor = (unionName) => {
    if (!unionName) return 'inherit'; // default color if no union name is provided
    
    const colorMap = {
      'Carpenters': 'blue',
      'Bricklayers': 'red',
      'Cement Masons': 'green',
      'Laborers': 'black',
      'Operators': 'purple',
      'Superintendents': 'pink',
      'Shop/Trucking': 'orange'
    };
  
    // Convert union name to lowercase for case-insensitive matching
    const lowerUnionName = unionName.toLowerCase();
  
    // Find the matching color
    for (const [key, value] of Object.entries(colorMap)) {
      if (lowerUnionName.includes(key.toLowerCase())) {
        return value;
      }
    }
  
    return 'inherit'; // default color if no match is found
  };