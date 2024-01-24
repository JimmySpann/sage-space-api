import mongoose from 'mongoose';
import User from './User.js';
import Task from './Task.js';
import Note from './Note.js';
import WorkTime from './WorkTime.js';
import Event from './Event.js';
import List from './List.js';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI;
const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(connectionString, configOptions)
    .then(() => console.log('MongoDB successfully connected...'))
    .catch(err => console.log(`MongoDB connection error: ${err}`));

const controllers = {
    User,
    Task,
    Note,
    WorkTime,
    Event,
    List
};

export default controllers;
