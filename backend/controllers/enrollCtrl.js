const Notification=require('../models/enrollModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');


const list=catchAsyncError(  async function(req ,res,){
const notification=await Notification.find({}).lean()
res.status(200).json({
    success:true,
    data:notification
})
})

const create=catchAsyncError( async function(req ,res){
 
    const notification = new Notification(req.body);

    await notification.save()
    res.status(200).json(notification)

})
const read=catchAsyncError( function(req ,res){
const {notification_id}=req.body
    const notification= await Notification.findById(notification_id).lean()
    res.status(200).json({
        success: true,
        message: '',
        data:notification
    })
})
const remove= catchAsyncError( async function(req ,res){
    const {notification_id}=req.body
    const notification= await Notification.findById(notification_id)

await notification.remove();

    res.status(200).json({
        success:true,
        message:'deleted successfully'
    })

})


const update=catchAsyncError( async function(req ,res){

  const {notification_id}=req.body
     await Notification.findByIdAndUpdate(notification_id,req.body)
  const updatedvalue=await Notification.findById(notification_id).lean()
    res.status(200).json({
         success:true,
        message:'updated successfully',
        updatedvalue
    })

})
 

module.exports={list,read,update,create,remove
}


const listEnrolled = catchAsyncError( async (req, res) => {
    
    let enrollments = await Enrollment.find({student: req.auth._id})
    .sort({'completed': 1})
    .populate('course', '_id name category')
    
    res.json(enrollments)
    
    
   })
   