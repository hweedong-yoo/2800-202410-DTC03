const mongoose = require('mongoose');

const dataPointSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, {_id: false});

const vitalsSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    BPM: [dataPointSchema],
    temperature: [dataPointSchema],
    respiratoryRate: [dataPointSchema],
    vulnerabilities: [String]
});

const Vitals = mongoose.model('vitals', vitalsSchema);

module.exports = Vitals;