const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'List name needed'],
  },
  Task: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }]
}, {timestamps: true});

const List = mongoose.model('List', listSchema);

module.exports = List;
