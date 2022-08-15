const User = require('../models/userModel');
const express = require('express');
const mongoose = require('mongoose');
const catchAsyncError = require('../error/catchAsyncError');
// const { findByIdAndUpdate } = require('../models/userModel');
const errorHandler = require('../utils/errorHandler');


const list = catchAsyncError(async function (req, res) {
    const users = await User.find({})
    if(!users){
        return next(new errorHandler('list not found',200))
    }
    res.status(200).json(users)
})

const create = catchAsyncError(async function (req, res) {

    const {phone_number}=req.body
    
    if(phone_number===undefined){
        const a =Math.floor( Math.random() * (200000000000-1) + 1);
     
        req.body={
            name:"Anonymous",
           email:`rand${a}@jjfkj.com`
        }
    }


    // console.log(req.body);
    let user = new User(req.body);
    
    
    await user.save()
    
   const {_id}=user
   user1= await User.findOne({_id})
   console.log(user1);

    res.status(200).json({
        success: true,
        message: 'user signed up successfully',
        data:user1

    })

})
const read = function (req, res) {

    req.user.password = undefined

    res.status(200).json(req.user)

}
const remove = catchAsyncError(async function (req, res) {
    const user = req.user;

    await user.remove();
    delete user.password
    delete user._id

    res.status(200).json(user)

})


const update =catchAsyncError( async function (req, res) {

    await User.findByIdAndUpdate(req.params.userId, req.body)

    res.status(200).json(
        {
            success: true,
            message: 'upadate successfully'
        }
    )

})

const userById = catchAsyncError( async function (req, res, next) {
    const user = await User.findById(req.params.userId);
    if(!user){
        return next(new errorHandler('user not found',200))
    }
    req.user = user;

    next()
})

module.exports = {
    list, read, update, userById, create, remove
}