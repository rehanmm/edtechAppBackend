const mongoose = require('mongoose');  
const diffInDays = require('../helpers/forumHelpers/popularityIndex');

const questionSchema=new mongoose.Schema({


    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
        // required:[true,'user id is required']
    },
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
type:Number
},

// created_at:{
// type:Date,
// default:Date.now()
// },
// last_edited_at:{
//     type:Date,
//     },
total_likes:{
type:Number,
default:0
},
total_comments:{
type:Number,
default:0
},
likes:[mongoose.Schema.Types.ObjectId],



}, {
    timestamps: { createdAt: true, updatedAt:true }
  })

module.exports=mongoose.model('Question',questionSchema)


questionSchema.methods.popularityIndex=function(){
    let referenceDate = 1660673618948;
this.popularity_index=0.25*this.total_likes+5*this.total_answers
+0.8*diffInDays(this.updatedAt, referenceDate)+diffInDays(this.createdAt, referenceDate);
console.log(this.popularity_index);
}