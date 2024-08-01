import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
  },
  location: {
    type: String,
  },
  department: {
    type: String,
  },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
