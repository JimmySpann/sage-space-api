import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cors());

// middleware - JSON parsing
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// middleware - API routes
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/tasks', routes.tasks);
app.use('/api/v1/lists', routes.lists);
app.use('/api/v1/aiAgents', routes.aiAgents);
app.use('/api/v1/habits', routes.habits);

app.listen(port, () => console.log(`Server is running on port ${port}`));