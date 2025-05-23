# Flow State Kanban Board 

Flow State allows users to create, manage, and organize tasks into customizable columns. Users can add new tasks, move them betIen columns (e.g., To Do, In Progress, Done) using drag-and-drop, and customize each column’s color. The app uses React for dynamic UI updates and local storage to persist data across sessions. This project demonstrates fundamental React concepts like state management, event handling, and working with local storage for persistence.

## Table of Contents
- [Design](#design)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Development Stage](#development-stage)
- [Optimizations](#optimizations)
- [Lessons Learned](#lessons-learned)
- [Resources](#resources)
- [Contact](#contact)

## Design
<p align="center">
  <img src="/Flow State Desktop.png" alt="Flow State Logo at top of page. Horizontal nav with two options: Boards and Create New Board. Three columns each with task cards inside. Column names: To Do, In Progress, Done." height=400>
  <img src="/Flow State Mobile.png" alt="Flow State Logo at top of page. Horizontal nav with two options: Boards and Create New Board. Three columns each with task cards inside. Column names: To Do, In Progress, Done." height=500>
</p>

## Features
- Create, Read, Update, and Delete Tasks
- Create multiple Kanban boards
- Drag-and-Drop: Move tasks betIen columns (e.g., To Do, In Progress, Done) using drag-and-drop functionality.
- Customizable Columns: Change the background color of each column to personalize the board.
- Persistence: Tasks and column data are saved in MongoDB, so users' progress is preserved.
- Secret Mode: Some secret color themes (To be revealed later)
- Mobile-first Design: The app is built to be responsive and works on both desktop and mobile devices.

## Technologies Used
Frontend
- React.js
- Vite
- TailwindCSS
- Motion
- Javascript
- HTML

Backend
- Node.js
- Express.js
- MongoDB

Other Tools
- **Design:** Figma
- **Testing:** Postman
- **Version Control:** Git

Resources
- Color Palette: [ColorHub](https://www.colorhub.app/)
- [Logo](https://logo.com/dashboard)

## Development Stage
**Jan 26, 2024**
Working on:
- Edit functionality for task cards

Issues I ran into:
- In setting a value for the text inputs so that it has the title/desc of that task and you can edit from there, for some reason it became read-only so the user couldn't actually edit it.
- When I do have a default value, it only shows the most recently added task card as the default value. Clearly it is not reading the taskName/Desc every time the user clicks an edit button. It should be the task attached to said edit button but it's not.
- I may need to find a better place to actually put the EditTaskForm modal. Right now it's in TaskCard because I need a way to get the correct taskId/name/etc. But it doesn't make sense to have it there and confuses things a bit. Find another way to access the right task name and such?
- ***Sometimes when users submit an edited version of a task, I get this error even though I have only sent headers once:
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
- **When a task title has a question mark in it, it flips out

How I solved the issue:
- The value was read-only because I needed to use the defaultValue attribute instead.
- I decided to make EditTaskForm it's own page entirely and add a route for it. Instead of passing in the boardId, taskId, taskName, and taskDesc through a bunch of components, they are query parameters.
- Got the editing to work on the backend by modifying a PATCH request that updates both title and desc instead of one or the other. I had to require a task description when users add tasks since I'm using that as a query parameter. In the future, ***I want to figure out a different way to do this so descriptions are optional.

Priorities:
- Work on *** issues listed in today's development stage
- Add delete buttons to boards, delete functionality for board, and exit animation
- Design Homepage Desktop & Mobile
  - Include information about what the app is and how to use it
- Design Add New Task Modal/Edit Task Modal on Desktop & Mobile.
- Add tooltips to delete and edit buttons
- Add exit animation for when task cards are deleted
- The endpoints are getting very long and filled with ids. I'd like to find a way to hide this from the user.
- When user has "picked up" a card to drop in a column, have sort of bordered spaces they can snap to outlined.
- Let users add a card to any column instead of only the To Do column
- Let users create custom columns.

**Dec 23, 2024**
- Today, I focused on designing the boardview page on desktop and mobile using Figma. Pictures can be seen in [Design](#design)
- In the end, I chose the [Hipster Vibes](https://www.colorhub.app/browse/hipster-vibes) color palette.
- The trash can and pencil/edit buttons will be white and only appear when the task is hovered over.

Priorites Next Time:
- Design Homepage Desktop & Mobile
  - Include information about what the app is and how to use it
- Design Add New Task Modal/Edit Task Modal on Desktop & Mobile. Maybe there's a way it can be the same modal. For Edit Task Modal, the current task info will be already entered into the form fields. Button will say "Save" instead of "Add."
- Add edit functionality to tasks
  - Create modal for editing task
  - Change updateTaskStatus() in BoardView to be able to handle any update? Pass that function into the modal so we can update the title/desc in the DB and state
- Add delete buttons to boards (and exit animation)
- Add tooltips to delete and edit buttons
- Add exit animation for when task cards are deleted
- The endpoints are getting very long and filled with ids. I'd like to find a way to hide this from the user.
- When user has "picked up" a card to drop in a column, have sort of bordered spaces they can snap to outlined.
- Let users add a card to any column instead of only the To Do column
- Let users create custom columns.

**Dec 22, 2024**

- Combined React DnD with Motion library so drag and drop animation is super smooth.
- When user picks up a card, the columns that are being hovered over cahnge color.
- Added delete functionality to tasks

- I started thinking more about the design for this and am thinking I want to go with a 70s aesthetic. 
  - Some color palettes I am choosing between: 
    - [Copacabana](https://www.colorhub.app/browse/copacabana)
    - [Boardwalk](https://www.colorhub.app/browse/boardwalk)
    - [Sahara Sunset](https://www.colorhub.app/browse/sahara-sunset)
    - [Hipster Vibes](https://www.colorhub.app/browse/hipster-vibes).
  - Aesthetic inspiration pics: 
    - [Olipop](https://cdn.dribbble.com/users/497743/screenshots/10955270/media/18bb0ca75309dc8c9470b4fb795677c8.jpg?resize=1600x1200&vertical=center)
    - [Hyunda Chroma](https://cdn.dribbble.com/userupload/13709649/file/original-3351348ef348ff5444cca426f4dd96f5.png?resize=1504x1128&vertical=center)

Priorities:
- Add edit functionality to tasks
  - Create modal for editing task
  - Change updateTaskStatus in BoardView to be able to handle any update? Pass that function into the modal so we can update the title/desc in the DB and state
- Add delete buttons to boards (and exit animation)
- Add tooltips to delete and edit buttons
- Add exit animation for when task cards are deleted
- Let users add a card to any column
- The endpoints are getting very long and filled with ids. I'd like to find a way to hide this from the user.
- When user has "picked up" a card to drop in a column, have sort of bordered spaces they can snap to outlined.
- Make it so that the user can add the task to any column, not just "To Do" and so that they can customize the columns.

**Dec 21, 2024**

- Changed deleteTask to match the new data structure. Now, the endpoint will include the board, column, and task id so the task can be found in the right place and deleted from there using the .splice() array method.
- NewTaskForm now works to add a new task! Now, BoardView passes boardId into NewTaskForm. I also had to remove e.preventDefault() because it was causing the form to not work.
- Achieved drag and drop functionality for tasks to move between columns using React DnD. First, I had to install react-dnd and react-dnd-html5-backend. I had to read through the documentation, which helped get the drag functionality. Getting the drop functionality was a different beast entirely.

Priorities:
- Add edit/delete buttons to tasks
- Add delete buttons to boards

Near-future considerations:
- The endpoints are getting very long and filled with ids. I'd like to find a way to hide this from the user.
- When user has "picked up" a card to drop in a column, either change color of the column or have sort of bordered spaces they can snap to outlined.
- Make it so that the user can add the task to any column, not just "To Do" and so that they can customize the columns.
- Combine React DnD with framer motion so drag and drop animation is super smooth

**Dec 18, 2024**

- **What I did**: Implemented task saving logic to ensure tasks are placed in the correct board and column based on where they are added ✅  
  - **How I did it**: The `boardId` is now extracted from the request parameters to determine which board to update. Tasks are initially added to the "To Do" column by default, and users can move them between columns as needed.

- **What I did**: Refactored column rendering to match the new data structure ✅  
  - **How I did it**: In `Column.jsx`, I passed Task Cards as children props, and fetched tasks directly from the board in `BoardView`. I also removed the obsolete `readTasks` endpoint since tasks are now embedded within columns. We now fetch tasks by reading the board and accessing the tasks in each column.

- **What I did**: Updated `updateTask` logic to handle updates within the board to match the new data structure ✅  
  - **How I did it**: Extracted the `boardId` from the request parameters, located the board by ID, iterated through columns to find the task by ID, and updated the task within the correct column.

- **What I did**: Created a function to move tasks to their correct column when the status changes ✅  
  - **How I did it**: When the field being updated is "status," the task is first removed from its current column, the new column is identified by matching the status to the column title, and the task is then added to the new column's task list.

Next Steps/Priorities:
- Change deleteTask to match the new data structure so the task is deleted from within its rightful board
- Finish functionality in NewTaskForm.jsx to add a task to current board
  - in server.js, modify createTask() as written in notes on Dec 11
- Work on how you will move the tasks from column to column when user does & then allow user to drag/drop cards

**Dec 11, 2024**

Today, I achieved dynamically rendering tasks in their appropriate columns (To Do, In Progress, Done)!  ✅
Once I change how tasks are saved in the database, I will conditionally render them based on what column they're in in the databse instead of based on the task status and column title (tasks are currently all in a general pool of tasks in the database, not specifically saved in any one).
I started working on making a POST request from NewTaskForm to create a new task, but ran into some issues that I will have to tackle next time.

Thinking out loud:

Column.jsx:
- I need to make it so when a new task is created, it is saved into a specific board and column. This will help with rendering and with updating the database when the user moves a task to another column/changes its status. 
- I have added state for the complete tasks list and the tasks in each individual column, which will be used to update which tasks are where both in where they're rendered locally and in the DB (/api/tasks/status/:id endpoint to update task status). 

Server.js
- I will modify the createTask() function in server.js, it will take the boardID from the URl query parameters to know which board to save it to. It will be saved to the correct column based on the board status.
General (Important)
- Consider passing children props to Column and conditionally rendering the TaskCards directly from BoardView, since that's where the app is reading the board data from /api/board/:id. That way, I won't have to pass the tasks down into Column. If I do this, I will probably have to lift the state (toDoTasks, inProgTasks, doneTasks) up from Column to BoardView. I won't need a general tasksList state in BoardView quite yet since I will be able to access the tasks from board.tasks. In fact, I won't need a tasksList state at all once the tasks are being read directly from their columns in the database. I'm just doing that right now because currently the tasks are saved in the database loose and unconnected to any board.

Next Steps
- Follow my thought process about adding new tasks that I wrote from today
- Add functionality to add a new task
  - Make POST fetch request from /api/create
  - Tie the task to the board it's in and the columns it belogs to
  - May need to change the endpoint so that tasks are specific to the board they're in like api/:boardId/tasks
  - Change backend to make sure tasks are added to the right board/column
- Assure BoardView dynamically displays columns and tasks from database into correct columns

**Dec 10, 2024**

Priorities today: 
- Display existing board titles on Homepage ✅
- Add link to board on Homepage - did this using Link from react-router-dom ✅
- Basic styling for homepage ✅
- Dynamically load Columns from database ✅
- Dynamically display Kanbanboard title from database
  - Get ID from url using useParams from react-router-dom ✅
  - Set up state to store board data in BoardView ✅
  - Fetch board data from database using useEffect on page mount ✅
  - Dynamically display board title ✅
- Add ability to change kanban title ✅
  - Added updateTitleInDB() function to make a fetch request (PATCH) to KanbanBoard.jsx ✅

Next steps:
- Add functionality to add a new task
- Have BoardView dynamically display columns and tasks from database into correct columns
- Add functionality to delete boards from Homepage
- Add loading spinners to pages

Errors encountered:
- Tried to fetch board titles in Homepage.jsx. When i use link with http, I get back a cors object. when I use link with https, I just get errors. 
- SOLUTION: I forgot to use response.json() on the response, which caused the error. Now, the object is returning, BUT it runs infinitely- i think because I set the dependency array to boardTitles. I changed the dependency array to be empty, and it solved the infinite loop.

**Dec 8, 2024**

-Today, I integrated the backend with the React frontend, enabling the frontend to connect to the API in `server.js`. I used `create vite@latest` to quickly set up the boilerplate.
- I decided to transition from using vanilla MongoDB to **Mongoose**, as it provides a much cleaner and more efficient way to define schemas and models, especially when it comes to updating tasks, boards, and columns.
- I added functionality to create a new board with three default columns: **To Do**, **In Progress**, and **Done**. Additionally, I implemented a route at `/boards/title/:id` to allow users to update the board title.
- To build out the homepage, where users can either create a new board or select an existing one, I’m using **react-router-dom** to define two routes: **Homepage** and **BoardView**.
- Because I restructured the `App.jsx` component, I moved the `openModal` state into `BoardView` to ensure the modal is properly tied to the board view.
- I left off working on the feature that will allow users to select an existing board from the homepage. To make this happen, I need to create a route in `server.js` that returns a list of board titles, which I will then fetch and display dynamically on the homepage.

Next steps:
- Add ability to select one of your existing boards from homepage
- Style homepage
- Navigate Home > Board page after creating board
- Have boardview dynamically read/display title from database
- Give user ability to change title (using database)
- Consider changing endpoints to have query parameters (i.e., ?q=) instead of just longer and longer paths (how it is now). Model it off of apis like cocktailDB
- Integrate client and server readmes

**Dec 7, 2024** 

- Solved a problem with the `PATCH` request: The issue was not with matching the task ID in MongoDB Atlas but with handling `req.body` for the `status`. For now, I’ve hard-coded the status to `"In Progress"`. Once the frontend is implemented, I’ll update this to dynamically fetch the status from a form via `req.body`.
- Added functionality to update the following task properties:
  - **Status**
  - **Description**
  - **Title**

Currently, these updates are hard-coded, but they will eventually be dynamic with frontend input.
 Implemented Functionality
- **Read:** Retrieve all existing tasks.
- **Create:** Add new tasks.
- **Update:** Modify the task status, title, and description using `PATCH` requests.
- **Delete:** Delete a task by its ID in MongoDB.

In working on the delete functionality, I ran into an issue with parsing the id as an ObjectID correctly. While I am got a deprecation warning about new ObjectID(), I was able to use it to match up the ID from the query parameter with the __id in MongoDB.

## **Next Steps**
- Start implementing the frontend:
  - Begin integrating the **React** components to display and interact with the tasks from the backend.
  - Set up routing and state management (likely using React's `useState` and `useEffect` or a state management library like Redux) for task updates.
  - Connect the frontend with the backend endpoints to allow for dynamic interactions, such as adding, updating, and deleting tasks.
  
- Further refine backend functionality:
  - Update the `PATCH` endpoint to handle dynamic task status from the frontend rather than being hardcoded.
  - Implement additional validation and error handling for the `PATCH` and `DELETE` requests.
- Plan the database schema optimization for scalability as the project grows.

**Dec 6, 2024**

I have started to learn Node,js, Express, and MongoDB so I will be switching to working on the backend. Instead of local storage, I am building an API that interfaces with the database. I chose to begin the backend development from scratch as I am currently learning backend technologies and wanted a clean start before integrating them with the frontend. 
 Reflection on CRUD Functionality:
- **Create (POST):** Add tasks to the board.
- **Read (GET):** Display tasks on the board.
- **Update (PUT):** Edit task details.
- **Delete (DELETE):** Remove tasks.

This project will be my first full-stack app. I’ve decided to focus entirely on the backend first before switching to frontend development.

Next Steps
- Resolve `PATCH` request to update the task status (e.g., from "To Do" to "In Progress") by matching the task ID and updating the status.

**Nov 26, 2024:**

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

**Nov 24, 2024:**

- First, I decided to move AddNewTask from its own jsx file into Column.jsx since it was a small function that is only used in the Column component.
- I reread some of the React docs while I thought about how I want to pass in the various tasks/task cards into each column. I have decided to set a prop "children" for Column and then pass in the tasks object/task cards as the children. The tasks will conditionally render based on which column its supposed to be in. Using a children prop makes it so I don't need to know what will be inside each Column.

**Nov 23, 2024:**

**Event Handling & Modal State**
- Int back to the React docs to refamiliarize myself with event handling.
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

**Nov 21, 2024:**
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

**Next Steps**
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
- Add styling and responsive design using **TailwindCSS**.
- Use framer motion to make smooth animations in the design
- Add smooth exit animations for task cards
- Add ability to duplicate cards
- Figure out how to hide all of the super long URLs of query parameters from the user
- Add a submit/cancel button for the title editing.
- Add color picker for each column background, put picker to right of column title
- Toggle dark/light/charcuterie/Y2k mode
- Add color picker to NewTaskForm so user can pick color of each task as Ill
- Add a secret easter egg charcuterie board mode. All the tasks will become cheese/boards will be wooden, etc.
- Add team-collaboration/assign tasks to a person
- Allow users to make more columns and rename the columns
- Add user authentication/login

## Lessons Learned
- Re-familiarized myself with the basics of **React**.
- Gained experience in breaking down a project into components and understanding how to structure the app for better maintainability.
- When I initially began building the Kanban board app using **React**, I had no experience with backend development. Now, after learning backend technologies, I’ve decided to start fresh and focus on building the backend first and integrate it with the frontend later.
- I made a key mistake of forgetting to put a forward slash at the beginning of an endpoint-- will not make this one again!
 Notes:
- Any comments in the code prefixed with three stars (**`***`**) indicate areas that need further implementation or revisiting.

## Resources
- [React Docs](https://react.dev/)
- [Mongoose Docs](https://mongoosejs.com/docs/guide.html)
- [React DnD Docs](https://react-dnd.github.io/react-dnd/docs/overview)
- [TailwindCSS Docs](https://tailwindcss.com/docs/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Contact
<p> 
  <a href="https://rai-dorzback.netlify.app/" target="blank">
    <img src="https://img.shields.io/badge/website-563d7c?&style=for-the-badge" alt="website">
  </a>
  <a href="https://www.linkedin.com/in/rai-d/">
    <img src="https://img.shields.io/badge/LinkedIn-046E6D?logo=linkedin&style=for-the-badge">
  </a>
  <a href="https://twitter.com/rai__bread" target="blank">
    <img src="https://img.shields.io/badge/Twitter-563d7c?logo=twitter&style=for-the-badge&logoColor=white" alt="rai__bread" />
  </a> 
</p>
