
export const getColumnsFromLocalStorage = () => {
  const savedColumns = localStorage.getItem("columns");
  return savedColumns ? JSON.parse(savedColumns) : [];
};

export const saveColumnsToLocalStorage = (columns) => {
  localStorage.setItem("columns", JSON.stringify(columns));
};

export const removeColumnsFromLocalStorage = () => {
  localStorage.removeItem("kanbanColumns"); 
};
