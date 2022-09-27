const mongoose = require('mongoose');  
const diffInDays = require('../helpers/forumHelpers/popularityIndex');

const questionSchema=new mongoose.Schema({

    user_id:{
        type:String,
        ref:'Question',
        // required:[true,'user id is required']
    },
    display_picture:String,
    image_url:String,
    tags:[String],
head:{
    type:String,
    index:true
},
body:{
    type:String,
    required:[true,'please explain your question'],
    index:true
},
html:String,
serialized:String,
media:[String],
accepted_answer:{

},
popularity_index:{
type:Number
},
user_name:{
    type:String,
    trim:true,
},
total_likes:{
type:Number,
default:0
},
total_answers:{
type:Number,
default:0
},
likes:[String],



}, {
    timestamps: { createdAt: 'created_at', updatedAt:"updated_at" }
  })

module.exports=mongoose.model('Question',questionSchema)

questionSchema.methods.popularityIndex=function(){
    let referenceDate = 1660673618948;
this.popularity_index=0.25*this.total_likes+5*this.total_answers
+0.8*diffInDays(this.updatedAt, referenceDate)+diffInDays(this.createdAt, referenceDate);
console.log(this.popularity_index);
}

