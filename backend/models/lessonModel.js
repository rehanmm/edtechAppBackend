
const mongoose = require('mongoose');   
const lessonSchema = new mongoose.Schema({
    title: String,
    content: String,
    type:String,
    pre_requisite:{
        has_pre_requisite:Boolean,
        type:String,//manual or auto
        on:{
           type: mongoose.Schema.Types.ObjectId,
           ref:'Lesson'
        },
        time:Number,
        message:String
    },
    resource_url: String
   })
   const Lesson=mongoose.model('Lesson', lessonSchema)
   module.exports={lessonSchema,Lesson}
