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
    const {time}=req.body
    const {date_full}=time

let [date,month,year]=time.date_full.split('-');


switch(month) {
    case '01':
        month='Jan'
      break;
    case '02':
        month='Feb'
      break;
 
    case '03':
        month='Mar'
      break;
    case '04':
        month='Apr'
      break;
    case '05':
        month='May'
      break;
    case '06':
     month='Jun'
      break;
    case '07':
        month='Jul'
      break;
 
    case '08':
        month='Aug'
      break;
    case '09':
        month='Sep'
      break;

    case '10':
        month='Oct'
      break;
    case '11':
        month='Nov'
      break;
    case '12':
        month='Dec'
      break;
    default:
        month=''
  } 

req.body.time={
date_full,
    date,
    month,
    year,
}


 
    const event = new Event(req.body);

    await event.save()
    res.status(200).json(
        {success:true,
message:'event created',
        data:event}
        )

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
    const event= await Event.findById(event_id);

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
       data: event

    })

})




const paymentForEvent = catchAsyncError(async function (req, res, next) {
    const {user_id,lesson_id,event_id,unit_id}=req.body;
    const payment=await Event.findById(event_id).select('is_paid price').lean()
    if(!payment){
      return tsend({}, "event not found", res);
    }
  
    if(!payment.is_paid||payment.price==0){
      await Event.findByIdAndUpdate(event_id,{
        $push:{
          user_id,
    event_id,
    is_paid:payment.is_paid,
    price:payment.price
  
        }
      })
     return tsend({}, "event registered successfully", res);
  
    }
  
    await Event.findByIdAndUpdate(event_id,{
      $push:{
        user_id,
  event_id,
  is_paid:payment.is_paid,
  price:payment.price
  
      }
    })
  
  
    
   return res.redirect('/edtech/checkout?amount='+payment.price+'&lesson_id='+lesson_id+'&unit_id='+unit_id+'&user_id='+user_id+'&event_id='+event_id);
    
    
    
    })
 

module.exports={list,read,update,create,remove,paymentForEvent
}



   