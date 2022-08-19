const mongoose = require('mongoose');   
const progressSchema = new mongoose.Schema({
   user_id:{
    type:String
},
   completed_lessons:[{}],
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
completed_videos:Number,
assignment_done:Number,
unit_name:{
    type:String
},
    content: String,
    resource_url: String,



// test progress
test_answers:[{
    lessonId:{ 
index:Number,
option_choosed:{
    type:String,
    enum:['a','b','c','d']
}
}
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
avg_test_score:Number,

   })




   const Progress=mongoose.model('Progress', progressSchema)
   module.exports=Progress


//    progressSchema.virtual('completed_lesson').get(()=>{

// // const len =Object.keys(this.lessons_progress).length
// // return len;

// //    })
