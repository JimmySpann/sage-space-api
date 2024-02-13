import mongoose from 'mongoose';

const habitSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Habit name needed'],
  },
  description: {
    type: String,
  },
  daysCompleted: {
    type: Array,
      items: { 
        type: Date 
      },
  },
  createdAt: {
    type: Date,
    required: [true, 'Habit create date needed'],
  },
  users: {
    type: Array,
    items: {
      type: mongoose.Schema({
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, 'Habit user _id needed'],
        },
        role: {
          type: String,
          required: [true, 'Habit user role needed'],
          enum: {
            values: ['owner', 'edit', 'view'],
            message: '{VALUE} is not supported'
          }
        },
      }),
      validate: v => Array.isArray(v) && v.length > 0,
      required: [true, 'Habit users needed'],
    }
  }
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
