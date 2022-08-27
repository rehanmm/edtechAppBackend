const Question=require('../models/questionModel');
const Answer=require('../models/answerModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const { tsend,send } = require('../middleware/responseSender');

 
const list=catchAsyncError(  async function(req ,res,){
    const filter = req.query;
    let where = {};
    if (filter.keyword) {
        where.head = { $regex: filter.keyword, $options: "i" }
    }
    let query = Question.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Question.countDocuments(where);
    console.log(total);
    const pages = Math.ceil(total / pageSize);

    if (page > pages) {
        return res.status(404).json({
            success: "true",
            message: "No page found",
        });
    }
    result = await query.skip(skip).limit(pageSize).sort({'createdAt':-1});
    res.json({
        success: true,
        filter,
        count: result.length,
        page,
        pages,
        data: {questions:result}
    });
})

const create=catchAsyncError( async function(req ,res){
 
    const question = new Question(req.body);
    // question.popularityIndex();
    await question.save()
    tsend(question,'',res)

})
const read=catchAsyncError( async function(req ,res){
const {question_id}=req.body
const question= await Question.findById(question_id);
const answers= await Answer.find({question_id}).sort({upvote:-1}).limit(10)
tsend({question,answers},'',res);
   
    
})
const remove= catchAsyncError( async function(req ,res){
const {question_id}=req.body
const question= await Question.findById(question_id)
await question.remove();

   tsend({question_id:question._id},'question deleted successfully',res)

})


const update=catchAsyncError( async function(req ,res){

  
     await Question.findByIdAndUpdate(req.body.question_id,req.body)
  const updatedvalue=await Question.findById(req.body.question_id)
    tsend (updatedvalue,'updated successfully',res)
    

})
//
const like=catchAsyncError( async function(req ,res){

  const {user_id,question_id}=req.body

    const question= await Question.findById(question_id)
     if(question.likes.includes(user_id)){
            question.likes.pull(user_id)
          const value=question.total_likes
           question.total_likes=value-1
     }else{
        const value=question.total_likes
        question.total_likes=value+1
            question.likes.push(user_id)
     }

//update question popularity index
// question.popularityIndex();
await question.save()
//const updatedvalue=await Question.findById(req.body.question_id)
    tsend ({},'',res)
    

})
 


module.exports={list,read,update,create,remove,like
}


   