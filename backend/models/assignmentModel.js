const mongoose = require('mongoose');  

const assignmentSchema=new mongoose.Schema({
    user_id:{
        type:String
    },
    assignment_url:{
        type:String
    },
    unit_id:{
        type:String
    },
    lesson_id:{
        type:String
    },
    submitted_time:{
        type:Number
    },
    assigned_time:{
        type:Number
    },
    deadline_time:{
        type:Number
    }



})