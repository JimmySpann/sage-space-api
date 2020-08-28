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
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
