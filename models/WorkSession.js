import mongoose from 'mongoose';

const workSessionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Work Session name needed'],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  rating: {
    type: String,
  },
  start_time: {
    type: Date,
    required: [true, 'Work Session start time needed'],
  },
  end_time: {
    type: Date
  },
  timer_at_end: {
    type: Boolean,
    required: [true],
    default: false,
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true],
  }],
}, {timestamps: true});

const WorkSession = mongoose.model('WorkSession', workSessionSchema);

export default WorkSession;
