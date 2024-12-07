## Kanban Board App

## Technologies Used
Frontend: React, TailwindCSS
Backend: Node.js, Express, MongoDB
Design: Figma
Testing: Postman
Version Control: Git

## Development Steage
***Dec 7, 2024***
I realized the problem with my PATCH request was not an issue with matching the task ID with its id in MongoDB Atlas-- it was with trying to take in req.body for the status. Right now, since there is no front-end, I am hard coding this to "In Progress." Once I have built a front-end and a form that will send its data to the /tasks/:id endpoint, I will change it back to req.body.

***Dec 6, 2024:***
In thinking about the CRUD app:
- Create (POST): Adding tasks
- Read (GET): Showing tasks on board
- Update (PUT): Editing tasks
- Delete (DELETE): Deleting tasks

This will be the first time I have built a truly full-stack app-- I have decided to focus on backend first and completely develop that before starting on the frontend.

Next steps:
- Figure out how to complete the patch request to update status (i.e., from To Do to In Progress), matching the task by ID and then updating the status.

## Lessons Learned
I began to build a kanban board app in React before I had learned any backend. Now I have learned some and I want to try building it using this. I have decided to build the back and first and sort of start fresh and then bring in the front end and use code for my other repository to do that.

Note:
 - Comments in the code that begin with three stars *** are to tell me to come back and finish implementing something later


 ## Optimizations
 - Charcuterie Board Secret Mode