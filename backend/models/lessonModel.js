
const mongoose = require('mongoose');   
const lessonSchema = new mongoose.Schema({

    title : String,
    content: String,
    type:String,
    completion:{
        type:String,
        default:'auto'
      },
    prerequisite:{
        has_prerequisite:Boolean,
        type:{
         type: String,
         enum:['manual','auto']
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
video_url: String,
thumbnail_url: String,
total_time: Number,
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
submitted_url: {
  type:String ,
  default:''},
placeholder:  {
  type:String ,
  default:''},
status:  {
  type:String ,
  default:'Not Submitted'},


//test
num_question: Number,
time_allowed: Number,
questions:[
  {
  index: Number,
  id: String,
  question: String,
  image: String ,//url
  video: String ,//url
  options:{
  a: String,
  b: String,
  c: String,
  d: String
  }
  }
  ],
  correct_option:[{}],
  start_time:Number,
  End_time:Number,
  //index correct option and option choosed
  


//Payment
amount: Number,
price:  {
  type:String ,
  default:''},
price_decription: String,


//Event
events:[
  {
  title: String,
  time: {
  date_full: String,
  date: Number,
  month: String,
  year: Number,
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
  pre_requisite: {
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
   const Lesson=mongoose.model('Lesson', lessonSchema)
   module.exports=Lesson
