const {Schema}=require('mongoose');

const eventSchema=new Schema({

users_subscribed:[{
  user_id:mongoose.Schema.Type.ObjectId,
  event_id:mongoose.Schema.Type.ObjectId,
  is_paid:Boolean,
  price:Number
}],
//Event
events:[
    {
      _id:false,
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