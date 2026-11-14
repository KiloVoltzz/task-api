import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

app.get('/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});

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