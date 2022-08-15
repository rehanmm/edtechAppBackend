const mongoose = require('mongoose');  

const answerSchema=new mongoose.Schema({

question_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Question',
    required:[true,'question id is required']
},
user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Question',
    required:[true,'id of the user is required']
},
head:{
    type:String,
    trim:true,
    required:[true,'please enter your question']
},
body:{
    type:String,
    required:[true,'please explain your question ']
},
// popularity_index:{

// },

upvote:{
type:Number
},
is_top_answer:Boolean,
accepted_answer:{
    type:Boolean,
    default:false
}




},{
    timestamps: { createdAt: true, updatedAt:true }
  })



module.exports=mongoose.model('Answer',answerSchema)