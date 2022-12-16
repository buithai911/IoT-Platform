const jwt = require('jsonwebtoken');
const Device = require('../Models/Device');

exports.getAlldevice = async (req, res, next) => {
    await Device.find({})//.populate('seller', 'name')
        .then(device => {
            res.status(200).json({ 
                status: "success",
                data: {device},
            })
        })
        .catch (err => {
            next(err)
    })
}


exports.addDevice = async (req, res, next) => {
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
exports.deleteDevice = async (req, res, next) => {
    try {
        const {deviceId} = req.params;
        await Device.findByIdAndDelete(deviceId);
        res.status(200).json({
            status: "success",
            message: "Delete successfull"
        })
    } catch (error) {
        next(error);
    }
}
exports.updateDevice = async (req, res, next) => {
    try {
        const {deviceId} = req.params;
        const device = await Device.findByIdAndUpdate( deviceId, req.body, {new: true, runValidator: true}); // res noi dung update
        res.status(200).json({
            status: "success",
            data:{device}
        })
    } catch (error) {
        next(error)
    }
}