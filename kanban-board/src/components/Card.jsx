import React, { useState } from "react";
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ task, onEdit, onDelete, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg shadow-md p-4 m-2"
        >
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                className="border p-2 w-full mb-2 rounded"
                placeholder="Task Title"
              />
              <textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                className="border p-2 w-full rounded"
                placeholder="Task Description"
              />
              <button
                onClick={handleSave}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-600 text-white px-2 py-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
