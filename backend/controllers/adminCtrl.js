const Question=require('../models/questionModel');
const Answer=require('../models/answerModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const { tsend,send } = require('../middleware/responseSender');



 
const Qlist=catchAsyncError(  async function(req ,res,next){
    const filter = req.body;
    let where = {};
    if (filter.user_id) {
       next(new errorHandler(400,'user_id is required'))
    }
    let query = Question.find({user_id:filter.registered_user_id});
    const page = parseInt(filter.page) || 1;
    const pageSize = parseInt(filter.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Question.countDocuments(where);
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
 
const QToplist=catchAsyncError(  async function(req ,res,next){
    const filter = req.body;
    let where = {};
    if (filter.user_id) {
       next(new errorHandler(400,'user_id is required'))
    }
    let query = Question.find({user_id:filter.registered_user_id});
    const page = parseInt(filter.page) || 1;
    const pageSize = parseInt(filter.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Question.countDocuments(where);
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

const Qcreate=catchAsyncError( async function(req ,res){
 
    const question = new Question(req.body);
    // question.popularityIndex();
    await question.save()
    tsend(question,'',res)

})
const Qread=catchAsyncError( async function(req ,res){
const {question_id}=req.body
const question= await Question.findById(question_id);
const answers= await Answer.find({question_id}).sort({upvote:-1})
tsend({question,answers},'',res);   
})
const Qremove= catchAsyncError( async function(req ,res){
const {question_id}=req.body
const question= await Question.findById(question_id)
await question.remove();

   tsend({question_id:question._id},'question deleted successfully',res)

})


const Qupdate=catchAsyncError( async function(req ,res){

  
     await Question.findByIdAndUpdate(req.body.question_id,req.body)
  const updatedvalue=await Question.findById(req.body.question_id)
    tsend (updatedvalue,'updated successfully',res)
    

})


const Alist=catchAsyncError(  async function(req ,res,){
const answer=await Answer.find({}).lean();
tsend(answer,'',res)
})

const Acreate=catchAsyncError( async function(req ,res){
//  const question_id=req.body.question_id;
//  const question= await Question.findOne({question_id});
//  question.total_comment++;
//  question.popularityIndex();

//  question.save();
    const answer = new Answer(req.body);
    await answer.save()
    tsend(answer,'',res)

})
const Aremove= catchAsyncError( async function(req ,res){
const {answer_id}=req.body
    const answer= await Answer.findById(answer_id)
await answer.remove();

    tsend({},'message deleted successfully',res)

})


const Aupdate = catchAsyncError( async function(req ,res){

     await Answer.findByIdAndUpdate(req.body.answer_id,req.body)
  const updatedvalue=await Answer.findById(req.body.answer_id)
   tsend(updatedvalue,'updated successfully',res)
    

})
const userInfo = catchAsyncError( async function(req ,res){
const {user_id}=req.body
    const user= await User.findById(user_id).select('-password -salt');
    const progress= await Progress.find({user_id});
    const question= await Question.find({user_id});
    const answer= await Answer.find({user_id});
    const total_question=question.length;
    const total_answer=answer.length;
    const assignment= await Assignment.find({user_id});
    const total_assignment=assignment.length;

    tsend({
        user,
        progress,
        question,
        answer,
        assignment,
        total_assignments,
        total_question,
        total_answer,
    },'',res)

    

})





module.exports={userInfo,Qlist,QToplist,Qread,Qupdate,Qcreate,Qremove,Alist,Aupdate,Acreate,Aremove
}


   