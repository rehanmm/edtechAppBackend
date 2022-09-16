const Event=require('../models/eventModel');
const Progress=require('../models/progressModel');
const User=require('../models/userModel');
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
console.log(time.date_full)
let [date,month,year]=time.date_full.split('-');
console.log(date,month,year)


switch(month) {
    case '01':
        month='JAN'
      break;
    case '02':
        month='FEB'.
      break;
 
    case '03':
        month='MAR'
      break;
    case '04':
        month='APR'
      break;
    case '05':
        month='MAY'
      break;
    case '06':
     month='JUN'
      break;
    case '07':
        month='JUL'
      break;
 
    case '08':
        month='AUG'
      break;
    case '09':
        month='SEP'
      break;

    case '10':
        month='OCT'
      break;
    case '11':
        month='NOV'
      break;
    case '12':
        month='DEC'
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


const subscribeEvent = catchAsyncError(async function (req, res, next) {
    const {user_id,lesson_id,event_id,unit_id}=req.body;
    const payment=await Event.findById(event_id).select('title  time venue is_paid price').lean()
    if(!payment){
      return tsend({}, "event not found", res);
    }
  
    if((!payment.is_paid)||payment.price==0){
      await Event.findByIdAndUpdate(event_id,{
        $push:{users_subscribed:{
          user_id,
    event_id:pament._id,
    lesson_id,
    is_paid:false,
    price:payment.price
  
        }}

      })
      await Progress.findOneAndUpdate({user_id,unit_id},{
        $push:{
          event_subscribed:{
          user_id,
          event_id:pament._id,
    lesson_id,
    is_paid:false,
    price:payment.price
  
        }
      }

      })
      await User.findOneAndUpdate({user_id},{
        $push:{
          upcommingeventsubbed:{
          user_id,
          event_id:pament._id,
    lesson_id,
    is_paid:false,
    price:payment.price,
    title:payment.title,
    time:payment.time,
    venue:payment.venue,
    subscribed_at:Date.now()
  
        }}

      })
     return tsend({}, "event registered successfully", res);
  
    }
 


      await Event.findByIdAndUpdate(event_id,{
        $push:{users_subscribed:{
          user_id,
          event_id:pament._id,
    lesson_id,
    is_paid:true,
    price:payment.price
  
        }}

      })
      await Progress.findOneAndUpdate({user_id,unit_id},{
        $push:{
          event_subscribed:{
          user_id,
          event_id:pament._id,
    lesson_id,
    is_paid:true,
    price:payment.price
  
        }
      }

      })
      await User.findOneAndUpdate({user_id},{
        $push:{
          upcommingeventsubbed:{
          user_id,
          event_id:pament._id,
    lesson_id,
    is_paid:true,
    price:payment.price,
    title:payment.title,
    time:payment.time,
    venue:payment.venue,
    subscribed_at:Date.now()
  
        }}

      })

    
   return res.redirect('/edtech/payment/checkout?amount='+payment.price+'&lesson_id='+lesson_id+'&unit_id='+unit_id+'&user_id='+user_id+'&event_id='+event_id);
    
    
    })
 

module.exports={list,read,update,create,remove,subscribeEvent
}



   