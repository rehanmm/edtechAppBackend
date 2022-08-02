const {Lesson}=require('../models/lessonModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');


const list=catchAsyncError(  async function(req ,res,){
const lesson=await Lesson.find();
res.status(200).json(lesson)
})

const create=catchAsyncError( async function(req ,res){
 
    const lesson = new Lesson(req.body);

    await lesson.save()
    res.status(200).json(req.body)

})
const read=catchAsyncError( function(req ,res){

    res.status(200).json(req.lesson)
    
})
const remove= catchAsyncError( async function(req ,res){
const lesson=req.lesson;

await lesson.remove();

    res.status(200).json({
        success:true,
        message:'deleted successfully'
    })

})


const update=catchAsyncError( async function(req ,res){

  
     await Lesson.findByIdAndUpdate(req.params.lessonId,req.body)
  const updatedvalue=await Lesson.findById(req.params.lessonId)
    res.status(200).json(
       { success:true,
        message:'updated successfully',
        updatedvalue
    }
    )

})
 
const lessonById=catchAsyncError( async function(req ,res,next){
const course= await Lesson.findById(req.params.lessonId);
req.lesson=course
next()
})

module.exports={list,read,update,lessonById,create,remove
}
