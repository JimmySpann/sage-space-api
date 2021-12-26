const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'List name needed'],
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    default: [],
  }]
}, {timestamps: true});

const List = mongoose.model('List', listSchema);

module.exports = List;
