const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {tsend,send} = require('../middleware/responseSender');
// const leaderBoard=require('../models/');



// const list=catchAsyncError(  async function(req ,res,next){
// const aws=await Aws.find({}).lean();
// tsend(aws,'',res)

// })

// const create=catchAsyncError( async function(req ,res,next){
//     const aws = new Aws(req.body);
//     await aws.save()
//     tsend(aws,'',res)

// })
const read=catchAsyncError(async function(req ,res,next){

    tsend({
        leaderBoard: 'abhay madharchod hai',
    },'',res)
    
})
// const remove= catchAsyncError( async function(req ,res,next){

//     const aws= await Aws.findOne({})
// await aws.remove();

//     tsend({},'message deleted successfully',res)

// })


const update = catchAsyncError( async function(req ,res,next){

      await Aws.deleteMany({})
const aws= new Aws(req.body);
 await aws.save()
   res.json({ success:true, message:'updated successfully',data:aws});
    
})


module.exports = {read}


   