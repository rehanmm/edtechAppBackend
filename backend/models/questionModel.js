const mongoose = require('mongoose');  

const questionSchema=new mongoose.Schema({
title:{
    type:String,
    trim:true,
    required:[true,'please enter your question']
},
details:{
    type:String,
    required:[true,'please explain your question ']
},
posted:{
    type:Boolean,
    default:false
}



})