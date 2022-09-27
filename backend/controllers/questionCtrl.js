const Question=require('../models/questionModel');
const Answer=require('../models/answerModel');
const User=require('../models/userModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {s3Uploadv2forum}=require('../utils/s3services')
const { tsend,send } = require('../middleware/responseSender');


const list=catchAsyncError(  async function(req ,res,){
    const filter = req.body;
    let where = {};
    if (filter.keyword) {
        where = {$or:[{head:{$regex: req.body.keyword, $options: 'i'}},{body:{$regex: req.body.keyword, $options: 'i'}}]}
    }
    if (filter.tags) {
        where.tags = filter.tags
    }
    let query = Question.find(where);
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Question.countDocuments(where);
    const pages = Math.ceil(total / pageSize);

    if (page > pages) {
        return res.status(200).json({
            success: "true",
            message: "No page found",
            data:{questions:[]}
        });
    }
    result = await query.skip(skip).limit(pageSize).sort({'created_at':-1});
    res.json({
        success: true,
       
        data: {
            filter,
            total,
            count: result.length,
            page,
            pages,
            questions:result
        }
    });
})

const create=catchAsyncError( async function(req ,res){
 const {user_id,head,body, html,
    serialization,
    media}=req.body;
    const userinfo= await User.findOne({user_id}).select('name display_picture').lean();

    const question = new Question({
        user_id,
        user_name:userinfo.name,
        head,
        html,
serialization,
media,
        body,
        display_picture:userinfo.display_picture
    });
    // question.popularityIndex();
    await question.save()
    if(user_id){
        await User.findOneAndUpdate({user_id},{$inc:{total_answer_given:1}})
        }

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
if(!question) return next(new errorHandler('question not found',200))

const user_id=question.user_id
await question.remove();
if(user_id){
await User.findOneAndUpdate({user_id},{$inc:{total_question_asked:-1}})
}
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


   