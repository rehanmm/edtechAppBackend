const mongoose = require('mongoose');   
const progressSchema = new mongoose.Schema({
   user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
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
// option_selected:{

   
// },
course_name:{
    type:String,
    default:''
    
},
test_taken:{
    type:Number,
    default:0
},

user_name:{
    type:String,
    default:''
    
},
// completed_lessons:Number,
completed_videos:Number,
test_taken:Number,
avg_test_score:Number,
assignment_done:Number,
unit_name:{
    type:String
},
    content: String,
    resource_url: String
   })




   const Progress=mongoose.model('Progress', progressSchema)
   module.exports=Progress


//    progressSchema.virtual('completed_lesson').get(()=>{

// // const len =Object.keys(this.lessons_progress).length
// // return len;

// //    })
