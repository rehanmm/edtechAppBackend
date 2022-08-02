const mongoose = require('mongoose');   
const {unitSchema}=require('../models/unitModel')

const courseSchema = new mongoose.Schema({
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
       category: {
        type: String,
        required: 'Category is required'
       },
       published: {
        type: Boolean,
        default: false
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

      units:[unitSchema],


    
});

module.exports=mongoose.model('Course',courseSchema);