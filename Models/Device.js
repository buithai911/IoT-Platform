const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({     //unique: độc nhất, trim: bỏ space
    name: {type: String, unique: true , required: [true, 'Name must be require']},
    type: {type: String, required: [true, 'Type of device must be require']},
    description: {type: String}
}, {timestamps: true})

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;