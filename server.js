const express = require('express');
const app = express();
const { ObjectId } = require('mongodb'); // Destructure ObjectId from mongodb
const PORT = 8000;
require('dotenv').config(); // Import dotenv

const MongoClient = require('mongodb').MongoClient;
const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://trikru:${password}@cluster0.atp5l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

async function startServer() {
    try {
        const client = await MongoClient.connect(uri);
        console.log('Connected to Database');
        const db = client.db('KanbanTasks');
        const tasksCollection = db.collection('tasks');

        // MIDDLEWARE
        // lets PATCH/PUT requests use JSON
        app.use(express.json())
        // let us extract data from form element and add to req.body
        app.use(express.urlencoded({ extended: true }))

        // **in future, serve up index.html
        app.get('/', (req, res) => {
            res.send('Server is running!')
        })

        // get all tasks
        app.get('/tasks', readTasks(tasksCollection))

        // create tasks
        app.post('/create', createTask(tasksCollection));

        // update task status
        app.patch('/tasks/:id', updateStatus(tasksCollection));
        
        // list on port
        app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)});
    } catch(err) {
        console.log(err);
    };
};

startServer()

function createTask(tasksCollection) {
    return async (req, res) => {
        // ***hardcoded task for testing
        const task = {
            title: 'Test task',
            desc: 'This is another test task.',
            status: 'To do'
        };

        try {
            const result = await tasksCollection.insertOne(task);
            console.log(`Result of creating a task ${result}`);
            res.status(201).json({ message: 'Task created successfully' });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating task' });
        };
    };
};

function readTasks(tasksCollection) {
    return async (req, res) => {
        try {
            const tasks = await tasksCollection.find().toArray()
            res.status(200).json(tasks);
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching tasks' });
        };
    };
};

function updateStatus(tasksCollection) {
    return async (req, res) => {
        try {
            const taskId = `${req.params.id}`;
            // *** get new status from req body once there is a form
            const status = 'In Progress'

            const result = await tasksCollection.updateOne(
                { _id: new ObjectId(taskId) }, // Find the task by _id
                { $set: { status } }  // Set the new status
            );

            console.log(result);
            res.status(200).json({ message: 'Task status updated successfully' });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating task status'    
            });
        }
    } 
};