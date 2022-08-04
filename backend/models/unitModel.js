const mongoose = require('mongoose');   
const {lessonSchema}=require('../models/lessonModel')

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
       },
       course_name:{
        type:String,
        default:' '
       },
       course_id:{
        type:mongoose.Schema.Types.ObjectId,
       },
       description: {
        type: String,
        trim: true,
        default:''
       },
      //  image: {
      //   data: Buffer,
      //   contentType: String
      //  },
       instructor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
       },
       updated: Date,
     created: {
        type: Date,
      default: Date.now
      },
      is_paid:{
        type:Boolean,
        default:false
      },
      price:{
        type:Number,
        default:0
      },
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
    total_lesson:{
      type:Number,
      default:0
    },

      lessons:[lessonSchema],
      

    
});
const Unit=mongoose.model('unit',unitSchema);
module.exports={
    Unit,unitSchema
}