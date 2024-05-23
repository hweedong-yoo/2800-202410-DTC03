const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bloodSchema = new Schema({
  userID: {
    type: String, 
    required: true
  },
  wbc: [Number], 
  rbc: [Number], 
  platelets: [Number],
  glucose: [Number], 
  calcium: [Number], 
  bun: [Number],
  creatinine: [Number], 
  alt: [Number], 
  ast: [Number]
}, { collection: 'blood' });

const BloodModel = mongoose.model('blood', bloodSchema);

module.exports = BloodModel;
