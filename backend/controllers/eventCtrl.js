const Event=require('../models/eventModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');


const list=catchAsyncError(  async function(req ,res,){
const event=await Event.find({}).lean()
res.status(200).json({
    success:true,
    data:event
})
})

const create=catchAsyncError( async function(req ,res){
 
    const event = new Event(req.body);

    await event.save()
    res.status(200).json(event)

})
const read=catchAsyncError( async function(req ,res){
const {event_id}=req.body
    const event= await Event.findById(event_id).lean()
    res.status(200).json({
        success: true,
        message: '',
        data:event
    })
})
const remove= catchAsyncError( async function(req ,res){
    const {event_id}=req.body
    const event= await Event.findById(notification_id)

await event.remove();

    res.status(200).json({
        success:true,
        message:'deleted successfully'
    })

})


const update=catchAsyncError( async function(req ,res){

  const {event_id}=req.body
     await Event.findByIdAndUpdate(event_id,req.body)
  const event=await Event.findById(event_id).lean()
    res.status(200).json({
         success:true,
        message:'updated successfully',
        event

    })

})
 

module.exports={list,read,update,create,remove
}



   