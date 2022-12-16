const express = require('express');

const { addDevice, deleteDevice, updateDevice, getAlldevice} = require('../Controllers/deviceController');
const { verifyToken } = require('../Middlewares/verifyToken');
const Router = express.Router();

Router.get('/getall', verifyToken, getAlldevice);
Router.post('/add', verifyToken, addDevice);
Router.put('/delete/:deviceId', verifyToken, deleteDevice);
Router.put('/update/:deviceId', verifyToken, updateDevice);

module.exports = Router;