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
const Course = require('../models/courseModel');
const config=require('../config/config');


const list=catchAsyncError(  async function(req ,res){
const unit=await Unit.find({});
tsend(unit,'',res);
})

const create=catchAsyncError( async function(req ,res){
    const unit = new Unit(req.body);
    const unit1= new longUnitToShort(unit);
                      unitUpdater(unit1);

    
    

    await unit.save()

    tsend(unit,'unit created successfully',res)
    // send(unit,'',res);



})
const read=catchAsyncError(async function(req ,res){
    // console.log(req.body.unit_id);
let unit = await Unit.findById(req.body.unit_id).select(' completion tags is_paid total_articles total_video total_test total_lesson name lessons ')

unit=unit.toObject({ getters: true, virtuals: true })
// unit =unit.toObject()

// const  npr= new Progress(req.body.unit_id);

  
   
// const {user_id}=req.body;
const {user_id}=req.body;

let unitProgress = await Progress.findOne({user_id})

    if(unitProgress){
        unitProgress= unitProgress.toObject({ getters: true, virtuals: true });
    }
    else{

const newProgress = new Progress({user_id});
unitProgress=newProgress.toObject({ getters: true, virtuals: true });

    }



 unit.lessons.sort((a,b)=>a.index-b.index)
const unitdata=new unitData(unitProgress);

 data={...unit,...unitdata}

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
  const {unit_id}=req.body
await Unit.findByIdAndUpdate(req.body.unit_id,req.body)
const unit= await Unit.findById(unit_id)
  
    const course= await Course.findById(config.COURSE_ID)
    const index = course.units.findIndex(item => item.unit_id == unit_id);
    console.log(index);
    course.units[index]= new longUnitToShort(unit)
    console.log( new longUnitToShort(unit))

    await course.save();


    res.status(200).json(
        { success:true,
         message:'updated successfully'
     }
     
     )

})
const updateUnitPosition=catchAsyncError( async function(req ,res){
    let {units,user_id}=req.body;
  
        let course=await Course.findById(config.COURSE_ID).select('units')
        unitArray=course.units
        //destruct userId and newIndex 
  units.forEach(async (unit)=>{      
        let {unit_id,index}=unit;
// console.log(unitArray);
const indexOfTargetUnit = unitArray.findIndex(e=> e.unit_id ==unit_id);
// console.log(indexOfTargetUnit);
if(index==indexOfTargetUnit+1){
    // console.log('same position')
    return ;
}

else if(index==1){
    unitArray[indexOfTargetUnit].index=0.5;
    console.log(unitArray[indexOfTargetUnit].index);
}
else if(index==unitArray.length){
    // console.log(index==unitArray.length);
    // console.log(index)
    unitArray[indexOfTargetUnit].index=index;
    console.log(unitArray[indexOfTargetUnit].index);
}
else if(index==unitArray.length-1){
    index=index-2
unitArray[indexOfTargetUnit].index=(unitArray[index].index+unitArray[index+1].index)/2
console.log(unitArray[indexOfTargetUnit].index);
}
else{
    index=index-2
unitArray[indexOfTargetUnit].index=(unitArray[index].index+unitArray[index+1].index)/2
console.log(unitArray[indexOfTargetUnit].index);
}
unitArray.sort((a, b) => a.index-b.index);
for(let i=0;i<unitArray.length;i++){
    unitArray[i].index=i+1;
}
  })


// console.log(unitArray);
await course.save()

    res.status(200).json(
       { success:true,
        message:'updated successfully'
    }
    )

})
 








module.exports={list,read,update,updateUnitPosition,create,remove
}

