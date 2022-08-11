const Lesson=require('../models/lessonModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {send,tsend} = require('../middleware/responseSender')
const Progress=require('../models/progressModel');
const prereqFunction=require('../helpers/unitHelper/condition')


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
    const onlyLesson=lesson_id&&!unit_id
    const onlyunit=!lesson_id&&unit_id
    const nothingProvided=!lesson_id&&!unit_id
    // console.log(nothingProvided);

    // const unitProgress = await Progress.findById(user_id)
const obj={}
obj['62f3f716088e0c7a694a6bb4']='1660155813697'
let obj1={}
obj1['62f3f6bd088e0c7a694a6bb2']='1660151960229'


    unitProgress={
        completed_lessons:[]
    }
    unitProgress.completed_lessons.push(obj)
    unitProgress.completed_lessons.push(obj1);

//condition logic for function
if(onlyLesson){
// getLessonById
const lesson= await Lesson.findById(lesson_id);
//

//prerequisite
if(!prereqFunction(unitProgress,lesson.prerequisite)){
    tsend(lesson,'',res)
}else{

tsend({lesson_id,is_locked:true},'lesson is locked',res);
}
//

}
else if(onlyunit){

//get next lesson user has to access


//

if(!prereqFunction(unitProgress,lesson.prerequisite)){
    //do stuff
    
}else{
    //do stuff   
    
}

tsend(unit,'',res);

}
else if(nothingProvided){
    
    // console.log(unitProgress);
    
    //progress model se last lessn id nikalo
    const arr=unitProgress.completed_lessons
    
let lastLessonIdAccessedByUser=Object.keys(arr.pop())[0];
// console.log(lastLessonIdAccessedByUser);
//


// find lesson
const lesson= await Lesson.findById(lastLessonIdAccessedByUser)
//
// console.log(lesson);


//check prerequisite
if(!prereqFunction(unitProgress,lesson.prerequisite)){
console.log(unitProgress);
console.log(lesson.prerequisite);
    tsend(lesson,'',res);
        
        }else{
 
            tsend({lastLessonIdAccessedByUser,is_locked:true},'lesson is locked',res);
        }
//

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
