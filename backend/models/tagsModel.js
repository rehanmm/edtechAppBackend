const mongoose=require('mongoose')
const tagsSchema= new mongoose.Schema({
tags:{
    type:[String]
},
//how to search in value string through mongodb
related:[
    {
        key:String,
        value:[String]
    }
]

  });
  
  module.exports=mongoose.model("Tags", tagsSchema);