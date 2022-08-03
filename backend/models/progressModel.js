const mongoose = require('mongoose');   
const progressSchema = new mongoose.Schema({
   user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
   progress:[{lesson_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'},
    is_completed:Boolean,
    last_timestamp:Number
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
    
},
user_name:{
    type:String,
    
},
unit_name:{
    type:String
},
    content: String,
    resource_url: String
   })
   const Lesson=mongoose.model('Lesson', lessonSchema)
   module.exports={lessonSchema,Lesson}
