const mongoose = require('mongoose');  

const analyticsSchema=new mongoose.Schema({
date:{
type:Date,
},
visits:[
    {
        _id:false,
        route:{
            type:String,
            trim:true
        },
        count:Number
    }
]


})

    module.exports=mongoose.model('Analytics',analyticsSchema)