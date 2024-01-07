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
  isHidden: {
    type: Boolean,
    required: [true],
    default: false,
  },
  isCompleted: {
    type: Boolean,
    required: [true],
    default: false,
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
