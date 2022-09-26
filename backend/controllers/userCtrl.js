const User = require('../models/userModel');
const express = require('express');
const mongoose = require('mongoose');
const catchAsyncError = require('../error/catchAsyncError');
// const { findByIdAndUpdate } = require('../models/userModel');
const errorHandler = require('../utils/errorHandler');
// const {profileUpload}=require('../middleware/uploadMiddleware')
const {s3Uploadv2Profile}=require('../utils/s3services')
const {tsend,send}=require('../middleware/responseSender')

const list = catchAsyncError(async function (req, res) {
    // const users = await User.find({})
    // if(!users){
    //     return next(new errorHandler('users not found',200))
    // }
    const filter = req.body;
    let where = {};
    if (filter.keyword) {
        where.name = { $regex: filter.keyword, $options: "i" }
    }
    let query = User.find(where);
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.countDocuments(where);
    const pages = Math.ceil(total / pageSize);

    if (page > pages) {
        return res.status(404).json({
            success: "true",
            message: "No page found",
        });
    }
    result = await query.select('-email -password -salt').skip(skip).limit(pageSize).sort({'createdAt':-1});
    res.json({
        success: true,
        filter,
        count: result.length,
        page,
        pages,
        data: {users:result}
    });
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
const read =  catchAsyncError(async function (req, res) {
const user=await User.findOne({user_id})
  user.password = undefined
  user.salt= undefined
    res.status(200).json(user)

})
const remove = catchAsyncError(async function (req, res) {
    const user=await User.findOne({user_id})

    await user.remove();
    delete user.password
    delete user._id
    user.salt= undefined

    res.status(200).json(user)

})


const update =catchAsyncError( async function (req, res) {

    const {user_id}=req.body
    await User.findOneAndUpdate({user_id}, req.body)

    res.status(200).json(
        {
            success: true,
            message: 'upadate successfully'
        }
    )

})

const displayPicture =catchAsyncError( async function (req, res) {

    const {user_id}=req.body

const result = await s3Uploadv2Profile(req.file);

delete req.file
    await User.findOneAndUpdate({user_id}, {
        $set:{
            display_picture:result.Location,
            bucket:result.Bucket
        }
    })

    

    tsend({link:result.Location},"profile picture updated successfully",res)
})


module.exports = {
    list, read, update, create, remove,displayPicture
}