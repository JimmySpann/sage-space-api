import mongoose from 'mongoose';

const workTimeSchema = mongoose.Schema({
  start_day: {
    type: Date,
  },
  start_day_index: {
    type: Number,
  },
  week_days: [{
      date: {type: Date},
      activities: [{
        clock_in: { type: Date },
        clock_out: {type: Date},
        activity: {type: String}
      }]
  }]
});

const User = mongoose.model('WorkTime', workTimeSchema);

export default User;
