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
        // required: 'Description is required'

       },
       quote: {
        type: String,
        trim: true,
        // required: 'Quote is required'

       },
       total_lessons: {
        type: Number,
        default:0
       },
       total_units: {
        type: Number,
        default:0
       },
       image: {
        data: Buffer,
        contentType: String
       },
      //  category: {
      //   type: String,
      //   required: 'Category is required'
      //  },
      //  published: {
      //   type: Boolean,
      //   default: false
      //  },
       user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
       },
       updated: Date,
     created: {
        type: Date,
      default: Date.now
      },

      total_review:{
        type: Number,
        default:0
       },
      total_purchases:{
        type: Number,
        default:0
       },
      total_likes:{
        type: Number,
        default:0
       },
      top_reviews:[{

      }],
      latest_reviews:[{

      }],
      units:[{

      }],

      total_articles:{
        type: Number,
        default:0
       },
      
      total_videos:{
        type: Number,
        default:0
       },
      total_videos:{
        type: Number,
        default:0
       },
      total_resoursces:{
        type: Number,
        default:0
       },
      total_tests:{
        type: Number,
        default:0
       },

      units:[unitSchema],


    
});

module.exports=mongoose.model('Course',courseSchema);