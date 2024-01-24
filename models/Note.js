import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Note name needed'],
  },
  body: {
    type: String,
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {timestamps: true});

const Note = mongoose.model('Note', noteSchema);

export default Note;
