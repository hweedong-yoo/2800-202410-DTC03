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
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;