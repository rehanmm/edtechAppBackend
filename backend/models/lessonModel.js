
const mongoose = require('mongoose');  
const catchAsyncError=require('../error/catchAsyncError');
const video=require('../helpers/lessonHelpers.js/videoUrlProcessing') 
const lessonSchema = new mongoose.Schema({

    title : String,
    content: String,
    type:{
      type:String,
      required:[true,'type is required'],
    },
    unit_name:{
type:String
    },
      unit_id:{
        type:String,
        required:[true,'unit_id is required'],
      },
    completion:{
        type:String,
        default:'auto',
        enum:['auto','manual']
      },
    prerequisite:{
        has_prerequisite:{
          type:Boolean,
          default:false
        },
        type:{
         type: String,
         enum:['manual','auto'],
         default:'auto'
        },//manual or auto
        on:{
           type: mongoose.Schema.Types.ObjectId,
           ref:'Lesson'
        },
        time:Number,
        message:String
    },
    resource_url: String,
    //ARTICLE
    head: String,
body: String,

//video
video_id: String,
description:{
  type:String,
  default:''
},
video_url:{
type:String,
},
video:[
  {
  // title: String, //(Eg. High Quality, Low Quality, Medium Quality)
  // quality: String,// (Eg 480p, 360p),
  // bitrate: Number, //(15000) in kbps,360->800,480->1200,540->2000 720->3500  1080->5250
  //  url: String// (Eg https://quasar-edtech-stream.s3.amazonaws.com/id1660772994502_360.m3u8 )
  }
  
  ],
thumbnail_url: {
  type:String,
   default:''
 },
total_time: {
  type:Number,
   default:0
 },
start_at:{
   type:Number,
    default:0
  },



//assignment
intro_vid:String,
body: String,
sample: {
  type:String ,
  default:''},

//test
num_question: Number,
time_allowed: Number,
questions:[
  {
  index:Number,
  question: String,
  body:String,
  image_url: String,
  options:{
  a: String,
  b: String,
  c: String,
  d: String
  },
  correct_option:{
    type:String,
    enum:['a','b','c','d']
  }
  }
  ],
 
//Payment
amount: Number,
price:  {
  type:String ,
  default:''},
price_decription: String,


//Event
events:[
  {
    _id:false,
  title: String,
  time: {
  date_full: String,
  date: String,
  month: String,
  year:String,
  day: String,
  },
  description: String,
  type:{
     type:String,
     enum:['online','offline']
     },
  seats:{
  total: Number,
  filled: Number
  },
  venue: String,
  is_paid: Boolean,
  price: Number,
  prerequisite: {
    has_prerequisite:{
      type:Boolean,
    default:false},
    type:{
      type:String,
      enum:['manual','auto'],
      default:'auto'
    },//manual or auto
    on:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'Lesson'
    },
    time:{
      type:Number,
    default:0},
    message:{
      type:String,
      default:"please complete required unit first"

    }
},

  is_locked: Boolean,
  is_subscribed :{
    type: Boolean,
    default:false
  }
  }]
  


   })
   module.exports=mongoose.model('Lesson', lessonSchema)


   lessonSchema.methods.setVideo=function(){
      this.video=[];

      

   }

