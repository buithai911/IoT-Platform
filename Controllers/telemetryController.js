const jwt = require('jsonwebtoken');
const Telemetry = require('../Models/Telemetry');

exports.getAlldata = async (req, res, next) => {
    await Telemetry.find({})
        .then(telemetry => {
            res.status(200).json({ 
                status: "success",
                data: {telemetry},
            })
        })
        .catch (err => {
            next(err)
    })
}
exports.getDevicedata = async (req, res, next) => {
    await Telemetry.find({deviceId:req.params.deviceId})
        .then(telemetry => {
            res.status(200).json({ 
                status: "success",
                data: {telemetry},
            })
        })
        .catch (err => {
            next(err)
    })
}


exports.addData = async (req, res, next) => {
    try {
        const device = await Device.create({...req.body});
        res.status(200).json({
            status: 'sucsess',
            data: {device}
        });
    } catch (error) {
        next(error);
    }
}