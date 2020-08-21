const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Userame is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    minlength: 4,
    required: [true, 'Password is required'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  profile_img: {
    type: String
  },
  first_name: {
    type: String,
    // required: [true, 'First name is required'],
  },
  last_name: {
    type: String,
    // required: [true, 'Last name is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
