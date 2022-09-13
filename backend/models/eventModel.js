const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({

users_subscribed:[{
  user_id:String,
  event_id:mongoose.Schema.Types.ObjectId,
  is_paid:Boolean,
  price:Number
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
    is_paid: Boolean,
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
  
    is_locked: Boolean,
    is_subscribed :{
      type: Boolean,
      default:false
    }
  
    
  
  

})

module.exports=mongoose.model('Event',eventSchema)