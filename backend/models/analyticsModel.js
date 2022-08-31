const mongoose = require('mongoose');  

const analyticsSchema=new mongoose.Schema({
date:{

},
home:{
    type:Number,

},
lesson:{

},
question_asked:{

},
question_answered:{

},
question_liked:{},
answer_upvoted:{},
answer_downvoted:{},
answer_accepted:{},


})

    module.exports=mongoose.model('Analytics',analyticsSchema)