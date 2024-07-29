import mongoose from 'mongoose';

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

export default List;
