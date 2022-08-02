const Enrollment=require('../models/enrollModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');


const list=catchAsyncError(  async function(req ,res,){
const enroll=await Enrollment.find();
res.status(200).json(enroll)
})

const create=catchAsyncError( async function(req ,res){
 
    const enroll = new Enrollment(req.body);

    await enroll.save()
    res.status(200).json(req.body)

})
const read=catchAsyncError( function(req ,res){

    res.status(200).json(req.enroll)
    
})
const remove= catchAsyncError( async function(req ,res){
const enroll=req.enroll;

await enroll.remove();

    res.status(200).json({
        success:true,
        message:'deleted successfully'
    })

})


const update=catchAsyncError( async function(req ,res){

  
     await Enroll.findByIdAndUpdate(req.params.enrollId,req.body)
  const updatedvalue=await Enroll.findById(req.params.enrollId)
    res.status(200).json(
       { success:true,
        message:'updated successfully',
        updatedvalue
    }
    )

})
 
const enrollById=catchAsyncError( async function(req ,res,next){
const enroll= await Enroll.findById(req.params.enrollId);
req.enroll=enroll
next()
})

module.exports={list,read,update,enrollById,create,remove
}


const listEnrolled = catchAsyncError( async (req, res) => {
    
    let enrollments = await Enrollment.find({student: req.auth._id})
    .sort({'completed': 1})
    .populate('course', '_id name category')
    
    res.json(enrollments)
    
    
   })
   