const Course=require('../models/courseModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError')
const errorHandler = require('../utils/errorHandler');


const list=catchAsyncError(  async function(req ,res,){
const course=await Course.find();
res.status(200).json(course)
})

const create=catchAsyncError( async function(req ,res){
//  const course0=await Course.find({}).count()

    const course = new Course(req.body);

    await course.save()
    const {_id}=course
   course1= await Course.findOne({_id})
  
    res.status(200).json(course1)



})
const read=catchAsyncError( function(req ,res){

    res.status(200).json(req.course)
    
})
const remove= catchAsyncError( async function(req ,res){
const course=req.course;

await course.remove();

    res.status(200).json({
        success:true,
        message:'deleted successfully'
    })

})


const update=catchAsyncError( async function(req ,res){
  
  await Course.findByIdAndUpdate(req.params.courseId,req.body)
    res.status(200).json(
       { success:true,
        message:'updated successfully'
    }
    )

})
 
const courseById=catchAsyncError( async function(req ,res,next){
const course= await Course.findById(req.params.courseId);
req.course=course

next()
})

module.exports={list,read,update,courseById,create,remove
}