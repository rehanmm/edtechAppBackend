const {Unit}=require('../models/unitModel');
const express=require('express');
const mongoose =require('mongoose') ;
const _=require('lodash');
const catchAsyncError=require('../error/catchAsyncError')
const errorHandler = require('../utils/errorHandler');
const {longUnitToShort,unitData}=require('../utils/objectConstructor');
const unitUpdater=require('../helpers/unitUpdater')
const {send,tsend}=require('../middleware/responseSender');
const Progress = require('../models/progressModel');
const config=require('../config/config');


const list=catchAsyncError(  async function(req ,res){
const unit=await Unit.find({});
tsend(unit,'',res);
})

const create=catchAsyncError( async function(req ,res){
//  const course0=await Course.find({}).count()

    const unit = new Unit(req.body);
    const unit1= new longUnitToShort(unit);
    unitUpdater(unit1);
    // console.log(unit1);
    
    

    await unit.save()

    tsend(unit,'unit created successfully',res)
    // send(unit,'',res);



})
const read=catchAsyncError(async function(req ,res){
    // console.log(req.body.unit_id);
let unit = await Unit.findById(req.body.unit_id).select(' completion tags is_paid total_articles total_video total_test total_lesson name lessons ')
// console.log(unit)
unit=unit.toObject({ getters: true, virtuals: true })
// unit =unit.toObject()

// const  npr= new Progress(req.body.unit_id);

  
   
const user_id=req.body.user_id;

    let unitProgress = await Progress.findOne({user_id})

    if(unitProgress){
        unitProgress= unitProgress.toObject({ getters: true, virtuals: true });
    }

    unit.lessons.sort((a,b)=>a.index-b.index)
const unitdata=new unitData(unitProgress);

 data={...unit,...unitdata}


 
// const unitData=_.extend(unit,unitProgress)


// console.log(data);
    tsend(data,'',res);
    
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
const updateUnitPosition=catchAsyncError( async function(req ,res){
  
        const unitArray=await Unit.findById(config.COURSE_ID).select('units')
//destruct userId and newIndex 
const {user_id,Index}=req.body;

unitArray[indexOfTargetUnit]=(unitArray[Index]+unitArray[Index-1])/2
        
    res.status(200).json(
       { success:true,
        message:'updated successfully'
    }
    )

})
 








module.exports={list,read,update,updateUnitPosition,create,remove
}

