// imports
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const routes = require('./routes');
const port = process.env.PORT;
const app = express();
app.use(cors({
  // origin: [`http://localhost:3000`,`https://what-is-this-abomination.herokuapp.com`],
  methods: "GET,POST,PUT,DELETE",
  // credentials: true, // allows the session cookie to be sent back and forth from server to client
  optionsSuccessStatus: 200 // some legacy browsers choke on satus 204
}));

// middleware - JSON parsing
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// middleware - API routes
// Auth Routes
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/tasks', routes.tasks);
app.use('/api/v1/notes', routes.notes);
app.use('/api/v1/work-time', routes.workTime);
app.use('/api/v1/events', routes.events);
app.use('/api/v1/lists', routes.lists);



// connection
app.listen(port, () => console.log(`Server is running on port ${port}`));