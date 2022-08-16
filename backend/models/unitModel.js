const mongoose = require('mongoose');   
const {lessonSchema}=require('../models/lessonModel')

const unitSchema = new mongoose.Schema({
    unit_name: {
        type: String,
        required: 'unit name is required'
      },
      image_url:{
        type:String
      },
      // course_name:{
      //   type:String,
      //   trim: true,
      //   default:''
      //  },
       completion:{
        type:String,
        default:'auto'
      },
      tags:[{
        type:String,
        default:''
       }],
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
      //  instructor: {
      //   type: mongoose.Schema.ObjectId,
      //   ref: 'User'
      //  },
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
          enum:['auto','manual'],
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
    // total_lesson:{
    //   type:Number,
    //   default:0
    // },
    total_articles:{
      type:Number,
      default:0
    },
    total_video:{//new
      type:Number,
      default:0
    },
    total_test:{//new
      type:Number,
      default:0
    },

      lessons:[{
        index:Number,
        lesson_id:mongoose.Schema.Types.ObjectId,
        type:{
          type:String,
          trim:true,
          enum:['video','article','assignment','payment','test','event']
        },//video,article,assignment,payment/event
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
               type: mongoose.Schema.Types.ObjectId
            },
            time:{
              type:Number,
            default:0},
            message:{
              type:String,
              default:"please complete required unit first"

            }
        },

        title:{type:String,
          default:''},
        is_completed:Boolean,
        description:{type:String,
          default:''}

      }],
      

    
});
const Unit=mongoose.model('unit',unitSchema);

unitSchema.set('toObject', { virtuals: true })
unitSchema.set('toJSON', { virtuals: true })
unitSchema.virtual('total_lesson').get(function(){
return this.lessons.length;
})
// unitSchema.virtual('total_articles').get(function(){
// // console.log(this.lessons.length)
// return this.lessons.length;
// })
module.exports={
    Unit,unitSchema
}

 
// unitSchema.pre('',async function(){

//   this.salt=crypto.randomBytes(16).toString('hex')

//   this.password=crypto.pbkdf2Sync(this.password, this.salt,  
//       1000, 64, `sha512`).toString(`hex`); 

// })

