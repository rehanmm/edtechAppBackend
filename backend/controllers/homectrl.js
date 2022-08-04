const User=require('../models/userModel');
const Course=require('../models/courseModel')
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError')
const homeData=require('../utils/objectConstructor');
const errorHandler = require('../utils/errorHandler');


const list = catchAsyncError(async function (req, res,next) {
    const user = await User.findById(req.body.user_id)
    
    // console.log(req.body.user_id)
    // console.log(user)
    if(!user){
        return next(new errorHandler('list not found',404))
    }
    const course= await Course.findById('62eb70e4bcc3b3486d2af137')
    // console.log(course);

//    
const home=new homeData(user,course);
// console.log(home)
    res.status(200).json({
        success:true,
status:200,
        data:home
    })
})

module.exports={list};

