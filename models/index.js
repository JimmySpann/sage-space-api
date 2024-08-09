import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from './User.js';
import Task from './Task.js';
import List from './List.js';
import AiAgent from './AiAgent.js';
import Habit from './Habit.js';
import WorkSession from './WorkSession.js';

dotenv.config();

const connectionString = process.env.MONGODB_URI;
const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(connectionString, configOptions)
    .then(() => console.log('MongoDB successfully connected...'))
    .catch(err => console.log(`MongoDB connection error: ${err}`));

const models = {
    User,
    Task,
    List,
    AiAgent,
    Habit,
    WorkSession
};

export default models;
