import mongoose from 'mongoose';

const workSessionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Work Session name needed'],
  },
  category: {
    type: String,
  },
  start_time: {
    type: Date,
    required: [true, 'Work Session start time needed'],
  },
  end_time: {
    type: Date
  },
  timer_to_end: {
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
