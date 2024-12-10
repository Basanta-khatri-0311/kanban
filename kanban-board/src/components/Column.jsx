import React, { useState } from "react";

const Column = ({ column, onEditTitle, onDelete, onAddTask, onEditTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  
  const handleTitleClick = () => setIsEditing(true);
  const handleTitleChange = (e) => setNewTitle(e.target.value);
  const handleSaveTitle = () => {
    setIsEditing(false);
    if (newTitle.trim() && newTitle !== column.title) {
      onEditTitle(column.id, newTitle); 
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSaveTitle();
  };

  
  const handleAddTask = () => {
    if (taskName.trim() && taskDescription.trim()) {
      onAddTask(column.id, taskName, taskDescription);
      setTaskName("");
      setTaskDescription("");
    }
  };

  const handleEditTask = (taskIdx, updatedName, updatedDescription) => {
    onEditTask(column.id, taskIdx, updatedName, updatedDescription);
  };

  const handleDeleteTask = (taskIdx) => {
    onDeleteTask(column.id, taskIdx);
  };

  return (
    <div className="w-[300px] h-[650px] p-4 bg-[#1c1e24] border-2 border-[#161c22] rounded-lg">
      <div className="flex items-center">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleSaveTitle}
            onKeyPress={handleKeyPress}
            className="text-xl font-semibold text-white bg-transparent border-none outline-none focus:ring-slate-50"
            autoFocus
          />
        ) : (
          <div className="flex justify-between items-center w-full">
            <h3
              onClick={handleTitleClick}
              className="text-xl font-semibold text-white cursor-pointer"
            >
              {column.title}
            </h3>
            <button onClick={onDelete}>
              <i className="ri-delete-bin-line text-xl"></i>
            </button>
          </div>
        )}
      </div>

      <div className="mt-4">
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 mb-2 text-black rounded-md"
          />
          <textarea
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full p-2 mb-2 text-black rounded-md"
          />
          <button
            onClick={handleAddTask}
            className="w-full py-2 bg-emerald-500 text-white rounded-md mt-2"
          >
            Add Task
          </button>
        </div>

        
        {column.tasks.length === 0 ? (
          <p className="text-gray-500">No tasks in this column</p>
        ) : (
          column.tasks.map((task, idx) => (
            <div key={idx} className="bg-gray-700 text-white p-2 mb-2 rounded-md">
              <h4 className="font-semibold">{task.name}</h4>
              <p>{task.description}</p>
              <div className="flex justify-between mt-2">
                <button onClick={() => handleEditTask(idx, task.name, task.description)} className="text-blue-400">
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(idx)} className="text-red-500">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
