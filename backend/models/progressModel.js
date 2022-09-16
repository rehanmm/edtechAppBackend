const mongoose = require('mongoose');   
const progressSchema = new mongoose.Schema({
   user_id:{
    type:String,
    trim:true
},
completed_lessons:[{
  
}],
// course_id:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'Course'
// },

unit_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Unit'
},
// course_name:{
//     type:String,
//     default:'' 
// },

user_name:{
    type:String,
    default:''
    
},
// completed_lessons:Number,
completed_videos:{
    type:Number,
    default:0
},
assignment_done:Number,//T
unit_name:{
    type:String
},
    content: String,
    resource_url: String,

// test progress
tests_submitted_answers:[{
    _id:false,
lesson_id:mongoose.Schema.Types.ObjectId,
answers:[{
    _id:false,
    question_id:mongoose.Schema.Types.ObjectId,
    option_choosed:{
    type:String,
    enum:['a','b','c','d']},
    status:{
        type:String,
        enum:['correct','wrong']
    }
}]

}],

submitted_answers:[{
    lesson_id:mongoose.Schema.Types.ObjectId,
    // start_time:Number,
    // submit_time:Number,
    num_question: Number,
    awarded_marks: Number,
    total_marks: Number,
    num_correct: Number,
    num_wrong: Number,
    questions: [
        {
            question: String,
            body:String,
            image_url: String,
            options: {
                a: String,
                b: String,
                c: String,
                d: String
            },
            correct_option:String,
            _id: String,
            chosen_option: String,
            awarded_marks: Number,
            max_marks: Number,
            status: String
        },
    ]
}]
,

test_evaluation:[{
    _id:false,
lesson_id:mongoose.Schema.Types.ObjectId,
start_time:Number,
submit_time:Number,
test_score:Number,
correct_answers:Number,
wrong_answers:Number,
}],

test_taken:{
    type:Number,
    default:0
},
avg_test_score:{
    type:Number,
    default:0
},

event_subscribed:[{
    _id:false,
    event_id:mongoose.Schema.Types.ObjectId,
    lesson_id:mongoose.Schema.Types.ObjectId,
    subscribed_at:Number,
    is_paid:Boolean,
    price:Number,
}]

})




   const Progress=mongoose.model('Progress', progressSchema)
   module.exports=Progress


//    progressSchema.virtual('completed_lesson').get(()=>{

// // const len =Object.keys(this.lessons_progress).length
// // return len;

// //    })
