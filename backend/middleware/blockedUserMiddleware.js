const catchAsyncError = require("../error/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const BlockUser = require("../models/blockUserModel");


module.exports =catchAsyncError(async (req, res, next) => {
//TODO: user id agar nhi h to mango client side se
    const {user_id} = req.body;
    if(!user_id) return next(new errorHandler("user id is required", 200));
    const blockedUser = await BlockUser.findOne({user_id});
    if(blockedUser)
    { 
        return next({
        success: true,
        message:'this number is blocked',
        statusCode:200
    })
}
next()
})
