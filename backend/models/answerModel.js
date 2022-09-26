const mongoose = require('mongoose');  

const answerSchema=new mongoose.Schema({

question_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Question',
    required:[true,'question id is required']
},
user_id:{
    type:String,
required:[function(e){
    if(this.admin_id){
        return false
    }
},'id of the user is required']
},
user_name:{
    type:String,
    trim:true
},
display_picture:{
    type:String,
    trim:true
},
admin_id:
{
type:mongoose.Schema.Types.ObjectId,
required:[function(e){
    if(this.user_id){
        return false
    }
},'admin id of the user is required']
},
head:{
    type:String,
    trim:true,
    required:[true,'please enter head of your question']
},
body:{
    type:String,
    trim:true,
    required:[true,'please enter body of your question']
},
total_upvote:{
type:Number
},
upvotes:[String],
is_top_answer:Boolean,


},{
    timestamps: { createdAt: true, updatedAt:true }
  })

  answerSchema.index({head: 'text', body: 'text'});
  

module.exports=mongoose.model('Answer',answerSchema)