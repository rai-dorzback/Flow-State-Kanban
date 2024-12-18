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
    title: { type: String, required: true},
    columns: { type: [columnSchema], default: [] }, // Embed columns into boards
});

// Create models
const Task = mongoose.model('Task', taskSchema);
const Column = mongoose.model('Column', columnSchema);
const Board = mongoose.model('Board', boardSchema);

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
        // enable CORS for all requests
        app.use(cors());

        app.get('/', (req, res) => {
            res.send('Server is running!')
        });
        // get all tasks
        app.get('/api/tasks', (req, res) => readTasks(req, res));
        // get all boards
        app.get('/api/boards', (req, res) => readBoards(req, res));
        // get 1 boards data
        app.get('/api/board/:id', (req, res) => readBoard(req, res));

        // create new board
        app.post('/api/boards/create', (req, res) => createBoard(req, res));
        // create new task
        app.post('/api/create', (req, res) => createTask(req, res));

        // PATCH request to update board title
        app.patch('/api/boards/title/:id', (req, res) => updateBoardTitle(req, res));
        // PATCH requests to update task
        app.patch('/api/tasks/status/:id', (req, res) => updateTask(req, res, 'status'));
        app.patch('/api/tasks/title/:id', (req, res) => updateTask(req, res, 'title'));
        app.patch('/api/tasks/desc/:id', (req, res) => updateTask(req, res, 'desc'));

        app.delete('/api/tasks/:id', (req, res) => deleteTask(req, res));

        // listen on port
        app.listen(PORT, () => { console.log(`Server is running on ${PORT}`) });
    } catch (err) {
        console.log(err);
    };
};

async function createBoard(req, res) {
    try {
        const board = new Board({
            title: req.body.title || 'My Kanban Board',
            // default columns with no tasks
            columns: [
                { title: 'To Do', tasks: [] },
                { title: 'In Progress', tasks: [] },
                { title: 'Done', tasks: [] }
            ]
        });

        const savedBoard = await board.save();
        res.status(201).json(savedBoard);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating board' });
    }
};

async function updateBoardTitle(req, res) {
    const boardId = req.params.id;
    const newTitle = req.body.title;

    if (!newTitle) {
        return res.status(400).json({ message: 'Title is required' });
    }
    
    try { 
        const updatedBoard = await Board.findByIdAndUpdate(
            boardId, 
            { title: newTitle },
            { new: true }
        );

        if (!updatedBoard) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json(updatedBoard);

    } catch(err) {
        console.error(err);
        res.status(404).json({ message: 'Error updating title' });
    }
};

async function createTask(req, res) {
    try {
        const task = new Task({
            title: req.body.title,
            desc: req.body.desc,
            status: req.body.status
        });

        // *** SAVE TASK SPECIFICALLY INSIDE ITS RIGHTFUL BOARD - CAN TAKE BOARD ID OUT OF URL TO KNOW WHICH ONE TO SAVE TO
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

async function readBoards(req, res) {
    try {
        const boards = await Board.find();
        res.status(200).json(boards);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching boards' });
    };
};

async function readBoard(req, res) {
    try {
        const boardId = req.params.id;
        const board = await Board.findById(boardId);
        res.status(200).json(board);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching board' });
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