const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    BPM: [{
        timestamp: {
            type: Date,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    }],
    temperature: [{
        timestamp: {
            type: Date,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    }],
    respiratoryRate: [{
        timestamp: {
            type: Date,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    }]
});

const Vitals = mongoose.model('vitals', vitalsSchema);

module.exports = Vitals;
