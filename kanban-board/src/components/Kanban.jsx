import React, { useState, useEffect } from "react";
import Column from "./Column";
import {
  getColumnsFromLocalStorage,
  saveColumnsToLocalStorage,
} from "../utils/localstorage";
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
    const { source, destination } = result;

    if (!destination) {
      console.log("Dropped outside a droppable area");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("Dropped in the same position");
      return;
    }

    // Find source and destination columns
    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destinationColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destinationColumn) {
      console.log("Source or destination column not found");
      return;
    }

    // Move task
    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
    destinationColumn.tasks.splice(destination.index, 0, movedTask);

    setColumns([...columns]);
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
            <Droppable key={column.id} droppableId={column.id}>
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
