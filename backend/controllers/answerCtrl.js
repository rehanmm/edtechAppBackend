const Answer=require('../models/answerModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {tsend,send} = require('../middleware/responseSender')


const list=catchAsyncError(  async function(req ,res,){
const answer=await Answer.find({}).lean();
tsend(answer,'',res)
})

const create=catchAsyncError( async function(req ,res){
 
    const answer = new Answer(req.body);
    await answer.save()
    tsend(answer,'',res)

})
const read=catchAsyncError( function(req ,res){

    // res.status(200).json(req.enroll)
    
})
const remove= catchAsyncError( async function(req ,res){
const {answer_id}=req.body
    const answer= await Answer.findById(answer_id)
await answer.remove();

    tsend({},'message deleted successfully',res)

})


const update = catchAsyncError( async function(req ,res){

     await Answer.findByIdAndUpdate(req.body.answer_id,req.body)
  const updatedvalue=await Answer.findById(req.body.answer_id)
   tsend(updatedvalue,'updated successfully',res)
    

})
 


module.exports = {list,read,update,create,remove
}


   