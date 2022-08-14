const mongoose = require('mongoose');  

const answerSchema=new mongoose.Schema({

question_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Question'
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
created_at:{
    type:Date
},
last_edited_at:{
    type:Date
},
upvote:{
type:Number
},




})



module.exports=mongoose.model('Answer',answerSchema)