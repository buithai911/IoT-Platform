const express = require('express');

const {getAlldata, getDevicedata} = require('../Controllers/telemetryController');
const { verifyToken } = require('../Middlewares/verifyToken');
const Router = express.Router();

Router.get('/getall', verifyToken, getAlldata);
Router.get('/getdevicedata/:deviceId', verifyToken, getDevicedata);

module.exports = Router;