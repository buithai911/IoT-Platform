const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({     //unique: độc nhất, trim: bỏ space
    deviceId: {type: String, required: [true, 'deviceId must be require']},
    key: {type: String},
    value: {type: String}
}, {timestamps: true});

const Telemetry = mongoose.model('Telemetry', telemetrySchema);

module.exports = Telemetry;