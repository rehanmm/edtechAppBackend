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
let unit= await Course.findById(req.params.courseId).select('units -_id');
// console.log(course.units)
// console.log(unit.units)
unit=unit.units
course.units.push(
    {
       
        unit_title: "Physics",
        tags:["thermodynamics","Mechanics","Electrodynamics","Waves"],
        total_lessons: "10",
        completed_lessons: "3",
        prerequisite: {
            has_prerequisite:false,
            type:'auto'
            ,//manual or auto
            time:0,
            message:"please complete required unit first"

        },
       
        is_locked:false,
        is_paid:false
    }

);
course.units.push(
    {
       
        unit_title: "Physical chemistry",
        tags:["Mole concept","Ionic Equilibirium","Chemical Equilibrium"],
        total_lessons: "6",
        completed_lessons: "7",
        prerequisite: {
            has_prerequisite:false,
            type:'auto'
            ,//manual or auto
            time:0,
            message:"please complete required unit first"

        },
       
        is_locked:true,
        is_paid:false
    }

);

await course.save()
req.course=unit

next()
})

module.exports={list,read,update,courseById,create,remove
}