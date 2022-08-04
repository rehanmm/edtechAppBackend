const {Unit}=require('../models/unitModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError')
const errorHandler = require('../utils/errorHandler');


const list=catchAsyncError(  async function(req ,res,){
const unit=await Unit.find({});
res.status(200).json(unit)
})

const create=catchAsyncError( async function(req ,res){
//  const course0=await Course.find({}).count()

    const unit = new Unit(req.body);

    await unit.save()

    res.status(200).json(unit)



})
const read=catchAsyncError( function(req ,res){
const unit = Unit.findById(req.body.unit_id)
    res.status(200).json(unit)
    
})
const remove= catchAsyncError( async function(req ,res){
    const unit = Unit.findById(req.body.unit_id)


await unit.remove();

    res.status(200).json({
        success:true,
        message:'deleted successfully'
    })

})


const update=catchAsyncError( async function(req ,res){
  
  await Unit.findByIdAndUpdate(req.body.unit_id,req.body)
    res.status(200).json(
       { success:true,
        message:'updated successfully'
    }
    )

})
 
const unitById=catchAsyncError( async function(req ,res,next){
const unit= await Unit.findById(req.params.unitId);


await course.save()
req.course=unit

next()
})

module.exports={list,read,update,unitById,create,remove
}