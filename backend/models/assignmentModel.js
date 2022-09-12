const mongoose = require('mongoose');  
const assignmentSchema=new mongoose.Schema({
    user_id :{
        type:String
    },
    assignment_url:{
        type:String
    },
    unit_id:{
        type:String
    },
    lesson_id:{
        type:String
    },
    submitted_on:{
        type:Number
    },
    // deadline_time:{
    //     type:Number
    // },
    status:{
        type:String,
        enum:['Not Submitted','Submitted','Accepted','Rejected'],
        default:'Not Submitted'
    },
    assignment_type:{
        type:String,
        enum:['auto','manual'] ,
        default:'auto'
    },
    is_completed:{//TODO:true if assignment is submitted before deadline and auto

        type:Boolean,
        default:false
    },
   bucket_name:{
         type:String
   },
   file_path:{
         type:String
   },
   placeholder:{
    type:String
   }

},{
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'}
})
       
module.exports=mongoose.model('Assignment',assignmentSchema);
