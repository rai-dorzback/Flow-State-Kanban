<div align="center">
    <h1>Kanban Board</h1>
</div>

<p>
    Kanban Board allows users to create, manage, and organize tasks into customizable columns. Users can add new tasks, move them between columns (e.g., To Do, In Progress, Done) using drag-and-drop, and customize each column’s color. The app uses React for dynamic UI updates and local storage to persist data across sessions. This project demonstrates fundamental React concepts like state management, event handling, and working with local storage for persistence.
</p>

## Table of Contents
- [Technologies Used](#technologies-used)
- [Development Stage](#development-stage)
- [Features](#features)
- [Optimizations](#optimizations)
- [Lessons Learned](#lessons-learned)
- [Resources](#resources)
- [Contact](#contact)

## Technologies Used
<!-- React -->
<a href="https://react.dev/" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/react/react-original.svg" alt="React.js" width="40" height="40"/> 
</a> 

<!-- JS -->
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> 
</a> 

<!-- VITE -->
<a href="https://vite.dev/" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/vitejs/vitejs-original.svg" alt="Vite" width="40" height="40"/> 
</a> 

<!-- Tailwind -->
<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/tailwindcss/tailwindcss-original.svg" alt="tailwindcss" width="40" height="40"/> 
</a> 

<!-- Nodejs -->
<a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/nodejs/nodejs-original.svg" alt="nodejs" width="40" height="40"/> 
</a> 

<a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> 
</a> 
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> 
  <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> 
</a>
<p>React.js, JavaScript, Vite, tailwindcss, Node.js, HTML, Git</p>

## Features
- Create Tasks: Add new tasks with a title and description.
- Drag-and-Drop: Move tasks between columns (e.g., To Do, In Progress, Done) using drag-and-drop functionality.
- Customizable Columns: Change the background color of each column to personalize the board.
- Persistence: Tasks and column data are saved in local storage, so your progress is preserved across page reloads.
- Mobile-first Design: The app is built to be responsive and works on both desktop and mobile devices.

## Development Stage
### **Nov 26, 2024:**
**Refactoring KanbanBoard component**
- To streamline the `KanbanBoard` component and improve readability:
  - Created a new `EditableTitle` component to handle the board title logic and UI.
  - Moved the `Column` components out of `KanbanBoard` and into `App.jsx`. These are now passed to `KanbanBoard` as `children` props.

**Saving Kanban title in local storage:**
- Used `useState` for the `boardTitle`. 
  - The state is initialized by checking if a title exists in `localStorage`. If not, it defaults to "My Kanban Board."
- Leveraged the `useEffect` hook to ensure that the board title in `localStorage` updates whenever the user modifies the title.
  - This approach keeps the local storage and app state in sync efficiently.

**Steps I'll take for adding tasks:**
1. Changed the "Add" button type to `submit`. ✅
2. Added state variables for task title and description. ✅
3. Linked the input fields (`textarea` and `text`) to state via `onChange` handlers. ✅
4. Wrapped the input fields in a `form` element and added an `onSubmit={handleSubmit}` handler. ✅
5. Implement `handleSubmit` to save tasks into an object and store them in `localStorage`. (TO DO NEXT TIME)

**Current Focus Areas**
- Dynamic input width for kanban title
- Finish implementing task state management

---

### **Nov 24, 2024:**
- First, I decided to move AddNewTask from its own jsx file into Column.jsx since it was a small function that is only used in the Column component.
- I reread some of the React docs while I thought about how I want to pass in the various tasks/task cards into each column. I have decided to set a prop "children" for Column and then pass in the tasks object/task cards as the children. The tasks will conditionally render based on which column its supposed to be in. Using a children prop makes it so we don't need to know what will be inside each Column.

---

### **Nov 23, 2024:**
**Event Handling & Modal State**
- Went back to the React docs to refamiliarize myself with event handling.
- I was still deciding where the best place is to store the `openModal` state for adding a new task.
- Realized I needed to add an Add/Close button to the new task form and style it as a modal.
- After considering different approaches, I decided that the `NewTaskForm` will be nested within the `App` component. Since the modal is a global feature in the app, the `openModal` state will live in `App`.
- The modal will be triggered by clicking "Add new task" and can be closed by clicking "cancel."
- Therefore, I’ll need to store both `openModal` and `setOpenModal` in `App` and pass them down as props to `NewTaskForm`.
- The `setOpenModal` function will then be passed through `KanbanBoard` > `Column` > `AddNewTask`.
- Plan to improve this by having the modal close by clicking outside of it and add an "Are you sure?" prompt to make sure they don't lose their work.

**6:21 PM - Editable Title**
- Decided to make the board title editable.
- Placed the title state in the `KanbanBoard` component.
- When the user is not editing, the title is displayed as a read-only `<h1>`.
- When the pencil icon is clicked, the title switches to an input field for editing.
- Currently, users can press **Enter** to submit the new title.
- Plan to improve this in the future by adding clearer submit and cancel actions (e.g., check and X buttons).

---

### **Nov 21, 2024:**
- Started by creating a boilerplate React app using `create vite@latest`.

**Steps Taken:**
1. **Break UI into Component Hierarchy:**
   - Designed a wireframe of the MVP (Minimum Viable Product) for the Kanban board.
   - Broke the UI into a component hierarchy:
     - `App`
       - `KanbanBoard`
         - `ColorPicker`
         - `Column` (with title, color, tasks)
           - `TaskCard` (with task name, description)
         - `NewTaskForm`

2. **Build Static Version in React:**
   - Built a static version of the app top-down, starting with the layout and basic UI elements.
   - Added comments (*** in the code) to remind myself of areas to enhance, like adding more functionality or styling.

3. **Define the UI State:**
   - Identified the core data structure to manage the UI:
     - **Kanban board title**
     - **Array of columns** with properties: `id`, `title`, and `color`.
     - **Array of tasks** with `id`, `title`, `description`, and `status` (i.e., `toDo`, `inProgress`, `done`).
     - **Modal state** (`isModalOpen`) to control the visibility of the New Task Form.

## Next Steps
- Dynamic kanban title input width
- Have modal close by clicking outside of it and add an "Are you sure?" prompt to make sure they don't lose their work.
- Implement functionality to add a task via the `NewTaskForm` modal when the plus button is clicked.
- Add state management for:
   - **Array of column objects** (id, title, color).
   - **Array of task objects** (id, title, description, status).
   - **Adding tasks to board**.
- Add drag and drop functionality
- Refine styling

## Optimizations
- Add a submit/cancel button for the title editing.
- Add color picker for each column background, put picker to right of column title
- Toggle dark/light mode
- Add color picker to NewTaskForm so user can pick color of each task as well
- Add a secret easter egg charcuterie board mode. All the tasks will become cheese/boards will be wooden, etc.
- Add ability for multiple projects
- Add a database. I am doing so [here](https://github.com/raisa-d/Kanban-Board-Backend-First)
- Add team-collaboration/assign tasks to a person
- Allow users to make more columns and rename the columns

## Lessons Learned
- Re-familiarized myself with the basics of **React**.
- Gained experience in breaking down a project into components and understanding how to structure the app for better maintainability.

## Resources
- [Tailwind Docs](https://tailwindcss.com/docs/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Docs](https://react.dev/)

## Contact
<p> 
  <a href="https://raisadorzback.netlify.app/" target="blank">
    <img src="https://img.shields.io/badge/Website-563d7c?&style=for-the-badge" alt="Website">
  </a>
  <a href="https://www.linkedin.com/in/raisa-d/">
    <img src="https://img.shields.io/badge/LinkedIn-046E6D?logo=linkedin&style=for-the-badge">
  </a>
  <a href="https://twitter.com/rai__bread" target="blank">
    <img src="https://img.shields.io/badge/Twitter-563d7c?logo=twitter&style=for-the-badge&logoColor=white" alt="rai__bread" />
  </a> 
</p>