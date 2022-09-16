const mongoose=require('mongoose')
const paymentSchema = new mongoose.Schema({
  user_id:{
    type:"String",
    required:true
  },
lesson_id:{
    type:mongoose.Schema.Types.ObjectId,
},
event_id:{
    type:mongoose.Schema.Types.ObjectId,
},
payment_for:{
    type:String,
    enum:['lesson','event'],
},

  order_id:{
    type:String,
    index:true,
    unique:true
  },
    razorpay_order_id: {
      type: String,
   
    },
    razorpay_payment_id: {
      type: String
    },
    razorpay_signature: {
      type: String
     
    },
    created_at:{
      type:Number
    },
    currency:{
      type:String
    },
    amount:{
      type:Number
    },
    status:{
      type:String,
      enum:['pending','success','failed']
    }
  });
  
  module.exports=mongoose.model("Payment", paymentSchema);