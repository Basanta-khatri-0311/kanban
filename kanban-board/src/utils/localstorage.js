
export const getColumnsFromLocalStorage = () => {
  const columnsData = localStorage.getItem("kanbanColumns");
  return columnsData ? JSON.parse(columnsData) : [];
};

export const saveColumnsToLocalStorage = (columns) => {
  localStorage.setItem("kanbanColumns", JSON.stringify(columns));
};

export const removeColumnsFromLocalStorage = () => {
  localStorage.removeItem("kanbanColumns"); 
};
