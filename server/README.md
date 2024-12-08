# Kanban Board App

This project is focused on building the backend of a Kanban board app using **Node.js**, **Express**, and **MongoDB**. Once the backend is complete, I will integrate it with the frontend, which I have already started building in [this repository](https://github.com/raisa-d/KanbanBoard) using **React** and **TailwindCSS**.

I chose to begin the backend development from scratch as I am currently learning backend technologies and wanted a clean start before integrating them with the frontend.

---

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Development Stage](#development-stage)
    - [Dec 7, 2024](#dec-7-2024)
    - [Dec 6, 2024](#dec-6-2024)
3. [Lessons Learned](#lessons-learned)
4. [Optimizations](#optimizations)
5. [Future Plans](#future-plans)
5. [Contact](#contact)

---

## Technologies Used

### Frontend
- React
- TailwindCSS

### Backend
- Node.js
- Express
- MongoDB

### Other Tools
- **Design:** Figma
- **Testing:** Postman
- **Version Control:** Git

---

## Development Stage

### **Dec 7, 2024**
#### Progress
- Solved a problem with the `PATCH` request: The issue was not with matching the task ID in MongoDB Atlas but with handling `req.body` for the `status`. For now, I’ve hard-coded the status to `"In Progress"`. Once the frontend is implemented, I’ll update this to dynamically fetch the status from a form via `req.body`.
- Added functionality to update the following task properties:
  - **Status**
  - **Description**
  - **Title**

Currently, these updates are hard-coded, but they will eventually be dynamic with frontend input.

#### Implemented Functionality
- **Read:** Retrieve all existing tasks.
- **Create:** Add new tasks.
- **Update:** Modify the task status, title, and description using `PATCH` requests.
- **Delete:** Delete a task by its ID in MongoDB.

In working on the delete functionality, I ran into an issue with parsing the id as an ObjectID correctly. While I am got a deprecation warning about new ObjectID(), I was able to use it to match up the ID from the query parameter with the __id in MongoDB.

#### **Next Steps**
- Start implementing the frontend:
  - Begin integrating the **React** components to display and interact with the tasks from the backend.
  - Set up routing and state management (likely using React's `useState` and `useEffect` or a state management library like Redux) for task updates.
  - Connect the frontend with the backend endpoints to allow for dynamic interactions, such as adding, updating, and deleting tasks.
  
- Further refine backend functionality:
  - Update the `PATCH` endpoint to handle dynamic task status from the frontend rather than being hardcoded.
  - Implement additional validation and error handling for the `PATCH` and `DELETE` requests.
- Plan the database schema optimization for scalability as the project grows.

---

### **Dec 6, 2024**
#### Reflection on CRUD Functionality:
- **Create (POST):** Add tasks to the board.
- **Read (GET):** Display tasks on the board.
- **Update (PUT):** Edit task details.
- **Delete (DELETE):** Remove tasks.

This project will be my first full-stack app. I’ve decided to focus entirely on the backend first before switching to frontend development.

#### Next Steps
- Resolve `PATCH` request to update the task status (e.g., from "To Do" to "In Progress") by matching the task ID and updating the status.

---

## Lessons Learned
When I initially began building the Kanban board app using **React**, I had no experience with backend development. Now, after learning backend technologies, I’ve decided to start fresh and focus on building the backend first. Once the backend is complete, I’ll integrate the frontend from my [original repository](https://github.com/raisa-d/KanbanBoard).

#### Notes:
- Any comments in the code prefixed with three stars (**`***`**) indicate areas that need further implementation or revisiting.

---

## Optimizations
- 🛠️ **Planned Feature:** *Charcuterie Board Secret Mode* (Details to be revealed later!)

---

## Future Plans
1. Complete backend CRUD operations, including:
   - Reading tasks
   - Creating tasks
   - Updating tasks
   - Deleting tasks
2. Refactor code for scalability and performance.
3. Integrate the backend with the React-based frontend.
4. Add styling and responsive design using **TailwindCSS**.
5. Explore additional features, such as authentication or drag-and-drop task movement.

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