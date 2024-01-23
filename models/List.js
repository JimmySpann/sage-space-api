const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'List name needed'],
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  type: {
    type: String,
    required: [true, 'List type needed'],
    enum: {
      values: ['tasks', 'notes'],
      message: '{VALUE} is not supported'
    }
  },
  users: {
    type: Array,
    items: {
      type: mongoose.Schema({
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, 'List user _id needed'],
        },
        role: {
          type: String,
          required: [true, 'List user role needed'],
          enum: {
            values: ['owner', 'edit', 'view'],
            message: '{VALUE} is not supported'
          }
        },
      }),
      validate: v => Array.isArray(v) && v.length > 0,
      required: [true, 'List users needed'],
    }
  }
}, {timestamps: true});

const List = mongoose.model('List', listSchema);

module.exports = List;
