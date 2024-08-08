export const getEmployeeCategory = (unionName) => {
    if (!unionName) return 'default';
    
    switch (unionName.toLowerCase()) {
      case 'carpenters':
        return 'carpenter';
      case 'bricklayers':
        return 'bricklayer';
      case 'cement masons':
        return 'cement-mason';
      case 'laborers':
        return 'laborer';
      case 'operators':
        return 'operator';
      case 'superintendents':
        return 'superintendent';
      case 'shop/trucking':
        return 'shop-trucking';
      default:
        return 'default';
    }
  };