import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import strategyRoutes from './routes/strategyRoutes';
import { startWeeklyUpdates } from './services/cronService';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/strategy', strategyRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start cron jobs
startWeeklyUpdates();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('✨ Weekly strategy updates enabled');
});
