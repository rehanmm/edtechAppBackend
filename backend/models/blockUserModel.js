const mongoose=require('mongoose');

const blockUserSchema = new mongoose.Schema({
user_id:{
        type:String,
        unique:true,
        trim:true,
        required:[true,'User id is required']
    },
user_name:{
type:String,
trim:true,
},
  phone_number:{
    type:Number,
    required:[true,'Mobile number is required']
  },
  admin_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Admin'
  },
  admin_email:{
    type:String,
    trim:true
  }
},
{
    timestamps:{createdAt:'blocked_at',updatedAt:false}
}); 

//FIXME:timestamp is not working according to timezone
module.exports=mongoose.model('BlockUser',blockUserSchema);