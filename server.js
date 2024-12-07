const express = require('express');
const app = express();
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
    
        // create tasks
        app.post('/tasks', async (req, res) => {
            // ***hardcoded task for testing
            const task = {
                title: 'Test task',
                desc: 'This is a test task.',
                status: 'To do'
            };

            try {
                const result = await tasksCollection.insertOne(task)
                res.status(201).json({ message: 'Task created successfully', task: result.ops[0] });
            } catch(err) {
                console.error(err);
            };
        });

        // **in future, serve up index.html
        app.get('/', (req, res) => {
            res.send('Hello')
        })
        
        // list on port
        app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)});
    } catch(err) {
        console.log(err);
    };
};

startServer()