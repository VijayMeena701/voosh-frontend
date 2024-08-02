import dotEnv from "dotenv";
dotEnv.config();
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './src/sequelize';
import { usersRouter } from './src/routes/user';
import { tasksRouter } from './src/routes/task';
import { statusesRouter } from './src/routes/statuses';

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sync Database
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

// Routes
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/statuses', statusesRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
