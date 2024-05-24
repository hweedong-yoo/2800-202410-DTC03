const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compositionSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    weight: {
        type: [Number],
        required: false
    },
    height: {
        type: [Number],
        required: false
    },
    tScore: {
        type: [Number],
        required: false
    },
}, { collection: 'body_compositions' });

const compositionModel = mongoose.model('body_compositions', compositionSchema);

module.exports = compositionModel;
