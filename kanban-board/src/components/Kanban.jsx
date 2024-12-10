import React, { useState, useEffect } from "react";
import Column from "./Column";
import { getColumnsFromLocalStorage, saveColumnsToLocalStorage } from "../utils/localstorage";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Kanban = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const savedColumns = getColumnsFromLocalStorage();
    setColumns(savedColumns);
  }, []);

  useEffect(() => {
    if (columns.length > 0) {
      saveColumnsToLocalStorage(columns);
    }
  }, [columns]);

  const addNewColumn = () => {
    const newColumn = {
      id: columns.length.toString(),
      title: `Column ${columns.length + 1}`,
      tasks: [],
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const handleEditColumnTitle = (id, newTitle) => {
    const updatedColumns = columns.map((column) =>
      column.id === id ? { ...column, title: newTitle } : column
    );
    setColumns(updatedColumns);
  };

  const handleDeleteColumn = (id) => {
    if (window.confirm("Are you sure you want to delete this column?")) {
      const updatedColumns = columns.filter((column) => column.id !== id);
      setColumns(updatedColumns);
      saveColumnsToLocalStorage(updatedColumns);
    }
  };

  const handleAddTask = (columnId, taskName, taskDescription) => {
    const updatedColumns = columns.map((column) =>
      column.id === columnId
        ? {
            ...column,
            tasks: [
              ...column.tasks,
              { name: taskName, description: taskDescription },
            ],
          }
        : column
    );
    setColumns(updatedColumns);
  };

  const handleEditTask = (
    columnId,
    taskIdx,
    updatedName,
    updatedDescription
  ) => {
    const updatedColumns = columns.map((column) =>
      column.id === columnId
        ? {
            ...column,
            tasks: column.tasks.map((task, idx) =>
              idx === taskIdx
                ? { name: updatedName, description: updatedDescription }
                : task
            ),
          }
        : column
    );
    setColumns(updatedColumns);
  };

  const handleDeleteTask = (columnId, taskIdx) => {
    const updatedColumns = columns.map((column) =>
      column.id === columnId
        ? {
            ...column,
            tasks: column.tasks.filter((_, idx) => idx !== taskIdx),
          }
        : column
    );
    setColumns(updatedColumns);
  };

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    // If no destination or dropped in the same position, do nothing
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
  
    // Create a deep copy of columns to modify
    const newColumns = columns.map(column => ({
      ...column,
      tasks: [...column.tasks]
    }));
  
    // Find the source and destination column indices
    const sourceColumnIndex = newColumns.findIndex(
      column => column.id === source.droppableId
    );
    const destColumnIndex = newColumns.findIndex(
      column => column.id === destination.droppableId
    );
  
    // Remove the dragged task from the source column
    const [removedTask] = newColumns[sourceColumnIndex].tasks.splice(
      source.index, 
      1
    );
  
    // Insert the task into the destination column at the specified index
    newColumns[destColumnIndex].tasks.splice(
      destination.index, 
      0, 
      removedTask
    );
  
    // Update the state with the new columns
    setColumns(newColumns);
  };
  

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <header className="h-[80px] flex justify-between items-center p-6 bg-[#0d1117]">
        <h1 className="text-3xl md:text-5xl underline underline-offset-8 text-emerald-600">
          KANBAN-BOARD
        </h1>
        <button
          onClick={addNewColumn}
          className="h-[50px] md:h-[60px] w-[180px] md:w-[200px] cursor-pointer rounded-lg bg-[#161b22] border-2 border-[#2d333b] p-4 ring-emerald-500 hover:ring-2 flex items-center gap-4"
        >
          <i className="ri-add-line text-lg md:text-2xl"></i> Add Column
        </button>
      </header>

      <main
        className="flex justify-start items-start overflow-x-auto px-4 bg-[#161b22]"
        style={{
          height: `calc(100vh - 80px)`,
        }}
      >
        {columns.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <h2 className="text-2xl md:text-7xl underline underline-offset-8 text-red-500">
              No Columns Added
            </h2>
          </div>
        ) : (
          columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id} >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="column"
                >
                  <Column
                    column={column}
                    onEditTitle={handleEditColumnTitle}
                    onDelete={() => handleDeleteColumn(column.id)}
                    onAddTask={handleAddTask}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        )}
      </main>
    </DragDropContext>
  );
};

export default Kanban;
