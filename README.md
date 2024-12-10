# Kanban Board

A fully interactive Kanban Board application built with React, Tailwind CSS, and react-beautiful-dnd for drag-and-drop functionality. This application allows users to manage tasks efficiently by adding, editing, deleting, and reorganizing them across different columns.

---

## Features

### Core Features
1. **Drag-and-Drop Interface**
   - Drag tasks between columns or reorder tasks within the same column.
   - Powered by `react-beautiful-dnd` for a seamless experience.

2. **Column Management**
   - Edit column titles in place.
   - Add new columns dynamically.
   - Delete unwanted columns.

3. **Task Management**
   - Add tasks to any column with a name and description.
   - Edit existing tasks in place.
   - Delete tasks as needed.


---

## Installation

### Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)


## Setup Instructions

### Clone the Repository:
- Clone the project from GitHub and navigate into the project directory.

### Install Dependencies:
- Install required dependencies using npm or yarn. Make sure to install the following:
  - `react`
  - `react-dom`
  - `tailwindcss`
  - `react-beautiful-dnd`

### Run the Project:
- After installing the dependencies, start the project using:
  - `npm start` or
  - `yarn start`

The app will run on `http://localhost:3000` by default.


## Technology Choices and Rationale

### React
- **Why React?**: Chosen for building a dynamic, component-based user interface. React's state management and reactivity provide a smooth user experience.

### Tailwind CSS
- **Why Tailwind CSS?**: Tailwind CSS was chosen because it allows for rapid UI development with utility-first classes. It minimizes the need for writing custom CSS while ensuring flexibility in styling.

### react-beautiful-dnd
- **Why react-beautiful-dnd?**: This library is used to implement drag-and-drop functionality for managing tasks. It provides an easy-to-implement, accessible, and highly customizable drag-and-drop experience.


## Known Limitations / Trade-offs


### Single-User Experience:
- The application is designed to be used by a single user, and it doesn't support collaboration or multi-user functionality. Future improvements could add user authentication for personal task management.

### Limited Customization:
- Task and column management features are basic, with minimal customization options. Users cannot assign due dates or categories to tasks, nor can they change column layouts.

### Performance:
- While the current setup works well for moderate task management, performance might degrade with a large number of columns and tasks. Optimizations may be needed for large datasets.


## Future Improvements


### Multi-User Support:
- Add user authentication so multiple users can manage their own tasks and columns in real time.

### Task Customization:
- Allow users to assign due dates, categories, or priorities to tasks.

### Mobile Optimization:
- Although the app is responsive, further improvements could be made to enhance the mobile experience, especially for task interactions.

### User Interface Enhancements:
- More features such as task filtering, search, and prioritization could be added.
