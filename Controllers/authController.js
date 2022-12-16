const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
var nm = require('nodemailer');
//const cloudinary = require("../cloudinary/cloudinary");
const transporter = nm.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'a32961@thanglong.edu.vn',
            pass: '11729300'
        }
    }
);
function sendEmail(value, mail){
    const options = {
        from: 'a32961@thanglong.edu.vn',
        to: mail,
        subject: "Your new password",
        text: 'Your new password is: ' + value
    };
    transporter.sendMail(
        options, function (error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log("sent ")
            }
    
        }
    )
}
exports.register = async (req, res, next) => {
    try {
        //const result = await cloudinary.uploader.upload(req.file.path);
        //const user = await User.create({ ...req.body, avatar:result.secure_url, cloudinary_id:result.public_id})
        const user = await User.create({...req.body});
        const token = jwt.sign({userId: user._id}, "thai123");
        res.status(200).json({
            status: 'sucsess',
            data: {token, userName: user.name} //avatar:result.secure_url, cloudinary_id:result.public_id}
        });
    } catch (error) {
        const err = {message:"Email exits", status: 400};
        next(err);
    }
}
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            const err = {message:"Email or password is not correct", status: 400};
            next(err);
        }
        if(bcrypt.compareSync(req.body.password, user.password)){ // (mật khẩu nhập, mật khẩu đã hash)
            const token = jwt.sign({userId: user._id}, "thai123");
            res.status(200).json({
            status: 'sucsess',
            data: {token, userName: user.name, id: user._id} //,avatar: user.avatar , cloudinary_id: user.cloudinary_id}
            });
        }
        else{
            const err = {message:"Email or password is not correct", status: 400};
            next(err);
        }
    } catch (error) {
        next(error);
    }
}
exports.forgetPassword = async (req, res, next) => {
    try {
        const userEmail = await User.findOne({email:req.body.email});
        if(!userEmail){
            const err = {message:"Email is not correct", status: 400};
            next(err);
        }
        else{
            let randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(randomPassword, 10)
            const passWord = await User.findByIdAndUpdate( userEmail._id, {password:hashedPassword}, {new: true, runValidator: true});
            sendEmail(randomPassword, userEmail.email);
            res.status(200).json({
                status: 'sucsess'
            })
        }
    } catch (error) {
        next(error);
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        userId = req.body['userId'];
        const user = await User.findById(userId);
        const oldPass = req.body.oldPassword;
        const newPass = req.body.newPassword;
        if(bcrypt.compareSync(oldPass, user.password)){
            const hashedPassword = await bcrypt.hash(newPass, 10)
            const passWord = await User.findByIdAndUpdate( userId, {password:hashedPassword}, {new: true, runValidator: true});
            res.status(200).json({
            status: 'sucsess'
            })
        }
        else{
            const err = {message:"old password does not match", status: 400};
            next(err);
        }
    } catch (error) {
        next(error);
    }
}