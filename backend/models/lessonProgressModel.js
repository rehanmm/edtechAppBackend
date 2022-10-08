
const mongoose = require('mongoose');  
const catchAsyncError=require('../error/catchAsyncError');
const lessonProgressSchema = new mongoose.Schema({

lesson_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Lesson',
},
unit_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Unit'
},
user_id:{
    type:String,
    trim:true,
},
timestamp:{
    type:Number,
    default:Date.now()
},
status:{
    type:String,
    enum:['completed','incomplete','not_started'],
    default:'not_started'
}

 })
   module.exports=mongoose.model('LessonProgress', lessonProgressSchema)


  

