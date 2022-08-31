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
        default:' '
        // required: 'Description is required'

       },
       quote: {
        type: String,
        trim: true,
        default:'keep up good work'

       },
       total_lessons: {
        type: Number,
        default:0
       },
       total_units: {
        type: Number,
        default:0
       },
       image_url: {
        type:String
       },
       video_url: {
        type:String
       },
      //  category: {
      //   type: String,
      //   required: 'Category is required'
      //  },
      //  published: {
      //   type: Boolean,
      //   default: false
      //  },
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
        _id:false,

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

      units:[{
        _id:false,
        index:Number,
        unit_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Unit'
         },//full model id
        unit_title:String,
        tags:[String],
        total_lessons:Number,
        completed_lesson:Number,
        prerequisite:
          {
            has_prerequisite:{
              type:Boolean,
            default:false},
            type:{
              type:String,
              default:'auto'
            },//manual or auto
            on:{
               type: mongoose.Schema.Types.ObjectId,
               ref:'Unit'
            },
            time:{
              type:Number,
            default:0},
            message:{
              type:String,
              default:"please complete required unit first"

            }
        },
is_paid:Boolean,
is_locked:Boolean,
image_url:String,
}
],
price:Number,
is_paid:Boolean,
tags:[String],

headline:{
  type:String,
  default:''
}


    
});

module.exports=mongoose.model('Course',courseSchema);