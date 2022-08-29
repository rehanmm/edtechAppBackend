const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {tsend,send} = require('../middleware/responseSender');
const Aws=require('../models/awsModel');


const list=catchAsyncError(  async function(req ,res,){
const aws=await Aws.find({}).lean();
tsend(aws,'',res)
})

const create=catchAsyncError( async function(req ,res){

    const aws = new Aws(req.body);
    await aws.save()
    tsend(aws,'',res)

})
const read=catchAsyncError(async function(req ,res){
 const aws=await Aws.findById(aws_id).lean();
    tsend(aws,'',res)
    
})
const remove= catchAsyncError( async function(req ,res){
const {aws_id}=req.body
    const aws= await Aws.findById(aws_id)
await aws.remove();

    tsend({},'message deleted successfully',res)

})


const update = catchAsyncError( async function(req ,res){
const {aws_id}=req.body
     await Aws.findByIdAndUpdate(aws_id,req.body)
  const updatedvalue=await Aws.findById(aws_id).lean()
   tsend(updatedvalue,'updated successfully',res)
    
})


module.exports = {list,read,update,create,remove}


   