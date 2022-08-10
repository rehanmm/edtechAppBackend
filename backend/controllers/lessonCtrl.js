const Lesson=require('../models/lessonModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {send,tsend} = require('../middleware/responseSender')
const Progress=require('../models/progressModel');


const list=catchAsyncError(  async function(req ,res,){
const lesson=await Lesson.find();
res.status(200).json(lesson)
})

const create=catchAsyncError( async function(req ,res){
 
    const lesson = new Lesson(req.body);
    await lesson.save()
    res.status(200).json(req.body)

})
const read=catchAsyncError( async function(req ,res){

    const {lesson_id,unit_id,user_id}=req.body;
    // console.log(unit_id);
    // condition
    const onlyLesson=lesson_id&&!unit_id
    const onlyunit=!lesson_id&&unit_id
    const nothingProvided=!lesson_id&&!unit_id
    console.log(nothingProvided);

//condtion logic for function
if(onlyLesson){
// getLessonById

const lesson= await Lesson.findById(lesson_id);

tsend(lesson,'',res);


}
else if(onlyunit){
    // checkPrerequisite(arg,callback)
    // nextLessonUserHasToComplete
    const unit = await Progress.find({unit_id,user_id})//.select('completed_lessons');
    tsend(unit,'',res);

}
else if(nothingProvided){
    // checkPrerequisite(arg,callback)
    // lastLessonFetchByTheUser(lessons_completed)
    const unit = await Progress.find({user_id}).select('completed_lessons');
    tsend(unit,'',res);
    // const lastValue = Object.values(lessons_completed).pop();
}

    
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
