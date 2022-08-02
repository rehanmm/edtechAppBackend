
const mongoose = require('mongoose');   
const lessonSchema = new mongoose.Schema({
    title: String,
    content: String,
    resource_url: String
   })
   const Lesson=mongoose.model('Lesson', lessonSchema)
   module.exports={lessonSchema,Lesson}
