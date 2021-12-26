const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Task name needed'],
  },
  description: {
    type: String,
  },
  date_completed: {
    type: Date
  },
  deleted: {
    type: Boolean,
    required: [true]
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
