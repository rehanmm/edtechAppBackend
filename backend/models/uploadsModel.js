const mongoose=require('mongoose')
const uploadFileSchema= new mongoose.Schema({
user_id:{
     type:[String]
},
content_type:{
    type:String,
    trim:true,
    default:'image'
},
extension:{
    type:String,
    trim:true
},
payload:{
    bucket:String,
    key:String,
    location:String
},

  },{
    timestamps:{
        createdAt:"created_at",updatedAt:false
    }
  });
  
  module.exports=mongoose.model("UploadFile", uploadFileSchema);