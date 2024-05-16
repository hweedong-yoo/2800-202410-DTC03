const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vitalsSchema = new mongoose.Schema({
  sex: {
    type: String,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  dob: {
    type: Number,
  },
});


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
  profile: {vitalsSchema},
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;