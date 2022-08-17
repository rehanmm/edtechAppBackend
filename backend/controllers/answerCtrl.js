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

const upvote = catchAsyncError( async function(req ,res){

    const {user_id,answer_id}=req.body
  
    const answer= await Answer.findById(question_id)
     if(answer.likes.includes(user_id)){
            answer.upvotes.pull(user_id)
          const value=answer.total_upvote
           answer.total_upvote=value-1
     }else{
        const value=question.total_upvote
        question.total_upvote=value+1
            question.upvotes.push(user_id)
     }
    await question.save()
//   const updatedvalue=await Question.findById(req.body.question_id)
    tsend ({},'',res)

})
 


module.exports = {list,read,update,upvote,create,remove
}


   