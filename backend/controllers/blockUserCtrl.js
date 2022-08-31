const BlockedUser=require('../models/blockUserModel');
const User=require('../models/userModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {tsend,send} = require('../middleware/responseSender');



const list=catchAsyncError(  async function(req ,res,){
const blockedUser=await BlockedUser.find({}).lean();
if(!blockedUser) return next(new errorHandler('no user is blocked yet',200))
tsend(blockedUser,'',res)
})

const create=catchAsyncError(async function(req ,res){
    const {user_id,admin_id}=req.body
    const user= await User.findOne({user_id}).select('phone_number name _id').lean();
    if(!user) return next(new errorHandler('user not found',200))
    const admin= await User.findOne({admin_id}).select('email').lean();

    const blockedUser = new BlockedUser({
        user_id,
        admin_id,
        admin_email:admin.email,
        user_name:user.name,
        phone_number:user.phone_number,
    });
    await blockedUser.save()
    tsend(blockedUser,'blocked successfully',res)

})
const remove= catchAsyncError( async function(req ,res){
const {user_id}=req.body
    const blockedUser= await BlockedUser.findOne({user_id})
    if(!blockedUser) return next(new errorHandler('user not found',200))
    await blockedUser.remove();
    tsend({},'unblocked successfully',res)

})



module.exports = {list,create,remove}


   