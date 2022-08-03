const User=require('../models/userModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError')


const list = catchAsyncError(async function (req, res) {
    const users = await User.find({})
    // if(!users){
    //     return next(new errorHandler('list not found',404))
    // }

    console.log(req.user)
    res.status(200).json({
        success:true,
status:200,
        data:req.user})
})

module.exports={list};

