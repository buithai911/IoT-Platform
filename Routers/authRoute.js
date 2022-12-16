const express = require('express');

const { login, register, forgetPassword, changePassword} = require('../Controllers/authController');
const {verifyToken} = require('../Middlewares/verifyToken');
// const { checkCurrentUser} = require('../middleware/checkCurrentUser')
// const { getCurrentUser} = require('../controllers/authController')
// const upload = require("../cloudinary/multer");
const Router = express.Router();

Router.post('/register', register);
Router.post('/login', login);
Router.post('/resetpassword', forgetPassword);
Router.put('/changepassword', verifyToken, changePassword);
//Router.route('/').get(checkCurrentUser, getCurrentUser)

module.exports = Router;