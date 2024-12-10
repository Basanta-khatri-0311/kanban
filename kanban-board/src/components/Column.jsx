import React, { useState } from "react";

const Column = ({
  column,
  onEditTitle,
  onDelete,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTaskIdx, setEditingTaskIdx] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedTaskDescription, setEditedTaskDescription] = useState("");

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

  const addTaskToColumn = () => {
    if (taskName.trim() && taskDescription.trim()) {
      onAddTask(column.id, taskName, taskDescription);
      setTaskName("");
      setTaskDescription("");
      setIsAddingTask(false);
    }else{
      alert("Both Task Title and Description are required")
    }
  };

  const handleEditTask = (taskIdx) => {
    const task = column.tasks[taskIdx];
    setEditingTaskIdx(taskIdx);
    setEditedTaskName(task.name);
    setEditedTaskDescription(task.description);
  };

  const handleSaveEditedTask = () => {
    if (editedTaskName.trim() && editedTaskDescription.trim()) {
      onEditTask(
        column.id,
        editingTaskIdx,
        editedTaskName,
        editedTaskDescription
      );
      setEditingTaskIdx(null);
      setEditedTaskName("");
      setEditedTaskDescription("");
    }
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
            className="text-xl font-semibold text-white bg-transparent border-2 border-emerald-600 outline-none px-4 py-2"
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
            <button
              onClick={onDelete}
              className=" hover:bg-red-600 hover:rounded-full w-[40px] h-[40px]"
            >
              <i className="ri-delete-bin-line text-xl"></i>
            </button>
          </div>
        )}
      </div>

      <div className="mt-4">
        {isAddingTask ? (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-2 mb-2 text-white rounded-md bg-transparent border-2 border-transparent focus:border-emerald-600 focus:outline-none"
            />
            <textarea
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-2 mb-2 text-white rounded-md bg-transparent border-2 border-transparent focus:border-emerald-600 focus:outline-none"
            />
            <button
              onClick={addTaskToColumn}
              className="w-full py-2 bg-emerald-500 text-white rounded-md mt-2"
            >
              Add Task
            </button>
            
            <button
              onClick={() => setIsAddingTask(false)}
              className="w-full py-2 mt-2 text-red-600 hover:text-white hover:bg-red-600 border-2 border-red-600 rounded-md"
            >
              Close
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-full py-2 bg-emerald-500 text-white rounded-md mt-2"
          >
            Add Task
          </button>
        )}

        {column.tasks.length === 0 ? (
          <p className="text-gray-500 mt-6">No tasks in this column</p>
        ) : (
          column.tasks.map((task, idx) => (
            <div
              key={idx}
              className="bg-gray-700 text-white p-2 mb-2 mt-4 rounded-md"
            >
              {editingTaskIdx === idx ? (
                <div>
                  <input
                    type="text"
                    value={editedTaskName}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                    className="w-full p-2 mb-2 text-black rounded-md"
                  />
                  <textarea
                    value={editedTaskDescription}
                    onChange={(e) => setEditedTaskDescription(e.target.value)}
                    className="w-full p-2 mb-2 text-black rounded-md"
                  />
                  <button
                    onClick={handleSaveEditedTask}
                    className="w-full py-2 bg-emerald-500 text-white rounded-md mt-2"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h4 className="font-semibold">{task.name}</h4>
                  <p>{task.description}</p>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => handleEditTask(idx)}
                      className="hover:bg-yellow-600 w-[40px] h-[40px] hover:rounded-full text-yellow-600 hover:text-white"
                    >
                      <i className="ri-edit-2-line text-xl"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteTask(idx)}
                      className="hover:bg-red-500 w-[40px] h-[40px] hover:rounded-full text-red-600 hover:text-white "
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
