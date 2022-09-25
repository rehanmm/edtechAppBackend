const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({

users_subscribed:[{
  _id:false,
  user_id:String,
  event_id:mongoose.Schema.Types.ObjectId,
  is_paid:Boolean,
  price:Number,
  lesson_id:mongoose.Schema.Types.ObjectId,
  subscribed_at:Number

}],
//Event
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
    is_paid: {type:Boolean,

    },
    // ispaid!=null &&ispaid||price>0
    price:{
      type:Number,
      default:0
    },
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
      message:{
        type:String,
        default:"please complete required unit first"
  
      }
  },
  
    is_locked:{
      type:Boolean,
      default:false
    },

  
    
  
  

})

module.exports=mongoose.model('Event',eventSchema)