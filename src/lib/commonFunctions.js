// Conditional
export const if_ObjectIsEmpty = (object) => (Object.keys(object).length === 0);

// Functional
export const createArrayBy_ObjectValues = (object) => Object.keys(object).map(key => object[key]);
