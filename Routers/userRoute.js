const express = require('express');

const { getProfile, updateProfile} = require('../Controllers/userController');
const { verifyToken } = require('../Middlewares/verifyToken');
const Router = express.Router();

Router.get('/myprofile', verifyToken, getProfile);
Router.put('/update', verifyToken, updateProfile);



module.exports = Router;