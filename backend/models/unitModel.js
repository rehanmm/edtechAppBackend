const mongoose = require('mongoose');   
const {lessonSchema}=require('../models/lessonModel')

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
       },
       description: {
        type: String,
        trim: true
       },
       image: {
        data: Buffer,
        contentType: String
       },
       instructor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
       },
       updated: Date,
     created: {
        type: Date,
      default: Date.now
      },

      lessons:[lessonSchema],
      

    
});
const Unit=mongoose.model('unit',unitSchema);
module.exports={
    Unit,unitSchema
}