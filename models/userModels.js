const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recovery: {
    type: String,
    required: false,
  },
  recovery_key: {
    type: String,
    required: false,
  },
  sex: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
  }
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;