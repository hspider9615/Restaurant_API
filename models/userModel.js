const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'user name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, 'phone number is required'],
    },
    usertype: {
      type: String,
      required: [true, 'usertype is required'],
      default: 'client',
      enum: ['client', 'admin', 'vendor', 'driver'],
    },
    profile: {
      type: String,
      default:
        'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png',
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
    },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model('User', userSchema);
