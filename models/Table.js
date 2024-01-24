import mongoose from 'mongoose';

const labelSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Table name needed'],
    },
    type: [{
      type: String,
      required: [true, 'Type is needed'],
    }],
  });

const tableSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Table name needed'],
  },
  labels: [{
    type: labelSchema,
    required: [true, 'Labels are needed'],
  }],
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {timestamps: true});

const Table = mongoose.model('Table', tableSchema);

export default Table;
