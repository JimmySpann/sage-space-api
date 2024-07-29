import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: [true, 'DisplayName is required'],
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
  imageURL: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
