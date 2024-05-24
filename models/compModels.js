const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compositionSchema = new Schema({
    userID: {
        type: String,
        required: true
    },

    weight: {
        type: [number],
        required: false
    },
    height: {
        type: [number],
        required: false
    },
}, { collection: 'body_compositions' });

const compositionModel = mongoose.model('body_compositions', compositionSchema);

module.exports = compositionModel;
