import express from 'express';
import { logger } from './src/middlewares/logger.ts';
import { errorHandler } from './src/middlewares/errorHandler.ts';
import userRoutes from './src/routes/user.routes.ts';

const app = express();

app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.use(logger);

app.use('/api/users', userRoutes);

app.get('/teapot', (req, res) => {
    res.status(418).json({
        message: "I'm a teapot ☕",
        hint: "RFC 2324 - Hyper Text Coffee Pot Control Protocol",
    });
});

app.use(errorHandler);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});