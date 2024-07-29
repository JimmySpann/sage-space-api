import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { startMongoDatabase } from './lib/mongodb.js';
import routes from './routes/index.js';
import logger from './lib/logger.js';

// Initiate server and database
dotenv.config();
startMongoDatabase();
const app = express();

// Set Up Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin: [`http://localhost:3000`,`https://sage-space.jimmyleespann.com`],
  methods: "GET,POST,PUT,DELETE",
}));

// Set Up Routes
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/tasks', routes.tasks);
app.use('/api/v1/notes', routes.notes);
app.use('/api/v1/work-time', routes.workTime);
app.use('/api/v1/events', routes.events);
app.use('/api/v1/lists', routes.lists);

// Set Port and Listen
const port = process.env.PORT || 3002;
app.listen(port, () => logger.info(`Server is running on port ${port}`));