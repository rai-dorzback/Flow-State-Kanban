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
    status: { type: String, required: true, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' }
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
        // get all boards
        app.get('/api/boards', (req, res) => readBoards(req, res));
        // get 1 boards data
        app.get('/api/:boardId', (req, res) => readBoard(req, res));

        // create new board
        app.post('/api/board/create', (req, res) => createBoard(req, res));
        // create new task
        app.post('/api/:boardId/createTask', (req, res) => createTask(req, res));

        // PATCH request to update board title
        app.patch('/api/:boardId/title', (req, res) => updateBoardTitle(req, res));
        // PATCH requests to update task
        app.patch('/api/:boardId/:taskId/status', (req, res) => updateTask(req, res, 'status'));
        app.patch('/api/:boardId/:taskId/title', (req, res) => updateTask(req, res, 'title'));
        app.patch('/api/:boardId/:taskId/desc', (req, res) => updateTask(req, res, 'desc'));

        app.delete('/api/:boardId/:columnId/:taskId', (req, res) => deleteTask(req, res));

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
    const boardId = req.params.boardId;
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
    const boardId = req.params.boardId;
    const newTask = {
        title: req.body.title,
        desc: req.body.desc,
        status: "To Do",
    };

    try {
        // Find the correct board and update the To Do column
        const updatedBoard = await Board.findOneAndUpdate(
            { _id: boardId, "columns.title": "To Do" }, 
            // Push new task into column
            { $push: { "columns.$.tasks": newTask } },
            { new: true }
        );
        
        if (!updatedBoard) {
            return res.status(404).json({ message: 'Board or column not found. Task was not created.' });
        }

        res.status(201).json(updatedBoard); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating task' });
    };
};

async function deleteTask(req, res) {
    const { boardId, columnId, taskId } = req.params;

    try {
        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const column = board.columns.find(col => col._id.toString() === columnId);
        if (!column) {
            return res.status(404).json({ message: 'Column not found' });
        }

        const taskIndex = await column.tasks.findIndex(task => task._id.toString() === taskId);
        if(taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        column.tasks.splice(taskIndex, 1);

        await board.save();

        res.status(200).json(board);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting task' });
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
        const boardId = req.params.boardId;
        const board = await Board.findById(boardId);

        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }

        res.status(200).json(board);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching board' });
    };
};


async function updateTask(req, res, field) {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const updatedData = { [field]: req.body[field] }
    
    try {
        const board = await Board.findById(boardId);

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        let taskUpdated = false;
        let task = null;
        let oldColumn = null;

        for(const column of board.columns) {
            const colTasks = column.tasks
            // find index of task in the column so we can manipulate it
            const taskIndex = colTasks.findIndex(task => task._id.toString() === taskId);

            if(taskIndex !== -1) {
                task = colTasks[taskIndex];
                oldColumn = column;

                // update task data
                colTasks[taskIndex] = { ...colTasks[taskIndex].toObject(), ...updatedData };

                taskUpdated = true;
                break;
            }
        }

        if(!taskUpdated) {
            res.status(404).json({ message: 'Task not found, so it was not updated' });
        }

        if(field === "status") {
            await moveTaskColumn(board, task, oldColumn, updatedData[field]);
        }

        const updatedBoard = await board.save();

        res.status(200).json(updatedBoard);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating task' });
    }
};

// *** does this need to be async?
function moveTaskColumn(board, task, oldColumn, updatedStatus) {
    // remove task from old column by filtering out task by id
    oldColumn.tasks = oldColumn.tasks.filter(t => t._id.toString() !== task._id.toString());

    // find new column based on updated status
    let newColumn = board.columns.find(col => col.title === updatedStatus);

    if(!newColumn) {
        throw new Error('Couldn\'t find the column with that status')
    }

    // add task to new column
    newColumn.tasks.push(task);

    // update task's status
    task.status = updatedStatus;
}

startServer();