const mongoose = require('mongoose');  

const questionSchema=new mongoose.Schema({

    body:String,
    image_url:String,
    tags:[],
head:{
    type:String,
    trim:true,
    required:[true,'please enter your question']
},
body:{
    type:String,
    required:[true,'please explain your question ']
},

accepted_answer:{

},

popularity_index:{

},
top_answer:[{}],

// created_at:{
// type:Date,
// default:Date.now()
// },
// last_edited_at:{
//     type:Date,
//     },
total_likes:{
type:Number
},
total_comments:{
type:Number
},


}, {
    timestamps: { createdAt: true, updatedAt:true }
  })

module.exports=mongoose.model('Question',questionSchema)