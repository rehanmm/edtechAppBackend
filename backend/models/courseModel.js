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
        trim: true,
        required: 'Description is required'

       },
       quote: {
        type: String,
        trim: true,
        required: 'Quote is required'

       },
       total_lessons: {
        type: Number
       },
       total_units: {
        type: Number
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
       instructor: {// des id photo
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
       },
       updated: Date,
     created: {
        type: Date,
      default: Date.now
      },

      total_review:Number,
      total_purchases:Number,
      total_likes:Number,
      top_reviews:[{

      }],
      latest_reviews:[{

      }],
      units:[{

      }],

      total_articles:Number,
      
      total_videos:Number,
      total_videos:Number,
      total_resoursces:Number,
      total_tests:Number,

      units:[unitSchema],


    
});

module.exports=mongoose.model('Course',courseSchema);