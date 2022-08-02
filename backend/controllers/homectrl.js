const User=require('../models/userModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError')


const list = catchAsyncError(async function (req, res) {
    const users = await User.find({})
    if(!users){
        return next(new errorHandler('list not found',404))
    }
    res.status(200).json(users)
})

module.exports={list};

