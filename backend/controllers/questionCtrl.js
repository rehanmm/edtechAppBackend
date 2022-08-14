const Question=require('../models/questionModel');
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
    const pages = Math.ceil(total / pageSize);

    if (page > pages) {
        return res.status(404).json({
            success: "true",
            message: "No page found",
        });
    }
    result = await query.skip(skip).limit(pageSize);
    res.json({
        status: "success",
        filter,
        count: result.length,
        page,
        pages,
        data: result
    });
})

const create=catchAsyncError( async function(req ,res){
 
    const question = new Question(req.body);

    await question.save()
    tsend(question,'',res)

})
const read=catchAsyncError( function(req ,res){

   
    
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
 


module.exports={list,read,update,create,remove
}


   