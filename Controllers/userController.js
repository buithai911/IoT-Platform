//const cloudinary = require("../cloudinary/cloudinary");
const User = require("../models/User");


//getProfile
exports.getProfile = async (req, res, next) => {
    try {
        const userId = req.body['userId']
        const user = await User.findOne({ _id:userId}).select('name email avatar') //cloudinary_id')
        res.status(200).json({
            status: "success",
            data: {user}
        })
    } catch (error) {
        next(error)
    }
}

//updateProfile
exports.updateProfile = async (req, res, next) => {
    try {
        userId = req.body.userId;
        console.log(userId)
        const user = await User.findByIdAndUpdate( userId, req.body, {new: true, runValidator: true}); // res noi dung update
        res.status(200).json({
            status: "success",
            data:{userName:user.name, userEmail:user.email}
        })
    } catch (error) {
        next(error)
    }
}