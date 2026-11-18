import 'dotenv/config';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express';
import mongoose from 'mongoose';
import {
    Task
} from './models/task.js';

const app = express();
const PORT = 3000;

app.use(express.json())

app.get('/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});

app.post('/tasks', async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title
        })
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({
            error: (err as Error).message
        });
    }
})

async function start() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not set in .env');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

start().catch((err) => {
    console.error('Failed to start:', err);
    process.exit(1);
});