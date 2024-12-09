// import express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Schema} = mongoose;
const app = express();
const PORT = process.env.PORT;

// Define the schemas using Mongoose
const taskSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, default: '' },
    status: { type: String, required: true, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
});

const columnSchema = new Schema({
    title: { type: String, required: true },
    tasks: [taskSchema], // Embed tasks into columns
});

const boardSchema = new Schema({
    title: { type: String, required: true },
    columns: { type: [columnSchema], default: [] }, // Embed columns into boards
});

// Create models
const Task = mongoose.model('Task', taskSchema);
const Column = mongoose.model('Column', columnSchema);
const Board = mongoose.model('Board', boardSchema);

// Destructure ObjectId from mongodb
const { ObjectId } = require('mongodb'); // 
const MongoClient = require('mongodb').MongoClient;
const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://trikru:${password}@cluster0.atp5l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB with Mongoose');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

async function startServer() {
    try {
        connectToDatabase();

        // MIDDLEWARE
        // lets PATCH/PUT requests use JSON
        app.use(express.json())
        // let us extract data from form element and add to req.body
        app.use(express.urlencoded({ extended: true }))
        app.use(cors());

        // **in future, serve up index.html
        app.get('/', (req, res) => {
            res.send('Server is running!')
        });

        // get all tasks
        app.get('/tasks', (req, res) => readTasks(req, res));

        // create tasks
        app.post('/create', (req, res) => createTask(req, res));

        // PATCH requests to update task
        app.patch('/tasks/status/:id', (req, res) => updateTask(req, res, 'status'));
        app.patch('/tasks/title/:id', (req, res) => updateTask(req, res, 'title'));
        app.patch('/tasks/desc/:id', (req, res) => updateTask(req, res, 'desc'));

        app.delete('/tasks/:id', (req, res) => deleteTask(req, res));

        // listen on port
        app.listen(PORT, () => { console.log(`Server is running on ${PORT}`) });
    } catch (err) {
        console.log(err);
    };
};

async function createTask(req, res) {
    try {
        // ***hardcoded task for testing. change this to be dynamic with user input
        const task = new Task({
            title: 'Test task', // ***req.body.title
            desc: 'This is another test task.', // ***req.body.desc
            status: 'To do' // ***req.body.status
        });

        // save new task to database
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating task' });
    };
};

async function deleteTask(req, res) {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        console.log(deletedTask);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(204).json({ message: 'Task deleted successflly' })
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting task' })
    }
};

async function readTasks(req, res) {
    try {
        // find all tasks in Task collection
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching tasks' });
    };
};

async function updateTask(req, res, field) {
    const taskId = req.params.id;
    const updateData = { [field]: req.body[field] }
    
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new:true })
        if(!updatedTask) {
            return res.status(404).json({ message: 'Task not found' })
        };
        res.status(200).json(updatedTask);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating task' });
    }
};

startServer();