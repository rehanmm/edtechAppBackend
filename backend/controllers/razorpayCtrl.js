const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {tsend,send} = require('../middleware/responseSender');
const Razorpay=require('../models/razorpayModel');
const config=require('../config/config');


const list=catchAsyncError(  async function(req ,res,next){
const razorpay=await Razorpay.find({}).lean();
tsend(razorpay,'',res)

})

const create=catchAsyncError( async function(req ,res,next){
    const razorpay = new Razorpay(req.body);
    await razorpay.save()
    tsend(razorpay,'',res)

})
const read=catchAsyncError(async function(req ,res,next){
    const razorpay = await Razorpay.findOne({}).lean();
    if(!razorpay) next(new errorHandler('No keys found',404))
    tsend(razorpay,'',res)
    
})
const remove= catchAsyncError( async function(req ,res,next){

    const razorpay= await Razorpay.findOne({})
await razorpay.remove();

    tsend({},'deleted successfully',res)

})


const update = catchAsyncError( async function(req ,res,next){

      await Razorpay.deleteMany({})
const razorpay= new Razorpay(req.body);
 await razorpay.save()
   res.json({ success:true, message:'updated successfully',data:razorpay});
    
})


module.exports = {list,read,update,create,remove}


   