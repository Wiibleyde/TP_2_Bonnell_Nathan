import express from 'express';
import { logger } from './src/middlewares/logger.ts';
import { errorHandler } from './src/middlewares/errorHandler.ts';
import { teapot } from './src/middlewares/teapot.ts';
import userRoutes from './src/routes/user.routes.ts';
import mongoose from 'mongoose';

const db = mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tp_seance3', {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

const app = express();

app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.use(logger);
app.use(teapot);

app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});