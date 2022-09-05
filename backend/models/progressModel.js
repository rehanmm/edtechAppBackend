const mongoose = require('mongoose');   
const progressSchema = new mongoose.Schema({
   user_id:{
    type:String,
    trim:true
},
completed_lessons:[{
    _id:false
}],
course_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Course'
},

unit_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Unit'
},
course_name:{
    type:String,
    default:'' 
},


user_name:{
    type:String,
    default:''
    
},
// completed_lessons:Number,
completed_videos:{
    type:Number,
    default:0
},
assignment_done:Number,//T
unit_name:{
    type:String
},
    content: String,
    resource_url: String,

// test progress
tests_submitted_answers:[{
    _id:false,
lesson_id:mongoose.Schema.Types.ObjectId,
answers:[{
    question_id:mongoose.Schema.Types.ObjectId,
    option_choosed:{
    type:String,
    enum:['a','b','c','d']}
}]

}],


test_evaluation:[{
lesson_id:mongoose.Schema.Types.ObjectId,
start_time:Number,
submit_time:Number,
test_score:Number
}],

test_taken:{
    type:Number,
    default:0
},
avg_test_score:{
    type:Number,
    default:0
},

   })




   const Progress=mongoose.model('Progress', progressSchema)
   module.exports=Progress


//    progressSchema.virtual('completed_lesson').get(()=>{

// // const len =Object.keys(this.lessons_progress).length
// // return len;

// //    })
