const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bodyCompSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  tScore: {
    type: [Number],
    required: false
  },
}, { collection: 'body_compositions' });

const BodyCompModel = mongoose.model('body_compositions', bodyCompSchema);
module.exports = BodyCompModel;
