const Lesson=require('../models/lessonModel');
const Unit=require('../models/unitModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {send,tsend} = require('../middleware/responseSender')
const Progress=require('../models/progressModel');
const prereqFunction=require('../helpers/unitHelper/condition')
const {longLessonToShort} =require('../utils/objectConstructor')
const shortLessonupdater=require('../helpers/shortLessonUpdater')
const video=require('../helpers/lessonHelper/videoUrlProcessing')


const list=catchAsyncError(  async function(req ,res,){
const lesson=await Lesson.find();
res.status(200).json(lesson)
})

const create=catchAsyncError( async function(req ,res){
    const  {unit_id,type}= req.body
    const lesson = new Lesson(req.body);
    await lesson.save()
    const {_id}=lesson
    if(type==='video'){
        
        const lesson= await Lesson.findById(_id.toString()).select('prerequisite video_id type unit_id completion description thumbnail_url');
        console.log(lesson);
    return tsend(lesson,'',res);
}


    const shortLesson = new longLessonToShort(lesson); 
    // const unitLessonUpdate = await Unit.findOneAndUpdate(shortLesson,unit_id);
    shortLessonupdater(shortLesson,unit_id)

    tsend(lesson,'lesson updated successfully',res)

})
const read=catchAsyncError( async function(req ,res){

    const {lesson_id,unit_id,user_id}=req.body;
    // console.log(unit_id);
    const onlyLesson=lesson_id&&!unit_id
    const onlyunit=!lesson_id&&unit_id
    const nothingProvided=!lesson_id&&!unit_id
    // console.log(nothingProvided);

    const unitProgress = await Progress.findOne({user_id})
    
// const obj={}
// obj['62f3f716088e0c7a694a6bb4']='1660155813697'
// let obj1={}
// obj1['62f3f6bd088e0c7a694a6bb2']='1660151960229'


    // unitProgress={
    //     completed_lessons:[]
    // }
    // unitProgress.completed_lessons.push(obj)
    // unitProgress.completed_lessons.push(obj1);

    //condition logic for function
    if(onlyLesson){
    // getLessonById
    const lesson= await Lesson.findById(lesson_id).select(' title type completion description start_at is_locked thumbnail_url total_time video');
    //
   


    if(!unitProgress){
        if(!lesson.prerequisite.has_prerequisite){
            // lesson.is_completed=false;
            return  tsend(lesson,'',res)
           
             
    }

//prerequisite
if(!prereqFunction(unitProgress,lesson.prerequisite)){
    tsend(lesson,'',res)
}else{

tsend({lesson_id,is_locked:true},'lesson is locked',res);
}
//

}}
else if(onlyunit){

//get next lesson user has to access
  const unitProgress= await findOne({user_id})
  const arr=unitProgress.completed_lessons
  let lastElement = arr.pop();
  const lastWatchedLessonId=Object.keys(lastElement)[0];
  const unit= await Unit.findOne({unit_id})
  const lessonsArray=unit.lessons

  const index = arr.findIndex(object => {
    return object.lesson_id == lastWatchedLessonId}
)

//  agar lesson akhari hi ho to
// if(index+1==lessonsArray.length ){
//  const data=   {


//     }
// tsend()
// }

 if (index !== -1) {
    const nextLessonObject=arr[index+1].lesson_id
    const nextLessonid=nextLessonObject.lesson_id
    const lesson= await Lesson.findById(nextLessonid);
    
}
else {
    next(new errorHandler('lesson not found',500))
}

//

if(!prereqFunction(unitProgress,lesson.prerequisite)){
    //do stuff
    tsend(lesson,'',res);
    
}else{
    //do stuff   
    tsend({lesson_id,is_locked:true},'lesson is locked',res);
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
const completedLesson=catchAsyncError( async function(req ,res,next){
    const {user_id,lesson_id,unit_id,timestamp}=req.body
//user_id

//lesson_id
//unit_id

let progress= await Progress.findOne({user_id});
console.log(progress);
if(!progress){
 progress= new Progress({
        user_id,
        unit_id,
        timestamp
    })
    progress.save();
console.log(progress)

const obj={}
obj[user_id]=timestamp
 
const alreadyExist=progress.completed_lessons.some(o=>user_id in o)
console.log(alreadyExist);
if(!alreadyExist)
progress.completed_lessons.push(obj)
}
console.log(progress);

tsend({user_id,lesson_id},'completed lesson updated successfuly',res)

})


const submitAssignment=catchAsyncError( async function(req ,res,next){


})

module.exports={list,read,update,completedLesson,submitAssignment,create,remove
}
