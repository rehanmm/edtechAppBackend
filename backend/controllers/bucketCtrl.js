const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {tsend,send} = require('../middleware/responseSender');
const Bucket=require('../models/bucketModel');

const read=catchAsyncError(async function(req ,res,next){
 const aws=await Bucket.findOne({}).lean();
    tsend(aws,'',res)
    
})

const update = catchAsyncError( async function(req ,res,next){

    await Bucket.deleteMany({})
const bucket= new Bucket(req.body);
 await bucket.save()
   res.json({ success:true, message:'updated successfully',data:bucket});
    
})


module.exports = {read,update}


   