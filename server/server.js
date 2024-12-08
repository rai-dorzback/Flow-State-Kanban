const express = require('express');
const app = express();
const { ObjectId } = require('mongodb'); // Destructure ObjectId from mongodb
const PORT = 8000;

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
        app.patch('/tasks/status/:id', updateTask(tasksCollection, 'status'));

        // update task title
        app.patch('/tasks/title/:id', updateTask(tasksCollection, 'title'));

        // update task desc
        app.patch('/tasks/desc/:id', updateTask(tasksCollection, 'desc'));

        app.delete('/tasks/:id', deleteTask(tasksCollection));

        // listen on port
        app.listen(PORT, () => { console.log(`Server is running on ${PORT}`) });
    } catch (err) {
        console.log(err);
    };
};

startServer()

function createTask(tasksCollection) {
    return async (req, res) => {
        // ***hardcoded task for testing. change this to be dynamic with user input
        const task = {
            title: 'Test task',
            desc: 'This is another test task.',
            status: 'To do'
        };

        try {
            const result = await tasksCollection.insertOne(task);
            console.log(`Result of creating a task ${result}`);
            res.status(201).json({ message: 'Task created successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating task' });
        };
    };
};

function deleteTask(tasksCollection) {
    return async (req, res) => {
        try {
            const taskId = req.params.id;
            const result = await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });
            console.log(result);

            if(result.deletedCount === 1) {
                res.status(204).json({ message: 'Task deleted successfully' })
            }

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
        } catch(err) {
            console.error(err);
            res.status(500).json({ error: 'Error deleting task' })
        }
    };
};

function readTasks(tasksCollection) {
    return async (req, res) => {
        try {
            const tasks = await tasksCollection.find().toArray()
            res.status(200).json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching tasks' });
        };
    };
};

function updateTask(tasksCollection, property) {
    return async (req, res) => {
        try {
            const taskId = req.params.id;
            
            let result;
            switch(property) {
                case 'status':
                    result = handleStatusUpdate(tasksCollection, taskId)
                    break;
                case 'title':
                    result = handleTitleUpdate(tasksCollection, taskId)
                    break;
                case 'desc':
                    result = handleDescUpdate(tasksCollection, taskId)
            }

            console.log(result);
            res.status(200).json({ message: 'Task updated successfully' });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating task'    
            });
        }
    } 
};

async function handleStatusUpdate(tasksCollection, taskId) {
    // *** get new status from req body once there is a form
    const status = 'In Progress';
    const result = await tasksCollection.updateOne(
        { _id: new ObjectId(taskId) }, // Find the task by _id
        { $set: { status } }  // Set the new status
    );
    return result;
}

async function handleTitleUpdate(tasksCollection, taskId) {
    // *** get new title from req body once there is a form
    const title = 'Updated Title';
    const result = await tasksCollection.updateOne(
        { _id: new ObjectId(taskId) }, // Find the task by _id
        { $set: { title } }  // Set the new status
    );
    return result;
}

async function handleDescUpdate(tasksCollection, taskId) {
    // *** get new desc from req body once there is a form
    const desc = 'Updated Description';
    const result = await tasksCollection.updateOne(
        { _id: new ObjectId(taskId) }, // Find the task by _id
        { $set: { desc } }  // Set the new status
    );
    return result;
}